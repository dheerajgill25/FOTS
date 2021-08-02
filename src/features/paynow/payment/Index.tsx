import {
    useStripe,
} from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import PaymentScreen from 'components/stripePaymentScreen/Index';
import { APIENDPOINTS } from 'libs/api/apiEndpoints';
import RootNavigator from 'navigation/rootnavigation';
import Button from 'components/stripeButton/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchPublishableKey } from 'components/stripePaymentScreen/fetchPublishKey/Index';
import Snackbar from 'react-native-snackbar';
import PayNowControllerInstance from '../controllers/paynow.controller';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';

const WebhookPaymentScreen = (props: { route: any; }) => {
    const { params: { date, fireDepartmentId, fireStationId, stateId } } = props.route
    const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clientSc, setClientSc] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<{
        image: string;
        label: string;
    } | null>(null);
    const {
        initPaymentSheet,
        presentPaymentSheet,
        confirmPaymentSheetPayment,
        retrievePaymentIntent
    } = useStripe();
    const fetchPaymentSheetParams = async () => {
        const token = await AsyncStorage.getItem("token");
        const url = `${APIENDPOINTS.APIBASEURL}/payment-sheet?key=${APIENDPOINTS.APIKEY}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token || "",
            },
        });
        const { data: { paymentIntent, ephemeralKey, customer }, status } = await response.json();
        setClientSc(paymentIntent);
        if (!status) { setLoading(false) }
        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };
    const initialisePaymentSheet = async () => {
        setLoading(true);
        const { key } = await fetchPublishableKey();
        try {
            const {
                paymentIntent,
                ephemeralKey,
                customer,
            } = await fetchPaymentSheetParams();
            const { error, paymentOption } = await initPaymentSheet({
                customerId: customer,
                customerEphemeralKeySecret: ephemeralKey,
                paymentIntentClientSecret: paymentIntent,
                customFlow: true,
                merchantDisplayName: 'Food on Stoves',
                merchantCountryCode: "US",
                style: 'alwaysDark',
                googlePay: false,
                testEnv: true,
            });
            if (!error) {
                setPaymentSheetEnabled(true);
            }
            if (paymentOption) {
                setPaymentMethod(paymentOption);
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoading(false);
        }
    };
    const choosePaymentOption = async () => {
        const { clientSecret } = await fetchPublishableKey();
        const { error, paymentOption } = await presentPaymentSheet({
            confirmPayment: false,
            clientSecret: clientSecret
        });
        if (error) {
            console.log('error', error);
        } else if (paymentOption) {
            setPaymentMethod({
                label: paymentOption.label,
                image: paymentOption.image,
            });
        } else {
            setPaymentMethod(null);
        }
    };
    const onPressBuy = async () => {
        setLoading(true);
        const { error } = await confirmPaymentSheetPayment();
        if (error) {
            Snackbar.show({
                text: error.message,
                textColor: "white",
                duration: 3000,
                fontFamily: FontFamilyFoods.POPPINS
            })
            setLoading(false);
        } else {
            const { paymentIntent, error } = await retrievePaymentIntent(clientSc);
            Snackbar.show({
                text: '"Success The payment was confirmed successfully!"',
                textColor: "white",
                duration: 3000,
                fontFamily: FontFamilyFoods.POPPINS
            });
            if (error) {
                Snackbar.show({
                    text: error.message,
                    textColor: "white",
                    duration: 3000,
                    fontFamily: FontFamilyFoods.POPPINS
                });
            }
            PayNowControllerInstance.paynowProducts(stateId, fireDepartmentId, fireStationId, date, 'stripe', paymentIntent?.id, paymentIntent)
            setPaymentSheetEnabled(false);
            setLoading(false);
        }
    };
    React.useEffect(() => {
        initialisePaymentSheet();
    }, []);
    return (
        <PaymentScreen>
            <View style={{ marginBottom: 20 }}>
                <Image source={require("../../../../assets/images/appsquare.png")} style={styles.logo} />
            </View>
            <View>
                <View>
                    <Button
                        variant="primary"
                        loading={loading}
                        title={
                            paymentMethod ? (
                                <View style={styles.row}>
                                    <Image
                                        source={{
                                            uri: `data:image/png;base64,${paymentMethod.image}`,
                                        }}
                                        style={styles.image}
                                    />
                                    <Typography style={styles.text}>{paymentMethod.label}</Typography>
                                </View>
                            ) : (
                                'Choose payment method'
                            )
                        }
                        disabled={!paymentSheetEnabled}
                        onPress={choosePaymentOption}
                    />
                </View>

                <View style={styles.section}>
                    <Button
                        variant="primary"
                        loading={loading}
                        disabled={!paymentMethod || !paymentSheetEnabled}
                        title="Buy"
                        onPress={onPressBuy}
                    />
                </View>
            </View>
        </PaymentScreen>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    paymentMethodTitle: {
        color: "#0A2540",
        fontWeight: 'bold',
    },
    image: {
        width: 26,
        height: 20,
    },
    text: {
        color: 'white',
        fontSize: 16,
        marginLeft: 12,
        fontFamily: FontFamilyFoods.POPPINSSEMIBOLD
    },
    logo: {
        height: 150,
        width: 400,
        alignSelf: "center",
        overflow: "hidden"
    }
});
WebhookPaymentScreen.SCREEN_NAME = 'WebhookPaymentScreen';
WebhookPaymentScreen.navigationOptions = {
    headerShown: false,
};
WebhookPaymentScreen.navigate = (stateId: string, fireDepartmentId: string, fireStationId: string, date: string) => {
    RootNavigator.navigate(WebhookPaymentScreen.SCREEN_NAME, { stateId: stateId, fireDepartmentId: fireDepartmentId, fireStationId: fireStationId, date: date });
};
export default WebhookPaymentScreen;