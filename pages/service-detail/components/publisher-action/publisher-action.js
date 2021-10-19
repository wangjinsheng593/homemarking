import serviceAction from "../../../../enum/service-ation";
import serviceStatus from "../../../../enum/service-status";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        service:Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        serviceStatusEnum:serviceStatus,
        serviceActionEnum:serviceAction
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleUpdateStatus(event){
            console.log("更新状态：",event);
        },
        handleEditService(event){
            console.log("修改服务：",event);
        }

    }
})
