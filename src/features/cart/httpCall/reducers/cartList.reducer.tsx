import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { CartListAction } from '../actions/cartList.action';

export type CartListInState = StoreState<{ data: any }>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const cartListReducer: Reducer<CartListInState, ActionType<CartListAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case CartListAction.EVENT_REQUEST(): {
            return { ...state, loading: true, error: undefined };
        }
        case CartListAction.EVENT_SUCCESS(): {
            return { ...state, loading: false, data: { ...state.data, ...payload }, error: undefined };
        }

        case CartListAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case CartListAction.EVENT_CLEAR(): {
            return initialState;
        }
        default: {
            return state;
        }


    }
};
