<template>
  <v-card>
    <v-card-title>
      <div>
        <h3 class="title-text">Vehicle / Pedestrain Accidents</h3>
      </div>
    </v-card-title>
    <v-data-table
      :headers="headers_accident"
      :items="info"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.occurrenceNum }}</td>
        <td class="text-xs-right">{{ props.item.occurrenceYear }}</td>
        <td class="text-xs-right">{{ props.item.occurrenceDate }}</td>
        <td class="text-xs-right">{{ props.item.occurrenceTime }}</td>
        <td class="text-xs-right">{{ props.item.occurrenceType }}</td>
        <td class="text-xs-right">{{ props.item.occurrenceIncType }}</td>
        <td class="text-xs-right">{{ props.item.trainOperator1 }}</td>
        <td class="text-xs-right">{{ props.item.trainOperator2 }}</td>
        <td class="text-xs-right">{{ props.item.trainType1 }}</td>
        <td class="text-xs-right">{{ props.item.trainType2 }}</td>
        <td class="text-xs-right">{{ props.item.involvedNumOfTrains }}</td>
        <td class="text-xs-right">{{ props.item.involvedNumOfCars }}</td>
        <td class="text-xs-right">{{ props.item.involvedNumOfDangerousGoodsCars }}</td>
        <td class="text-xs-right">{{ props.item.nearestTownCity }}</td>
        <td class="text-xs-right">{{ props.item.trackType }}</td>
        <td class="text-xs-right">{{ props.item.derailment }}</td>
        <td class="text-xs-right">{{ props.item.totalAllInjuries }}</td>
        <td class="text-xs-right">{{ props.item.totalAllFatal }}</td>
        <td class="text-xs-right">{{ props.item.totalAllSerious }}</td>
        <td class="text-xs-right">{{ props.item.totalAllMinor }}</td>
        <td class="text-xs-right">{{ props.item.totalFatalEmployees }}</td>
        <td class="text-xs-right">{{ props.item.totalFatalPassengers }}</td>
        <td class="text-xs-right">{{ props.item.totalFatalMotorists }}</td>
        <td class="text-xs-right">{{ props.item.totalFatalMotoristPassengers }}</td>
        <td class="text-xs-right">{{ props.item.totalFatalTrespassers }}</td>
        <td class="text-xs-right">{{ props.item.totalFatalOthers }}</td>
        <td class="text-xs-right">{{ props.item.totalSeriousEmployees }}</td>
        <td class="text-xs-right">{{ props.item.totalSeriousPassengers }}</td>
        <td class="text-xs-right">{{ props.item.totalSeriousMotorists }}</td>
        <td class="text-xs-right">{{ props.item.totalSeriousMotoristPassengers }}</td>
        <td class="text-xs-right">{{ props.item.totalSeriousTrespassers }}</td>
        <td class="text-xs-right">{{ props.item.totalSeriousOthers }}</td>
        <td class="text-xs-right">{{ props.item.totalMinorEmployees }}</td>
        <td class="text-xs-right">{{ props.item.totalMinorPassengers }}</td>
        <td class="text-xs-right">{{ props.item.totalMinorMotorists }}</td>
        <td class="text-xs-right">{{ props.item.totalMinorMotoristPassengers }}</td>
        <td class="text-xs-right">{{ props.item.totalMinorTrespassers }}</td>
        <td class="text-xs-right">{{ props.item.totalMinorOthers }}</td>
        <td class="text-xs-right">{{ props.item.primaryCauseLevel1 }}</td>
        <td class="text-xs-right">{{ props.item.primaryCauseLevel2 }}</td>
        <td class="text-xs-right">{{ props.item.primaryCauseLevel3 }}</td>
        <td class="text-xs-right">{{ props.item.occurrenceSummary }}</td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="cyan darken-1" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'TSBCard',
  props: ['info'],
  data () {
    return {
      headers_accident: [
        { text: 'Occurence #', align: 'right', value: 'occurrenceNum' },
        { text: 'Occurence Year', align: 'right', value: 'occurrenceYear' },
        { text: 'Occurence Date', align: 'right', value: 'occurrenceDate' },
        { text: 'Occurence Time', align: 'right', value: 'occurrenceTime' },
        { text: 'Occurence Type', align: 'right', value: 'occurrenceType' },
        { text: 'Occurence Acc. Inc. Type', align: 'right', value: 'occurrenceIncType' },
        { text: 'Train Operator #1', align: 'right', value: 'trainOperator1' },
        { text: 'Train Operator #2', align: 'right', value: 'trainOperator2' },
        { text: 'Train Type #1', align: 'right', value: 'trainType1' },
        { text: 'Train Type #2', align: 'right', value: 'trainType2' },
        { text: 'Involved # of Trains', align: 'right', value: 'involvedNumOfTrains' },
        { text: 'Involved # of Cars', align: 'right', value: 'involvedNumOfCars' },
        { text: 'Involved # of Dangerous Goods Cars', align: 'right', value: 'involvedNumOfDangerousGoodsCars' },
        { text: 'Nearest Town / City', align: 'right', value: 'nearestTownCity' },
        { text: 'Track Type', align: 'right', value: 'trackType' },
        { text: 'Derailment', align: 'right', value: 'derailment' },
        { text: 'Total All Injuries', align: 'right', value: 'totalAllInjuries' },
        { text: 'Total All Fatal', align: 'right', value: 'totalAllFatal' },
        { text: 'Total All Serious', align: 'right', value: 'totalAllSerious' },
        { text: 'Total All Minor', align: 'right', value: 'totalAllMinor' },
        { text: 'Total Fatal Employees', align: 'right', value: 'totalFatalEmployees' },
        { text: 'Total Fatal Passengers', align: 'right', value: 'totalFatalPassengers' },
        { text: 'Total Fatal Motorists', align: 'right', value: 'totalFatalMotorists' },
        { text: 'Total Fatal Motorist Passengers', align: 'right', value: 'totalFatalMotoristPassengers' },
        { text: 'Total Fatal Trespassers', align: 'right', value: 'totalFatalTrespassers' },
        { text: 'Total Fatal Others', align: 'right', value: 'totalFatalOthers' },
        { text: 'Total Serious Employees', align: 'right', value: 'totalSeriousEmployees' },
        { text: 'Total Serious Passengers', align: 'right', value: 'totalSeriousPassengers' },
        { text: 'Total Serious Motorists', align: 'right', value: 'totalSeriousMotorists' },
        { text: 'Total Serious Motorist Passengers', align: 'right', value: 'totalSeriousMotoristPassengers' },
        { text: 'Total Serious Trespassers', align: 'right', value: 'totalSeriousTrespassers' },
        { text: 'Total Serious Others', align: 'right', value: 'totalSeriousOthers' },
        { text: 'Total Minor Employees', align: 'right', value: 'totalMinorEmployees' },
        { text: 'Total Minor Passengers', align: 'right', value: 'totalMinorPassengers' },
        { text: 'Total Minor Motorists', align: 'right', value: 'totalMinorMotorists' },
        { text: 'Total Minor Motorist Passengers', align: 'right', value: 'totalMinorMotoristPassengers' },
        { text: 'Total Minor Trespassers', align: 'right', value: 'totalMinorTrespassers' },
        { text: 'Total Minor Others', align: 'right', value: 'totalMinorOthers' },
        { text: 'Primary Cause Level 1', align: 'right', value: 'primaryCauseLevel1' },
        { text: 'Primary Cause Level 2', align: 'right', value: 'primaryCauseLevel2' },
        { text: 'Primary Cause Level 3', align: 'right', value: 'primaryCauseLevel3' },
        { text: 'Occurence Summary', align: 'right', value: 'occurrenceSummary' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
