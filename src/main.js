// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AudioPlayer from './../dist/vue-audioplayer.min.js'
import './../dist/vue-audioplayer.min.css'

Vue.config.productionTip = false
Vue.use(AudioPlayer)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
