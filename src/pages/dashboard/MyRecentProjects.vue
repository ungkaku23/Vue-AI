<template>
  <div>
    <div class="mb-4">
      <div class="">
        <div class="d-flex justify-content-between">
          <h4>
            Project Tracker
            <!-- <span class="text-muted ml-2 text-small"
              >(All {{ allProjectCnt }} projects)</span
            > -->
          </h4>
        </div>
        <div class="p-5 text-center" v-if="!loading && projects.length === 0">
          There are no projects yet.
        </div>
        <div class="p-5 text-center" v-if="loading">
          <b-spinner variant="primary" />
        </div>
        <div class="row">
          <div
            class="col-sm-6 col-md-4 col-lg-3"
            v-for="(project, idx) in projects"
            :key="idx"
          >
            <project-card :project="project" @deletedProject="deletedProject" :disable_edit="true"/>
          </div>
        </div>
      </div>
      <create-project-modal @createdProject="createdProject" />
    </div>
  </div>
</template>
<script>
import ProjectCard from '../../components/common/ProjectCard.vue';
import { http } from '../../services/HttpService';
import CreateProjectModal from '../projects/CreateProjectModal.vue';
export default {
  components: { CreateProjectModal, ProjectCard },
  name: 'MyRecentProjects',
  data() {
    return {
      loading: false,
      projects: [],
      allProjectCnt: 0,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    createdProject() {
      this.loadData();
    },
    deletedProject() {
      this.loadData();
    },
    async loadData() {
      this.loading = true;
      try {
        const { data } = await http().get('recent-projects');
        this.projects = data.projects;
        this.allProjectCnt = data.allProjectCnt;
      } catch (err) {}
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.new-document-container {
  display: flex;
  align-items: center;
  justify-content: center;
  // padding: 60px;
  flex-direction: column;

  .new-document {
    display: flex;
    align-items: center;
    justify-content: center;

    &.clickable {
      border: 1px solid #3f0e40;
      padding: 6px;
      border-radius: 4px;
      // position: absolute;
      // top: 0;
    }
    &:focus {
      outline: none;
    }

    span {
      width: 25px;
      height: 25px;
      padding: 5px;
      background-color: #3f0e40;
      border-radius: 50%;
      font-size: 15px;
      font-weight: bold;
      color: white;
    }
  }

  .create-new {
    font-size: 16px;
    color: '#B0A7A7';
    // margin-top: 20px;
    margin-left: 10px;
    font-weight: 500;
    color: #3f0e40;
    line-height: 22px;
  }
}
</style>
