<template>
  <v-app>
    <!-- Toolbar -->
    <v-toolbar color="indigo" dark fixed app>
      <v-btn icon class="hidden-xs-only" @click.stop="goBack()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Grade X Inspection</v-toolbar-title>
    </v-toolbar>

    <v-dialog v-model="confirm_dialog" max-width="350">
      <v-card>
        <v-card-title class="headline">Confirm current crossing list?</v-card-title>
        <v-card-text>*All changes will be saved</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="confirm_dialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="modifyList()">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-content>
      <v-container fluid fill-height class="pa-0">
        <v-layout row wrap>
          <!-- Left Panel -->
          <v-flex xs4 sm4 md4 id="crosslist">
            <v-btn-toggle mandatory v-model="list_option" id="selection-toggle" class="mb-2 mt-2">
              <v-btn value="avail">
                <span>All Crossings</span>
              </v-btn>
              <v-btn value="select">
                <span>Current List</span>
              </v-btn>
            </v-btn-toggle>

            <!-- Available List -->
            <div v-if="list_option === 'avail'">
              <v-flex xs12 sm12>
                <v-toolbar
                  color="white"
                  floating
                  dense
                >
                    <v-text-field prepend-icon="search" hide-details single-line v-model="search_condition"></v-text-field>
                    <v-btn icon @click.stop="search_condition=''">
                      <v-icon>delete</v-icon>
                    </v-btn>
                </v-toolbar>
              </v-flex>
              <v-flex xs12 sm12 id="avail-panel">
                <cross-card v-for="item in search_list" :key="'card_' + item.crossing_id" v-bind:cross="item" @click.native="selectCross(item)"></cross-card>
              </v-flex>
            </div>

            <!-- Selected List -->
            <div v-else>
              <v-flex sm12 xs12>
                <v-btn color="indigo" class="white--text" id="submit-button" @click.stop="confirm_dialog=true">
                  <v-badge left color="green">
                    <span slot="badge">{{ select_list.length }}</span>
                    <v-icon left dark>assignment</v-icon>
                  </v-badge>
                  Confirm Current List
                  <v-icon right dark>keyboard_arrow_right</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12 sm12 id="select-panel">
                <cross-card v-for="item in select_list" :key="'select_' + item.crossing_id" v-bind:cross="item" @click.native="selectCross(item)"></cross-card>
              </v-flex>
            </div>
          </v-flex>

          <!-- Right Panel -->
          <v-flex xs8 sm8 md8 id="mapview">
            <google-map :center="center" :zoom="zoom_level" style="width: 100%; height: 100%;">
              <google-cluster>
                <google-info-window 
                  :options="info_options"
                  :position="current_cross.position"
                  :opened="info_win_open"
                  @closeclick="info_win_open=false"
                >
                  <v-btn v-if="current_cross.select" depressed small color="pink" @click.stop="toggleList()">Remove</v-btn>
                  <v-btn v-else depressed small color="primary" @click.stop="toggleList()">Add to List</v-btn>
                  <div class="info-window-text">ID: {{ current_cross.crossing_id }}</div>
                  <a class="info-window-text" :href="`https://www.google.com/maps/search/?api=1&query=${current_cross.position.lat},${current_cross.position.lng}`">Navigate to this place</a>
                </google-info-window>
                <google-marker 
                  v-for="item in valid_list" 
                  :position="item.position" 
                  :clickable="true"
                  :icon="require('@/assets/marker.png')"
                  @click="toggleInfoWindow(item)" 
                  :key="'markerinfo_' + item.crossing_id">
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
import CrossCard from '@/views/MapList/components/CrossCard'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import db from '@/utils/firestore'

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
  components: {
    CrossCard
  },
  data () {
    return {
      drawer: null,
      full_list: [],
      list_option: 'avail',
      search_condition: '',
      // Map Data
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
      zoom_level: 6,
      current_cross: {
        'location_id': null,
        'type': null,
        'address': '',
        'crossing_id': '',
        'rsig_id': null,
        'region': '',
        'railway': '',
        'railway_short': '',
        'last_inspector': null,
        'last_inspect_date': '',
        'service_date': '',
        'jurisdiction': '',
        'subdivision': '',
        'position': {
          'lng': 0,
          'lat': 0
        },
        'authority': '',
        'select': false
      },
      info_win_open: false,
      crossing_list: {
        current_list: []
      },
      confirm_dialog: false
    }
  },
  firestore () {
    return {
      // full_list: db.collection('crossing').orderBy('crossing_id'),
      crossing_list: db.collection('inspection_list').doc(this.$store.state.uid)
    }
  },
  methods: {
    setStatus (id) {
      if (id in this.status_map) {
        return this.status_map[id]
      } else {
        return 'initial'
      }
    },
    modifyList () {
      var tempList = this.select_list.map(element => ({
        value: false,
        crossing_id: element.crossing_id,
        region: element.region,
        subdivision: element.subdivision,
        date: new Date(),
        type: element.type,
        status: this.setStatus(element.crossing_id)
      }))
      db.collection('inspection_list').doc(this.$store.state.uid).set({
        current_list: tempList
      })
      this.$router.go(-1)
    },
    goBack () {
      this.$router.go(-1)
    },
    selectCross (cross) {
      if (this.selected.has(cross.crossing_id)) {
        this.selected.delete(cross.crossing_id)
      } else {
        this.selected.add(cross.crossing_id)
      }
      cross.select = !cross.select
      this.center = cross.position
      this.zoom_level = 16
      this.current_cross = cross
      this.info_win_open = true
    },
    toggleList () {
      if (this.selected.has(this.current_cross.crossing_id)) {
        this.selected.delete(this.current_cross.crossing_id)
      } else {
        this.selected.add(this.current_cross.crossing_id)
      }
      this.current_cross.select = !this.current_cross.select
      // this.select_list = this.getSelectList()
    },
    toggleInfoWindow (cross) {
      this.center = cross.position
      this.zoom_level = 16
      this.current_cross = cross
      this.info_win_open = true
    },
    getSelectList () {
      return this.full_list.filter(cross => {
        return this.selected.has(cross.crossing_id)
      })
    }
  },
  computed: {
    select_list: function () {
      return this.full_list.filter(cross => {
        return cross.select
      })
    },
    search_list: function () {
      return this.full_list.filter(cross => {
        return cross.crossing_id !== null && cross.crossing_id.startsWith(this.search_condition)
      })
    },
    valid_list: function () {
      return this.full_list.filter(cross => {
        return cross.position.lat !== null && cross.position.lng !== null
      })
    }
  },
  created: function () {
    this.full_list = []
    this.selected = new Set()
    this.status_map = {}
    db.collection('inspection_list').doc(this.$store.state.uid).get()
      .then((doc) => {
        if ('current_list' in doc.data()) {
          doc.data().current_list.forEach((data) => {
            this.selected.add(data.crossing_id)
            this.status_map[data.crossing_id] = data.status
          })
        }
      })
    db.collection('crossing').orderBy('crossing_id').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const cross = doc.data()
        cross.select = this.selected.has(cross.crossing_id)
        this.full_list.push(cross)
      })
    })
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
