<template>
    <div class="row">
        <div
            class="
                d-flex
                justify-content-between
                w-100
                pad-30
                bg-white
                fix-sticky
            "
        >
            <div class="left-tools-info">
                <img
                    src="~@/assets/images/icons/caretleft-icon.png"
                    style="point: cusor"
                    v-on:click="back_clicked"
                />
                <h4>{{ tool_type }}</h4>
                <select class="custom-select" v-model="status">
                    <option
                        v-for="(item, index) in statusList"
                        :key="index"
                        :value="item"
                    >
                        {{ statusLabelList[item] }}
                    </option>
                </select>
                <select class="custom-select" v-model="assigned_user">
                    <option value="none">Assign to</option>
                    <option v-for="(member, id) in team_members" :key="id" :value="member.user._id">
                        {{member.user.username}}
                    </option>
                </select>
            </div>
            <div class="center-input">
                <b-form-input
                    v-model="file_name"
                    placeholder="Save File As"
                    size="lg"
                ></b-form-input>
            </div>
            <div class="right-tools-info">
                <div class="tutorial-tool" style="cursor:pointer" @click="view_tutorialModal">
                    <img src="~@/assets/images/icons/bookmark-icon.png" />
                    Tutorial
                </div>
                <button
                    type="button"
                    class="btn icon-bttn btn-outline-secondary"
                    @click="download_results"
                >
                    <img src="~@/assets/images/icons/archivetray-icon.png" />
                </button>
                <button
                    type="button"
                    class="btn icon-bttn btn-outline-secondary"
                    @click="share_output"
                >
                    <img src="~@/assets/images/icons/sharenet-icon.png" />
                </button>
                <!-- <button
                    type="button"
                    class="btn icon-bttn btn-outline-secondary"
                    @click="viewLanguageSettingModal"
                >
                    <img src="~@/assets/images/icons/globe-icon.png" />
                    <span>Language</span>
                </button> -->
            </div>
        </div>
        <language-setting-modal />
		<b-modal
			ref="tutorialModal"
			id="tutorialModal"
			hide-footer
			
			title="Tutorial"
		>
		<b-embed
			type="iframe"
			aspect="16by9"
			:src="tutorial_url"
			allowfullscreen
		></b-embed>
		<a class="tutorial-tool mb-3 mt-3 w-100 text-center" style="cursor:pointer" target="_blank"  href="https://www.helloscribe.ai/home/helloscribe-help-tutorials">
			<img src="~@/assets/images/icons/bookmark-icon.png" />
			See All Tutorials
		</a>
		</b-modal>
    </div>
</template>

<script>
import { FILE_STATUS, FILE_STATUS_LABELS } from "../../constants/FileStatus";
import { http } from "../../services/HttpService";
import LanguageSettingModal from "../../components/common/modal/LanguageSettingModal.vue";
import { TOOL_TYPE_TUTORIALS, TOOl_TYPE } from "../../constants/ToolType";

