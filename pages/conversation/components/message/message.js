import {formatTime} from "../../../../utils/date"
import TIM from "tim-wx-sdk-ws"
import { getDataSet, getEventParam } from "../../../../utils/utils";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        message:Object

    },

    observers:{
        "message":function (message) {
            message.time = formatTime(message.time)
            console.log("消息列表：",message);
            this.setData({
                _message:message
            })
           

            
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        TIM:TIM,
        _message:null,
        flowEnum:{
            IN:'in',
            OUT:'out'
        }

    },

    /**
     * 组件的方法列表
     */
    methods: {
        //预览图片
        async handlePreview(event){
            const url =getDataSet(event,'image')
            await wx.previewImage({
              urls: [url],
              current:url
            })
        },
        //发送链接
        handleSendLink(event){
            const service = getEventParam(event,'service')
            this.triggerEvent('send',{service})

        },
        //查看链接
        handleSelect(event){
            const service = getEventParam(event,'service')
            this.triggerEvent('select',{service})
        },

    }
})
