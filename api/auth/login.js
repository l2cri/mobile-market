const qs = require('querystring')
const axios = require('axios')

export default function (req, res) {
  const { username, password } = req.body

  const requestBody = {
    username,
    password,
    client_id: 'digital-suite-web-app',
    grant_type: 'password',
    password_type: 'sms_code',
  }
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Connection: 'keep-alive',
      Accept: 'application/json, text/plain, */*',
      DNT: '1',
      'X-Ajax-Token':
        '43cc2f836bb5e51dac8e4809ca779d3febb76c9940c44a610a67f933ec15776b',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36',
      'X-csrftoken': req.session.csrf,
      Origin: 'https://msk.tele2.ru',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      Referer: 'https://msk.tele2.ru/lk',
      'Accept-Language': 'ru-RU,ru;q=0.9',
    },
  }

  const url =
    'https://msk.tele2.ru/auth/realms/tele2-b2c/protocol/openid-connect/token'

  axios
    .post(url, qs.stringify(requestBody), config)
    .then(({ data }) => {
      console.info(data)
      req.session.user_id = username
      req.session.access_token = data.access_token
      req.session.expires_in = data.expires_in
      req.session.time = Date.now()
      req.session.refresh_expires_in = data.refresh_expires_in
      req.session.refresh_token = data.refresh_token
      req.session.token_type = data.token_type
      req.session['not-before-policy'] = data['not-before-policy']
      req.session.session_state = data.session_state
      req.session.scope = data.scope

      res.end(JSON.stringify({ data, token: data.access_token }))
    })
    .catch(err => {
      console.error(err)
      // Do somthing
      res.end(JSON.stringify(err))
    })
}
