<template>
  <div class="main bg-dark">
    <pubcrawl-header/>
    <div v-if="!validUser" class="text-center text-light">
      <h1>Uh oh!</h1>
      <p>This user does not exist. If you believe this to be an error please <a href="#" class="text-warning">contact the developers.</a></p>
      <p>Otherwise, please <router-link to="/register " class="text-warning"><em>click here</em></router-link> to register a new account.</p>
    </div>
    <div v-if="validUser">
      <b-row>
        <b-col>
          <b-button-group class="btn-group">
            <b-button class="btn btn-outline-warning" v-b-toggle.my-events>Show/Hide events</b-button>
            <b-button class="btn btn-outline-warning" v-b-toggle.my-reviews>Show/Hide reviews</b-button>
          </b-button-group>
          <b-col>
            <b-button class="btn btn-warning float-right update-account-btn" v-b-modal.update-user-modal><b-icon icon="person-circle"></b-icon> Update your account</b-button>
          </b-col>
        </b-col>
      </b-row>
      <b-modal
      id="update-user-modal"
      header-bg-variant="dark"
      header-text-variant="warning"
      body-bg-variant="dark"
      body-text-variant="warning"
      footer-bg-variant="dark"
      ok-variant="warning"
      ok-title="Save"
      @ok="updateUser(user._id)"
      :title="'Hello, ' + user.username"
      >
      <b-form-group
        class="text-warning"
        id="fieldset-1"
        label="Change email"
        description="We do not share your email with anyone else"
        label-for="email"
         >
         <b-form-input
         ref="emailRef"
         id="email"
         v-model="email"
         type="email"
         trim
         ></b-form-input>
        </b-form-group>
      <b-form-group
        class="text-warning"
        id="fieldset-1"
        label="Change password"
        description="Password must be between 6-128 characters. It is recommended to use a combination of letters, numbers, and symbols."
        label-for="password"
        >
         <b-form-input
          id="password"
          v-model="password"
          type="password"
          trim
          ></b-form-input>
        </b-form-group>
      </b-modal>
      <b-row>
        <b-col class="my-events">
          <b-collapse visible id="my-events" :key="events.length + 'b' + curKey">
            <h2 class="text-warning"><em>Events</em></h2>
        <div class="text-light" v-for="(e, index) in events" :key="index">
          <pubcrawl-user-event
          :id="index"
          :eventID="e._id"
          :startDateDay="e.startDate.substring(0, 10)"
          :startDateTime="e.startDate.substring(11, 19)"
          :endDateDay="e.endDate.substring(0, 10)"
          :endDateTime="e.endDate.substring(11, 19)"
          :eventTitle="e.title"
          @yeetTheEvent="deleteEventForever"
          @updateEventByID="updateEvent"
          ></pubcrawl-user-event>
        </div>
          </b-collapse>
        </b-col>
        <b-col class="my-reviews">
          <b-collapse visible id="my-reviews" :key="reviews.length + 'a' + curKey">
            <h2 class="text-warning"><em>Reviews</em></h2>
          <div class="text-light" v-for="(r, index) in reviews" :key="index">
            <pubcrawl-user-review
            :id="index"
            :reviewID="r._id"
            :comment="r.comment"
            :drinkQuality="r.drinkQuality"
            :drinkPrice="r.drinkPrice"
            :foodQuality="r.foodQuality"
            :atmosphere="r.atmosphere"
            :createdOn="r.createdAt.substring(0, 10)"
            :createdAt="r.createdAt.substring(11, 19)"
            @yeetReviewByID="deleteReviewForever"
            @updateReviewByID="updateReview"
            >
            </pubcrawl-user-review>
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
      ok-title="Delete account"
      ok-variant="danger"
      @ok="deleteConfirmation"
      centered
      >
      <p>Are you sure you want to deactivate your account? You will <strong class="text-danger">never get it back!</strong> (<em>A very very long time</em>).</p>
      </b-modal>
      <!-- THIS IS ONLY FOR PROOF OF CONCEPT. NEVER USE THIS. -->
      <b-button class="btn-danger delete-all-accounts" @click="deleteAllShow = !deleteAllShow">Deactivate all accounts</b-button>
      <b-modal
      v-model="deleteAllShow"
      header-bg-variant="dark"
      header-text-variant="warning"
      body-bg-variant="dark"
      body-text-variant="light"
      footer-bg-variant="dark"
      footer-text-variant="danger"
      title="Delete account"
      ok-title="DO NOT CLICK"
      ok-variant="danger"
      @ok="deleteAllUsers"
      centered
      >
      <p>Are you sure you want to delete all accounts? <strong class="text-danger">That's a dick move! NEVER CLICK THIS BUTTON</strong> (<em>A very very mean thing to do</em>).</p>
      </b-modal>
      <!-- THIS IS ONLY FOR PROOF OF CONCEPT. NEVER USE THIS. -->
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import Header from '@/components/Header'
import UserReview from '@/components/UserReview'
import UserEvent from '@/components/UserEvent'

