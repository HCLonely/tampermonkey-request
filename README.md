# Tampermonkey http request 库

## 使用

`// @require https://greasyfork.org/scripts/418102-tm-request/code/TM_request.js?version=902218`

or

`// @require https://cdn.jsdelivr.net/gh/HCLonely/tampermonkey-request@1.0.2/TM_request.min.js`

## options

同 [GM_xmlhttpRequest](https://www.tampermonkey.net/documentation.php#GM_xmlhttpRequest) details.

新增：

- retry: 请求出错的重试次数，默认为 0.

## response

同 [GM_xmlhttpRequest](https://www.tampermonkey.net/documentation.php#GM_xmlhttpRequest)  onload arguments.

新增：

- requestOptions: options.
- tmStatusText: GM_xmlhttpRequest 的错误文本(`Load`, `Timeout`, `Error`, `Abort`)

## Example

```javascript
const options = {
  url: 'request url',
  methon: 'request method'
}

TM_request(options).then(request => {
  // do something
})
```
