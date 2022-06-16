const config = {
  appName: 'HelloScribe',
  appHomeUrl: 'https://www.helloscribe.ai',
  appUrl: process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.VUE_APP_API_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL,
  tinyMCEApiKey: process.env.VUE_APP_TINY_API_KEY,
  codoxTinyMCEApiKey: process.env.VUE_APP_CODOX_TINYMCE_API_KEY,
  intercomAppId: process.env.VUE_APP_INTERCOM_APP_ID,
  hotjarSiteId: process.env.VUE_APP_HOTJAR_SITE_ID,
  amplitudeApiKey: process.env.VUE_APP_AMPLITUDE_API_KEY,
  googleAnalyticsId: process.env.VUE_APP_GOOGLE_ANALYTICS_ID,
  googleTagManagerId: process.env.VUE_APP_GTM_ID,
  stripePublishableKey: process.env.NODE_ENV != 'production' ? process.env.VUE_APP_STRIPE_TEST_PUBLISHABLE_KEY : process.env.VUE_APP_STRIPE_LIVE_PUBLISHABLE_KEY,
  appBaseUrl: process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? 'http://localhost:8080' : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL,
  mojoApiKey: process.env.NODE_ENV != 'production' ? process.env.VUE_APP_MOJO_TEST_KEY : process.env.VUE_APP_MOJO_LIVE_KEY,
  googleClientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.VUE_APP_GOOGLE_CLIENT_SECRET,
  productTeamId: process.env.NODE_ENV != 'production' ? process.env.VUE_APP_STRIPE_TEST_PRODUCT_TEAM_ID : process.env.VUE_APP_STRIPE_LIVE_PRODUCT_TEAM_ID
};

console.log("NODE_ENV6: ", process.env.NODE_ENV);

export default config;
