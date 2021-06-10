import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { TestimonialsAction } from '../action/testimonials.action';

export type TestimonialsInState = StoreState<{data:any}>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const testimonialsReducer: Reducer<TestimonialsInState, ActionType<TestimonialsAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case TestimonialsAction.EVENT_REQUEST(): {
            return { ...state, loading: true,error:undefined };
        }
        case TestimonialsAction.EVENT_SUCCESS(): {
            return { ...state, loading: false, data: {...state.data, ...payload},error:undefined };
        }

        case TestimonialsAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case TestimonialsAction.EVENT_CLEAR(): {
            return initialState;
        }
        default:{
            return state;
        }


    }
};
