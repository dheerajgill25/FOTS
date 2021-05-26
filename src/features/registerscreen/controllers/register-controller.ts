import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import StorageService from "libs/storage/Storage";
import HomeStack from "navigation/homestack";
import { LoadingAction } from "../../LoadingScreen/actions/LoadingAction";
import { RegisterAction } from "../actions/register.action";
import Toast from 'react-native-simple-toast';
class RegisterController {
    async reigsterUser(first_name: string, last_name: string, email: string, password: string, mobile: string, fireDepartmentId: string, fireStationId: string) {

        try {
            useAppDispatch(LoadingAction.showLoading(true));
            var formData: FormData = new FormData();
            formData.append("first_name", first_name);
            formData.append("last_name", last_name);
            formData.append("email", email);
            formData.append("mobile", mobile);
            formData.append("password", password);
            formData.append("fire_department", fireDepartmentId);
            formData.append("fire_station", fireStationId);
            const FIRESTATONURL = APIENDPOINTS.APIBASEURL + URL.REGISTER + `?key=${APIENDPOINTS.APIKEY}`
            const getRegister = await HttpCall.post(FIRESTATONURL, formData, true);
            const { data, status }:any = getRegister;
            const {message} = data;
            if (data.status&&status) {
                StorageService.setItem("user", JSON.stringify(data.data))
                useAppDispatch(RegisterAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false));
                HomeStack.navigate();
                Toast.showWithGravity(message||"Login success Welcome in FOTS", Toast.LONG, Toast.BOTTOM);
            } else {
                Toast.showWithGravity(message||"Please enter valid credentials", Toast.LONG, Toast.BOTTOM);
            }
        } catch (error) {
            useAppDispatch(LoadingAction.showLoading(false));
            console.log("error1doConfirm", error);
            const { message } = error;
            console.log(message)
        }

    }
}

const RegisterControllerInstance = new RegisterController();
export default RegisterControllerInstance;
