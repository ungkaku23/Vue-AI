<template>
    <div>
        <ProjectToolBar />
        <div class="explorer-container">
            <!-- <div class="d-flex justify-content-between align-items-center mb-4">
        <h3>
          My Projects
          <span class="text-muted ml-2 text-small"
            >({{ projects.length }} / {{ allProjectCnt }} projects)</span
          >
        </h3>
        <b-form-group>
          <b-input-group>
            <b-form-input
              v-model="query"
              placeholder="Search Saved Drafts"
              @keyup="filterData()"
            />
            <b-input-group-append>
              <span class="material-icons-outlined"> search </span>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div> -->
            <div class="d-flex p-5 justify-content-center" v-if="loading">
                <b-spinner variant="primary" label="Spinning"></b-spinner>
            </div>
            <div class="row" v-if="!loading">
                <div class="empty-status newproject-create" v-if="!exist_any">
                    <p>Create a New Project to Get Started</p>
                    <button @click="showCreateProjectModal">+ New Project</button>
                </div>
                <div class="newporject-create text-center">
                    <img src="~@/assets/images/icons/pencilline-create.png">
                    <h3> Think Faster. Write Better</h3>
                    <p> Create new project to get started.</p>
                    <button class="btn createpro-btn btn-primary rounded-pill" @click="showCreateProjectModal"> + New Project </button>
                </div>
                
                <div
                    class="col-sm-6 col-md-4 mb-4 ipad-fix"
                    v-for="(item, idx) in projects"
                    :key="idx"
                >
                    <project-card
                        :project="item"
                        @deletedProject="deletedProject"
                        @show_project_rename_modal="show_project_rename_modal"
                    />
                </div>
            </div>
            <div class="pagination-custom">
                <div class="d-flex justify-content-between w-100">
                    <div class="list-number-filter">
                        <select v-model="project_limit" v-on:change="loadData">
                            <option value="12">12</option>
                            <option value="24">24</option>
                            <option value="36">36</option>
                            <option value="48">48</option>
                            <option value="60">60</option>
                        </select>
                    </div>
                    <div class="pagination-custom-view">
                        <button v-on:click="prev_page">
                            <img
                                src="~@/assets/images/icons/pagarrow-left.png"
                            />
                        </button>
                        <ul>
                            <li v-for="index in get_page_range()" :key="index">
                                <a
                                    v-on:click="go_page(index)"
                                    v-bind:class="{ active: cur_page == index }"
                                    >{{ index }}</a
                                >
                            </li>
                        </ul>
                        <button v-on:click="next_page">
                            <img
                                src="~@/assets/images/icons/pagarrow-right.png"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <rename-project-modal
            :project="cur_project"
            @rename_finished="rename_finished"
        />
        
    </div>
</template>
<script>
import ProjectCard from "../../components/common/ProjectCard.vue";
import ProjectToolBar from "../projects/ProjectToolbar.vue";
import RenameProjectModal from "../../components/common/modal/RenameProjectModal.vue";
import { MESSAGE_TYPE_LABELS } from "../../constants/messageTypes";
import { http } from "../../services/HttpService";
import CreateProjectModal from "../projects/CreateProjectModal.vue";

export default {
    components: {
        ProjectCard,
        ProjectToolBar,
        RenameProjectModal,
        // CreateProjectModal
    },
    name: "ExplorerProjects",
    data() {
        return {
            keyword: "",
            projects: [],
            allProjectCnt: 0,
            loading: false,
            messageTypes: MESSAGE_TYPE_LABELS,
            timer: null,
            project_limit: 12,
            cur_page: 1,
            page_cnt: 0,
            exist_any: true,
            cur_project: null,
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        deletedProject() {
            this.loadData();
        },
        filterData(keyword) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.keyword = keyword;
                this.loadData();
            }, 800);
        },
        async loadData() {
            this.loading = true;
            try {
                const { data } = await http().get("/projects", {
                    params: {
                        keyword: this.keyword.toLowerCase(),
                        cur_page: this.cur_page,
                        project_limit: this.project_limit,
                    },
                });
                this.exist_any = data.exist_any;
                this.projects = data.projects;
                this.allProjectCnt = data.allProjectCnt;
                this.page_cnt =
                    parseInt(this.allProjectCnt / this.project_limit) +
                    (this.allProjectCnt % this.project_limit ? 1 : 0);
                if (this.page_cnt < this.cur_page)
                    this.cur_page = this.page_cnt;
                // eslint-disable-next-line no-empty
            } catch (err) {}
            this.loading = false;
        },
        async removeItem(item) {
            try {
                await http().delete("project/" + item._id);
                this.loadData();
            } catch (err) {}
        },
        next_page() {
            if (this.cur_page >= this.page_cnt) return;
            this.cur_page++;
            this.loadData();
        },
        prev_page() {
            if (this.cur_page <= 1) return;
            this.cur_page--;
            this.loadData();
        },
        go_page(page) {
            if (page == this.cur_page) return;
            if (this.page_cnt < page) page = this.page_cnt;
            this.cur_page = page;
            this.loadData();
        },
        get_page_range() {
            let st, en;
            if (this.page_cnt < 8) {
                st = 1;
                en = this.page_cnt;
            } else {
                st = Math.max(1, this.cur_page - 3);
                en = Math.min(
                    Math.max(this.cur_page + 3, st + 6),
                    this.page_cnt
                );
                st = Math.min(st, en - 6);
            }
            let arr = [];
            for (let i = st; i <= en; i++) {
                arr.push(i);
            }
            return arr;
        },
        show_project_rename_modal(project) {
            this.cur_project = project;
            this.$bvModal.show("RenameProjectModal");
        },
        rename_finished(project) {
            this.$bvModal.hide("RenameProjectModal");
			this.loadData();
        },
        createdProject(data) {
            this.$router.push('/project-overview/' + data.project._id);
        },
        showCreateProjectModal() {
            this.$bvModal.show('CreateProjectModal');
        },
    },
    created() {
        this.$root.$on("filterProject", this.filterData);
        this.$root.$on("createdProject", this.createdProject);
        this.$root.$emit("project_list");
    },
    beforeDestroy() {
        this.$root.$off("createdProject", this.loadData);
    }
};
</script>
<style lang="scss" scoped>
.empty-status {
    min-height: calc(100vh - 600px);
    width: 100%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--gray-light);
}
a {
    cursor: pointer;
}
a.active,
a:hover {
    color: #e91e63;
}
.pagination-custom-view li {
    width: 35px;
}
</style>
