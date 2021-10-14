import APIConfig from "../config/api.js"
import exceptionMessage from "../config/exception-message"
import wxToPromise from "./wx.js"
class Http {
    //不需要用到类的属性，定义静态方法，所以不需要先实例化
    static async request({
        url,
        data,
        method = 'GET'
    }) {
        const res = await wxToPromise('request', {
            url: APIConfig.baseUrl + url,
            data,
            method,
        })
        //全局的统一响，应异常处理
        //请求成功
        if (res.statusCode < 400) {
            return res.data.data
        }
        //请求失败
        if (res.statusCode === 401) {
            // TODO 令牌相关
            return
        }
        Http._showError(res.data.error_code, res.data.message)
        //接口错信息，一定要看清楚文档，那些适合直接展示出去，那些不合适

        // wx.request({
        //     url: APIConfig.baseUrl + url,
        //     data,
        //     method,
        //     success: (res) => {
        //         //全局的统一响，应异常处理
        //         //请求成功
        //         if (res.statusCode < 400) {
        //             callback(res.data.data)
        //             return
        //         }
        //         //请求失败
        //         if (res.statusCode === 401) {
        //             // TODO 令牌相关
        //             return
        //         }
        //         Http._showError(res.data.error_code, res.data.message)
        //         //接口错信息，一定要看清楚文档，那些适合直接展示出去，那些不合适

        //     }
        // })
    }
    static _showError(errorCode, message) {
        let title = ''
        const errorMessage = exceptionMessage[errorCode]
        title = errorMessage || message || '未知异常'
        title = typeof title === 'object' ? Object.values(title).join(';') : title
        wx.showToast({
            title: title,
            icon: 'none',
            duration: 3000
        })


    }
}
export default Http