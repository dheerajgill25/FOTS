import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { OrderListAction } from '../actions/orderList.action';

export type OrderListInState = StoreState<{ data: any }>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const orderListReducer: Reducer<OrderListInState, ActionType<OrderListAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case OrderListAction.EVENT_REQUEST(): {
            return { ...state, loading: true, error: undefined };
        }
        case OrderListAction.EVENT_SUCCESS(): {
            console.log("state.data", state.data)
            return { ...state, loading: false, data: { ...state.data, ...payload }, error: undefined };
        }

        case OrderListAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case OrderListAction.EVENT_CLEAR(): {
            return initialState;
        }
        default: {
            return state;
        }


    }
};
