<template>
  <div class="container">
    <div>
      <h1 class="title">mobile-market</h1>
      <div class="links">
        <button class="button--green" @click="addVoiceLot">
          Add voice lot
        </button>
        <button class="button--grey" @click="addInetLot">Add inet lot</button>
      </div>
      <b-list-group>
        <b-list-group-item v-for="(item, index) in lots" :key="index">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">{{ item.trafficType }}</h6>
            <button class="btn-sm" @click="() => deleteLot(index, item.id)">
              delete
            </button>
          </div>
        </b-list-group-item>
      </b-list-group>
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
    addInetLot() {
      this.$store.dispatch('lots/createInetLot')
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
