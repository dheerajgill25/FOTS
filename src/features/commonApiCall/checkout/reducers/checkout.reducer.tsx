import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { CheckoutAction } from '../actions/checkout.action';

export type CheckoutInState = StoreState<{ data: any }>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const checkoutCartReducer: Reducer<CheckoutInState, ActionType<CheckoutAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case CheckoutAction.EVENT_REQUEST(): {
            return { ...state, loading: true, error: undefined };
        }
        case CheckoutAction.EVENT_SUCCESS(): {
            console.log("state.data", state.data)
            return { ...state, loading: false, data: { ...state.data, ...payload }, error: undefined };
        }

        case CheckoutAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case CheckoutAction.EVENT_CLEAR(): {
            return initialState;
        }
        default: {
            return state;
        }


    }
};
