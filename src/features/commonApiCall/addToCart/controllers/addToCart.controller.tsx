import CartScreen from "features/cart/Index";
import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import { AddToCartAction } from "../actions/addToCart.action";
import Toast from 'react-native-simple-toast';
class AddToCartController {
    async addToCartProducts(request:any) {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            const URLS = APIENDPOINTS.APIBASEURL+URL.ADDTOCART+`?key=${APIENDPOINTS.APIKEY}`;
            const addToCart= await HttpCall.post(URLS,request, true);
            const {data,status}:any = addToCart;
            const {message} = data;
            if(data.status&&status){
                useAppDispatch(AddToCartAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false));
                Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
                CartScreen.navigate();
            }else{
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

const AddToCartControllerInstance = new AddToCartController();
export default AddToCartControllerInstance;
