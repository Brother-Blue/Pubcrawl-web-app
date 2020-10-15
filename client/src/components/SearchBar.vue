<template>
<form class="searchbar">
    <b-input-group class="my-3 mx-auto rounded-lg">
      <b-form-input
      id="searchBar"
      class="searchbar-input bg-dark text-white border border-primary"
      type="search"
      placeholder="Search by bar name"
      v-model="inputText"
      debounce="500"
      @update="emitText(inputText)"
      v-on:submit.prevent="onSubmit"
      ></b-form-input>
      <b-input-group-append>
        <b-button variant="primary" @click="barRoulette"><b-icon icon="dice6"></b-icon> Bar Roulette</b-button>
      </b-input-group-append>
      <a href="#" class="searchbar-clear"></a>
    </b-input-group>
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
  max-width: 75%;
  min-width: 75%;
  margin: auto 0;
}
</style>
