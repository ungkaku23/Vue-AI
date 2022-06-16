<template>
    <div class="explorer-container">
		<div class="shareit-sec"
			v-for="(item, idx) in contents"
			:key="idx" 
			>
            <div class="nsavednote-sec">
                <p>
                    {{item.text?item.text:item.answer}}
                </p>
                <div class="nsavednote-bottom">
                    <div class="nsavednote-action">
                        <a @click="vote(item, 1)"
                            ><img src="~@/assets/images/icons/thumbsup.png" />
                            {{item.upvotes?item.upvotes.length:0}}</a
                        >
                        <a @click="vote(item, -1)"
                            ><img src="~@/assets/images/icons/thumbsdown.png" />
                            {{item.downvotes?item.downvotes.length:0}}</a
                        >
						<a><img src="~@/assets/images/icons/linkcopy.png" /> Copy Link</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { http } from "../../services/HttpService";

export default {
    name: "ShareForm",
    data() {
        return {
			file: null,
			contents: [],
			user_id: null,
		};
    },
	filters: {
		trim: function(string) {
			return string.trim()
		}
	},
	mounted() {
		this.loadData();
	},
    methods: {
		async loadData() {
			this.user_id = this.$store.state.accountId;
            try {
                let file_id = this.$route.params.id;
                const { data } = await http().get(
                    "/share/" + file_id
                );
                this.file = data.share;
				console.log(data.share)
				this.contents = this.file.contents;
            } catch (err) {
                console.log(err)
            }
        },
		async vote(item, direction) {
			if (!this.user_id) return;
			let upvotes = item.upvotes?item.upvotes:[];
			let downvotes = item.downvotes?item.downvotes:[];
			if (direction > -1) {
				if (upvotes.indexOf(this.user_id) === -1) {
					upvotes.push(this.user_id);
				} else {
					upvotes.splice(upvotes.indexOf(this.user_id), 1)
				}
				if (downvotes.indexOf(this.user_id) > -1) downvotes.splice(downvotes.indexOf(this.user_id), 1)
			} else {
				if (downvotes.indexOf(this.user_id) === -1) {
					downvotes.push(this.user_id);
				} else {
					downvotes.splice(downvotes.indexOf(this.user_id), 1)
				}
				if (upvotes.indexOf(this.user_id) > -1) upvotes.splice(upvotes.indexOf(this.user_id), 1)
			}
			item.upvotes = upvotes;
			item.downvotes = downvotes;
			const { data } = await http().put('share/' + this.file._id,
				{
					contents: this.contents
				}
			);
			this.$forceUpdate()
		},
	},
};
</script>
<style lang="scss" scoped>
	a {
		cursor: pointer;
	}
</style>
