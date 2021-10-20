import cache from "../../config/cache"
import serviceAction from "../../enum/service-ation"
import serviceStatus from "../../enum/service-status"
import serviceType from "../../enum/service-type"
import Rating from "../../model/rating"
import Service from "../../model/service"
import User from "../../model/user"
import {
    getEventParam
} from "../../utils/utils"

const rating = new Rating
// pages/service-detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        service: null,
        serviceId: null,
        isPublisher: false,
        ratingList: [],
        serviceTypeEnum: serviceType,
        serviceStatusEnum: serviceStatus

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.data.serviceId = options.service_id
        await this._getService()
        await this._getServiceRatingList()
        this._checkRole()
    },
 
    async _getService() {
        const service = await Service.getServiceById(this.data.serviceId)
        this.setData({
            service
        })
    },
    async _getServiceRatingList() {
        const ratingList = await rating.reset().getServiceRatingList(this.data.serviceId)
        this.setData({
            ratingList
        })
    },

    //更新状态
    handleUpdateStatus:async function(event) {
        const action = getEventParam(event, 'action')
        const content = this._generateModalContent(action)
        const res =await wx.showModal({
            title:'注意',
            content,
            showCancel:true,
        })
        if (!res.confirm) return 
        //发起接口请求       
       await Service.updateServiceStatus(this.data.serviceId,action)  
       //刷新数据  
       await this._getService()
    },
    //修改服务
    handleEditService() {
        console.log("修改服务");
        const service = JSON.stringify(this.data.service)
        wx.navigateTo({
          url:`/pages/service-edit/service-edit?service=${service}` ,
        })
    },
    //联系对方
    handleChat() {
        console.log("联系对方");
        const targetUserId = this.data.service.publisher.id 
        const service = JSON.stringify(this.data.service)
        wx.navigateTo({
          url: `/pages/conversation/conversation?targetUserId=${targetUserId}&service=${service}`,
        })
    },
    //立即预约
    handleOrder(event) {
        console.log("立即预约");
      
        if (!wx.getStorageSync(cache.TOKEN)) {
            wx.navigateTo({
                url: '/pages/login/login',
                //当点击立即预约之后检测事件
                events:{
                    login:()=> {
                        this._checkRole()
                    }
                }
            })
            return
        }
        const service = JSON.stringify(this.data.service)
        wx.navigateTo({
            url: `/pages/order/order?service=${service}`,
        })
 
    },

    _generateModalContent(action) {
        let content
        switch (action) {
            case serviceAction.PAUSE:
                content = '暂停后服务状态变为“待发布”，' +
                    '可在个人中心操作重新发布上线，' +
                    '是否确认暂停发布该服务？'
                break;
            case serviceAction.PUBLISH:
                content = '发布后即可在广场页面中被浏览到，是否确认发布？'
                break;
            case serviceAction.CANCEL:
                content = '取消后不可恢复，需要重新发布并提交审核；' +
                    '已关联该服务的订单且订单状态正在进行中的，仍需正常履约；' +
                    '是否确认取消该服务？'
                break;
        }
        return content

    },

    _checkRole() {
        const userInfo = User.getUserInfoByLocal();
        if (userInfo && userInfo.id === this.datad.service.publisher.id) {
            this.setData({
                isPublisher: true
            })
        }
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


})