export default {
    components: {
        LanguageSettingModal,
    },
    name: "WritingToolbar",
    props: ["baseData", "answers", "past_answers", "tool_type"],
    data() {
        return {
            statusList: Object.values(FILE_STATUS),
            statusLabelList: FILE_STATUS_LABELS,
            file_name: "untitled",
            status: FILE_STATUS.NONE,
            assigned_user: "none",
            save_flag: "add",
            file: null,
            project_id: null,
            selected_folder: "",
            createFlag: false,
            tutorial_url: TOOL_TYPE_TUTORIALS[this.tool_type],
            team_members: [],
        };
    },
    beforeMount() {
        if (this.$route.params) {
            this.project_id = this.$route.params.project_id
                ? this.$route.params.project_id
                : null;
            this.selected_folder = this.$route.params.selected_folder
                ? this.$route.params.selected_folder
                : "";
            this.file = this.$route.params.file
                ? this.$route.params.file
                : null;
        }
        if (this.file) {
            this.project_id = this.file.project_id;
            this.save_flag = "update";
            this.file_name = this.file.name;
            this.status = this.file.status;
            this.assigned_user = this.file.assigned_user;
        }
        http()
            .get("/members")
            .then(
                function (response) {
                    if (response) {
                        this.team_members = response.data.membersOfAccount || [];
                    }
                    this.loadingTable = false;
                }.bind(this)
            )
            .catch(function (error) {
                console.log(error);
            });
        this.$root.$on("createdProject", this.createdProject);
    },
    beforeDestroy() {
        this.$root.$off("createdProject", this.createdProject);
    },
    methods: {
        back_clicked() {
            // if (this.tool_type === TOOl_TYPE.FIRSTDRAFT) {
            //     this.$emit('back_clicked', {
            //         file_name: this.file_name,
            //         status: this.status,
            //         assigned_user: this.assigned_user,
            //     })
            //     return;
            // }
            if (this.save_flag === "update") {
                this.update_task();
            } else if (this.save_flag === "add") {
                if (this.baseData && this.answers.length) {
                    if (this.project_id) this.add_task();
                    else this.create_task();
                } else this.back_to_project();
            }
        },
        async update_task() {
            try {
                await http()
                    .put("file/" + this.file._id, {
                        name: this.file_name,
                        tool_type: this.tool_type,
                        assigned_user: this.assigned_user,
                        status: this.status,
                        contents: [...this.answers, ...this.past_answers],
                        base_data: this.baseData,
                    })
                    .then((rlt) => {
                        this.back_to_project();
                    });
                //
            } catch (err) {
                console.log(err);
            }
        },
        async add_task() {
            try {
                await http()
                    .post("file", {
                        type: "file",
                        name: this.file_name,
                        tool_type: this.tool_type,
                        assigned_user: this.assigned_user,
                        status: this.status,
                        project_id: this.project_id,
                        contents: this.answers,
                        base_data: this.baseData,
                        folder: this.selected_folder
                            ? this.selected_folder._id
                            : "",
                    })
                    .then((rlt) => {
                        this.back_to_project();
                    });
                //
            } catch (err) {
                console.log(err);
            }
        },
        showCreateProjectModal() {
            this.$bvModal.show("CreateProjectModal");
        },
        async create_task() {
            this.showCreateProjectModal();
        },
        createdProject(data) {
            this.$bvModal.hide("CreateProjectModal");
            this.project_id = data.project._id;
            this.add_task();
        },
        back_to_project() {
            if (this.project_id) {
                this.$router.push({
                    path: "/project-overview/" + this.project_id,
                    query: {
                        selected_folder: this.selected_folder,
                    },
                });
            } else {
                this.$router.push("/saved-drafts/projects/");
            }
        },
        download_results() {
            this.$emit("download_results");
        },
        viewLanguageSettingModal() {
            this.$bvModal.show("LanguageSettingModal");
        },
        async share_output() {
            if (this.createFlag) return;
            if (this.answers.length === 0 && this.past_answers.length === 0) return;
			if (this.save_flag === 'add') {
                this.createFlag = true;
                try {
                    await http()
                        .post("file", {
                            type: "file",
                            name: this.file_name,
                            tool_type: this.tool_type,
                            assigned_user: this.assigned_user,
                            status: this.status,
                            project_id: this.project_id,
                            contents: this.answers,
                            base_data: this.baseData,
                            folder: this.selected_folder
                                ? this.selected_folder._id
                                : "",
                        })
                        .then((rlt) => {
                            this.file = rlt.data.file;
                            this.save_flag = 'update';
                            this.createFlag = false;
                        });
                    //
                } catch (err) {
                    console.log(err);
                }
            }
            
            // this.$router.push('/share/' + this.file._id);
            window.open(('/share/' + this.file._id));
		},
		view_tutorialModal() {
			this.$bvModal.show('tutorialModal');
		}
    },
};
</script>
