import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { StateAction } from '../actions/state.action';

export type StateInState = StoreState<{data:any}>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const stateReducer: Reducer<StateInState, ActionType<StateAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case StateAction.EVENT_REQUEST(): {
            return { ...state, loading: true,error:undefined };
        }
        case StateAction.EVENT_SUCCESS(): {
            console.log("state.data",state.data)
            return { ...state, loading: false, data: {...state.data, ...payload},error:undefined };
        }

        case StateAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case StateAction.EVENT_CLEAR(): {
            return initialState;
        }
        default:{
            return state;
        }


    }
};
