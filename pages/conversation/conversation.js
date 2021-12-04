import {
    createStoreBindings
} from "mobx-miniprogram-bindings";
import {
    timStore
} from "../../store/tim";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        targetUserId:null,
        service:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.storeBindings = createStoreBindings(this, {
            store: timStore,
            fields: ["sdkReady"],
        });
        this.setData({
            targetUserId:'user1',//options.targetUserId,
            service:options.service
        })
    },

    //点击刷新
    handleLogin(){
        wx.navigateTo({
          url: '/pages/login/login',
        })

    },
    //页面卸载
    onUnload() {
        this.storeBindings.destroyStoreBindings()
    },


})