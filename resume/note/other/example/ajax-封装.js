/**
 * 发送一个 AJAX 请求
 * @param {String} method 请求方法
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {Function} done 请求完成过后需要做的事情（委托/回调）
 */
function ajax(method, url, params, done) {
    // 统一转换为大写便于后续判断
    method = method.toUpperCase()
    // 对象形式的参数转换为 urlencoded 格式
    var pairs = []
    for (var key in params) {
        pairs.push(key + '=' + params[key])
    }
    var querystring = pairs.join('&')
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new
    ActiveXObject('Microsoft.XMLHTTP')
    xhr.addEventListener('readystatechange', function() {
        if (this.readyState !== 4) return
        // 尝试通过 JSON 格式解析响应体
        try {
            done(JSON.parse(this.responseText))
        } catch (e) {
            done(this.responseText)
        }
    })
    // 如果是 GET 请求就设置 URL 地址 问号参数
    if (method === 'GET') {
        url += '?' + querystring
    }
    xhr.open(method, url)
    // 如果是 POST 请求就设置请求体
    var data = null
    if (method === 'POST') {
        xhr.setRequestHeader('Content‐Type', 'application/x‐www‐form‐urlencoded')
        data = querystring
    }
    xhr.send(data)
}
ajax('get', './get.php', { id: 123 }, function(data) {
    console.log(data)
})
ajax('post', './post.php', { foo: 'posted data' }, function(data) {
    console.log(data)
})