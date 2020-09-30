<template>
    <div>
      <b-card
      class="border border-warning bg-dark text-warning text-left login-container"
      title="Login"
      >
      <hr class="bg-secondary"><br>
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

            <b-form-invalid-feedback id="input-live-feedback">
              Usernames must be between 4-15 characters
            </b-form-invalid-feedback>
        </b-form-group>
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
        <b-form-invalid-feedback id="input-live-feedback">
          Passwords must be between 6-128 characters
        </b-form-invalid-feedback>

        </b-form-group>
        <p class="text-light">New user? <router-link to="/register" class="text-warning">Register here</router-link> </p>
        <b-button class="btn" variant="outline-warning">Login</b-button>
      </b-card>
    </div>
</template>

<script>
export default {
  name: 'login-form',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    usernameState() {
      return this.username.length >= 4 && this.username.length <= 15
    },
    passwordState() {
      return this.password.length >= 6 && this.password.length <= 128
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
