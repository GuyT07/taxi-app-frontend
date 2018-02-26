// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router'

import FullCalendar from 'vue-full-calendar'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.use(FullCalendar)
Vue.use(VueAxios, axios)
Vue.use(VModal)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
