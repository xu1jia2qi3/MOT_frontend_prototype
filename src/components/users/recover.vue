<template>
  <v-content app>
    <div id="signin">
      <div class="signin-form">
        <form @submit.prevent="onSubmit">
          <div class="input">
            <label for="email">Email</label>
            <input type="email" id="email" @blur="$v.email.$touch()" v-model="email" />
          </div>

          <v-dialog v-model="dialog4" max-width="200px">
            <h3 style="text-align:center;font-size:1.25rem">Sending Email</h3>
            <v-progress-linear color="deep-purple accent-4" indeterminate rounded height="6"></v-progress-linear>
          </v-dialog>

          <div class="submit">
            <v-btn
              class="mr-6"
              type="submit"
              :disabled="$v.$invalid"
              light
              outlined
              color="black"
            >Send Recovery Email</v-btn>
          </div>
        </form>
      </div>
    </div>
    <v-snackbar
      color="success"
      top
      absolute
      v-model="snackbar"
      :timeout="1500"
    >Email Send Successfully!</v-snackbar>
  </v-content>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import router from '../../router';

export default {
  data() {
    return {
      dialog4: false,
      snackbar: false,
      email: ''
    };
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    onSubmit() {
      this.dialog4 = true;
      const formData = {
        email: this.email
      };
      axios
        .post(`${this.$store.state.serverUrl}/users/forgotpassword`, formData)
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
#signin {
  height: 100%;
  width: 100%;
  background-color: white;
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

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
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
