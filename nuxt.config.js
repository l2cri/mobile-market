/* eslint-disable nuxt/no-cjs-in-config */
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'mobile-market',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Auth module configuration (https://auth.nuxtjs.org/schemes/local.html#options)
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/',
    },
    strategies: {
      local: {
        endpoints: {
          user: { url: '/api/tele/user', method: 'get', propertyName: 'data' },
        },
      },
    },
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  // server Middleware
  serverMiddleware: [
    { path: '/api', handler: bodyParser.json() },
    { path: '/api', handler: bodyParser.urlencoded({ extended: true }) },
    { path: '/api', handler: cookieParser() },
    { path: '/api', handler: '~/serverMiddleware/session.js' },
    { path: '/api/auth/login', handler: '~/api/auth/login.js' },
    { path: '/api/auth/logout', handler: '~/api/auth/logout.js' },
    { path: '/api/auth/sms/', handler: '~/api/auth/sms.js' },
    '~/api/index.js',
  ],

  // router
  router: {
    middleware: ['auth'],
  },
}
