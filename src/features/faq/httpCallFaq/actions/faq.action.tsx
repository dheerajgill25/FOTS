import EventType from "@libs/redux/action";


export class FaqAction extends EventType {
    static EVENT_NAME = '@Faq/FAQ';
    static getFaq(data:any) {
        return FaqAction.requestSuccess(data);
    }
}