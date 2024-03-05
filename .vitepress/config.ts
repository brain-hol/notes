import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Brian's Notes",
    description: "",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
        ],
        sidebar: [
            {
                text: 'Journey Testing',
                items: [
                    { text: 'Overview', link: '/journey-testing/' },
                ]
            }
        ],
        search: {
            provider: 'local'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    }
})
