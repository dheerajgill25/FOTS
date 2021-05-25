import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import { LoadingAction } from "../../LoadingScreen/actions/LoadingAction";
import { StateAction } from "../actions/state.action";
class StateController {
    async getState() {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            const STATEURL = APIENDPOINTS.APIBASEURL+URL.STATE+`?key=${APIENDPOINTS.APIKEY}`;
            const getState = await HttpCall.post(STATEURL,{}, true);
            const {data} = getState;
            useAppDispatch(StateAction.requestSuccess(data));
            useAppDispatch(LoadingAction.showLoading(false))
        } catch (error) {
            useAppDispatch(LoadingAction.showLoading(false));
            console.log("error1doConfirm", error);
            const { message } = error;
            console.log(message)
        }

    }
}

const StateControllerInstance = new StateController();
export default StateControllerInstance;
