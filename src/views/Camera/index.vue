<template>
  <v-app>
    <!-- Toolbar -->
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-title>Automated Winter Road Condition Monitoring Using RWIS/Traffic Cameras</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        outline
        @click.stop="mediaDialog = true; probability = [0, 0, 0, 0]"
      >
        <!-- <v-icon left>gradient</v-icon> -->
        Try Your Own Image
      </v-btn>
    </v-toolbar>

    <!-- media dialog -->
    <v-dialog
      v-model="mediaDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon @click.native="mediaDialog = false; probability = [0, 0, 0, 0]" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Upload Image for Prediction</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap>
            <v-flex md12>
              <label>
                <input 
                  type="file" 
                  id="files" 
                  ref="files" 
                  accept="image/*"
                  style="display: none"
                  v-on:change="handleFilesUpload()"/>
              </label>
              <v-btn large color="primary" @click.stop="addFiles()">
                Upload Image
              </v-btn>
              <v-btn large color="primary" @click.stop="submitFiles()">
                Classify
              </v-btn>
            </v-flex>
            <v-flex md12 v-for="(file, key) in files" :key="'file'+key">
              <v-layout row wrap>
                <v-flex md6><img style="width: 100%; height: auto;" class="preview" v-bind:ref="'image'+parseInt( key )"/></v-flex>
                <v-flex md4 offset-md1>
                  <v-card class="info-card mt-1" raised dark>
                    <v-list>
                      <v-list-tile class="dense-content">
                        <v-list-tile-content>
                          <v-list-tile-title>Prediction</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile class="dense-content">
                        <v-list-tile-content>
                          <v-list-tile-title>Bare Pavement: {{ (probability[0] * 100).toFixed(2) }}%</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile class="dense-content">
                        <v-list-tile-content>
                          <v-list-tile-title>Partly Coverage: {{ (probability[1] * 100).toFixed(2) }}%</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile class="dense-content">
                        <v-list-tile-content>
                          <v-list-tile-title>Fully Coverage: {{ (probability[2] * 100).toFixed(2) }}%</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile class="dense-content">
                        <v-list-tile-content>
                          <v-list-tile-title>Not Recognizable: {{ (probability[3] * 100).toFixed(2) }}%</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>                      
                    </v-list>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          
          <div class="container">
            <div class="large-12 medium-12 small-12 cell">
              
            </div>
            <div class="large-12 medium-12 small-12 cell">
              <div class="grid-x">
                <div v-for="(file, key) in files" class="large-4 medium-4 small-6 cell file-listing" :key="'file'+key">
                  
                </div>
              </div>
            </div>
            <br>
            <!-- <div class="large-12 medium-12 small-12 cell clear">
              <button v-on:click="addFiles()">Add Files</button>
            </div> -->
            <!-- <br>

            <div class="large-12 medium-12 small-12 cell">
              <button v-on:click="submitFiles()">Submit</button>
            </div> -->
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-content>
      <v-container fluid fill-height class="pa-0">
        <v-layout row wrap>
          <!-- Left Panel -->
          <v-flex xs3 sm3 md3 id="crosslist">
            <v-card class="info-card">
              <v-list>
                <v-list-tile class="dense-content">
                  <v-list-tile-avatar>
                    <v-icon>label</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ current_camera.Id }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile class="dense-content">
                  <v-list-tile-avatar>
                    <v-icon>label</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ current_camera.Organization }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile class="dense-content">
                  <v-list-tile-avatar>
                    <v-icon>label</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ current_camera.RoadwayName }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>

            <v-container fluid>
              <!-- <p>{{ show_list }}</p> -->
              <v-checkbox v-model="show_list" label="Bare Pavement" value="0"></v-checkbox>
              <v-checkbox v-model="show_list" label="Partly Coverage" value="1"></v-checkbox>
              <v-checkbox v-model="show_list" label="Fully Coverage" value="2"></v-checkbox>
              <v-checkbox v-model="show_list" label="Not Recognizable" value="3"></v-checkbox>              
            </v-container>                          
            
          </v-flex>

          <!-- Right Panel -->
          <v-flex xs9 sm9 md9 id="mapview">
            <google-map :center="{lat: current_camera.Latitude, lng: current_camera.Longitude}" :zoom="zoom_level" style="width: 100%; height: 100%;">
              <!-- <google-cluster :grid-size="gridSize" :styles="clusterStyles"> -->
              <google-cluster :minimumClusterSize=10>
                <google-info-window 
                  :options="info_options"
                  :position="{lat: current_camera.Latitude, lng: current_camera.Longitude}"
                  :opened="info_win_open"
                  @closeclick="info_win_open=false, submitted=false, refreshed=false"
                >
                  <v-layout wrap row>
                    <v-flex xs12 sm12 md12>
                      <div class="info-window-text">ID: {{ current_camera.Id }}</div>
                    </v-flex>
                    <v-flex xs12 sm12 md8>
                      <img :src="current_camera.Url" width="400px" height="280px" />
                    </v-flex>
                    <v-flex md4>
                      <v-card class="info-card mt-1" raised dark>
                        <v-list>
                          <v-list-tile class="dense-content">
                            <v-list-tile-content>
                              <v-list-tile-title>Prediction</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-divider></v-divider>
                          <v-list-tile class="dense-content">
                            <v-list-tile-content>
                              <v-list-tile-title>Bare Pavement: {{ (probability[0] * 100).toFixed(2) }}%</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-divider></v-divider>
                          <v-list-tile class="dense-content">
                            <v-list-tile-content>
                              <v-list-tile-title>Partly Coverage: {{ (probability[1] * 100).toFixed(2) }}%</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-divider></v-divider>
                          <v-list-tile class="dense-content">
                            <v-list-tile-content>
                              <v-list-tile-title>Fully Coverage: {{ (probability[2] * 100).toFixed(2) }}%</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-divider></v-divider>
                          <v-list-tile class="dense-content">
                            <v-list-tile-content>
                              <v-list-tile-title>Not Recognizable: {{ (probability[3] * 100).toFixed(2) }}%</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm12>
                      <v-btn
                       large
                       color="primary"
                       @click.stop="getPrediction(current_camera.Id, current_camera.Url)"
                      >
                       Refresh
                      </v-btn>
                    </v-flex>
                    <v-flex xs12 sm12 v-if="refreshed">                        
                        <form>
                          <p>Not correct? Try to update your result</p>
                          <v-btn large color="primary" @click.stop="submitReTrain(reTraining.result, current_camera.Url)" >submit</v-btn><br>
                          <input type="radio" value="Bare Pavement" v-model="reTraining.result">Bare Pavement<br>
                          <input type="radio" value="Partly Coverage" v-model="reTraining.result">Partly Coverage<br>
                          <input type="radio" value="Fully Coverage" v-model="reTraining.result">Fully Coverage<br>
                          <input type="radio" value="Not Recognizable" v-model="reTraining.result">Not Recognizable<br>
                        </form>                         
                        <div v-if="submitted">
                          <h3>Thanks for Training Our AI!</h3>
                        </div> 
                    </v-flex>
                  </v-layout>
                </google-info-window>
                <google-marker                   
                  v-for="(item, index) in camera_list" 
                  :position="{lat: item.Latitude + Math.random()/5000, lng: item.Longitude + Math.random()/5000}" 
                  :clickable="true"
                  :icon="getMarkerIcon(item.Url)"
                  @click="toggleInfoWindow(item)" 
                  :key="index"
                  v-if="loading && isMarkerShow(index) "                  
                >
                </google-marker>
              </google-cluster>
            </google-map>    
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>    
  </v-app>  
