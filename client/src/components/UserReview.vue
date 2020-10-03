<template>
    <b-card
        class="review-card border border-secondary"
        bg-variant="dark"
        text-variant="warning"
        :header="r.createdAt.substring(0, 10)"
        footer-tag="footer"
        >
        <b-card-text>
        <b-row class="text-info">
            <b-col><u>Posted: {{r.createdAt.substring(11, 16)}}</u></b-col>
        </b-row><br>
        <p class="text-light">For: <em class="text-warning">{{getMatchingBars(r.bars)[0]}}</em></p><hr class="bg-secondary">
        <b-row>
            <b-col>
                <label :for="'a' + r._id">Drink Quality: </label>
                <b-form-rating
                v-if="r.drinkQuality > 0"
                variant="warning"
                class="border-0 bg-dark text-warning"
                :id="'a' + r._id"
                inline
                show-value
                show-value-max
                recision="1"
                readonly
                :value="r.drinkQuality"
                ></b-form-rating>
                <em v-if="!r.drinkQuality" :id="'a' + r._id">Not rated</em>
            </b-col>
            <b-col>
                <label :for="'b' + r._id">Drink Price: </label>
                <b-form-rating
                v-if="r.drinkPrice > 0"
                variant="warning"
                class="border-0 bg-dark text-warning"
                :id="'b' + r._id"
                inline
                show-value
                show-value-max
                precision="1"
                readonly
                :value="r.drinkPrice"
                ></b-form-rating>
                <em v-if="!r.drinkPrice" :id="'b' + r._id">Not rated</em>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <label :for="'c' + r._id">Food Quality: </label>
                <b-form-rating
                v-if="r.foodQuality > 0"
                variant="warning"
                class="border-0 bg-dark text-warning"
                :id="'c' + r._id"
                inline
                show-value
                show-value-max
                recision="1"
                readonly
                :value="r.foodQuality"
                ></b-form-rating>
                <em v-if="!r.foodQuality" :id="'c' + r._id">Not rated</em>
            </b-col>
            <b-col>
                <label :for="'d' + r._id">Atmosphere: </label>
                <b-form-rating
                v-if="r.atmosphere > 0"
                variant="warning"
                class="border-0 bg-dark text-warning"
                :id="'d' + r._id"
                inline
                show-value
                show-value-max
                precision="1"
                readonly
                :value="r.atmosphere"
                ></b-form-rating>
                <em v-if="!r.atmosphere" :id="'d' + r._id">Not rated</em>
            </b-col>
        </b-row>
            <p>{{r.comment}}</p><hr class="bg-secondary">
            <br>
            <b-button class="btn btn-warning float left" v-b-modal="'id' + r._id">Update Review</b-button>
            <b-modal
            :id="'id' + r._id"
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
            @cancel="deleteReviewForever(r._id)"
            @ok="updateReview(r._id)"
            title="Update Event"
            >
                <p>Drink Quality: <em v-if="r.drinkQuality">{{r.drinkQuality}}/5</em><em v-if="!r.drinkQuality">Not rated</em></p>
                <b-form-input v-model="drinkQualityValue" type="range" min="1" max="5" step="0.5"></b-form-input>
                <p class="text-info">New rating: {{drinkQualityValue}}</p>
                <p>Drink Price: <em v-if="r.drinkPrice">{{r.drinkPrice}}/5</em><em v-if="!r.drinkPrice"></em>Not rated</p>
                <b-form-input v-model="drinkPriceValue" type="range" min="1" max="5" step="0.5"></b-form-input>
                <p class="text-info">New rating: {{drinkPriceValue}}</p>
                <p>Food Quality: <em v-if="r.foodQuality">{{r.foodQuality}}/5</em><em v-if="!r.foodQuality">Not rated</em></p>
                <b-form-input v-model="foodQualityValue" type="range" min="1" max="5" step="0.5"></b-form-input>
                <p class="text-info">New rating: {{foodQualityValue}}</p>
                <p>Atmosphere: <em v-if="r.atmosphere">{{r.atmosphere}}/5</em><em v-if="!r.atmosphere">Not rated</em></p>
                <b-form-input v-model="atmosphereValue" type="range" min="1" max="5" step="0.5"></b-form-input>
                <p class="text-info">New rating: {{atmosphereValue}}</p>
                <b-form-textarea
                v-model="commentValue"
                :placeholder="r.comment"
                rows="6"
                >
                </b-form-textarea>
            </b-modal>
        </b-card-text>
        <template v-slot:footer>
            <em class="text-muted">Review ID: {{r._id}}</em>
        </template>
    </b-card>
</template>

<script>
export default {
  name: 'user-review-card'
}
</script>

<style scoped>

</style>
