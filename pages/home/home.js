// pages/home/home.js

import Service from "../../model/service.js"
import Category from "../../model/category"
import {
    throttle
} from "../../utils/utils"
//模型类必须实列化之后才能使用
const sevice = new Service();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: ['全部服务', '在提供', '正在找'],
        serviceList: [],
        categoryList: [],
        tabIndex: 0,
        categoryId: 0,
        loading: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        await this._getServiceList()
        await this._getCategoryList()
        this.setData({
            loading: false
        })

    },
    async _getServiceList() {
        const serviceList = await sevice.reset().getServiceList(this.data.categoryId, this.data.tabIndex)
        this.setData({
            serviceList
        })
    },

    async _getCategoryList() {
        //因为Category是静态方法，所以不需要new实列化就能使用
        const categoryList = await Category.getCategoryListWithAll()
        this.setData({
            categoryList
        })

    },

    //tab的点击事件
    handleTabchange(event) {
        this.data.tabIndex = event.detail.index
        this._getServiceList()
    },

    //分类点击事件
    handleCategoryChange: throttle(function (event) {
        if (this.data.categoryId === event.currentTarget.dataset.id) return
        this.data.categoryId = event.currentTarget.dataset.id
        this._getServiceList()
    }),
    /**
     * 监听用户下拉动作--下拉刷新
     */
    async onPullDownRefresh() {
        this._getServiceList()
        //取消下拉
        wx.stopPullDownRefresh()

    },
    /**
     * 上拉触底加载更多
     */
    async onReachBottom() {
        if (!sevice.hasMoreData) {
            return
        }
        //获取下一页的数据并且和当前的数据合并
        const serviceList = await sevice.getServiceList(this.data.categoryId, this.data.tabIndex)
        this.setData({
            serviceList
        })
    },


})