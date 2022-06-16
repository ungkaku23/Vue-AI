<template>
  <div class="success-page">
    <h3>Congratulations!</h3>
    <p class="text-info font-weight-bold">
      You have successfully updated current subscription.<br />
      Please wait for a few seconds...
    </p>
  </div>
</template>
<script>
import * as paymentService from "../../services/PaymentService";
import { mapGetters } from "vuex";

export default {
  name: "SubscriptionSuccessUpgrade",
  mounted() {
    paymentService.upgradeSubscription(this.userInfo.stripeCustomerId);
  },
  methods: {
  },
  computed: {
      ...mapGetters({
          userInfo: "getCurrentUser",
      })
  }
};
</script>

<style lang="scss" scoped>
h3 {
  color: #878686;
}
.success-page {
  min-height: calc(100vh - 170px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>