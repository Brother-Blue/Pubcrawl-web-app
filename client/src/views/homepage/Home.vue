<template>
  <div>
    <header-bar></header-bar>
    <search-bar></search-bar>
  </div>
</template>

<script>
import Header from './Header'
import SearchBar from './SearchBar'
export default {
  name: 'home',
  components: {
    'header-bar': Header,
    'search-bar': SearchBar
  }
}
</script>
