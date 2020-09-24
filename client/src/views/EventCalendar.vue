<template>
  <div>
    <pubcrawl-jumbotron></pubcrawl-jumbotron>
    <b-button v-on:click="getEvents()">Get events!</b-button>
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
    return {
      events: null
    }
  },
  methods: {
    getEvents() {
      Api.get('/events')
        .then(response => {
          // this.events = response.data.events[0].title
          var e = response.data.events
          var eArr = []
          for (var i = 0; i < e.length; i++) {
            eArr.push(e[i].title, e[i].startDate, e[i].endDate, e[i].createdAt)
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
