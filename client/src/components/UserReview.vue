<template>
    <b-card
        class="review-card border border-secondary"
        bg-variant="dark"
        text-variant="warning"
        :header="createdOn"
        footer-tag="footer"
        >
        <b-card-text>
        <b-row class="text-info">
            <b-col><u :createdAt="createdAt">Posted: {{createdAt}}</u></b-col>
        </b-row><br>
        <p class="text-light">For: <em class="text-warning" :name="getBarName(reviewID)">{{name}}</em></p><hr class="bg-secondary">
        <b-row>
            <b-col>
                <label :for="'a' + reviewID">Drink Quality: </label>
                <b-form-rating
                v-if="drinkQuality > 0"
                variant="warning"
                class="border-0 bg-dark text-warning"
                :id="'a' + reviewID"
                inline
                show-value
                show-value-max
                recision="1"
                readonly
                :value="drinkQuality"
                ></b-form-rating>
                <em v-if="!drinkQuality" :id="'a' + reviewID">Not rated</em>
            </b-col>
            <b-col>
                <label :for="'b' + reviewID">Drink Price: </label>
                <b-form-rating
                v-if="drinkPrice > 0"
                variant="warning"
                class="border-0 bg-dark text-warning"
                :id="'b' + reviewID"
                inline
                show-value
                show-value-max
                precision="1"
                readonly
                :value="drinkPrice"
                ></b-form-rating>
                <em v-if="!drinkPrice" :id="'b' + reviewID">Not rated</em>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <label :for="'c' + reviewID">Food Quality: </label>
                <b-form-rating
                v-if="foodQuality > 0"
                variant="warning"
                class="border-0 bg-dark text-warning"
                :id="'c' + reviewID"
                inline
                show-value
                show-value-max
                recision="1"
                readonly
                :value="foodQuality"
                ></b-form-rating>
                <em v-if="!foodQuality" :id="'c' + reviewID">Not rated</em>
            </b-col>
            <b-col>
                <label :for="'d' + reviewID">Atmosphere: </label>
                <b-form-rating
                v-if="atmosphere > 0"
                variant="warning"
                class="border-0 bg-dark text-warning"
                :id="'d' + reviewID"
                inline
                show-value
                show-value-max
                precision="1"
                readonly
                :value="atmosphere"
                ></b-form-rating>
                <em v-if="!atmosphere" :id="'d' + reviewID">Not rated</em>
            </b-col>
        </b-row>
            <p>{{comment}}</p><hr class="bg-secondary">
            <br>
            <b-button class="btn btn-warning float left" v-b-modal="'id' + reviewID">Update Review</b-button>
            <b-modal
            :id="'id' + reviewID"
            header-bg-variant="dark"
            header-text-variant="warning"
            body-bg-variant="dark"
            body-text-variant="white"
            footer-bg-variant="dark"
            footer-text-variant="muted"
            centered
            scrollable
            ok-variant="warning"
            ok-title="Save & Exit"
            cancel-variant="danger"
            cancel-title="Delete this event"
            @cancel="deleteReviewForever(review_id)"
            @ok="updateReview(review_id)"
            title="Update Event"
            >
            <!-- TODO: Add in emit functionality to @ok and @cancel -->
                <p>Drink Quality: <em v-if="drinkQuality">{{drinkQuality}}/5</em><em v-if="!drinkQuality">Not rated</em></p>
                <b-form-input :v-model="drinkQuality" type="range" min="1" max="5" step="0.5" description="Do not move the slider if you do not want to change the review."></b-form-input>
                <p class="text-info">New rating: {{drinkQuality}}</p>
                <p>Drink Price: <em v-if="drinkPrice">{{drinkPrice}}/5</em><em v-if="!drinkPrice">Not rated</em></p>
                <b-form-input :v-model="drinkPrice" type="range" min="1" max="5" step="0.5" description="Do not move the slider if you do not want to change the review."></b-form-input>
                <p class="text-info">New rating: {{drinkPrice}}</p>
                <p>Food Quality: <em v-if="foodQuality">{{foodQuality}}/5</em><em v-if="!foodQuality">Not rated</em></p>
                <b-form-input :v-model="foodQuality" type="range" min="1" max="5" step="0.5" description="Do not move the slider if you do not want to change the review."></b-form-input>
                <p class="text-info">New rating: {{foodQuality}}</p>
                <p>Atmosphere: <em v-if="atmosphere">{{atmosphere}}/5</em><em v-if="!atmosphere">Not rated</em></p>
                <b-form-input :v-model="atmosphere" type="range" min="1" max="5" step="0.5" description="Do not move the slider if you do not want to change the review."></b-form-input>
                <p class="text-info">New rating: {{atmosphere}}</p>
                <b-form-textarea
                :v-model="comment"
                :placeholder="comment"
                :state="comment.length <= 140"
                rows="3"
                >
                </b-form-textarea>
            </b-modal>
        </b-card-text>
        <template v-slot:footer>
            <em class="text-muted" :reviewID="reviewID">Review ID: {{reviewID}}</em>
        </template>
    </b-card>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'user-review-card',
  props: [
    'reviewID', 'comment', 'drinkQuality', 'drinkPrice', 'foodQuality', 'atmosphere', 'barName', 'createdAt', 'createdOn'
  ],
  data() {
    return {
      name: ''
    }
  },
  methods: {
    getBarName(id) {
      Api.get(`/reviews/${id}/bars`)
        .then(response => {
          this.name = response.data.name
        }).catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
.review-card {
  margin-bottom: 10px;
  box-shadow: 2px 2px 5px 2px black;
}
</style>
