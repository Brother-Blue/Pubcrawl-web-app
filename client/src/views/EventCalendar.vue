<template>
  <div>
    <pubcrawl-jumbotron></pubcrawl-jumbotron>
    <b-calendar
    block
    locale="en"
    hide-header="True"
    start-weekday="1"
    v-model="value"
    :min-date="minDate"
    :max-date="maxDate"
    ></b-calendar>
    <!-- <b-button v-on:click="getEvents()">Get events!</b-button>
    <div v-for="event in events" :key="event">
        <p>{{event}}</p>
    </div> -->
    <div class="event-list">
        <div></div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
// import { Api } from '@/Api'

export default {
  name: 'event-calendar',
  components: {
    'pubcrawl-jumbotron': Header
  },
  data() {
    const date = new Date()
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const minDate = new Date(today)
    const maxDate = new Date(today)
    minDate.setMonth(today.getMonth())
    minDate.setDate(today.getDate())
    maxDate.setMonth(today.getMonth() + 2)
    maxDate.setDate(today.getDate())
    return {
      events: null,
      value: '',
      minDate: minDate,
      maxDate: maxDate
    }
  },
  methods: {
    getEvents() {
    //   Api.get('/events')
    //     .then(response => {
    //       // this.events = response.data.events[0].title
    //       var e = response.data.events
    //       var eArr = []
    //       for (var i = 0; i < e.length; i++) {
    //         eArr.push(e[i].title, e[i].startDate, e[i].endDate, e[i].createdAt)
    //       }
    //       this.events = eArr
    //     })
    //     .catch(error => {
    //       this.events = error
    //     })
    }
  }
}
</script>

<style scoped>

</style>
