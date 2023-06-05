import { readdirSync, statSync } from "node:fs"
import { resolve } from "node:path"
import { DefaultTheme, defineConfig } from 'vitepress'
import { VitePluginVitepressNotesSidebar } from "./sidebar"
// import { getSidebar } from 'vitepress-plugin-auto-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Brian's Notes",
  description: "A VitePress Site",
  base: '/notes/',
  // markdown: {
  //   theme: 'Nord'
  // },
  vite: {
    plugins: [
      VitePluginVitepressNotesSidebar({
        ignore: ['.git', '.vitepress', 'node_modules', '.github']
      })
    ]
  },
  themeConfig: {
    // sidebar: createSidebarItemFromFolder(resolve(process.cwd(), SRC_DIR)),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/brain-hol/notes' }
    ]
  }
})
