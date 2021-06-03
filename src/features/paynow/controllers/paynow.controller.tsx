import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import ThankYouScreen from "features/thankyou/Index";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import Toast from 'react-native-simple-toast';
class PayNowController {
    async paynowProducts(stateId: any, fdId: any, fsID: any, date: any, paymentMethod?: any, pId?: any) {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            var formData: FormData = new FormData();
            formData.append('state_id', stateId);
            formData.append('fire_department_id', fdId);
            formData.append('fire_station_id', fsID);
            formData.append('delivery_date', date);
            formData.append('payment_method', paymentMethod||"");
            formData.append('payment_id', pId||"");
            const URLS = APIENDPOINTS.APIBASEURL + URL.ORDER + `?key=${APIENDPOINTS.APIKEY}`;
            const orderNow = await HttpCall.post(URLS, formData, true);
            const { data, status }: any = orderNow;
            const { message } = data;
            if (data.status && status) {
                useAppDispatch(LoadingAction.showLoading(false));
                Toast.showWithGravity("Your order has been placed", Toast.LONG, Toast.BOTTOM);
                ThankYouScreen.navigate()
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

const PayNowControllerInstance = new PayNowController();
export default PayNowControllerInstance;
