<template>
  <section class="dashboard">
    <!-- <h4 class="mb-3">My Dashboard</h4> -->
  <div class="d-flex justify-content-between">
    <h4>Productivity Dashboard</h4>
  </div>
  <div class="row">
      <div class="col-md-4 mb-3">
        <div class="dash-top-tools mb-3">
          <div class="top-tools-left">
            <p>Projects Created</p>
            <h5>{{statisticData?statisticData.project_cnt:''}} <span><img src="~@/assets/images/icons/graphupscale.png"/>{{statisticData?statisticData.recent_project_cnt:''}}</span></h5>
          </div>
          <div class="top-tools-graph">
            <img src="~@/assets/images/icons/graphscale.png"/>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="dash-top-tools mb-3">
          <div class="top-tools-left">
            <p>Tasks In-Progress</p>
            <h5>{{statisticData?statisticData.progress_task:''}} <span><img src="~@/assets/images/icons/graphupscale.png"/>{{statisticData?statisticData.recent_progress_task:''}}</span></h5>
          </div>
          <div class="top-tools-graph">
            <img src="~@/assets/images/icons/graphscale.png"/>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="dash-top-tools mb-3">
          <div class="top-tools-left">
            <p>Tasks Completed</p>
            <h5>{{statisticData?statisticData.completed_task:''}} <span><img src="~@/assets/images/icons/graphupscale.png"/>{{statisticData?statisticData.recent_completed_task:''}}</span></h5>
          </div>
          <div class="top-tools-graph">
            <img src="~@/assets/images/icons/graphscale.png"/>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        
      </div>
      <div class="col-md-4 mb-3">
        
      </div>
    </div>
    <my-recent-projects />
    <div class="d-flex justify-content-between">
          <h4>
            
          </h4>
        </div>
    <div class="row mb-3">
      <div class="col-md-6 mb-3">
        <div class="card">
          <div
            class="card-body"
            :class="{ 'py-5 d-flex justify-content-center': loading }"
          >
            <b-spinner v-if="loading"></b-spinner>
            <line-chart :data="recentData" v-if="recentData" />
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <div class="card">
          <div class="card-body">
            <h4>Activity Meter</h4>
            <b-spinner v-if="loading"></b-spinner>
            <recent-activities
              :allActivityCnt="allActivityCnt"
              :activities="activities"
              v-if="!loading"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row mb-3">
      <div class="col-md-6 mb-3">
        <div class="card">
          <div class="card-body d-flex justify-content-center py-5">
            <div style="max-width: 335px">
              <b-spinner v-if="loading"></b-spinner>
              <cacdoughnut :data="chartData" v-if="chartData" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <div class="card">
          <div class="card-body"></div>
        </div>
      </div>
    </div> -->
    <new-document-modal />
  </section>
</template>

<script>
// import Cacdoughnut from '../../components/dashboard/cacdoughnut.vue';
import LineChart from '../../components/dashboard/lineChart.vue';
import routerItems from '../../constants/routerItems';
import { http } from '../../services/HttpService';
import NewDocumentModal from '../writing/NewDocumentModal.vue';
import MyRecentProjects from './MyRecentProjects.vue';
import RecentActivities from './RecentActivities.vue';

export default {
  name: 'dashboard',
  components: {
    NewDocumentModal,
    // Cacdoughnut,
    LineChart,
    RecentActivities,
    MyRecentProjects,
  },
  data() {
    return {
      routers: routerItems,
      loading: false,
      lineChartData: null,
      chartData: null,
      recentData: null,
      activities: [],
      allActivityCnt: 0,
      statisticData: null,
    };
  },
  methods: {
    toggleProBanner: () => {
      document.querySelector('body').classList.toggle('pro-banner-collapse');
    },
    closed() {},
    async loadData() {
      this.loading = true;
      try {
        const { data } = await http().get('/dashboard/stats');
        this.chartData = data.stats;
        this.recentData = data.recentData;
        this.activities = data.activities;
        this.allActivityCnt = data.allActivityCnt;
        this.statisticData = data.statisticData;
        // eslint-disable-next-line no-empty
      } catch (err) {}
      this.loading = false;
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.goto-saved-drafts {
  position: absolute;
  right: 10px;
  top: 50%;
  color: #828080;
  transform: translate(0, -50%);

  span {
    font-size: 40px;
  }
}

.legends {
  margin: 8px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 14px;

  .legend-item {
    display: flex;
    margin: 8px 10px;

    &::before {
      margin-top: 2px;
      margin-right: 4px;
      display: block;
      content: '';
      width: 12px;
      height: 12px;
      min-height: 8px;
      min-width: 8px;
      border-radius: 100%;
      background-color: black;
    }
  }
}

.material-icons-outlined {
  color: #4a4a4a !important;
}
.card {
  border: 1px solid #e3e5ef;
}
</style>
