<template>
  <div class="container">
    <div class="service-card-wrap u-mb-md">
      <div class="column">
        <div class="service-card-2">
          <div class="card-content-wrap w-clearfix">
            <h3 class="heading-3">Unstuck Yourself<br /></h3>
            <p class="paragraph-9">
              Save time and boost your productivity. Just click, create, and say
              goodbye to writer's block forever.
            </p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="service-card-2">
          <div class="card-content-wrap w-clearfix">
            <h3 class="heading-3">Create More</h3>
            <p class="paragraph-9">
              Get your creative juices flowing right away with a dose of
              artificial intelligence inspired creativity.
            </p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="service-card-2">
          <div class="card-content-wrap w-clearfix">
            <h3 class="heading-3">Write Smarter</h3>
            <p class="paragraph-9">
              Our platform adapts to your writing style over time. The more you
              use it, the smarter it gets.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="message-2 w-clearfix">
      <div class="message-text-2">Made for Professionals. Easy for anyone</div>
      <router-link
        :to="{ name: $routerItems.REGISTER }"
        class="button-2 w-button"
        >Start Now. It's Free</router-link
      >
      <div class="text-block-6 mt-2">Unlimited Access. Cancel Anytime</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HowItWorks",
};
</script>
