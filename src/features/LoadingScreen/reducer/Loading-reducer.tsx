import { Reducer } from 'react';
import {ActionType} from "libs/redux/action";
import {LoadingAction} from "features/LoadingScreen/actions/LoadingAction";
import {StoreState} from "libs/redux/reducers";

export type LoadingInState = StoreState<{loading:boolean}>;

const initialState: LoadingInState = {
    loading: false,
};

export const LoadingReducer: Reducer<LoadingInState, ActionType<LoadingAction>> = (
    state = initialState,
    action
) => {
    const { payload , type } = action
   
    switch (type) {
        case LoadingAction.EVENT_REQUEST(): {
            return { ...state, loading: true };
        }
        case LoadingAction.EVENT_SUCCESS(): {
          const { loading  = false} = payload;
            return { ...state, loading: loading, };
        }

        case LoadingAction.EVENT_ERROR(): {
            return { ...state, loading: false,};
        }

        case LoadingAction.EVENT_CLEAR(): {
            return initialState;
        }

        default:
            return state;
    }
};
