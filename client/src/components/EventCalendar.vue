<template>
  <div class="bg-dark">
    <b-calendar
    selected-variant="primary"
    today-variant="warning"
    nav-button-variant="primary"
    class="calendar bg-dark"
    block
    locale="en"
    hide-header
    start-weekday="1"
    v-model="value"
    :min="min"
    :max="max"
    @selected="getEvents(value)"
    ></b-calendar>
    <add-event-button
    v-if="loggedIn"
    :startDateVal="value"
    :uID="uID"
    @sendingPayload="saveEvent"
    ></add-event-button>
    <div class="event-item bg-dark text-light rounded border border-warning" v-for="(e, index) in events" :key="index">
        <event-item
        :eventTitle="e[0]"
        :startDate="e[1]"
        :endDate="e[2]"
        :creationDate="e[3]"
        :barName="e[4]"
        :createdBy="username"
        :eventDescription="e[6]"
        ></event-item>
    </div>
  </div>
</template>

<script>
import EventItem from '@/components/EventItem'
import AddEventButton from '@/components/AddEventButton'
import { Api } from '@/Api'

export default {
  name: 'event-calendar',
  props: [
    'loggedIn',
    'uID'
  ],
  components: {
    'event-item': EventItem,
    'add-event-button': AddEventButton
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
  computed: {
    getLoggedIn() {
      return this.loggedIn
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
                this.getUserByID(e[i].users),
                e[i].description
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
            bars.push(response.data)
          })
          .catch(error => {
            console.error(error)
          })
      }
      return bars
    },
    saveEvent(payload) {
      console.log('REMOVE THESE')
      console.log(payload)
      Api.post('/events', payload)
        .then(response => {
          console.log(response)
        }).catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
.event-item {
  max-width: 70%;
  margin: 8% 15%;
  padding-top: 15px;
  box-shadow: 5px 5px 5px 3px black;
}

.calendar {
  box-shadow: 0px 5px 5px 3px black;
}

</style>
