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
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
<style>
#inspire {
  height: 100vh;
}
</style>
