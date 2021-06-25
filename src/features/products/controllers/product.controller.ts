import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import { LoadingAction } from "../../LoadingScreen/actions/LoadingAction";
import { ProductsAction } from "../actions/product.action";
class ProductListController {
    async getProductList(id?:string,mealId?:string,keyword?:string,pageNo?:any) {
        useAppDispatch(LoadingAction.showLoading(true));
        try {
            var formData:FormData = new FormData();
            formData.append('category_id',id||"");
            formData.append('meal_id',mealId||"");
            formData.append('keyword',keyword||"");
            formData.append('pageNo',pageNo||"");
            const URLS = APIENDPOINTS.APIBASEURL+URL.PRODUCTS+`?key=${APIENDPOINTS.APIKEY}`;
            const getProduct= await HttpCall.post(URLS,formData, true);
            const {data,status}:any = getProduct;
            if(data.status&&status){
                useAppDispatch(ProductsAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false))
            }else{
                useAppDispatch(LoadingAction.showLoading(false));
                
            }
        } catch (error) {
            useAppDispatch(LoadingAction.showLoading(false));
            console.log("error1doConfirm", error);
            const { message } = error;
            console.log(message)
        }

    }
}

const ProductListControllerInstance = new ProductListController();
export default ProductListControllerInstance;
