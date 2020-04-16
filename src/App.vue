<template>
  <v-app id="inspire">
    <!-- header -->
    <myheader></myheader>
    <!-- left nav -->
    <mynav></mynav>
    <!-- content -->
    <router-view></router-view>
    <!-- footer -->
    <myfooter></myfooter>
  </v-app>
</template>

<script>
export default {
  name: 'inspire',
  created() {
    this.$vuetify.theme.dark = true;
    this.$store.dispatch('tryAutoLogin');
  }
};
</script>
<style>
#inspire {
  height: 100vh;
}
</style>
