import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { FireStationAction } from '@features/registerscreen/actions/fireStation.action';

export type FireStationInState = StoreState<{data:any}>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const fireStationReducer: Reducer<FireStationInState, ActionType<FireStationAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case FireStationAction.EVENT_REQUEST(): {
            return { ...state, loading: true,error:undefined };
        }
        case FireStationAction.EVENT_SUCCESS(): {
            return { ...state, loading: false, data: {...state.data, ...payload},error:undefined };
        }

        case FireStationAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case FireStationAction.EVENT_CLEAR(): {
            return initialState;
        }
        default:{
            return state;
        }


    }
};
