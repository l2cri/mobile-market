export const state = () => ({
  error: null,
})

export const mutations = {
  setError(state, error) {
    state.error = error
  },
}

export const actions = {
  async login({ commit }, phone) {
    const r = await this.$axios.$get('/api/auth/sms/?id=' + phone)

    if (r.status) {
      return r.data
    } else {
      commit('setError', r.message)
    }
  },
}
