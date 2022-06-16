<template>
    <div class="files_folders_card"
        @click="eye_clicked">
        <div class="title_card">
            <div>
                <img
                :src="
                    require('@/assets/images/icons/svg/' +
                        toolTypeIcon[file.tool_type] +
                        '.svg')
                "
                alt=""
                class="pricing-v2-wave"
            />
            <h5>{{ file ? file.name : "" }}</h5>
            </div>
            <b-dropdown size="sm" right>
                    <b-dropdown-item-button
                        variant="primary"
                        @click.stop="renameFile"
                    >
                        <div class="d-flex align-items-center">
                            <img
                                src="~@/assets/images/icons/penciltrash-icon-bread.png"
                            />
                            Rename
                        </div>
                    </b-dropdown-item-button>
                    <b-dropdown-item-button
                        variant="primary"
                        @click.stop="removeFile"
                    >
                        <div class="d-flex align-items-center">
                            <img
                                src="~@/assets/images/icons/trash-icon-bread.png"
                            />
                            Delete
                        </div>
                    </b-dropdown-item-button>
                </b-dropdown>
        </div>
        <div class="last_modified">
            <p>Last Modified</p>
            <h6><timeago :datetime="file.updatedAt" /></h6>
        </div>
        <div class="progress_bar">
            <b-alert  
                show
                variant="primary"
                v-bind:class="file.status"
                v-if="file.type == 'file'"
                >{{ statusType[file.status] }}</b-alert
            >
            <b-alert
                show
                variant="primary"
                v-bind:class="'folder'"
                v-if="file.type != 'file'"
                
            >
                {{
                    file.tool_count
                        ? file.tool_count + " Tools"
                        : "No Tools yet"
                }}
            </b-alert>
        </div>
    </div>
</template>

<script>
import { FILE_STATUS_LABELS } from "../../constants/FileStatus";
import { TOOL_TYPE_ICONS, TOOL_TYPE_URLS } from "../../constants/ToolType";
import { http } from "../../services/HttpService";

export default {
    name: "FileCard",
    props: ["file", "selected_folder"],
    data() {
        return {
            statusType: FILE_STATUS_LABELS,
            toolTypeIcon: TOOL_TYPE_ICONS,
        };
    },
    methods: {
        removeFile() {
            this.$bvModal
                .msgBoxConfirm(
                    "Do you want to delete this task?",
                    {
                        title: "Please Confirm",
                        size: "sm",
                        buttonSize: "sm",
                        okVariant: "danger",
                        okTitle: "YES",
                        cancelTitle: "NO",
                        cancelVariant: "primary",
                        footerClass: "p-2",
                        hideHeaderClose: false,
                        centered: true,
                    }
                )
                .then(async (value) => {
                    if (value) {
                        try {
                            await http().delete("file/" + this.file._id);
                            this.$emit("deletedFile");
                        } catch (err) {}
                    }
                })
                .catch((err) => {
                    // An error occurred
                });
        },
        renameFile() {
            this.$emit("show_file_rename_modal", this.file);
        },
        folder_selected() {
            if (this.file.type == "file") return;
            this.$emit("folder_selected", this.file);
        },
        file_view() {
            this.$router.push({ 
				name: TOOL_TYPE_URLS[this.file.tool_type], 
				params: { 
					file: this.file,
                    selected_folder: this.selected_folder
				}
			});
        },
        eye_clicked() {
            if (this.file.type === 'file') this.file_view();
            else this.folder_selected();
        },
    },
};
</script>
<style lang="scss" scoped>
.alert.folder {
    color: black !important;
    border: 1px solid red !important;
    background: none !important;
}

</style>