import EventType from "@libs/redux/action";


export class CategoryAction extends EventType {
    static EVENT_NAME = '@Category/CATEGORY';
    static getCategoryFoods() {
        return CategoryAction.requestSuccess();
    }
}