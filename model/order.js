import Http from "../utils/http";


class Order {
    static createOrder(serviceId,address){
        return Http.request({
            url:'v1/order',
            data:{
                service_id:serviceId,
                address:address
            },
            method:"POST"
        })
    }
}
export default Order