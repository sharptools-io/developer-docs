<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type BridgeDownloadTarget = 'macos' | 'linux'
type BridgeArch = 'arm64' | 'amd64'

type BridgeDownload = {
  kind: string
  platform: string
  arch: string
  format: string
  filename: string
  url: string
  size?: number
}

type BridgeReleaseManifest = {
  version: string
  channel?: string
  publishedAt?: string
  releaseNotesUrl?: string
  downloads?: BridgeDownload[]
}

type UserAgentHighEntropyValues = {
  architecture?: string
  platform?: string
}

type UserAgentDataLike = {
  platform?: string
  getHighEntropyValues?: (hints: string[]) => Promise<UserAgentHighEntropyValues>
}

type DownloadTargetConfig = {
  manifestPlatform: string
  kind: string
  format: string
  defaultArch: BridgeArch
  platformPattern: RegExp
  unavailableLabel: string
}

const props = withDefaults(defineProps<{
  target?: BridgeDownloadTarget
}>(), {
  target: 'macos'
})

const manifestUrl = 'https://cdn.sharptools.io/bridge/channels/latest.json'
const fallbackReleaseUrl = 'https://github.com/sharptools-io/bridge/releases/latest'

const downloadTargets: Record<BridgeDownloadTarget, DownloadTargetConfig> = {
  macos: {
    manifestPlatform: 'darwin',
    kind: 'installer',
    format: 'pkg',
    defaultArch: 'arm64',
    platformPattern: /mac|darwin/i,
    unavailableLabel: 'macOS installer list'
  },
  linux: {
    manifestPlatform: 'linux',
    kind: 'archive',
    format: 'tar.gz',
    defaultArch: 'amd64',
    platformPattern: /linux|x11/i,
    unavailableLabel: 'Linux binary list'
  }
}

const manifest = ref<BridgeReleaseManifest | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const detectedArch = ref<BridgeArch | null>(null)

const targetConfig = computed(() => downloadTargets[props.target])

const downloads = computed(() => {
  const downloads = manifest.value?.downloads ?? []
  const config = targetConfig.value

  return downloads
    .filter((download) => (
      download.kind === config.kind
      && download.platform === config.manifestPlatform
      && download.format === config.format
      && download.url
    ))
    .sort((left, right) => {
      return getArchSortOrder(left.arch, config.defaultArch) - getArchSortOrder(right.arch, config.defaultArch)
    })
})

const primaryDownload = computed(() => {
  const preferredArch = detectedArch.value ?? targetConfig.value.defaultArch
  return downloads.value.find((download) => download.arch === preferredArch)
    ?? downloads.value.find((download) => download.arch === targetConfig.value.defaultArch)
    ?? downloads.value[0]
    ?? null
})

const alternateDownload = computed(() => downloads.value.find((download) => (
  download.url !== primaryDownload.value?.url
)) ?? null)

const releaseUrl = computed(() => manifest.value?.releaseNotesUrl ?? fallbackReleaseUrl)

const releaseLabel = computed(() => {
  if (!manifest.value?.version) return 'latest release'
  const channel = manifest.value.channel ? ` ${manifest.value.channel}` : ''
  return `v${manifest.value.version}${channel}`
})

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isBridgeDownload(value: unknown): value is BridgeDownload {
  if (!isRecord(value)) return false

  return typeof value.kind === 'string'
    && typeof value.platform === 'string'
    && typeof value.arch === 'string'
    && typeof value.format === 'string'
    && typeof value.filename === 'string'
    && typeof value.url === 'string'
    && (value.size === undefined || typeof value.size === 'number')
}

function isBridgeReleaseManifest(value: unknown): value is BridgeReleaseManifest {
  if (!isRecord(value)) return false

  return typeof value.version === 'string'
    && (value.channel === undefined || typeof value.channel === 'string')
    && (value.publishedAt === undefined || typeof value.publishedAt === 'string')
    && (value.releaseNotesUrl === undefined || typeof value.releaseNotesUrl === 'string')
    && (
      value.downloads === undefined
      || (Array.isArray(value.downloads) && value.downloads.every(isBridgeDownload))
    )
}

function isUserAgentDataLike(value: unknown): value is UserAgentDataLike {
  if (!isRecord(value)) return false

  const platform = value.platform
  const getHighEntropyValues = value.getHighEntropyValues

  return (platform === undefined || typeof platform === 'string')
    && (getHighEntropyValues === undefined || typeof getHighEntropyValues === 'function')
}

