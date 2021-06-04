import EventType from "libs/redux/action";


export class EditProfileAction extends EventType {
    static EVENT_NAME = '@EditProfile/EDITPROFILE';
    static editProfileOnFoods(first_name: string, last_name: string, mobile: string, fire_department: string, fire_station: string,) {
        return EditProfileAction.requestEvent({ ...{ first_name, last_name, mobile, fire_department, fire_station, } });
    }
}