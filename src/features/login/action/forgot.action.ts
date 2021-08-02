import EventType from "@libs/redux/action";


export class ForgotAction extends EventType {
    static EVENT_NAME = '@Forgot/FORGOTPASS';
    static forgotOnFoods(email: string ) {
        return ForgotAction.requestEvent({ ...{email, } });
    }
}