import AsyncStorage from "@react-native-async-storage/async-storage";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import StorageService from "libs/storage/Storage";
import { LoadingAction } from "../../LoadingScreen/actions/LoadingAction";
import { SignInAction } from "../action/login.action";
import Toast from 'react-native-simple-toast';
import TokenControllerInstance from "./token.controller";
import AnalyticsFunction from "behaviour/analytics/AnalyticsService";
import Snackbar from "react-native-snackbar";
import { FontFamilyFoods } from "components/typography/Typography";
import Toaster from "features/commonApiCall/toaster";
class SignInController {
    async loginUser(email: string, password: string) {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            var formData: FormData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            const LOGINURL = APIENDPOINTS.APIBASEURL + URL.LOGIN + `?key=${APIENDPOINTS.APIKEY}`
            const getSignIn = await HttpCall.post(LOGINURL, formData, true);
            const { data, status, }: any = getSignIn;
            const {message} = data;
            if (data.status && status) {
                StorageService.setItem("user", JSON.stringify(data.data));
                StorageService.setItem("token", data.token);
                AnalyticsFunction.functionSetUserId(JSON.stringify(data.data.id));
                useAppDispatch(SignInAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false));
                TokenControllerInstance.setInitialTokens();
                Toaster.show("Login success Welcome in FOTS")
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
    async signout() {
        AsyncStorage.removeItem('token');
        StorageService.clearStorage();
        AsyncStorage.clear();
        TokenControllerInstance.setInitialTokens();
        useAppDispatch(SignInAction.requestClear());
    }
}

const SignInControllerInstance = new SignInController();
export default SignInControllerInstance;
