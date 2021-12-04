// pages/conversation/components/service-link/service-link.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        flow:String,
        service:Object

    },
    lifetimes:{
        attached(){
            console.log("this.data.service:",this.data.service);
            this.setData({
                _service:JSON.parse(this.data.service)
            })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        _service:null,
        flowEnum:{
            IN:'in',
            OUT:'out'
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //发送链接
        handleSendLink(){
            this.triggerEvent('send',{service:this.data._service})
        },
        //查看链接
        handleSelect(){
            this.triggerEvent('select',{service:this.data._service})
        }

    }
})
