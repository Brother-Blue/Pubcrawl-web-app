<template>
    <div class="btn-group">
      <b-button-group>
        <router-link to="/" class="btn-link">Home</router-link>
        <router-link to="/events" class="btn-link">Events</router-link>
        <router-link to="/login" class="btn-link">{{ message }}</router-link>
      </b-button-group>
    </div>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
      message: 'Sign in'
    }
  },
  methods: {
    /*
        TODO: Finish Passport login.
        Not actual code to be used, just here for future reference
        of what we need to do.

        if (loggedIn) {
            this.message = `Welcome, ${Passport.getSession.user}`
        } else {
            this.message = 'Sign in'
        }
        */
  }
}
</script>

<style scoped>
.btn-group {
    min-width: 100%;
    margin-top: 0px
}

.btn-link:hover {
    background-color: rgb(90, 98, 104);
}

.btn-link {
    width: 33.33%;
    margin-top: 0px;
    padding: 10px;
    background-color: rgb(83, 90, 97);
    color: white;
}

.btn-link:hover {
    color: white;
    text-decoration: none;
}

.btn-link:visited {
    color: white;
}
</style>
