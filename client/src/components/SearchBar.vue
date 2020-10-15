<template>
<form class="searchbar">
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
