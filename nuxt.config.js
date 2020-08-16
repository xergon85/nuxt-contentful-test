import dotenv from 'dotenv'; dotenv.config()

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/posts'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/markdownit',
    'contentful-module'
  ],
  /* Markdownit */
  markdownit: {
    injected: true
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {}
  },
  /** Contentful */
  contentful: {
    // the default callable env (accessible from $contentful.client)
    default: process.env.NODE_ENV,
    // a list of included environments, or a single env (like: 'production')
    // this is useful when you should filter out some credetials
    activeEnvironments: [process.env.NODE_ENV, 'development'],
    environments: {
      /*
      production: {
        space: process.env.PRODUCTION_CONTENTFUL_SPACE,
        accessToken: process.env.PRODUCTION_CONTENTFUL_ACCESSTOKEN
      },
      */
      development: {
        space: process.env.DEVELOPMENT_CONTENTFUL_SPACE,
        accessToken: process.env.DEVELOPMENT_CONTENTFUL_ACCESSTOKEN
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: ['contentful-module']
  },
  env: {
    CONTENTFUL_SPACE: process.env.DEVELOPMENT_CONTENTFUL_SPACE,
    CONTENTFUL_ACCESSTOKEN: process.env.DEVELOPMENT_CONTENTFUL_ACCESSTOKEN,
    CONTENTFUL_ENVIRONMENT: process.env.DEVELOPMENT_CONTENTFUL_ENVIRONMENT
  },
  generate: {
    routes () {
      return Promise.all([
        this.$contentful.client.getEntries({
          content_type: 'blogPost'
        })
      ]).then(([blogEntries]) => {
        return [...blogEntries.items.map(entry => entry.fields.slug)]
      })
    }
  }
}
