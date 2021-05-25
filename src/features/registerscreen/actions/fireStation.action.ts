import EventType from "libs/redux/action";


export class FireStationAction extends EventType {
    static EVENT_NAME = '@FireStation/FIRESTATIONS';
    static fireStation() {
        return FireStationAction.requestSuccess();
    }
}