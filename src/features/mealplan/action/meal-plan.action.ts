import EventType from "@libs/redux/action";


export class MealPlanAction extends EventType {
    static EVENT_NAME = '@MealPlan/MEALPLAN';
    static getCategoryFoods(category_id:string) {
        return MealPlanAction.requestSuccess({...{category_id}});
    }
}