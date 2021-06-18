import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import Toast from 'react-native-simple-toast';
import MyAccount from "features/myaccount/Index";
class RatingController {
    async rateProduct(orderId:string,productId:string,productRating:string,review:string) {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            var formData:FormData = new FormData();
            formData.append("order_id",orderId||"");
            formData.append("product_id",productId||"");
            formData.append("rating",productRating||"");
            formData.append("review",review.trim()||"");
            const URLS = APIENDPOINTS.APIBASEURL + URL.RATEING + `?key=${APIENDPOINTS.APIKEY}`;
            const rating = await HttpCall.post(URLS, formData, true);
            const { data, status }: any = rating;
            const {message} = data;
            if (data.status && status) {
                Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
                useAppDispatch(LoadingAction.showLoading(false));
                MyAccount.navigate()
            } 
            else {
                useAppDispatch(LoadingAction.showLoading(false));
                Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
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

const RatingControllerInstance = new RatingController();
export default RatingControllerInstance;
