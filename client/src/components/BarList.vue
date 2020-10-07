<template>
  <div class="bar-list-container" >
    <pubcrawl-searchbar/>
    <div v-for="(bar,index) in bars" :key="index +curKey" >
      <b-button v-b-toggle="'bar' + bar._id" class="bar-container">
        <bar-item
        id="index"
        :img="bar.photo"
        :title="bar.name"
        :barRating="bar.rating"
        :distance="distance"
        :numEvents="bar.events.length"
        ></bar-item>
    </b-button>
    <b-collapse v-bind:id="'bar' + bar._id">
      <div>
         <b-button v-b-modal="'add-review' + bar._id" class="add-review " variant="outline-warning" >
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
        @ok="addReview(bar._id)"
        :ok-disabled="commentValue.length >= 140"
        >
        <b-input-group class="drink-quality" prepend="Drink Quality">
        <b-form-rating v-model="drinkQualityValue" show-clear></b-form-rating>
        </b-input-group
        >
         <b-input-group class="drink-price" prepend="Drink Price">
        <b-form-rating v-model="drinkPriceValue" show-clear></b-form-rating>
         </b-input-group
         >
          <b-input-group class="atmosphere" prepend="Atmosphere">
        <b-form-rating v-model="atmosphereValue" show-clear></b-form-rating>
          </b-input-group
          >
         <b-input-group class="food-quality" prepend="Food Quality">
        <b-form-rating v-model="foodQualityValue" show-clear></b-form-rating>
         </b-input-group
         >
        <b-form-group class="comment"
                description="Max comment length is 140 characters"
                >
                  <b-form-textarea
                  v-model="commentValue"
                  :placeholder="comment"
                  :state="commentValue.length <= 140"
                  rows="3"
                  >
                  </b-form-textarea>
                </b-form-group>
        >
      </b-modal>
    </b-collapse>
    </div>
  </div>
</template>

<script>
import BarItem from '@/components/BarItem'
import SearchBar from '@/components/SearchBar'

export default {
  name: 'bar-list',
  props: [
    'barID', 'drinkPrice', 'drinkQuality', 'atmosphere', 'foodQuality', 'comment', 'barName', 'createdAt', 'createdOn'
  ],
  components: {
    'bar-item': BarItem,
    'pubcrawl-searchbar': SearchBar
  },
  data() {
    return {
      curKey: null,
      bars: null,
      reviews: null,
      distance: 10,
      drinkQualityValue: null,
      drinkPriceValue: null,
      atmosphereValue: null,
      foodQualityValue: null,
      commentValue: '',
      userID: null,
      img: require('./../../../images/bar_placeholder.png')
    }
  },
  methods: {
    calcDistance(deviceCoords, destinationCoords) {
      // TODO: Calculate distance with Google Maps API
      // Once Hjalle is done paying for Google Cloud subscriptionss
    },
    addReview(barID) {
      const payload = {
        users: this.userID,
        bars: barID,
        drinkQuality: this.drinkQualityValue,
        drinkPrice: this.drinkPriceValue,
        foodQuality: this.foodQualityValue,
        atmosphere: this.atmosphereValue,
        comment: this.commentValue
      }
      console.log(payload + 'what ze fuk happnd  ' + barID)
      this.$emit('addReview', barID, payload)
      this.curKey++
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
  max-width: 20px;
}

.bar-attr {
  border: none;
  font-size: 1em;
  width: 100%;
  padding-top: 50px;
  margin-bottom: 0px;
}
.drink-price {
  width: 100%;
  padding-top: 10px;
}
.atmosphere {
  padding-top: 10px;
}
.food-quality {
  padding-top: 10px;
}
.input-group>.input-group-prepend {
    flex: 0 0 20%;
}
.input-group .input-group-text {
    width: 100%;
}
.comment {
  padding-top: 10px;
}
</style>
