import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueGeolocation from 'vue-browser-geolocation'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueGeolocation)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBt2p4bhMoBOFMJE3KVBjVhsyllqipfQ0M'
  },
  installComponent: false
})
Vue.component('GmapCluster', GmapCluster)

Vue.config.productionTip = true

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
