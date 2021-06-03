import EventType from "@libs/redux/action";


export class CheckoutAction extends EventType {
    static EVENT_NAME = '@Checkout/CHECKOUTCART';
    static checkoutCartProducts(data:any) {
        return CheckoutAction.requestSuccess(data);
    }
}