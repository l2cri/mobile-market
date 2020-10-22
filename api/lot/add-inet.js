const route = require('express').Router()
const { successHandler, errorHandler } = require('../../request/requestLot')

route.get('/', function (req, res) {
  const fields = {
    volume: { value: 1, uom: 'gb' },
    cost: { amount: 15, currency: 'rub' },
    trafficType: 'data',
  }

  req.lotRequest
    .put('exchange/lots/created', fields)
    .then(successHandler(res))
    .catch(errorHandler(res))
})

module.exports = route
