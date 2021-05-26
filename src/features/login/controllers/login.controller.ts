import AsyncStorage from "@react-native-async-storage/async-storage";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import StorageService from "libs/storage/Storage";
import HomeStack from "navigation/homestack";
import { LoadingAction } from "../../LoadingScreen/actions/LoadingAction";
import { SignInAction } from "../action/login.action";
import Login from "../Index";
import Toast from 'react-native-simple-toast';
import TokenControllerInstance from "./token.controller";
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
                StorageService.setItem("user", JSON.stringify(data.data))
                StorageService.setItem("token", data.token)
                useAppDispatch(SignInAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false));
                TokenControllerInstance.setInitialTokens();
                //HomeStack.navigate();
                Toast.showWithGravity(message||"Login success Welcome in FOTS", Toast.LONG, Toast.BOTTOM);
            } else {
                Toast.showWithGravity(message||"Please enter valid credentials", Toast.LONG, Toast.BOTTOM);
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
