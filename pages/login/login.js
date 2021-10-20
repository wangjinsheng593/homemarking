import User from "../../model/user";

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

    },

    //授权登录
    handleLogin: async function () {
        const res = await wx.getUserProfile({
            desc: '完善用户信息',
        })
        console.log('登陆失败，请稍后重试',res.userInfo)
        wx.showLoading({
            title: '正在授权',
            mask:true
        })
        try {
            await User.login()
            await User.updateUserInfo(res.userInfo)
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