<template>
    <div class="bg-white availableTools_wrap">
        <div class="mb-3 AvailableTools_head">
            <h5 class="text-black">
                <span class="back-home-arrow" @click="handleFullView"
                    ><svg
                        width="10"
                        height="18"
                        viewBox="0 0 10 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9 1.5L1.5 9L9 16.5"
                            stroke="#280728"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </span>
                 Choose Your Mission:
            </h5>
            <div @click="handleFullView">
                <span class="seeall-small">See All</span>
                <svg
                    class="back_btn_svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6 13L11 8L6 3"
                        stroke="#280728"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
        </div>
        <div class="d-flex card_main">
            <div
                class="d-flex align-items-center card_wrapper"
                v-for="(item, idx) in available_tools"
                :key="idx"
                v-on:click="add_one(item)"
            >
                <div class="icons_wrapper">
                    <img
                        :src="
                            require('@/assets/images/icons/svg/' +
                                tool_icons[item] +
                                '.svg')
                        "
                        alt=""
                        class="pricing-v2-wave"
                    />
                </div>
                <div class="card_content">
                    <h6>{{ item }}</h6>
                    <p class="mb-0">{{ tool_placeholders[item] }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    TOOl_TYPE,
    TOOL_TYPE_ICONS,
    TOOL_TYPE_URLS,
    TOOL_TYPE_PLACEHOLDERS,
} from "../../../constants/ToolType";

export default {
    name: "AvailableTools",
    data() {
        return {
            available_tools: Object.values(TOOl_TYPE).filter(
                (tool) => tool != "none"
            ),
            tool_icons: TOOL_TYPE_ICONS,
            tool_urls: TOOL_TYPE_URLS,
            tool_placeholders: TOOL_TYPE_PLACEHOLDERS
        };
    },
    props: [
		"handleFullView",
		"selected_folder",
		"project_id"
	],
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {},
        add_one(item) {
            this.$router.push({ 
				name: this.tool_urls[item], 
				params: { 
					project_id: this.project_id,
					selected_folder: this.selected_folder,
				}
			});
        },
    },
};
</script>
