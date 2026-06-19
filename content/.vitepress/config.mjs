import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SharpTools Docs',
  description: 'SharpTools developer documentation site',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/icons/favicon-32x32.png' }],
    ['link', { rel: 'manifest', href: '/icons/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3f51b5' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3f51b5' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/mstile-150x150.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  markdown: {
    lineNumbers: false
  },
  themeConfig: {
    logo: { src: '/icons/android-chrome-150x150.png', alt: 'SharpTools' },
    search: {
      provider: 'local'
    },
    externalLinkIcon: true,
    outline: [2, 3],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Developer Tools', link: '/developer-tools/' },
      { text: 'Bridge', link: '/bridge/' },
      { text: 'Open App', link: 'https://sharptools.io' }
    ],
    sidebar: {
      '/developer-tools/': [
        {
          text: 'Developer Tools',
          link: '/developer-tools/',
          items: [
            {
              text: 'Custom Tiles',
              link: '/developer-tools/custom-tiles/',
              items: [
                { text: 'URL', link: '/developer-tools/custom-tiles/url' },
                { text: 'HTML', link: '/developer-tools/custom-tiles/html' },
                { text: 'JS Library', link: '/developer-tools/custom-tiles/stio-lib' }
              ]
            }
          ]
        }
      ],
      '/bridge/': [
        {
          text: 'Bridge Alpha',
          link: '/bridge/',
          items: [
            { text: 'Getting Started', link: '/bridge/getting-started' },
            { text: 'Install with Docker', link: '/bridge/install-docker' },
            { text: 'Connect to SharpTools', link: '/bridge/connect-sharptools' },
            {
              text: 'Supported Integrations',
              link: '/bridge/integrations',
              collapsed: true,
              items: [
                { text: 'Matter', link: '/bridge/integrations/matter' },
                { text: 'Philips Hue', link: '/bridge/integrations/philips-hue' },
                { text: 'Shelly', link: '/bridge/integrations/shelly' },
                { text: 'Kasa / Tapo', link: '/bridge/integrations/kasa-tapo' },
                { text: 'Lutron', link: '/bridge/integrations/lutron' },
                { text: 'Fully Kiosk Browser', link: '/bridge/integrations/fully-kiosk' },
                { text: 'HTTP Webhook Device', link: '/bridge/integrations/http-webhook' },
                { text: 'iCal Calendar Events', link: '/bridge/integrations/ical-calendar-events' },
                { text: 'Groovy Labs', link: '/bridge/integrations/groovy-labs' }
              ]
            },
            { text: 'Troubleshooting', link: '/bridge/troubleshooting' },
            { text: 'Security and Alpha Notes', link: '/bridge/security-alpha-notes' }
          ]
        }
      ]
    }
  }
})
