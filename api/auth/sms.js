const url = require('url')
const axios = require('axios')
const { Curl } = require('node-libcurl')

export default function (req, res) {
  // eslint-disable-next-line node/no-deprecated-api
  req.query = url.parse(req.url, true).query
  if (!req.query || !req.query.id) {
    res.end(JSON.stringify(req.query))
  }

  const config = {
    withCredentials: true,
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
      // 'X-csrftoken': process.env.csrftoken,
      Origin: 'https://msk.tele2.ru',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      Referer: 'https://msk.tele2.ru/lk',
      'Accept-Language': 'ru-RU,ru;q=0.9',
    },
  }

  axios
    .get('https://msk.tele2.ru/lk', config)
    .then(({ data }) => {
      const csrf = data.match(
        /<meta name='csrf-token-value' content='(.*?)'\/>/
      )
      if (csrf) {
        return csrf[1]
      }
    })
    .then(csrf => {
      // res.end(csrf)
      const curl = new Curl()

      curl.setOpt(
        'URL',
        'https://msk.tele2.ru/api/validation/number/' + req.query.id
      )

      curl.setOpt(Curl.option.POST, true)
      curl.setOpt(Curl.option.POSTFIELDS, '{"sender":"Tele2"}')
      curl.setOpt(Curl.option.HTTPHEADER, [
        'Connection: keep-alive',
        'Pragma: no-cache',
        'Tele2-User-Agent: web',
        'DNT: 1',
        'X-Ajax-Token: 9b190eb60672c493e519415b273c65c230d426212df3de01eb0e5e1306eb0de2',
        'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36',
        'Content-Type: application/json;charset=UTF-8',
        'Accept: application/json, text/plain, */*',
        'Cache-Control: no-cache',
        'X-Requested-With: XMLHttpRequest',
        'X-csrftoken: ' + csrf,
        'X-Request-Id: Pwn4Xykj7HzdFSDBl5TmIoicALxW1VaYQvsgJepM',
        'Origin: https://msk.tele2.ru',
        'Sec-Fetch-Site: same-origin',
        'Sec-Fetch-Mode: cors',
        'Sec-Fetch-Dest: empty',
        'Referer: https://msk.tele2.ru/lk',
        'Accept-Language: ru-RU,ru;q=0.9',
      ])

      curl.on('end', function (statusCode, data, headers) {
        this.close()
        req.session.csrf = csrf
        res.end('OK')
      })
      // eslint-disable-next-line handle-callback-err
      curl.on('error', function (error, curlCode, item) {
        curl.close.bind(curl)
        res.end('ERROR')
      })
      curl.perform()
    })
    .catch(error => {
      res.end(JSON.stringify(error))
    })
}
