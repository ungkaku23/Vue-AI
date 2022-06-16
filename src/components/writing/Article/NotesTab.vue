<template>
    <div>
        <div class="loading" v-if="loading">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
        </div>
        <!-- <div class="d-flex justify-content-end mb-3">
      <b-button
        variant="outline-primary"
        pill
        class="add-new-btn"
        @click="showNewArticleModal"
        >Add a New</b-button
      >
    </div> -->
        <div class="companion-tab notes-container">
            <div class="col-12">
                <div class="nsavednote-sec" v-for="(item, idx) in results" :key="idx">
                    <div class="nsavednote-top">
                        <div class="nsavednote-title">
                            <img
                                :src="
                                    require('@/assets/images/icons/svg/' +
                                        (toolTypeIcon[item.category]?toolTypeIcon[item.category]:'foldersimple') +
                                        '.svg')
                                "
                            />
                            {{ item.category }}
                        </div>
                        <div class="nsavednote-action">
                            <a @click="edit_toggle(item)"
                                ><img
                                    :src="require('@/assets/images/icons/svg/pencil'+(item.edit?'-active':'')+'.svg')"
                            /></a>
                        </div>
                    </div>
                    <p
                        v-if="!item.edit"                    
						v-html="$func.formattedContentString(item.text)"
					>
                    </p>
                    <resizable-editor v-model="item.text" v-else />
                    <div class="nsavednote-bottom">
                        <div class="nsavednote-action"  v-if="!item.edit">
                            <a v-if="isArticlePage" @click="addToDocument(item)"
                                ><img src="~@/assets/images/icons/copysimple.png" />
                                Add to document</a
                            >
                            <a @click="copyToClipboard(item)"
                                ><img
                                    src="~@/assets/images/icons/copysimple.png"
                                />
                                {{ item.copied ? 'Copied' : 'Copy' }}
                                <span class="material-icons-outlined ml-1 text-success" v-if="item.copied">
                                    done
                                </span></a
                            >
                            <a @click="deleteItem(item)"
                                ><img src="~@/assets/images/icons/trash.png" />
                                Remove</a
                            >
                        </div>
                        <div class="nsavednote-action" v-else>
                            <a 
								@click="saveItem(item)"
                                ><img src="~@/assets/images/icons/save-edit.png" />
                                Save</a
                            >
                            <a 
								@click="item.edit=false;"
                                ><img src="~@/assets/images/icons/close-edit.png" />
                                Cancel</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <new-note-form />
    </div>
</template>

<script>
import routerItems from "../../../constants/routerItems";
import NoteService from "../../../services/NoteService";
import { copyTextToClipboard } from "../../../utils/common";
import ResizableEditor from "../../common/ResizableEditor.vue";
import ArticleActions from "./ArticleActions.vue";
import NewNoteForm from "./NewNoteForm.vue";
import { TOOL_TYPE_ICONS, TOOl_TYPE } from "../../../constants/ToolType";

export default {
    components: { 
		// ArticleActions, 
		ResizableEditor, 
		NewNoteForm 
	},
    name: "NotesTab",
    props: {
        query: String,
    },
    data() {
        return {
            results: [],
            loading: false,
            isArticlePage: false,
            toolTypeIcon: TOOL_TYPE_ICONS,
        };
    },
    mounted() {
        this.checkRoute();
        this.loadData();
    },
    methods: {
        checkRoute() {
            if (this.$route.name === routerItems.ARTICLE) {
                this.isArticlePage = true;
            } else {
                this.isArticlePage = false;
            }
        },
        async loadData() {
            this.loading = true;
            try {
                const {
                    data: { notes },
                } = await NoteService.getAllNotes(this.query);
                this.results = notes.map((item) => ({
                    ...item,
                    edit: false,
                    copied: false,
                }));
                // eslint-disable-next-line no-empty
            } catch (err) {}
            this.loading = false;
        },
        addToDocument(item) {
            this.$root.$emit("addToDocument", {
                slug: item.slug,
                text: item.text,
                authors: item.authors,
                url: item.url,
                year: item.year,
                publishedAt: new Date().toLocaleDateString(),
            });
        },
        copyToClipboard(item) {
            item.copied = true;
            copyTextToClipboard(item.text);
        },
        async addToNotes(article) {
            this.loading = true;
            try {
                const {
                    data: { note },
                } = await NoteService.addNote(article);
                this.results = [{ ...note, edit: false }, ...this.results];
            } catch (err) {}
            this.loading = false;
        },
        generatedNote(note) {
            this.results = [{ ...note, edit: false }, ...this.results];
        },
        async toggleEditContent(idx) {
            if (this.results[idx].edit) {
                try {
                    await NoteService.updateNote(
                        this.results[idx]._id,
                        this.results[idx]
                    );
                } catch (err) {}
            }
            this.results[idx].edit = !this.results[idx].edit;
        },
        async deleteItem(item) {
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
        showNewArticleModal() {
            this.$bvModal.show("AddNewNoteModal");
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
            this.loadData();
        },
        $route() {
            this.checkRoute();
        },
    },
    created() {
        this.$root.$on("addToNotes", this.addToNotes);
        this.$root.$on("generatedNote", this.generatedNote);
    },
    beforeDestroy() {
        this.$root.$off("addToNotes", this.addToNotes);
        this.$root.$off("generatedNote", this.generatedNote);
    },
};
</script>
<style lang="scss" scoped>
.loading {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 5;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
}
.add-new-btn {
    height: 32px;
    display: flex;
    align-items: center;
}
.notes-container {
    max-height: calc(100vh - 150px);
    overflow: auto;
}
a {
	cursor: pointer;
}
.nsavednote-title {
	color: black;
	
}
</style>
