import CartListControllerInstance from "features/cart/httpCall/controllers/cartList.controller";
import CartCountControllerInstance from "features/commonApiCall/cartCount/controllers/cartCount.controller";
import HomeScreen from "features/home/Index";
import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import HomeStack from "navigation/homestack";
import Toast from 'react-native-simple-toast';
let success: boolean = false;
class RemoveCartController {
    async RemoveCartProducts(id: any, product_id: any) {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            var formData: FormData = new FormData();
            formData.append("cart_id", id);
            formData.append("product_id", product_id);
            const URLS = APIENDPOINTS.APIBASEURL + URL.REMOVECART + `?key=${APIENDPOINTS.APIKEY}`;
            const removeCart = await HttpCall.post(URLS, formData, true);
            const { data, status }: any = removeCart;
            const { message } = data;
            if (data.status && status) {
                useAppDispatch(LoadingAction.showLoading(false));
                Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
                CartCountControllerInstance.getCartCount();
                HomeStack.navigate();
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
    async RemoveCartOtherProducts(id: any) {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            var formData: FormData = new FormData();
            formData.append("category_id", id);
            const URLS = APIENDPOINTS.APIBASEURL + URL.REMOVECARTOTHERPRODUCT + `?key=${APIENDPOINTS.APIKEY}`;
            const removeCart = await HttpCall.post(URLS, formData, true);
            const { data, status }: any = removeCart;
            const { message } = data;
            if (data.status && status) {
                useAppDispatch(LoadingAction.showLoading(false));
                Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
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
    async  removeProductSuccess() {
       return true;
    }
}
const RemoveCartControllerInstance = new RemoveCartController();
export default RemoveCartControllerInstance;
