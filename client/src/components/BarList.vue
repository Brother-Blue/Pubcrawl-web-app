<template>
  <div class="bar-list-container">
    <div class="bar-container" v-for="bar in bars" :key="bar">
      <bar-item
      :img="img"
      :title="bar.name"
      :barRating="bar.rating"
      :distance="distance"
      :numEvents="bar.events.length"
      ></bar-item>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import BarItem from '@/components/BarItem'

export default {
  name: 'bar-list',
  components: {
    'bar-item': BarItem
  },
  data() {
    return {
      bars: null,
      distance: 10,
      img: require('./../../../images/bar_placeholder.png')
    }
  },
  methods: {
    calcDistance(deviceCoords, destinationCoords) {
      // TODO: Calculate distance with Google Maps API
      // Once Hjalle is done paying for Google Cloud subscriptionss
    },
    getBars() {
      var e = []
      Api.get('/bars')
        .then((response) => {
          e = response.data.bars
          this.bars = e
          this.getReviews()
        })
        .catch((error) => {
          console.error(error)
        })
    },
    getReviews() {
      var a = []
      Api.get('reviews').then((response) => {
        a = response.data.reviews
        for (var i = 0; i < this.bars.length; i++) {
          var avg = 0
          var count = 0
          for (var j = 0; j < a.length; j++) {
            if (this.bars[i]._id === a[j].bars) {
              avg += a[j].averageRating
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
  },
  created: function () {
    this.getBars()
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 20px;
}

.bar-list-container {
  max-width: 50%;
  min-height: 70vh;
  overflow-y: scroll;
}

.bar-container {
  min-width: 100%;
  margin-top: 10px;
  margin-left: 0;
}

.bar-header {
  margin-top: 10px;
  max-width: 100%;
  max-height: 10%;
  text-align: left;
}

.bar-logo {
  margin: 5px;
  float: left;
  width: 20%;
}

.bar-attr {
  border: none;
  font-size: 1em;
  width: 100%;
  padding-top: 50px;
  margin-bottom: 0px;
}
</style>
