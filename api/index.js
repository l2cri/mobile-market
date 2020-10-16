const app = require('express')()
const { requestHandlerLot } = require('../request/requestLot')
const addVoice = require('./add-voice')
const addInet = require('./add-inet')
const deleteLot = require('./delete-lot')
const user = require('./user')

app.use(requestHandlerLot)

app.use('/add-voice', addVoice)
app.use('/add-inet', addInet)
app.use('/delete-lot', deleteLot)
app.use('/user', user)

module.exports = { path: '/api/tele', handler: app }
