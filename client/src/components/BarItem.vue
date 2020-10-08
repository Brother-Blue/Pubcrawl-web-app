<template>
  <b-card
  class="bg-dark text-warning bar-item-container"
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
    <b-list-group-item class="bar-attr text-secondary bg-dark" v-if="numEvents <= 0">Events: <b-badge variant="secondary">{{numEvents}}</b-badge></b-list-group-item>
    <b-list-group-item class="bar-attr text-light bg-dark" v-if="numEvents > 0">Events: <b-badge variant="primary">{{numEvents}}</b-badge></b-list-group-item>
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
    'address',
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
