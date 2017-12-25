//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    //轮播图数据
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    interval: 3000,
    duration: 1000
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.requestHome()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  requestHome() {
    util.get('/customer').then(res => {
      console.log(res);
      var customers = [];
      // 轮播管理
      if (res && res.length) {
        var customer = res.map(cus => {
          return {
            id: cus.id,
            name: cus.name,
            mobile: cus.telephone
          }
        })
        customers.push(...customer)
      }
      this.setData({
        customers: customers
      })
    }).catch(err => console.log(err))
  }
})