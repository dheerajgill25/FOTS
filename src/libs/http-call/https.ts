import axios, { AxiosError, AxiosResponse } from "axios";
import StorageService from "libs/storage/Storage";
import * as AxiosLogger from 'axios-logger';
import Register from "features/registerscreen";
import { setGlobalConfig } from "axios-logger";
import { APIENDPOINTS } from "libs/api/apiEndpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TokenControllerInstance from "features/login/controllers/token.controller";

const instance = axios.create();
instance.interceptors.request.use(AxiosLogger.requestLogger);
instance.interceptors.response.use(AxiosLogger.responseLogger);
axios.defaults.headers.post['Content-Type'] = 'application/json';
enum HttpMethod {
    GET, POST, PUT, DELETE
}
setGlobalConfig({
    prefixText: 'your prefix',
    dateFormat: 'HH:MM:ss',
    status: false,
    headers: true,
    url: true,
    data: true,
});

class HttpCallClass {
    CODE = APIENDPOINTS.APIKEY;
    async post<T>(
        url: string,
        params: Record<string, any>,
        useAccessToken = false,
    ): Promise<AxiosResponse<T>> {
        try {
            if (useAccessToken) {
                const token = await AsyncStorage.getItem("token");
                return await instance.post<T>(url, params, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
            }
            return await instance.post<T>(url, params, {
            });
        } catch (error) {
            console.log(' error --', error);
            return this.errorHandler(error, url, HttpMethod.POST, params, useAccessToken);
        }
    }
    errorHandler = async (error: any, url: string, method: HttpMethod, params: Record<string, any>, useAccessToken = false) => {
        const err = error as AxiosError;
        if (err.response) {
            const { status, data: { error: { errors = [] } = {} } } = err.response;
            const errorMessage = errors.length > 0 ? errors[0].message : "error";
            console.debug('err', err);
            console.debug('errorMessage', errorMessage);
            if (status === 401 || status === 403) {
                const accessToken = await AsyncStorage.getItem("token");
                if (accessToken) {
                    TokenControllerInstance.setInitialTokens();
                    return Promise.reject('Please sign in again');
                }
                console.debug('err', err);
                return Promise.reject(errorMessage);
            }
        }

        return Promise.reject("error");
    };
}

const HttpCall = new HttpCallClass();
export default HttpCall;
