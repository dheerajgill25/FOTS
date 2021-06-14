import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { GeneralSettingAction } from '../actions/generalSetting.action';

export type GeneralSettingInState = StoreState<any>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const generalSettingsReducer: Reducer<GeneralSettingInState, ActionType<GeneralSettingAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case GeneralSettingAction.EVENT_REQUEST(): {
            return { ...state, loading: true, error: undefined };
        }
        case GeneralSettingAction.EVENT_SUCCESS(): {
            const { data = [] } = payload;
            return { ...state, loading: false, data: data, error: undefined };
        }

        case GeneralSettingAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case GeneralSettingAction.EVENT_CLEAR(): {
            return initialState;
        }
        default: {
            return state;
        }


    }
};
