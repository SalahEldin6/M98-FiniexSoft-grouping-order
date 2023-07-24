import i18n from "./config/i18n";
import replaceHash from "./config/replaceHash";
replaceHash();

const isEnvDev = true;

console.log("NUXT_ENV_BASE_URL", process.env.NUXT_ENV_BASE_URL);
console.log("ENV_REPORTS_BASE_URL", process.env.NUXT_ENV_REPORTS_BASE_URL);

export default {
  ssr: false,
  target: "server",
  devServerHandlers: [],

  server: {
    port: "4000",
    host: isEnvDev ? "localhost" : "finiexsoft.net",
    timing: false,
  },

  publicRuntimeConfig: {
    ReportsBaseURL:
      process.env.NUXT_ENV_REPORTS_BASE_URL ??
      "https://reports.finiexsoft.net/",
    HideUncompletedPages: process.env.NUXT_ENV_HIDE_UNCOMPLETED_PAGES ?? true,
  },

  router: { prefetchLinks: false },

  components: [
    "~/components/Base",
    "~/components/App/Invoice/Details",
    "~/components/App/Invoice/Items",
    "~/components/App/Invoice/Summary",
    "~/components/App/Entry/Table",
    "~/components/App/Entry/Summary",
    "~/components/App/Entry/Invoice",
    "~/components/App/Statements/Filters",
    "~/components/App/Statements/Summary",
    { path: "~/components/App", prefix: "app" },
  ],

  head: {
    title: "FINIEXS SOFT",
    htmlAttrs: { lang: "en" },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/ERP.png" },
      {
        rel: "preconnect",
        href: "https://fonts.bunny.net",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.bunny.net/css?family=tajawal:500&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.bunny.net/css?family=abel:400&display=swap",
      },
    ],
  },

  css: ["element-ui/lib/theme-chalk/index.css", "~/assets/style/style.scss"],

  modules: ["@nuxtjs/axios"],

  plugins: [
    "~/plugins/element-ui",
    "~/plugins/axios",
    "~/plugins/global-functions",
    "~/plugins/vee-validate.js",
  ],

  buildModules: [
    "nuxt-i18n",
    "nuxt-webpack-optimisations",
    "@nuxtjs/composition-api/module",
    [
      "unplugin-auto-import/nuxt",
      {
        imports: ["@nuxtjs/composition-api"],
        dirs: ["./composables", "./composables/*"],
      },
    ],
  ],

  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {
      if (process.env.DEV_SOURCE_MAP === "true" && ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
      }
    },
  },

  axios: {
    baseURL:
      process.env.NUXT_ENV_BASE_URL ?? "https://api-dev.finiexsoft.net/api/v1/",
  },

  webpackOptimisations: {
    features: {
      // esbuild-loader is disabled as it doesn't support jsx in vue 2 (only vue 3). So we use default built-in babel loader
      esbuildLoader: false,
    },
  },

  i18n: {
    vueI18n: i18n,
    vueI18nLoader: true,
    defaultLocale: "ar",
    locales: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "ar",
        name: "العربية",
      },
    ],
  },
};
