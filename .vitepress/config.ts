import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: " ",
  description: "",
  base: "/notes/",
  markdown: {
    theme: 'nord',
  },
  themeConfig: {
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Ping AIC", link: "/ping-aic/node-notes/identify-existing-user" },
      { text: "Linux", link: "/linux/service-accounts" },
    ],
    sidebar: [
      {
        text: "Ping AIC",
        items: [
          // {
          //     text: 'Journey Testing',
          //     items: [
          //         { text: 'Overview', link: '/journey-testing/' },
          //         { text: 'User Management', link: '/journey-testing/user-management' },
          //         { text: 'Next Steps', link: '/journey-testing/next-steps' },
          //     ]
          // },
          {
            text: "Node Notes",
            items: [
              {
                text: "Identify Existing User",
                link: "/ping-aic/node-notes/identify-existing-user",
              },
            ],
          },
          {
            text: "Postman Service Account",
            link: "/ping-aic/postman-service-account-auth",
          },
        ],
      },
      {
        text: "Linux",
        items: [
          {
            text: "Service Account",
            link: "/linux/service-accounts",
          },
        ],
      },
    ],
    search: {
      provider: "local",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/brain-hol/notes" },
    ],
  },
});
