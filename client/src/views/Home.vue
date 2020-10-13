<template>
  <div class="main bg-dark">
    <header-bar></header-bar>
    <b-button id="jump-button" @click="toTop" variant="warning"><b-icon icon="triangle-half"></b-icon></b-button>
    <b-row no-gutters>
      <b-col sm>
        <bar-list
        ref="barList"
        @directMeDaddy="getDirections"
        @emittedBar="clickedBar"
        :barArray="bars"
        @addReview='addBarReview'>
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
      bars: null
    }
  },
  methods: {
    addBarReview(id, payload) {
      Api.post(`/bars/${id}/reviews`, payload)
        .then(response => {
          if (response.status === 200) {
            this.sendToast('Success', false, 'Successfully added review.')
          }
        }).catch(error => {
          if (error.status === 404) {
            this.sendToast('Failed', false, 'Something went wrong ,please try again later.')
          } else if (error.status === 401) {
            this.sendToast('Unauthorized', false, 'Insufficient permissions.')
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
      Api.get('/bars')
        .then((response) => {
          this.bars = response.data.bars
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
    }
  },
  created: function () {
    this.getBars()
    if (this.getCookie('jwt')) {
      console.log('User has saved cookie')
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
