// store.js
import {
    observable,
    action
} from "mobx-miniprogram";
import Tim from "../model/tim";
import TIM from "tim-wx-sdk-ws"

export const timStore = observable({
    // 数据字段
    sdkReady: false,
    //消息类表
    messageList:[],
    //用户id
    _targetUserId:'user1',

    // actions
    login: action(function () {
          //启动事件监听
        this._runListener()
        Tim.getInstance().login()
      
    }),
    logout: action(function () {
        Tim.getInstance().logout()
    }),

    _runListener(){
        const sdk = Tim.getInstance().getSDK()
        sdk.on(TIM.EVENT.SDK_READY,this._handleSDKReady,this)
        sdk.on(TIM.EVENT.SDK_NOT_READY,this._handleSDKNotReady,this)
        //被踢下线事件
        sdk.on(TIM.EVENT.KICKED_OUT,this._handleSDKNotReady,this)
        //消息接受事件
        sdk.on(TIM.EVENT.MESSAGE_RECEIVED,this._handleMessageReceived,this)
    },

    //获取消息列表--手动调用
    getMessageList:action(async function () {
        if (!this._targetUserId) {
            throw Error("未指定目标用户id")
        }
        //重新拉取数据需要初始化参数
        this.messageList = await Tim.getInstance().reset().getMessageList(this._targetUserId)
        //设置消息已读
        await Tim.getInstance().setMessageRead(this._targetUserId)
    }),
    
    //监听消息列表--事件监听调用
   async _handleMessageReceived(event){
        if (!this._targetUserId) return
        const currentCoversationMessage = event.data.filter(item=>item.from===this._targetUserId)
        //过滤之后有值才做绑定
        if (currentCoversationMessage.length) {
            this.messageList = this.messageList.concat(currentCoversationMessage)
            //设置消息已读
            await Tim.getInstance().setMessageRead(this._targetUserId)
        }

    },

    setTargetUserId:action(function (targetUserId) {
       this._targetUserId =  targetUserId
    }),

    _handleSDKReady(){
        this.sdkReady = true
    },
    _handleSDKNotReady(){
        this.sdkReady = false
    },
  
});