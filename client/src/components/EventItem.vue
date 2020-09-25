<template>
  <div class="event-item-container">
      <h2>{{barName}}</h2>
      <h3>{{eventTitle}}</h3>
      <p>Begins: {{startDate}}  Ends: {{endDate}}</p><br>
      <b-button @click="showModal">View more about the event</b-button><br>
      <p>Created on {{creationDate}}</p>
      <b-button @click="modalShow = !modalShow">Open Modal</b-button>

      <b-modal v-model="modalShow">Hello From Modal!</b-modal>
  </div>
</template>

<script>
// import BarModal from '@/components/BarModal'

export default {
  name: 'event-item',
  props: ['bar-name', 'event-title', 'start-date', 'end-date', 'creation-date', 'created-by'],
  // components: {
  //   'bar-modal': BarModal
  // },
  data() {
    return {
      modalShow: false
    }
  },
  methods: {
    showModal() {
      this.$root.$emit('bv::show::modal', 'bar-modal')
    }
  }
}
</script>

<style scoped>
</style>
