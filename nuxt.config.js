require('dotenv').config();
// const { BASE_URL } = process.env;
const BASE_URL = 'https://kuroco-practice.g.kuroco.app';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'common title',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'common description' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'common og:site_name' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: BASE_URL },
      { hid: 'og:title', property: 'og:title', content: 'common og:title' },
      { hid: 'og:description', property: 'og:description', content: 'common og:description' },
      { hid: 'og:image', property: 'og:image', content: 'common og:image' },
      { name: 'twitter:card', content: 'summary_large_image' },　//twitterの画像サイズ
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // '@/assets/css/reset.css',
    // '@/assets/css/base.css',
    // '@/assets/css/plugin.css',
    '@/assets/css/module.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  env: {
    BASE_URL
  }
}
