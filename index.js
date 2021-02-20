// ==UserScript==
// @name               TM_request
// @namespace          TM_request
// @version            1.0.2
// @description        Tampermonkey http request 库
// @author             HCLonely
// @license            MIT
// ==/UserScript==

/* eslint-disable camelcase, no-unused-vars */
function TM_request (options, t = 0) {
  options.retry = options.retry ?? 0
  return new Promise((resolve, reject) => {
    options.onload = options.onload || (response => {
      response.requestOptions = options
      response.tmStatusText = 'Load'
      resolve(response)
    })
    options.ontimeout = options.ontimeout || (response => {
      response.requestOptions = options
      response.tmStatusText = 'Timeout'
      resolve(response)
    })
    options.onerror = options.onerror || (response => {
      response.requestOptions = options
      response.tmStatusText = 'Error'
      resolve(response)
    })
    options.onabort = options.onabort || (response => {
      response.requestOptions = options
      response.tmStatusText = 'Abort'
      resolve(response)
    })
    GM_xmlhttpRequest(options)
  })
    .then(response => response)
    .catch(async error => {
      if (t >= options.retry) {
        console.error(error)
        throw error
      } else {
        return await TM_request(options, ++t)
      }
    })
}
