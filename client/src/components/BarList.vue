<template>
  <div class="bar-list-container">
    <pubcrawl-searchbar/>
    <div v-for="(bar,index) in barArray" :key="index +curKey" role="tablist">
      <b-button @click="emitBar(bar)" squared v-b-toggle="'bar' + bar._id" class="bar-container btn btn-dark" role="tab">
        <bar-item
        :id="index"
        class="d-none d-lg-flex"
        :img="bar.photo"
        :title="bar.name"
        :barRating="bar.rating"
        :address="bar.address"
        :numEvents="bar.events.length"
        ></bar-item>
        <bar-item-small
        :id="index"
        class="d-block d-lg-none"
        :title="bar.name"
        :barRating="bar.rating"
        :address="bar.address"
        :numEvents="bar.events.length"
        />
    </b-button>
    <b-collapse accordion="bar-accordian" v-bind:id="'bar' + bar._id" role="tabpanel">
      <b-button-group class="w-100">
        <b-button @click="getDirection(bar)" class="bar-button w-auto p-1 bg-primary text-white d-none d-lg-block">
            <b-icon icon="cursor-fill"></b-icon>
          </b-button>
          <b-button v-b-modal="'' + bar._id" class="view-button w-75 p-1 bg-muted text-light" >
            <em>View more about {{ bar.name }}</em> <b-icon icon="box-arrow-up-right"></b-icon>
        </b-button>
      </b-button-group>
      <b-modal
      :id="'' + bar._id"
      size="lg"
      header-bg-variant="dark"
      header-text-variant="warning"
      body-bg-variant="dark"
      body-text-variant="light"
      centered
      hide-footer
      :title="bar.name"
      >
        <b-row>
          <b-col><b-img :src="bar.photo" thumbnail class="w-100"></b-img></b-col>
          <b-col class="container">
            <p v-if="bar.rating > 0">Average Rating: <em>{{bar.rating}}</em></p>
            <p v-if="bar.rating === 0" class="text-muted">No rating.</p>
            <p>{{bar.address}}</p>
            <p v-if="bar.events.length > 0">Number of events: <b-badge v-if="bar.events.length > 0" variant="primary">{{bar.events.length}}</b-badge></p>
          </b-col>
        </b-row><hr class="bg-secondary">
        <h4 class="text-warning text-center"><em>Reviews</em></h4>
        <b-row>
          <b-col>
            <p class="text-muted text-center" v-if="bar.reviews.length === 0">No Reviews.</p>
            <b-list-group
            class="w-100"
            v-for="(review, index) in bar.reviews" :key="index"
            >
              <pubcrawl-review-item :id="index"/>
            </b-list-group>
          </b-col>
        </b-row>
        <b-button v-b-modal="'review' + bar._id" class="w-20 float-right bg-dark btn btn-outline-warning"><b-icon icon="plus-circle"></b-icon> Add a review</b-button>
      </b-modal>
      <b-modal
        :id="'review' + bar._id"
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
import BarItemSmall from '@/components/BarItemSmall'
import SearchBar from '@/components/SearchBar'
import ReviewItem from '@/components/ReviewItem'

export default {
  name: 'bar-list',
  props: [
    'barID', 'drinkPrice', 'drinkQuality', 'atmosphere', 'foodQuality', 'comment', 'barName', 'createdAt', 'createdOn', 'barArray'
  ],
  components: {
    'bar-item': BarItem,
    'bar-item-small': BarItemSmall,
    'pubcrawl-searchbar': SearchBar,
    'pubcrawl-review-item': ReviewItem
  },
  data() {
    return {
      curKey: null,
      bars: null,
      reviews: null,
      barLocation: null,
      drinkQualityValue: null,
      drinkPriceValue: null,
      atmosphereValue: null,
      foodQualityValue: null,
      commentValue: '',
      img: require('./../../../images/bar_placeholder.png')
    }
  },
  methods: {
    addReview(barID) {
      const payload = {
        users: this.$route.query.id,
        bars: barID,
        drinkQuality: this.drinkQualityValue,
        drinkPrice: this.drinkPriceValue,
        foodQuality: this.foodQualityValue,
        atmosphere: this.atmosphereValue,
        comment: this.commentValue
      }
      this.$emit('addReview', barID, payload)
      this.curKey++
    },
    emitBar(bar) {
      this.$emit('emittedBar', bar)
    },
    getDirection(bar) {
      this.$emit('directMeDaddy', bar)
    },
    scrollTo() {
      this.$el.scrollTop = 0
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
  width: 20px;
}
.bar-list-container {
  max-width: 100%;
  max-height: 92.6vh;
  margin-left: 10px;
  overflow-y: scroll;
  outline: none;
  border: none;
}

.bar-container {
  min-width: 100%;
  margin-top: 0px;
  margin-left: 0px;
  border-block: 0px;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
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
