import EventType from "libs/redux/action";


export class RegisterAction extends EventType {
    static EVENT_NAME = '@Register/REGISTER';
    static registerOnFoods(first_name: string, last_name: string, email: string, password: string, mobile: string, fireDepartmentId: string, fireStationId: string) {
        return RegisterAction.requestEvent({ ...{ first_name, last_name, email, password, mobile, fireDepartmentId, fireStationId } });
    }
}