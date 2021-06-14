import EventType from "@libs/redux/action";


export class GeneralSettingAction extends EventType {
    static EVENT_NAME = '@GeneralSetting/GENERALSETTING';
    static generalSetting(data:any) {
        return GeneralSettingAction.requestSuccess(data);
    }
}