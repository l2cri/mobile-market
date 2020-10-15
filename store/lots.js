export const state = () => ({
  lots: [],
  error: null,
})

export const mutations = {
  addLot(state, data) {
    state.lots.push(data)
  },
  deleteLot(state, index) {
    state.lots.splice(index, 1)
  },
  setError(state, error) {
    state.error = error
  },
}

export const actions = {
  async createVoiceLot({ commit }) {
    const r = await this.$axios.$get('/api/add-voice')
    if (r.status) {
      commit('addLot', r.data)
    } else {
      commit('setError', r.msg)
    }
  },
  deleteLot({ commit }, { index, id }) {
    console.info('id', id)
    console.info('index', index)
    commit('deleteLot', index)
  },
}

export const getters = {
  list: state => {
    return state.lots
  },
}
