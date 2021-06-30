import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { FaqAction } from '../actions/faq.action';

export type FaqInState = StoreState<any>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const faqReducer: Reducer<FaqInState, ActionType<FaqAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case FaqAction.EVENT_REQUEST(): {
            return { ...state, loading: true, error: undefined };
        }
        case FaqAction.EVENT_SUCCESS(): {
            const { data = [] } = payload;
            return { ...state, loading: false, data: data, error: undefined };
        }

        case FaqAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case FaqAction.EVENT_CLEAR(): {
            return initialState;
        }
        default: {
            return state;
        }


    }
};
