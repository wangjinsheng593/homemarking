import serviceAction from "../../../../enum/service-ation";
import serviceStatus from "../../../../enum/service-status";
import { getDataSet } from "../../../../utils/utils";

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
            const action = getDataSet(event,'action')
            this.triggerEvent('update',{action})
        },
        handleEditService(){
            this.triggerEvent('edit')
        }

    }
})
