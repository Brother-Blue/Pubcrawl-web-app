<template>
  <div class="event-item-container">
      <h2>{{barName}}</h2>
      <h3>{{eventTitle}}</h3>
      <p>Begins: {{startDate}}  Ends: {{endDate}}</p><br>
      <p>Created at {{creationDate}} by: {{userID}}.</p>
      <b-button @click="openBarModal">View more about {{barName}}</b-button>
      <bar-modal ref="bar-modal" :bar-name="barName"></bar-modal>
  </div>
</template>

<script>
import BarModal from '@/components/BarModal'

export default {
  name: 'event-item',
  props: ['bar-name', 'event-title', 'start-date', 'end-date', 'creation-date', 'created-by'],
  components: {
    'bar-modal': BarModal
  },
  methods: {
    openBarModal() {
      this.$refs['bar-modal'].show()
    }
  }
}
</script>

<style scoped>
</style>
