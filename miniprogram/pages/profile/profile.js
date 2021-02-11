Page({
  data: {},
  onLoad: function (options) {}, //生成小程序码
  onTapQrCode() {
    wx.showLoading({
      title: '生成中',
    })
    //调用云函数生成小程序码
    wx.cloud.callFunction({
      name: 'getQrCode'
    }).then((res) => {
      console.log(res)
      const fileId = res.result //预览生成的小程序码图片
      wx.previewImage({
        urls: [fileId],
        current: fileId
      })
      wx.hideLoading()
    })
  },
})