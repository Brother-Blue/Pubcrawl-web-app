<template>
  <div class="main bg-dark">
    <pubcrawl-header/>
    <p>Is a registered user: <strong>{{validUser}}</strong></p>
    <div v-if="!validUser" class="text-center text-light">
      <h1>Uh oh!</h1>
      <p>This user does not exist. If you believe this to be an error please <a href="#" class="text-warning">contact the developers.</a></p>
      <p>Otherwise, please <router-link to="/register " class="text-warning"><em>click here</em></router-link> to register a new account.</p>
    </div>
    <div v-if="validUser">
      <b-button class="btn-danger" @click="deleteModalShow = !deleteModalShow">Deactivate my account</b-button>
      <b-modal
      v-model="deleteModalShow"
      header-bg-variant="dark"
      header-text-variant="warning"
      body-bg-variant="dark"
      body-text-variant="light"
      footer-bg-variant="dark"
      footer-text-variant="danger"
      title="Delete account"
      @ok="deleteConfirmation"
      centered
      >
      <p>Are you sure you want to deactivate your account? You will <strong class="text-danger">never get it back!</strong> (<em>A very very long time</em>).</p>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import Header from '@/components/Header'
export default {
  name: 'user-page',
  components: {
    'pubcrawl-header': Header
  },
  data() {
    return {
      validUser: '',
      deleteModalShow: false
    }
  },
  mounted: function () {
    this.isValidUser()
  },
  methods: {
    isValidUser() {
      Api.get('/users')
        .then(response => {
          var e = response.data.users
          e.forEach(user => {
            if (user._id === this.$route.params.id) {
              this.validUser = true
            }
          })
        }).catch(error => {
          console.error(error)
        })
      this.validUser = false
    },
    deleteConfirmation() {
      var id = this.$route.params.id
      Api.delete(`/users/${id}`)
        .then(response => {
          console.log('Fucken ded')
        }).catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
