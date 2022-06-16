<template>
    <div class="explorer-container">
        <h3>Recent notes</h3>
        <b-form-group>
            <b-input-group>
                <b-form-input
                    v-model="query"
                    placeholder="Search Saved Notes"
                />
                <b-input-group-append>
                    <span class="material-icons-outlined"> search </span>
                </b-input-group-append>
            </b-input-group>
        </b-form-group>

        <div class="row mobile-mfix" v-if="!loading">
            <div class="col-6"
				v-for="(item, idx) in filteredData"
                :key="idx">
                <div class="nsavednote-sec" :class="{'pinned':item.pinned}">
                    <div class="nsavednote-top">
                        <div class="nsavednote-title">
                            <img
                                :src="
                                    require('@/assets/images/icons/svg/' +
                                        toolTypeIcon[item.category] +
                                        '.svg')
                                "
                            />
                            {{ item.category }}
                        </div>
                        <div class="nsavednote-action">
                            <a @click="pin_toggle(item)"
                                ><img
                                    :src="require('@/assets/images/icons/svg/pin'+(item.pinned?'-active':'')+'.svg')"
                            /></a>
                            <a @click="edit_toggle(item)"
                                ><img
                                    :src="require('@/assets/images/icons/svg/pencil'+(item.edit?'-active':'')+'.svg')"
                            /></a>
                        </div>
                    </div>
                    <p 
                        v-if="!item.edit"
						class="item-content"
						:class="{ truncated: item.truncated }"
						@click="item.truncated = !item.truncated"
						v-html="$func.formattedContentString(item.text)">
                    </p>
                    <resizable-editor v-model="item.text" v-else />
                    <div class="nsavednote-bottom">
                        <div class="nsavednote-action" v-if="!item.edit">
                            <a 
								@click="copyToClipboard(item)"
                                ><img
                                    src="~@/assets/images/icons/copysimple.png"
                                />
                                {{ item.copied ? 'Copied' : 'Copy' }}
                                <span class="material-icons-outlined ml-1 text-success" v-if="item.copied">
                                    done
                                </span></a
                            >
                            <a 
								@click="removeItem(item)"
                                ><img src="~@/assets/images/icons/trash.png" />
                                Remove</a
                            >
                        </div>
                        <div class="nsavednote-action" v-else>
                            <a 
								@click="saveItem(item)"
                                ><img src="~@/assets/images/icons/save-edit.png" />
                                save</a
                            >
                            <a 
								@click="item.edit=false;"
                                ><img src="~@/assets/images/icons/close-edit.png" />
                                Cancel</a
                            >
                        </div>
                        <span>{{ $func.countWords(item.text) }} words / {{ item.text.length }} chars</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex p-5 justify-content-center" v-if="loading">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
        </div>
    </div>
</template>
<script>
import NoteService from "../../services/NoteService";
import { copyTextToClipboard } from "../../utils/common";
import { TOOL_TYPE_ICONS } from "../../constants/ToolType";
import ResizableEditor from "../../components/common/ResizableEditor.vue";

export default {
    name: "ExplorerNotes",
    components: {
        ResizableEditor
    },
    data() {
        return {
            query: "",
            results: [],
            loading: false,
            filteredData: [],
			toolTypeIcon: TOOL_TYPE_ICONS,
            edit_item: null,
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        filterData() {
            this.filteredData = this.results.filter((item) =>
                JSON.stringify(item)
                    .toLowerCase()
                    .includes(this.query.toLowerCase())
            );
        },
        async loadData() {
            this.loading = true;
            try {
                const {
                    data: { notes },
                } = await NoteService.getAllNotes();
                this.results = notes.map((item) => ({
                    ...item,
                    truncated: true,
                    edit: false,
                    copied: false,
                }));
                this.filterData();
                // eslint-disable-next-line no-empty
            } catch (err) {}
            this.loading = false;
        },
        copyToClipboard(item) {
            item.copied = true;
            copyTextToClipboard(item.text);
        },
        async removeItem(item) {
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
						this.loading = true;
						try {
							await NoteService.deleteNote(item._id);
							this.loadData();
						} catch (err) {}
						this.loading = false;
					}
				})
				// eslint-disable-next-line no-unused-vars
				.catch((err) => {
				// An error occurred
				});  
        },
        async pin_toggle(item) {
            if (item.pinned) item.pinned = false;
            else item.pinned = true;
            try {
                await NoteService.updateNote(item._id, item);
            } catch (error) {
                console.log(error);
            }
        },
        edit_toggle(item) {
            if (item.edit === undefined) item.edit = true;
            item.edit = !item.edit;
        },
        async saveItem(item) {
            try {
                await NoteService.updateNote(item._id, item);
                item.edit = false;
            } catch (error) {
                console.log(error);
            }
        },
    },
    watch: {
        query: function () {
            this.filterData();
        },
    },
};
</script>
<style lang="scss" scoped>
	.item-content {
		cursor: pointer;
	}
	.item-content.truncated {
		max-height:50px;
		overflow: hidden;
	}
	a {
		cursor: pointer;
	}
    .nsavednote-sec.pinned {
        border:1px solid #280728;
    }
</style>