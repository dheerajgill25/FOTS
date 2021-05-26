import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadingAction } from "features/LoadingScreen/actions/LoadingAction";
import { useAppDispatch } from "libs/functions";
import { TokenAction } from "../action/token.action";
class TokenController {
   
    async setInitialTokens() {
        useAppDispatch(LoadingAction.showLoading(true))
        const token = await AsyncStorage.getItem("token");
        useAppDispatch(TokenAction.requestSuccess(token));
        useAppDispatch(LoadingAction.showLoading(false))
    }
}

const TokenControllerInstance = new TokenController();
export default TokenControllerInstance;
