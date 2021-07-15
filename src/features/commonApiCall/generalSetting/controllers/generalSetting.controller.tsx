import Toaster from "features/commonApiCall/toaster";
import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import Toast from 'react-native-simple-toast';
import { GeneralSettingAction } from "../actions/generalSetting.action";
class GeneralSettingController {
    async generalSetting() {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            const URLS = APIENDPOINTS.APIBASEURL + URL.GENERALSETTING + `?key=${APIENDPOINTS.APIKEY}`;
            const generalSetting = await HttpCall.post(URLS, {}, true);
            const { data, status }: any = generalSetting;
            const { message } = data;
            if (data.status && status) {
                useAppDispatch(GeneralSettingAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false));
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

const GeneralSettingControllerInstance = new GeneralSettingController();
export default GeneralSettingControllerInstance;
