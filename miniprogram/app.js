//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    this.globalData = {
      systemInfo: this.getSystemInfo(),
    }
  },
  getSystemInfo: function () {
    let systemInfo = wx.getSystemInfoSync()
    let pxToRpxScale = 750 /systemInfo.windowHeight
    var statusBarHeight = systemInfo.statusBarHeight;
    let rect = wx.getMenuButtonBoundingClientRect()
    const sysInfo = {
      pxToRpxScale,
      statusBarHeight,
      rect
    }
    return sysInfo
  }
})