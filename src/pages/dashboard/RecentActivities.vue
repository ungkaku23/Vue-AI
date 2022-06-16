<template>
    <div>
        <div class="mb-4 text-muted">All Activities: {{ allActivityCnt }}</div>
        <div
            v-for="(activity, idx) in activities"
            :key="idx"
            class="activity-item"
        >
            <div class="activity-date-time">
                <div class="time">
                    {{ getActivityTime(activity.createdAt) }}
                </div>
                <!-- <div class="date">{{ getActivityDate(activity.createdAt) }}</div> -->
            </div>
            <div class="time-line">
                <div
                    class="time-line-circle"
                    :style="{
                        'border-color':
                            activityCategoryColors[activity.category],
                    }"
                ></div>
                <div
                    class="time-line-bar"
                    v-if="idx < activities.length - 1"
                ></div>
            </div>
            <div class="description">
                <div class="activitytttile"
                    @click="navigate_object(activity)">{{ activity.objectName }}</div>
                <p>{{ activity.description }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { ACTIVITY_CATEGORY_COLORS, ACTIVITY_CATEGORIES } from "../../constants/activityCategories";
import routerItems from '../../constants/routerItems';
import { http } from "../../services/HttpService";
import { TOOL_TYPE_ICONS, TOOL_TYPE_URLS } from "../../constants/ToolType";

export default {
    name: "RecentActivities",
    props: {
        activities: {
            type: Array,
            required: true,
        },
        allActivityCnt: Number,
    },
    data() {
        return {
            activityCategoryColors: ACTIVITY_CATEGORY_COLORS,
        };
    },
    mounted() {},
    methods: {
        getActivityTime(date) {
            const dt = new Date(date);
            return dt.toLocaleTimeString();
        },
        getActivityDate(date) {
            const dt = new Date(date);
            return dt.toLocaleDateString();
        },
        getActivityName(activity) {
            return (
                activity.subcategory ||
                activity.objectName ||
                activity.description ||
                activity.category
            );
        },
		navigate_object(activity) {
			let category = activity.category;
			if (category === ACTIVITY_CATEGORIES.FILE) {
				this.go_to_file(activity.objectId);
			} else if(category === ACTIVITY_CATEGORIES.PROJECT) {
				this.go_to_project(activity.objectId);
			} else if(category === ACTIVITY_CATEGORIES.NOTE) {
				this.go_to_note(activity.objectId);
			}
		},
		async go_to_file(file_id) {
			try {
				const { data } = await http().get(
                "/file/" + file_id,
				);
				let file = data.file;
				console.log(file._id)
				this.$router.push({ 
					name: TOOL_TYPE_URLS[file.tool_type], 
					params: { 
						file: file,
						selected_folder: file.folder
					}
				});
			} catch (error) {
				
			}
		},
		go_to_project(project_id) {
			this.$router.push('/project-overview/' + project_id);
		},
		go_to_note(note_id) {
			this.$router.push({ 
				name: routerItems.EXPLORER_NOTES, 
			});
		}
    },
};
</script>
<style lang="scss" scoped>
.activity-item {
    display: flex;
    width: 100%;
    .activity-date-time {
        width: 82px;
        .time {
            font-weight: bold;
        }
        .date {
            font-size: 12px;
            font-weight: lighter;
            color: var(--gray-light);
        }
    }
    .time-line {
        height: 100%;
        min-height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .time-line-circle {
            width: 12px;
            height: 12px;
            border-radius: 100%;
            border: solid 3px var(--gray-light);
            margin: 4px 8px;
        }
        .time-line-bar {
            flex-grow: 1;
            height: calc(100% - 20px);
            border: solid 1px #e4e0ef;
        }
    }
    .description {
        flex-grow: 1;
    }
    .activitytttile:hover {
        color: #e91e63;
        cursor: pointer;
    }
}
</style>
