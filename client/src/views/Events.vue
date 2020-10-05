<template>
    <div class="main bg-dark">
        <pubcrawl-header id="header"></pubcrawl-header>
        <pubcrawl-calendar id="calendar"></pubcrawl-calendar>
        <b-button id="jump-button" @click="toTop" variant="warning"><b-icon icon="triangle-half"></b-icon></b-button>
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#header {
  min-width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
}

#calendar {
  margin-top: 80px;
}

#jump-button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
}
</style>
