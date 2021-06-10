import { ActionType } from 'libs/redux/action';
import { StoreState } from 'libs/redux/reducers';
import { Reducer } from 'react';
import { UploadImageAction } from '../actions/uploadImage.action';

export type UploadImageInState = StoreState<{data:any}>;

const initialState = {
    loading: false,
    data: undefined,
    error: undefined,
};

export const uploadImageReducer: Reducer<UploadImageInState, ActionType<UploadImageAction>> = (
    state = initialState,
    action
) => {
    const { payload, type, error } = action;
    switch (type) {
        case UploadImageAction.EVENT_REQUEST(): {
            return { ...state, loading: true,error:undefined };
        }
        case UploadImageAction.EVENT_SUCCESS(): {
            return { ...state, loading: false, data: {...state.data, ...payload},error:undefined };
        }

        case UploadImageAction.EVENT_ERROR(): {
            return { ...state, loading: false, error: error };
        }

        case UploadImageAction.EVENT_CLEAR(): {
            return initialState;
        }
        default:{
            return state;
        }


    }
};
