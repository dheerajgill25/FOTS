import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import { LoadingAction } from "../../LoadingScreen/actions/LoadingAction";
import { MealPlanAction } from "../action/meal-plan.action";
class MealPlanController {
    async getMealPlan(id:string) {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            var formData:FormData = new FormData();
            formData.append('category_id',id)
            useAppDispatch(LoadingAction.showLoading(true));
            const CATEGORYURL = APIENDPOINTS.APIBASEURL+URL.MEALPLAN+`?key=${APIENDPOINTS.APIKEY}`;
            const getCategory = await HttpCall.post(CATEGORYURL,formData, true);
            const {data,status}:any = getCategory;
            if(data.status&&status){
                useAppDispatch(MealPlanAction.requestSuccess(data));
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

const MealPlanControllerInstance = new MealPlanController();
export default MealPlanControllerInstance;
