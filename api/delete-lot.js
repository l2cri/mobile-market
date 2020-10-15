const route = require('express').Router()
const axios = require('axios')

route.delete('/:itemId', (req, res) => {
  const { itemId } = req.params
  axios.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + process.env.token
    return config
  })
  axios
    .delete(
      'https://msk.tele2.ru/api/subscribers/79773092243/exchange/lots/created/' +
        itemId
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
