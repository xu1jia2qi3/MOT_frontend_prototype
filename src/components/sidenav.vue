/* eslint-disable no-unneeded-ternary */
<template>
  <v-navigation-drawer app clipped expand-on-hover permanent>
    <!-- v-model="drawer"  -->
    <v-list dense flat>
      <v-list-item link v-for="link in filterdList" :key="link.text" :to="link.route">
        <v-list-item-action>
          <v-icon>{{ link.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{link.text}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link :to="'/'">
        <v-list-item-action>
          <v-icon>mdi-map-check-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Back to Map</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="auth" @click="onLogout" id="logout">
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
import EventBus from './eventbus';

export default {
  computed: {
    auth() {
      return !this.$store.getters.isAuth ? false : this.$store.getters.isAuth;
    },
    filterdList() {
      return this.links.filter(item => item.requireAuth === this.auth);
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
      EventBus.$emit('trunswitch', false);
    }
  },
  data() {
    return {
      links: [
        {
          icon: 'mdi-pencil',
          text: 'Register',
          route: '/register',
          requireAuth: false
        },
        {
          icon: 'mdi-account',
          text: 'Login',
          route: '/login',
          requireAuth: false
        },
        {
          icon: 'mdi-view-dashboard',
          text: 'Dashboard',
          route: '/dashboard',
          requireAuth: true
        }
      ]
    };
  }
};
</script>
<style scoped>
#logout {
  margin: auto;
  top: 76vh;
  /* bottom: 0%; */
}
</style>
