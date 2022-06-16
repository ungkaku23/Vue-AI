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
        <input type="text" placeholder="Search">
      </div>
      <b-button
        pill
        variant="primary"
        @click="showCreateProjectModal"
        class="createpro-btn"
        >New Project</b-button
      >
    </div>
    <create-project-modal />
  </div>
</template>
<script>
import CreateProjectModal from '../../pages/projects/CreateProjectModal.vue';
export default {
  components: { CreateProjectModal },
  name: 'MainToolbar',
  beforeMount() {
    this.$root.$on("createdProject", this.createdProject);
  },
  methods: {
    createdProject(project) {
      this.$bvModal.hide('CreateProjectModal');
      this.loadData();
    },
    showCreateProjectModal() {
      this.$bvModal.show('CreateProjectModal');
    },
  },
  computed: {
    projectName() {
      return this.$store.state.currentProjectName;
    },
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
