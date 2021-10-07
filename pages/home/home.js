// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:['全部服务','在提供','正在找'],
        currentTabIndex:0,
        categoryList:[
            {
                'id':1,
                "name":"保洁"
            },
            {
                'id':2,
                "name":"汽修"
            },
            {
                'id':3,
                "name":"疏通"
            },
       
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    
    //列表头点击事件
    handleTabChange(event){
        const index =event.currentTarget.dataset.index 
        this.setData({
            currentTabIndex:index
        })
    },

    //分类点击事件
    handleCategory(event){
        console.log("分类点击事件:",event);
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