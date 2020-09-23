<template>
  <div>
    <b-jumbotron
      class="jumbotron"
      header="PubCrawl"
      lead="Welcome to the party"
    ></b-jumbotron>
    <div class="btn-group">
      <b-button-group>
        <b-button class="btn">Home</b-button>
        <b-button class="btn">Events</b-button>
        <b-button class="btn">{{ message }}</b-button>
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

.btn:hover {
    box-shadow: 0px 5px 3px 1px yellow
}
</style>
