import { createStore, createLogger } from 'vuex'
import actions from '@/store/actions'
import getters from '@/store/getters'
import state from '@/store/state'
import mutations from '@/store/mutations'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: { },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
