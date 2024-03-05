import { readFileSync, readdirSync, statSync } from 'node:fs'
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
        .sort()
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
        .filter(entry => {
            return statSync(join(rootPath, ...restPath, entry)).isDirectory()
                || entry.endsWith('.md')
                && entry !== 'index.md'
        })
        .map<DefaultTheme.SidebarItem>(entry => {
            if (statSync(join(rootPath, ...restPath, entry)).isDirectory()) {
                return {
                    text: replaceHyphensAndCapitalize(entry),
                    collapsed: true,
                    items: createSidebarItems(rootPath, ...restPath, entry)
                }
            }
            const fileName = entry.slice(0, entry.lastIndexOf('.'))
            const fileContents = readFileSync(join(rootPath, ...restPath, entry), 'utf-8')
            const pageTitle = fileContents.match(/^# (.+)/m)?.[1] ?? entry.slice(0, entry.lastIndexOf('.'))
            return {
                text: pageTitle,
                link: '/' + [...restPath, fileName].join('/')
            }
        })
        .sort((a, b) => a.text!.localeCompare(b.text!))
}

function createNav(rootPath: string, ignore: string[] = []): DefaultTheme.NavItem[] {
    return getCategories(rootPath, ignore)
        .map<DefaultTheme.NavItem>(category => ({
            text: replaceHyphensAndCapitalize(category),
            link: '/' + category + '/'
        }))
}

function replaceHyphensAndCapitalize(input: string): string {
    const words = input.split('-');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
};
