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
            <b-button class="btn btn-outline-warning" v-b-toggle.my-events>View events</b-button>
            <b-button class="btn btn-outline-warning" v-b-toggle.my-reviews>View reviews</b-button>
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
        <b-col class="my-events" :key="events.length + 'b' + curKey">
          <b-collapse id="my-events">
            <h2 class="text-warning"><em>Events</em></h2>
        <div class="text-light" v-for="(e, index) in events" :key="index">
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
              <ul class="bar-list" v-for="b in getMatchingBars(e.bars)" :key="b._id">
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
              centered
              ok-variant="warning"
              ok-title="Save & Exit"
              cancel-variant="danger"
              cancel-title="Delete this event"
              @cancel="deleteEventForever(e._id)"
              @ok="updateEvent(e._id)"
              title="Update Event"
              >
              <p>Current Start Date: {{e.startDate.substring(0, 10)}}</p>
              <b-form-datepicker
              v-model="startDateValue"
              :placeholder="e.startDate.substring(0, 10)"
              :min="minStartDate"
              :max="maxStartDate"
              :state="validDate"
              ></b-form-datepicker><br>
              <p>Current Start Time: {{e.startDate.substring(11, 16)}}</p>
              <b-form-timepicker
              v-model="startTimeValue"
              :placeholder="e.startDate.substring(11, 16)"
              :state="validTime"
              ></b-form-timepicker><br>
              <p>Current End Date: {{e.endDate.substring(0, 10)}}</p>
              <b-form-datepicker
              v-model="endDateValue"
              :placeholder="e.endDate.substring(0, 10)"
              :min="minEndDate"
              :max="maxEndDate"
              :state="validDate"
              ></b-form-datepicker><br>
              <p>Current End Time: {{e.endDate.substring(11, 16)}}</p>
              <b-form-timepicker
              v-model="endTimeValue"
              :placeholder="e.endDate.substring(11, 16)"
              :state="validTime"
              ></b-form-timepicker><br>
              <hr class="bg-secondary">
              </b-modal>
            </b-card-text>
            <template v-slot:footer>
              <em class="text-muted">Event ID: {{e._id}}</em>
            </template>
          </b-card>
        </div>
          </b-collapse>
        </b-col>
        <b-col class="my-reviews" :key="reviews.length + 'a' + curKey">
          <b-collapse id="my-reviews">
            <h2 class="text-warning"><em>Reviews</em></h2>
          <div class="text-light" v-for="(r, index) in reviews" :key="index">
          <b-card
          class="review-card border border-secondary"
          bg-variant="dark"
          text-variant="warning"
          :header="r.createdAt.substring(0, 10)"
          footer-tag="footer"
          >
            <b-card-text>
              <b-row class="text-info">
                <b-col><u>Posted: {{r.createdAt.substring(11, 16)}}</u></b-col>
              </b-row><br>
              <p class="text-light">For: <em class="text-warning">{{getMatchingBars(r.bars)[0]}}</em></p><hr class="bg-secondary">
              <b-row>
                <b-col>
                <label :for="'a' + r._id">Drink Quality: </label>
                <b-form-rating
                v-if="r.drinkQuality > 0"
                variant="warning"
                class="border-0 bg-dark text-warning"
                :id="'a' + r._id"
                inline
                show-value
                show-value-max
                recision="1"
                readonly
                :value="r.drinkQuality"
                ></b-form-rating>
                <em v-if="!r.drinkQuality" :id="'a' + r._id">Not rated</em>
                </b-col>
                <b-col>
                <label :for="'b' + r._id">Drink Price: </label>
                <b-form-rating
                v-if="r.drinkPrice > 0"
                variant="warning"
                class="border-0 bg-dark text-warning"
                :id="'b' + r._id"
                inline
                show-value
                show-value-max
                precision="1"
                readonly
                :value="r.drinkPrice"
                ></b-form-rating>
                <em v-if="!r.drinkPrice" :id="'b' + r._id">Not rated</em>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                <label :for="'c' + r._id">Food Quality: </label>
                <b-form-rating
                v-if="r.foodQuality > 0"
                variant="warning"
                class="border-0 bg-dark text-warning"
                :id="'c' + r._id"
                inline
                show-value
                show-value-max
                recision="1"
                readonly
                :value="r.foodQuality"
                ></b-form-rating>
                <em v-if="!r.foodQuality" :id="'c' + r._id">Not rated</em>
                </b-col>
                <b-col>
                <label :for="'d' + r._id">Atmosphere: </label>
                <b-form-rating
                v-if="r.atmosphere > 0"
                variant="warning"
                class="border-0 bg-dark text-warning"
                :id="'d' + r._id"
                inline
                show-value
                show-value-max
                precision="1"
                readonly
                :value="r.atmosphere"
                ></b-form-rating>
                <em v-if="!r.atmosphere" :id="'d' + r._id">Not rated</em>
                </b-col>
              </b-row>
              <p>{{r.comment}}</p><hr class="bg-secondary">
              <br>
              <b-button class="btn btn-warning float left" v-b-modal="'id' + r._id">Update Review</b-button>
              <b-modal
              :id="'id' + r._id"
              header-bg-variant="dark"
              header-text-variant="warning"
              body-bg-variant="dark"
              body-text-variant="white"
              footer-bg-variant="dark"
              footer-text-variant="muted"
              centered
              scrollable
              ok-variant="warning"
              ok-title="Save & Exit"
              cancel-variant="danger"
              cancel-title="Delete this event"
              @cancel="deleteReviewForever(r._id)"
              @ok="updateReview(r._id)"
              title="Update Event"
              >
              <p>Drink Quality: <em v-if="r.drinkQuality">{{r.drinkQuality}}/5</em><em v-if="!r.drinkQuality">Not rated</em></p>
              <b-form-input v-model="drinkQualityValue" type="range" min="0" max="5" step="0.5"></b-form-input>
              <p class="text-info">New rating: {{drinkQualityValue}}</p>
              <p>Drink Price: <em v-if="r.drinkPrice">{{r.drinkPrice}}/5</em><em v-if="!r.drinkPrice"></em>Not rated</p>
              <b-form-input v-model="drinkPriceValue" type="range" min="0" max="5" step="0.5"></b-form-input>
              <p class="text-info">New rating: {{drinkPriceValue}}</p>
              <p>Food Quality: <em v-if="r.foodQuality">{{r.foodQuality}}/5</em><em v-if="!r.foodQuality">Not rated</em></p>
              <b-form-input v-model="foodQualityValue" type="range" min="0" max="5" step="0.5"></b-form-input>
              <p class="text-info">New rating: {{foodQualityValue}}</p>
              <p>Atmosphere: <em v-if="r.atmosphere">{{r.atmosphere}}/5</em><em v-if="!r.atmosphere">Not rated</em></p>
              <b-form-input v-model="atmosphereValue" type="range" min="0" max="5" step="0.5"></b-form-input>
              <p class="text-info">New rating: {{atmosphereValue}}</p>
              <b-form-textarea
              v-model="commentValue"
              :placeholder="r.comment"
              rows="6"
              >
              </b-form-textarea>
              </b-modal>
            </b-card-text>
            <template v-slot:footer>
              <em class="text-muted">Event ID: {{r._id}}</em>
            </template>
          </b-card>
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
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minEndDate = new Date(today)
    minEndDate.setMonth(today.getMonth())
    minEndDate.setDate(today.getDate())
    const maxEndDate = new Date(today)
    maxEndDate.setMonth(today.getMonth() + 2)
    maxEndDate.setDate(today.getDate())
    const minStartDate = new Date(today)
    minStartDate.setMonth(today.getMonth())
    minStartDate.setDate(today.getDate())
    const maxStartDate = new Date(maxEndDate)
    maxStartDate.setMonth(maxEndDate.getMonth())
    maxStartDate.setDate(maxEndDate.getDate())
    return {
      validUser: '',
      user: null,
      email: '',
      password: '',
      deleteModalShow: false,
      events: [],
      reviews: [],
      bars: [],
      startDateValue: '',
      startTimeValue: '',
      endDateValue: '',
      endTimeValue: '',
      minStartDate: minStartDate,
      maxStartDate: maxStartDate,
      minEndDate: minEndDate,
      maxEndDate: maxEndDate,
      drinkQualityValue: 0,
      drinkPriceValue: 0,
      foodQualityValue: 0,
      atmosphereValue: 0,
      commentValue: '',
      curKey: 0
    }
  },
  mounted: function () {
    this.isValidUser()
    this.getEvents()
    this.getReviews()
    this.getBars()
  },
  computed: {
    validDate() {
      return this.startDateValue <= this.endDateValue
    },
    validTime() {
      return this.startTimeValue > this.endTimeValue
    }
  },
  methods: {
    isValidUser() {
      Api.get('/users')
        .then(response => {
          var e = response.data.users
          e.forEach(user => {
            if (user._id === this.$route.params.id) {
              this.validUser = true
              this.user = user
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
          console.log(response)
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
    },
    getMatchingBars(barIDs) {
      var b = []
      for (var i = 0; i < this.bars.length; i++) {
        if (barIDs.includes(this.bars[i].id)) {
          b.push(this.bars[i].name)
        }
      }
      return b
    },
    deleteEventForever(id) {
      Api.delete(`/events/${id}`)
        .then(response => {
          console.log(response)
          this.events = []
          this.getEvents()
          this.curKey += 1
        }).catch(error => {
          console.error(error)
        })
    },
    deleteReviewForever(id) {
      Api.delete(`/reviews/${id}`)
        .then(response => {
          console.log(response)
          this.reviews = []
          this.getReviews()
          this.curKey += 1
        }).catch(error => {
          console.error(error)
        })
    },
    updateEvent(id) {
      const params = {
        startDate: this.startDateValue + 'T' + this.startTimeValue + '.000Z',
        endDate: this.endDateValue + 'T' + this.endTimeValue + '.000Z'
      }
      Api.patch(`/events/${id}`, params)
        .then(response => {
          this.events = []
          this.getEvents()
          this.curKey += 1
        }).catch(error => {
          console.error(error)
        })
    },
    updateReview(id) {
      const params = {
        drinkQuality: this.drinkQualityValue,
        drinkPrice: this.drinkPriceValue,
        foodQuality: this.foodQualityValue,
        atmosphere: this.atmosphereValue,
        comment: this.commentValue
      }
      Api.patch(`/reviews/${id}`, params)
        .then(response => {
          this.reviews = []
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

.review-card {
  margin-bottom: 10px;
  box-shadow: 2px 2px 5px 2px black;
}

#my-reviews {
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
