<template>
  <v-content app>
    <!-- <v-container class="fill-height" fluid> -->
    <!-- <v-row align="center" justify="center"> -->
    <!-- <v-col class="shrink"> -->
    <v-toolbar height="32" class="toolbar">
      <!-- <p>{{ show_list }}</p> -->
      <div class="barcontainer">
        <div class="barSamplesbox">
          <img class="barSamples" src="../assets/safety.png" alt />
          <v-checkbox v-model="show_list" label="Bare Pavement" value="0"></v-checkbox>
        </div>
        <div class="barSamplesbox">
          <img class="barSamples" src="../assets/snow.png" alt />
          <v-checkbox v-model="show_list" label="Partly Coverage" value="1"></v-checkbox>
        </div>
        <div class="barSamplesbox">
          <img class="barSamples" src="../assets/warning.png" alt />
          <v-checkbox v-model="show_list" label="Fully Coverage" value="2"></v-checkbox>
        </div>
        <div class="barSamplesbox">
          <img class="barSamples" src="../assets/camera.png" alt />
          <v-checkbox v-model="show_list" label="Not Recognizable" value="3"></v-checkbox>
        </div>
      </div>
    </v-toolbar>
    <google-map
      class="map"
      :center="{ lat: current_camera.Latitude, lng: current_camera.Longitude }"
      :zoom="zoom_level"
      :options="{
              fullscreenControl: false
            }"
    >
      <google-cluster :minimumClusterSize="40" v-if="loading">
        <google-marker
          v-for="(item, index) in filteredList"
          :position="{
                  lat: item.Latitude + Math.random() / 5000,
                  lng: item.Longitude + Math.random() / 5000
                }"
          :icon="getMarkerIcon(item.Url)"
          :clickable="true"
          @click="toggleInfoWindow(item)"
          :key="index"
        ></google-marker>
      </google-cluster>
    </google-map>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
      floating
      class="navigationdrawer"
    >
      <div class="TopHalf">
        <img class="currentPic" v-bind:src="camera_pic" />
        <div class="title_button">
          <v-chip class="top-button" color="teal" text-color="white" @click="dialog2 = true">
            Wrong Result?
            <v-icon dark right>mdi-alert-circle-outline</v-icon>
          </v-chip>
          <h3 class="top_title"> Current Camera: {{ current_camera.Id }}</h3>
        </div>

        <apexchart
          class="result"
          type="donut"
          height="35%"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
      <div class="BottomHalf">
        <div class="draw_title">
          <v-chip class="history_button" color="teal" text-color="white" dark @click="updateChart">
            Historical Analysis
            <v-icon dark right>mdi-replay</v-icon>
          </v-chip>
          <h3 id="draw_title_history">History Replay</h3>
        </div>
        <v-carousel class="carouselcontainer">
          <v-carousel-item v-for="(item,i) in history_items" :key="i">
            <img class="carouselPic" :src="item.url" />
            <div class="title">{{item.time}}</div>
          </v-carousel-item>
        </v-carousel>
      </div>
      <v-dialog v-model="dialog2" max-width="300px">
        <v-card light>
          <v-card-title>Thanks for Training Our AI!</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-radio-group v-model="reTraining" column>
              <v-radio label="Bare Pavement" value="Bare Pavement"></v-radio>
              <v-radio label="Partly Coverage" value="Partly Coverage"></v-radio>
              <v-radio label="Fully Coverage" value="Fully Coverage"></v-radio>
              <v-radio label="Not Recognizable" value="Not Recognizable"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog2 = false">Close</v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click.stop="submitReTrain(reTraining, camera_pic)"
            >Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog3" max-width="200px">
        <v-card light height="180px">
          <v-card-title>
            <sweetalert-icon icon="success" />
          </v-card-title>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog" max-width="800" light>
        <v-card>
          <!-- <Chart :MyData = "history_data"/> -->
          <Chart :MyData="history_data" ref="chart" />
        </v-card>
      </v-dialog>
    </v-navigation-drawer>
    <!-- </v-col> -->
    <!-- </v-row> -->
    <!-- </v-container> -->
  </v-content>
</template>

<script>
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import axios from 'axios';
import GmapCluster from 'vue2-google-maps/dist/components/cluster';
import cameraData from '../views/Camera/camera.json';
import Chart from './chart.vue';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA1Xo6tJdP_FVdA4asqDtYsUKD5Xq_oSes'
  },
  // Demonstrating how we can customize the name of the components
  installComponents: false
});

Vue.component('google-map', VueGoogleMaps.Map);
Vue.component('google-marker', VueGoogleMaps.Marker);
Vue.component('google-cluster', GmapCluster);
Vue.component('google-info-window', VueGoogleMaps.InfoWindow);

