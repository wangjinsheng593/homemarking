

import Http from "../utils/http"
//定义模型
class Service {
    /**
     * 分页获取服务列表
     * @param page 页码
     * @param count 每页数量
     * @param category_id 分类id
     * @param type 服务类型
     */
    async getServiceList(page,count,category_id=null,type=null){
       return   Http.request({url:'v1/service/list',data:{page,count}})
    }
}
export default Service