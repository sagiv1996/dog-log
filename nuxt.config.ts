// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/supabase",
    "@nuxt/ui",
    "nuxt-echarts",
    "@nuxt/eslint",
    "@vite-pwa/nuxt",
  ],
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/",
    },
  },
  echarts: {
    charts: ["BarChart", "LineChart"],
    components: [
      "DatasetComponent",
      "GridComponent",
      "TooltipComponent",
      "LegendComponent",
      "DataZoomComponent",
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
    workbox: {
      navigateFallback: "/",
    },
  },
});
