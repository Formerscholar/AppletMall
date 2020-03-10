// pages/home/childCpns/w-recommend/w-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoad:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handImageLoad(){
      if (!this.data.isLoad){
        this.triggerEvent('imageload')
        this.data.isLoad = true
      }
    }
  }
})
