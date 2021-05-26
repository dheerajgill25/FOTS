import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { TokenAction } from '../action/token.action';

export type TokenInState = StoreState<{}>;

const initialState = {
    data: undefined,
    loading:false
};

export const tokenReducer: Reducer<TokenInState, ActionType<TokenAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case TokenAction.EVENT_REQUEST(): {
            return { ...state, loading: true, };
        }
        case TokenAction.EVENT_SUCCESS(): {
            const token = payload;
            return { ...state, loading: false, data:token,};
        }

        case TokenAction.EVENT_ERROR(): {
            return { ...state, loading: false, };
        }

        case TokenAction.EVENT_CLEAR(): {
            return initialState;
        }
        default:{
            return state;
        }


    }
};
