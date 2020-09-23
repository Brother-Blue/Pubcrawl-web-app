<template>
  <div>
    <header-bar></header-bar>
    <search-bar></search-bar>
    <test-bar-list></test-bar-list>
  </div>
</template>

<script>
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import BarList from '@/components/BarList'

export default {
  name: 'home',
  components: {
    'header-bar': Header,
    'search-bar': SearchBar,
    'test-bar-list': BarList
  }
}
</script>
