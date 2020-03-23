<template>
  <v-navigation-drawer app clipped expand-on-hover permanent>
    <!-- v-model="drawer"  -->
    <v-list dense>
      <v-list-item link v-for="link in links" :key="link.text" :to="link.route">
        <v-list-item-action>
          <v-icon>{{ link.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{link.text}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { icon: 'mdi-pencil', text: 'Register', route: '/register' },
        { icon: 'mdi-account', text: 'Login', route: '/login' },
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard' },
        { icon: 'mdi-logout', text: 'Logout', route: '/' }
      ]
    };
  }
};
</script>
<style>
</style>
