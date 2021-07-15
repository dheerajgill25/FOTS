import Toaster from "features/commonApiCall/toaster";
import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import { FaqAction } from "../actions/faq.action";
class FaqController {
    async getFaq() {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            const URLS = APIENDPOINTS.APIBASEURL + URL.FAQ + `?key=${APIENDPOINTS.APIKEY}`;
            const count = await HttpCall.post(URLS, {}, true);
            const { data, status }: any = count;
            const { message } = data;
            if (data.status && status) {
                useAppDispatch(FaqAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false));
            } else {
                useAppDispatch(LoadingAction.showLoading(false));
                Toaster.show(message);;
            }
        } catch (error) {
            useAppDispatch(LoadingAction.showLoading(false));
            console.log("error1doConfirm", error);
            const { message } = error;
            console.log(message)
        }

    }
}

const FaqControllerInstance = new FaqController();
export default FaqControllerInstance;
