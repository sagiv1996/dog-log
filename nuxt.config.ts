// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase", "@nuxt/ui", "nuxt-echarts", "@nuxt/eslint"],
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
});
