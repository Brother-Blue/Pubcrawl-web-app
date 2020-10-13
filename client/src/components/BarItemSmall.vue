<template>
  <b-card
  class="bg-dark text-warning bar-item-container fluid"
  :title="title"
  >
  <hr class="bg-secondary">
  <b-list-group horizontal class="bg-dark">
    <b-list-group-item class="bar-attr bg-dark">
    <b-form-rating
    id="avgRating"
    variant="warning"
    class="bg-dark text-warning border-0"
    v-if="barRating > 0"
    readonly
    show-value
    show-value-max
    precision="1"
    :value="barRating"
    ></b-form-rating>
    <p class="text-secondary" v-if="barRating <= 0">No reviews</p>
    </b-list-group-item>
    <b-list-group-item class="bar-attr text-light bg-dark">{{address}}</b-list-group-item>
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
      hide-footer
      :title="title"
      @show="getBarReviews(id)"
      >
        <b-row>
          <b-col><b-img :src="img" thumbnail class="w-100"></b-img></b-col>
          <b-col class="container">
            <p v-if="barRating > 0">Average Rating: <em>{{barRating}}</em></p>
            <p v-if="barRating === 0" class="text-muted">No rating.</p>
            <p>{{address}}</p>
            <p v-if="numEvents > 0">Number of events: <b-badge v-if="numEvents > 0" variant="primary">{{numEvents}}</b-badge></p>
          </b-col>
        </b-row><hr class="bg-secondary">
        <h4 class="text-warning text-center"><em>Reviews</em></h4>
        <b-row>
          <b-col>
            <p class="text-muted text-center" v-if="barReviews.length === 0">No Reviews.</p>
            <b-list-group
            class="w-100"
            v-for="(review, index) in barReviews" :key="'rid'+index"
            >
              <pubcrawl-review-item :id="'rid'+index"/>
            </b-list-group>
          </b-col>
        </b-row>
        <b-button v-b-modal="'review' + id" class="w-20 float-right bg-dark btn btn-outline-warning"><b-icon icon="plus-circle"></b-icon> Add a review</b-button>
      </b-modal>
  </b-card>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'bar-item',
  props: [
    'id',
    'img',
    'title',
    'barRating',
    'address',
    'numEvents'
  ],
  data() {
    return {
      barReviews: []
    }
  },

  methods: {
    getBarReviews(barID) {
      Api.get(`/bars/${barID}/reviews`)
        .then(response => {
          console.log(response.data)
          this.barReviews = response.data
        }).catch(error => {
          console.error(error)
        })
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
