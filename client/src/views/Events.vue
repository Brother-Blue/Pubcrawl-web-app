<template>
    <div class="main bg-dark">
        <pubcrawl-header id="header"></pubcrawl-header>
        <pubcrawl-calendar id="calendar"></pubcrawl-calendar>
        <b-button id="jump-button" @click="toTop" variant="outline-warning">Back to top</b-button>
    </div>
</template>

<script>
import Header from '@/components/Header'
import EventCalendar from '@/components/EventCalendar'

export default {
  name: 'events',
  components: {
    'pubcrawl-header': Header,
    'pubcrawl-calendar': EventCalendar
  },
  methods: {
    toTop() {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style scoped>
.main {
  min-height: 75vh;
}

#header {
  min-width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
}

#calendar {
  margin-top: 258px;
}

#jump-button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
}
</style>
