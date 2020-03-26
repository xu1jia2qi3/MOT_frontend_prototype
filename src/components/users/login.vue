<template>
  <v-content app>
    <div id="signin">
      <div class="signin-form">
        <form @submit.prevent="onSubmit">
          <div class="input">
            <label for="email">Email</label>
            <input type="email" id="email" @blur="$v.email.$touch()" v-model="email" />
          </div>
          <div class="input">
            <label for="password">Password</label>
            <input type="password" id="password" @blur="$v.password.$touch()" v-model="password" />
          </div>
          <p id="error" v-if="this.$store.state.wrongpassword">{{this.$store.state.wrongpassword}}</p>
          <p id="error" v-if="this.$store.state.nouser">{{this.$store.state.nouser}}</p>
          <div class="submit">
            <button type="submit" :disabled="$v.$invalid">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  </v-content>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch('login', formData);
      this.email = '';
      this.password = '';
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
#error {
  color: red;
}
.signin-form {
  width: 400px;
  margin: 30px auto;
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
  background-color: #521751;
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
