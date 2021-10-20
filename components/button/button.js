// components/button/button.js
Component({
    // 外部样式类
    externalClasses: ['i-button-class', 'i-button-special-class'],
    /**
     * 组件的属性列表
     */
    properties: {
        // 调用指定的开放能力
        openType: String,
        // 是否镂空
        plain: {
            type: Boolean,
            value: false
        },
        // 按钮背景色
        bgColor: {
            type: String,
            value: "#f3d066"
        },
        // 字体颜色
        fontColor: {
            type: String,
            value: '#333333'
        },
        // 按钮宽度
        width: String,
        // 按钮高度
        height: String,
        // 按钮图标
        icon: String,
        // 按钮图标颜色
        iconColor: {
            type: String,
            value: '#333333'
        },
        // 按钮圆角半径
        radius: {
            type: String,
            value: 0
        },
        // 按钮形状：square 方的，circle 圆角的，semicircle 半圆
        shape: {
            type: String,
            value: 'square'
        },
        // 是否显示特殊样式
        special: Boolean,
        // 按钮大小，三挡可选，mini、medium、long
        size: {
            type: String,
            value: 'medium'
        },
        // 是否显示边框
        border: Boolean

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
        handleOpenData: function (event) {
            this.triggerEvent(event.type, event.detail);
        }

    }
})