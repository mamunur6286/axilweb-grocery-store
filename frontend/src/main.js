import 'babel-polyfill'
import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store/store'
import axios from 'axios'
import './Utils/fliter'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'remixicon/fonts/remixicon.css'

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';
import 'izitoast/dist/css/iziToast.min.css';
Vue.use(iziToast);

Vue.use(axios)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}
Vue.use(VueSweetalert2, options)


new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})


