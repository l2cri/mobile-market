const route = require('express').Router()
const { errorHandler } = require('../../request/requestLot')

route.post('/', (req, res) => {
  const { deleteIds } = req.body
  const urls = []
  if (Array.isArray(deleteIds)) {
    deleteIds.forEach(itemId => {
      urls.push(req.lotRequest.delete('exchange/lots/created/' + itemId))
    })
  }

  req.lotRequest
    .all(urls)
    .then(() => {
      res.json({
        data: null,
        meta: { status: 'OK', message: null },
        message: null,
        status: true,
      })
    })
    .catch(errorHandler(res))
})

module.exports = route
