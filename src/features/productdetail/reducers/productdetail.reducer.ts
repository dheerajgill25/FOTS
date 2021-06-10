import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { ProductsDetailAction } from '../actions/productdetail.action';

export type ProductDetailInState = StoreState<{ data: any }>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const productDetailReducer: Reducer<ProductDetailInState, ActionType<ProductsDetailAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case ProductsDetailAction.EVENT_REQUEST(): {
            return { ...state, loading: true, error: undefined };
        }
        case ProductsDetailAction.EVENT_SUCCESS(): {
            return { ...state, loading: false, data: { ...state.data, ...payload }, error: undefined };
        }

        case ProductsDetailAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case ProductsDetailAction.EVENT_CLEAR(): {
            return initialState;
        }
        default: {
            return state;
        }


    }
};
