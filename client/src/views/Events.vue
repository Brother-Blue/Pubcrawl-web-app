<template>
    <div class="main bg-dark">
        <pubcrawl-header @force-update="force(val)" ref="header" :loggedIn="loggedIn" :uID="uID"></pubcrawl-header>
        <pubcrawl-calendar id="calendar" :loggedIn="loggedIn" :uID="uID"></pubcrawl-calendar>
        <b-button id="jump-button" @click="toTop" variant="warning"><b-icon icon="triangle-half"></b-icon></b-button>
    </div>
</template>

<script>
import { Api } from '@/Api'
import Header from '@/components/Header'
import EventCalendar from '@/components/EventCalendar'

export default {
  name: 'events',
  components: {
    'pubcrawl-header': Header,
    'pubcrawl-calendar': EventCalendar
  },
  data() {
    return {
      loggedIn: false,
      uID: ''
    }
  },
  methods: {
    toTop() {
      window.scrollTo(0, 0)
    },
    getCookie(name) {
      var matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?|{}()[]\/+^])/g, '$1') + '=([^;])'))
      return matches ? decodeURIComponent(matches[1]) : undefined
    },
    force(val) {
      this.loggedIn = val
      this.$router.push('/')
    }
  },
  created: function () {
    if (this.getCookie('jwt')) {
      Api.get('/users/cookie')
        .then(response => {
          if (response.data._id) {
            this.loggedIn = true
            this.uID = response.data._id
          }
          if (!response.data) {
            document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          }
        }).catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
/* #header {
  min-width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
} */

#calendar {
  margin-top: 80px;
}

#jump-button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
}
</style>