export default {
  name: 'MapList',
  components: {
    Chart
  },
  data() {
    return {
      reTraining: 'Bare Pavement',
      dialog3: false,
      dialog2: false,
      history_data: [],
      dialog: null,
      history_items: [],
      knowledge: 45,
      drawer: null,
      loading: false,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      zoom_level: 6,
      current_camera: {
        Id: 'Ontario511--31dbwlph0yi',
        Organization: 'Ontario511',
        RoadwayName: 'Chesterton',
        Latitude: 45.352304,
        Longitude: -75.724945,
        Name: 'a location1',
        Url: 'https://511on.ca/map/Cctv/600036-0-1--1',
        CityName: ''
      },
      allPreds: {},
      camera_list: cameraData,
      probability: [0, 0, 0, 0],
      show_list: ['0', '1', '2', '3'],
      camera_pic: '',
      series: [],
      chartOptions: {
        labels: [
          'Bare Pavement',
          'Partly Coverage',
          'Fully Coverage',
          'Not Recognizable'
        ],
        legend: {
          position: 'right',
          fontSize: '12px',
          offsetX: 0,
          offsetY: 0
        },
        colors: ['#2C2C2C', '#FFD700', '#C0C0C0', '#708090'],
        chart: {
          foreColor: '#00000',
          type: 'donut'
        }
      }
    };
  },
  created() {
    this.getAllPreds();
  },
  computed: {
    filteredList() {
      return this.camera_list.filter(item => this.isMarkerShow(item.Url));
    }
  },
  methods: {
    updateChart() {
      this.dialog = true;
      this.$refs.chart.showData();
    },
    toggleInfoWindow(camera) {
      this.history_items = [];
      this.history_data = [];
      this.drawer = true;
      // const self = this
      const url = camera.Url;
      const result = url.split('/');
      let id = result[result.length - 1];
      id = id.replace(/\.[^/.]+$/, '');
      let preds;
      // only for debugging.
      if (!this.allPreds[id]) {
        preds = [0, 0, 0, 1];
      } else {
        // eslint-disable-next-line prefer-destructuring
        preds = this.allPreds[id][0];
      }
      this.history_data = this.allPreds[id];
      // console.log(this.history_data);
      Object.keys(preds).forEach(item => {
        const R = preds[item];
        const fixedNumber = R.map(x => Number((x * 100).toFixed(2)));
        // console.log(fixedNumber);
        this.probability = fixedNumber;
        this.current_camera = camera;
        this.camera_pic = `http://127.0.0.1:5000/Snapshot/${id}/${item}.jpg`;
      });
      // console.log(this.allPreds[id]);
      this.allPreds[id].forEach(item => {
        const timestamp = Object.keys(item);
        const EachPic = {
          url: `http://127.0.0.1:5000/Snapshot/${id}/${timestamp}.jpg`,
          time: timestamp[0]
        };
        this.history_items.unshift(EachPic);
      });
      this.series = this.probability;
    },
    submitReTrain(result, imageUrl) {
      console.log(result, imageUrl);
      // send result to server
      const retrain = new FormData();
      retrain.set('image_url', imageUrl);
      retrain.set('result', result);
      axios({
        method: 'post',
        // url: 'http://35.231.155.22:5000/retrain',
        url: 'http://127.0.0.1:5000/retrain',
        data: retrain
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      this.reTraining = 'Bare Pavement';
      this.dialog2 = false;
      this.dialog3 = true;
      this.submitted = true;
      setTimeout(() => {
        this.dialog3 = false;
      }, 1100);
    },
    getAllPreds() {
      const self = this;
      axios
        // .get('http://35.231.155.22:5000/database')
        // axios.get('http://35.185.8.182:5000/database')
        .get('http://127.0.0.1:5000/database')
        .then(response => {
          Object.keys(response.data).forEach(key => {
            self.allPreds[key] = response.data[key];
          });
          self.loading = true;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    },
    argMax(array) {
      return array
        .map((x, i) => [x, i])
        .reduce((r, a) => (a[0] > r[0] ? a : r))[1];
    },
    getResult(url) {
      const result = url.split('/');
      let id = result[result.length - 1];
      id = id.replace(/\.[^/.]+$/, '');
      let preds;
      // only for debugging.
      if (!this.allPreds[id]) {
        preds = [0, 0, 0, 1];
      } else {
        // eslint-disable-next-line prefer-destructuring
        const temps = this.allPreds[id][0];
        Object.keys(temps).forEach(item => {
          preds = temps[item];
        });
      }
      return preds;
    },
    isMarkerShow(url) {
      const label = this.argMax(this.getResult(url));
      /* eslint-disable global-require */
      return this.show_list.includes(label.toString());
      /* eslint-enable global-require */
    },
    getMarkerIcon(url) {
      const index = this.argMax(this.getResult(url));
      /* eslint-disable global-require */
      if (index === 0) {
        return require('../assets/safety.png');
      }
      if (index === 1) {
        return require('../assets/snow.png');
      }
      if (index === 2) {
        return require('../assets/warning.png');
      }
      return require('../assets/camera.png');
      /* eslint-enable global-require */
    }
  }
};
</script>
<style scoped>
#inspire {
  height: 100vh;
}
.TopHalf {
  height: 60%;
}
.BottomHalf {
  height: 40%;
}
.title {
  position: absolute;
  top: 8%;
  color: red;
  /* left: 50%;
  transform: translateX(-50%); */
  /* font-size: 1vw; */
  width: 50%;
  height: 4%;
}
.map {
  width: 100%;
  height: 95%;
}
.fill-height {
  padding: 0;
}
.barcontainer {
  display: flex;
  height: 100%;
  width: 100%;
}
.barSamples {
  height: 24px;
}
.barSamplesbox {
  height: 100%;
  width: 20%;
  display: flex;
}
.navigationdrawer {
  width: 33% !important;
  height: 100% !important;
}
.draw_title {
  text-align: center;
  height: 8%;
  /* display: inline-block; */
  display: flex;
}
#draw_title_history {
  font-size: 1vw;
  width: 60%;
  align-self: center;
}
.carouselcontainer {
  height: 92% !important;
}
.carouselPic {
  width: 100%;
}
.top-button {
  height: 100%;
}
.history_button {
  height: 100%;
  /* transform: translateX(-50%); */
}
.currentPic {
  width: 100%;
  max-height: 60%;
}
.title_button {
  height: 5%;
  display: flex;
  text-align: center;
}
.result {
  height: 35%;
}
.top_title {
  font-size: 1vw;
  width: 60%;
  align-self: center;
}
</style>
