<template>
  <section class="hello-scribe-home" id="Top">
    <!-- <back-to-top />
    <landing-header /> -->
    <div>
      <router-view></router-view>
    </div>
    <!-- <landing-footer /> -->
  </section>
</template>

<script>
// import BackToTop from "./BackToTop.vue";
// import LandingHeader from "./LandingHeader.vue";
// import LandingFooter from "./LandingFooter.vue";
export default {
  name: "layout",
  components: {
    // BackToTop,
    // LandingHeader,
    // LandingFooter,
  },
};
</script>
