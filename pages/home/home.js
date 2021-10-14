// pages/home/home.js

import Service from "../../model/service.js"
import Category from "../../model/category"
//模型类必须实列化之后才能使用
const sevice = new Service();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: ['全部服务', '在提供', '正在找'],
        currentTabIndex: 0,
        categoryList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._getServiceList()
        this._getCategoryList()

    },
    async _getServiceList(){
       const serviceList =  await sevice.getServiceList(1,10)
       this.setData({
        serviceList:serviceList.data
       })
    },

    async _getCategoryList(){
        //因为Category是静态方法，所以不需要new实列化就能使用
       const categoryList =  await Category.getCategoryListWithAll()
       this.setData({
        categoryList
       })

    },

    //tab的点击事件
    handleTabchange(data) {
        console.log("tab的点击事件:",data.detail.index);
    },

    //分类点击事件
    handleCategory(event) {
        const id = event.currentTarget.dataset.id

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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})