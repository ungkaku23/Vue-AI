<template>
    <b-modal
        id="RenameProjectModal"
        ref="RenameProjectModal"
        hide-footer
        hide-header
        title="Rename Project"
        @shown="init"
    >
        <b-form @submit.stop.prevent="renameProject">
            <div class="tab-content-body">
                <h3 class="mb-3">Rename Project <a @click="$bvModal.hide('RenameProjectModal')" class="closepop"><img src="~@/assets/images/icons/close-edit.png"></a></h3>
                <b-form-group label="Project Title">
                    <b-form-input
                        v-model="project_name"
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
                        Rename
                    </b-button>
                </div>
            </div>
        </b-form>
    </b-modal>
</template>
<script>

import { http } from '../../../services/HttpService';

export default {
    name: "RenameProjectModal",
    props: {
        project: Object,
    },
    data() {
        return {
            project_name: '',
            creating: false,
        };
    },
    methods: {
        async renameProject() {
            if (this.project.name === this.project_name || this.project_name == '') {
                return;
            }
            this.creating = true;
            try {
                const { data } = await http().put('project/' + this.project._id,
                    {
                        name: this.project_name
                    }
                );
                this.creating = false;
                this.$emit('rename_finished', data.project);
            } catch (err) {
                console.log(err);
            }
        },
        init() {
            if (this.project)
                this.project_name = this.project.name;
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
