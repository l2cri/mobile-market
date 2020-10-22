<template>
  <div class="container">
    <div>
      <h1 class="title">mobile-market</h1>
      <div class="links">
        <b-button variant="success" @click="addVoiceLot">
          Add voice lot
        </b-button>
        <b-button variant="primary" @click="addInetLot">
          Add inet lot
        </b-button>
        <b-button variant="outline-danger" @click="deleteAll">
          Delete all
        </b-button>
        <b-button variant="outline-danger" @click="deleteAllServer">
          Delete all server
        </b-button>
      </div>
      <b-list-group>
        <b-list-group-item v-for="(item, index) in lots" :key="index">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">{{ item.trafficType }}</h6>
            <b-button
              size="sm"
              variant="primary"
              @click="() => deleteLot(index, item.id)"
            >
              delete
            </b-button>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
export default {
  auth: true,
  async fetch() {
    await this.$store.dispatch('lots/activeList')
  },
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
    deleteAll() {
      this.$store.dispatch('lots/deleteAllLots')
    },
    deleteAllServer() {
      this.$store.dispatch('lots/deleteAllLotsServer')
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
