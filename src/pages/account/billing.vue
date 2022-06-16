<template>
    <div>
        <section class="billing mb-4">
            <Header/>
            <div class="profilecenterbox">
                <div v-if="subscriptionLoading" class="loading-panel">
                    Stripe Payment Processing....
                </div>
                <div class="text-center pb-4">
                    <Breadcrumb />
                </div>
                <div
                    class="changeplan-box"
                    v-if="subscriptionInfo.cancel_at_period_end && this.subscriptionInfo.status == 'active'"
                >
                    <div class="changeplan-left">
                        <h4>
                            {{
                                "$" +
                                subscriptionInfo.price +
                                "/" +
                                (subscriptionInfo.price >= 150
                                    ? "year"
                                    : "month")
                            }}
                        </h4>
                        <div class="inputsec-changeplan">
                            <input
                                type="text"
                                :placeholder="subscriptionInfo.card_last4"
                                disabled
                            />
                            <img
                                src="~@/assets/images/icons/cardtype.png"
                                class="card-icon"
                            />
                            <a @click="redirectBillingSubscription">
                                <img
                                    src="~@/assets/images/icons/refreshcardd.png"
                                    class="card-refresh"
                                />
                            </a>
                        </div>
                        <p>
                            Your plan will remain active until your billing
                            period ends on :
                            <span>{{subscriptionInfo.current_period_end}}</span>
                        </p>
                        <a @click="redirectBillingSubscription">Reactivate subscription</a
                        >
                    </div>
                    <div
                        class="changeplan-right"
                        v-if="this.$store.state.subscribed"
                    >
                        <h5>Change plan</h5>
                        <p>You can easily change the plan you choose</p>
                        <button 
                            @click="redirectBillingSubscription"
                            class="btn btn btn-fw btn-primary"
                        >
                            Change
                        </button>
                    </div>
                </div>
                <div class="changeplan-box" v-if="this.$store.state.subscribed && !subscriptionInfo.cancel_at_period_end">
                    <div class="changeplan">
                        <h3>Current Plan</h3>
                        <h4>
                            {{
                                "$" +
                                subscriptionInfo.price +
                                "/" +
                                (subscriptionInfo.price >= 150
                                    ? "year"
                                    : "month")
                            }}
                        </h4>
                        <div class="inputsec-changeplan">
                            <input
                                type="text"
                                :placeholder="subscriptionInfo.card_last4"
                                disabled
                            />
                            <img
                                src="~@/assets/images/icons/cardtype.png"
                                class="card-icon"
                            />
                        </div>
                        <div class="row">
                            <a @click="redirectBillingSubscription">Change Plan</a>
                            <a @click="redirectBillingSubscription">Update Payment Method</a>
                            <a @click="redirectBillingSubscription">Cancel Subscription</a>
                        </div>
                    </div>
                </div>
                <div class="grid-margin stretch-card mb-0">
                    <div class="card border-0">
                        <div class="card-body pl-0 pr-0 pb-0">
                            <div
                                class="inline-block border p-3 rounded"
                                v-if="!this.$store.state.subscribed || this.subscriptionInfo.status != 'active'"
                            >
                                <div class="subsbox-fix">
                                    <div class="">
                                        <h4>Start Your Subscription</h4>
                                        <p>
                                            Choose the plan that suits you best.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        class="btn btn btn-fw btn-primary"
                                        @click="onUpgrade"
                                    >
                                        View Plans
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="subscriptionInfo.invoices" class="col-md-12 mt-2">
                    <h6 class="card-title">Invoices</h6>
                    <div class="col-md-8 grid-margin stretch-card">
                        <b-table
                            :items="subscriptionInfo.invoices"
                            id="table-list"
                            responsive
                        >
                            <template v-slot:cell(Invoice)="data">
                                <b-link
                                    :href="data.value"
                                    class="
                                        btn
                                        btn-outline-HelloScribe
                                        btn-icon-text
                                    "
                                    role="button"
                                >
                                    <i class="icon-doc btn-icon-append"></i>Download
                                </b-link>
                            </template>
                        </b-table>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import Breadcrumb from "../account/breadcrumb";
import * as paymentService from "../../services/PaymentService";
import * as auth from "../../services/AuthService";
import { http } from "../../services/HttpService";
import Swal from 'sweetalert2';
import { mapGetters } from "vuex";
import Header from "./header.vue";

