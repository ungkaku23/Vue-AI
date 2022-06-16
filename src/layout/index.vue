<template>
  <section class="main-view">
    <div class="container-scroller">
      <Header />
      <div class="container-fluid page-body-wrapper">
        <Sidebar />
        <div class="main-panel">
          <b-modal id="modal-1" title="Switching Account" :hide-footer="true">
            <b-spinner label="Loading..."></b-spinner>
            <p class="my-4">Please wait to load your account data...</p>
          </b-modal>
          <div class="content-wrapper p-0">
            <b-alert
              :show="!!subscribeInfoString"
              :variant="trialDays > 5 ? 'danger' : ''"
              class="text-center text-underline"
              style="font-size: 14px; display:none;"
            >
              {{ subscribeInfoString }}
              <router-link :to="{ name: $routerItems.BILLING }">
                Upgrade now!</router-link
              >
            </b-alert>
            <router-view></router-view>
          </div>
          <!-- content wrapper ends -->
          <Footer />
        </div>
        <!-- main panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
    <create-note />
  </section>
</template>

<script>
import Header from "./partials/Header";
import Sidebar from "./partials/Sidebar";
import Footer from "./partials/Footer";
import { mapGetters } from "vuex";
import CreateNote from "../components/common/CreateNote";

export default {
  name: "layout",
  components: {
    Header,
    Sidebar,
    Footer,
    CreateNote,
  },
  data() {
    return {
      subscribeInfoString: "",
      trialDays: 0,
    };
  },
  methods: {
    updateBanner() {
      if (
        this.currentUser &&
        !this.currentUser.subscribed &&
        this.currentUser.createdAt
      ) {
        const now = new Date();
        const createdAt = new Date(this.currentUser.createdAt);
        const diffTime = Math.abs(now - createdAt);
        this.trialDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (this.trialDays > 7) {
          this.subscribeInfoString = "Your free trial has expired. Need more?";
        } else {
          const days = 8 - this.trialDays;
          this.subscribeInfoString =
            days + " " + (days === 1 ? "day" : "days") + " left. Need more?";
        }
      } else {
        this.subscribeInfoString = "";
      }
    },
  },
  mounted() {
    this.updateBanner();
  },
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser",
      subscribed: "getSubscribedStatus",
    }),
  },
  watch: {
    subscribed() {
      this.updateBanner();
    },
  },
};
</script>
