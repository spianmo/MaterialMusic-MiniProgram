const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const TcbRouter = require('tcb-router')
const db = cloud.database()
const blogCollection = db.collection('blog')

exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })
  //获取博客列表数据
  app.router('list', async (ctx, next) => { //根据创建时间降序排列分页查询
    const keyword = event.keyword
    let w = {}
    if (keyword.trim() != '') {
      w = {
        content: new db.RegExp({
          regexp: keyword,
          options: 'i'
        })
      }
    }
    let blogList = await blogCollection.where(w).skip(event.start).limit(event.count)
      .orderBy('createTime', 'desc').get().then((res) => {
        return res.data
      })
    ctx.body = blogList
  })

  app.router('getListByOpenid',async(ctx,next) => {
    let blogList = await blogCollection.skip(event.start).limit(event.count)
      .orderBy('createTime', 'desc').get().then((res) => {
        return res.data
      })
    ctx.body = blogList
  })

  app.router('detail', async (ctx, next) => {
    let blogId = event.blogId
    const blog = await blogCollection.aggregate().match({
      _id: blogId
    }).lookup({
      from: 'blog-comment',
      localField: '_id',
      foreignField: 'blogId',
      as: 'commentList'
    }).end()
    ctx.body = blog
  })

  return app.serve()
}