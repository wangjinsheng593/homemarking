import User from "../../model/user";
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { timStore } from "../../store/tim";
// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.storeBindings = createStoreBindings(this, {
            store:timStore,
            actions: {timLogin:"login"},
          });
    },
    //页面卸载
    onUnload(){
        this.storeBindings.destroyStoreBindings()
    },

    //授权登录
    handleLogin: async function () {
        const res = await wx.getUserProfile({
            desc: '完善用户信息',
        })
        wx.showLoading({
            title: '正在授权',
            mask:true
        })
        try {
            await User.login()
            await User.updateUserInfo(res.userInfo)
            //调用TIM的登录方法
            this.timLogin()
            //这个对象是管理页面通信的
            const events = this.getOpenerEventChannel()
            //触发服务详情events里面的login方法
            events.emit('login')
            wx.navigateBack()
        } catch(e) {
            
            wx.showModal({
              title: '注意',
              content:'登录失败，请稍后重试'
            })
        }
        wx.hideLoading()
    },

    //返回首页
    handleToHome() {
        wx.switchTab({
          url: '/pages/home/home',
        })
    },

})