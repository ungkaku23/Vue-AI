<template>
  <div
    data-collapse="medium"
    data-animation="default"
    data-duration="400"
    role="banner"
    class="nav-bar w-nav"
  >
    <div class="wrapper nav-bar-wrapper">
      <a
        :href="$config.appHomeUrl"
        aria-current="page"
        class="brand w-nav-brand w--current"
        ><img
          src="@/assets/images/home/brandmark-design-3.png"
          sizes="(max-width: 767px) 92.70000457763672px, (max-width: 991px) 12vw, 123.5999984741211px"
          srcset="
            @/assets/images/home/brandmark-design-3-p-1080.png 1080w,
            @/assets/images/home/brandmark-design-3-p-1600.png 1600w,
            @/assets/images/home/brandmark-design-3-p-2000.png 2000w,
            @/assets/images/home/brandmark-design-3-p-2600.png 2600w,
            @/assets/images/home/brandmark-design-3.png        2866w
          "
          alt=""
          class="logo"
        />
        <div class="logo-text">{{ $config.appName }}</div>
      </a>
      <div class="navigation">
        <nav
          role="navigation"
          class="nav-menu w-nav-menu"
          :class="{ 'w--open': toggle }"
          @click="toggle = !toggle"
        >
          <router-link
            :to="{ name: $routerItems.PRICING }"
            class="nav-link w-nav-link"
            >Pricing</router-link
          >
          <router-link
            :to="{ name: $routerItems.DASHBOARD }"
            class="nav-link w-nav-link"
            >Contact</router-link
          >
          <router-link
            v-if="!this.$store.state.isLoggedIn"
            :to="{ name: $routerItems.REGISTER }"
            class="nav-link w-nav-link"
            >Register</router-link
          >
          <router-link
            v-if="!this.$store.state.isLoggedIn"
            :to="{ name: $routerItems.LOGIN }"
            class="nav-link w-nav-link"
            >Login</router-link
          >
          <router-link
            v-if="this.$store.state.isLoggedIn"
            :to="{ name: $routerItems.DASHBOARD }"
            class="nav-link w-nav-link"
            >Dashboard</router-link
          >
        </nav>
        <div class="nav-right">
          <div class="w-layout-grid nav-buttons">
            <router-link
              v-if="!this.$store.state.isLoggedIn"
              :to="{ name: $routerItems.REGISTER }"
              target="_blank"
              class="button nav-button w-button"
              >Start Free Trial</router-link
            >
          </div>
        </div>
        <div
          class="menu-button w-clearfix w-nav-button"
          :class="{ 'w--open': toggle }"
          @click="toggle = !toggle"
        >
          <div class="menu-icon">
            <div class="menu-icon-line-top"></div>
            <div class="menu-icon-line-middle"></div>
            <div class="menu-icon-line-bottom"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LandingHeader",
  data() {
    return {
      toggle: false,
    };
  },
};
</script>
