import EventType from "libs/redux/action";


export class UploadImageAction extends EventType {
    static EVENT_NAME = '@UploadImage/UPLOADIMAGE';
    static editProfileOnFoods(photo:any) {
        return UploadImageAction.requestSuccess(photo);
    }
}