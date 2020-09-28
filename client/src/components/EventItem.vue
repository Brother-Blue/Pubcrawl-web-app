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
        <p class="text-justify"><b>This is some filler. Replace with event description.</b>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Dolorum eos ducimus quod illum accusamus, ad voluptas,
          nobis culpa earum assumenda esse, voluptatem modi!
          Ipsum aperiam rerum fugiat. Repudiandae, pariatur incidunt.
        </p>
        <b-button class="btn btn-outline-warning" v-b-toggle.bar-list-dropdown>View bars for this event</b-button>
        <b-collapse id="bar-list-dropdown">
          <b-card class="bg-dark text-light border-0">
              <ul class="bar-list" v-for="bar in barName" :key="bar">
                <li>{{bar}} | 4 stars</li>
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
  props: ['bar-name', 'event-title', 'start-date', 'end-date', 'creation-date', 'created-by'],
  data() {
    return {
      modalShow: false,
      moreBars: '',
      barAvgRating: 0
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
