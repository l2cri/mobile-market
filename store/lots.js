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
  async createInetLot({ commit }) {
    const r = await this.$axios.$get('/api/add-inet')
    if (r.status) {
      commit('addLot', r.data)
    } else {
      commit('setError', r.msg)
    }
  },
  async deleteLot({ commit }, { index, id }) {
    const r = await this.$axios.$delete('/api/delete-lot/' + id)
    // todo r.meta.status === 'OK'
    if (r.status) {
      commit('deleteLot', index)
    } else {
      commit('setError', r.msg)
    }
  },
}

export const getters = {
  list: state => {
    return state.lots
  },
}
