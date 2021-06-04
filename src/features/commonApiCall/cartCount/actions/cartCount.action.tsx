import EventType from "@libs/redux/action";


export class CartCountAction extends EventType {
    static EVENT_NAME = '@CartCount/CARTCOUNT';
    static getCartCount(request:any) {
        return CartCountAction.requestSuccess(request);
    }
}