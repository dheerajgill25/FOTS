import EventType from "@libs/redux/action";


export class CartCountAction extends EventType {
    static EVENT_NAME = '@CartCount/CARTCOUNT';
    static getCartCount(data:any) {
        return CartCountAction.requestSuccess(data);
    }
}