import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "features/home/Index";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import StorageService from "libs/storage/Storage";
import HomeStack from "navigation/homestack";
import { LoadingAction } from "../../LoadingScreen/actions/LoadingAction";
import { SignInAction } from "../action/login.action";
import Login from "../Index";
class SignInController {
    async loginUser(email: string, password: string) {

        try {
            useAppDispatch(LoadingAction.showLoading(true));
            var formData: FormData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            const LOGINURL = APIENDPOINTS.APIBASEURL + URL.LOGIN + `?key=${APIENDPOINTS.APIKEY}`
            const getSignIn = await HttpCall.post(LOGINURL, formData, true);
            const { data, status }: any = getSignIn;
            if (data.status && status) {
                StorageService.setItem("user", JSON.stringify(data.data))
                StorageService.setItem("token", data.token)
                useAppDispatch(SignInAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false));
                HomeStack.navigate();
            }
            useAppDispatch(LoadingAction.showLoading(false));
        } catch (error) {
            useAppDispatch(LoadingAction.showLoading(false));
            console.log("error1doConfirm", error);
            const { message } = error;
            console.log(message)
        }

    }
    async setInitialToken() {
        const token = await AsyncStorage.getItem("token");
        return token;
    }
    async signout() {
        StorageService.clearStorage();
        useAppDispatch(SignInAction.requestClear());
        Login.navigate();
    }
}

const SignInControllerInstance = new SignInController();
export default SignInControllerInstance;
