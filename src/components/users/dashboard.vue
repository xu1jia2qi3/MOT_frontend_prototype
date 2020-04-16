<template>
  <v-content app>
    <div id="dashboard">
      <h1>DeepRWIS Dashboard</h1>
      <p v-if="!auth">You should only get here if you're authenticated!</p>
      <p v-if="email">Welcome: {{ email }}</p>
      <v-container class="cardcontainer">
        <v-card v-if="cameras.length !== 0 && email" light width="100%" max-height="500px">
          <v-btn outlined color="black" @click="toggle1()">
            Email Notification
            <v-icon dark right>mdi-email-newsletter</v-icon>
          </v-btn>

          <v-list shaped class="card-body">
            <v-list-item-group v-model="selectedcameras" multiple>
              <template v-for="(item, i) in cameras">
                <v-list-item :key="`item-${i}`" :value="item" active-class="light-green">
                  <template v-slot:default="{ active, toggle }">
                    <v-list-item-content>
                      <v-list-item-title v-text="`Camera ${i}`"></v-list-item-title>
                      <v-list-item-title v-text="`Id:${item.Id}`"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-checkbox
                        :input-value="active"
                        :true-value="item"
                        color="white"
                        @click="toggle"
                      ></v-checkbox>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
        <div style="height : 10px"></div>
        <v-btn v-if="selected" class="BotBottonL" outlined color="black" @click="dialog1">
          delete
          <v-icon dark right>mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-container>

      <v-dialog v-model="dialog" persistent max-width="290" light>
        <v-card>
          <v-card-title class="headline">
            <v-icon large left>mdi-shield-alert-outline</v-icon>Confirm Deletion
          </v-card-title>
          <v-card-text id="warning">Are You Sure You Want to Permanently Remove Those Cameras?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="canceldialog">Cancel</v-btn>
            <v-btn color="green darken-1" text @click="deleteCamera">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog2" max-width="400" light>
        <v-card min-height="160" class="text-center">
          <v-card-title class="headline">Your Email Notification is {{ switch1 ? 'On' : 'Off' }}</v-card-title>
          <v-btn
            large
            icon
            v-bind:color="switch1 === true ? 'blue' : 'grey'"
            @click="toggleClass()"
          >
            <v-icon v-if="switch1">mdi-bell-ring-outline</v-icon>
            <v-icon v-if="!switch1">mdi-bell-off-outline</v-icon>
          </v-btn>
          <v-snackbar
            class="snackbar"
            v-if="switch1"
            color="success"
            bottom
            absolute
            v-model="snackbar1"
            :timeout="2000"
          >Email Notification Turned On</v-snackbar>
          <v-snackbar
            class="snackbar"
            v-if="!switch1"
            color="error"
            bottom
            absolute
            v-model="snackbar1"
            :timeout="2000"
          >Email Notification Turned Off</v-snackbar>
        </v-card>
      </v-dialog>
      <v-snackbar
        color="success"
        bottom
        absolute
        v-model="snackbar"
        :timeout="2000"
      >Removed from My Favorite Cameras List Successfully!</v-snackbar>

      <p v-if="cameras.length === 0 && email">you don't have any favorite cameras</p>
    </div>
  </v-content>
</template>
<script>
export default {
  data() {
    return {
      switch1: true,
      snackbar: null,
      snackbar1: null,
      dialog: false,
      dialog2: false,
      selectedcameras: []
    };
  },
  computed: {
    auth() {
      return !this.$store.getters.isAuth ? false : this.$store.getters.isAuth;
    },
    selected() {
      return this.selectedcameras.length !== 0;
    },
    email() {
      return !this.$store.getters.user ? '' : this.$store.getters.user.email;
    },
    cameras() {
      return !this.$store.getters.user ? [] : this.$store.getters.user.cameras;
    }
  },
  methods: {
    toggle1() {
      this.dialog2 = true;
      this.switch1 = this.$store.getters.user.auto_email;
    },
    toggleClass() {
      this.switch1 = !this.switch1;
      const formData = {
        isEnable: this.switch1
      };
      this.$store.dispatch('updateNotice', formData);
      this.snackbar1 = true;
    },
    canceldialog() {
      this.dialog = false;
      this.selectedcameras = [];
    },
    dialog1() {
      this.dialog = true;
    },
    deleteCamera() {
      const formData = {
        list: this.selectedcameras
      };
      this.$store.dispatch('deleteList', formData);
      this.selectedcameras = [];
      this.dialog = false;
      this.snackbar = true;
    },
    onSubmit() {
      this.$store.dispatch('dashboard');
    }
  },
  created() {
    this.onSubmit();
  }
};
</script>
<style scoped>
.cardcontainer {
  width: 40%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.card-body {
  overflow-y: auto;
  max-height: 50vh;
}
#warning {
  font-size: 1.2rem;
}
.BotBottonL {
  margin: 0;
}
#dashboard {
  height: 100%;
  width: 100%;
  background-color: white;
}
h1,
p {
  text-align: center;
  color: red;
}
</style>
