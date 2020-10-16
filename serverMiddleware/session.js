const session = require('express-session')
const FileStore = require('session-file-store')(session)

module.exports = session({
  name: 'sid',
  secret: 'wooVou9aiCoh',
  resave: false,
  saveUninitialized: true,
  cookie: {
    domain: process.env.COOKIE_DOMAIN,
    maxAge: 1000 * 60 * 60,
  },
  store: new FileStore({}),
})
