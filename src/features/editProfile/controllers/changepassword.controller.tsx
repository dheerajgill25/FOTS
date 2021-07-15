import Toaster from "features/commonApiCall/toaster";
import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import EditProfile from "../Index";
class ChangePasswordController {
    async ChangePassword(currentPassword: string, password: string, confirmPassword: string) {
        try {
            var formData: FormData = new FormData();
            formData.append("current_password", currentPassword);
            formData.append("password", password);
            formData.append("confirm_password", confirmPassword);
            useAppDispatch(LoadingAction.showLoading(true));
            const URLS = APIENDPOINTS.APIBASEURL + URL.CHANGEPASSWORD + `?key=${APIENDPOINTS.APIKEY}`;
            const changePassword = await HttpCall.post(URLS, formData, true);
            const { data, status }: any = changePassword;
            const { message } = data;
            if (data.status && status) {
                useAppDispatch(LoadingAction.showLoading(false));
                Toaster.show(message);;
                EditProfile.navigate();
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

const ChangePasswordControllerInstance = new ChangePasswordController();
export default ChangePasswordControllerInstance;
