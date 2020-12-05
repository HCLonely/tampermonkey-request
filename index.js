/* eslint-disable camelcase */
window.TM_request = function TM_request (options) {
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
    .catch(error => {
      console.error(error)
    })
}
