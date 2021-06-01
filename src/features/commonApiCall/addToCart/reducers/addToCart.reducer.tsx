import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { AddToCartAction } from '../actions/addToCart.action';

export type AddToCartInState = StoreState<{ data: any }>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const addToCartReducer: Reducer<AddToCartInState, ActionType<AddToCartAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case AddToCartAction.EVENT_REQUEST(): {
            return { ...state, loading: true, error: undefined };
        }
        case AddToCartAction.EVENT_SUCCESS(): {
            console.log("state.data", state.data)
            return { ...state, loading: false, data: { ...state.data, ...payload }, error: undefined };
        }

        case AddToCartAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case AddToCartAction.EVENT_CLEAR(): {
            return initialState;
        }
        default: {
            return state;
        }


    }
};
