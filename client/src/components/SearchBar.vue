<template>
<form class="searchbar">
    <b-form-input class="searchbar-input" type="search" placeholder="Search by bar name"></b-form-input>
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
  max-width: 100%;
  min-width: 50%;
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0;
}
</style>
