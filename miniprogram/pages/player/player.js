let musiclist = []
const app = getApp()
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
    lyric: '暂无歌词',
    currentMusicName: '',
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
    this.setData({
      currentMusicName: music.name
    })
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
          isPlaying: false
        })
        return
      }
      backgroundAudioManager.src = url
      backgroundAudioManager.title = music.name
      backgroundAudioManager.coverImgUrl = music.al.picUrl
      backgroundAudioManager.singer = music.ar[0].name
      this.savePlayHistory()
      this.setData({
        isPlaying: true
      })
      wx.hideLoading()
      wx.cloud.callFunction({
        name: 'music',
        data: {
          musicId,
          $url: 'lyric',
        }
      }).then((res) => {
        console.log(res)

        let lyric = '暂无歌词'
        const lrc = res.result.lrc
        if (lrc) {
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
        isPlaying: false
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
  onLyricShow() {
    this.setData({
      isLyricShow: !this.data.isLyricShow
    })
  },
  timeUpdate(event) {
    this.selectComponent('.lyric').update(event.detail.currentTime)
  },
  onPrev() {
    playingIndex--
    if (playingIndex < 0) {
      playingIndex = musiclist.length - 1
    }
    this._loadMusicDetail(musiclist[playingIndex].id)
  },
  onNext() {
    playingIndex++;
    if (playingIndex === musiclist.length) {
      playingIndex = 0
    }
    this._loadMusicDetail(musiclist[playingIndex].id)
  },
  _back() {
    wx.navigateBack({
      delta: 1
    })
  },
  //保存播放历史
  savePlayHistory() {
    //当前正在播放的歌曲
    const music = musiclist[playingIndex]
    console.log(music)
    const openid = app.globalData.openid //根据用户openid取出本地存储（同步)
    const history = wx.getStorageSync(openid) //本地是否已经保存了当前歌曲
    let bHave = false
    //遍历本地存储，和当前歌曲对比
    for (let i = 0, len = history.length; i < len; i++) { //已经存在，则结束循环
      if (history[i].id == music.id) {
        bHave = true
        break
      }
    }
    //遍历完毕，不存在
    if (!bHave) {
      //将当前歌曲加入历史记录头部
      history.unshift(music)
      //更新本地存储（(异步)
      wx.setStorage({
        key: openid,
        data: history,
      })
    }
  },


})