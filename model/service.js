import Http from "../utils/http"
    // 一个实例对象，他是有状态的，所以需要实例方法去管理这些状态
    //静态方法是不能获取实例里面的值的
    //是什么时候使用静态，什么时候使用实例方法？有状态。有属性的并且需要去管理这些状态的使用实例方法，
    //本身的实现不依赖状态和属性的就则使用静态方法
    //总结：1.调用静态方法本质就是调用类方法，2.实例化调用本质是在调用对象的方法
//定义模型
class Service {

    page = 1
    count = 4
    data = []
    //是否还有更多值
    hasMoreData = true
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
    reset(){
        this.page = 1
        this.count = 4
        this.data = []
        this.hasMoreData = true
        //返回当前实例，这样的好处:返回当前实例，可以接着调用实例里面的方法，链式调用：service.reset().getServiceList()
        return this
    }

}
export default Service