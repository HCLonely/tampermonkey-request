"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// ==UserScript==
// @name               TM_request
// @namespace          TM_request
// @version            1.0.2
// @description        Tampermonkey http request 库
// @author             HCLonely
// @license            MIT
// ==/UserScript==

/* eslint-disable camelcase */
function TM_request(options) {
  var _options$retry;

  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  options.retry = (_options$retry = options.retry) !== null && _options$retry !== void 0 ? _options$retry : 0;
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
  })["catch"]( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(error) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(t >= options.retry)) {
                _context.next = 5;
                break;
              }

              console.error(error);
              throw error;

            case 5:
              _context.next = 7;
              return TM_request(options, ++t);

            case 7:
              return _context.abrupt("return", _context.sent);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}
