import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import { LoadingAction } from "../../LoadingScreen/actions/LoadingAction";
import { CategoryAction } from "../action/category.action";
class CategoryController {
    async getCategory() {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            const CATEGORYURL = APIENDPOINTS.APIBASEURL+URL.CATEGORY+`?key=${APIENDPOINTS.APIKEY}`;
            const getCategory = await HttpCall.post(CATEGORYURL,{}, true);
            const {data,status}:any = getCategory;
            if(data.status&&status){
                useAppDispatch(LoadingAction.showLoading(false));
                useAppDispatch(CategoryAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false))
            }else{
                useAppDispatch(LoadingAction.showLoading(false));
                
            }
            useAppDispatch(LoadingAction.showLoading(false));
        } catch (error) {
            useAppDispatch(LoadingAction.showLoading(false));
            console.log("error1doConfirm", error);
            const { message } = error;
            console.log(message)
        }

    }
}

const CategoryControllerInstance = new CategoryController();
export default CategoryControllerInstance;
