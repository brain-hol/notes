import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { Plugin, UserConfig } from 'vite'
import { DefaultTheme, SiteConfig } from 'vitepress'

type Options = {
    ignore?: string[]
}

export function VitePluginVitepressNotesSidebar(opts: Options): Plugin {
    return {
        name: 'vite-plugin-vitepress-notes-sidebar',
        // enforce: 'post',
        configureServer({ watcher, restart }) {
            const markdownWatcher = watcher.add('*.md')
            markdownWatcher.on('all', async (event, path) => {
                if (event === 'change') {
                    return
                }
                try {
                    await restart()
                } catch { }
            })
        },
        // @ts-ignore
        config(config: UserConfig & { vitepress: SiteConfig<DefaultTheme.Config> }) {
            const srcDir = config.vitepress.userConfig.srcDir ?? './'
            const docsPath = join(process.cwd(), srcDir)
            const sidebar = createSidebarMulti(docsPath, opts.ignore)
            config.vitepress.site.themeConfig.sidebar = sidebar
            const nav = createNav(docsPath, opts.ignore)
            config.vitepress.site.themeConfig.nav = nav
            return config
        }
    }
}

function getCategories(rootPath: string, ignore: string[]): string[] {
    return readdirSync(rootPath)
        .filter(entry => statSync(join(rootPath, entry)).isDirectory() && !ignore.includes(entry))
}

function createSidebarMulti(rootPath: string, ignore: string[] = []): DefaultTheme.SidebarMulti {
    return getCategories(rootPath, ignore)
        .reduce<DefaultTheme.SidebarMulti>((acc, cur) => {
            acc[`/${cur}/`] = createSidebarItems(rootPath, cur)
            return acc
        }, {})
}

function createSidebarItems(rootPath: string, ...restPath: string[]): DefaultTheme.SidebarItem[] {
    return readdirSync(join(rootPath, ...restPath))
        .filter(entry => statSync(join(rootPath, ...restPath, entry)).isDirectory() || entry.endsWith('.md'))
        .map<DefaultTheme.SidebarItem>(entry => {
            if (statSync(join(rootPath, ...restPath, entry)).isDirectory()) {
                return {
                    text: entry,
                    collapsed: false,
                    items: createSidebarItems(rootPath, ...restPath, entry)
                }
            }
            const fileName = entry.slice(0, entry.lastIndexOf('.'))
            return {
                text: fileName,
                link: '/' + [...restPath, fileName !== 'index' ? fileName : '' ].join('/')
            }
        })
}

function createNav(rootPath: string, ignore: string[] = []): DefaultTheme.NavItem[] {
    return getCategories(rootPath, ignore)
        .map<DefaultTheme.NavItem>(category => ({
            text: category,
            link: '/' + category
        }))
}
