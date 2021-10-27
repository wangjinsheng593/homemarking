import serviceType from "../../enum/service-type";
import {
    getEventParam,getDataSet
} from "../../utils/utils"
import Category from "../../model/category"
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        form: Object,

    },

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
        categoryList:[],
        categoryPickerIndex:null,
        formData:{
            type: null,
            title: '',
            category_id: null,
            cover_image_id: null,
            description: '',
            designated_place: false,
            begin_date: '',
            end_date: '',
            price: ''

        }

    },
    lifetimes: {
        attached() {
            this._init()
        }

    },

    /**
     * 组件的方法列表
     */
    methods: {
        //初始化方法
        async _init() {
            const typePickerIndex = this.data.typeList.findIndex(item => this.data.form.type === item.id)
            const categoryList =await Category.getCategoryList()
            const categoryPickerIndex = categoryList.findIndex(item=>this.data.form.category_id === item.id)
            this.setData({
                typePickerIndex: typePickerIndex !== -1 ? typePickerIndex : null,
                categoryPickerIndex: categoryPickerIndex !== -1 ? categoryPickerIndex : null,
                categoryList,
                //深拷贝，浅拷贝
                formData:{
                    type: this.data.form.type,
                    title: this.data.form.title,
                    category_id: this.data.form.category_id,
                    cover_image_id: this.data.form.cover_image ? this.data.form.cover_image.id : null,
                    description: this.data.form.description,
                    designated_place: this.data.form.designated_place,
                    begin_date: this.data.form.begin_date,
                    end_date: this.data.form.end_date,
                    price: this.data.form.price
                }
            })

        },

        //提交
        handleSubmit(){},


        //发布类型
        handleTypeChange(event){
            const index = getEventParam(event,'value')
            this.setData({
                typePickerIndex:index,
                ['formData.type']:this.data.typeList[index].id
            })
        },

        //输入框
        handleInput(event){
            const value = getEventParam(event,'value')
            const field = getDataSet(event,'field')
            this.setData({
                [`formData.${field}`]:value
            })
        },
         
        //所属分类
        handleCategoryChange(event){
            const index = getEventParam(event,'value')
            this.setData({
                categoryPickerIndex:index,
                ["formData.category_id"]:this.data.categoryList[index].id
            })
        },

        //提供地点
        handleSwitchChange(event){
            const res = getEventParam(event,"value")
            this.setData({
                ["formData.designated_place"]:res
            })
        },
        
        //开始时间
        handleBeginDateChange(event){
            const beginDate = getEventParam(event,'value')
            this.setData({
                ['formData.begin_date']:beginDate
            })

        },
         
        //结束时间
        handleEndDateChange(event){
            const endDate = getEventParam(event,'value')
            this.setData({
                ['formData.end_date']:endDate
            })
        }




    }
})