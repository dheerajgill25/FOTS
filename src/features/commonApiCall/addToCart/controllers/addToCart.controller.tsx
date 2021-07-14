import CartScreen from "features/cart/Index";
import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import { AddToCartAction } from "../actions/addToCart.action";
import Toast from 'react-native-simple-toast';
import CartCountControllerInstance from "features/commonApiCall/cartCount/controllers/cartCount.controller";
import Snackbar from "react-native-snackbar";
import { FontFamilyFoods } from "components/typography/Typography";
class AddToCartController {
    async addToCartProducts(request: any, name: string, callback: (success: boolean, msg?: string) => void, productScreen?: boolean) {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            const URLS = APIENDPOINTS.APIBASEURL + URL.ADDTOCART + `?key=${APIENDPOINTS.APIKEY}`;
            const addToCart = await HttpCall.post(URLS, request, true);
            const { data, status }: any = addToCart;
            const { message, popup } = data;
            if (data.status && status) {
                useAppDispatch(AddToCartAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false));
                // Toast.showWithGravity(name + " " + "has been added to your cart", 10000, Toast.BOTTOM);
                Snackbar.show({
                    text:name + " " + "has been added to your cart",
                    backgroundColor:'black',
                    fontFamily:FontFamilyFoods.POPPINSMEDIUM,
                    duration:3000
                })
                CartCountControllerInstance.getCartCount();
                callback(false)
                if (!productScreen){
                    CartScreen.navigate();
                }
            } else if (popup) {
                callback(popup, message);
                const _data = { popup, message }
                useAppDispatch(AddToCartAction.requestSuccess(_data));
                useAppDispatch(LoadingAction.showLoading(false));
                //Toast.showWithGravity("Your cart has another product, do you want to discard the previous selection and add new product?", Toast.LONG, Toast.BOTTOM);
            }
            else {
                useAppDispatch(LoadingAction.showLoading(false));
                Snackbar.show({
                    text:message,
                    backgroundColor:'black',
                    fontFamily:FontFamilyFoods.POPPINSMEDIUM,
                    duration:3000
                })
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
