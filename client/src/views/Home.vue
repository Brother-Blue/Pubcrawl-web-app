<template>
  <div class="main bg-dark">
    <header-bar></header-bar>
    <bar-list
    :barArray="bars"
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
      Api.get('/bars')
        .then((response) => {
          this.bars = response.data.bars
          for (var i = 0; i < this.bars.length; i++) {
            var review = []
            var avg = 0
            var count = 0
            Api.get(`/bars/${this.bars[i]._id}/reviews`)
              .then(response => {
                review = response.data.reviews
                if (review.averageRating) {
                  for (var i = 0; i < review.length; i++) {
                    avg += review.averageRating
                    count++
                  }
                }
              }).catch(error => {
                console.error(error)
              })
            if (count > 0) {
              this.bars[i].rating = avg / count
            } else {
              this.bars[i].rating = 0
            }
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  created: function () {
    this.getBars()
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
