<template>
  <b-card
  class="bg-dark text-warning bar-item-container"
  :img-src="img"
  img-left
  img-alt="Ape together strong but still cant find image"
  :title="title"
  >
  <hr class="bg-secondary">
  <b-list-group horizontal class="bg-dark">
    <b-list-group-item class="bar-attr bg-dark">
    <label for="avgRating">Average rating:</label>
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
    <b-list-group-item class="bar-attr bg-dark">Distance: <strong>{{distance}}</strong></b-list-group-item>
    <b-list-group-item class="bar-attr bg-dark">Events: <b-badge variant="warning">{{numEvents}}</b-badge></b-list-group-item>
  </b-list-group>
  </b-card>
</template>

<script>
export default {
  name: 'bar-item',
  props: [
    'img',
    'title',
    'barRating',
    'distance',
    'numEvents'
  ],
  data() {
    return {

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
  box-shadow: 3px 3px 3px 3px black;
}
</style>
