<template>
    <div>
        <section class="pricing-table">
            <div class="text-center">
                <div class="cuscrip-plan-info">
                    <h4>Unlock Full Access Today</h4>
                    <p>Create your way to sucess!</p>
                </div>
                <subscription-plans :userInfo="userInfo" />
            </div>
        </section>
    </div>
</template>
<script>
import * as paymentService from "../../../services/PaymentService";
import * as auth from "../../../services/AuthService";
import SubscriptionPlans from "./SubscriptionPlans.vue";
import { mapGetters } from "vuex";
export default {
    name: "upgrade",
    components: {
        SubscriptionPlans
    },
    data() {
        return {};
    },
    mounted() {
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

</style>
