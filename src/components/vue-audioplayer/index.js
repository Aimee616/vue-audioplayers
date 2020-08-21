import audioPlayerComponents from './index.vue'

export default {
  install(Vue) {
    Vue.component('audio-player', audioPlayerComponents)
  }
}
