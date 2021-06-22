import CartListControllerInstance from "features/cart/httpCall/controllers/cartList.controller";
import CartCountControllerInstance from "features/commonApiCall/cartCount/controllers/cartCount.controller";
import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import OrderScreen from "features/orderScreen/Index";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import Toast from 'react-native-simple-toast';
class RemoveCartController {
    async RemoveCartProducts(id: any, product_id: any, type?: string,cId?:any) {
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
                if (type == 'meal') {
                    CartListControllerInstance.getCartProducts()
                    return
                } else {
                   OrderScreen.navigate(cId)
                }
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
    async removeProductSuccess() {
        return true;
    }
    async RemoveCartAllProducts(categoryId?:any) {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            const URLS = APIENDPOINTS.APIBASEURL + URL.REMOVEALLPRODUCT + `?key=${APIENDPOINTS.APIKEY}`;
            const removeCart = await HttpCall.post(URLS, {}, true);
            const { data, status }: any = removeCart;
            const { message } = data;
            if (data.status && status) {
                CartCountControllerInstance.getCartCount();
                useAppDispatch(LoadingAction.showLoading(false));
                Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
                OrderScreen.navigate(categoryId)
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
const RemoveCartControllerInstance = new RemoveCartController();
export default RemoveCartControllerInstance;
