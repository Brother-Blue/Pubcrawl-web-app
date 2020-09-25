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
    <div v-for="event in events" :key="event">
        <p>{{event}}</p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import { Api } from '@/Api'

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
              eArr.push(e[i].title, e[i].startDate, e[i].endDate, e[i].createdAt)
            } else {
              continue
            }
          }
          this.events = eArr
        })
        .catch(error => {
          this.events = error
        })
    }
  }
}
</script>

<style scoped>

</style>
