import {LoadingInState} from "@features/LoadingScreen/reducer/Loading-reducer";
import { FireStationInState } from "@features/registerscreen/reducers/fireStation.reducers";
import { FireDepartmentInState } from "@features/registerscreen/reducers/fireDepartment.reducers";
import { StateInState } from "features/registerscreen/reducers/state.reducers";
import { RegisterInState } from "features/registerscreen/reducers/register.reducer";
import { SignInInState } from "features/login/reducers/login.reducer";
import { CategoryInState } from "features/home/reducers/category.reducer";
import { MealPlanInState } from "features/mealplan/reducers/meal-plan.reducer";
import { TokenInState } from "features/login/reducers/token.reducer";
import { ProductInState } from "features/products/reducers/product.reducer";
import { ProductDetailInState } from "features/productdetail/reducers/productdetail.reducer";
import { CartListInState } from "features/cart/httpCall/reducers/cartList.reducer";
import { CheckoutInState } from "features/commonApiCall/checkout/reducers/checkout.reducer";

export default interface RootStore {
    loadingState:LoadingInState;
    FireStationInState:FireStationInState;
    FireDepartmentInState:FireDepartmentInState;
    StateInState:StateInState;
    RegisterInState:RegisterInState;
    SignInInState:SignInInState;
    CategoryInState:CategoryInState;
    MealPlanInState:MealPlanInState;
    TokenInState:TokenInState;
    ProductInState:ProductInState;
    ProductDetailInState:ProductDetailInState;
    CartListInState:CartListInState;
    CheckoutInState:CheckoutInState
};
