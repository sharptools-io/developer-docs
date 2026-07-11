# Supported Integrations

Bridge integrations run locally and help SharpTools connect to supported local devices, services, and utility-style resources.

::: info Local Network Scope
Bridge focuses on LAN, Wi-Fi, HTTP, calendar, and runtime-based integrations. It does not add direct Zigbee or Z-Wave radio support.
:::

## Status Guide

- **Tested** means the core path has been exercised with real devices or bridges.
- **Early** means the implementation exists and has automated coverage, but broader real-device validation and polish are still needed.
- **Labs** means the feature is intended for controlled Labs-style testing.

## Integration List

| Integration | Status | Notes |
| --- | --- | --- |
| [Matter](/bridge/integrations/matter) | Tested | Connects supported Matter devices that are already available on your local network through multi-admin setup. |
| [Philips Hue](/bridge/integrations/philips-hue) | Tested | Connects compatible Hue lights, groups, scenes, and buttons locally with near real-time status updates. |
| [Shelly](/bridge/integrations/shelly) | Early | Supports Shelly Gen 2 and Gen 3 switches, relays, lights, plugs, and meters. Gen 1 is not in scope. |
| [Kasa / Tapo](/bridge/integrations/kasa-tapo) | Early | Connects local TP-Link Kasa and Tapo plugs, switches, outlets, dimmers, bulbs, and energy-monitoring devices. |
| [Lutron](/bridge/integrations/lutron) | Early | Connects supported Lutron systems for local switches, dimmers, and Pico/remotes using local bridge-button pairing. |
| [Fully Kiosk Browser](/bridge/integrations/fully-kiosk) | Early | Controls Fully Kiosk Browser tablets for dashboards, screen control, page loading, speech, and device health. |
| [Plex](/bridge/integrations/plex) | Early | Connects Plex Media Servers and exposes supported Plex players for playback control and media status. |
| [Emby](/bridge/integrations/emby) | Early | Connects Emby Servers and exposes supported Emby players for playback control and media status. |
| [Jellyfin](/bridge/integrations/jellyfin) | Early | Connects Jellyfin Servers and exposes supported Jellyfin players for playback control and media status. |
| [Bridge Host Monitor](/bridge/integrations/host-monitor) | Early | Exposes Bridge host CPU, memory, storage, process, and uptime metrics as a dashboard-ready device. |
| [HTTP Webhooks](/bridge/integrations/http-webhook) | Early | Creates simple local webhook-backed devices for switches, motion, temperature, buttons, and one-shot actions. |
| [Calendar Events](/bridge/integrations/ical-calendar-events) | Early | Turns matched calendar events into resources that can be used in dashboards and rules. |
| [Groovy Labs](/bridge/integrations/groovy-labs) | Labs | Runs trusted, network-oriented Hubitat/SmartThings-style community Groovy apps and drivers. |

## Choosing an Integration

Use native integrations when Bridge has direct support for the device or service. Use [HTTP Webhooks](/bridge/integrations/http-webhook) for simple local HTTP workflows that do not need a full driver. Use [Groovy Labs](/bridge/integrations/groovy-labs) for trusted, network-oriented community Groovy packages that fit the compatibility layer.
