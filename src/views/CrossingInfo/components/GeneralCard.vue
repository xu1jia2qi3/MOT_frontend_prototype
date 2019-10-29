<template>
  <v-card  class="pl-2 pr-3">
    <v-layout wrap>

      <v-flex xs2 sm2>
        <v-subheader>Long English</v-subheader>
      </v-flex>
      <v-flex xs10 sm10>
        <v-text-field single-line disabled v-model="info.longEnglish"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Long French</v-subheader>
      </v-flex>
      <v-flex xs10 sm10>
        <v-text-field single-line disabled v-model="info.longFrench"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Status</v-subheader>
      </v-flex>
      <v-flex xs10 sm10>
        <v-text-field single-line disabled v-model="info.status"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Type</v-subheader>
      </v-flex>
      <v-flex xs10 sm10>
        <v-text-field single-line disabled v-model="info.type"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>In Service</v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-text-field single-line disabled v-model="info.inService"></v-text-field>   
      </v-flex>
      <v-flex xs1 sm1>
        <v-subheader>To</v-subheader>
      </v-flex>
      <v-flex xs2 sm2>
        <v-text-field single-line disabled v-model="info.to"></v-text-field>
      </v-flex>
      <v-flex xs1 sm1>
        <v-subheader>Key Rt</v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-text-field single-line disabled v-model="info.keyRt"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Railway</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.railway"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Jurisdiction</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.jurisdiction"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Subdivision</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.subdivision"></v-text-field>
      </v-flex>              
      <v-flex xs2 sm2>
        <v-subheader>Mile</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.subdivisionMile"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Spur</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.spur"></v-text-field>
      </v-flex>              
      <v-flex xs2 sm2>
        <v-subheader>Mile</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.spurMile"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Province</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.province"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Region</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.region"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Latitude</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.latitude"></v-text-field>
      </v-flex>              
      <v-flex xs2 sm2>
        <v-subheader>Longitude</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.longitude"></v-text-field>
      </v-flex> 

      <v-flex xs2 sm2>
        <v-subheader>Road/Hwy #</v-subheader>
      </v-flex>
      <v-flex xs10 sm10>
        <v-text-field single-line disabled v-model="info.roadHwy"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Updated by</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.updatedBy"></v-text-field>
      </v-flex>               
      <v-flex xs2 sm2>
        <v-subheader>on</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.on"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Memo</v-subheader>
      </v-flex>
      <v-flex xs10 sm10>
        <v-text-field single-line disabled v-model="info.memo1"></v-text-field>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'GeneralCard',
  props: ['info']
}
</script>

<style scoped>
</style>
