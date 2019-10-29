<template>
  <v-app>
    <!-- Toolbar -->
    <v-toolbar 
      color="light-green darken-2" 
      dark 
      fixed
      clipped-left
      app
    >
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-btn icon class="hidden-xs-only" @click.stop="goBack()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <!-- <v-toolbar-title>Grade X Inspection</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-btn
        outline
        @click.stop="calc_dialog = true"
      >
        <v-icon left>gradient</v-icon>
        Check Sightlines
      </v-btn>
      <v-btn
        outline
        @click.stop="confirm_dialog = true"
      >
        <v-icon left>save_alt</v-icon>
        Save
      </v-btn>
    </v-toolbar>

    <!-- Store dialog -->
    <v-dialog v-model="confirm_dialog" max-width="500px">
      <v-card>
        <v-toolbar color="light-blue" dark>
          <v-toolbar-title>Save and Exit</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.stop="confirm_dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list three-line class="pa-0">
          <v-list-tile>
            <v-list-tile-content @click.stop="markStatus('complete')">
              <v-list-tile-title>{{ dialog_items[0].title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ dialog_items[0].subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-content @click.stop="markStatus('incomplete')">
              <v-list-tile-title>{{ dialog_items[1].title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ dialog_items[1].subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog> 

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
          <v-btn icon @click.native="mediaDialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Photo Notes and Audio Records</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-flex xs12 sm12>
            <v-btn 
              raised 
              large 
              color="primary" 
              v-if="question_list[current_question].media !== undefined && question_list[current_question].media.length > 0"
              @click.stop="showImageList">View Images</v-btn>
            <v-btn raised large color="primary" @click.stop="OnPickFile">Add Image</v-btn>
            <v-btn raised large color="success" v-if="imageList.length > 0" @click="UploadFiles">Upload to Server</v-btn>
            <input 
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              @change="OnFilePicked"
              multiple
            >
            <transition-group name="list">
              <v-card raised class="image-card" v-for="(image, index) in imageList" :key="image.imageName">
                <v-layout row wrap>
                  <v-flex xs4 sm4 md4 class="fill">
                    <img :src="image.imageUrl"/>
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    <div class="right-align">
                      <v-icon large class="mt-2 mr-2" @click.stop="remove(index)">close</v-icon>
                    </div>
                    <div class="image-note">
                      <v-text-field
                        label="Description"
                        prepend-icon="description"
                        v-model="image.imageNote"
                      ></v-text-field>
                    </div>
                    <div class="image-progress">
                      <v-progress-linear :color="getProgressColor(image.progress)" :value="image.progress" height="10"></v-progress-linear>
                    </div>
                  </v-flex>
                </v-layout>
              </v-card>
            </transition-group>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- image viewer dialog -->  
    <v-dialog
      v-model="image_viewer"
      max-width="800"
    >
      <v-card>
        <p></p>
        <v-carousel lazy>
          <v-carousel-item
            v-for="(item, i) in question_list[current_question].media"
            :key="i"
            :src="item.imageUrl"
          ><span class="image-note">{{ item.note }}</span></v-carousel-item>
        </v-carousel>
        <v-card-actions>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="image_viewer = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- calculation dialog -->
    <v-dialog
      v-model="calc_dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="calc_dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Calculation</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="calc_dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-layout row>
            <v-flex xs4>
              <v-subheader>Road Crossing Design Speed V (km/hr)</v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-select
                :items="speeds"
                v-model="design_speed"
                label="Road Crossing Design Speed"
                single-line
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs4>
              <v-subheader>Road Approach Gradient (%)</v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-select
                :items="gradients"
                v-model="road_gradient"
                label="Road Approach Gradient (%)"
                single-line
              ></v-select>
            </v-flex>
          </v-layout>
          <div class="info-block">
            Stopping Sight Distance (SSD):   <span class="stat">{{ ssd }}</span>
          </div>
          <v-layout row>
            <v-flex xs1>
              <v-subheader>J</v-subheader>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="D_stopped.J"
                label="Perception-reaction time (seconds)"
              ></v-text-field>
            </v-flex>
            <v-flex xs1>
              <v-subheader>T</v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="D_stopped.T"
                label="time for design vehicle to travel thourgh (seconds)"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs1>
              <v-subheader>CD</v-subheader>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="D_stopped.cd"
                label="the clearance distance (meters)"
              ></v-text-field>
            </v-flex>
            <v-flex xs1>
              <v-subheader>Vp</v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="D_stopped.Vp"
                label="the average travel speed for pedestrians and cyclists (m/s)"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs1>
              <v-subheader>Vt</v-subheader>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="D_stopped.Vt"
                label="railway design speed (km/h)"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <div class="info-block">
            Sightlines from Stopped Position (Dstopped):   <span class="stat">{{ dstopped }}</span>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Left Panel: navigation drawer -->
    <v-navigation-drawer 
      id="crosslist"
      fixed
      clipped
      app
      v-model="drawer"
      mobile-break-point=800
    >
      <!-- Site Info -->
      <v-card color="blue-grey lighten-5" id="crossing-info">
        <v-card-title primary-title>
          <div>
            <div class="headline"><strong>Crossing ID: </strong>{{ crossing_info.id }}</div>
            <div class="info-text"><strong>Type: </strong>{{ crossing_info.type }}</div>
            <div class="info-text"><strong>Region: </strong>{{ crossing_info.region + ' - ' + crossing_info.subdivision }}</div>
            <div class="info-text"><strong>Railway: </strong>{{ crossing_info.railway }}</div>
            <div class="info-text"><strong>Address: </strong>{{crossing_info.address }}</div>
            <div class="info-text"><strong>Last Inspect Date: </strong>{{crossing_info.last_inspect_date }}</div>
            <div class="info-text" v-if="crossing_info.last_inspector !== null"
            ><strong>Last Inspector: </strong>{{crossing_info.last_inspector }}</div>
          </div>
        </v-card-title>
        <!-- <v-btn color="info">Overview</v-btn> -->
        <v-btn large color="success" @click.native.stop="checkInfo()">More Details</v-btn>
        <div>
          <v-progress-linear id="progress-bar" :value="answer_number / question_list.length * 100" height="8" color="teal"></v-progress-linear>
          <div>{{ answer_number +'/' + question_list.length }}</div>
        </div>
      </v-card>
      
      <v-card class="mt-1 pb-1 section-card" flat
        v-for="(section, index) in section_list" :key="'section_' + index"
        :color="getSectionColor(index)"
      >
        <v-card-title primary-title class="pt-1 pb-0">
          <h3 class="mb-0">{{ section.title }}</h3>
          <v-btn icon @click="section.show = !section.show">
            <v-icon>{{ section.show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
          </v-btn>
        </v-card-title>
        <v-slide-y-transition>
          <v-card-text class="pt-1" v-show="section.show">
            <v-btn
              v-for="(question, index) in section.question_list" 
              :key="'btn_' + index" 
              :outline="question.answer==null && current_question != question.index" 
              fab 
              small 
              :dark="question.answer!=null"
              @click.stop="selectQuestion(question.index)"
              :color="getQuestionColor(question, question.index)"
            >
              {{ question.id }}
            </v-btn>
          </v-card-text>
        </v-slide-y-transition>
      </v-card>

      <v-btn :color="getQuestionColor(question, index)" 
        :outline="question.answer==null && current_question != index" 
        fab 
        small 
        :dark="question.answer!=null" 
        v-for="(question, index) in question_list" 
        :key="index" 
        @click.stop="selectQuestion(index)"
      >
        {{ question.id }}
      </v-btn>
    </v-navigation-drawer>

    <!-- Content: Form List -->
    <v-content>
      <v-container fluid>
        <v-layout>
          <transition :name="transition" mode="out-in">
            <v-card id="right-panel" class="pa-3 text-xs-center text-sm-center" :key="current_question">
              <!-- question details -->
              <div id="question-detail">
                <div class="headline">
                  <strong>Question ID: </strong>
                  {{ question_list[current_question].id + ' (' + (current_question + 1) +'/' + question_list.length + ')'}}
                </div>
                <hr>
                <div class="question-text mt-3">{{ question_list[current_question].text }}</div>
              </div>
              <div v-if="question_list[current_question].boolean == null">
                <v-layout row>
                  <v-flex xs4 sm4>
                    <v-checkbox v-model="question_list[current_question].answer" value="ans1" label= "NC CA Required" ></v-checkbox>                              
                  </v-flex>
                  <v-flex xs4 sm4>
                    <v-checkbox v-model="question_list[current_question].answer" value="ans2" label= "NC CA Taken"></v-checkbox>                              
                  </v-flex>
                  <v-flex xs4 sm4>
                    <v-checkbox v-model="question_list[current_question].answer" value="ans3" label= "C CA Required" ></v-checkbox>                              
                  </v-flex>                       
                </v-layout>
                <v-layout row>
                  <v-flex xs4 sm4>
                    <v-checkbox v-model="question_list[current_question].answer" value="ans4" label= "C CA Taken"></v-checkbox>                              
                  </v-flex>
                  <v-flex xs6 sm6>
                    <v-checkbox v-model="question_list[current_question].answer" value="ans5" label= "C CA Developing Issue" ></v-checkbox>                              
                  </v-flex>                                                      
                </v-layout>  
                <v-layout row>
                  <v-flex xs4 sm4>
                    <v-checkbox v-model="question_list[current_question].answer" value="ans6" label= "No Issues Noted" ></v-checkbox>                              
                  </v-flex> 
                  <v-flex xs4 sm4>
                    <v-checkbox v-model="question_list[current_question].answer" value="ans7" label= "Not Applicable"></v-checkbox>                              
                  </v-flex>
                  <v-flex xs4 sm4>
                    <v-checkbox v-model="question_list[current_question].answer" value="ans8" label= "Not Inspected" ></v-checkbox>                              
                  </v-flex>                                                        
                </v-layout>
              </div>
              <v-layout row v-else justify-center>
                <v-flex xs4 sm4>
                  <v-checkbox v-model="question_list[current_question].answer" value="ans1" label= "Yes" ></v-checkbox>                              
                </v-flex>
                <v-flex xs4 sm4>
                  <v-checkbox v-model="question_list[current_question].answer" value="ans2" label= "No" ></v-checkbox>                              
                </v-flex>
              </v-layout>

              <v-text-field
                name="input-1"
                label="Notes about inspections"
                textarea
                v-model="question_list[current_question].note"
              ></v-text-field>

              <!-- question direct -->
              <v-layout row justify-space-between>
                <v-btn large color="blue-grey" class="white--text" :disabled="current_question == 0" @click.stop="movePre()">
                  <v-icon left dark>chevron_left</v-icon>
                  Backward
                </v-btn>
                <v-btn color="primary" large dark @click.stop="mediaDialog = true">Images</v-btn>
                <v-btn large color="blue-grey" class="white--text" :disabled="current_question == question_list.length - 1" @click.stop="moveNext()">
                  Forward
                  <v-icon right dark>chevron_right</v-icon>
                </v-btn>
              </v-layout>
            </v-card>
          </transition>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import db from '@/utils/firestore'
import firebase from 'firebase'

export default {
  name: 'Form',
  data () {
    return {
      // left drawer
      drawer: true,
      crossing_info: {
        id: null,
        type: null,
        region: '',
        subdivision: '',
        railway: null,
        address: null
      },
      // calculation dialog
      calc_dialog: false,
      design_speed: 10,
      road_gradient: 0,
      speeds: [
        10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110
      ],
      gradients: [
        -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
      ],
      D_stopped: {
        J: 0,
        T: 0,
        cd: 0,
        Vp: 1,
        Vt: 0
      },
      // pop-up dialog
      confirm_dialog: null,
      dialog_items: [
        {
          title: 'Mark As Completed',
          subtitle:
            'The End Time stamp will be added to the checklist information.'
        },
        {
          title: 'End Inspection For Now',
          subtitle:
            'Your inspection work will be saved. You may continue later to complete the inspection.'
        }
      ],

      // info dialog
      info_dialog: false,

      // question panel
      transition: 'slide-right',
      current_question: 0,
      question_dialog: false,
      question_list: [],
      current_list: [],
      // media dialog
      mediaDialog: false,
      image_viewer: false,
      imageList: [],
      section_list: []
    }
  },
  methods: {
    selectQuestion (n) {
      this.current_question = n
      this.imageList = []
    },
    goBack () {
      this.$router.go(-1)
    },
    checkInfo (id) {
      this.$router.push({ path: `/crossing_info/${this.crossing_info.id}` })
    },
    getSectionColor (index) {
      const colorList = [
        'blue-grey lighten-5',
        'red lighten-5',
        'lime lighten-5',
        'purple lighten-5',
        'orange lighten-5',
        'cyan lighten-5'
      ]
      return colorList[index]
    },
    getQuestionColor (question, index) {
      if (index === this.current_question) {
        return 'primary'
      } else if (question.answer === null && question.color !== null) {
        return question.color
      } else {
        return 'success'
      }
    },
    movePre () {
      this.transition = 'slide-left'
      this.current_question -= 1
      this.imageList = []
    },
    moveNext () {
      this.transition = 'slide-right'
      this.current_question += 1
      this.imageList = []
    },
    markStatus (status) {
      let data = {}
      this.question_list.forEach((element, index) => {
        data[index] = {
          answer: element.answer,
          note: element.note,
          media: element.media
        }
      })
      db.doc(`/inspection_history/${this.$store.state.uid}/current_list/${this.crossing_info.id}`)
        .set({
          type: this.crossing_info.type,
          record: data
        })
      var found = this.current_list.findIndex((element) => {
        return element.crossing_id === this.crossing_info.id
      })
      this.current_list[found].status = status
      db.collection('inspection_list').doc(this.$store.state.uid).update({
        current_list: this.current_list
      })
      this.confirm_dialog = false
      this.$router.go(-1)
    },
    OnPickFile () {
      this.$refs.fileInput.click()
    },
    getProgressColor (value) {
      if (value === 100) {
        return 'success'
      } else {
        return 'primary'
      }
    },
    OnFilePicked (event) {
      const files = event.target.files
      for (let i = 0; i < files.length; i++) {
        let filename = files[i].name
        if (filename.lastIndexOf('.') >= 0) {
          let ext = filename.slice(filename.lastIndexOf('.'))
          let imageName = this.current_question + '_' + Date.now().toString() + ext
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
            this.imageUrl = fileReader.result
            this.imageList.push({
              imageUrl: fileReader.result,
              imageData: files[i],
              imageName: imageName,
              imageNote: '',
              progress: 0
            })
          })
          fileReader.readAsDataURL(files[i])
        }
      }
    },
    UploadFiles () {
      const self = this
      this.imageList.forEach((image) => {
        let storageRef = firebase.storage().ref(`inspections/${this.$store.state.uid}/${image.imageName}`)
        let task = storageRef.put(image.imageData)
        task.on('state_changed',
          function progress (snapshot) {
            image.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          },
          function error (err) {
            console.log(err)
          },
          function complete () {
            console.log('finish')
            storageRef.getDownloadURL().then((url) => {
              self.question_list[self.current_question].media.push({
                note: image.imageNote,
                imageRef: `inspections/${self.$store.state.uid}/${image.imageName}`,
                imageUrl: url
              })
              // console.log(self.question_list[self.current_question].media)
            })
          }
        )
      })
    },
    remove (index) {
      this.imageList.splice(index, 1)
    },
    showImageList () {
      this.image_viewer = true
      // console.log(this.question_list[this.current_question].media)
    }
  },
  computed: {
    answer_number: function () {
      return this.question_list.filter(question => {
        return question.answer != null
      }).length
    },
    ssd () {
      const ssdMap = {
        10: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        20: [21, 21, 21, 21, 21, 21, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 19, 19, 19, 19, 19],
        30: [33, 33, 32, 32, 32, 31, 31, 31, 30, 30, 30, 30, 30, 29, 29, 29, 29, 29, 29, 28, 28],
        40: [51, 50, 49, 49, 48, 48, 47, 46, 46, 45, 45, 45, 44, 44, 43, 43, 43, 42, 42, 42, 42],
        50: [76, 75, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 63, 62, 61, 61, 60, 60, 59, 59],
        60: [104, 101, 99, 97, 95, 93, 91, 89, 88, 86, 85, 84, 83, 81, 80, 79, 78, 77, 77, 76, 75],
        70: [140, 135, 132, 128, 125, 122, 119, 117, 114, 112, 110, 108, 106, 105, 103, 101, 100, 99, 97, 96, 95],
        80: [182, 176, 171, 166, 161, 157, 153, 149, 146, 143, 140, 137, 135, 132, 130, 128, 126, 124, 122, 121, 119],
        90: [223, 216, 209, 202, 197, 191, 186, 182, 178, 174, 170, 167, 163, 160, 157, 155, 152, 150, 148, 145, 143],
        100: [281, 271, 262, 253, 245, 238, 232, 226, 220, 215, 210, 205, 201, 197, 194, 190, 187, 184, 181, 178, 175],
        110: [345, 331, 318, 307, 296, 287, 278, 270, 263, 256, 250, 244, 239, 234, 229, 224, 220, 216, 307, 209, 205]
      }
      let index = this.gradients.indexOf(this.road_gradient)
      return ssdMap[this.design_speed][index]
    },
    dstopped () {
      let Td = this.D_stopped.J + this.D_stopped.T
      let Tp = this.D_stopped.cd / this.D_stopped.Vp
      let Ts = Math.max(Td, Tp)
      return (0.278 * this.D_stopped.Vt * Ts).toFixed(2)
    }
  },
  created: function () {
    const self = this
    const crossingId = this.$route.params.id
    const crossingType = this.$route.params.type
    if (crossingType.includes('AWS')) {
      this.question_list = require('./aws.json')
      this.section_list = require('./aws-card.json')
      console.log(this.section_list)
    } else if (crossingType.includes('WIS')) {
      this.question_list = require('./wis.json')
    } else if (crossingType.includes('WSS')) {
      this.question_list = require('./wss.json')
    } else {
      this.question_list = require('./passive.json')
    }
    let record = {}
    db.doc(`/inspection_history/${this.$store.state.uid}/current_list/${crossingId}`)
      .get()
      .then((doc) => {
        if (doc.data() !== undefined) {
          record = doc.data().record
          this.question_list.forEach((element, index) => {
            element.answer = record[index].answer
            element.note = record[index].note
            element.media = record[index].media
          })
        } else {
          this.question_list.forEach((element, index) => {
            element.answer = null
            element.note = ''
            element.media = []
          })
        }
      })
    db.collection('crossing').where('crossing_id', '==', crossingId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          const data = doc.data()
          // console.log(data)
          self.crossing_info = {
            id: crossingId,
            type: crossingType,
            region: data.region,
            subdivision: data.subdivision,
            railway: data.railway,
            address: data.address,
            last_inspector: data.last_inspector,
            last_inspect_date: data.last_inspect_date
          }
        })
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })

    db.collection('inspection_list').doc(this.$store.state.uid).get()
      .then((doc) => {
        if ('current_list' in doc.data()) {
          this.current_list = doc.data().current_list
        }
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#right-panel {
  width: 100%;
}

#crossing-info {
  width: 90%;
  margin-left: 5%;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}

.info-text {
  font-size: 1.3em;
}

#question-detail {
  height: 200px;
  max-height: 200px;
}

#progress-bar {
  width: 90%;
  margin-left: 5%;
}

.question-text {
  font-size: 1.5em;
}

/* slide-fade effect */
.slide-left-enter-active, .slide-right-leave-active {
  transition: all .3s;
}
.slide-left-leave-active, .slide-right-enter-active {
  transition: all .3s;
}
.slide-left-enter, .slide-right-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
.slide-left-leave-to, .slide-right-enter{
  /* transform: translateX(30px); */
  opacity: 0;
}

.image-card {
  width: 90%;
  margin: auto;
  margin-top: 20px;
}
.image-progress {
  width: 90%;
  margin: auto;
  margin-top: 20px;
}
.image-note {
  width: 90%;
  margin: auto;
}
.right-align {
  text-align: right;
}
.fill {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden
}
.fill img {
  flex-shrink: 0;
  max-width: 100%;
  max-height: 200px;
}
.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}

/* calc dialog */
.info-block {
  text-align: center;
  font-size: 24px;
  background-color: #0D47A1;
  border-radius: 10px;
  color: #eee;
}

.stat {
  font-size: 36px;
  color: #F06292;
  margin-left: 10px;
}

.image-note {
  background-color: #eee;
  color: #222;
  text-align: center;
}

.section-card {
  width: 90%;
  margin: auto;
  border-radius: 5px;
}
</style>