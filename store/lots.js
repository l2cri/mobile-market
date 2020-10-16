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
    const r = await this.$axios.$get('/api/tele/add-voice')
    if (r.status) {
      commit('addLot', r.data)
    } else {
      commit('setError', r.message)
    }
  },
  async createInetLot({ commit }) {
    const r = await this.$axios.$get('/api/tele/add-inet')
    if (r.status) {
      commit('addLot', r.data)
    } else {
      commit('setError', r.message)
    }
  },
  async deleteLot({ commit }, { index, id }) {
    const r = await this.$axios.$delete('/api/tele/delete-lot/' + id)
    if (r.status) {
      commit('deleteLot', index)
    } else {
      commit('setError', r.message)
    }
  },
}

export const getters = {
  list: state => {
    return state.lots
  },
}
