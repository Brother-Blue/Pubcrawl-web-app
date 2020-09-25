<template>
  <div>
    <pubcrawl-jumbotron></pubcrawl-jumbotron>
    <b-calendar
    class="calendar bg-dark"
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
        :eventTitle="event[0]"
        :startDate="event[1]"
        :endDate="event[2]"
        :creationDate="event[3]"
        :barName="event[4]"
        :createdBy="username"
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
      username: 'If you see this something borked',
      events: null,
      value: '',
      min: minDate,
      max: maxDate
    }
  },
  methods: {
    getEvents(day) {
      Api.get('/events')
        .then(response => {
          var e = response.data.events
          var eArr = []
          for (var i = 0; i < e.length; i++) {
            if (e[i].startDate.substring(0, 10) === day) {
              eArr.push([
                e[i].title,
                e[i].startDate.substring(0, 10) + ' @' + e[i].startDate.substring(11, 16) + ' | ',
                e[i].endDate.substring(0, 10) + ' @' + e[i].endDate.substring(11, 16),
                e[i].createdAt.substring(0, 10),
                this.getBarsByID(e[i].bars),
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
          this.username = response.data.username
        })
        .catch(error => {
          console.error(error)
        })
    },
    getBarsByID(ids) {
      var bars = []
      for (var i = 0; i < ids.length; i++) {
        Api.get(`/bars/${ids[i]}`)
          .then(response => {
            bars.push(response.data.name)
          })
          .catch(error => {
            console.error(error)
          })
      }
      return bars
    }
  }
}
</script>

<style scoped>
.event-item {
  max-width: 90%;
  margin: 5%;
  padding: 20px;
  border: 10px solid rgb(131, 100, 0);
  border-radius: 25px;
}
</style>
