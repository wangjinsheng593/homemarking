// components/rating/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        count: {
            type: Number,
            value: 5
        },
        selected: {
            type: Number,
            value: 0
        },
        size: {
            type: String,
            value: '40'
        },
        defaultColor: {
            type: String,
            value: '#888888'
        },
        selectedColor: {
            type: String,
            value: '#f3d066'
        },
        icon: {
            type: String,
            value: "star"
        }

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})