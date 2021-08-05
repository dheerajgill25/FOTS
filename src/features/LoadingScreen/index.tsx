import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';
import { FontFamilyFoods } from "components/typography/Typography";


const LoadingScreen = () => {
    const loading = useSelector((state: any) => state.loadingState);
    return (
        <Spinner
            overlayColor='rgba( 1, 1, 1, 0.87 )'
            visible={loading.loading}
            textContent={"Loading"}
            textStyle={{
                color: 'white',
                fontSize: 20,
                fontFamily: FontFamilyFoods.POPPINS
            }}
            animation="fade"
            customIndicator={<Image style={{height:50,width:50}} source={require("../../../assets/images/animated.gif")} />}
        />
    );
};

export default LoadingScreen;
const styles = StyleSheet.create({
    spinner:{

    }
})