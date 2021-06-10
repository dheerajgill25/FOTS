import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { ProductsAction } from '../actions/product.action';

export type ProductInState = StoreState<{ data: any }>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const productReducer: Reducer<ProductInState, ActionType<ProductsAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case ProductsAction.EVENT_REQUEST(): {
            return { ...state, loading: true, error: undefined };
        }
        case ProductsAction.EVENT_SUCCESS(): {
            return { ...state, loading: false, data: { ...state.data, ...payload }, error: undefined };
        }

        case ProductsAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case ProductsAction.EVENT_CLEAR(): {
            return initialState;
        }
        default: {
            return state;
        }


    }
};
