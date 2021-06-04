import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import { LoadingAction } from "../../LoadingScreen/actions/LoadingAction";
import { FireStationAction } from "../actions/fireStation.action";
class FireStationController {
    async getFireStation(id:any) {
        console.log(id)
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            var formData:FormData = new FormData();
            formData.append("fire_department_id",id);
            const FIRESTATONURL = APIENDPOINTS.APIBASEURL+URL.FIRESTATION+`?key=${APIENDPOINTS.APIKEY}`
            const getStatus = await HttpCall.post(FIRESTATONURL,formData, true);
            const { data} = getStatus;
            useAppDispatch(FireStationAction.requestSuccess(data));
            useAppDispatch(LoadingAction.showLoading(false))
        } catch (error) {
            useAppDispatch(LoadingAction.showLoading(false));
            console.log("error1doConfirm", error);
            const { message } = error;
            console.log(message)
        }

    }
}

const FireStationControllerInstance = new FireStationController();
export default FireStationControllerInstance;
