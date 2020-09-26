<template>
    <div>
        <pubcrawl-header></pubcrawl-header>
        <pubcrawl-calendar></pubcrawl-calendar>
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
  }
}
</script>
