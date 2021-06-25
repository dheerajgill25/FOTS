import AsyncStorage from '@react-native-async-storage/async-storage';
import SignInControllerInstance from 'features/login/controllers/login.controller';
import React, { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';


const InactivityHandler = () => {
    const appState = useRef(AppState.currentState)
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [activeTime, setActiveTime] = useState<number>(0);
    const userLogged = useSelector((state: RootStore) => state.TokenInState.data);
    const onAppStateChange = (nextAppState: any) => {
        AsyncStorage.getItem("activeTime").then((val: string | null) => {
            //@ts-ignore
            const date = new Date(JSON.parse(val))
            const activatedTime = date.getHours();
            const currentTime = new Date().getHours();
            const diffrenceTime = currentTime - activatedTime;
            setActiveTime(diffrenceTime)
        }).catch((error) => console.log(error))
        if (appState.current.match(/inactive|background/) && nextAppState === "active") {
            console.log("App has come to the foreground");
        }
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        if (userLogged !== null) {
            if ((appStateVisible === "background" || appStateVisible === 'inactive') && (activeTime >= 24)) {
                SignInControllerInstance.signout()
            }
        }

    }

    useEffect(() => {
        AppState.addEventListener('change', onAppStateChange);
        return () => {
            AppState.removeEventListener('change', onAppStateChange);
        }
    }, [onAppStateChange, userLogged]);
    return <></>
}
export default InactivityHandler;