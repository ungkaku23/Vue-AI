<template>
  <div>
    <div class="iq-card">
      <div class="iq-card-body p-0">
        <div class="iq-edit-list">
          <ul class="iq-edit-profile d-flex nav nav-pills">
            <li class="col-md-3 p-0">
              <router-link
                class="nav-link"
                :to="{ name: $routerItems.ACCOUNT }"
                exact-active-class="exact-active"
              >
                Personal Info.
              </router-link>
            </li>
            <li class="col-md-3 p-0">
              <router-link
                class="nav-link"
                :to="{ name: $routerItems.PASSWORD }"
                exact-active-class="exact-active"
                >Password</router-link
              >
            </li>
            <!-- Hide Team for user role if you want -->
            <!-- v-if="!(role === 'user')" -->
            <li class="col-md-3 p-0">
              <router-link
                class="nav-link"
                :to="{ name: $routerItems.TEAM }"
                exact-active-class="exact-active"
                >Team</router-link
              >
            </li>
            <li class="col-md-3 p-0">
              <router-link
                class="nav-link"
                :to="{ name: $routerItems.BILLING }"
                exact-active-class="exact-active"
                >Billing</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "breadcrumb",
  data() {
    return {
      role: this.$store.state.role,
    };
  },
  methods: {},
  components: {},
};
</script>
