import EventType from "@libs/redux/action";


export class TokenAction extends EventType {
    static EVENT_NAME = '@token_success/TOKEN_SUCCESSFULLY';
    static setInitialToken(token:string) {
        return TokenAction.requestSuccess(token);
    }
}