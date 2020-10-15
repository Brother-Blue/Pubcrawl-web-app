<template>
  <b-card
  :key="curKey"
  class="bg-dark text-warning bar-item-container"
  :id="id"
  :img-src="img"
  :img-height="200"
  :img-width="200"
  img-left
  img-alt="Ape together strong but still cant find image"
  :title="title"
  >
  <hr class="bg-secondary">
  <b-list-group horizontal class="bg-dark">
    <b-list-group-item class="bar-attr bg-dark">
    <b-form-rating
    id="avgRating"
    variant="warning"
    class="bg-dark border-0"
    v-if="barRating > 0"
    readonly
    precision="2"
    :value="barRating"
    ></b-form-rating>
    <p class="text-secondary" v-if="barRating <= 0">No reviews</p>
    </b-list-group-item>
    <!-- <b-list-group-item class="bar-attr text-light bg-dark">{{address}}</b-list-group-item> -->
    <b-list-group-item class="bar-attr text-secondary bg-dark" v-if="numEvents <= 0">No events</b-list-group-item>
    <b-list-group-item class="bar-attr text-light bg-dark" v-if="numEvents > 0">Events: <b-badge variant="primary">{{numEvents}}</b-badge></b-list-group-item>
  </b-list-group>
  <b-modal
      :id="'' + id"
      size="lg"
      header-bg-variant="dark"
      header-text-variant="warning"
      body-bg-variant="dark"
      body-text-variant="light"
      centered
      scrollable
      hide-footer
      :title="title"
      @show="getBarReviews(id)"
      ><b-row>
          <b-col><b-img :src="img" thumbnail class="w-100"></b-img></b-col>
          <b-col class="container">
            <p v-if="barRating > 0">Average Rating: <em>{{barRating}}</em></p>
            <p v-if="barRating === 0" class="text-muted">No rating.</p>
            <p>{{address}}</p>
            <p v-if="numEvents > 0">Number of events: <b-badge v-if="numEvents > 0" variant="primary">{{numEvents}}</b-badge></p>
          </b-col>
        </b-row><hr class="bg-secondary mb-0">
        <b-row>
          <b-col>
            <h4 class="text-warning text-center p-2 my-0"><em>Reviews</em></h4>
            <b-button v-if="loggedIn" v-b-modal="'review' + id" class="w-20 sticky-top float-right bg-dark btn btn-outline-warning"><b-icon icon="plus-circle"></b-icon> Add a review</b-button>
            <p class="text-muted text-center" v-if="barReviews.length === 0">No Reviews.</p>
            <b-list-group
            class="w-100"
            v-for="(review, index) in barReviews" :key="'rid'+index"
            >
              <pubcrawl-review-item :id="'rid'+index" :review="review" class="my-3"/>
            </b-list-group>
          </b-col>
        </b-row>
      </b-modal>
      <b-modal
        :id="'review' + id"
        header-bg-variant="dark"
        header-text-variant="warning"
        body-bg-variant="dark"
        body-text-variant="light"
        footer-bg-variant="dark"
        footer-text-variant="info"
        size="lg"
        centered
        :title="'add review for:  ' + title"
        @ok="addReview(id)"
        :ok-disabled="commentValue.length >= 140"
        class="text-justify"
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
                  placeholder="Your comment here :)"
                  :state="commentValue.length <= 140"
                  rows="3"
                  >
                  </b-form-textarea>
                </b-form-group>
      </b-modal>
  </b-card>
</template>

<script>
import { Api } from '@/Api'
import ReviewItem from '@/components/ReviewItem'

export default {
  name: 'bar-item',
  props: [
    'id',
    'img',
    'title',
    'barRating',
    'address',
    'numEvents',
    'loggedIn',
    'uID'
  ],
  components: {
    'pubcrawl-review-item': ReviewItem
  },
  data() {
    return {
      barReviews: [],
      drinkQualityValue: '',
      drinkPriceValue: '',
      foodQualityValue: '',
      atmosphereValue: '',
      commentValue: '',
      barID: this.id
    }
  },
  methods: {
    getBarReviews(barID) {
      Api.get(`/bars/${barID}/reviews`)
        .then(response => {
          this.barReviews = response.data
        }).catch(error => {
          console.error(error)
        })
    },
    addReview(barID) {
      const payload = {
        users: this.$props.uID,
        bars: this.barID,
        drinkQuality: this.drinkQualityValue,
        drinkPrice: this.drinkPriceValue,
        foodQuality: this.foodQualityValue,
        atmosphere: this.atmosphereValue,
        comment: this.commentValue
      }
      this.$emit('addReview', barID, payload)
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
.bar-attr {
  width: 100%;
  margin-bottom: 0px;
  border: none;
}

.bar-item-container {
  max-width: 99%;
  margin: 5px auto;
  padding: 0;
  border: none;
  box-shadow: 0px 0px 3px 2px #f0ad4e
}

.bar-item-container:hover {
color: white;
background-color: #f0ad4e
}
</style>
