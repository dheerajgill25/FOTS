import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import { LoadingAction } from "../../LoadingScreen/actions/LoadingAction";
import TokenControllerInstance from "./token.controller";
import Toaster from "features/commonApiCall/toaster";
class ForgotPasswordController {
    async forgotUserPassword(email: string) {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            var formData: FormData = new FormData();
            formData.append("email", email);
            const FORGOTURL = APIENDPOINTS.APIBASEURL + URL.FORGOT + `?key=${APIENDPOINTS.APIKEY}`
            const getSignIn = await HttpCall.post(FORGOTURL, formData, true);
            const { data, status, }: any = getSignIn;
            const {message} = data;
            if (data.status && status) {
                useAppDispatch(LoadingAction.showLoading(false));
                TokenControllerInstance.setInitialTokens();
                Toaster.show("Reset password link has been sent it to your email",6000)
            } else {
                Toaster.show(message||"Please enter valid credentials")
                useAppDispatch(LoadingAction.showLoading(false));
            }
            useAppDispatch(LoadingAction.showLoading(false));
        } catch (err) {
            useAppDispatch(LoadingAction.showLoading(false));
            console.log("error1doConfirm", err);

        }

    }
    
}

const ForgotPasswordControllerInstance = new ForgotPasswordController();
export default ForgotPasswordControllerInstance;