function getUserAgentData(nav: Navigator): UserAgentDataLike | undefined {
  if (!('userAgentData' in nav)) return undefined

  const value = nav.userAgentData
  return isUserAgentDataLike(value) ? value : undefined
}

function normalizeArch(architecture?: string): BridgeArch | null {
  const normalized = architecture?.toLowerCase()
  if (normalized === 'arm' || normalized === 'arm64' || normalized === 'aarch64') return 'arm64'
  if (normalized === 'x86' || normalized === 'x86_64' || normalized === 'amd64' || normalized === 'x64') return 'amd64'
  return null
}

function getArchSortOrder(arch: string, defaultArch: BridgeArch): number {
  const normalized = normalizeArch(arch)
  if (normalized === defaultArch) return 0
  if (normalized) return 1
  return 2
}

async function detectPreferredArch(config: DownloadTargetConfig): Promise<BridgeArch | null> {
  const userAgentData = getUserAgentData(window.navigator)
  const platformLabel = [
    userAgentData?.platform,
    window.navigator.platform,
    window.navigator.userAgent
  ].filter(Boolean).join(' ')

  if (!config.platformPattern.test(platformLabel)) return null
  if (!userAgentData?.getHighEntropyValues) return null

  try {
    const values = await userAgentData.getHighEntropyValues(['architecture'])
    return normalizeArch(values.architecture)
  } catch {
    return null
  }
}

function getArchLabel(arch: string): string {
  if (props.target === 'macos') {
    if (arch === 'arm64') return 'Apple Silicon'
    if (arch === 'amd64') return 'Intel'
  }

  if (arch === 'amd64') return 'amd64'
  if (arch === 'arm64') return 'arm64'
  return arch
}

function getDownloadLabel(download: BridgeDownload): string {
  const platformLabel = props.target === 'linux' ? 'Linux' : 'macOS'
  return `Download for ${platformLabel} (${getArchLabel(download.arch)})`
}

onMounted(async () => {
  detectedArch.value = await detectPreferredArch(targetConfig.value)

  try {
    const response = await fetch(manifestUrl)
    if (!response.ok) {
      throw new Error(`Manifest request failed with ${response.status}`)
    }

    const data: unknown = await response.json()
    if (!isBridgeReleaseManifest(data)) {
      throw new Error('Manifest response was not in the expected format')
    }

    manifest.value = data
  } catch (manifestError) {
    error.value = manifestError instanceof Error ? manifestError.message : 'Unable to load release manifest'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="bridge-release-downloads">
    <p v-if="loading" class="bridge-release-downloads__muted">
      Loading the latest Bridge release...
    </p>

    <div v-else-if="primaryDownload" class="bridge-release-downloads__actions">
      <a
        class="bridge-release-downloads__button"
        :href="primaryDownload.url"
        target="_blank"
        rel="noreferrer"
      >
        <span>{{ getDownloadLabel(primaryDownload) }}</span>
        <span aria-hidden="true">↓</span>
      </a>
      <a
        v-if="alternateDownload"
        class="bridge-release-downloads__alternate"
        :href="alternateDownload.url"
        target="_blank"
        rel="noreferrer"
      >
        {{ getDownloadLabel(alternateDownload) }}
      </a>
    </div>

    <p v-else class="bridge-release-downloads__muted">
      We could not load the live {{ targetConfig.unavailableLabel }}. Use the GitHub release link below to
      download the latest Bridge release.
      <span v-if="error">({{ error }})</span>
    </p>

    <p class="bridge-release-downloads__meta">
      <template v-if="manifest?.version">
        Latest: <strong>{{ releaseLabel }}</strong> ·
      </template>
      <a :href="releaseUrl" target="_blank" rel="noreferrer">View GitHub Release</a>
    </p>
  </div>
</template>

<style scoped>
.bridge-release-downloads {
  margin: 14px 0 16px;
}

.bridge-release-downloads__actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.bridge-release-downloads__button {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 22px;
  border-radius: 999px;
  color: var(--vp-c-bg);
  font-weight: 600;
  text-decoration: none;
  background: var(--vp-c-text-1);
}

.bridge-release-downloads__button:hover {
  color: var(--vp-c-bg);
  background: var(--vp-c-text-2);
}

.bridge-release-downloads__button::after {
  display: none !important;
  content: none !important;
}

.bridge-release-downloads__alternate {
  color: var(--vp-c-text-2);
  font-weight: 500;
  text-underline-offset: 3px;
}

.bridge-release-downloads__meta,
.bridge-release-downloads__muted {
  margin: 14px 0 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

@media (max-width: 640px) {
  .bridge-release-downloads__button {
    width: 100%;
  }
}
</style>
