<template>
  <div>
    <header-bar></header-bar>
    <search-bar></search-bar>
    <test-bar-list></test-bar-list>
  </div>
</template>

<script>
import Header from './Header'
import SearchBar from './SearchBar'
import BarList from './BarList'

export default {
  name: 'home',
  components: {
    'header-bar': Header,
    'search-bar': SearchBar,
    'test-bar-list': BarList
  }
}
</script>
