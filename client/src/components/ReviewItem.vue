<template>
    <b-list-group-item
    :id="index"
    class="bg-secondary text-light my-1"
    >
        <b-avatar variant="primary"></b-avatar><span class="ml-2"> {{user}}</span><b-badge class="float-right" pill variant="primary">0</b-badge>
        <p class="mt-2">Average Rating: {{review.averageRating}}</p><hr class="bg-muted">
        <p>{{review.comment}}</p><hr class="bg-muted">
        <b-row class="d-none d-sm-flex">
          <b-col><span>Drink Quality: </span><b-rating
        class="m-1 mx-auto bg-secondary border-0"
        variant="warning"
        v-if="review.drinkQuality"
        readonly
        inline
        :value="review.drinkQuality"
        ></b-rating></b-col>
          <b-col><span>Drink Price: </span><b-rating
        class="m-1 mx-auto bg-secondary border-0"
        variant="warning"
        v-if="review.drinkPrice"
        readonly
        inline
        :value="review.drinkPrice"
        ></b-rating></b-col>
        </b-row>
        <b-row class="d-none d-sm-flex">
          <b-col><span>Food Quality: </span><b-rating
        class="m-1 mx-auto bg-secondary border-0"
        variant="warning"
        v-if="review.foodQuality"
        readonly
        inline
        :value="review.foodQuality"
        ></b-rating></b-col>
          <b-col><span>Atmosphere: </span><b-rating
        class="m-1 mx-auto bg-secondary border-0"
        variant="warning"
        v-if="review.atmosphere"
        readonly
        inline
        :value="review.atmosphere"
        ></b-rating></b-col>
        </b-row>
    </b-list-group-item>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'review-item',
  props: [
    'index',
    'review'
  ],
  data() {
    return {
      user: 'Fix'
    }
  },
  mounted() {
    this.getUsername(this.review.users)
  },
  methods: {
    async getUsername(id) {
      await Api.get(`/users/${id}`)
        .then(response => {
          this.user = response.data.username
        }).catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
