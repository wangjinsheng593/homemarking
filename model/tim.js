    // 从v2.11.2起，SDK 支持了 WebSocket，推荐接入；v2.10.2及以下版本，使用 HTTP
    import TIM from 'tim-wx-sdk-ws';
    import TIMUploadPlugin from 'tim-upload-plugin';
    import timConfig from '../config/tim';
    import User from './user';
    import genTestUserSig from '../lib/tim/generate-test-usersig';

    class Tim {
        //单列模式--主要是为了解决类多次初始化的问题
        /**
         * @type {Tim}
         */
        static instance = null
        _SDKInstance = null
        _nextReqMessageID = ''
        _messageList = []
        isCompleted = false

        constructor() {
            // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
            let tim = TIM.create(timConfig.options); // SDK 实例通常用 tim 表示

            // 设置 SDK 日志输出级别，详细分级请参见 <a href="https://web.sdk.qcloud.com/im/doc/zh-cn//SDK.html#setLogLevel">setLogLevel 接口的说明</a>
            tim.setLogLevel(timConfig.logLevel); // 普通级别，日志量较多，接入时建议使用
            // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用

            // 注册腾讯云即时通信 IM 上传插件
            tim.registerPlugin({
                'tim-upload-plugin': TIMUploadPlugin
            });
            this._SDKInstance = tim
        }

        //获取模型类的实例
        static getInstance() {
            if (!Tim.instance) {
                Tim.instance = new Tim()
            }
            return Tim.instance
        }

        getSDK() {
            return this._SDKInstance
        }

        login() {
            const userInfo = User.getUserInfoByLocal()
            console.log("获取用户id1111：", userInfo.id);
            const textUserSig = genTestUserSig(userInfo.id.toString())
            this._SDKInstance.login({
                userID: userInfo.id.toString(),
                userSig: textUserSig.userSig
            })
        }
        logout() {
            this._SDKInstance.logout()
        }

        //获取消息列表
        async getMessageList(targetUserId, count = 10) {
            //isCompleted是否拉取完数据，true拉取完，false相反
            if (this.isCompleted) return this._messageList
            //this._SDKInstance获取实例，getMessageList这是实例方法
            const res = await this._SDKInstance.getMessageList({
                conversationID: `C2C${targetUserId}`,
                nextReqMessageID: this._nextReqMessageID,
                count: count > 15 ? 15 : count
            })
            this._nextReqMessageID = res.data.nextReqMessageID
            this.isCompleted = res.data.isCompleted
            this._messageList = res.data.messageList
            return this._messageList
        }

        async setMessageRead(targetUserId){
            const res = await this._SDKInstance.setMessageRead({
                conversationID:`C2C${targetUserId}`
            });
            return res.data
        }

        //重置信息列表
        reset() {
            this._nextReqMessageID = ''
            this.isCompleted = false
            this._messageList = []
            return this
        }

    }

    export default Tim