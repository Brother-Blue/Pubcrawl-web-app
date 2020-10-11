import Vue from 'vue'
import VueCookie from 'vue-cookie'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueGeolocation from 'vue-browser-geolocation'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueCookie)
Vue.use(VueGeolocation)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBygd0pTo5i2u2xboeedrc0ZxUBgSaaQ18',
    libraries: 'places'
  },
  installComponent: true
})
Vue.use(BootstrapVueIcons)
Vue.component('GmapCluster', GmapCluster)

Vue.config.productionTip = true

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
