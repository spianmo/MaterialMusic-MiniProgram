
Page({
  
  data: {
    toplists0:[],
    toplists1:[],
    toplists2:[],
    toplists3:[],
  },

 
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.getTopList();
  },

  getTopList: function () {
    const API_BASE_URL = 'http://musicapi.leanapp.cn';
    const request = (url, data) => { 
      let _url = API_BASE_URL  + url;
      return new Promise((resolve, reject) => {
        wx.request({
          url: _url,
          method: "get",
          data: data,
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success(request) {
            resolve(request.data)
            
          },
          fail(error) {
            reject(error)
          }
        })
      });
    }
    
    request('/top/list',({
      idx:0,
    })).then(res => {
      wx.hideLoading()
      // console.log(res.playlist)
        this.setData({
          toplists0: res.playlist
        })
    })

    request('/top/list',({
      idx:1,
    })).then(res => {
      // console.log(res.playlist)
        this.setData({
          toplists1: res.playlist
        })
    })

    request('/top/list',({
      idx:2,
    })).then(res => {
      // console.log(res.playlist)
        this.setData({
          toplists2: res.playlist
        })
    })


    request('/top/list',({
      idx:3,
    })).then(res => {
      // console.log(res.playlist)
        this.setData({
          toplists3: res.playlist
        })
    })
  },

  go_toplist0:function(){
    wx.navigateTo({
      url: '../toplist0/toplist0',
    })
  },
  go_toplist1:function(){
    wx.navigateTo({
      url: '../toplist1/toplist1',
    })
  },
  go_toplist2:function(){
    wx.navigateTo({
      url: '../toplist2/toplist2',
    })
  },
  go_toplist3:function(){
    wx.navigateTo({
      url: '../toplist3/toplist3',
    })
  }
})