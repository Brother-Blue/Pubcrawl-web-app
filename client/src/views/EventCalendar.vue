<template>
  <div>
    <pubcrawl-jumbotron></pubcrawl-jumbotron>
    <b-calendar
    block
    locale="en"
    hide-header="True"
    start-weekday="1"
    v-model="value"
    :min="min"
    :max="max"
    @selected="getEvents(value)"
    ></b-calendar>
    <div class="event-item" v-for="event in events" :key="event">
        <event-item
        barName="Placeholder"
        :eventTitle="event[0]"
        :startDate="event[1]"
        :endDate="event[2]"
        :creationDate="event[3]"
        :userID="event[4]"
        ></event-item>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import EventItem from '@/components/EventItem'
import { Api } from '@/Api'

export default {
  name: 'event-calendar',
  components: {
    'pubcrawl-jumbotron': Header,
    'event-item': EventItem
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
      min: minDate,
      max: maxDate
    }
  },
  methods: {
    getEvents(day) {
      var barID = []
      Api.get('/events')
        .then(response => {
          var e = response.data.events
          var eArr = []
          for (var i = 0; i < e.length; i++) {
            if (e[i].startDate.substring(0, 10) === day) {
              barID.push(e[i].bars)
              eArr.push([
                e[i].title,
                e[i].startDate.substring(0, 10) + ' @' + e[i].startDate.substring(11, 16) + ' | ',
                e[i].endDate.substring(0, 10) + ' @' + e[i].endDate.substring(11, 16),
                e[i].createdAt.substring(0, 10),
                this.getUserByID(e[i].users)
              ])
            } else {
              continue
            }
          }
          this.events = eArr
        })
        .catch(error => {
          console.error(error)
        })
    },
    getUserByID(id) {
      Api.get(`/users/${id}`)
        .then(response => {
          return response.data.username
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
