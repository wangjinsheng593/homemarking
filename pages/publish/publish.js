import Service from "../../model/service"
import { getEventParam } from "../../utils/utils"

// pages/publish/publish.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        formData:{
            type: null,
            title: '',
            category_id: null,
            cover_image_id: null,
            description: '',
            designated_place: false,
            begin_date: '',
            end_date: '',
            price: ''
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
   
     //提交
    async handleSunmit(event){
        const res = await wx.showModal({
          title:"提示",
          content:"是否确认申请发布该服务？",
          showCancel:true
        })
        if (!res.confirm) return
        wx.showLoading({
          title: '正在发布...',
          mask:true
        })
        const formData = getEventParam(event,'formData')
        try {
            await Service.publishService(formData)
            this._resetForm()
            wx.navigateTo({
                url: `/pages/publisher-success/publisher-success?type=${formData.type}`,
              })
        } catch (error) {
            throw new Error(error)
        }
        wx.hideLoading()
      
    },
    _resetForm(){
        this.setData({
            formData:{
                type: null,
                title: '',
                category_id: null,
                cover_image_id: null,
                description: '',
                designated_place: false,
                begin_date: '',
                end_date: '',
                price: ''
            },
        })

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