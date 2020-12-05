"use strict";

/* eslint-disable camelcase */
window.TM_request = function TM_request(options) {
  return new Promise(function (resolve, reject) {
    options.onload = options.onload || function (response) {
      response.requestOptions = options;
      response.tmStatusText = 'Load';
      resolve(response);
    };

    options.ontimeout = options.ontimeout || function (response) {
      response.requestOptions = options;
      response.tmStatusText = 'Timeout';
      resolve(response);
    };

    options.onerror = options.onerror || function (response) {
      response.requestOptions = options;
      response.tmStatusText = 'Error';
      resolve(response);
    };

    options.onabort = options.onabort || function (response) {
      response.requestOptions = options;
      response.tmStatusText = 'Abort';
      resolve(response);
    };

    GM_xmlhttpRequest(options);
  }).then(function (response) {
    return response;
  })["catch"](function (error) {
    console.error(error);
  });
};
