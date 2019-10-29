<template>
  <v-layout>
    <v-toolbar color="blue-grey" dark fixed>
      <v-btn icon @click.stop="goBack()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>SignUp</v-toolbar-title>
    </v-toolbar>

    <v-flex xs10 sm10 id="panel">
      <v-card class="pb-3">
        <v-card-media
          class="white--text"
          height="200px"
          :src="require('@/assets/crossing.jpg')"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Grade X Inspection</span>
                <div class="mt-2">Transport Canada <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8v%0D%0Ad3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMDAiIGhlaWdodD0iNTAwIj48cmVjdCB3aWR0%0D%0AaD0iMTAwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiNmMDAiLz48cmVjdCB3aWR0aD0iNTAwIiBoZWln%0D%0AaHQ9IjUwMCIgZmlsbD0iI2ZmZiIgeD0iMjUwIi8+PHBhdGggZmlsbD0iI2ZmMDAwMCIgZD0ibSA0%0D%0AOTkuOTkyMjgsNDYuODc1IC0zNC4xMTMxMiw2My42MjUyOSBjIC0zLjg3MDg2LDYuOTE1MDEgLTEw%0D%0ALjgwNjI3LDYuMjczNjMgLTE3Ljc0MTY5LDIuNDExMzggbCAtMjQuNjk2OTksLTEyLjc4ODU4IDE4%0D%0ALjQwNzA1LDk3LjcyNzExIGMgMy44NzA4NiwxNy44NTQxOSAtOC41NDg1OSwxNy44NTQxOSAtMTQu%0D%0ANjc3NjUsMTAuMTM0MzUgbCAtNDMuMTAxMDUsLTQ4LjI1MDk5IC02Ljk5NzM4LDI0LjUwMyBjIC0w%0D%0ALjgwNjkyLDMuMjE3NzcgLTQuMzU0ODEsNi41OTc0NCAtOS42Nzc0OCw1Ljc5MjYxIGwgLTU0LjUw%0D%0AMTc3LC0xMS40NTkxMiAxNC4zMTUyNCw1Mi4wNDQ3NSBjIDMuMDY0NTEsMTEuNTgwNTQgNS40NTQ5%0D%0ALDE2LjM3NTI4IC0zLjA5Mzc1LDE5LjQyOTU5IGwgLTE5LjQyNjE5LDkuMTMwMjUgOTMuODIxMjcs%0D%0ANzYuMjA4MzggYyAzLjcxMzUsMi44ODE1MSA1LjU4OTcxLDguMDY3IDQuMjY3NjgsMTIuNzYyMSBs%0D%0AIC04LjIxMTM2LDI2Ljk0NzA3IGMgMzIuMzA0MDUsLTMuNzIzNzEgNjEuMjQ4OTgsLTkuMzI1OTQg%0D%0AOTMuNTY5MzksLTEyLjc3NjE5IDIuODUzMjMsLTAuMzA0NTkgNy42Mjk4OCw0LjQwNDA4IDcuNjEw%0D%0AMjksNy43MTA1OCBsIC00LjI4MDI0LDk4LjcyMzQyIDE1LjcwNjM5LDAgLTIuNDcyMzcsLTk4LjUx%0D%0AMTcgYyAtMC4wMTk3LC0zLjMwNjUgNC4zMTM3MiwtOC4yMjY4OSA3LjE2Njk1LC03LjkyMjMgMzIu%0D%0AMzIwNDEsMy40NTAyNiA2MS4yNjUzOCw5LjA1MjQ4IDkzLjU2OTQyLDEyLjc3NjE5IGwgLTguMjEx%0D%0AMzQsLTI2Ljk0NzA3IGMgLTEuMzIyMDMsLTQuNjk1MSAwLjU1NDE3LC05Ljg4MDU5IDQuMjY3Njcs%0D%0ALTEyLjc2MjEgbCA5My44MjEyNSwtNzYuMjA4MzggLTE5LjQyNjE3LC05LjEzMDI1IGMgLTguNTQ4%0D%0ANjcsLTMuMDU0MzEgLTYuMTU4MjgsLTcuODQ5MDUgLTMuMDkzNzcsLTE5LjQyOTU5IGwgMTQuMzE1%0D%0AMjcsLTUyLjA0NDc1IC01NC41MDE4LDExLjQ1OTEyIGMgLTUuMzIyNjcsMC44MDQ4MyAtOC44NzA1%0D%0ANiwtMi41NzQ4NCAtOS42Nzc1LC01Ljc5MjYxIGwgLTYuOTk3MzcsLTI0LjUwMyAtNDMuMTAxMDMs%0D%0ANDguMjUwOTkgYyAtNi4xMjkwOCw3LjcxOTg0IC0xOC41NDg1NCw3LjcxOTg0IC0xNC42Nzc2OCwt%0D%0AMTAuMTM0MzUgbCAxOC40MDcwMiwtOTcuNzI3MTEgLTI0LjY5Njk0LDEyLjc4ODU4IGMgLTYuOTM1%0D%0ANTksMy44NjIyNSAtMTMuODcwODMsNC41MDM2MyAtMTcuNzQxNywtMi40MTEzOCIvPjwvc3ZnPg==" style="width:28px;height:14px;"></div>
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
            <v-text-field
              label="Confirm Password"
              hint="enter the same password again"
              v-model="confirm_password"
              :rules="confirmPasswordRules"
              :append-icon="confirm_password_visible ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (confirm_password_visible = !confirm_password_visible)"
              :type="confirm_password_visible ? 'text' : 'password'"
              required
            ></v-text-field>
          </v-form>
        </v-card-title>
        <v-layout row wrap>
          <v-flex sm12 xs12 class="text-sm-center text-xs-center">
            <v-btn 
              color="blue-grey" 
              :disabled="!inputValid" 
              :dark="inputValid"
              large 
              class="form-btn"
              @click.stop="signUp()">Confirm</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
      <v-alert type="error" dismissible v-model="alert">
        {{ error }}
      </v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'SignUp',
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
      confirm_password: '',
      confirm_password_visible: false,
      confirmPasswordRules: [
        (v) => this.passwordConfirm() || 'Passwords are not matched'
      ],
      dialog: false,
      alert: false
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    signUp () {
      if (this.inputValid) {
        this.$store.dispatch('userSignUp', { email: this.email, password: this.password })
      }
    },
    emailValid (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    passwordValid (password) {
      return password.length >= 6
    },
    passwordConfirm () {
      return this.password === this.confirm_password
    }
  },
  computed: {
    inputValid () {
      return this.emailValid(this.email) && this.passwordValid(this.password) && this.passwordConfirm()
    },
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
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
  width: 200px;
}
</style>
