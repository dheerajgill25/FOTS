import * as React from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import styles from './styles';
import ButtonFood from 'components/buttons/ButtonFoods';
import Typography from 'components/typography/Typography';
import MyAccount from 'features/myaccount/Index';
import RootNavigator from 'navigation/rootnavigation';

interface ThankYouScreenProps { }
const renderThankYouSection = () => {
    const THANKYOUURL = require("../../../assets/images/successicon.png");
    return (
        <View style={styles.successSection}>
            <View style={styles.successBox}>
                <View style={styles.successWrap}>
                    <Image source={THANKYOUURL} style={styles.successImage} />
                    <View style={styles.successMessage}>
                        <Typography style={styles.orderMessage}>Your Order has been placed</Typography>
                        <Typography style={styles.deliveryMessage}>“The delivery will be made to your batallion”</Typography>
                    </View>
                    <View style={styles.successBtn}>
                        <View style={styles.successBtnBox}>
                        <ButtonFood onPress={()=>{MyAccount.navigate()}} label="View Order" textStyle={styles.buttonText}  buttonStyle={styles.orderBtn} />
                        </View>  
                        <View style={styles.donateBtnBox}>
                        <ButtonFood onPress={()=>{}} label="Donate" textColor="black" textStyle={styles.buttonText} buttonStyle={styles.donateBtn} />
                        </View>
                       
                    </View>
                </View>
            </View>
        </View>
    )
}
const ThankYouScreen = (props: ThankYouScreenProps) => {
    return (
        <SafeAreaView style={styles.container}>
            {renderThankYouSection()}
        </SafeAreaView>
    );
};
ThankYouScreen.SCREEN_NAME = 'ThankYouScreen';
ThankYouScreen.navigationOptions = {
    headerShown: false,
};
ThankYouScreen.navigate = () => {
    RootNavigator.navigate(ThankYouScreen.SCREEN_NAME);
};
export default ThankYouScreen;