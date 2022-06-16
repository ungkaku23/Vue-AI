<script>
import { Line } from 'vue-chartjs';
import * as moment from 'moment';

export default {
  extends: Line,
  props: {
    data: Object,
  },
  data() {
    return {
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
                borderDash: [10]
              },
            },
          ],
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
      },
    };
  },
  mounted() {
    if (this.data) {
      const months = [];
      const maxCount = 6;
      for (let i = 0; i < maxCount; i++) {
        months.push({
          year: moment()
            .subtract(maxCount - i - 1, 'months')
            .year(),
          month:
            moment()
              .subtract(maxCount - i - 1, 'months')
              .month() + 1,
        });
      }

      const datacollection = {
        labels: months.map((item) => item.year + '-' + item.month),
        datasets: [
          {
            label: 'Incomplete',
            data: this.getData(this.data.incompleted, months),
            borderColor: ['#6e4d92'],
            borderWidth: 1,
            fill: true,
          },
          {
            label: 'Complete',
            data: this.getData(this.data.completed, months),
            borderColor: ['#d90077'],
            borderWidth: 1,
            fill: true,
          },
        ],
      };
      this.renderChart(datacollection, this.options);
    }
  },
  methods: {
    getData(data, months) {
      return months.map((item) => {
        const cnt = data.find(
          (dataItem) =>
            dataItem._id.year === item.year && dataItem._id.month === item.month
        );
        return cnt ? cnt.count : 0;
      });
    },
  },
};
</script>
