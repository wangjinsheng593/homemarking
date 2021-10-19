//基类--基础信息类
class Base {
    page = 1
    count = 4
    data = []
    //是否还有更多值
    hasMoreData = true

    reset() {
        this.page = 1
        this.count = 4
        this.data = []
        this.hasMoreData = true
        //返回当前实例，这样的好处:返回当前实例，可以接着调用实例里面的方法，链式调用
        return this
    }

}

export default Base