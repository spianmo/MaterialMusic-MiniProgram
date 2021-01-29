// components/musiclist/musiclist.js
Component({
  /**
   * Component properties
   */
  properties: {
    musiclist: Array
  },

  /**
   * Component initial data
   */
  data: {
    playingId: -1
  },

  /**
   * Component methods
   */
  methods: {
    onSelect(event){
      const ds = event.currentTarget.dataset
      console.log(ds)
      this.setData({
        playingId: event.currentTarget.dataset.musicid
      })
      wx.navigateTo({
        url: `../../pages/player/player?musicId=${ds.musicid}&index=${ds.index}`,
      })
    }
  }
})
