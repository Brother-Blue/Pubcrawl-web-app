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
            :invalid-feedback="invalidFeedback"
            :valid-feedback="validFeedback"
            >
            <b-form-input
            ref="emailRef"
            id="email"
            v-model="email"
            type="email"
            :state="emailState"
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
            :invalid-feedback="invalidFeedback"
            :valid-feedback="validFeedback"
            >
        <b-form-input
        id="username"
        v-model="username"
        type="text"
        :state="usernameState"
        trim
        ></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback" :errMessageUsername="errMessageUsername">
          {{errMessageUsername}}
        </b-form-invalid-feedback><br>
        <b-form-group
            class="text-light"
            id="fieldset-1"
            label="Enter password"
            label-for="password"
            :invalid-feedback="invalidFeedback"
            :valid-feedback="validFeedback"
            >
        <b-form-input
        id="password"
        v-model="password"
        type="password"
        :state="passwordState"
        trim
        ></b-form-input>
        </b-form-group>
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
      password: '',
      email: '',
      errMessageUsername: ''
    }
  },
  computed: {
    usernameState() {
      var b = this.username.length >= 4 && this.username.length <= 15
      var valid = this.usernameValid(b)
      var available = this.usernameAvailable(b, this.username)
      return valid && available
    },
    passwordState() {
      return this.password.length >= 6 && this.password.length <= 128
    }
  },
  methods: {
    usernameAvailable(u) {
      Api.get('/users')
        .then(response => {
          var e = response.data.users
          for (let i = 0; i < e.length; i++) {
            if (e[i].username === u) {
              this.errMessageUsername = 'Username not available'
              return false
            }
          }
        }).catch(error => {
          console.log(error)
        })
      return true
    },
    usernameValid(b) {
      if (b === false) {
        this.errMessageUsername = 'Usernames must be between 4-15 characters'
        return false
      }
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
