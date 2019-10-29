<template>
  <v-layout>
    <v-toolbar color="blue-grey" dark fixed>
      <v-btn icon @click.stop="goBack()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Record</v-toolbar-title>
    </v-toolbar>

    <v-flex xs10 sm10 id="panel">
      <v-card class="pb-3">
        <v-layout row wrap>
          <v-flex xs10 sm10 offset-xs1 offset-sm1>
            <v-text-field box multi-line label="Note" v-model="note_text.transcription"></v-text-field>
          </v-flex>
          <v-flex sm12 xs12 class="text-sm-center text-xs-center">
            <v-btn 
              v-if="isRecording"
              color="pink"
              dark
              large 
              class="form-btn"
              @click.native="stop()"
              >Stop</v-btn>
            <v-btn 
              v-else
              color="blue-grey"
              dark
              large 
              class="form-btn"
              @click.native="record()"
              >Start</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
import db from '@/utils/firestore'
import vmsg from 'vmsg'
// import db from '@/utils/firestore'

const recorder = new vmsg.Recorder({
  wasmURL: 'https://unpkg.com/vmsg@0.3.4/vmsg.wasm'
})

export default {
  name: 'Test',
  data () {
    return {
      isRecording: false,
      note_text: {
        transcription: ''
      }
    }
  },
  firestore () {
    return {
      note_text: db.collection('speech_recognition').doc('test')
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    async record () {
      await recorder.initAudio()
      await recorder.initWorker()
      recorder.startRecording()
      this.isRecording = true
    },
    async stop () {
      this.isRecording = false
      const blob = await recorder.stopRecording()
      this.uploadFile(blob)
    },
    uploadFile (blob) {
      var timestamp = Date.now()
      var fileName = 'speech/' + timestamp + '.mp3'
      var storageRef = firebase.storage().ref().child(fileName)
      storageRef.put(blob).then(function (snapshot) {
        console.log('uploaded')
      })
    }
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#panel {
  margin: auto;
}

.headline {
  font-weight: bold;
  font-size: 2em !important;
}

#loginform {
  width: 80%;
  margin: auto;
}

.form-btn {
  width: 200px;
}
</style>
