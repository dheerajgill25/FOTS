import Toaster from "features/commonApiCall/toaster";
import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import { APIENDPOINTS, URL } from "libs/api/apiEndpoints";
import { useAppDispatch } from "libs/functions";
import HttpCall from "libs/http-call/https";
import Toast from 'react-native-simple-toast';
import { OrderListAction } from "../actions/orderList.action";
class OrderListController {
    async getOrderList() {
        try {
            useAppDispatch(LoadingAction.showLoading(true));
            const URLS = APIENDPOINTS.APIBASEURL+URL.ORDERLIST+`?key=${APIENDPOINTS.APIKEY}`;
            const orderList= await HttpCall.post(URLS,{}, true);
            const {data,status}:any = orderList;
            const {message} = data;
            if(data.status&&status){
                useAppDispatch(OrderListAction.requestSuccess(data));
                useAppDispatch(LoadingAction.showLoading(false));
            }else{
                useAppDispatch(LoadingAction.showLoading(false));
                Toaster.show(message);
            }
        } catch (error) {
            useAppDispatch(LoadingAction.showLoading(false));
            console.log("error1doConfirm", error);
            const { message } = error;
            console.log(message)
        }

    }
}

const OrderListControllerInstance = new OrderListController();
export default OrderListControllerInstance;
