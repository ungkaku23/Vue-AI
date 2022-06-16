import Vue from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import VueSweetalert2 from 'vue-sweetalert2';
import VueScrollTo from 'vue-scrollto';
import store from './store';
import Vuelidate from 'vuelidate';
import PerfectScrollbar from 'vue2-perfect-scrollbar';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';
import commonFuncs from './utils/common';
import { ModalPlugin } from 'bootstrap-vue';
import routerItems from './constants/routerItems';
import Hotjar from 'vue-hotjar';
// import VueGtm from '@gtm-support/vue2-gtm';
import config from './constants/config';
import VueAmplitude from 'vue-amplitude';
import VueTimeago from 'vue-timeago';
import 'material-icons/iconfont/material-icons.css';
import 'bootstrap-slider/dist/css/bootstrap-slider.css';
import bFormSlider from 'vue-bootstrap-slider';
import { PopoverPlugin } from 'bootstrap-vue';
import GAuth from "vue-google-oauth2";

const isProduction = process.env.NODE_ENV === 'production';
Vue.use({
  install: function(Vue, options){
      Vue.prototype.$jQuery = require('jquery'); // you'll have this.$jQuery anywhere in your vue project
      }
  });
Vue.use(ModalPlugin);
Vue.use(PerfectScrollbar);
Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.use(VueScrollTo);
Vue.use(Hotjar, { id: config.hotjarSiteId, isProduction: isProduction });
Vue.use(bFormSlider);
Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
});

Vue.use(GAuth, {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: "profile email",
  prompt: "select_account",
  fetch_basic_profile: false
});

// Vue.use(VueGtm, {
//   id: config.googleTagManagerId, // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryPararms: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}]
//   queryParams: {
//     // Add url query string when load gtm.js with GTM ID (optional)
//     gtm_auth: 'AB7cDEf3GHIjkl-MnOP8qr',
//     gtm_preview: 'env-4',
//     gtm_cookies_win: 'x'
//   },
//   defer: false, // defaults to false. Script can be set to `defer` to increase page-load-time at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible)
//   enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
//   debug: true, // Whether or not display console logs debugs (optional)
//   loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
//   vueRouter: router, // Pass the router instance to automatically sync with router (optional)
//   ignoredViews: [], // Don't trigger events for specified router names (case insensitive) (optional)
//   trackOnNextTick: false // Whether or not call trackView in Vue.nextTick
// });

Vue.use(VueAmplitude, { apiKey: config.amplitudeApiKey });
Vue.use(PopoverPlugin);
Vue.prototype.$func = commonFuncs;
Vue.prototype.$config = config;
Vue.prototype.$routerItems = routerItems;

Vue.config.productionTip = isProduction;

new Vue({
  router,
  store,
  render: (h) => h(App),
  watch: {
    $route: () => {},
  },
}).$mount('#app');
