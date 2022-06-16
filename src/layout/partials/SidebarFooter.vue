<template>
  <ul class="nav sidebar-footer" id="sidebar-footer">
    <li class="nav-item">
      <a
        class="nav-link"
        href="https://www.helloscribe.ai/home/helloscribe-help-tutorials"
        target="_blank"
      >
        <div class="side-icon ituto"></div>
        <span class="menu-title">Tutorials</span>
      </a>
    </li>
    <li class="nav-item">
      <router-link
        class="nav-link"
        :to="{ name: routers.ACCOUNT }"
        @click.native="sidebarInlineButtonClick"
      >
        <div class="side-icon isetting"></div>
        <span class="menu-title">Settings</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
import routerItems from '../../constants/routerItems';
import * as auth from '../../services/AuthService';
export default {
  name: 'SidebarFooter',
  data() {
    return {
      collapses: [{ show: false }, { show: false }, { show: false }],
      imgProfile: this.$store.state.imgProfile,
      routers: routerItems,
    };
  },

  methods: {
    sidebarInlineButtonClick() {
      document.querySelector('#sidebar').classList.toggle('active');
    },
    collapseAll() {
      var exp_element = document.getElementsByClassName('show');
      if (exp_element.length > 0) {
        var elm_id = exp_element[0].id;
        this.$root.$emit('bv::toggle::collapse', elm_id);
      }
    },
    profileImgPath: function() {
      if (this.imgProfile) {
        return this.imgProfile;
      } else {
        return require('@/assets/images/faces/placeholder-avatar.jpg');
      }
    },

    logout: function() {
      auth.logout();
      //const path = "/";
      //if (this.$route.path !== path) {
      this.$router.push({ name: this.$routerItems.LOGIN });
      //}
    },
  },
};
</script>
<style lang="scss" scoped>
.sidebar-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  @media (max-width: 976px) {
    position: initial;
  }
}
</style>
