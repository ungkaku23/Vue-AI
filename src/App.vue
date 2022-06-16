<template>
  <div id="app">
    <router-view></router-view>
    <back-to-top />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BackToTop from './layout/landing-layout/BackToTop.vue';
export default {
  name: 'app',
  components: { BackToTop },
  //Before Create Check Authenticate State
  beforeCreate: function() {},
  beforeMount() {
    window.addEventListener('beforeunload', this.handlerClose);
  },

  beforeDestroy() {
    window.removeEventListener('beforeunload', this.handlerClose);
  },

  methods: {
    handlerClose(event) {
      const confirmMsg = 'Close without saving?';
      if (this.isSavedArticles) return;
      this.$router.push(this.$routerItems.ARTICLE);
      event.returnValue = confirmMsg;
      return confirmMsg;
    },
  },
  computed: {
    ...mapGetters({
      isSavedArticles: 'articleStore/isSavedArticles',
    }),
  },
  mounted() {
    this.$store.dispatch('authenticate');
    this.$store.dispatch('confirmEmail');
    this.$store.commit("updateLanguage");
  },
};
</script>

<style lang="scss">
@import '../node_modules/@mdi/font/css/materialdesignicons.min.css';
@import '../node_modules/font-awesome/css/font-awesome.min.css';
@import '../node_modules/simple-line-icons/css/simple-line-icons.css';
@import '../node_modules/ti-icons/css/themify-icons.css';
@import '../node_modules/sweetalert2/dist/sweetalert2.min.css';
@import './assets/scss/style';
</style>
