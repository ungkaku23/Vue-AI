<template>
    <b-modal
        id="RenameFileModal"
        ref="RenameFileModal"
        hide-footer
        hide-header
        title="Rename File"
        @shown="init"
    >
        <b-form @submit.stop.prevent="renameFile">
            <div class="tab-content-body">
                <h3 class="mb-3">Rename File <a @click="$bvModal.hide('RenameFileModal')" class="closepop"><img src="~@/assets/images/icons/close-edit.png"></a></h3>
                <b-form-group label="File title">
                    <b-form-input
                        v-model="file_name"
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
    name: "RenameFileModal",
    props: {
        file: Object,
    },
    data() {
        return {
            file_name: '',
            creating: false,
        };
    },
    methods: {
        async renameFile() {
            if (this.file.name === this.file_name || this.file_name == '') {
                return;
            }
            this.creating = true;
            try {
                const { data } = await http().put('file/' + this.file._id,
                    {
                        name: this.file_name
                    }
                );
                this.creating = false;
                this.$emit('rename_file_finished', data.file);
            } catch (err) {
                console.log(err);
            }
        },
        init() {
            this.file_name = this.file.name;
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
