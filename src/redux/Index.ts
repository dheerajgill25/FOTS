import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
// @ts-ignore
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import { createInjectorsEnhancer } from 'redux-injectors';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LoadingReducer} from "@features/LoadingScreen/reducer/Loading-reducer";

const sagaMiddleware = createSagaMiddleware();

const runSaga = sagaMiddleware.run;

function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        ...injectedReducers,
        loadingState: LoadingReducer,
    });
    const persistConfig = {
        key: 'root',
        storage: AsyncStorage,
        whitelist: ['userSession', 'signInConfig'],
    };
    return persistReducer(persistConfig, rootReducer);
}

const middlewares = [sagaMiddleware];
const store = createStore(
    createReducer(),
    composeWithDevTools(
        applyMiddleware(...middlewares),
        createInjectorsEnhancer({
            createReducer,
            runSaga,
        }),
    ),
);
const persistor = persistStore(store);

export { store, persistor };
