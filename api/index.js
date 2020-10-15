const app = require('express')()
const addVoice = require('./add-voice')
const addInet = require('./add-inet')
const deleteLot = require('./delete-lot')

app.use('/add-voice', addVoice)
app.use('/add-inet', addInet)
app.use('/delete-lot', deleteLot)

module.exports = { path: '/api/', handler: app }
