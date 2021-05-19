import EventType from "libs/redux/action";

export class LoadingAction extends EventType {
    static EVENT_NAME = '@Loading/LOADING';

    static showLoading(loading:boolean) {
        return LoadingAction.requestSuccess({loading:loading});
    }
}
