import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { FireDepartmentAction } from '../actions/fireDepartment.action';

export type FireDepartmentInState = StoreState<{data:any}>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const fireDepartmentReducer: Reducer<FireDepartmentInState, ActionType<FireDepartmentAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case FireDepartmentAction.EVENT_REQUEST(): {
            return { ...state, loading: true,error:undefined };
        }
        case FireDepartmentAction.EVENT_SUCCESS(): {
            return { ...state, loading: false, data: {...state.data, ...payload},error:undefined };
        }

        case FireDepartmentAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case FireDepartmentAction.EVENT_CLEAR(): {
            return initialState;
        }
        default:{
            return state;
        }


    }
};
