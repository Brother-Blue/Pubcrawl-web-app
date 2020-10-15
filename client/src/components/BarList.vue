<template>
  <div class="bar-list-container">
    <div v-for="(bar,index) in barArray" :key="index" role="tablist">
      <b-button @click="emitBar(bar)" squared v-b-toggle="'bar' + bar._id" class="bar-container btn btn-dark" role="tab">
        <bar-item
        :id="bar._id"
        class="d-none d-lg-flex"
        :img="bar.photo"
        :title="bar.name"
        :barRating="bar.averageRating"
        :address="bar.address"
        :numEvents="bar.events.length"
        @addReview="addBarReview"
        :loggedIn="loggedIn"
        :uID="uID"
        ></bar-item>
        <bar-item-small
        :id="index"
        class="d-block d-lg-none"
        :title="bar.name"
        :barRating="bar.averageRating"
        :address="bar.address"
        :numEvents="bar.events.length"
        @addReview="addBarReview"
        :loggedIn="loggedIn"
        :uID="uID"
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
    </b-collapse>
    </div>
  </div>
</template>

<script>
import BarItem from '@/components/BarItem'
import BarItemSmall from '@/components/BarItemSmall'
export default {
  name: 'bar-list',
  props: [
    'barID', 'drinkPrice', 'drinkQuality', 'atmosphere', 'foodQuality', 'comment', 'barName', 'createdAt', 'createdOn', 'barArray', 'loggedIn', 'uID'
  ],
  components: {
    'bar-item': BarItem,
    'bar-item-small': BarItemSmall
  },
  data() {
    return {
      bars: this.barArray,
      barReviews: [],
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
    addBarReview(barID, payload) {
      this.$emit('addBarReview', barID, payload)
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
