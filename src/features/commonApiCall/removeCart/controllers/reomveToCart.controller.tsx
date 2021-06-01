import CartListControllerInstance from "features/cart/httpCall/controllers/cartList.controller";
import CartScreen from "features/cart/Index";
import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import Toast from 'react-native-simple-toast';
class RemoveCartController {
    async RemoveCartProducts(id:any) {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            var formData:FormData = new FormData();
            formData.append("cart_id",id);
            const URLS = APIENDPOINTS.APIBASEURL+URL.REMOVECART+`?key=${APIENDPOINTS.APIKEY}`;
            const removeCart= await HttpCall.post(URLS,formData, true);
            const {data,status}:any = removeCart;
            const {message} = data;
            if(data.status&&status){
                useAppDispatch(LoadingAction.showLoading(false));
                Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
                CartListControllerInstance.getCartProducts();
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

const RemoveCartControllerInstance = new RemoveCartController();
export default RemoveCartControllerInstance;
