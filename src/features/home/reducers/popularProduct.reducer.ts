import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { PopularProductAction } from '../action/popularProduct.action';

export type PopularProductInState = StoreState<{ data: any }>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const popularProductReducer: Reducer<PopularProductInState, ActionType<PopularProductAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case PopularProductAction.EVENT_REQUEST(): {
            return { ...state, loading: true, error: undefined };
        }
        case PopularProductAction.EVENT_SUCCESS(): {
            return { ...state, loading: false, data: { ...state.data, ...payload }, error: undefined };
        }

        case PopularProductAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case PopularProductAction.EVENT_CLEAR(): {
            return initialState;
        }
        default: {
            return state;
        }


    }
};
