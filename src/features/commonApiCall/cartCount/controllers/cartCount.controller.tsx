import CartScreen from "features/cart/Index";
import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import Toast from 'react-native-simple-toast';
import { CartListAction } from "features/cart/httpCall/actions/cartList.action";
class CartCountController {
    async getCartCount() {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            const URLS = APIENDPOINTS.APIBASEURL + URL.CARTCOUNT + `?key=${APIENDPOINTS.APIKEY}`;
            const count = await HttpCall.post(URLS, {}, true);
            const { data, status }: any = count;
            const { message } = data;
            if (data.status && status) {
                useAppDispatch(CartListAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false));
            } else {
                useAppDispatch(LoadingAction.showLoading(false));
                Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
            }
        } catch (error) {
            useAppDispatch(LoadingAction.showLoading(false));
            console.log("error1doConfirm", error);
            const { message } = error;
            console.log(message)
        }

    }
}

const CartCountControllerInstance = new CartCountController();
export default CartCountControllerInstance;
