<template>
  <div class="maintoolbar-top">
    <div class="d-flex justify-content-between w-100 pad-30 bg-white">
      <!-- <div class="bread-crumbs">
        <router-link
          class="bread-crumb-item"
          :to="{ name: $routerItems.EXPLORER_PROJECTS }"
          >PROJECTS</router-link
        >
        <div class="bread-crumb-item">
          {{ projectName }}
        </div>
      </div> -->
      <div class="searchbar-top">
        <input type="text" placeholder="Search Projects" @keyup="filterProject()" v-model="keyword">
      </div>
      <!-- <b-button
        v-if="subscriptionInfo.product_id === $config.productTeamId"
        pill
        variant="light"
        @click="showAddNewMemberModal"
        class="createlight-btn"
      >
        Add New Member
      </b-button> -->
      <add-new-member-modal></add-new-member-modal>
      <!-- <b-button
        pill
        variant="primary"
        @click="showCreateProjectModal"
        class="createpro-btn"
        >New Project</b-button
      > -->
    </div>
    
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as paymentService from "../../services/PaymentService";
import AddNewMemberModal from "../../components/common/modal/AddNewMemberModal.vue";
export default {
  data() {
    return {
      keyword: '',
      subscriptionInfo: {
        product_id: null
      },
    }
  },
  components: { AddNewMemberModal },
  name: 'ProjectToolbar',
  methods: {
    filterProject() {
      this.$root.$emit('filterProject', this.keyword);
    },
    showAddNewMemberModal() {
      console.log("add new member");
      this.$bvModal.show('AddNewMemberModal');
    }
  },
  mounted() {
    paymentService.getSubscriptionInformation(this.userInfo.stripeCustomerId)
      .then((response) => {
        if (response) {
          this.subscriptionInfo.product_id = response.data.subscriptionInfo.product_id;
        }
      });
  },
  computed: {
    projectName() {
      return this.$store.state.currentProjectName;
    },
    ...mapGetters({
        userInfo: "getCurrentUser"
    })
  },
};
</script>
<style lang="scss" scoped>
.bread-crumbs {
  display: flex;
  align-items: center;
  .bread-crumb-item {
    font-weight: 500;
    text-transform: uppercase;
    padding: 3px 20px 3px 0;
    border-right: solid 2px var(--gray-light);
    margin-right: 20px;
    &:last-child {
      border-right: none;
    }
  }
}
</style>
