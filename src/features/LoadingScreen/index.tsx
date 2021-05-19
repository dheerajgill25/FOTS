import * as React from 'react';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';
import {FontFamilyFoods} from "components/typography/Typography";


const LoadingScreen = () => {
    const loading = useSelector((state:any)=>state.loadingState);
    return (
        <Spinner
            overlayColor='rgba(0, 0, 0, 0.7)'
            visible={loading.loading}
            textContent={"Loading"}
            textStyle={styles.spinnerTextStyle}
        />
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {

    },
    spinnerTextStyle: {
        color: 'white',
        fontSize: 30,
        fontFamily: FontFamilyFoods.POPPINSMEDIUM
    }
});
