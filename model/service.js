import Http from "../utils/http"
import Base from "./base"
// 一个实例对象，他是有状态的，所以需要实例方法去管理这些状态
//静态方法是不能获取实例里面的值的
//是什么时候使用静态，什么时候使用实例方法？有状态。有属性的并且需要去管理这些状态的使用实例方法，
//本身的实现不依赖状态和属性的就则使用静态方法
//总结：1.调用静态方法本质就是调用类方法，2.实例化调用本质是在调用对象的方法
//定义模型
class Service extends Base{  
    //base 继承，一个父类可以有很多个子类
    /**
     * 分页获取服务列表
     * @param page 页码
     * @param count 每页数量
     * @param category_id 分类id
     * @param type 服务类型
     */
    async getServiceList(category_id = null, type = null) {
        if (!this.hasMoreData) {
            return this.data
        }
        const serviceList = await Http.request({
            url: 'v1/service/list',
            data: {
                page: this.page,
                count: this.count,
                category_id: category_id || '',
                type: type || ''
            }
        })
        this.data = this.data.concat(serviceList.data)
        this.hasMoreData = !(this.page === serviceList.last_page)
        this.page++
        return this.data
    }

    static getServiceById(serviceId) {
        return Http.request({
            url: `v1/service/${serviceId}`
        })
    }

    static updateServiceStatus(serviceId,action){
        return Http.request({
            url:`v1/service/${serviceId}`,
            data:{
                action
            }
        })
    }
 

}
export default Service