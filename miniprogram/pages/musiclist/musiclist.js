// miniprogram/pages/musiclist/musiclist.js
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
    description:'',
    nickname:'',
    avatarUrl:'',
    scrollTop: null,
  },
  scroll: function (e) {
    this.setData({ scrollTop: e.detail.scrollTop })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options)
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
        },
        starNum: pl.subscribedCount,
        commitNum: pl.commentCount,
        shareNum: pl.shareCount,
        description: pl.description.substring(0,18)+"...",
        avatarUrl:pl.creator.avatarUrl,
        nickname:pl.creator.nickname,
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
  _back() {
    wx.navigateBack({
      delta: 1
    })
  }
})