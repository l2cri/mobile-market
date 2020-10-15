const route = require('express').Router()
const axios = require('axios')

route.get('/', function (req, res) {
  axios.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + process.env.token
    return config
  })

  const fields = {
    volume: { value: 1, uom: 'gb' },
    cost: { amount: 15, currency: 'rub' },
    trafficType: 'data',
  }

  axios
    .put(
      'https://msk.tele2.ru/api/subscribers/79773092243/exchange/lots/created',
      fields
    )
    .then(({ data }) => {
      res.json({ status: true, data: data.data, meta: data.meta })
    })
    .catch(error => {
      console.error(error)
      res.json({ error: true, msg: error })
    })
})

module.exports = route
