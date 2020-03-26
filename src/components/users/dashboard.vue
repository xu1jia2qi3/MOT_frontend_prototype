<template>
<v-content app>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p v-if="email">your account is {{ email }}</p>
    <p v-if="cameras && email" >your cameras are {{ cameras }}</p>
  </div>
  </v-content >
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    email() {
      return !this.$store.getters.user ? false : this.$store.getters.user.email;
    },
    cameras() {
      return !this.$store.getters.user ? false : this.$store.getters.user.cameras;
    }
  },
  methods: {
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
#dashboard {
  height: 100%;
  width: 100%;
  background-color: white;
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
h1,
p {
  text-align: center;
  color: red;
}

</style>
