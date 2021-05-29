import EventType from "@libs/redux/action";


export class ProductsDetailAction extends EventType {
    static EVENT_NAME = '@ProductsDetails/PRODUCTSDETAILS';
    static getProductsDetails(category_id:string) {
        return ProductsDetailAction.requestEvent({...{category_id}});
    }
}