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
    let blogList = await blogCollection.skip(event.start).limit(event.count)
    .orderBy('createTime', 'desc').get().then((res) => {
      return res.data
    })
    ctx.body = blogList
  })
  return app.serve()
}