<template>
  <v-layout>
    <v-toolbar color="indigo" dark fixed>
      <v-btn icon>
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>

    <v-flex xs10 sm10 id="panel">
      <v-card>
        <v-card-media
          class="white--text"
          height="200px"
          :src="require('@/assets/crossing.jpg')"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">GradeX Inspection</span>
                <div class="mt-2">Transport Canada <img :src="require('@/assets/canadian-flag.svg')" style="width:28px;height:14px;"></div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <v-form v-model="valid" id="loginform">
            <v-text-field
              label="Email Address"
              hint="Please enter a valid email address"
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              label="Password"
              hint="At least 6 characters"
              v-model="password"
              :rules="passwordRules"
              :append-icon="password_visible ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (password_visible = !password_visible)"
              :type="password_visible ? 'text' : 'password'"
              required
            ></v-text-field>
          </v-form>
        </v-card-title>
        <v-layout row wrap>
          <v-flex sm12 xs12 class="text-sm-center text-xs-center">
            <v-btn color="indigo" 
              :disabled="!inputValid" 
              large 
              class="form-btn" 
              :dark="inputValid"
              @click.stop="login()">Login</v-btn>
            <!-- <v-btn color="indigo" large class="form-btn" dark @click.stop="toggleSnackbar()">TEST</v-btn> -->
          </v-flex>
          <v-flex sm12 xs12 class="text-sm-center text-xs-center mb-4 mt-2">
            <a @click="dialog=true;">Forget Password?</a>
            <v-spacer/>
            <a @click="signUp()">Sign Up</a>
          </v-flex>
        </v-layout>
      </v-card>
      <v-alert type="error" dismissible v-model="alert">
        {{ error }}
      </v-alert>
    </v-flex>

    <!-- Reset Modal Dialog -->
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Reset Password</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs10 sm10 offset-xs1 offset-sm1>
                <v-text-field
                  label="Email Address"
                  hint="Please enter a valid email address"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs10 sm10 offset-xs1 offset-sm1>
                <p>*indicates required field</p>
                <p>An email with password reset link will be sent to your email address.</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn 
            color="blue darken-1" 
            flat
            :disabled="!emailValid(email)"
            @click.native="sendResetEmail()">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Verify Email Modal Dialog -->
    <v-dialog v-model="verify_dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Email Verification</span>
        </v-card-title>
        <v-card-text>
          Please check your inbox for the email with verification link
        </v-card-text>
        <v-flex xs12 class="center">
          <v-btn 
            large 
            dark
            color="primary"
            class="form-btn"
            @click.stop="sendVerifyEmail()"
            >Resend Email</v-btn>
        </v-flex>
      </v-card>
    </v-dialog>

    <!-- snackbar for notification -->
    <v-snackbar
      :timeout=3000
      top
      right
      color="blue-grey darken-4"
      v-model="snackbar"
    >
      <v-icon class="mr-2" color="success">check_circle</v-icon>
      {{ snackbar_text }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Login',
  data () {
    return {
      // login part
      valid: false,
      email: '',
      emailRules: [
        (v) => this.emailValid(v) || 'Email Address is invalid'
      ],
      password: '',
      password_visible: false,
      passwordRules: [
        (v) => this.passwordValid(v) || 'Password should be at least 6 characters'
      ],
      dialog: false,
      alert: false,
      snackbar: false,
      snackbar_text: ''
    }
  },
  methods: {
    login () {
      if (this.inputValid) {
        this.$store.dispatch('userSignIn', { email: this.email, password: this.password })
      }
    },
    signUp () {
      this.$router.push({ path: '/signup' })
    },
    emailValid (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    passwordValid (password) {
      return password.length >= 6
    },
    sendResetEmail () {
      const self = this
      this.dialog = false
      let auth = firebase.auth()
      auth.sendPasswordResetEmail(this.email).then(function () {
        self.toggleSnackbar()
      }).catch(function (error) {
        console.log(error)
      })
    },
    toggleSnackbar () {
      this.snackbar_text = 'An email has been sent'
      this.snackbar = true
    },
    sendVerifyEmail () {
      const self = this
      this.$store.commit('setVerify', null)
      firebase.auth().currentUser.sendEmailVerification()
        .then(function () {
          self.toggleSnackbar()
        })
        .catch(function (error) {
          this.$store.commit('setError', error.message)
        })
    }
  },
  computed: {
    inputValid () {
      return this.emailValid(this.email) && this.passwordValid(this.password)
    },
    error () {
      return this.$store.state.error
    },
    verify_dialog: {
      set (value) {
        console.log(value)
        this.$store.commit('setVerify', null)
        // this.$store.state.verify = null
      },
      get () {
        return this.$store.state.verify === false
      }
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    }
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
  width: 60%;
}

.center {
  text-align: center;
}
</style>
