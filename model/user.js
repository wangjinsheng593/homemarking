
class User {
    static getUserInfoByLocal(){
        return wx.getStorageSync('user-info')
    }

}
export default User