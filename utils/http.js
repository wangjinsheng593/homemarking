import APIConfig from "../config/api.js"
import cache from "../config/cache.js"
import exceptionMessage from "../config/exception-message"
import User from "../model/user.js"
import wxToPromise from "./wx.js"
class Http {
    //不需要用到类的属性，定义静态方法，所以不需要先实例化
    static async request({
        url,
        data,
        method = 'GET',
        refetch = true
    }) {
        let res
        try {
            res = await wxToPromise('request', {
                url: APIConfig.baseUrl + url,
                data,
                method,
                header: {
                    'content-type': 'application/json',
                    'token': wx.getStorageSync(cache.TOKEN)
                }
            })

        } catch (error) {
            Http._showError(-1)
            throw new Error(e.errMsg)

        }

        //全局的统一响，应异常处理
        //请求成功
        if (res.statusCode < 400) {
            return res.data.data
        }
        //请求失败
        if (res.statusCode === 401) {
            // TODO 令牌相关
            if (res.data.error_code === 10001) {
                wx.navigateTo({
                    url: '/pages/login/login',
                })
            }
            if (refetch) {
                return await Http._refetch({
                    url,
                    data,
                    method,
                    refetch
                })
            }


        }
        Http._showError(res.data.error_code, res.data.message)
        const error = Http._generateMessage(res.data.message)
        //异常会中断后续代码的执行
        //错误不会中断后续代码的执行
        throw Error(error)
    }
    static _showError(errorCode, message) {
        let title = ''
        const errorMessage = exceptionMessage[errorCode]
        title = errorMessage || message || '未知异常'
        title = Http._generateMessage(title)
        wx.showToast({
            title: title,
            icon: 'none',
            duration: 3000
        })
    }
    static async _refetch(data) {
        await User.login()
        data.refetch = false
        return await Http.request(data)
    }
    static _generateMessage(message) {
        return typeof message === 'object' ? Object.values(message).join(';') : message

    }
}
export default Http