const route = require('express').Router()
const { successHandler, errorHandler } = require('../../request/requestLot')

route.get('/', function (req, res) {
  const fields = {
    volume: { value: 50, uom: 'min' },
    cost: { amount: 40, currency: 'rub' },
    trafficType: 'voice',
  }

  req.lotRequest
    .put('exchange/lots/created', fields)
    .then(successHandler(res))
    .catch(errorHandler(res))
})

module.exports = route
