<template>
  <v-flex>
    <v-card class="info-card" v-bind:class="{ active: cross.select }">
      <v-layout row wrap>
        <v-flex sm10 xs10>
          <p class="cross-id">{{ cross.crossing_id }}</p>
        </v-flex>
        <v-flex sm1 xs1>
          <v-checkbox v-model="cross.select" color="indigo" hide-details @click.stop="cross.select = !cross.select"></v-checkbox>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile class="dense-content">
          <v-list-tile-avatar>
            <v-icon>label</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ cross.railway }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile class="dense-content">
          <v-list-tile-avatar>
            <v-icon>map</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ cross.region + ' - ' + cross.subdivision }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile class="dense-content">
          <v-list-tile-avatar>
            <v-icon>traffic</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ cross.type }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile class="dense-content">
          <v-list-tile-avatar>
            <v-icon>place</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ cross.address }}</v-list-tile-title>
            <!-- <v-list-tile-sub-title>{{ cross.region }}</v-list-tile-sub-title> -->
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'CrossCard',
  props: ['cross']
}
</script>

<style scoped>
.info-card {
  width: 300px;
  margin: auto;
  margin-top: 10px;
  padding-bottom: 5px;
}

.active {
  background-color: rgb(197, 202, 233) !important;
}

.cross-id {
  margin: auto;
  font-weight: bold;
  font-size: 1.6em;
  color: rgb(40, 53, 147);
}

.dense-content {
  height: 30px;
}
</style>
