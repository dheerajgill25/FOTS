import {LoadingInState} from "@features/LoadingScreen/reducer/Loading-reducer";
import { FireStationInState } from "@features/registerscreen/reducers/fireStation.reducers";
import { FireDepartmentInState } from "@features/registerscreen/reducers/fireDepartment.reducers";
import { StateInState } from "features/registerscreen/reducers/state.reducers";
import { RegisterInState } from "features/registerscreen/reducers/register.reducer";
import { SignInInState } from "features/login/reducers/login.reducer";
import { CategoryInState } from "features/home/reducers/category.reducer";
import { MealPlanInState } from "features/mealplan/reducers/meal-plan.reducer";

export default interface RootStore {
    loadingState:LoadingInState;
    FireStationInState:FireStationInState;
    FireDepartmentInState:FireDepartmentInState;
    StateInState:StateInState;
    RegisterInState:RegisterInState;
    SignInInState:SignInInState;
    CategoryInState:CategoryInState;
    MealPlanInState:MealPlanInState
};
