<template>
  <div class="main bg-dark">
    <pubcrawl-header/>
    <div v-if="!validUser" class="text-center text-light">
      <h1>Uh oh!</h1>
      <p>This user does not exist. If you believe this to be an error please <a href="#" class="text-warning">contact the developers.</a></p>
      <p>Otherwise, please <router-link to="/register " class="text-warning"><em>click here</em></router-link> to register a new account.</p>
    </div>
    <div v-if="validUser">
      <b-button-group class="btn-group">
        <b-button class="btn btn-outline-warning" v-b-toggle.my-events>View events</b-button>
        <b-button class="btn btn-outline-warning" v-b-toggle.my-reviews>View reviews</b-button>
      </b-button-group>
      <b-collapse id="my-events">
        <div class="text-light" v-for="e in events" :key="e">
          <b-card
          bg-variant="dark"
          text-variant="light"
          :title="e.title"
          >
          </b-card>
        </div>
      </b-collapse>
      <b-collapse id="my-reviews">
        <div class="text-light">
          <p>Hello 2!</p>
        </div>
      </b-collapse>
      <b-button class="btn-danger" @click="deleteModalShow = !deleteModalShow">Deactivate my account</b-button>
      <b-modal
      v-model="deleteModalShow"
      header-bg-variant="dark"
      header-text-variant="warning"
      body-bg-variant="dark"
      body-text-variant="light"
      footer-bg-variant="dark"
      footer-text-variant="danger"
      title="Delete account"
      @ok="deleteConfirmation"
      centered
      >
      <p>Are you sure you want to deactivate your account? You will <strong class="text-danger">never get it back!</strong> (<em>A very very long time</em>).</p>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import Header from '@/components/Header'
export default {
  name: 'user-page',
  components: {
    'pubcrawl-header': Header
  },
  data() {
    return {
      validUser: '',
      deleteModalShow: false,
      events: [],
      reviews: []
    }
  },
  mounted: function () {
    this.isValidUser()
    this.getEvents()
    this.getReviews()
  },
  methods: {
    isValidUser() {
      Api.get('/users')
        .then(response => {
          var e = response.data.users
          e.forEach(user => {
            if (user._id === this.$route.params.id) {
              this.validUser = true
            }
          })
        }).catch(error => {
          console.error(error)
        })
      this.validUser = false
    },
    deleteConfirmation() {
      var id = this.$route.params.id
      Api.delete(`/users/${id}`)
        .then(response => {
          console.log('Fucken ded')
        }).catch(error => {
          console.error(error)
        })
    },
    getEvents() {
      Api.get('/events')
        .then(response => {
          var e = response.data.events
          for (var i = 0; i < e.length; i++) {
            if (e[i].users === this.$route.params.id) {
              this.events.push(e[i])
            }
          }
        }).catch(error => {
          console.error(error)
        })
      console.log(this.events)
    },
    getReviews() {
      Api.get('/reviews')
        .then(response => {
          var r = response.data.reviews
          for (var i = 0; i < r.length; i++) {
            if (r[i].users === this.$route.params.id) {
              this.reviews.push(r[i])
            }
          }
        }).catch(error => {
          console.error(error)
        })
      console.log(this.reviews)
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

.btn-group {
  margin-top: 50px;
  width: 40%;
}

.btn-group * {
  width: 100%;
}

.btn-danger {
  position: fixed;
  bottom: 25px;
  right: 25px;
}
</style>
