const axios = require('axios')

function AuthException(message) {
  this.message = message
  this.name = 'Authentication error'
}

module.exports.requestHandlerLot = (req, res, next) => {
  const old = res.json.bind(res)
  res.json = data => {
    console.log('Response lot.api', data)
    old(data)
  }
  axios.interceptors.request.use(config => {
    console.info(req.session.user_id)
    const userId = req.session.user_id || false
    if (!userId) {
      // throw new AuthException('no user id in session')
      return config
    }
    config.headers.Authorization = 'Bearer ' + req.session.access_token || false
    config.baseURL = process.env.LOT_API_URL + `/${userId}/`
    return config
  })
  req.lotRequest = axios
  next()
}

module.exports.successHandler = res => ({ data }) => {
  if (data.meta.status === 'OK') {
    res.json({ status: true, data: data.data, meta: data.meta })
  } else {
    return res.json({ data: data.data, meta: data.meta, error: true })
  }
}

module.exports.errorHandler = res => error => {
  console.error(error)
  if (error.response) {
    return res.json({ message: error.response.data, error: true })
  } else {
    return res.json({ ...error, error: true })
  }
}
