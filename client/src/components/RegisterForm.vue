<template>
    <div>
      <b-card
      class="border border-warning bg-dark text-warning text-left login-container"
      title="Register"
      >
      <hr class="bg-secondary"><br>
        <b-form-group
        class="text-light"
        id="fieldset-1"
        label="Enter email"
        description="We do not share your email with anyone else"
        label-for="email"
         >
         <b-form-input
         ref="emailRef"
         id="email"
         v-model="email"
         type="email"
         lazy-formatter
         :formatter="inputFormatter"
         trim
         ></b-form-input>
           <b-form-invalid-feedback id="input-live-feedback">
              Please enter a valid email
            </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
        class="text-light"
        id="fieldset-1"
        label="Enter username"
        label-for="username"
        >
          <b-form-input
          id="username"
          v-model="username"
          type="text"
          :state="usernameState"
          :formatter="inputFormatter"
          trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback" :errMessage="errMessageUsername">
            {{errMessageUsername}}
          </b-form-invalid-feedback><br>
        </b-form-group>
        <b-form-group
        class="text-light"
        id="fieldset-1"
        label="Enter password"
        label-for="password"
        >
         <b-form-input
          id="password"
          v-model="password"
          type="password"
          :state="passwordState"
          trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            Passwords must be between 6-128 characters
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button class="btn" variant="outline-warning" @click="registerUser">Register</b-button>
      </b-card>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'login-form',
  data() {
    return {
      username: '',
      available: true,
      users: [],
      password: '',
      email: '',
      errMessageUsername: ''
    }
  },
  mounted: function () {
    this.getUsers()
  },
  computed: {
    usernameState() {
      var b = this.username.length >= 4 && this.username.length <= 15
      var valid = this.usernameValid(b)
      this.usernameAvailable(this.username)
      return this.available && valid
    },
    passwordState() {
      return this.password.length >= 6 && this.password.length <= 128
    }
  },
  methods: {
    getUsers() {
      Api.get('/users')
        .then(response => {
          this.users = response.data.users
        }).catch(error => {
          console.log(error)
        })
    },
    usernameValid(b) {
      if (b === false) {
        this.errMessageUsername = 'Usernames must be between 4-15 characters'
        return false
      } else {
        return true
      }
    },
    usernameAvailable(u) {
      this.available = this.users.includes(u)
      this.users.forEach(user => {
        if (user.username === u) {
          this.errMessageUsername = 'Username not available'
          this.available = false
        } else {
          this.available = true
        }
      })
    },
    registerUser() {
      const params = {
        email: this.email,
        username: this.username,
        password: this.password
      }
      Api.post('/users', params)
        .then(response => {
          // Stuff
          console.log(`Success ${response.statusCode}`)
        }).catch(error => {
          console.error(error)
        })
    },
    inputFormatter(value) {
      return value.toLowerCase()
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 50%;
  margin: 75px auto;
  box-shadow: 5px 5px 5px 3px black;
}

.btn {
  width: 25%;
  float: right;
}
</style>
