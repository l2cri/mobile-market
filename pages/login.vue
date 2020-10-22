<template>
  <div>
    <div v-if="this.$auth.loggedIn">
      <b-button variant="outline-primary" @click="userLogout">logout</b-button>
    </div>
    <b-form @submit.prevent="userLogin" v-else>
      <b-form-group
        id="input-group-1"
        label="Phone:"
        label-for="input-1"
        description="format 71234567890"
      >
        <b-form-input
          id="input-1"
          v-model="login.username"
          type="text"
          required
          placeholder="Enter phone"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        v-if="login.username.length === 11"
        id="input-group-2"
        label="Sms password:"
        label-for="input-2"
        description="password"
      >
        <b-form-input
          id="input-2"
          v-model="login.password"
          type="text"
          required
          autocomplete="off"
          placeholder="Enter sms password"
        ></b-form-input>
      </b-form-group>
      <div v-if="login.username.length === 11">
        <b-button type="submit" variant="danger">Login</b-button>
        <b-button variant="primary" @click="sendSms">Send sms</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async userLogin() {
      console.info('login')
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.login,
        })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
    async userLogout() {
      console.info('logout')
      try {
        const response = await this.$auth.logout()
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
    async sendSms() {
      try {
        const response = await this.$store.dispatch(
          'login/sms',
          this.login.username
        )
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
