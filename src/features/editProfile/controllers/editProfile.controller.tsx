import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import StorageService from "libs/storage/Storage";
import { LoadingAction } from "../../LoadingScreen/actions/LoadingAction";
import Toast from 'react-native-simple-toast';
import { EditProfileAction } from "../actions/editProfile.action";
class EditProfileController {
    async updateProfile(first_name: string, last_name: string,mobile: string, fireDepartmentId: string, fireStationId: string) {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            var formData: FormData = new FormData();
            formData.append("first_name", first_name);
            formData.append("last_name", last_name);
            formData.append("mobile", mobile);
            formData.append("fire_department", fireDepartmentId);
            formData.append("fire_station", fireStationId);
            const URLS = APIENDPOINTS.APIBASEURL + URL.PROFILE + `?key=${APIENDPOINTS.APIKEY}`
            const getProfile = await HttpCall.post(URLS, formData, true);
            const { data, status }:any = getProfile;
            const {message} = data;
            if (data.status&&status) {
                StorageService.setItem("user", JSON.stringify(data.data))
                useAppDispatch(EditProfileAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false));
                Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
            } else {
                const {mobile,email} = message;
                useAppDispatch(LoadingAction.showLoading(false));
                Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
               
            }
        } catch (error) {
            useAppDispatch(LoadingAction.showLoading(false));
            console.log("error1doConfirm", error);
            const { message } = error;
            useAppDispatch(LoadingAction.requestError(message));
            console.log(message)
        }

    }
}

const EditProfileControllerInstance = new EditProfileController();
export default EditProfileControllerInstance;
