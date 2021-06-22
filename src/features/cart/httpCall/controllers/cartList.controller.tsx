import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import { CartListAction } from "../actions/cartList.action";
class CartListController {
    async getCartProducts() {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            const URLS = APIENDPOINTS.APIBASEURL + URL.CARTLIST + `?key=${APIENDPOINTS.APIKEY}`;
            const addToCart = await HttpCall.post(URLS, {}, true);
            const { data, status }: any = addToCart;
            const { message } = data;
            if (data.status && status) {
                useAppDispatch(CartListAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false));
            } else {
                useAppDispatch(LoadingAction.showLoading(false));
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

const CartListControllerInstance = new CartListController();
export default CartListControllerInstance;
