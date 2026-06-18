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
    outline: [2, 3],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/developer-tools/' },
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
      ]
    }
  }
})
