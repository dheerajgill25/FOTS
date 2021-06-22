import React, { createContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import { FontFamilyFoods } from 'components/typography/Typography';
interface NetworkInfoProps {
    children: React.ReactNode;
}
export const NetworkContext = createContext({ isConnected: true });
const NetworkInfo = (props: NetworkInfoProps) => {
    const [isConnected, setIsConnected] = useState<boolean|null>(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (!state.isInternetReachable && !state.isConnected) {
                setIsConnected(state.isConnected);
                handleSnackBar()
            } else {
                Snackbar.dismiss()
            }
        });
        return () => unsubscribe()

    }, [isConnected])
    const handleSnackBar = () => {
        Snackbar.show({
            text: "Please check your internet connection or try again later",
            duration: Snackbar.LENGTH_INDEFINITE,
            fontFamily: FontFamilyFoods.POPPINS
        })

    }

    return (
        //@ts-ignore
        <NetworkContext.Provider value={isConnected}>
            {props.children}
        </NetworkContext.Provider>
    )
};

export default NetworkInfo;
