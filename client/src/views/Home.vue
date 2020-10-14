<template>
  <div class="main bg-dark">
    <header-bar @force-update="force(val)" :loggedIn="loggedIn" :uID="uID" ref="header"></header-bar>
    <b-button id="jump-button" @click="toTop" variant="warning"><b-icon icon="triangle-half"></b-icon></b-button>
    <b-row no-gutters>
      <b-col sm>
        <bar-list
        ref="barList"
        @directMeDaddy="getDirections"
        @emittedBar="clickedBar"
        :barArray="bars"
        @addBarReview="addBarReview"
        :loggedIn="loggedIn"
        :uID="uID"
        >
        </bar-list>
      </b-col>
      <b-col sm class="d-none d-lg-block">
        <bar-map
        ref="barMap"
        :bars="bars">
        </bar-map>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { Api } from '@/Api'
import Header from '@/components/Header'
import Map from '@/components/Map'
import BarList from '@/components/BarList'
export default {
  name: 'home',
  components: {
    'header-bar': Header,
    'bar-list': BarList,
    'bar-map': Map
  },
  data() {
    return {
      bars: null,
      loggedIn: false,
      uID: ''
    }
  },
  methods: {
    addBarReview(barID, payload) {
      Api.post(`/bars/${barID}/reviews`, payload)
        .then(response => {
          if (response.status === 201) {
            this.sendToast('Success', false, 'Successfully added review.')
          }
        }).catch(error => {
          if (error.status === 404) {
            this.sendToast('Failed', false, 'Something went wrong, please try again later.')
          } else if (error.status === 401) {
            // TODO: set logged to false and redirect to login page
            this.sendToast('Unauthorized', false, 'Session ended, please sign in again.')
          }
          console.log(error)
        })
    },
    sendToast(title, append = false, message) {
      this.$bvToast.toast(message, {
        title: title,
        toaster: 'b-toaster-top-center',
        solid: true,
        appendToast: append
      })
    },
    clickedBar(bar) {
      this.$refs.barMap.focusBar(bar)
    },
    getDirections(bar) {
      this.$refs.barMap.getDirections(bar)
    },
    getBars() {
      Api.get('/bars?sortByName=asc')
        .then((response) => {
          this.bars = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    toTop() {
      this.$refs.barList.scrollTo()
    },
    getCookie(name) {
      var matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?|{}()[]\/+^])/g, '$1') + '=([^;])'))
      return matches ? decodeURIComponent(matches[1]) : undefined
    },
    force(val) {
      this.loggedIn = val
      this.$refs.header.$forceUpdate()
      this.$refs.barList.$forceUpdate()
    }
  },
  created: function () {
    this.getBars()
  },
  mounted: function () {
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

#jump-button {
  position: fixed;
  bottom: 10px;
  left: 2vw;
  z-index: 1000;
}
</style>
