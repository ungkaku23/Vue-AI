<template>
  <div
    class="project-card new-procard"
    :class="{ current: project._id === currentProjectId }"
    v-on:click="gotoProjectOverview"
  >
    <div class="project-mainhead">
      <img src="~@/assets/images/icons/project-icon.png">
      <div class="project-maininfo">
        <h4>{{ project.name }}</h4>
        <p>{{ project.description }}</p>
      </div>
      <b-dropdown size="sm" right v-if="!disable_edit">
        <b-dropdown-item-button variant="primary" v-on:click.stop="renameProject">
          <div class="d-flex align-items-center">
            <span class="material-icons-outlined mr-2"> mode_edit </span>Rename
          </div>
        </b-dropdown-item-button>
        <b-dropdown-item-button variant="primary" v-on:click.stop="removeProject">
          <div class="d-flex align-items-center">
            <span class="material-icons-outlined mr-2"> delete </span>Delete
          </div>
        </b-dropdown-item-button>
      </b-dropdown>
    </div>
    <div class="project-header">
      <div class="d-flex align-items-center text-capitalize" style="display:none !important">
        {{ project.audience }}
        <b-badge
          :variant="
            project.projectType === 'team'
              ? 'outline-success'
              : 'outline-danger'
          "
          class="ml-3"
          pill
        >
          {{ project.projectType }}
        </b-badge>
      </div>
      <div class="usericons-head">
        <ul>
          <li v-for="(item, key) in project.users" :key="key"><div class="profile-image">S</div></li>
        </ul>
        <p class="totalmembers">{{project.users.length}} members</p>
      </div>
      <!-- <div class="to-review">To Review</div> -->
    </div>
    <div class="project-updated">
      <div class="time-info">
        <div class="info-title">Date Created</div>
        <div class="time">{{ $func.formattedDate(project.createdAt) }}</div>
      </div>
      <div class="time-info">
        <div class="info-title">Last Modified</div>
        <div class="time"><timeago :datetime="project.updatedAt" /></div>
      </div>
    </div>
    
    <!-- <div class="d-flex justify-content-between align-items-center">
      <b-button variant="outline-primary" pill @click="gotoProjectOverview"
        >View Project</b-button
      >
      <b-dropdown size="sm" right>
        <b-dropdown-item-button variant="primary" @click="setActiveProject">
          <div class="d-flex align-items-center">
            <span class="material-icons-outlined mr-2"> face </span>
            Set as an Active Project
          </div>
        </b-dropdown-item-button>
        <b-dropdown-item-button variant="primary" @click="gotoProjectSettings">
          <div class="d-flex align-items-center">
            <span class="material-icons-outlined mr-2"> settings </span>Project
            Settings
          </div>
        </b-dropdown-item-button>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item-button variant="primary" @click="removeProject">
          <div class="d-flex align-items-center">
            <span class="material-icons-outlined mr-2"> delete </span>Delete
          </div>
        </b-dropdown-item-button>
      </b-dropdown>
    </div> -->
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { http } from '../../services/HttpService';

export default {
  name: 'ProjectCard',
  props: ['project', 'disable_edit'],
  computed: {
    currentProjectId() {
      return this.$store.state.currentProjectId;
    },
  },
  methods: {
    ...mapActions({
      updateCurrentProject: 'updateCurrentProject',
    }),
    gotoProjectOverview() {
      this.$router.push('/project-overview/' + this.project._id);
    },
    // gotoProjectSettings() {
    //   this.$router.push('/project-settings/' + this.project._id);
    // },
    async setActiveProject() {
      try {
        const rt = await this.updateCurrentProject(this.project._id);
      } catch (err) {
        console.log(err);
      }
    },
    removeProject() {
      this.$bvModal
        .msgBoxConfirm('Do you want to delete this item?', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          cancelVariant: 'primary',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true,
        })
        .then(async (value) => {
          if (value) {
            try {
              await http().delete('project/' + this.project._id);
              this.$emit('deletedProject');
            } catch (err) {}
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
    renameProject() {
      this.$emit('show_project_rename_modal', this.project );
    }
  },
};
</script>
<style lang="scss" scoped>
.project-card {
  border-radius: 4px;
  transition: all 0.3s ease;
  background-color: white;
  padding: 30px 25px;
  cursor: pointer;
  &:hover {
    background-color: #fafafa;
  }
  &.current {
    background-color: #fff;
  }
  .project-title {
    font-weight: bold;
    font-size: 22px;
  }
}
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  .to-review {
    border-radius: 6px;
    background-color: #FEF6E3;
    padding: 6px 12px;
    font-size: 12px;
    // color: var(--indigo);
    color: #F5C242;
  }
}
.project-updated {
  display: inline-block;
  width: 100%;
  .time-info {
    padding: 4px 0px;
    width: 100%;
    .info-title {
      color: #5e6278;
      display: inline-block;
      width: 50%;
      font-size: 14px;
    }
    .time {
      font-size: 14px;
      color: #280728;
      display: inline-block;
      width: 50%;
      text-align: right;
      font-weight: 600;
    }
  }
}
.profile-image {
    background: #e91e63;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    color: white;
    text-align: center;
    vertical-align: middle;
    border: 1px solid white;
} 
</style>
