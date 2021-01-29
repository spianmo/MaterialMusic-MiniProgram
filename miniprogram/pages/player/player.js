let musiclist = []
let playingIndex = 0
Page({

  /**
   * Page initial data
   */
  data: {
    picUrl: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options)
    playingIndex = options.index
    musiclist = wx.getStorageSync('musiclist')
    this._loadMusicDetail(options.musicId)

  },

  _loadMusicDetail(musicId){
    let music = musiclist[playingIndex]
    console.log(music)
    wx.setNavigationBarTitle({
      title: music.name,
    })
    this.setData({
      picUrl : music.al.picUrl
    })
    wx.cloud.callFunction({
      name:'music',
      data:{
        musicId,
        $url: 'musicUrl'
      }
    }).then((res) => {
      console.log(res)
    })
  }
})