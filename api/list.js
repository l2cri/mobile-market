const route = require('express').Router()
const { successHandler, errorHandler } = require('../request/requestLot')

route.get('/active', (req, res) => {
  req.lotRequest
    .get('exchange/lots/created')
    .then(
      successHandler(res, data => data.filter(item => item.status === 'active'))
    )
    .catch(errorHandler(res))
})

module.exports = route
