<template>
    <div v-bind:class="renderFullView && 'show_available_tool'">
        <!-- <h3>Project Overview</h3> -->
        <overview-toolbar @filterFile="getFiles"/>
        <available-tools :handleFullView="handleFullView" :project="project" :project_id="project_id" :selected_folder="selected_folder"/>
        <div class="files_folders_wrap">
            <div class="files_folders_header">
                <div class="left_content" v-if="!selected_folder">
                    <h5 class="text-black">Files & Folders</h5>
                </div>
                <div class="left_content" v-if="selected_folder">
                    <img src="~@/assets/images/icons/caretleft-icon.png" style="point:cusor" v-if="selected_folder"
                        @click="selected_folder=null"
                    >
                    <h5 class="text-black">{{selected_folder.name}}</h5>
                </div>
                <div class="right_content">
                    <b-button
                        class="add_file"
                        variant="outline-secondary"
                        v-on:click="view_createFolder"
                        ><img
                            :src="require('@/assets/images/icons/svg/foldersimpleplus.svg')"
                            alt=""
                            class="pricing-v2-wave"
                        />
                    </b-button>
                    <div class="sort_wrap">
                        <b-form-select
                            v-model="sortOption"
                            v-on:change="getFiles()"
                            :options="sortOptions"
                        >
                        </b-form-select>
                    </div>
                </div>
            </div>
            <div class="file_folder_section files_folders_card_main">
                <file-card 
                    v-for="(item, idx) in files"
                    :key="idx" 
                    :file="item"
                    :selected_folder="selected_folder"
                    @deletedFile="deletedFile"
                    @show_file_rename_modal="show_file_rename_modal"
                    @folder_selected="folder_selected"
                />
            </div>
        </div>
        <create-folder-modal
            :project="project"
            @folder_created="folder_created"
        />
        <rename-file-modal 
            :file="cur_file"
            @rename_file_finished="rename_file_finished"
        />
    </div>
</template>
<script>
import AvailableTools from "../../components/common/ViewProject/AvailableTools.vue";
import OverviewToolbar from "../../components/toolbar/OverviewToolbar.vue";
import { http } from "../../services/HttpService";
import FileCard from "../../components/common/FileCard.vue";
import CreateFolderModal from "../../components/common/modal/CreateFolderModal.vue";
import RenameFileModal from "../../components/common/modal/RenameFileModal.vue";

export default {
    components: {
        AvailableTools,
        OverviewToolbar,
        FileCard,
        CreateFolderModal,
        RenameFileModal,
    },
    name: "ProjectOverview",
    data() {
        return {
            project: null,
            renderFullView: false,
            project_id: null,
            files: [],
            sortOption: 'modified',
            sortOptions: [
                // { value: null, text: "Sort by" },
                { value: 'name', text: "Name" },
                { value: 'modified', text: "Recently Modified" },
                { value: 'type', text: "Type" },
            ],
            selected_folder: null,
            cur_file: null,
            type: null,
        };
    },
    watch: {
        selected_folder: function (val) {
            this.getFiles();
        },
    },
    mounted() {
        this.loadData();
    },
    methods: {
        async loadData() {
            try {
                this.project_id = this.$route.params.id;
                this.selected_folder = this.$route.query?this.$route.query.selected_folder:null;
                const { data } = await http().get(
                    "/project/" + this.project_id
                );
                this.project = data.project;
                this.$root.$emit("project_entered", this.project);
                this.getFiles();
            } catch (err) {
                console.log(err)
            }
        },
        async getFiles (keyword = null) {
            const { data } = await http().get(
                "/files/" + this.project_id,
                {
                    params: { 
                        sortOption: this.sortOption,
                        keyword: keyword,
                        folder: this.selected_folder?this.selected_folder._id:null,
                    }
                }
            );
            this.files = data.files;
        },
        handleFullView() {
            this.renderFullView = !this.renderFullView;
        },
        view_createFolder () {
            this.$bvModal.show("CreateFolderModal");
        },
        folder_created () {
            this.$bvModal.hide("CreateFolderModal");
            this.getFiles();
        },
        deletedFile() {
            this.getFiles();
        },
        show_file_rename_modal(file) {
            this.cur_file = file;
            this.$bvModal.show("RenameFileModal");
        },
        rename_file_finished () {
            this.$bvModal.hide("RenameFileModal");
			this.getFiles();
        },
        folder_selected(folder) {
            this.selected_folder = folder;
            this.getFiles();
        },
    },
};
</script>
