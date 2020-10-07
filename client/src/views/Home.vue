<template>
  <div class="main bg-dark">
    <header-bar></header-bar>
    <bar-list
    @addReview='addBarReview'>
    </bar-list>
    <bar-map></bar-map>
  </div>
</template>

<script>
import { Api } from '@/Api'
import Header from '@/components/Header'
import Map from '@/components/Map'
import BarList from '@/components/BarList'
export default {
  name: 'home',
  components: {
    'header-bar': Header,
    'bar-list': BarList,
    'bar-map': Map
  },
  data() {
    return {
    }
  },
  methods: {
    addBarReview(id, payload) {
      console.log('inside the post method call' + id)
      Api.post(`/bars/${id}`, payload)
        .then(response => {
        }).catch(error => {
          console.error(error)
        })
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
</style>
