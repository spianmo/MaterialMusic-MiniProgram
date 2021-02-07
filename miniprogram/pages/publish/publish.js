const MAX_WORDS_NUM = 140
const MAX_IMG_NUM = 9
let content = ''
let userInfo ={}
Page({

  /**
   * Page initial data
   */
  data: {
    wordsNum: 0,
    footerBottom: 10,
    images: [],
    selectPhoto: true,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options)
    userInfo = options
  },

  onInput(event) {
    console.log(event.detail.value)
    let wordsNum = event.detail.value.length
    if(wordsNum >= MAX_WORDS_NUM){
      wordsNum = `${MAX_WORDS_NUM}`
    }
    this.setData({
      wordsNum
    })
    content = event.detail.value
  },
  onFocus(event){
    console.log(event)
    this.setData({
      footerBottom: event.detail.height,
    })
  },
  onBlur(){
    this.setData({
      footerBottom: 10,
    })
  },
  onChooseImage(){
    let max = MAX_IMG_NUM - this.data.images.length
    console.log(max)
    wx.chooseImage({
      count: max,
      sizeType: ['original', 'compressed'],
      sourceType: ['album','camera'],
      success:(res) => {
        console.log(res)
        this.setData({
          images: this.data.images.concat(res.tempFilePaths)
        })

        max = MAX_IMG_NUM - this.data.images.length
        this.setData({
          selectPhoto: max <= 0 ?false:true
        })
      }
    })
  },
  onPreviewImage(event){
    console.log(event)
    wx.previewImage({
      urls: this.data.images,
      current:event.target.dataset.imgsrc,
    })
  },
  onDelImage(event){
    console.log(event)
    this.data.images.splice(event.target.dataset.index, 1)
    this.setData({
      images: this.data.images
    })
    if (this.data.images.length === MAX_IMG_NUM - 1) {
      this.setData({
        selectPhoto: true,
      })
    }
  },
  back() {
    wx.navigateBack({
      delta: 1
    })
  }
})