import Toaster from "features/commonApiCall/toaster";
import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import BeforePayNow from "features/paynow/Index";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import Toast from 'react-native-simple-toast';
import { CheckoutAction } from "../actions/checkout.action";
class CheckOutController {
    async Checkout(coupanCode?: string) {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            var formData: FormData = new FormData();
            formData.append("coupon_code", coupanCode?.trim() || "");
            const URLS = APIENDPOINTS.APIBASEURL + URL.CHECKOUT + `?key=${APIENDPOINTS.APIKEY}`;
            const checkout = await HttpCall.post(URLS, formData, true);
            const { data, status }: any = checkout;
            const { message } = data;
            if (data.status && status) {
                useAppDispatch(CheckoutAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false));
                BeforePayNow.navigate();
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

const CheckOutControllerInstance = new CheckOutController();
export default CheckOutControllerInstance;
