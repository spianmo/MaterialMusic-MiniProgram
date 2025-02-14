// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'material-music-3gwhm51u304f0aa1'
})

const db = cloud.database();
const playlistCollection = db.collection('playlist')
const axios = require('axios')
const URL = 'http://47.98.169.198:3000/user/playlist?uid=494517430'
// 云函数入口函数
exports.main = async (event, context) => {
  const{
    data
  } = await axios.get(URL)
  console.log('######' + JSON.stringify(data))

  if(data.code >= 1000){
    console.log(data.msg)
    return 0
  }

  const playlist = data.playlist
  const newData = []
  for(let i = 0, len = playlist.length; i < len; i++){
    let pl = playlist[i]
    pl.createTime = db.serverDate()
    newData.push(pl)
  }
  console.log(newData)
  if(newData.length > 0){
    await playlistCollection.add({
      data:[...newData]
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.log(err)
      console.error('插入失败')
    })
  }
  return newData.length
}