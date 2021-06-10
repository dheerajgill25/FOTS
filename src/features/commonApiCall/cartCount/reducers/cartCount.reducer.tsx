import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { CartCountAction } from '../actions/cartCount.action';

export type CartCountInState = StoreState<any>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const cartCountReducer: Reducer<CartCountInState, ActionType<CartCountAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case CartCountAction.EVENT_REQUEST(): {
            return { ...state, loading: true, error: undefined };
        }
        case CartCountAction.EVENT_SUCCESS(): {
            const { data = [] } = payload;
            return { ...state, loading: false, data: data, error: undefined };
        }

        case CartCountAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case CartCountAction.EVENT_CLEAR(): {
            return initialState;
        }
        default: {
            return state;
        }


    }
};
