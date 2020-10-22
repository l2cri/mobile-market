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
  clearLots(state) {
    state.lots = []
  },
  setListLot(state, lots) {
    state.lots = lots
  },
  setError(state, error) {
    state.error = error
  },
}

export const actions = {
  async activeList({ commit }) {
    const r = await this.$axios.$get('/api/tele/list/active')
    if (r.status) {
      commit('setListLot', r.data)
    } else {
      commit('setError', r.message)
    }
  },
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
  async deleteAllLots({ dispatch, commit, getters }) {
    for await (const deleteLot of getters.idsIndex) {
      await dispatch('deleteLot', deleteLot)
    }
    commit('clearLots')
    setTimeout(() => dispatch('activeList'), 2000)
  },
  async deleteAllLotsServer({ dispatch, commit, getters }) {
    const r = await this.$axios.$post('/api/tele/lot/delete-all', {
      deleteIds: getters.ids,
    })
    if (r.status) {
      commit('clearLots')
      setTimeout(() => dispatch('activeList'), 2000)
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
  idsIndex: state => {
    return state.lots.map((item, index) => ({ id: item.id, index }))
  },
  ids: state => {
    return state.lots.map(item => item.id)
  },
}
