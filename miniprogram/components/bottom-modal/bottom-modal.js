// components/bottom-modal/bottom-modal.js
Component({
  /**
   * Component properties
   */
  properties: {
    modalShow:Boolean
  },

  options:{
    styleIsolation: 'apply-shared',
    multipleSlots:true
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
    onClose(){
      this.setData({
        modalShow: false,
      })
    }
  }
})
