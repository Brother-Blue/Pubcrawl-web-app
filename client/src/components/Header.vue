<template>
  <b-navbar id="navbar">
    <b-navbar-brand href="#" class="bg-dark text-warning" :to="{path: '/'}"><img class="image" src="../../../images/logo_placeholder.png"></b-navbar-brand>
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
      class="float-left text-justify w-100"
      ><br>
        <b-nav-item link-classes="text-warning" :to="{path: '/'}"><b-icon icon="house-fill"></b-icon> Home<hr class="bg-secondary"></b-nav-item>
        <b-nav-item link-classes="text-warning" v-if="getSignedIn" :to="{path: '/user/'+localStorage.getItem('pubcrawl_user_id')}"><b-icon icon="person-circle"></b-icon> My Pages<hr class="bg-secondary"></b-nav-item>
        <b-nav-item link-classes="text-warning" :to="{path: '/events'}"><b-icon icon="calendar2"></b-icon> Events<hr class="bg-secondary"></b-nav-item>
        <b-nav-item link-classes="text-warning"><b-icon icon="dice6"></b-icon> Bar Roulette<hr class="bg-secondary"></b-nav-item>
        <b-nav-item link-classes="text-warning" v-if="!getSignedIn" @click="showModal"><b-icon icon="gear-fill"></b-icon> Sign in<hr class="bg-secondary"></b-nav-item>
        <b-nav-item link-classes="text-warning" v-if="getSignedIn" @click="signOut"><b-icon icon="gear-fill"></b-icon> Sign out<hr class="bg-secondary"></b-nav-item>
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
      if (localStorage.getItem('pubcrawl_user_id')) {
        this.signedIn = true
      } else {
        this.signedIn = false
      }
    },
    signOut() {
      this.signedIn = false
      this.$router.push('/')
    },
    showModal() {
      this.$bvModal.show('signin-modal')
    }
  }
}
</script>

<style scoped>
#navbar {
  box-shadow: 2px 0 2px 2px black;
  z-index: 1000;
}

.image {
  height: 45px;
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
