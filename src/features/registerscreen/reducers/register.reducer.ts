import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { RegisterAction } from '../actions/register.action';

export type RegisterInState = StoreState<{data:any}>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const registerReducer: Reducer<RegisterInState, ActionType<RegisterAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case RegisterAction.EVENT_REQUEST(): {
            return { ...state, loading: true,error:undefined };
        }
        case RegisterAction.EVENT_SUCCESS(): {
            return { ...state, loading: false, data: {...state.data, ...payload},error:undefined };
        }

        case RegisterAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case RegisterAction.EVENT_CLEAR(): {
            return initialState;
        }
        default:{
            return state;
        }


    }
};
