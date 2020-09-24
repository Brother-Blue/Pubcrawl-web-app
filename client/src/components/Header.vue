<template>
  <div>
    <b-jumbotron
      class="jumbotron"
      header="PubCrawl"
      lead="Welcome to the party"
    ></b-jumbotron>
    <div class="btn-group">
      <b-button-group>
        <b-button class="btn">
            <router-link to="/home" class="btn-link">Home</router-link>
        </b-button>
        <b-button class="btn">
            <router-link to="/events" class="btn-link">Events</router-link>
        </b-button>
        <b-button class="btn">
            <router-link to="#" class="btn-link">{{ message }}</router-link>
        </b-button>
      </b-button-group>
    </div>
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
.jumbotron {
  background-color: rgb(50, 50, 80);
  color: darkkhaki;
  padding-bottom: 10px;
  margin-bottom: 0px;
  border-radius: 0px;
}

.btn-group {
    min-width: 100%;
    margin-top: 0px;
}

.btn-group * {
    border-radius: 0px;
}

@keyframes enlarge-text {
    from {font-size: 1em;}
    to {font-size: 1.5em;}
}

.btn:hover {
    animation-name: enlarge-text;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

.btn-link {
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
