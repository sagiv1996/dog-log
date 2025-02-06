// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s - Dog-Log",
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/supabase",
    "@nuxt/ui",
    "nuxt-echarts",
    "@nuxt/eslint",
    "@vite-pwa/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/device",
  ],
  css: ["~/assets/css/main.css"],
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/",
      exclude: ["/he/login"],
    },
  },
  echarts: {
    charts: ["BarChart", "LineChart", "PieChart"],
    components: [
      "DatasetComponent",
      "GridComponent",
      "TooltipComponent",
      "LegendComponent",
      "DataZoomComponent",
      "ToolboxComponent",
    ],
  },
  pwa: {
    registerType: "autoUpdate",

    manifest: {
      name: "Dog Log",
      short_name: "Dog Log",
      description: "An app to track a dog's needs",
      icons: [
        { src: "icons/64.png", sizes: "64x64", type: "image/png" },
        { src: "icons/144.png", sizes: "144x144", type: "image/png" },
        { src: "icons/192.png", sizes: "192x192", type: "image/png" },
        { src: "icons/512.png", sizes: "512x512", type: "image/png" },
      ],
    },
  },
  i18n: {
    locales: [
      {
        code: "en",
        file: "en-US.ts",
      },
      {
        code: "he",
        file: "he-IL.ts",
        dir: "rtl",
      },
    ],
    lazy: true,
    defaultLocale: "en",
  },
});
