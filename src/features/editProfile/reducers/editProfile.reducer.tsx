import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { EditProfileAction } from '../actions/editProfile.action';

export type EditProfileInState = StoreState<{data:any}>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const editProfileReducer: Reducer<EditProfileInState, ActionType<EditProfileAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case EditProfileAction.EVENT_REQUEST(): {
            return { ...state, loading: true,error:undefined };
        }
        case EditProfileAction.EVENT_SUCCESS(): {
            return { ...state, loading: false, data: {...state.data, ...payload},error:undefined };
        }

        case EditProfileAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case EditProfileAction.EVENT_CLEAR(): {
            return initialState;
        }
        default:{
            return state;
        }


    }
};
