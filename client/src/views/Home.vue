<template>
  <div>
    <header-bar></header-bar>
    <search-bar></search-bar>
    <bar-map></bar-map>
  </div>
</template>

<script>
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import Map from '@/components/Map'
export default {
  name: 'home',
  components: {
    'header-bar': Header,
    'search-bar': SearchBar,
    'bar-map': Map
  }
}
</script>
