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
             <b-form-invalid-feedback class="text-warning" id="input-live-feedback" :errMessageEmail="errMessageEmail">
              {{errMessageEmail}}
            </b-form-invalid-feedback>
          </b-form-group>
        <b-form-group
        class="text-light"
        id="fieldset-1"
        label="Enter username"
        label-for="regUsername"
        >
          <b-form-input
          id="regUsername"
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
        label-for="regPassword"
        >
         <b-form-input
          id="regPassword"
          class="bg-dark text-light"
          v-model="registerPassword"
          type="password"
          :state="registerPasswordState"
          trim
          ></b-form-input>
        </b-form-group>
        <b-button class="btn" variant="outline-warning" @click="registerUser" :disabled="!validRegister">Register</b-button>
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
      users: [],
      emails: []
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
      return this.registerPassword.length >= 6 && this.registerPassword.length <= 128 && this.usernameAvailable(this.registerUsername) && this.emailAvailable(this.registerEmail)
    },
    uAvailable() {
      var b = this.registerUsername.length >= 4 && this.registerUsername.length <= 15
      var valid = this.usernameValid(b)
      var c = this.usernameAvailable(this.registerUsername)
      return c && valid
    },
    eAvailable() {
      var d = this.emailAvailable(this.registerEmail)
      return d
    }
  },
  methods: {
    loginUser() {
      const params = {
        username: this.username,
        password: this.password
      }
      Api.post('/users/login', params, { withCredentials: false })
        .then(response => {
          if (response.status === 200) {
            this.$router.push(`/user/${response.data._id}`)
            this.sendToast('Success!', false, 'You\'ve been signed in.')
            this.$bvModal.hide('signin-modal')
          }
        }).catch(error => {
          if (error.status === 404) {
            this.sendToast('Failed', false, 'Something went wrong, please try again later.')
          } else if (error.status === 401) {
            this.sendToast('Unauthorized', false, 'Insufficient permissions.')
          } else if (error.status === 500) {
            this.sendToast('Uh oh!', false, 'Invalid username or password')
          }
          console.log(error)
        })
      this.$bvModal.hide(this.id)
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
          response.data.users.forEach(user => {
            this.users.push(user.username)
            this.emails.push(user.email)
          })
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
      var a = this.users.includes(u)
      if (a) {
        this.errMessageUsername = 'Username is not available'
        return false
      }
      return true
    },
    emailAvailable(e) {
      var a = this.validateEmail(e)
      if (a) {
        if (this.emails.includes(e)) {
          this.errMessageEmail = 'Email is not available'
          return false
        }
        return true
      }
      this.errMessageEmail = 'Invalid email'
      return a
    },
    validateEmail(e) {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e)) {
        return true
      }
      return false
    },
    registerUser() {
      const params = {
        email: this.registerEmail,
        username: this.registerUsername,
        password: this.registerPassword
      }
      Api.post('/users', params)
        .then(response => {
          const params2 = {
            username: params.username,
            password: params.password
          }
          Api.post('/users/login', params2, { withCredentials: false })
            .then(response => {
              if (response.status === 200) {
                this.$router.push(`/user/${response.data._id}`)
                this.sendToast('Success!', false, 'You\'ve been signed in.')
                this.$bvModal.hide('signin-modal')
              }
            }).catch(error => {
              if (error.status === 404) {
                this.sendToast('Failed', false, 'Something went wrong, please try again later.')
              } else if (error.status === 401) {
                this.sendToast('Unauthorized', false, 'Insufficient permissions.')
              } else if (error.status === 500) {
                this.sendToast('Uh oh!', false, 'Invalid username or password')
              }
              console.log(error)
            })
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
