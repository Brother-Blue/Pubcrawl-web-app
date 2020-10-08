<template>
<form class="searchbar">
    <b-form-input id="searchBar" class="searchbar-input bg-dark text-white border border-warning rounded-lg" type="search" placeholder="Search by bar name"></b-form-input>
    <a href="#" class="searchbar-clear"></a>
</form>
</template>

<!--  TODO: add sortByBarName method. -->

<script>
export default {
  name: 'searchbar',
  methods: {
    // Something
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
