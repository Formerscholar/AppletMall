// pages/home/home.js
import {
  getMultiData,
  getGoodsDate
} from '../../service/home.js'

const types = ['pop', 'new', 'sell']

const TOP_DISIANCE = 1000;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      pop: {
        page: 0,
        list: []
      },
      new: {
        page: 0,
        list: []
      },
      sell: {
        page: 0,
        list: []
      }
    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed:false,
    tabScollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求轮播图以及推荐数据
    this._getMultidata()
    // 请求商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')

  },
  // -------------------------------------网络请求的函数-----------------------------------------------
  _getMultidata() {
    getMultiData().then(res => {
      //  取出轮播图和推荐的数据
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      //  将数据放到data中
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type) {
    // 获取页码
    const page = this.data.goods[type].page + 1
    // 发送网络请求
    getGoodsDate(type, page).then(res => {
      // console.log(res.data.data.list)
      // 取出数据
      const list = res.data.data.list
      // 将数据存储到对应类型的 oldList 中
      const oldList = this.data.goods[type].list
      oldList.push(...list)
      // 将数据存储到对应类型的 goods 中
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  },
  // -------------------------------------网络请求的函数-----------------------------------------------
  // -------------------------------------事件监听函数-----------------------------------------------
  handleTabClick(event) {
    // 取出index
    const index = event.detail.index
    // console.log(index)
    // 设置 currentType 
    this.setData({
      currentType: types[index]
    })
  },
  // -------------------------------------事件监听函数-----------------------------------------------
  /**
   * 监听用户滚动事件
   */
  onPageScroll(options){
    // 取出 scrollTop
    const scrollTop = options.scrollTop
    // 修改 showBackTop 属性
    const flag = scrollTop >= TOP_DISIANCE
    if(flag != this.data.showBackTop){
      this.setData({
        showBackTop: scrollTop >= TOP_DISIANCE
      })
    }

  // 修改 isTabFixed 属性
    const flag1 = scrollTop >= this.data.tabScollTop
    if (flag1 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag1
      })
    }
  },
  handleImageload(){
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScollTop = rect.top
    }).exec()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 上拉加载更多
    this._getGoodsData(this.data.currentType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})