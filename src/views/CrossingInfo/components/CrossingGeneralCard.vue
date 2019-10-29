<template>
  <v-card  class="pl-2 pr-3">
    <v-layout wrap>
      <v-flex xs2 sm2>
        <v-subheader>Type</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.type"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>TC ID</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.crossingID"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Access</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.access"></v-text-field>
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
        <v-subheader> Prov.</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.province"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Subdivision</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.subdivision"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Key Route</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.keyRt"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Spur</v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.spur"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>GCR Appl. </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.gcrApplicable"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Pedestrain Protection </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.pedestrianProtection"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Whis. Cess. </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.whistleCessation"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Passive Protection </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.passiveProtection"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>WC Prov. </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.whistleCessationProvision"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>AWS Protection </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.awsProtection"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>WC Auth. </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.whistleCessationAuthority"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Track Circuit </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.trackCircuit"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Rd. Class 1 </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.roadClass1"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>LED Lights </v-subheader>
      </v-flex>
      <v-flex xs1 sm1>
        <v-text-field single-line disabled v-model="info.ledLights"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Data Recorder </v-subheader>
      </v-flex>
      <v-flex xs1 sm1>
        <v-text-field single-line disabled v-model="info.dataRecorder"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Rd. Type </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.roadType"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Road Name/Hwy# </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.roadHwy"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-subheader>Rd. Class 2 </v-subheader>
      </v-flex>
      <v-flex xs4 sm4>
        <v-text-field single-line disabled v-model="info.roadClass2"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Road Auth. #1 </v-subheader>
      </v-flex>
      <v-flex xs8 sm8>
        <v-text-field single-line disabled v-model="info.roadAuthority1"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-checkbox label="private" single-line disabled></v-checkbox>
      </v-flex>
      
      <v-flex xs2 sm2>
        <v-subheader>Road Auth. #2 </v-subheader>
      </v-flex>
      <v-flex xs8 sm8>
        <v-text-field single-line disabled v-model="info.roadAuthority2"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2>
        <v-checkbox label="private" single-line disabled></v-checkbox>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Exemption </v-subheader>
      </v-flex>
      <v-flex xs10 sm10>
        <v-text-field single-line disabled v-model="info.exemption"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Last Inspected</v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-text-field single-line disabled v-model="info.lastInspectionDate"></v-text-field>         
      </v-flex>
      <v-flex xs1 sm1>
        <v-subheader>By </v-subheader>
      </v-flex>
      <v-flex xs6 sm6>
        <v-text-field single-line disabled v-model="info.lastInspectionBy"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>Last Comp.A Insp</v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-text-field single-line disabled v-model="info.overallnumAnynumLastnumInspectionnumIDnum"></v-text-field>
      </v-flex>
      <v-flex xs1 sm1>
        <v-subheader>By </v-subheader>
      </v-flex>
      <v-flex xs6 sm6>
        <v-text-field single-line disabled v-model="info.lastComponentAInspection"></v-text-field>
      </v-flex>

      <v-flex xs2 sm2>
        <v-subheader>In Service From</v-subheader>
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
        <v-subheader>Status </v-subheader>
      </v-flex>
      <v-flex xs3 sm3>
        <v-text-field single-line disabled v-model="info.status"></v-text-field>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'CrossingGeneralCard',
  props: ['info']
}
</script>

<style scoped>
</style>