export default {
  name: 'user-page',
  components: {
    'pubcrawl-header': Header,
    'pubcrawl-user-review': UserReview,
    'pubcrawl-user-event': UserEvent
  },
  data() {
    return {
      validUser: '',
      user: null,
      email: '',
      password: '',
      deleteModalShow: false,
      deleteAllShow: false, // Temporary
      events: [],
      reviews: [],
      curKey: 0
    }
  },
  created: function () {
    this.isValidUser()
    this.getEvents()
    this.getReviews()
    if (this.getCookie('jwt')) {
      Api.get('/users/cookie')
        .then(response => {
          if (response.data) {
            console.log('userid: ' + response.data._id)
            console.log('Has valid cookie')
            localStorage.setItem('pubcrawl_user_id', response.data._id)
          } else {
            console.log('Has invalid cookie')
            localStorage.removeItem('pubcrawl_user_id')
          }
        }).catch(error => console.log(error))
    }
  },
  methods: {
    isValidUser() {
      var id = localStorage.getItem('pubcrawl_user_id')
      Api.get(`/users/${id}`)
        .then(response => {
          var status = response.request.status
          if (status === 200) {
            this.validUser = true
            this.user = response.data
          } else {
            this.validUser = false
          }
        }).catch(error => {
          console.error(error)
        })
    },
    deleteConfirmation() {
      var id = localStorage.getItem('pubcrawl_user_id')
      Api.delete(`/users/${id}`)
        .then(response => {
          console.log(response)
        }).catch(error => {
          console.error(error)
        })
    },
    deleteAllUsers() {
      Api.delete('/users')
        .then(response => {
          console.log(response)
        }).catch(error => {
          console.error(error)
        })
    },
    getEvents() {
      Api.get('/events')
        .then(response => {
          this.events = response.data.events
            .filter(event =>
              event.users === localStorage.getItem('pubcrawl_user_id'))
        }).catch(error => {
          console.error(error)
        })
    },
    getReviews() {
      Api.get('/reviews')
        .then(response => {
          this.reviews = response.data.reviews
            .filter(review =>
              review.users === localStorage.getItem('pubcrawl_user_id'))
        }).catch(error => {
          console.error(error)
        })
    },
    deleteEventForever(id) {
      Api.delete(`/events/${id}`)
        .then(response => {
          console.log(response)
          this.getEvents()
          this.curKey += 1
        }).catch(error => {
          console.error(error)
        })
    },
    deleteReviewForever(id) {
      Api.delete(`/reviews/${id}`)
        .then(response => {
          this.getReviews()
          this.curKey += 1
        }).catch(error => {
          console.error(error)
        })
    },
    updateEvent(id, payload) {
      console.log(id, payload)
      Api.patch(`/events/${id}`, payload)
        .then(response => {
          console.log(response.data)
          this.getEvents()
          this.curKey += 1
        }).catch(error => {
          console.error(error)
        })
    },
    // Changed to PUT for milestone, recommended to have it as patch to prevent overriding unchanged data
    updateReview(id, payload) {
      console.log(id, payload)
      Api.put(`/reviews/${id}`, payload)
        .then(response => {
          this.getReviews()
          this.curKey += 1
        }).catch(error => {
          console.error(error)
        })
    },
    updateUser(id) {
      const params = {
        email: this.email,
        password: this.password
      }
      Api.patch(`/users/${id}`, params)
        .then(response => {
          console.log(response)
        }).catch(error => {
          console.error(error)
        })
    },
    getCookie(name) {
      var matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?|{}()[]\/+^])/g, '$1') + '=([^;])'))
      return matches ? decodeURIComponent(matches[1]) : undefined
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
  margin: 40px auto;
  width: 40%;
}

.btn-group * {
  width: 100%;
}

.delete-account {
  position: fixed;
  bottom: 25px;
  right: 25px;
}

.delete-all-accounts {
  position: fixed;
  bottom: 25px;
  left: 25px;
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

.my-reviews {
  margin-right: 20px;
  max-height: 65vh;
  overflow-y: scroll;
}

.update-account-btn {
  position: fixed;
  top: 25vh;
  right: 20px;
}
</style>
