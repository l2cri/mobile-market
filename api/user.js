const route = require('express').Router()
const { successHandler, errorHandler } = require('../request/requestLot')

route.get('/', (req, res) => {
  req.lotRequest
    .get('profile')
    .then(successHandler(res))
    .catch(errorHandler(res))
})

module.exports = route
