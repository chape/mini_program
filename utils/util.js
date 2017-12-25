const Promise = require('./Promise')

const DOMAIN = 'https://www.chao.com'

function login() {
  return new Promise((resolve, reject) => wx.login({
    success: resolve,
    fail: reject
  }))
}

function getUserInfo() {
  return login().then(res => new Promise((resolve, reject) =>
    wx.getUserInfo({
      success: resolve,
      fail: reject
    })
  ))
}

function requstGet(url, data) {
  return requst(url, 'GET', data)
}

function requstPost(url, data) {
  return requst(url, 'POST', data)
}

// 小程序上线需要https，这里使用服务器端脚本转发请求为https
function requst(url, method, data = {}) {
  wx.showNavigationBarLoading()
  return new Promise((resove, reject) => {
    wx.request({
      url: DOMAIN + url,
      data: data,
      header: {},
      method: method.toUpperCase(), // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        wx.hideNavigationBarLoading()
        resove(res.data)
      },
      fail: function (msg) {
        console.log('reqest error', msg)
        wx.hideNavigationBarLoading()
        reject('fail')
      }
    })
  })
}

module.exports = {
  getUserInfo,
  Promise,
  get: requstGet,
  post: requstPost,
  requst
}