<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p>your account is {{ email }}</p>
  </div>
</template>
<script>
// import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default {
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);
    console.log(decoded);
    return {
      email: decoded.identity.account
    };
  }
};
</script>
<style scoped>
#dashboard {
  height: 100%;
  width: 100%;
  background-color: white;
}
h1,
p {
  text-align: center;
}

p {
  color: red;
}
</style>
