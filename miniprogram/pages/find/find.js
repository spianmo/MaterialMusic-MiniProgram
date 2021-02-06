let keyword =''
Page({
  data:{
    modalShow: false,
  },
  onSearch(event){
    keyword = event.detail.keyword
    console.log(keyword)
  },
  onLoad(options){},
  onPublish(){
    wx.getSetting({
      success: (res) => {
        console.log('当前设置'+ JSON.stringify(res))
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            lang: 'en',
            success: (res) =>{
              console.log(res)
              this.onLoginSuccess({
                detail:res.userInfo
              })
            }
          })
        }else{
          this.setData({
            modalShow:true,
          })
        }
      }
    })
  },
  onLoginSuccess(event){
    console.log(event)
    const detail = event.detail
    console.log(detail.nickName)
    wx.navigateTo({
    url:'../publish/publish',
  })
},
onLoginFail(){
  wx.showModal({
    title: '授权用户才能发布',
    content: '',
  })
},
  onLoad(options){},
})