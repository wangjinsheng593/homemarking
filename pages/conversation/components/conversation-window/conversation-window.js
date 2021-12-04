import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { timStore } from "../../../../store/tim";
import { getEventParam } from "../../../../utils/utils";
import TIM from "tim-wx-sdk-ws"

// pages/conversation/components/conversation-window/conversation-window.js
Component({
    //自定义组件获取全局状态数据的配置
    behaviors:[storeBindingsBehavior],
    /**
     * 组件的属性列表
     */
    properties: {
        targetUserId:String,
        service:Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        text:'',

    },
    //全局数据获取
    storeBindings:{
        store:timStore,
        //这是数据字段
        fields:['messageList'],
        //这是操作
        actions:['getMessageList','setTargetUserId']
    },
    //自定义组件生命周期函数
    lifetimes:{
        attached(){
            this.setTargetUserId(this.data.targetUserId)
            this.getMessageList()
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //发送链接
        handleSendLink(event){
            const service = getEventParam(event,'service')
            this.triggerEvent('sendmessage',{
                type:TIM.TYPES.MSG_CUSTOM,
                content:service
            })
        },

        handleSelect(event){
            const service = getEventParam(event,'service')
            wx.navigateTo({
              url: `/pages/service-detail/index?service_id=${service.id}`,
            })
        },

        //发送图片
        handleSendImage:async function () {
            const chooseImage = await wx.chooseImage({
              count: 1,
              sizeType:['compressed'],
              sourceType:['album','camera']
            })
            this.triggerEvent('sendmessage',{
                type:TIM.TYPES.MSG_IMAGE,
                content:chooseImage
            })
            
        },

        handleInput(event){
            this.data.text = getEventParam(event,'value')
        },

        //发送信息按钮
        handleSend(){
            const text = this.data.text.trim();
            if (text==='') return
            this.triggerEvent('sendmessage',{
                type:TIM.TYPES.MSG_TEXT,
                content:text
            })
            this.setData({
                text:''
            })

        },
    
    }

})
