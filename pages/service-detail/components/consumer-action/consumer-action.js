import serviceType from "../../../../enum/service-type";

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
        serviceTypeEnum:serviceType,

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleChat(event){
            console.log("handleChat:",event);
        },
        handleOrder(event){
            console.log("handleOrder:",event);
        }

    }
})
