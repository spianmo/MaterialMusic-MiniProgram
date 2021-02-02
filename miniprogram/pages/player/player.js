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
    isPlaying: false,
    isLyricShow: false,
    lyric: '暂无歌词'
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
      wx.hideLoading()
      wx.cloud.callFunction({
        name: 'music',
        data:{
          musicId,
          $url: 'lyric',
        }
      }).then((res) => {
        console.log(res)

        let lyric = '暂无歌词'
        const lrc = res.result.lrc
        if(lrc){
          lyric = lrc.lyric
        }
        this.setData({
          lyric
        })
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
  onLyricShow(){
    this.setData({
      isLyricShow: !this.data.isLyricShow
    })
  },
  timeUpdate(event){
    this.selectComponent('.lyric').update(event.detail.currentTime)
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