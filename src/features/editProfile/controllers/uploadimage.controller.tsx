import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import Toast from 'react-native-simple-toast';
import { UploadImageAction } from "../actions/uploadImage.action";
class UploadImageController {
    async uploadImage(photo: any) {
        try {
            var formData: FormData = new FormData();
            formData.append('image', photo)
            useAppDispatch(LoadingAction.showLoading(true));
            const URLS = APIENDPOINTS.APIBASEURL + URL.UPLOADIMAGE + `?key=${APIENDPOINTS.APIKEY}`;
            const image = await HttpCall.post(URLS, formData, true);
            const { data, status }: any = image;
            const { message } = data;
            if (data.status && status) {
                useAppDispatch(UploadImageAction.requestSuccess(data));
                AsyncStorage.getItem("user").then((val: any) => {
                    const currentUser = JSON.parse(val);
                    currentUser.profile_photo_path = data?.data;
                    AsyncStorage.setItem('user', JSON.stringify(currentUser));
                }).catch((eror) => console.log(eror))
                useAppDispatch(LoadingAction.showLoading(false));
                Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
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

const UploadImageControllerInstance = new UploadImageController();
export default UploadImageControllerInstance;
