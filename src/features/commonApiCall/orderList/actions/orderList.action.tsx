import EventType from "@libs/redux/action";


export class OrderListAction extends EventType {
    static EVENT_NAME = '@OrderList/ORDERLIST';
    static orderListOfProducts(data:any) {
        return OrderListAction.requestSuccess(data);
    }
}