</template>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import cameraData from '@/views/Camera/camera.json'
import axios from 'axios'

Vue.use(VueGoogleMaps, {
  load: {
    // key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw'
    key: 'AIzaSyA1Xo6tJdP_FVdA4asqDtYsUKD5Xq_oSes'
  },
  // Demonstrating how we can customize the name of the components
  installComponents: false
})

Vue.component('google-map', VueGoogleMaps.Map)
Vue.component('google-marker', VueGoogleMaps.Marker)
Vue.component('google-cluster', VueGoogleMaps.Cluster)
Vue.component('google-info-window', VueGoogleMaps.InfoWindow)

export default {
  name: 'MapList',
  data () {
    return {
      // dialogm1: '',
      // dialog: false,
      // Map Data
      reTraining: {
        result: 'Bare Pavement'
      },
      center: {
        lat: 52.368011,
        lng: -109.924447
      },
      info_options: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      show_list: ['0', '1', '2', '3'],
      gridSize: 100,
      zoom_level: 6,
      current_camera: {
        Id: 'Ontario511--31dbwlph0yi',
        Organization: 'Ontario511',
        RoadwayName: 'Chesterton',
        Latitude: 45.352304,
        Longitude: -75.724945,
        Name: 'a location1',
        Url: 'https://511on.ca/map/Cctv/31dbwlph0yi--1',
        CityName: ''
      },
      camera_list: cameraData,
      info_win_open: false,
      probability: [0, 0, 0, 0],
      mediaDialog: false,
      files: [],
      allPreds: {},
      loading: false,
      submitted: false,
      refreshed: false
    }
  },
  created: function () {
    this.getAllPreds()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    toggleInfoWindow (camera) {
      this.submitted = false
      this.refreshed = false
      // const self = this
      const url = camera.Url
      const result = url.split('/')
      const id = result[result.length - 1]
      let preds
      // only for debugging.
      if (!this.allPreds[id]) {
        preds = [0, 0, 0, 1]
      } else {
        preds = this.allPreds[id]['preds'][0]
      }
      this.probability = preds
      // console.log('probability', this.probability)
      // console.log('time', time)
      this.current_camera = camera
      // console.log('camera', this.current_camera)
      this.info_win_open = true
    },
    argMax (array) {
      return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1]
    },
    getMarkerIcon (url) {
      const result = url.split('/')
      const id = result[result.length - 1]
      let preds
      // only for debugging.
      if (!this.allPreds[id]) {
        preds = [0, 0, 0, 1]
      } else {
        preds = this.allPreds[id]['preds'][0]
        // console.log(preds)
      }
      const index = this.argMax(preds)
      // console.log('????', preds)
      if (index === 0) {
        return require('@/assets/safety.png')
      } else if (index === 1) {
        return require('@/assets/snow.png')
      } else if (index === 2) {
        return require('@/assets/warning.png')
      } else {
        return require('@/assets/camera.png')
      }
    },
    isMarkerShow (index) {
      // here use the fake label
      let label = index % 4
      return this.show_list.includes(label.toString())
    },
    addFiles () {
      this.$refs.files.click()
    },
    getProgressColor (value) {
      if (value === 100) {
        return 'success'
      } else {
        return 'primary'
      }
    },
    submitFiles () {
      let formData = new FormData()
      const self = this
      for (var i = 0; i < this.files.length; i++) {
        // const file = [files[0]], { type: 'image/png' })
        const file = this.files[i]
        formData.append('image', file)
      }
      // console.log(formData)
      axios.post('http://35.185.8.182:5000/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
        .then((response) => {
          console.log(response)
          self.probability = response.data.predictions[0]
        })
        .catch(function () {
          console.log('FAILURE!!')
        })
    },
    handleFilesUpload () {
      this.files = []
      this.probability = [0, 0, 0, 0]
      let uploadedFiles = this.$refs.files.files
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i])
      }
      this.getImagePreviews()
    },
    getImagePreviews () {
      for (let i = 0; i < this.files.length; i++) {
        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
          let reader = new FileReader()
          reader.addEventListener('load', function () {
            this.$refs['image' + parseInt(i)][0].src = reader.result
          }.bind(this), false)
          reader.readAsDataURL(this.files[i])
        }
      }
    },
    getAllPreds () {
      const self = this
      // axios.get('http://35.185.8.182:5000/database')
      axios.get('http://127.0.0.1:5000/database')
        .then(function (response) {
          // console.log(response)
          for (var key in response.data) {
            self.allPreds[key] = response.data[key]
          }
          self.loading = true
          // console.log(self.allPreds)
          // console.log(self.allPreds)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(function () {
        })
    },
    getPrediction (cameraID, imageUrl) {
      console.log(cameraID, imageUrl)
      this.refreshed = true
      let bodyFormData = new FormData()
      bodyFormData.set('camera_id', cameraID)
      bodyFormData.set('image_url', imageUrl)
      const self = this
      axios({
        method: 'post',
        url: 'http://35.185.8.182:5000/predict',
        data: bodyFormData
      })
        .then((response) => {
          console.log(response)

          self.probability = response.data.predictions[0]
        })
        .catch((error) => {
          console.log(error)
        })
    },
    submitReTrain (result, imageUrl) {
      console.log(result, imageUrl)
      this.submitted = true
      // send result to server
      let retrain = new FormData()
      retrain.set('image_url', imageUrl)
      retrain.set('result', result)
      axios({
        method: 'post',
        // url: 'http://35.185.8.182:5000/retrain',
        url: 'http://127.0.0.1:5000/retrain',
        data: retrain
      })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#submit-button {
  height: 60px;
  width: 90%;
}

#crosslist {
  background-color: #eee;
  text-align: center;
}

#select-num {
  border-radius: 50%;
  background-color: #3f51b5;
  width: 32px;
  height: 32px;
  color: white;
}

#user-info {
  background-color: #eee;
}

.mt-auto {
  margin-top: auto;
}

#avail-panel {
  overflow-y: auto;
  height: 580px;
}

#select-panel {
  overflow-y: auto;
  height: 550px;
}

.info-window-text {
  font-size: 1.4em;
}
</style>
