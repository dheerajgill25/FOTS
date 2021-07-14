import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import { LoadingAction } from "../../LoadingScreen/actions/LoadingAction";
import { PopularProductAction } from "../action/popularProduct.action";
class PopularProductController {
    async getPopularProduct() {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            const URLS = APIENDPOINTS.APIBASEURL+URL.POPULARPRODUCT+`?key=${APIENDPOINTS.APIKEY}`;
            const getPopularProduct = await HttpCall.post(URLS,{}, true);
            const {data,status}:any = getPopularProduct;
            if(data.status&&status){
                useAppDispatch(LoadingAction.showLoading(false));
                useAppDispatch(PopularProductAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false))
            }else{
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

const PopularProductControllerInstance = new PopularProductController();
export default PopularProductControllerInstance;
