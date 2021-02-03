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
    globaData : {

    }
    wx.getSystemInfo({
      success: function success(res) {
        var ios = !!(res.system.toLowerCase().search('ios') + 1);
        var statusBarHeight = res.statusBarHeight;
        var topBarHeight = ios ? (44 + statusBarHeight) : (48 + statusBarHeight);
        var innerWidth = wx.getMenuButtonBoundingClientRect().left
        var innerPaddingRight = res.windowWidth - innerWidth
        wx.setStorageSync("systemInfo",{
          ios: ios,
          topBarHeight: topBarHeight,
          statusBarHeight: statusBarHeight,
          innerWidth: 'width:' + innerWidth + 'px',
          innerPaddingRight: 'padding-right:' + innerPaddingRight + 'px',
          contentWidth: innerWidth / 1 + 'px'
        })
      }
    })
  }
})
