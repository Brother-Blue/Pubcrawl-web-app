<template>

<form class="searchbar">
    <b-form-input class="searchbar-input" type="search" placeholder="Enter bar name"></b-form-input>
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
.searchbar {
  max-width: 66%;
  min-width: 50%;
  margin-top: 20px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
}
</style>
