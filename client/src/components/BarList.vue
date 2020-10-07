<template>
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
         <b-button v-b-modal="'add-review' + bar._id" class="add-review bg-dark" variant="outline-warning" >
            add review to bar
          </b-button>
      </div>
      <b-modal v-bind:id="'add-review' + bar._id"
        header-bg-variant="dark"
        header-text-variant="warning"
        body-bg-variant="dark"
        body-text-variant="light"
        footer-bg-variant="dark"
        footer-text-variant="info"
        size="lg"
        centered
        v-bind:title="'add review for:  ' + bar.name"
        @ok="updateBarInfo(bar._id)"
        >
        <b-form-input
        v-bind:id="'add-review' + bar._id"
        v-bind:placeholder="'Update name for: ' + bar.name"
        v-model="text">
        </b-form-input>
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
    deleteBar(barID) {
      var id = barID
      Api.delete(`/bars/${id}`)
        .then(response => {
          console.log('bar been yote')
        }).catch(error => {
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
.add-review:hover {
color: gold;
}
.add-review {
  min-width: 100%;
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
  max-height: 95.6vh;
  overflow: scroll;
  border-width: 0px;
}

.bar-container {
  min-width: 100%;
  margin-top: 10px;
  margin-left: 0;
  border-width: 0px;
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
