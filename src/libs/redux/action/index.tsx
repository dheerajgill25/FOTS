export interface ActionType<T> {
    type: T;
    payload?: any;
    error?: any;
}
export default abstract class EventType {
    static EVENT_NAME: string;

    static EVENT_SUCCESS(): string {
        return `${this.EVENT_NAME}_SUCCESS`;
    }

    static EVENT_CUSTOM(customEvent: string) {
        return `${this.EVENT_NAME}_${customEvent}`;
    }

    static EVENT_ERROR() {
        return `${this.EVENT_NAME}_ERROR`;
    }

    static EVENT_REQUEST() {
        return `${this.EVENT_NAME}`;
    }

    static EVENT_CLEAR() {
        return `${this.EVENT_NAME}_CLEAR`;
    }

    static requestSuccess(payload?: any, event: string = this.EVENT_NAME) {
        return { type: `${event}_SUCCESS`, payload };
    }

    static requestCustom(customEvent: string, payload?: any, event: string = this.EVENT_NAME) {
        return { type: `${event}_${customEvent}`, payload };
    }

    static requestError(error: any, event: string = this.EVENT_NAME) {
        return { type: `${event}_ERROR`, error };
    }

    static requestEvent(payload?: any, event: string = this.EVENT_NAME) {
        return { type: `${event}`, payload };
    }

    static requestClear(event: string = this.EVENT_NAME) {
        return { type: `${event}_CLEAR` };
    }
}
