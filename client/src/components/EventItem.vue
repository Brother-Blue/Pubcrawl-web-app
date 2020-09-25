<template>
  <div class="event-item-container">
      <h2 :moreBars="totalBars(barName)">{{barName[0]}} {{moreBars}}</h2>
      <h3>{{eventTitle}}</h3>
      <p>Begins: {{startDate}}  Ends: {{endDate}}</p><br>
      <b-button class="btn footer" @click="modalShow = !modalShow">View more about the event</b-button>
      <p>Created on {{creationDate}}</p>

      <b-modal
      v-model="modalShow"
      :title="barName[0]"
      >
        <p class="createdBy footer" :createdBy="createdBy">Event created by: {{createdBy}}</p>
      </b-modal>
  </div>
</template>

<script>

export default {
  name: 'event-item',
  props: ['bar-name', 'event-title', 'start-date', 'end-date', 'creation-date', 'created-by'],
  data() {
    return {
      modalShow: false,
      moreBars: ''
    }
  },
  methods: {
    showModal() {
      this.$root.$emit('bv::show::modal', 'bar-modal')
    },
    totalBars(barArr) {
      if (barArr.length === 1) {
        this.moreBars = ''
      } else {
        this.moreBars = ` and ${barArr.length - 1} more`
      }
    }
  }
}
</script>

<style scoped>

</style>
