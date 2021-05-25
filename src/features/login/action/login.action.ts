import EventType from "@libs/redux/action";


export class SignInAction extends EventType {
    static EVENT_NAME = '@SignIn/SIGNIN';
    static loginOnFoods(email: string, password: string, ) {
        return SignInAction.requestEvent({ ...{email, password, } });
    }
}