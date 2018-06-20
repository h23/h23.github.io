// 设置请求报文的请求行
xhr.open('GET', './time.php')
// 设置请求头
xhr.setRequestHeader('Accept', 'text/plain')
// 设置请求体
xhr.send(null)
xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
        // 获取响应状态码
        console.log(this.status)
        // 获取响应状态描述
        console.log(this.statusText)
        // 获取响应头信息
        console.log(this.getResponseHeader('Content‐Type')) // 指定响应头
        console.log(this.getAllResponseHeader()) // 全部响应头
        // 获取响应体
        console.log(this.responseText) // 文本形式
        console.log(this.responseXML) // XML 形式，了解即可不用了
    }
}



//GET一般情况下传递的都是参数性质的数据，而
var xhr = new XMLHttpRequest()
// GET 请求传递参数通常使用的是问号传参
// 这里可以在请求地址后面加上参数，从而传递数据到服务端
xhr.open('GET', './delete.php?id=1')
// 一般在 GET 请求时无需设置响应体，可以传 null 或者干脆不传
xhr.send(null)
xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
        console.log(this.responseText)
    }
}


//POST 一般都是业务数据
var xhr = new XMLHttpRequest()
// open 方法的第一个参数的作用就是设置请求的 method
xhr.open('POST', './add.php')
// 设置请求头中的 Content‐Type 为 application/x‐www‐form‐urlencoded
// 标识此次请求的请求体格式为 urlencoded 以便于服务端接收数据
xhr.setRequestHeader('Content‐Type', 'application/x‐www‐form‐urlencoded')
// 需要提交到服务端的数据可以通过 send 方法的参数传递
// 格式：key1=value1&key2=value2
xhr.send('key1=value1&key2=value2')
xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
        console.log(this.responseText)
    }
}