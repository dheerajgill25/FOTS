import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import { LoadingAction } from "../../LoadingScreen/actions/LoadingAction";
import { FireDepartmentAction } from "../actions/fireDepartment.action";
class FireDepartmentController {
    async getFireDepartment(id?: any) {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            var formData: FormData = new FormData();
            formData.append("state_id", id || "")
            const FIREDEPARTMENTURL = APIENDPOINTS.APIBASEURL + URL.FIREDEPARTMENT + `?key=${APIENDPOINTS.APIKEY}`
            const getData = await HttpCall.post(FIREDEPARTMENTURL, formData, false);
            const { data } = getData;
            useAppDispatch(FireDepartmentAction.requestSuccess(data));
            useAppDispatch(LoadingAction.showLoading(false))
        } catch (error) {
            useAppDispatch(LoadingAction.showLoading(false));
            console.log("error1doConfirm", error);
            const { message } = error;
            console.log(message)
        }

    }
}

const FireDepartmentControllerInstance = new FireDepartmentController();
export default FireDepartmentControllerInstance;
