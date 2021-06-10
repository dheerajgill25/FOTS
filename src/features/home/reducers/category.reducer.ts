import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { CategoryAction } from '../action/category.action';

export type CategoryInState = StoreState<{data:any}>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const categoriesReducer: Reducer<CategoryInState, ActionType<CategoryAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case CategoryAction.EVENT_REQUEST(): {
            return { ...state, loading: true,error:undefined };
        }
        case CategoryAction.EVENT_SUCCESS(): {
            return { ...state, loading: false, data: {...state.data, ...payload},error:undefined };
        }

        case CategoryAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case CategoryAction.EVENT_CLEAR(): {
            return initialState;
        }
        default:{
            return state;
        }


    }
};
