const app = require('express')()
const { requestHandlerLot } = require('../request/requestLot')
const addVoice = require('./lot/add-voice')
const list = require('./list')
const addInet = require('./lot/add-inet')
const deleteLot = require('./lot/delete-lot')
const deleteAllLot = require('./lot/delete-all')
const user = require('./user')

app.use(requestHandlerLot)

app.use('/list', list)
app.use('/add-voice', addVoice)
app.use('/add-inet', addInet)
app.use('/delete-lot', deleteLot)
app.use('/lot/delete-all', deleteAllLot)
app.use('/user', user)

module.exports = { path: '/api/tele', handler: app }
