/* eslint-disable no-undef */
/// <reference path="../pb_data/types.d.ts" />

routerAdd('POST', '/captcha-verify', (e) => {
  const env = require(`${__hooks}/env.json`)
  const token = e.requestInfo().body.token
  const response = $http.send({
    url: `https://www.google.com/recaptcha/api/siteverify?secret=${env.secretKey}&response=${token}`,
    method: 'POST'
  })

  return e.json('200', { success: response.json.success})
})
