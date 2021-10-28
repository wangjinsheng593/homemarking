import Service from "../../model/service"
import { getEventParam } from "../../utils/utils"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        formData:{},
        serviceId:null

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const service = JSON.parse(options.service)
        this._init(service)
    },
    _init(service){
        const formData = {
            type: service.type,
            id: service.id,
            title: service.title,
            category_id: service.category.id,
            description: service.description,
            designated_place: service.designated_place,
            cover_image: service.cover_image,
            begin_date: service.begin_date,
            end_date: service.end_date,
            price: service.price,
        }
        this.setData({formData,serviceId:service.id})

    },
    
    //提交
    async handleSubmit(event){
        const res =await wx.showModal({
            title:"提示",
            content:"是否确认修改该服务？提交后会重新进入审核状态",
            showCancel:true
          })
          if (!res.confirm) return
          wx.showLoading({
            title: '正在发布...',
            mask:true
          })
          const formData = getEventParam(event,'formData')
          try {
            await Service.editService(this.data.serviceId,formData)
            wx.redirectTo({
                url: `/pages/publisher-success/publisher-success?type=${formData.type}`,
            })
        } catch (error) {
            throw new Error(error)
        }
        wx.hideLoading()
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