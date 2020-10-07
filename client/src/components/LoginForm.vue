<template>
      <b-modal
      :id="id"
      header-bg-variant="dark"
      header-text-variant="warning"
      body-bg-variant="dark"
      body-text-variant="light"
      hide-footer
      centered
      class="border border-warning bg-dark text-warning text-left login-container"
      title="Welcome!"
      >
        <b-tabs
        lazy
        class="bg-dark"
        nav-class="bg-dark"
        active-nav-item-class="bg-dark text-warning font-weight-bold"
        fill>
          <b-tab title="Sign-in" active>
            <br>
            <b-form-group
            class="text-warning"
            id="fieldset-1"
            label="Enter username"
            label-for="username"
            >
              <b-form-input
              id="username"
              class="bg-dark text-light"
              v-model="username"
              type="text"
              :state="usernameState"
              :formatter="inputFormatter"
              trim
              ></b-form-input>
            </b-form-group>
              <b-form-group
              class="text-warning"
              id="fieldset-1"
              label="Enter password"
              label-for="password"
              >
                <b-form-input
                id="password"
                class="bg-dark text-light"
                v-model="password"
                type="password"
                :state="passwordState"
                trim
                ></b-form-input>
              </b-form-group><br>
            <b-button class="btn w-50" variant="outline-warning" @click=loginUser :disabled="!validLogin">Login</b-button>
            </b-tab>
          <b-tab
          lazy title="Register"
          id="registrationTab"
          ><br>
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
                class="bg-dark text-light"
                v-model="registerEmail"
                type="email"
                lazy-formatter
                :formatter="inputFormatter"
                :state="eAvailable"
                trim
            ></b-form-input>
             <b-form-invalid-feedback id="input-live-feedback" :errMessageEmail="errMessageEmail">
              {{errMessageEmail}}
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
          class="bg-dark text-light"
          v-model="registerUsername"
          type="text"
          :state="uAvailable"
          :formatter="inputFormatter"
          trim
          ></b-form-input>
          <b-form-invalid-feedback class="text-warning" id="input-live-feedback" :errMessage="errMessageUsername">
            {{errMessageUsername}}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
        class="text-light"
        id="fieldset-1"
        label="Enter password"
        label-for="password"
        >
         <b-form-input
          id="password"
          class="bg-dark text-light"
          v-model="registerPassword"
          type="password"
          :state="registerPasswordState"
          trim
          ></b-form-input>
        </b-form-group>
        <b-button class="btn" variant="outline-warning" @click="registerUser" :disabled="validRegister">Register</b-button>
          </b-tab>
        </b-tabs>
      </b-modal>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'login-form',
  props: [
    'id'
  ],
  data() {
    return {
      username: '',
      password: '',
      registerUsername: '',
      registerPassword: '',
      registerEmail: '',
      errMessageUsername: '',
      errMessageEmail: '',
      availableUser: true,
      availableEmail: true,
      users: []
    }
  },
  created: function () {
    this.getUsers()
  },
  computed: {
    usernameState() {
      return this.username.length >= 4 && this.username.length <= 15
    },
    passwordState() {
      return this.password.length >= 6 && this.password.length <= 128
    },
    registerPasswordState() {
      return this.registerPassword.length >= 6 && this.registerPassword.length <= 128
    },
    validLogin() {
      return this.username.length >= 4 && this.username.length <= 15 && this.password.length >= 6 && this.password.length <= 128
    },
    validRegister() {
      return this.registerPassword.length >= 6 && this.registerPassword.length <= 128 && this.availableUsername && this.availableEmail
    },
    uAvailable() {
      var b = this.registerUsername.length >= 4 && this.registerUsername.length <= 15
      var valid = this.usernameValid(b)
      this.usernameAvailable(this.registerUsername)
      return this.availableUser && valid
    },
    eAvailable() {
      this.emailAvailable(this.registerEmail)
      return this.availableEmail
    }
  },
  methods: {
    loginUser() {
      const params = {
        username: this.username,
        password: this.password
      }
      Api.post('/login', params, { useCredentials: true })
        .then(response => {
          console.log('Success!')
        }).catch(error => {
          if (error.response.status === 404) {
            this.sendToast('Uh oh!', false, 'Something went wrong logging you in. Please try again later.')
          } else if (error.response.status === 401) {
            this.sendToast('Uh oh!', false, 'Invalid username or password.')
          }
          console.log(error.response)
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
      this.users.forEach(user => {
        if (user.username === u) {
          this.errMessageUsername = 'Username not available'
          this.availableUser = false
        } else {
          this.availableUser = true
        }
      })
    },
    emailAvailable(e) {
      this.users.forEach(user => {
        if (user.email === e) {
          this.errMessageEmail = 'Email not available'
          this.availableEmail = false
        } else {
          this.availableEmail = true
        }
      })
    },
    registerUser() {
      const params = {
        email: this.registerEmail,
        username: this.registerUsername,
        password: this.registerPassword
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
