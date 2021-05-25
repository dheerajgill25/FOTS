import EventType from "libs/redux/action";


export class FireDepartmentAction extends EventType {
    static EVENT_NAME = '@FireDepartment/FIREDEPARTMENT';
    static fireDepartment() {
        return FireDepartmentAction.requestSuccess();
    }
}