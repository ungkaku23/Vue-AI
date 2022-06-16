<template>
  <b-button
    pill
    variant="outline-secondary"
    class="back-to-top btn-icon"
    @click="scrollToTop"
    :class="{ show: show }"
  >
    <span class="material-icons">
      arrow_upward
    </span>
  </b-button>
</template>
<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      show: false,
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
    scrollEvent() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.scrollEvent);
    this.scrollEvent();
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollEvent);
  },
};
</script>
<style lang="scss" scoped>
.back-to-top {
  position: fixed;
  z-index: 800;
  bottom: 10px;
  right: 20px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s linear;
  &.show {
    opacity: 1;
    visibility: visible;
  }
}
</style>
