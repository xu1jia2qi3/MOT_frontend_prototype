<template>
  <v-content app>
    <v-toolbar height="32" class="toolbar">
      <div class="barcontainer">
        <div class="barSamplesbox">
          <img class="barSamples" src="../assets/safety.png" alt />
          <v-checkbox color="white" v-model="show_list" label="Bare Pavement" value="0"></v-checkbox>
        </div>
        <div class="barSamplesbox">
          <img class="barSamples" src="../assets/snow.png" alt />
          <v-checkbox color="white" v-model="show_list" label="Partly Coverage" value="1"></v-checkbox>
        </div>
        <div class="barSamplesbox">
          <img class="barSamples" src="../assets/warning.png" alt />
          <v-checkbox color="white" v-model="show_list" label="Fully Coverage" value="2"></v-checkbox>
        </div>
        <div class="barSamplesbox">
          <img class="barSamples" src="../assets/camera.png" alt />
          <v-checkbox color="white" v-model="show_list" label="Not Recognizable" value="3"></v-checkbox>
        </div>
        <v-switch
          v-if="auth"
          v-model="switch1"
          color="#00B0FF"
          inset
          :label="switch1 === true ? 'My Cameras' : 'All Cameras'"
        ></v-switch>
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
    <v-snackbar
      class="snackbar"
      v-if="isActive"
      color="success"
      top
      absolute
      v-model="snackbar"
      :timeout="1000"
    >Added to My Favorite Cameras List Successfully!</v-snackbar>
    <v-snackbar
      class="snackbar"
      v-if="!isActive"
      color="error"
      top
      absolute
      v-model="snackbar"
      :timeout="1000"
    >Removed from My Favorite Cameras List Successfully!</v-snackbar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
      floating
      class="navigationdrawer"
    >
      <div class="TopHalf">
        <h3 class="top_title">Camera: {{ current_camera.Id }} Latest Condition</h3>
        <img class="currentPic" v-bind:src="camera_pic" />
        <v-btn
          v-if="auth"
          class="likebutton"
          icon
          v-bind:color="isActive === true ? 'pink' : 'grey'"
          @click="toggleClass()"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <span v-if="auth">Save to My Cameras</span>
      </div>
      <div class="BotHalf">
        <h3 style="height:10%; text-align:center">Snow Coverage Analysis</h3>
        <apexchart
          class="result"
          type="donut"
          height="70%"
          :options="chartOptions"
          :series="series"
        ></apexchart>
        <div class="botgroup">
          <div style="width:50%; text-align:center">
            <!-- <v-btn outlined color="white">Outlined Button</v-btn> -->
            <v-btn class="BotBottonL" outlined color="white" @click="dialog2 = true">
              Wrong Result?
              <v-icon dark right>mdi-alert-circle-outline</v-icon>
            </v-btn>
          </div>
          <div style="width:50%; text-align:center">
            <v-btn class="BotBottonR" outlined color="white" @click="updateChart">
              Historical Analysis
              <v-icon dark right>mdi-cached</v-icon>
            </v-btn>
          </div>
        </div>
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
      <v-dialog v-model="dialog4" max-width="200px">
        <h3 style="text-align:center;font-size:1.25rem">Loading All Cameras</h3>
        <v-progress-linear color="deep-purple accent-4" indeterminate rounded height="6"></v-progress-linear>
      </v-dialog>
      <v-dialog v-model="dialog" max-width="800" light>
        <v-card style="height:80vh">
          <h2 style="text-align:center;height:4%">Snow Coverage History</h2>
          <div style="height:45%">
            <v-carousel class="carouselcontainer" v-model="model">
              <v-carousel-item
                style="height:100% !important"
                v-for="(item,i) in history_items"
                :key="i"
              >
                <img class="carouselPic" :src="item.url" />
              </v-carousel-item>
            </v-carousel>
          </div>
          <div style="height:48%">
            <!-- <h3 style="height:5%">Current Photo: {{model +1}}</h3> -->
            <Chart :MyData="history_data" :myIndex="model" ref="chart" @clicked="onClickChild" />
          </div>
        </v-card>
      </v-dialog>
    </v-navigation-drawer>
  </v-content>
