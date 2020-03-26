/* eslint-disable no-unneeded-ternary */
<template>
  <v-navigation-drawer app clipped expand-on-hover permanent>
    <!-- v-model="drawer"  -->
    <!-- <v-list dense>
      <v-list-item link v-for="link in links" :key="link.text" :to="link.route">
        <v-list-item-action>
          <v-icon>{{ link.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{link.text}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <p>{{ auth }}</p>
    </v-list>-->
    <v-list dense>
      <v-list-item link :to="'/register'" v-if="!auth">
        <v-list-item-action>
          <v-icon>mdi-pencil</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Register</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- ##### -->
      <v-list-item link :to="'/login'" v-if="!auth">
        <v-list-item-action>
          <v-icon>mdi-account</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- ##### -->
      <v-list-item link :to="'/dashboard'" v-if="auth">
        <v-list-item-action>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- #### -->
      <v-list-item link :to="'/'">
        <v-list-item-action>
          <v-icon>mdi-map-check-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Back to Map</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- ### -->
      <v-list-item v-if="auth" @click="onLogout" id='logout'>
        <v-list-item-action>
          <v-icon>mdi-logout-variant</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    auth() {
      return !this.$store.getters.isAuth ? false : this.$store.getters.isAuth;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
    }
  },
  data() {
    return {
      links: [
        {
          icon: 'mdi-pencil',
          text: 'Register',
          route: '/register'
        },
        {
          icon: 'mdi-account',
          text: 'Login',
          route: '/login'
        },
        {
          icon: 'mdi-view-dashboard',
          text: 'Dashboard',
          route: '/dashboard'
        }
      ]
    };
  }
};
</script>
<style scoped>
#logout{
  margin:auto;
  top:76vh;
}
</style>
