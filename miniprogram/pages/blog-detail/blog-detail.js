import formatTime from "../../utils/formatTime.js"
const app = getApp()
Page({
  data: {
    blog: {}, //博客对象
    commentList: [], //博客的评论列表
    blogId: '', //博客id
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,
  },
  onLoad: function (options) {
    console.log(this.data.statusBarHeight)
    console.log(options)
    this.setData({
      blogId: options.blogId
    })
    this._getBlogDetail()
  },
  _getBlogDetail() {
    wx.showLoading({
      title: "加载中",
      mask: true,
    })
    
    wx.cloud.callFunction({
      name: "blog",
      data: {
        blogId: this.data.blogId,
        $url: "detail",
      }
    }).then((res) => {
      console.log(res)
      const blog = res.result.list[0]
      let commentList = blog.commentList
      for (let i = 0, len = commentList.length; i < len; i++) {
        commentList[i].createTime = formatTime(new Date(commentList[i].createTime))
      }
      this.setData({
        commentList,
        blog,
      })
      wx.hideLoading()
    })
  },
  back() {
    wx.navigateBack({
      delta: 1
    })
  }
})