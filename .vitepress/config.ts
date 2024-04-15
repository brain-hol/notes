import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Brian's Notes",
    description: "",
    base: '/notes/',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'ForgeRock', link: '/journey-testing/' },
        ],
        sidebar: [
            {
                text: 'ForgeRock',
                items: [
                    {
                        text: 'Journey Testing',
                        items: [
                            { text: 'Overview', link: '/journey-testing/' },
                            { text: 'User Management', link: '/journey-testing/user-management' },
                            { text: 'Next Steps', link: '/journey-testing/next-steps' },
                        ]
                    },
                    {
                        text: 'Node Notes',
                        items: [
                            { text: 'Identify Existing User', link: '/node-notes/identify-existing-user'}
                        ]
                    }
                ]
            }
        ],
        search: {
            provider: 'local'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/brain-hol/notes' }
        ]
    }
})
