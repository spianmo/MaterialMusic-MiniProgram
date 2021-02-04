const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    musiclist: [],
    listInfo: {},
    starNum: 0,
    commitNum: 0,
    shareNum: 0,
    description: '',
    nickname: '',
    avatarUrl: '',
    statusBarHeight: 0,
    opacity: 0,
    title: '歌单'

  },
  onPageScroll(e) {
    let scrollTop = e.scrollTop
    if (scrollTop > 44) {
      this.setData({
        title: this.data.listInfo.name,
      })
    } else {
      this.setData({
        title: '歌单',
      })
    }
    let _opacity = (scrollTop / 100 > 1) ? 1 : scrollTop / 100
    this.setData({
      opacity: _opacity
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options)
    console.log(app.globalData.systemInfo)
    this.setData({
      statusBarHeight: app.globalData.systemInfo.statusBarHeight
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        playlistId: options.playlistId,
        $url: 'musiclist'
      }
    }).then((res) => {
      console.log(res)
      console.log(res.result)
      const pl = res.result.playlist
      this.setData({
        musiclist: pl.tracks.concat(pl.tracks),
        listInfo: {
          coverImgUrl: pl.coverImgUrl,
          name: pl.name,
          coverImgUrl: pl.coverImgUrl,
          name: pl.name,
          avatarUrl: pl.creator.avatarUrl,
          nickname: pl.creator.nickname,
          subscribedCount: pl.subscribedCount,
          commentCount: pl.commentCount,
          shareCount: pl.shareCount,
          description: pl.description,
        },
        starNum: pl.subscribedCount,
        commitNum: pl.commentCount,
        shareNum: pl.shareCount,
        description: pl.description,
        avatarUrl: pl.creator.avatarUrl,
        nickname: pl.creator.nickname,
      })
      wx.setNavigationBarTitle({
        title: this.data.listInfo.name
      })
      this._setMusiclist()
      wx.hideLoading()
    })
  },

  _setMusiclist() {
    wx.setStorageSync('musiclist', this.data.musiclist)
  },
  back() {
    wx.navigateBack({
      delta: 1
    })
  }
})