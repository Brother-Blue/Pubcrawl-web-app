<template>
  <b-navbar>
    <b-navbar-brand href="#" class="bg-dark text-warning" to="/">REPLACE WITH IMAGE</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-item class="text-warning"><b-button class="btn btn-warning" v-b-toggle.sidebar-menu>Menu <b-icon icon="list"></b-icon></b-button></b-nav-item>
    </b-navbar-nav>
    <b-sidebar
    id="sidebar-menu"
    backdrop
    backdrop-variant="dark"
    shadow
    title="Menu"
    bg-variant="dark"
    text-variant="warning"
    sidebar-class="border-right border-warning"
    >
      <b-nav
      vertical
      class="float-left text-justify"
      >
        <b-nav-item class="text-warning" v-if="getSignedIn" to="/user/${this.$router.query.id}"><b-icon icon="person-fill"></b-icon> My Pages</b-nav-item>
        <b-nav-item class="text-warning" to="/events"><b-icon icon="calendar"></b-icon> Events</b-nav-item>
        <b-nav-item class="text-warning" v-if="!getSignedIn" v-b-modal.signin-modal><b-icon icon="gear"></b-icon> Sign in</b-nav-item>
        <b-nav-item class="text-warning" v-if="getSignedIn" @click="signOut"><b-icon icon="gear"></b-icon> Sign out</b-nav-item>
      </b-nav>
    </b-sidebar>
    <pubcrawl-signin
      id="signin-modal"
    ></pubcrawl-signin>
  </b-navbar>
</template>

<script>
import LoginForm from '@/components/LoginForm'
export default {
  name: 'header',
  components: {
    'pubcrawl-signin': LoginForm
  },
  data() {
    return {
      message: 'Sign in',
      signedIn: false
    }
  },
  computed: {
    getSignedIn() {
      this.checkSignedIn()
      return this.signedIn
    }
  },
  methods: {
    checkSignedIn() {
      if (this.$route.query.id) {
        this.signedIn = true
      } else {
        this.signedIn = false
      }
    },
    signOut() {
      this.signedIn = false
      this.message = 'Sign in'
      this.$router.push('/')
      console.log(localStorage.getItem('pubcrawlCookie'))
    }
  }
}
</script>

<style scoped>
.image {
  height: 50px;
  padding: 0;
}
.btn-group {
    min-width: 100%;
    margin-top: 0px
}

.btn-link:hover {
    background-color: rgb(90, 98, 104);
}

.btn-link {
    width: 33.33%;
    background-color: rgb(83, 90, 97);
    color: white;
    margin-top: 0;
    padding: 5px;
    font-family: "Georgia", sans-serif;
    font-size: 2.1em;
}

.btn-link:hover {
    color: white;
    text-decoration: none;
}

.btn-link:visited {
    color: white;
}
</style>
