import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from './plugins/vue-axios';

import './assets/css/materialIcons.css'


Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  axios
}).$mount('#app')
