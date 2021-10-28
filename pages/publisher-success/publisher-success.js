import ServiceStatus from "../../enum/ServiceStatus";

Page({
    data: {
        type: null,
        ServiceStatus
    },
    onLoad: function (options) {
        this.data.type = options.type
    },

    handleCheckService: function () {
        wx.redirectTo({ url: `/pages/my-service/index?type=${this.data.type}&status=${ServiceStatus.PENDING}` })
    },

    handleNavToHome: function (event) {
        wx.switchTab({
            url: '/pages/home/home'
        })
    }
});
