const app = getApp()
Page({
  data: {
    musiclist: []
  },
  onLoad: function (options) {
    //取出本地存储key为openid的数据（播放历史)
    const playHistory = wx.getStorageSync(app.globalData.openid)
    if (playHistory.length == 0) {
      wx.showModal({
        title: '播放历史为空',
        content: '',
      })
    } else {
      // storage里面存储的musiclist替换成播放历史的歌单
      wx.setStorage({
        key: 'musiclist',
        data: playHistory,
      })
      this.setData({
        musiclist: playHistory
      })
    }
  },
  back() {
    wx.navigateBack({
      delta: 1
    })
  }
})