import { readdirSync, statSync } from "node:fs"
import { resolve } from "node:path"
import { DefaultTheme, defineConfig } from 'vitepress'
// import { getSidebar } from 'vitepress-plugin-auto-sidebar'

const SRC_DIR = 'content'

function createSidebarItemFromFolder(folderPath: string): DefaultTheme.SidebarItem[] {
  const items: DefaultTheme.SidebarItem[] = []
  for (const fileName of readdirSync(folderPath)) {
    if (fileName === 'index.md') {
      continue
    }
    if (fileName.endsWith('.md')) {
      items.push({
        text: fileName.slice(0, fileName.lastIndexOf('.md')),
        link: resolve(folderPath, fileName).replace(process.cwd() + SRC_DIR, '')
      })
    } else if (statSync(resolve(folderPath, fileName)).isDirectory()) {
      items.push({
        text: fileName.charAt(0).toUpperCase() + fileName.slice(1),
        collapsed: false,
        items: createSidebarItemFromFolder(resolve(folderPath, fileName))
      })
    }
  }
  return items
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Brian's Notes",
  description: "A VitePress Site",
  srcDir: './' + SRC_DIR,
  markdown: {
    theme: 'Nord'
  },
  themeConfig: {
    sidebar: createSidebarItemFromFolder(resolve(process.cwd(), SRC_DIR)),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/brain-hol/notes' }
    ]
  }
})
