import AsyncStorage from "@react-native-async-storage/async-storage";
import CartListControllerInstance from "features/cart/httpCall/controllers/cartList.controller";
import CartCountControllerInstance from "features/commonApiCall/cartCount/controllers/cartCount.controller";
import Toaster from "features/commonApiCall/toaster";
import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import OrderScreen from "features/orderScreen/Index";
import ProductScreen from "features/products/Index";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import Toast from 'react-native-simple-toast';
class RemoveCartController {
    async RemoveCartProducts(id: any, product_id: any, type?: string, cId?: any, length?: any) {
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
                Toaster.show(message);
                CartCountControllerInstance.getCartCount();
                if (type == 'meal') {
                    if (length == 0) {
                        OrderScreen.navigate(cId)
                    } else {
                        CartListControllerInstance.getCartProducts()
                        return
                    }
                } else {
                    OrderScreen.navigate(cId)
                }
            } else {
                useAppDispatch(LoadingAction.showLoading(false));
                Toaster.show(message);
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
                Toaster.show(message);
            } else {
                useAppDispatch(LoadingAction.showLoading(false));
                Toaster.show(message);
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
    async RemoveCartAllProducts(categoryId?: any, mealId?: any, type?: string) {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            const URLS = APIENDPOINTS.APIBASEURL + URL.REMOVEALLPRODUCT + `?key=${APIENDPOINTS.APIKEY}`;
            const removeCart = await HttpCall.post(URLS, {}, true);
            const { data, status }: any = removeCart;
            const { message } = data;
            if (data.status && status) {
                CartCountControllerInstance.getCartCount();
                useAppDispatch(LoadingAction.showLoading(false));
                Toaster.show(message);
                if (type == 'meal') {
                    ProductScreen.navigate(categoryId, mealId, true);
                } else {
                    OrderScreen.navigate(categoryId);
                }
            } else {
                useAppDispatch(LoadingAction.showLoading(false));
                Toaster.show(message);
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
