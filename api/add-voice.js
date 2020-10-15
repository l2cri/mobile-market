const addVoice = require('express').Router()
const axios = require('axios')

addVoice.get('/', function (req, res) {
  axios.interceptors.request.use(config => {
    config.headers.Authorization =
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJFclYtZ2pITHdoQjk1eXhTZC05U0t3QzFJQ2RabEFvQUV0WFV4czJYaGRjIn0.eyJqdGkiOiJlN2Y0MzI5Ni1jNWYzLTRhN2YtYTkyNS0xNGY3YzBlMmQxNjEiLCJleHAiOjE2MDI3ODQwNDYsIm5iZiI6MCwiaWF0IjoxNjAyNzY5NjQ2LCJpc3MiOiJodHRwczovL3Nzby50ZWxlMi5ydS9hdXRoL3JlYWxtcy90ZWxlMi1iMmMiLCJhdWQiOiJkaWdpdGFsLXN1aXRlLXdlYi1hcHAiLCJzdWIiOiJlNWIyMDE5OS02YWY0LTRmN2EtYjM1OS0xOGU3MWE2YWZjZTkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJkaWdpdGFsLXN1aXRlLXdlYi1hcHAiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiIyZDQyOWY1ZC1iZmY5LTQ2NDktOGRlZi04OWFjMjc2ZjUwOTIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiI3OTc3MzA5MjI0MyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOltdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBvZmZsaW5lX2FjY2VzcyBlbWFpbCIsImN1cnJlbnRfdXNlcm5hbWUiOiI3OTc3MzA5MjI0MyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYnJhbmNoX2lkIjoiOTUiLCJzdWJzX2lkIjoiMTgwODk1MTIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiI3OTc3MzA5MjI0MyJ9.O_hZC13ySbz8ALXiCuwFwvM1fVDUsNUxfag6hRKGHaZ2fEBJvySiE1Vrc6EzZS2f9Tq11isH6z-GwVzyIf6UVYtXNW1JHY941VeaPr_07YDzuVvLZztBTPVhw3flTpfkZktPnq5YpEp8V9fY089VX6BsZcGkFdKgLXbKKqmsxeX4wNVgsAcOm7I_XhbZiXIoVv9iHhJFGnHioJGN6tiPFeQsxq_mYgpb41Ynq4rqPhYpp46yrdPPsJht1JXoNKUerO_9h6teqkBVoxc6mTSrFuy4BVkHuF6IqlaS-XiNtB7uIz2cQ_12RPohQFdhYZIHRXS8aO8GwWgioSZyKUHodg'
    return config
  })

  const fields = {
    volume: { value: 50, uom: 'min' },
    cost: { amount: 40, currency: 'rub' },
    trafficType: 'voice',
  }

  axios
    .put(
      'https://msk.tele2.ru/api/subscribers/79773092243/exchange/lots/created',
      fields
    )
    .then(({ data }) => {
      res.json({ status: true, data: data.data, meta: data.meta })
    })
    .catch(error => {
      console.error(error)
      res.json({ error: true, msg: error })
    })
})

module.exports = addVoice
