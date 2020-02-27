<template>
  <apexcharts type="bar" height="95%" :options="chartOptions" :series="series"></apexcharts>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  props: ['MyData', 'myIndex'],
  name: 'Chart',
  components: {
    apexcharts: VueApexCharts
  },
  data() {
    return {
      Xcolors: Array(12).fill('black'),
      series: [],
      chartOptions: {}
    };
  },
  created() {
    this.showData();
  },
  watch: {
    myIndex(i) {
      // console.log(i);
      this.Xcolors = Array(12).fill('black');
      this.Xcolors[i] = 'red';
      this.chartOptions = {
        xaxis: {
          labels: {
            style: {
              colors: this.Xcolors,
              fontSize: '12px'
            }
          }
        }
      };
    }
  },
  methods: {
    formattime(data) {
      let num = (data || 0).toString();
      let result = '';
      while (num.length > 2) {
        result = `:${num.slice(-2)}${result}`;
        num = num.slice(0, num.length - 2);
      }
      if (num) {
        result = num + result;
      }
      return result;
    },
    showData() {
      const name = [];
      const BarePavement = [];
      const PartlyCoverage = [];
      const FullyCoverage = [];
      const NotRecognizable = [];
      this.MyData.forEach(item => {
        const timestamp = Object.keys(item)[0];
        const preds = Object.values(item)[0].map(x => (x * 100).toFixed(2));
        const nameArry = timestamp.split('-');
        const time = [nameArry[0], this.formattime(nameArry[1])];
        name.unshift(time);
        BarePavement.unshift(preds[0]);
        PartlyCoverage.unshift(preds[1]);
        FullyCoverage.unshift(preds[2]);
        NotRecognizable.unshift(preds[3]);
      });
      this.chartOptions = {
        colors: ['#2C2C2C', '#FFD700', '#C0C0C0', '#708090'],
        chart: {
          type: 'bar',
          height: '95%',
          stacked: true,
          stackType: '100%',
          toolbar: {
            show: false
          },
          events: {
            click: (event, chartContext, config) => {
              // current pic index
              const PicIndex = config.dataPointIndex;
              this.$emit('clicked', PicIndex);
            }
          }
        },
        xaxis: {
          categories: name,
          labels: {
            style: {
              fontSize: '12px',
              colors: this.Xcolors
            }
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'bottom',
          offsetX: 0,
          offsetY: -5
        }
      };
      this.series = [
        {
          name: 'Bare Pavement',
          data: BarePavement
        },
        {
          name: 'Partly Coverage',
          data: PartlyCoverage
        },
        {
          name: 'Fully Coverage',
          data: FullyCoverage
        },
        {
          name: 'Not Recognizable',
          data: NotRecognizable
        }
      ];
    }
  }
};
</script>
<style scoped>
</style>
