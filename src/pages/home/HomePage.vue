<template>
  <div>
    <hero />
    <perfect-writing-partner />
    <how-it-works />
    <take-your-writing />
    <our-customers />
    <price-over-view />
    <faq />
  </div>
</template>

<script>
import { email } from "vuelidate/lib/validators";
import Faq from "../../components/landing/Faq.vue";
import Hero from "../../components/landing/Hero.vue";
import HowItWorks from "../../components/landing/HowItWorks.vue";
import OurCustomers from "../../components/landing/OurCustomers.vue";
import PerfectWritingPartner from "../../components/landing/PerfectWritingPartner.vue";
import PriceOverView from "../../components/landing/PriceOverView.vue";
import TakeYourWriting from "../../components/landing/TakeYourWriting.vue";
import routerItems from "../../constants/routerItems";
import { http } from "../../services/HttpService";
export default {
  components: {
    PriceOverView,
    Faq,
    Hero,
    TakeYourWriting,
    PerfectWritingPartner,
    HowItWorks,
    OurCustomers,
  },
  name: "HomePage",
  data() {
    return {
      optin: {
        email: null,
        message: null,
      },
      submitted: false,
      routeItems: routerItems,
    };
  },
  validations: {
    optin: {
      email: { email },
    },
  },
  methods: {
    async optinSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      /* Subscription feeds */
      http()
        .post("/opt-in", { email: this.optin.email })
        .then(
          function (response) {
            if (response) {
              this.optin.message = response.data.message;
              this.optin.email = null;
            }
          }.bind(this)
        )
        .catch(
          function (error) {
            this.optin.message = error.response.data.message;
          }.bind(this)
        );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>