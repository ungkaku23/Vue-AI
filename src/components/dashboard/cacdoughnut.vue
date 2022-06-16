<script>
import { Doughnut } from 'vue-chartjs';

export default {
  name: 'sessiondoughnut',
  extends: Doughnut,
  props: {
    data: Object,
  },
  data() {
    return {
      doughnutPieOptions: {
        cutoutPercentage: 75,
        animationEasing: 'easeOutBounce',
        animateRotate: true,
        animateScale: false,
        responsive: true,
        maintainAspectRatio: true,
        showScale: true,
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
          },
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
      },
    };
  },
  mounted() {
    if (this.data) {
      const doughnutPieData = {
        datasets: [
          {
            data: [
              this.data.articles,
              this.data.headlines,
              this.data.messages,
              this.data.answers,
              this.data.mediaPitches,
              this.data.promotes,
              this.data.quotes,
              this.data.questions,
            ],
            backgroundColor: [
              '#6e4d92',
              '#d90077',
              '#f8c058',
              '#38ce3c',
              '#5271ff',
              '#57c7d4',
              '#6610f2',
              '#e91e63',
            ],
            borderColor: [
              '#6e4d92',
              '#d90077',
              '#f8c058',
              '#38ce3c',
              '#5271ff',
              '#57c7d4',
              '#6610f2',
              '#e91e63',
            ],
          },
        ],
        labels: [
          'Articles',
          'Headlines',
          'Messaging',
          'Brainstorm',
          'Media Pitch',
          'Copywriting',
          'Quotes',
          'Questions',
        ],
      };
      this.renderChart(doughnutPieData, this.doughnutPieOptions);
    }
  },
};
</script>
