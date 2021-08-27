import * as React from 'react';
import { useState } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';
import PayNowControllerInstance from './controllers/paynow.controller';
import styles from './styles';
import StorageService from 'libs/storage/Storage';
import CrashReporterInstance from 'libs/crash-reporter/CrashReporter';
import WebhookPaymentScreen from './payment/Index';
import CheckOutBox from 'components/checkoutbox/Index';
import DropdownComponentCheckOut from 'components/checkoutdropdown';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import FireDepartmentControllerInstance from 'features/registerscreen/controllers/fireDepartment.controller';
import FireStationControllerInstance from 'features/registerscreen/controllers/fireStation.controller';
import StateControllerInstance from 'features/registerscreen/controllers/state.controller';
import moment from 'moment';
import RootNavigator from 'navigation/rootnavigation';
import Toaster from 'features/commonApiCall/toaster';
interface BeforePayNowProps { route: any }
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
const renderDateOfDeliverSection = (dateOfDelivery: any, dateOfDeliverySecond: any, isDateShow: any, days: any) => {
    const deliverDate = moment(dateOfDelivery).format("DD|MM|YYYY");
    const deliverDateSecond = moment(dateOfDeliverySecond).format("DD|MM|YYYY");
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
            {
                isDateShow == 0 && (days == 5 || days == 7) ? (<View style={styles.descriptiongBox}>
                    <View style={styles.descriptionInner}>
                        <Typography style={styles.descriptionName}>Date of Delivery</Typography>
                    </View>
                    <View style={styles.borderBottom}></View>
                    <View style={styles.dateBox}>
                        <View style={styles.dateSection}>
                            <View style={styles.dateWrap}>
                                <Typography style={styles.date}>{deliverDateSecond}</Typography>
                            </View>
                        </View>
                    </View>
                </View>) : (
                    null
                )
            }

        </View>
    )
}
const BeforePayNow = (props: BeforePayNowProps) => {
    const [stateId, setStateId] = useState("");
    const [fireDepartmentId, setFireDepartmentId] = useState("");
    const [fireStationId, setFireStationId] = useState("");
    const [userData, setUserData] = React.useState<any>({});
    const [isDateShow, setIsDateShow] = useState<number>();
    React.useEffect(() => {
        StateControllerInstance.getState();
    }, [])
    const onChangeStateListener = (data: any) => {
        console.log("data---------",data)
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
    }, [userData]);
    const checkoutData = useSelector((state: RootStore) => state.CheckoutInState.data?.data);
    const stateData = useSelector((state: RootStore) => state.StateInState.data?.data);
    const fireDepartmentData = useSelector((state: RootStore) => state.FireDepartmentInState.data?.data);
    const fireStationData = useSelector((state: RootStore) => state.FireStationInState.data?.data);
    const generalSettingData = useSelector((state: RootStore) => state.GeneralSettingInState.data);
    React.useEffect(() => {
        if (generalSettingData && generalSettingData.length > 0) {
            generalSettingData.map((obj: any, i: any) => (
                setIsDateShow(obj?.delivery_date_mode)
            ))
        }
    }, [generalSettingData])
    const handlePayNowWithOutPay = (paymentMethod?: string, paymentId?: string) => {
        const date = dates();
        if (stateId !== '' && fireDepartmentId !== '' && fireStationId !== '') {
            PayNowControllerInstance.paynowProducts(stateId, fireDepartmentId, fireStationId, date, paymentMethod, paymentId)
        } else {
            if (stateId == '' && fireDepartmentId == '' && fireStationId == '') {
                Toaster.show('Please select a state or Fire Deparment or Fire station ');
            } else if (stateId == '') {
                Toaster.show('Please select a state');
            } else if (fireDepartmentId == '') {
                Toaster.show('Please select a Fire department');
            } else if (fireStationId == '') {
                Toaster.show('Please select a Fire station');
            }
        }

    }


    const orderNow = () => {
        if (checkoutData?.type == "meal") {
            if (stateId !== "" && fireDepartmentId !== '' && fireStationId !== '') {
                WebhookPaymentScreen.navigate(stateId, fireDepartmentId, fireStationId, dates())
            } else if (stateId == '') {
                Toaster.show('Please select a state');
            } else if (fireDepartmentId == '') {
                Toaster.show('Please select a Fire department');
            } else if (fireStationId == '') {
                Toaster.show('Please select a Fire station');
            }
        } else {
            handlePayNowWithOutPay()
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={false} nestedScrollEnabled={false}>
                <View>
                    <DropdownComponentCheckOut title="State" imageLeftUrl={require('../../../assets/images/location.png')} data={stateData && stateData.length > 0 ? stateData : []} onPress={(data) => onChangeStateListener(data)} />
                </View>
                <View>
                    <DropdownComponentCheckOut title="Fire Department" imageLeftUrl={require('../../../assets/images/firehydrant.png')} data={fireDepartmentData && fireDepartmentData.length > 0 ? fireDepartmentData : []} onPress={(data) => onChangeFireDeparmentListener(data)} />
                </View>
                <View>
                    <DropdownComponentCheckOut title="Fire Station" data={fireStationData && fireStationData.length > 0 ? fireStationData : []} onPress={(data) => onChangeFireStationListener(data)} />
                </View>
                {renderDateOfDeliverSection(checkoutData?.delivery_date, checkoutData?.delivery_date2, isDateShow, checkoutData?.mealPlanDay)}
            </ScrollView>
            <CheckOutBox
                label="Order Now"
                totalDiscount={`$${parseInt(checkoutData?.total_discount)}`}
                couponDiscount={`$${parseInt(checkoutData?.coupon_discount)}`}
                totalMrp={`$${parseInt(checkoutData?.total_mrp)}`}
                total={`$${parseInt(checkoutData?.total_amount)}`}
                deliveryFee={checkoutData?.delivery_fee == 0 ? "Free" : `$${checkoutData?.delivery_fee}`}
                tax={`$${parseInt(checkoutData?.tax_amount)}`}
                onPress={() => orderNow()} />
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

