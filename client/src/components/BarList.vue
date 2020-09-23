<template>
  <div class="bar-list-container">
    <div class="bar-container">
      <div class="bar-header">
        <b-img
          class="bar-logo"
          v-bind:src="defaultImg"
          fluid
          alt="Responsive image"
        ></b-img>
        <h3>
          {{ barName }}
        </h3>
      </div>
      <hr />
      <div class="bar-body">
        <b-list-group horizontal>
          <b-list-group-item class="bar-attr">
            <b-form-rating
              id="avg-rating"
              icon-empty="blank"
              icon-full="cup"
              inline
              readonly
              v-bind:value="avgRating"
              precision="1"
              show-value
            >
            </b-form-rating>
          </b-list-group-item>
          <b-list-group-item class="bar-attr"
            >Distance: <strong>{{ distance }}km</strong></b-list-group-item
          >
          <b-list-group-item class="bar-attr"
            >Events: <strong>{{ numEvents }}</strong></b-list-group-item
          >
        </b-list-group>
      </div>
      <hr />
      <div class="bar-view-more"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bar-list',
  data() {
    return {
      barName: 'Placeholder Bar',
      avgRating: 4.4,
      distance: 10,
      numEvents: 2,
      defaultImg: 'https://images-platform.99static.com//sH-Ldum17LQhqqvZfKHJGxb21Jc=/0x0:1500x1500/fit-in/500x500/99designs-contests-attachments/86/86697/attachment_86697480'
    }
  },
  methods: {
    calcDistance(deviceCoords, destinationCoords) {
      // TODO: Calculate distance with Google Maps API
      // Once Hjalle is done paying for Google Cloud subscriptions
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 20px;
}

.bar-list-container {
  max-width: 50%;
  min-height: 70vh;
  overflow-y: scroll;
}

.bar-container {
  min-width: 100%;
  margin-top: 10px;
  margin-left: 0;
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
  width: 20%;
}

.bar-attr {
  border: none;
  font-size: 1em;
  width: 100%;
  padding-top: 50px;
  margin-bottom: 0px;
}
</style>
