// components/login/login.js
Component({
  /**
   * Component properties
   */
  properties: {
    modalShow: Boolean
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    onGetUserInfo(event){
      console.log(event)
      const userInfo = event.detail.userInfo
      if(userInfo){
        this.setData({
          modalShow:false
        })
        this.triggerEvent('loginsuccess',userInfo)
      }else{
        this.triggerEvent('loginfail')
      }
    }
  }
})
