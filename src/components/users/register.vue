<template>
  <v-content app>
    <div id="signup">
      <div class="signup-form">
        <form @submit.prevent="onSubmit">
          <div class="input" :class="{invalid: $v.email.$error}">
            <label for="email">Email</label>
            <input type="email" id="email" @blur="$v.email.$touch()" v-model="email" />
            <p v-if="!$v.email.email">Please provide a valid email address.</p>
            <p id="emailerror">{{this.$store.state.emailerror}}</p>
          </div>
          <div class="input" :class="{invalid: $v.password.$error}">
            <label for="password">Password</label>
            <input type="password" id="password" @blur="$v.password.$touch()" v-model="password" />
            <p
              v-if="$v.password.$error"
            >password should be minimal 8 alphanumeric include 1 number & 1 alphabet</p>
          </div>
          <div class="input" :class="{invalid: $v.confirmPassword.$error}">
            <label for="confirm-password">Confirm Password</label>
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
            <button type="submit" :disabled="$v.$invalid">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </v-content>
</template>

<script>
import {
  required, email, minLength, sameAs
} from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  validations: {
    email: {
      required,
      email
    },
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
      const formData = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch('register', formData);
    }
  }
};
</script>

<style scoped>
#signup {
  height: 100%;
  width: 100%;
  background-color: white;
}
#emailerror {
  color: red;
}
#register {
  color: green;
}
.signup-form {
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

.input.inline label {
  display: inline;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input.inline input {
  width: auto;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.input.invalid label {
  color: red;
}

.input.invalid input {
  border: 1px solid red;
  background-color: #ffc9aa;
}

.input select {
  border: 1px solid #ccc;
  font: inherit;
}

.hobbies button {
  border: 1px solid #521751;
  background: #521751;
  color: white;
  padding: 6px;
  font: inherit;
  cursor: pointer;
}

.hobbies button:hover,
.hobbies button:active {
  background-color: #8d4288;
}

.hobbies input {
  width: 90%;
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
