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
      <b-row>
        <b-col class="my-events">
          <b-collapse id="my-events">
        <div class="text-light" v-for="e in events" :key="e">
          <b-card
          class="event-card border border-secondary"
          bg-variant="dark"
          text-variant="warning"
          :header="e.title"
          footer-tag="footer"
          >
            <b-card-text>
              <b-row class="text-info">
                <b-col><u>Starting {{e.startDate.substring(0, 10)}} @ {{e.startDate.substring(11, 16)}}</u></b-col>
                <b-col><u>Ends {{e.endDate.substring(0, 10)}} @ {{e.endDate.substring(11, 16)}}</u></b-col>
              </b-row>
              <p class="text-light">For these bars:</p><hr class="bg-secondary">
              <ul class="bar-list" v-for="b in getMatchingBars(e.bars)" :key="b">
                <li>{{b}}</li>
              </ul><hr class="bg-secondary">
              <b-button class="btn btn-warning float left" v-b-modal="'id' + e._id">Update Event</b-button>
              <b-modal
              :id="'id' + e._id"
              header-bg-variant="dark"
              header-text-variant="warning"
              body-bg-variant="dark"
              body-text-variant="white"
              footer-bg-variant="dark"
              footer-text-variant="muted"
              ok-only
              ok-variant="warning"
              ok-title="Save & Exit"
              title="Update Event"
              >
              <p>Current Start Date: {{e.startDate.substring(0, 10)}}</p>
              <p>Current Start Time: {{e.startDate.substring(11, 16)}}</p>
              <p>Current End Date: {{e.endDate.substring(0, 10)}}</p>
              <p>Current End Time: {{e.endDate.substring(11, 16)}}</p>
              <hr class="bg-secondary">
              <b-button class="btn btn-danger">Delete this event</b-button>
              </b-modal>
            </b-card-text>
            <template v-slot:footer>
              <em class="text-muted">Event ID: {{e._id}}</em>
            </template>
          </b-card>
        </div>
      </b-collapse>
        </b-col>
      <b-col>
        <b-collapse id="my-reviews">
        <div class="text-light">
          <p>Hello 2!</p>
        </div>
      </b-collapse>
      </b-col>
      </b-row>
      <b-button class="btn-danger delete-account" @click="deleteModalShow = !deleteModalShow">Deactivate my account</b-button>
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
      reviews: [],
      bars: []
      // img: require('./../../../images/events_background_placeholder.png')
    }
  },
  mounted: function () {
    this.isValidUser()
    this.getEvents()
    this.getReviews()
    this.getBars()
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
    },
    getBars() {
      Api.get('/bars')
        .then(response => {
          var b = response.data.bars
          for (var i = 0; i < b.length; i++) {
            this.bars.push({
              id: b[i]._id,
              name: b[i].name
            })
          }
        }).catch(error => {
          console.error(error)
        })
      console.log(this.bars)
    },
    getMatchingBars(barIDs) {
      var b = []
      for (var i = 0; i < this.bars.length; i++) {
        if (barIDs.includes(this.bars[i].id)) {
          b.push(this.bars[i].name)
        }
      }
      console.log(b)
      return b
    }
  }
}
</script>

<style scoped>
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.btn-group {
  margin-top: 50px;
  width: 40%;
  margin-bottom: 30px;
}

.btn-group * {
  width: 100%;
}

.delete-account {
  position: fixed;
  bottom: 25px;
  right: 25px;
}

.bar-list {
  list-style-type: none;
  padding: 0px;
  text-align: center;
}

.my-events {
  margin-left: 20px;
  max-height: 65vh;
  overflow-y: scroll;
}

.event-card {
  margin-bottom: 10px;
  box-shadow: 2px 2px 5px 2px black;
}

#my-reviews {
  margin-right: 20px;
}
</style>
