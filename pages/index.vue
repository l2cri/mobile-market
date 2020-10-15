<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">mobile-market</h1>
      <div class="links">
        <button class="button--green" @click="addVoiceLot">
          Add voice lot
        </button>
        <button class="button--grey">Add inet lot</button>
      </div>
      <div v-for="(item, index) in lots" :key="index">
        {{ item }}
        <button class="btn-sm" @click="() => deleteLot(index, item.id)">
          delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    lots() {
      return this.$store.getters['lots/list']
    },
  },
  methods: {
    addVoiceLot() {
      this.$store.dispatch('lots/createVoiceLot')
    },
    deleteLot(index, id) {
      this.$store.dispatch('lots/deleteLot', { index, id })
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
