const app = require('express')()
const addVoice = require('./add-voice')

app.use('/add-voice', addVoice)

module.exports = { path: '/api/', handler: app }
