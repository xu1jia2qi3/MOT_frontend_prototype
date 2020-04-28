<template>
  <v-content app>
    <div id="signin">
      <div class="signin-form">
        <form @submit.prevent="onSubmit">
          <h1>Dear User</h1>
          <p>Please enter your new password</p>
          <div class="input" :class="{invalid: $v.password.$error}">
            <label for="password">New Password</label>
            <input type="password" id="password" @blur="$v.password.$touch()" v-model="password" />
            <p
              v-if="$v.password.$error"
            >password should be minimal 8 alphanumeric include 1 number & 1 alphabet</p>
          </div>
          <div class="input" :class="{invalid: $v.confirmPassword.$error}">
            <label for="confirm-password">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              @blur="$v.confirmPassword.$touch()"
              v-model="confirmPassword"
            />
            <p v-if="$v.confirmPassword.$error">password doesn't match</p>
          </div>
          <p id="register">{{this.$store.state.register}}</p>
          <div class="submit">
            <v-btn type="submit" :disabled="$v.$invalid" light outlined color="black">Submit</v-btn>
          </div>

          <v-dialog v-model="dialog4" max-width="200px">
            <h3 style="text-align:center;font-size:1.25rem">Resetting Password</h3>
            <v-progress-linear color="deep-purple accent-4" indeterminate rounded height="6"></v-progress-linear>
          </v-dialog>
        </form>
      </div>
    </div>
    <v-snackbar
      color="success"
      top
      absolute
      v-model="snackbar"
      :timeout="1500"
    >Password Set Successfully!</v-snackbar>
  </v-content>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import router from '../../router';

export default {
  data() {
    return {
      dialog4: false,
      snackbar: false,
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  validations: {
    password: {
      required,
      minLen: minLength(8)
    },
    confirmPassword: {
      sameAs: sameAs(vm => vm.password)
    }
  },
  methods: {
    onSubmit() {
      this.dialog4 = true;
      const formData = {
        reset_token: this.$route.params.token,
        password: this.password
      };
      console.log(formData);
      axios
        .post(`${this.$store.state.serverUrl}/users/resetpassword`, formData)
        .then(response => {
          console.log(response);
          this.dialog4 = false;
          this.snackbar = true;
          setTimeout(() => {
            router.push({ name: 'Login' });
          }, 2000);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
h1,
p {
  color: black;
}
#forget {
  text-decoration: none;
}
#signin {
  height: 100%;
  width: 100%;
  background-color: white;
}
#error {
  color: red;
}
.signin-form {
  width: 400px;
  margin: auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.input {
  margin: 10px auto;
  color: black;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

#emailerror {
  color: red;
}
#register {
  color: green;
}
.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input.invalid label {
  color: red;
}

.input.invalid input {
  border: 1px solid red;
  background-color: #ffc9aa;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.submit button {
  border: 1px solid #521751;
  color: #521751;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #1dcf4a;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
</style>
