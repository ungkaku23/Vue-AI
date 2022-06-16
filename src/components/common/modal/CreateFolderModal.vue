<template>
    <b-modal
        id="CreateFolderModal"
        ref="CreateFolderModal"
        hide-footer
        hide-header
        title="Create a folder"
    >
        <b-form @submit.stop.prevent="createFolder">
            <div class="tab-content-body">
                <h3 class="mb-3">Create Folder <a @click="$bvModal.hide('CreateFolderModal')" class="closepop"><img src="~@/assets/images/icons/close-edit.png"></a></h3>
                <b-form-group label="Folder name">
                    <b-form-input
                        v-model="folder_name"
                        placeholder="New name"
                    ></b-form-input>
                </b-form-group>
                <div class="d-flex justify-content-between my-2 float-right">
                    <b-button
                        pill
                        type="submit"
                        variant="primary"
                        class="min-w-150px"
                        :disabled="creating"
                    >
                        <b-spinner small class="mr-2" v-if="creating" />
                        Create
                    </b-button>
                </div>
            </div>
        </b-form>
    </b-modal>
</template>
<script>

import { http } from '../../../services/HttpService';

export default {
    name: "CreateFolderModal",
    props: {
        project: Object,
    },
    data() {
        return {
            folder_name: '',
            creating: false,
        };
    },
    methods: {
        async createFolder() {
            if (this.folder_name == '') {
                return;
            }
            this.creating = true;
            try {
                const { data } = await http().post('file', {
                    type: 'folder',
                    name: this.folder_name,
                    project_id: this.project._id,
                });
                this.creating = false;
                this.$emit('folder_created');
                this.folder_name = '';
            } catch (err) {
                console.log(err);
            }
        },
    },
    mounted() {},
};
</script>
<style lang="scss" scoped>
a {
  cursor: pointer;
}
</style>
