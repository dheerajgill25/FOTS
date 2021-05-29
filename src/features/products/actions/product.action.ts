import EventType from "@libs/redux/action";


export class ProductsAction extends EventType {
    static EVENT_NAME = '@Products/PRODUCTS';
    static getProductsList(category_id:string,meal_id?:string) {
        return ProductsAction.requestEvent({...{category_id,meal_id}});
    }
}