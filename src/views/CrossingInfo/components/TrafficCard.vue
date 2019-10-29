<template>
  <div>
    <v-card raised>
      <v-card-title>
        <div>
          <h3 class="title-text">Train Traffic</h3>
        </div>
      </v-card-title>
      <v-data-table
        :headers="headers_train"
        :items="train_traffic"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.effective }}</td>
          <td class="text-xs-right">{{ props.item.nTrains }}</td>
          <td class="text-xs-right">{{ props.item.nPTrains }}</td>
          <td class="text-xs-right">{{ props.item.nFTrains }}</td>
          <td class="text-xs-right">{{ props.item.maxSpeedL }}</td>
          <td class="text-xs-right">{{ props.item.maxSpeedR }}</td>
          <td class="text-xs-right">{{ props.item.PmaxSpeedL }}</td>
          <td class="text-xs-right">{{ props.item.PmaxSpeedR }}</td>
          <td class="text-xs-right">{{ props.item.FmaxSpeedL }}</td>
          <td class="text-xs-right">{{ props.item.FmaxSpeedR }}</td>
          <td class="text-xs-right">{{ props.item.RSpeedL }}</td>
          <td class="text-xs-right">{{ props.item.RSpeedR }}</td>
          <td class="text-xs-right">{{ props.item.memo }}</td>
        </template>
        <template slot="no-data">
          <v-alert :value="true" color="cyan darken-1" icon="warning">
            Sorry, nothing to display here :(
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
    <v-card class="mt-5" raised>
      <v-card-title>
        <div>
          <h3 class="title-text">Vehicle Traffic</h3>
        </div>
      </v-card-title>
      <v-data-table
        :headers="headers_vehicle"
        :items="vehicle_traffic"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.effective }}</td>
          <td class="text-xs-right">{{ props.item.nVehicles }}</td>
          <td class="text-xs-right">{{ props.item.nPedestrains }}</td>
          <td class="text-xs-right">{{ props.item.RPSpeedL }}</td>
          <td class="text-xs-right">{{ props.item.RPSpeedR }}</td>
          <td class="text-xs-right">{{ props.item.RCSpeedL }}</td>
          <td class="text-xs-right">{{ props.item.RCSpeedR }}</td>
          <td class="text-xs-right">{{ props.item.DVehicle }}</td>
          <td class="text-xs-right">{{ props.item.ISource }}</td>
          <td class="text-xs-right">{{ props.item.memo }}</td>
          <td class="text-xs-right">{{ props.item.CPPerdestrain }}</td>
          <td class="text-xs-right">{{ props.item.CPVehicle }}</td>
        </template>
        <template slot="no-data">
          <v-alert :value="true" color="cyan darken-1" icon="warning">
            Sorry, nothing to display here :(
          </v-alert>
        </template>
      </v-data-table>            
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'TrafficCard',
  props: ['info'],
  data () {
    return {
      headers_train: [
        { text: 'Effective As Of', align: 'right', value: 'effective' },
        { text: '# of Trains Per Day', align: 'center', value: 'nTrains' },
        { text: '# of Pass Trains Per Day', align: 'center', value: 'nPTrains' },
        { text: '# of Freight Trains Per Day', align: 'center', value: 'nFTrains' },
        { text: 'Overall Maximum Speed (MPH) for Rail Approach from Left', value: 'maxSpeedL', align: 'center' },
        { text: 'Overall Maximum Speed (MPH) for Rail Approach from Right', value: 'maxSpeedR', align: 'center' },
        { text: 'Passengers Maximum Speed (MPH) for Rail Approach from Left', value: 'PmaxSpeedL', align: 'center' },
        { text: 'Passengers Maximum Speed (MPH) for Rail Approach from Right', value: 'PmaxSpeedR', align: 'center' },
        { text: 'Freight Maximum Speed (MPH) for Rail Approach from Left', value: 'FmaxSpeedL', align: 'center' },
        { text: 'Freight Maximum Speed (MPH) for Rail Approach from Right', value: 'FmaxSpeedR', align: 'center' },
        { text: 'Rail Design Speed (MPH) for Rail Approach from Left', value: 'RSpeedL', align: 'center' },
        { text: 'Rail Design Speed (MPH) for Rail Approach from Right', value: 'RSpeedR', align: 'center' },
        { text: 'Memo                   ', value: 'memo', align: 'center', sortable: false }
      ],
      train_traffic: [
        {
          value: false,
          effective: '2003/01/01',
          nTrains: 16800.00,
          nPTrains: 1200.00,
          nFTrains: 800.00,
          maxSpeedL: 120.00,
          maxSpeedR: 120.00,
          PmaxSpeedL: 90.00,
          PmaxSpeedR: 90.00,
          FmaxSpeedL: 80.00,
          FmaxSpeedR: 80.00,
          RSpeedL: 85.00,
          RSpeedR: 85.00,
          memo: 'good good'
        }
      ],
      headers_vehicle: [
        { text: 'Effective As Of', align: 'right', value: 'effective' },
        { text: '# of Vehicles Per Day', align: 'center', value: 'nVehicles' },
        { text: '# of Pedestrains Per Day', align: 'center', value: 'nPedestrains' },
        { text: 'Road Posted/Unposted Speed (KPH) for Road Approach From Left', align: 'RPSpeedL', value: 'center' },
        { text: 'Road Posted/Unposted Speed (KPH) for Road Approach From Right', value: 'RPSpeedR', align: 'center' },
        { text: 'Road Crossing Design Speed (KPH) for Road Approach From Left', value: 'RCSpeedL', align: 'center' },
        { text: 'Road Crossing Design Speed (KPH) for Road Approach From Right', value: 'RCSpeedR', align: 'center' },
        { text: 'Design Vehicle', value: 'DVehicle', align: 'center' },
        { text: 'Information Source', value: 'ISource', align: 'center' },
        { text: 'Memo', value: 'memo', align: 'center', sortable: false },
        { text: 'Cross Product Daily Train by Perdestrain', value: 'CPPerdestrain', align: 'center' },
        { text: 'Cross Product Daily Train by Vehicle', value: 'CPVehicle', align: 'center' }
      ],
      vehicle_traffic: [
        {
          value: false,
          effective: '2003/02/01',
          nVehicles: 16800.00,
          nPedestrains: 1200.00,
          RPSpeedL: 800.00,
          RPSpeedR: 120.00,
          RCSpeedL: 120.00,
          RCSpeedR: 90.00,
          DVehicle: 90.00,
          ISource: 80.00,
          memo: 'good good',
          CPPerdestrain: 85.00,
          CPVehicle: 85.00
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
