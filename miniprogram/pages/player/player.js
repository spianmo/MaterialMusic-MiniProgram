let musiclist = []
let playingIndex = 0
let currentMusic = {}
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * Page initial data
   */
  data: {
    picUrl: '',
    isPlaying: false
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
  _loadMusicDetail(musicId) {
    let music = musiclist[playingIndex]
    console.log(music)
    wx.setNavigationBarTitle({
      title: music.name,
    })
    this.setData({
      picUrl: music.al.picUrl
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        musicId,
        $url: 'musicUrl'
      }
    }).then((res) => {
      console.log(res)
      const url = res.result.data[0].url
      currentMusic = res
      if (url === null) {
        wx.showToast({
          title: '没有权限播放',
          icon: 'error',
          duration: 2000
        })
        backgroundAudioManager.pause()
        this.setData({
          isPlaying:false
        })
        return
      }
      backgroundAudioManager.src = url
      backgroundAudioManager.title = music.name
      backgroundAudioManager.coverImgUrl = music.al.picUrl
      backgroundAudioManager.singer = music.ar[0].name
      this.setData({
        isPlaying: true
      })
    })
  },
  togglePlaying() {
    const url = currentMusic.result.data[0].url
    if (url === null) {
      wx.showToast({
        title: '没有权限播放',
        icon: 'error',
        duration: 2000
      })
      backgroundAudioManager.pause()
      this.setData({
        isPlaying:false
      })
      return
    }
    if (this.data.isPlaying) {
      backgroundAudioManager.pause()
    } else {
      backgroundAudioManager.play()
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },
  onPrev(){
    playingIndex--
    if(playingIndex < 0){
      playingIndex = musiclist.length - 1
    }
    this._loadMusicDetail(musiclist[playingIndex].id)
  },
  onNext(){
    playingIndex++;
    if(playingIndex === musiclist.length){
      playingIndex = 0
    }
    this._loadMusicDetail(musiclist[playingIndex].id)
  }
})