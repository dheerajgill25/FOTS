import { CheckOutBox } from 'components/checkoutbox/Index';
import DropdownComponentCheckOut from 'components/checkoutdropdown';
import Typography from 'components/typography/Typography';
import FireDepartmentControllerInstance from 'features/registerscreen/controllers/fireDepartment.controller';
import FireStationControllerInstance from 'features/registerscreen/controllers/fireStation.controller';
import StateControllerInstance from 'features/registerscreen/controllers/state.controller';
import moment from 'moment';
import RootNavigator from 'navigation/rootnavigation';
import * as React from 'react';
import { useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, FlatList, Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';
import PayNowControllerInstance from './controllers/paynow.controller';
import styles from './styles';
import StorageService from 'libs/storage/Storage';
import CrashReporterInstance from 'libs/crash-reporter/CrashReporter';
import { PaymentSheet, useStripe } from '@stripe/stripe-react-native';
import { STRIPEENDPOINTS } from 'libs/api/apiEndpoints';
interface BeforePayNowProps { route: any }
interface ElementData {
    imageUrlLeft: any;
    title: string;
    rightIcon: any;
    leftIcon: boolean;
}
function dates() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
const renderDateOfDeliverSection = (dateOfDelivery: any) => {
    const deliverDate = moment(dateOfDelivery).format("DD|MM|YYYY");
    return (
        <View style={styles.descriptionSection}>
            <View style={styles.descriptiongBox}>
                <View style={styles.descriptionInner}>
                    <Typography style={styles.descriptionName}>Date of Delivery</Typography>
                </View>
                <View style={styles.borderBottom}></View>
                <View style={styles.dateBox}>
                    <View style={styles.dateSection}>
                        <View style={styles.dateWrap}>
                            <Typography style={styles.date}>{deliverDate}</Typography>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
const BeforePayNow = (props: BeforePayNowProps) => {
    const [stateId, setStateId] = useState("");
    const [fireDepartmentId, setFireDepartmentId] = useState("");
    const [fireStationId, setFireStationId] = useState("");
    const [userData, setUserData] = React.useState<any>({});
    const {
        initPaymentSheet,
        presentPaymentSheet,
        confirmPaymentSheetPayment,
    } = useStripe();
    const [paymentMethod, setPaymentMethod] = useState<any>()
    const [loading, setLoading] = useState(true);
    React.useEffect(() => {
        StateControllerInstance.getState();
    }, [])
    const onChangeStateListener = (data: any) => {
        setStateId(data.id);
        FireDepartmentControllerInstance.getFireDepartment(data.id)
    }
    const onChangeFireStationListener = (data: any) => {
        setFireStationId(data.id);
    }
    const onChangeFireDeparmentListener = (data: any) => {
        setFireDepartmentId(data.id);
        FireStationControllerInstance.getFireStation(data.id)
    }

    React.useEffect(() => {
        let cancelled = false;
        StorageService.getItem('user').then((values: any) => {
            if (!cancelled) {
                const currentUser = JSON.parse(values);
                setUserData(currentUser);
            }
        }).catch((error) => { CrashReporterInstance.recordError(error); console.log("asyncstorage error", error) });
        return () => { cancelled = true; }
    }, [userData])
    const checkoutData = useSelector((state: RootStore) => state.CheckoutInState.data?.data);
    const stateData = useSelector((state: RootStore) => state.StateInState.data?.data);
    const fireDepartmentData = useSelector((state: RootStore) => state.FireDepartmentInState.data?.data);
    const fireStationData = useSelector((state: RootStore) => state.FireStationInState.data?.data);
    const handlePayNowWithOutPay = (paymentMethod?: string, paymentId?: string) => {
        const date = dates();
        if (stateId !== '' && fireDepartmentId !== '' && fireStationId !== '') {
            PayNowControllerInstance.paynowProducts(stateId, fireDepartmentId, fireStationId, date, paymentMethod, paymentId)
        } else {
            if (stateId == '' && fireDepartmentId == '' && fireStationId == '') {
                Snackbar.show({
                    text: 'State id or Fire Deparment id or Fire station id required ',
                    textColor: "white",
                    duration: 3000
                })
            } else if (stateId == '') {
                Snackbar.show({
                    text: 'State id required ',
                    textColor: "white",
                    duration: 3000
                })
            } else if (fireDepartmentId == '') {
                Snackbar.show({
                    text: 'Fire department id required ',
                    textColor: "white",
                    duration: 3000
                })
            } else if (fireStationId == '') {
                Snackbar.show({
                    text: 'Fire station id required ',
                    textColor: "white",
                    duration: 3000
                })
            }
        }

    }
    // const handleRazorPay = () => {
    //     if (stateId !== '' && fireDepartmentId !== '' && fireStationId !== '') {
    //         var options = {
    //             description: 'FOTS PAY',
    //             image: require("../../../assets/images/app.png"),
    //             currency: 'INR',
    //             key: RAZORPAYAPIKEY.APIKEY,
    //             amount: checkoutData?.total_amount + '00',
    //             name: `${userData.first_name} ${userData.last_name}`,
    //             prefill: {
    //                 email: userData?.email,
    //                 contact: userData?.mobile,
    //                 name: `${userData.first_name} ${userData.last_name}`
    //             },
    //             theme: { color: '#d80000' }
    //         }
    //         RazorpayCheckout.open(options).then((data: { org_name: string | undefined; razorpay_payment_id: string | undefined; }) => {
    //             handlePayNowWithOutPay(data?.org_name, data?.razorpay_payment_id)
    //         }).catch((error: { code: any; description: any; }) => {
    //             // handle failure
    //             console.log(`Error: ${error.code} | ${error.description}`);
    //         });
    //     }
    //     else {
    //         if (stateId == '' && fireDepartmentId == '' && fireStationId == '') {
    //             Snackbar.show({
    //                 text: 'State id or Fire Deparment id or Fire station id required ',
    //                 textColor: "white",
    //                 duration: 3000
    //             })
    //         } else if (stateId == '') {
    //             Snackbar.show({
    //                 text: 'State id required ',
    //                 textColor: "white",
    //                 duration: 3000
    //             })
    //         } else if (fireDepartmentId == '') {
    //             Snackbar.show({
    //                 text: 'Fire department id required ',
    //                 textColor: "white",
    //                 duration: 3000
    //             })
    //         } else if (fireStationId == '') {
    //             Snackbar.show({
    //                 text: 'Fire station id required ',
    //                 textColor: "white",
    //                 duration: 3000
    //             })
    //         }
    //     }
    // }
    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`${STRIPEENDPOINTS.APIURL}/payment-sheet`, {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + STRIPEENDPOINTS.APIKEY||"",
                'Content-Type': 'application/json',
            },
        });
        const { paymentIntent, ephemeralKey, customer } = await response.json();
        console.log("paymentIntent====",paymentIntent)
        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
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
            merchantDisplayName: 'Example Inc.',
            style: 'alwaysDark',
        });
        setLoading(false);
        if (!error) {
            console.log(error)
        }
        updateButtons(paymentOption);
    };

    const updateButtons = (paymentOption: PaymentSheet.PaymentOption | undefined) => {
        if (paymentOption) {
            setPaymentMethod({
                label: paymentOption.label,
                image: paymentOption.image,
            });
        } else {
            setPaymentMethod(null);
        }
    }
    const choosePaymentOption = async () => {
        const { error, paymentOption } = await presentPaymentSheet({
            confirmPayment: false,
        });

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        }
        updateButtons(paymentOption);
    };

    const onPressBuy = async () => {
        const { error, paymentOption } = await presentPaymentSheet({
            confirmPayment: false,
        });

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        }
        updateButtons(paymentOption);
    };
    React.useEffect(() => {
        initializePaymentSheet()
    },[])
    const orderNow = () => {
        if (checkoutData?.total_amount > 0) {
            choosePaymentOption()
            onPressBuy()
        } else {
            handlePayNowWithOutPay()
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={false} nestedScrollEnabled={false}>
                <View>
                    <DropdownComponentCheckOut title="State" imageLeftUrl={require('../../../assets/images/location.png')} data={stateData} onPress={(data) => onChangeStateListener(data)} />
                </View>
                <View>
                    <DropdownComponentCheckOut title="Fire Department" imageLeftUrl={require('../../../assets/images/firehydrant.png')} data={fireDepartmentData} onPress={(data) => onChangeFireDeparmentListener(data)} />
                </View>
                <View>
                    <DropdownComponentCheckOut title="Fire Station" data={fireStationData} onPress={(data) => onChangeFireStationListener(data)} />
                </View>
                {renderDateOfDeliverSection(checkoutData?.delivery_date)}
            </ScrollView>
            <CheckOutBox label="Order Now" totalDiscount={`$${checkoutData?.total_discount}`} couponDiscount={`$${checkoutData?.coupon_discount}`} totalMrp={`$${checkoutData?.total_mrp}`} total={`$${checkoutData?.total_amount}`} deliveryFee={checkoutData?.delivery_fee == 0 ? "Free" : `$${checkoutData?.delivery_fee}`} tax={`$${checkoutData?.tax_amount}`} onPress={() => orderNow()} />
        </SafeAreaView>
    );
};
BeforePayNow.SCREEN_NAME = 'BeforePayNow';
BeforePayNow.navigationOptions = {
    headerShown: false,
};
BeforePayNow.navigate = (params?: {}) => {
    RootNavigator.navigate(BeforePayNow.SCREEN_NAME, params);
};
export default BeforePayNow;

