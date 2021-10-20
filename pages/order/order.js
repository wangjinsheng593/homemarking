import Order from "../../model/order";

// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        service:null,
        address:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       const service = JSON.parse(options.service)
        this.setData({service})
    },

    //添加地址
    handleSelectAddress:async function () {
        const address = await wx.chooseAddress()
        this.setData({address})
    },

    //立即预约
    handleOrder:async function () {
        if (this.data.service.designated_place && !this.data.address) {
            wx.showModal({
                title:"错误",
                content:"该服务必须指定服务地点",
                showCancel:false
            })
            return
        }
        const res = await wx.showModal({
            title:'注意',
            content:'是否确认预约该服务'
        })
        if (!res.confirm) return
        wx.showLoading({
          title: '正在预约...',
          mask:true
        })
        try {
            await Order.createOrder(this.data.service.id,this.data.address)
            wx.navigateTo({
              url: '/pages/order-success/order-success',
            })
            
        } catch (error) {
            wx.showModal({
              title:'错误',
              content:"预约失败，请稍后重试"
            })
        }
        wx.hideLoading()
       
    }

   
})