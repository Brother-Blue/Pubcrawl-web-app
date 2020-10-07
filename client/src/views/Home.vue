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
      bars: null,
      reviews: null
    }
  },
  methods: {
    addBarReview(id, payload) {
      console.log('inside the post method call' + id)
      Api.post(`/bars/${id}/reviews`, payload)
        .then(response => {
        }).catch(error => {
          console.error(error)
        })
    },
    getBars() {
      var e = []
      Api.get('/bars')
        .then((response) => {
          e = response.data.bars
          this.bars = e
        })
        .catch((error) => {
          console.error(error)
        })
    },
    getAvgRating() {
      var a = []
      Api.get('reviews').then((response) => {
        a = response.data.reviews
        this.reviews = a
        for (var i = 0; i < this.bars.length; i++) {
          var avg = 0
          var count = 0
          for (var j = 0; j < this.reviews.length; j++) {
            if (this.bars[i]._id === this.reviews[j].bars) {
              avg += this.reviews[j].averageRating
              count++
            } else {
              this.bars[i].rating = 0
            }
          }
          if (count > 0) {
            this.bars[i].rating = avg / count
          }
        }
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
