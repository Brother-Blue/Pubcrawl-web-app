a<template>
  <div class="bar-list-container" >
    <pubcrawl-searchbar/>
    <div v-for="bar in bars" :key="bar" >
      <b-button v-b-toggle="'bar' + bar._id" class="bar-container">
        <bar-item
        :img="img"
        :title="bar.name"
        :barRating="bar.rating"
        :distance="distance"
        :numEvents="bar.events.length"
        ></bar-item>
    </b-button>
    <b-collapse v-bind:id="'bar' + bar._id">
      <div>
dde          <b-button v-b-modal="'bar' + bar._id" class="update-bar bg-dark" variant="outline-warning" >
            Update bar info
          </b-button>
          <b-button v-b-modal="'bar' + bar._id" class="delete-bar bg-dark" variant="outline-warning">
            Yeet the bar
          </b-button>
      </div>
      <b-modal v-bind:id="'bar' + bar._id"
        header-bg-variant="dark"
        header-text-variant="warning"
        body-bg-variant="dark"
        body-text-variant="light"
        footer-bg-variant="dark"
        footer-text-variant="info"
        v-model="modalShow"
        size="lg"
        centered
        title="confirm bar name for deletion"
        >
        are you sure you want to delete: {{bar.name}} ?
        </b-modal>
    </b-collapse>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import BarItem from '@/components/BarItem'
import SearchBar from '@/components/SearchBar'

export default {
  name: 'bar-list',
  components: {
    'bar-item': BarItem,
    'pubcrawl-searchbar': SearchBar
  },
  data() {
    return {
      bars: null,
      reviews: null,
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
.delete-bar:hover {
color: gold;
}
.delete-bar {
  min-width: 50%;
  float: left;
}
.update-bar:hover {
  color: gold;
}

.update-bar {
  min-width: 50%;
  float: right;
}

.bar-list-container {
  max-width: 50%;
  min-height: 70vh;
  max-height: 80vh;
  overflow: scroll;
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
