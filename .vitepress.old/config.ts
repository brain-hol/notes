import { defineConfig } from 'vitepress'
import { VitePluginVitepressNotesSidebar } from "./sidebar"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Brian's Notes",
  description: "A VitePress Site",
  base: '/notes/',
  markdown: {
    theme: 'nord',
    config: (md) => {
      md.use(require('markdown-it-footnote'))
    }
  },
  vite: {
    plugins: [
      VitePluginVitepressNotesSidebar({
        ignore: ['.git', '.vitepress', 'node_modules', '.github']
      })
    ]
  },
  themeConfig: {
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/brain-hol/notes' }
    ],
  }
})
