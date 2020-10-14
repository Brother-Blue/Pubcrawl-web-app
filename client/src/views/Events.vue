<template>
    <div class="main bg-dark">
        <pubcrawl-header ref="header"></pubcrawl-header>
        <pubcrawl-calendar id="calendar"></pubcrawl-calendar>
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
    }
  },
  methods: {
    toTop() {
      window.scrollTo(0, 0)
    },
    getCookie(name) {
      var matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?|{}()[]\/+^])/g, '$1') + '=([^;])'))
      return matches ? decodeURIComponent(matches[1]) : undefined
    }
  },
  created: function () {
    if (this.getCookie('jwt')) {
      Api.get('/users/cookie')
        .then(response => {
          if (response.data) {
            console.log('Has valid cookie')
            console.log(response.data)
            localStorage.setItem('pubcrawl_user_id', response.data)
          } else {
            console.log('Has invalid cookie')
            document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            localStorage.removeItem('pubcrawl_user_id')
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
