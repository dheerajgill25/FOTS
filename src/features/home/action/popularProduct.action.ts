import EventType from "@libs/redux/action";


export class PopularProductAction extends EventType {
    static EVENT_NAME = '@PopularProduct/POPULARPRODUCT';
    static getPopularProduct(data:any) {
        return PopularProductAction.requestSuccess(data);
    }
}