<template>
  <div>
    <pubcrawl-jumbotron></pubcrawl-jumbotron>
    <p>Hi :)</p>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'event-calendar',
  components: {
    'pubcrawl-jumbotron': Header
  },
  data() {
    return {
      // Soemthing
    }
  }
}
</script>

<style scoped>

</style>