</template>

<script>
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import axios from 'axios';
import GmapCluster from 'vue2-google-maps/dist/components/cluster';
import cameraData from '../views/Camera/camera.json';
import Chart from './chart.vue';
import EventBus from './eventbus';

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
      switch1: false,
      snackbar: false,
      isActive: false,
      model: 11,
      reTraining: 'Bare Pavement',
      dialog4: true,
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
          fontSize: '14px',
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
    EventBus.$on('trunswitch', data => {
      this.switch1 = data;
    });
    this.getAllPreds();
  },
  computed: {
    auth() {
      return !this.$store.getters.isAuth ? false : this.$store.getters.isAuth;
    },
    toggleList() {
      return !this.switch1 ? this.camera_list : this.$store.state.user.cameras;
    },
    filteredList() {
      return this.toggleList.filter(item => this.isMarkerShow(item.Url));
    },
    usercameras() {
      return !this.$store.getters.user
        ? false
        : this.$store.getters.user.cameras;
    }
  },
  methods: {
    nameset(CurrentCamera) {
      const cameras = !this.$store.getters.user
        ? []
        : this.$store.getters.user.cameras;

      const nameset = new Set(cameras.map(item => item.Id));
      this.isActive = nameset.has(CurrentCamera.Id);
    },
    toggleClass() {
      this.isActive = !this.isActive;
      this.snackbar = true;
      const formData = {
        isActive: this.isActive,
        Data: this.current_camera
      };
      this.$store.dispatch('updateList', formData);
    },
    onClickChild(value) {
      if (value !== -1) {
        this.model = value;
      }
    },
    updateChart() {
      this.dialog = true;
      this.model = 11;
      this.$refs.chart.showData();
    },
    toggleInfoWindow(camera) {
      this.nameset(camera);
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
        this.camera_pic = `${this.$store.state.serverUrl}/Snapshot/${id}/${item}.jpg`;
      });
      // console.log(this.allPreds[id]);
      this.allPreds[id].forEach(item => {
        const timestamp = Object.keys(item);
        const EachPic = {
          url: `${this.$store.state.serverUrl}/Snapshot/${id}/${timestamp}.jpg`,
          time: timestamp[0]
        };
        this.history_items.unshift(EachPic);
      });
      this.series = this.probability;
    },
    submitReTrain(result, imageUrl) {
      // send result to server
      const retrain = new FormData();
      retrain.set('image_url', imageUrl);
      retrain.set('result', result);
      axios({
        method: 'post',
        url: `${this.$store.state.serverUrl}/retrain`,
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
        .get(`${this.$store.state.serverUrl}/database`)
        .then(response => {
          Object.keys(response.data).forEach(key => {
            self.allPreds[key] = response.data[key];
          });
          self.loading = true;
          this.dialog4 = false;
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
/* .snackbar{
  justify-content: center !important;
} */
/* .likebutton{
  right: -17vw;
} */
#inspire {
  height: 100vh;
}
.TopHalf {
  max-height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
}
.BotHalf {
  height: 40%;
  position: absolute;
  bottom: 0;
  width: 100%;
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
  min-width: 365px;
  height: 100% !important;
  min-height: 470px;
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
  height: 100% !important;
}
.carouselPic {
  width: 100%;
  height: 67%;
}

.currentPic {
  width: 100%;
  max-height: 60%;
}
.botgroup {
  width: 100%;
  height: 10%;
  bottom: 1vh;
  position: absolute;
  display: flex;
}
.BotBottonL {
  height: auto;
}
.BotBottonR {
  height: auto;
}
.result {
  height: 35%;
}
.top_title {
  font-size: 1vw;
  align-self: center;
}
</style>
