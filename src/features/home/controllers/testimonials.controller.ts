import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import { LoadingAction } from "../../LoadingScreen/actions/LoadingAction";
import { TestimonialsAction } from "../action/testimonials.action";
class TestimonialsController {
    async getTestimonials() {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            const URLS = APIENDPOINTS.APIBASEURL+URL.TESTIMONIALS+`?key=${APIENDPOINTS.APIKEY}`;
            const getTestimonials = await HttpCall.post(URLS,{}, true);
            const {data,status}:any = getTestimonials;
            if(data.status&&status){
                useAppDispatch(LoadingAction.showLoading(false));
                useAppDispatch(TestimonialsAction.requestSuccess(data));
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

const TestimonialsControllerInstance = new TestimonialsController();
export default TestimonialsControllerInstance;
