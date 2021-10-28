import serviceType from "../../enum/service-type";
import {
    getEventParam,
    getDataSet
} from "../../utils/utils"
import Category from "../../model/category"
const moment= require("../../lib/moment")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        form: Object,
    },
    //监听数据
    // observers: {
    //     form: function (newValue) {
    //         if (!newValue) return
    //         this._init()
    //     }
    // },

    /**
     * 组件的初始数据
     */
    data: {
        typeList: [{
                id: serviceType.PROVIDE,
                name: "提供服务"
            },
            {
                id: serviceType.SEEK,
                name: "找服务"
            }
        ],
        typePickerIndex: null,
        categoryList: [],
        categoryPickerIndex: null,
        formData: {
            type: null,
            title: '',
            category_id: null,
            cover_image_id: null,
            description: '',
            designated_place: false,
            begin_date: '',
            end_date: '',
            price: ''
        },
        rules: [{
                name: 'type',
                rules: {
                    required: true,
                    message: '请指定服务类型'
                },
            },
            {
                name: 'title',
                rules: [{
                        required: true,
                        message: '服务标题内容不能为空'
                    },
                    {
                        minlength: 5,
                        message: '服务描述内容不能少于 5 个字'
                    },
                ],
            },
            {
                name: 'category_id',
                rules: {
                    required: true,
                    message: '未指定服务所属分类'
                },
            },
            {
                name: 'cover_image_id',
                rules: {
                    required: true,
                    message: '请上传封面图'
                },
            },
            {
                name: 'description',
                rules: [{
                        required: true,
                        message: '服务描述不能为空'
                    },
                    {
                        minlength: 20,
                        message: '服务描述内容不能少于 20 个字'
                    },
                ],
            },
            {
                name: 'begin_date',
                rules: [{
                    required: true,
                    message: '请指定服务有效日期开始时间'
                }, ],
            },
            {
                name: 'end_date',
                rules: [{
                        required: true,
                        message: '请指定服务有效日期结束时间'
                    },
                    {
                        validator: function (rule, value, param, models) {
                            if (moment(value).isSame(models.begin_date) || moment(value).isAfter(models.begin_date)) {
                                return null
                            }
                            return '结束时间必须大于开始时间'
                        }
                    }
                ],

            },
            {
                name: 'price',
                rules: [{
                        required: true,
                        message: '请指定服务价格'
                    },
                    {
                        validator: function (rule, value, param, models) {
                            const pattern = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/
                            const isNum = pattern.test(value);

                            if (isNum) {
                                return null
                            }
                            return '价格必须是数字'
                        }
                    },
                    {
                        min: 1,
                        message: '天下没有免费的午餐'
                    },
                ],
            },
        ],
        error: null,
        //是否显示表达--重置表单校验
        showForm:true,
        resetForm:true,
        serviceTypeEnum:serviceType
    },
    //组件的生命周期函数
    pageLifetimes:{
        show(){
            if (this.data.resetForm) {
                this._init(this.data.form)
            }
            //初始化
            this.data.resetForm = true
        },
        hide(){
            if (this.data.resetForm) {
                this.setData({showForm:false})
            }
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //初始化方法
        async _init(form) {
            const typePickerIndex = this.data.typeList.findIndex(item => form.type === item.id)
            const categoryList = await Category.getCategoryList()
            const categoryPickerIndex = categoryList.findIndex(item => form.category_id === item.id)
            this.setData({
                showForm:true,
                typePickerIndex: typePickerIndex !== -1 ? typePickerIndex : null,
                categoryPickerIndex: categoryPickerIndex !== -1 ? categoryPickerIndex : null,
                categoryList,
                files: form.cover_image ? [form.cover_image] : [],
                //深拷贝，浅拷贝
                formData: {
                    type: form.type,
                    title: form.title,
                    category_id: form.category_id,
                    cover_image_id: form.cover_image ? form.cover_image.id : null,
                    description: form.description,
                    designated_place: form.designated_place,
                    begin_date: form.begin_date,
                    end_date: form.end_date,
                    price: form.price
                }
            })
        },

        //提交
        handleSubmit() {
            this.selectComponent('#formData').validate( (valid, errors) => {
                if (!valid) {
                    const errMsg = errors.map(error => error.message)
                    this.setData({
                        error: errMsg.join(';')
                    })
                    return
                }
                this.triggerEvent('submit', {
                    formData: this.data.formData
                })
            })
        },


        //发布类型
        handleTypeChange(event) {
            const index = getEventParam(event, 'value')
            this.setData({
                typePickerIndex: index,
                ['formData.type']: this.data.typeList[index].id
            })
        },

        //输入框
        handleInput(event) {
            const value = getEventParam(event, 'value')
            const field = getDataSet(event, 'field')
            this.setData({
                [`formData.${field}`]: value
            })
        },

        //所属分类
        handleCategoryChange(event) {
            const index = getEventParam(event, 'value')
            this.setData({
                categoryPickerIndex: index,
                ["formData.category_id"]: this.data.categoryList[index].id
            })
        },

        //提供地点
        handleSwitchChange(event) {
            const res = getEventParam(event, "value")
            this.setData({
                ["formData.designated_place"]: res
            })
        },

        //开始时间
        handleBeginDateChange(event) {
            const beginDate = getEventParam(event, 'value')
            this.setData({
                ['formData.begin_date']: beginDate
            })

        },

        //结束时间
        handleEndDateChange(event) {
            const endDate = getEventParam(event, 'value')
            this.setData({
                ['formData.end_date']: endDate
            })
        },

        //上传图片
        handleUploadSuccess(event) {
            const id = event.detail.files[0].id
            this.setData({
                ['formData.cover_image_id']: id
            })
        },

        handleHide(){
            this.data.resetForm = false
        }




    }
})