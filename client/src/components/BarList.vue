<template>
  <div class="bar-list-container">
    <div class="bar-container" v-for="bar in bars" :key="bar">
      <div class="bar-header">
        <b-img
          class="bar-logo"
          v-bind:src="defaultImg"
          fluid
          alt="Responsive image"
        ></b-img>
        <h3>
          {{ bar.name }}
        </h3>
      </div>
      <hr />
      <div class="bar-body">
        <b-list-group horizontal>
          <b-list-group-item class="bar-attr">
            <b-form-rating
              id= "avg-rating"
              icon-empty="blank"
              icon-full="cup"
              inline
              readonly
              :value="bar.rating"
              precision="1"
              show-value
              >
            </b-form-rating>
            <p> {{message}} </p>
          </b-list-group-item>
          <b-list-group-item class="bar-attr"
            >Distance: <strong>{{ distance }}km</strong></b-list-group-item
          >
          <b-list-group-item class="bar-attr"
            >Events: <strong>{{ bar.events.length }}</strong></b-list-group-item
          >
        </b-list-group>
      </div>
      <hr />
      <div class="bar-view-more"></div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'bar-list',
  data() {
    return {
      bars: null,
      message: '',
      distance: 10,
      defaultImg: 'https://images-platform.99static.com//sH-Ldum17LQhqqvZfKHJGxb21Jc=/0x0:1500x1500/fit-in/500x500/99designs-contests-attachments/86/86697/attachment_86697480'
    }
  },
  methods: {
    calcDistance(deviceCoords, destinationCoords) {
      // TODO: Calculate distance with Google Maps API
      // Once Hjalle is done paying for Google Cloud subscriptionss
    },
    getBars() {
      var a = []
      var e = []
      Api.get('/bars')
        .then(response => {
          e = response.data.bars
          this.bars = e
        })
        .catch(error => {
          e = error
        })
      Api.get('/reviews')
        .then(response => {
          a = response.data.reviews
          for (var i = 0; i < this.bars.length; i++) {
            for (var j = 0; j < a.length; j++) {
              if (this.bars[i]._id === a[j].bars) {
                this.bars[i].rating = a[j].averageRating
              } else {
                this.bars[i].rating = 'No reviews'
              }
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
