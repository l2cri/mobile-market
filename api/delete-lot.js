const route = require('express').Router()
const { successHandler, errorHandler } = require('../request/requestLot')

route.delete('/:itemId', (req, res) => {
  const { itemId } = req.params

  req.lotRequest
    .delete('exchange/lots/created/' + itemId)
    .then(successHandler(res))
    .catch(errorHandler(res))
})

module.exports = route