//import store from "../../store/index";
export default {
    name: "billing",
    components: {
        Breadcrumb,
        Header
    },
    data() {
        return {
            subscriptionLoading: false,
            subscriptionInfo: {
                plan: null,
                card_last4: null,
                card_brand: null,
                current_period_end: null,
                cancel_at_period_end: null,
                subscription_id: null,
                invoices: null,
                status: null,
            },
            returnURL: `${this.$config.appBaseUrl}/subscription/success-upgrade`
        };
    },
    computed: {
        ...mapGetters({
            userInfo: "getCurrentUser",
        }),
    },
    methods: {
        redirectBillingSubscription() {
            http()
                .post("/redirect-billing-subscription", {
                    info: {
                        customer: this.userInfo.stripeCustomerId,
                        return_url: this.returnURL
                    }
                }).then(res => {
                    console.log("session & customerid", res.data.session, this.userInfo.stripeCustomerId);
                    this.subscriptionLoading = true;
                    console.log("checkout res: ", res.data.session.url);
                    window.location.href = res.data.session.url;

                }).catch(err => {
                    this.subscriptionLoading = false;
                    console.log("checkout err: ", err);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: err.message,
                        showConfirmButton: false,
                        customClass: {
                            popup: 'toast-popup',
                            header: 'toast-header',
                            title: 'toast-title'
                        },
                        timer: 1500
                    });
                });
        },
        showSubscriptionInformation() {
            const stripeCustomerId = this.userInfo.stripeCustomerId;
            paymentService.getSubscriptionInformation(stripeCustomerId).then(
                function (response) {
                    if (response) {
                        this.subscriptionInfo.subscription_id =
                            response.data.subscriptionInfo.subscription_id;
                        this.subscriptionInfo.price =
                            response.data.subscriptionInfo.price / 100;
                        this.subscriptionInfo.card_last4 =
                            response.data.subscriptionInfo.card_last4;
                        this.subscriptionInfo.card_brand =
                            response.data.subscriptionInfo.card_brand.toUpperCase();
                        this.subscriptionInfo.current_period_end =
                            paymentService.secondsToISOString(
                                response.data.subscriptionInfo
                                    .current_period_end
                            );
                        this.subscriptionInfo.cancel_at_period_end =
                            response.data.subscriptionInfo.cancel_at_period_end;
                        this.subscriptionInfo.status = response.data.subscriptionInfo.status;
                    }
                }.bind(this)
            );
            console.log("sub_info", this.subscriptionInfo);
        },
        onUpgrade() {
            http()
                .get("/check-subscription")
                .then(
                    function (response) {
                        if (response.status === 200) {
                            this.$router.push({
                                name: this.$routerItems.UPGRADE,
                            });
                        }
                    }.bind(this)
                )
                .catch(
                    function (error) {
                        if (error.response) {
                            auth.updateSession(
                                error.response.data.state.payload
                            );
                            this.$swal.fire({
                                position: "top-end",
                                icon: "error",
                                title: error.response.data.state.message,
                                showConfirmButton: false,
                                timer: 2000,
                            });
                        }
                    }.bind(this)
                );
        },
    },
    mounted: function () {
        if (this.$store.state.subscribed) {
            this.showSubscriptionInformation();
        }
        const canceled = auth.getCanceled();
        if (canceled) {
            this.$swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Warning",
                text: "Your current plan has expired. Please upgrade to continue",
                showConfirmButton: true,
            });
        }
    },
    beforeCreate: function () {

    },
    beforeMount: function () {
        const cusId = auth.getCustomerId();
        if (!cusId) {
            return;
        }
        paymentService.getInvoices(cusId).then(
            function (response) {
                if (response.data.invoices.length > 0) {
                    // the array is defined and has at least one element
                    this.subscriptionInfo.invoices = response.data.invoices;
                }
            }.bind(this)
        );
    },
};
</script>
<style>
.isDisabled {
    color: currentColor;
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
    text-decoration: none;
}
.alert-profile-tag a:not([href]):not([class]) {
    text-decoration: underline;
    color: #e91e63;
    cursor: pointer;
}
a {
    cursor: pointer;
}
</style>
