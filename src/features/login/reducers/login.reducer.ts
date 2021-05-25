import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { SignInAction } from '../action/login.action';

export type SignInInState = StoreState<{data:any}>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const signInReducer: Reducer<SignInInState, ActionType<SignInAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case SignInAction.EVENT_REQUEST(): {
            return { ...state, loading: true,error:undefined };
        }
        case SignInAction.EVENT_SUCCESS(): {
            return { ...state, loading: false, data: {...state.data, ...payload},error:undefined };
        }

        case SignInAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case SignInAction.EVENT_CLEAR(): {
            return initialState;
        }
        default:{
            return state;
        }


    }
};
