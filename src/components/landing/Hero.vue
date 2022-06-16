<template>
  <div id="Hero" class="section hero-v2">
    <div class="wrapper">
      <div class="w-layout-grid main-grid">
        <div
          id="w-node-d0d3bf36-e56e-f538-344b-80a0c94f3946-faf2d5a5"
          class="intro left"
        >
          <h1 class="heading-31">AI-Powered Writing Assistant for PR Pros</h1>
          <p class="text-big">
            HelloScribe uses powerful artificial intelligence to help you draft
            blogs, press releases, newsworthy headlines, and more - instantly!
          </p>
          <div class="_2-buttons">
            <router-link
              :to="{ name: $routerItems.REGISTER }"
              id="w-node-_1d6378f9-aa40-7ce4-681d-abc3b20bc01e-faf2d5a5"
              class="button w-button"
              >Start your Free 7-day Trial</router-link
            >
          </div>
          <div class="text-block-6 mt-2">Unlimited Access. Cancel Anytime</div>
        </div>
      </div>
    </div>
    <router-link
      to="#Features"
      v-scroll-to="'#Features'"
      class="scroll-icon-link w-inline-block"
    >
      <div class="scroll-mouse">
        <div class="scroll-mouse-wheel"></div>
      </div>
    </router-link>
    <div class="bg-elements">
      <div class="bg-element-1"></div>
      <div class="bg-element-2"></div>
      <div class="bg-element-3"></div>
      <div class="bg-element-4"></div>
    </div>
    <img src="@/assets/images/icons/decor-v1.svg" alt="" class="decor-bottom" />
  </div>
</template>
<script>
export default {
  name: "Hero",
};
</script>