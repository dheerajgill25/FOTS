import EventType from "@libs/redux/action";


export class CartListAction extends EventType {
    static EVENT_NAME = '@CartList/CARTLIST';
    static getCartProducts() {
        return CartListAction.requestSuccess();
    }
}