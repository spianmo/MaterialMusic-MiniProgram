import formatTime from '../../utils/formatTime.js'
Component({
  properties: {
    blog: Object
  },
  observers: {
    [' blog.createTime'](val) {
      if (val) {
        this.setData({
          _createTime: formatTime(new Date(val))
        })
      }
    }
  },
  data: {
    _createTime: ''
  },
  methods: {
    onPreviewImage(event) {
      const ds = event.target.datasetwx.previewImage({
        urls: ds.imgs,
        current: ds.imgsrc,
      })
    },
  }
})