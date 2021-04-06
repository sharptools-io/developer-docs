module.exports = {
    // base: "/docs", // the "/path"
    title: 'SharpTools Docs', // Title of the website
    // appears in the meta tag and as a subtitle
    description: "SharpTools developer documentation site",
    head: [
        ['link', { rel: 'icon', href: `/icons/favicon-32x32.png` }],
        ['link', { rel: 'manifest', href: '/icons/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3f51b5' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon.png` }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3f51b5' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/mstile-150x150.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    plugins: {
        '@vuepress/pwa':
        {
            serviceWorker: true,
            updatePopup: true
        },
        '@vuepress/medium-zoom':{
            selector: 'img.zoomable-image', //only zoom the images with custom class in the page
        },
        //TODO: to check the Google TAM
        // '@vuepress/google-analytics':
        // {
        //     'ga': '' // UA-00000000-0
        // }
    },
    port: 8081, //Dev port. Default:8080 but conflict with pubsub emulator
    markdown: {
        lineNumbers: true
    },
    theme: "@vuepress/theme-default", //Use the official default theme
    themeConfig: {
        logo: '/icons/android-chrome-150x150.png',
        displayAllHeaders: false, // Default: false
        nav: [
            // links that will appear in the top navbar
            { text: 'Home', link: '/' },
            { text: 'Get Started', link: '/developer-tools/' },
            // external link
            { text: 'Open App', link: 'https://sharptools.io' },
        ],
        // sidebar: "auto", // auto generate the side bar based on the headers in the "current" page
        sidebar: [
            {
                title: 'Developer Tools',
                path: '/developer-tools/',
                collapsable: true,
                children:[
                    {
                        title: 'Custom Tile',
                        path: '/developer-tools/custom-tile/',
                        collapsable: true,
                        children: [
                            {
                                title: "URL",
                                path: '/developer-tools/custom-tile/url',
                            },
                            {
                                title: "HTML",
                                path: '/developer-tools/custom-tile/html',
                            },
                            {
                                title: "STIO Libary",
                                path: '/developer-tools/custom-tile/stio-lib',
                            },
                        ]
                    },
                ]
            },
        ],
    },

}
