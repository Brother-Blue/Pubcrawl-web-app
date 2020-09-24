<template>
  <div>
    <header-bar></header-bar>
    <search-bar></search-bar>
  </div>
</template>

<script>
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
export default {
  name: 'home',
  components: {
    'header-bar': Header,
    'search-bar': SearchBar
  }
}
</script>
