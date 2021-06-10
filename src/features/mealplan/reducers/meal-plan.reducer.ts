import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { MealPlanAction } from '../action/meal-plan.action';

export type MealPlanInState = StoreState<{ data: any }>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const mealPlanReducer: Reducer<MealPlanInState, ActionType<MealPlanAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case MealPlanAction.EVENT_REQUEST(): {
            return { ...state, loading: true, error: undefined };
        }
        case MealPlanAction.EVENT_SUCCESS(): {
            return { ...state, loading: false, data: { ...state.data, ...payload }, error: undefined };
        }

        case MealPlanAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case MealPlanAction.EVENT_CLEAR(): {
            return initialState;
        }
        default: {
            return state;
        }


    }
};
