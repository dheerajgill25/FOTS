import CartScreen from "features/cart/Index";
import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import { AddToCartAction } from "../actions/addToCart.action";
import CartCountControllerInstance from "features/commonApiCall/cartCount/controllers/cartCount.controller";
import Toaster from "features/commonApiCall/toaster";
import CheckOutControllerInstance from "features/commonApiCall/checkout/controllers/checkout.controller";
class AddToCartController {
    async addToCartProducts(request: any, name: string, callback: (success: boolean, msg?: string) => void, productScreen?: boolean,categoryName?:string) {
        console.log("categoryName-----",categoryName)
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            const URLS = APIENDPOINTS.APIBASEURL + URL.ADDTOCART + `?key=${APIENDPOINTS.APIKEY}`;
            const addToCart = await HttpCall.post(URLS, request, true);
            const { data, status }: any = addToCart;
            const { message, popup } = data;
            if (data.status && status) {
                useAppDispatch(AddToCartAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false));
                Toaster.show(name + " " + "has been added to your cart");
                CartCountControllerInstance.getCartCount();
                callback(false)
                if (!productScreen && categoryName !=='Farm to Firehouse'){
                    CartScreen.navigate();
                }else if(categoryName=='Farm to Firehouse'){
                    CheckOutControllerInstance.Checkout();
                }
            } else if (popup) {
                callback(popup, message);
                const _data = { popup, message }
                useAppDispatch(AddToCartAction.requestSuccess(_data));
                useAppDispatch(LoadingAction.showLoading(false));}
            else {
                useAppDispatch(LoadingAction.showLoading(false));
                Toaster.show(message)
            }
            useAppDispatch(LoadingAction.showLoading(false));
        } catch (error) {
            useAppDispatch(LoadingAction.showLoading(false));
            console.log("error1doConfirm", error);
            const { message } = error;
            console.log(message)
        }

    }
}

const AddToCartControllerInstance = new AddToCartController();
export default AddToCartControllerInstance;
