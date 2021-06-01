import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import { LoadingAction } from "../../LoadingScreen/actions/LoadingAction";
import { ProductsDetailAction } from "../actions/productdetail.action";
class ProductDetailController {
    async getProductDetails(id:string) {
        try {
            var formData:FormData = new FormData();
            formData.append('product_id',id)
            useAppDispatch(LoadingAction.showLoading(true));
            const URLS = APIENDPOINTS.APIBASEURL+URL.PRODUCTSDETAILS+`?key=${APIENDPOINTS.APIKEY}`;
            const getProductDetail= await HttpCall.post(URLS,formData, true);
            const {data,status}:any = getProductDetail;
            if(data.status&&status){
                useAppDispatch(ProductsDetailAction.requestSuccess(data));
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

const ProductDetailControllerInstance = new ProductDetailController();
export default ProductDetailControllerInstance;
