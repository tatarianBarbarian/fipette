import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Clipboard from 'v-clipboard'

Vue.use(Clipboard)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
