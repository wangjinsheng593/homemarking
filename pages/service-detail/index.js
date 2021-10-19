import serviceStatus from "../../enum/service-status"
import serviceType from "../../enum/service-type"
import Rating from "../../model/rating"
import Service from "../../model/service"
import User from "../../model/user"

const rating = new Rating
// pages/service-detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        service:null,
        serviceId:null,
        isPublisher:false,
        ratingList:[],
        serviceTypeEnum:serviceType,
        serviceStatusEnum:serviceStatus

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
    async _getService(){
        const service =  await Service.getServiceById(this.data.serviceId )
        this.setData({service})
    },

    _checkRole(){
       const userInfo =  User.getUserInfoByLocal();
       if (userInfo && userInfo.id === this.datad.service.publisher.id) {
           this.setData({isPublisher:true})
       }
    },
    async _getServiceRatingList(){
      const ratingList = await rating.reset().getServiceRatingList(this.data.serviceId)
      this.setData({ratingList})

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