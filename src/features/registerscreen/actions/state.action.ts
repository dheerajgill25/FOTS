import EventType from "libs/redux/action";


export class StateAction extends EventType {
    static EVENT_NAME = '@State/STATE';
    static getStateAction() {
        return StateAction.requestSuccess();
    }
}