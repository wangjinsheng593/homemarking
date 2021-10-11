// components/tabs/tabs.js
Component({
    //开启多插槽的支持
    options:{
        multipleSlots:true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        tabs: {
            type: Array,
            value: []
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        currentTabIndex: 0

    },

    /**
     * 组件的方法列表
     */
    methods: {
        //列表头点击事件
        handleTabChange(event) {
            const index = event.currentTarget.dataset.index
            if (this.data.currentTabIndex = index) return
            this.setData({
                currentTabIndex: index
            })
            this.triggerEvent('change', { index })
        },
        handleTouchMove(event){
            //方向值 0,-1,1
            const direction = event.direction
            const currentTabIndex = this.data.currentTabIndex
            //下一个要显示的下标
            const targetTabIndex = currentTabIndex+direction
            //边界值判断
            if (targetTabIndex<0 || targetTabIndex>this.data.tabs.length-1) return
            const customEvent = {
                currentTarget:{
                    dataset:{
                        index:targetTabIndex
                    }
                }
            }
            this.handleTabChange(customEvent)
        },
    }

    // 1. 传入一个数组，按数组元素内容渲染我们的标签页面选项
    // 2.能够监听点击事件，并且通知使用组件的页面或者父组件，我们选择了什么
    // 通用组件
    // 父组件（页面）通过属性给自定义组件传递参数
    // 自定义组件通过自定义事件给父组件传递参数
})