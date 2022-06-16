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
        <input type="text" placeholder="Search Files" @keyup="filterFile()" v-model="keyword">
      </div>
      <!-- <b-button
        pill
        variant="primary"
        @click="showAddMemberModal"
        class="createpro-btn"
        >Add member</b-button
      > -->
    </div>
    
  </div>
</template>
<script>

export default {
  components: {  },
  name: 'OverviewToolbar',
  data() {
    return {
      keyword: null,
    }
  },
  methods: {
    showAddMemberModal() {
      
    },
    filterFile() {
      this.$emit('filterFile', this.keyword);
    }
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
