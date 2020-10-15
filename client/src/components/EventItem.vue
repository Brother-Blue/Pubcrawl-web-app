<template>
  <div class="event-item-container">
      <h2 class="event-header" :moreBars="totalBars(barName)">{{barName[0]}} {{moreBars}}</h2><hr class="bg-secondary">
      <h3>{{eventTitle}}</h3>
      <p>Begins: {{startDate}}  Ends: {{endDate}}</p>
      <b-button class="btn btn-block btn-outline-warning" @click="modalShow = !modalShow">View more about the event</b-button><br>
      <p class="text-muted">Created on {{creationDate}}</p>

      <b-modal
      header-bg-variant="dark"
      header-text-variant="secondary"
      body-bg-variant="dark"
      body-text-variant="light"
      footer-bg-variant="dark"
      footer-text-variant="info"
      v-model="modalShow"
      size="lg"
      centered
      :title="barName[0]"
      >
        <h5 class="text-center text-light">{{eventTitle}}</h5>
        <p class="text-justify">{{eventDescription}}</p>
        <b-button class="btn btn-outline-warning" v-b-toggle.bar-list-dropdown>View bars for this event</b-button>
        <b-collapse id="bar-list-dropdown">
          <b-card class="bg-dark text-light border-0">
              <ul class="bar-list" v-for="bar in barName" :key="bar">
                <li>{{bar}} | {{bar.averageRating}}</li>
              </ul>
          </b-card>
        </b-collapse>
        <hr>
        <p class="createdBy footer" :createdBy="createdBy">Event created by: <a class="text-warning" href="#">{{createdBy}}</a></p>
      </b-modal>
  </div>
</template>

<script>
export default {
  name: 'event-item',
  props: ['barName', 'eventTitle', 'startDate', 'endDate', 'creationDate', 'createdBy', 'eventDescription'],
  data() {
    return {
      modalShow: false,
      moreBars: '',
      barAvgRating: 0
    }
  },
  methods: {
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
#bar-list-dropdown {
  margin: 10px auto;
}

.bar-list {
  padding: 0px;
  text-align: center;
  list-style-type:
  none;
}

.btn-block {
  width: 65%;
  margin: auto;
}
</style>
