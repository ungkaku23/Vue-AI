<template>
  <div>
    <div class="section top-section">
      <div class="wrapper">
        <div class="page-intro">
          <h1 class="page-heading">Pricing</h1>
          <div style="width: 0px" class="divider page-intro-divider"></div>
          <div class="breadcrumbs">
            <a href="#" class="breadcrumbs-link">Home</a>
            <div class="breadcrumbs-arrow"></div>
            <div>Pricing</div>
          </div>
        </div>
      </div>
      <div class="bg-elements">
        <div class="bg-element-1"></div>
        <div class="bg-element-2"></div>
        <div class="bg-element-3"></div>
        <div class="bg-element-4"></div>
      </div>
      <img
        src="@/assets/images/icons/decor-v1-haze.svg"
        alt=""
        class="decor-bottom"
      />
    </div>
    <price-over-view />
  </div>
</template>

<script>
import PriceOverView from "../../components/landing/PriceOverView.vue";
export default {
  components: { PriceOverView },
  name: "Pricing",
};
</script>