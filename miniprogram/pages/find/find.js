let keyword =''
Page({
  data:{},
  onSearch(event){
    keyword = event.detail.keyword
    console.log(keyword)
  },
  onLoad(options){},
  onPublish(){
    wx.navigateTo({
      url:'../publish/publish',
    })
  },
})