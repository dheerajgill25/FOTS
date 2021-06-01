import EventType from "@libs/redux/action";


export class AddToCartAction extends EventType {
    static EVENT_NAME = '@AddToCart/ADDTOCART';
    static addToCartProducts(request:any) {
        return AddToCartAction.requestEvent(request);
    }
}