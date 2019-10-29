<template>
  <v-card>
    <v-card-title>
      <div>
        <h3 class="title-text">Information Shring Details</h3>
      </div>
    </v-card-title>
    <v-data-table
      :headers="headers_info"
      :items="info"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.sharedBy }}</td>
        <td class="text-xs-right">{{ props.item.lastUpdatedDate }}</td>
        <td class="text-xs-right">{{ props.item.submissionDate }}</td>
        <td class="text-xs-right">{{ props.item.sharedReason }}</td>
        <td class="text-xs-right">{{ props.item.memo }}</td>
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
  name: 'InfoSharingCard',
  props: ['info'],
  data () {
    return {
      headers_info: [
        { text: 'Shared By', align: 'right', value: 'sharedBy' },
        { text: 'Last Updated Date', align: 'right', value: 'lastUpdatedDate' },
        { text: 'Submission Date', align: 'right', value: 'submissionDate' },
        { text: 'Shared Reason', align: 'right', value: 'sharedReason' },
        { text: 'Shared Memo', align: 'right', value: 'memo' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
