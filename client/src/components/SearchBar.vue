<template>
<form class="searchbar">
    <b-input-gourp>
      <b-input-group-prepend>
        <b-button class="btn btn-warning" @click="barRoulette"><b-icon icon="dice6"></b-icon> Bar Roulette</b-button>
      </b-input-group-prepend>
      <b-form-input
      id="searchBar"
      class="searchbar-input bg-dark text-white border border-warning rounded-lg"
      type="search"
      placeholder="Search by bar name"
      v-model="inputText"
      debounce="500"
      @update="emitText(inputText)"
      v-on:submit.prevent="onSubmit"
      ></b-form-input>
      <a href="#" class="searchbar-clear"></a>
    </b-input-gourp>
</form>
</template>

<script>
export default {
  name: 'searchbar',
  data() {
    return {
      inputText: ''
    }
  },
  methods: {
    emitText(text) {
      this.$emit('updateList', text)
    },
    barRoulette() {
      this.$emit('barRoulette')
    }
  }
}
</script>

<style scoped>
#searchBar {
  max-width: 80%;
  min-width: 50%;
  margin: 10px auto;
  border-radius: 0;
}
</style>
