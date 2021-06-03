import { CheckOutBox } from 'components/checkoutbox/Index';
import DropdownComponentCheckOut from 'components/checkoutdropdown';
import Typography from 'components/typography/Typography';
import FireDepartmentControllerInstance from 'features/registerscreen/controllers/fireDepartment.controller';
import FireStationControllerInstance from 'features/registerscreen/controllers/fireStation.controller';
import StateControllerInstance from 'features/registerscreen/controllers/state.controller';
import RootNavigator from 'navigation/rootnavigation';
import * as React from 'react';
import { useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, FlatList } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';
import PayNowControllerInstance from './controllers/paynow.controller';
import styles from './styles';

interface BeforePayNowProps { route: any }
interface ElementData {
    imageUrlLeft: any;
    title: string;
    rightIcon: any;
    leftIcon: boolean;
}
const data: ElementData[] = [
    {
        imageUrlLeft: require('../../../assets/images/location.png'),
        title: 'Washington DC',
        rightIcon: require('../../../assets/images/arrowdown.png'),
        leftIcon: true
    },
    {
        imageUrlLeft: require('../../../assets/images/firehydrant.png'),
        title: 'DC FEMS',
        rightIcon: require('../../../assets/images/arrowdown.png'),
        leftIcon: true
    },
    {
        imageUrlLeft: require('../../../assets/images/firehydrant.png'),
        title: 'Engine 12',
        rightIcon: require('../../../assets/images/arrowdown.png'),
        leftIcon: false
    },
]
const renderItems = (items: ElementData) => {
    return (
        <View style={styles.deliveryContentbox}>
            <View style={styles.deliveryContentWrap}>
                <View style={styles.deliveryContentInner}>
                    <View style={[styles.deliveryContentContent, { maxWidth: 50 }]}>
                        <Image source={items.leftIcon ? items.imageUrlLeft : ''} style={styles.iconLeft} />
                    </View>
                    <View style={styles.deliveryContentContent}>
                        <Typography style={styles.title}>{items.title}</Typography>
                    </View>
                    <View style={[styles.deliveryContentContent, { maxWidth: 50 }]}>
                        <Image source={items.rightIcon} style={styles.arrowdownIcon} />
                    </View>
                </View>
            </View>
        </View>
    )
}
var currentDate: Date = new Date()
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
const renderDateOfDeliverSection = () => {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var day = days[currentDate.getDay()];
    var month = months[currentDate.getMonth()];

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
                            <Typography style={styles.date}>{dates()}</Typography>
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
    const checkoutData = useSelector((state: RootStore) => state.CheckoutInState.data?.data);
    const stateData = useSelector((state: RootStore) => state.StateInState.data?.data);
    const fireDepartmentData = useSelector((state: RootStore) => state.FireDepartmentInState.data?.data);
    const fireStationData = useSelector((state: RootStore) => state.FireStationInState.data?.data);

    const handlePayNow = () => {
        const date = dates();
        if (stateId !== '' && fireDepartmentId !== '' && fireStationId !== '') {
            PayNowControllerInstance.paynowProducts(stateId, fireDepartmentId, fireStationId, date)
        } else {
            if (stateId == '' && fireDepartmentId == '' && fireStationId == ''){
                Snackbar.show({
                    text: 'State id or Fire Deparment id or Fire station id required ',
                    textColor: "white",
                    duration: 3000
                })
            } else if (stateId == ''){
                Snackbar.show({
                    text: 'State id required ',
                    textColor: "white",
                    duration: 3000
                })
            }else if (fireDepartmentId == ''){
                Snackbar.show({
                    text: 'Fire department id required ',
                    textColor: "white",
                    duration: 3000
                })
            }else if (fireStationId == ''){
                Snackbar.show({
                    text: 'Fire station id required ',
                    textColor: "white",
                    duration: 3000
                })
            }
        }

    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={false} nestedScrollEnabled={false}>
                {/* <FlatList scrollEnabled={false} bounces={false} nestedScrollEnabled={false} data={data} renderItem={({ item }) => renderItems(item)} keyExtractor={(item, index) => index.toString()} /> */}
                <View>
                    <DropdownComponentCheckOut title="State" imageLeftUrl={require('../../../assets/images/location.png')} data={stateData} onPress={(data) => onChangeStateListener(data)} />
                </View>
                <View>
                    <DropdownComponentCheckOut title="Fire Department" imageLeftUrl={require('../../../assets/images/firehydrant.png')} data={fireDepartmentData} onPress={(data) => onChangeFireDeparmentListener(data)} />
                </View>
                <View>
                    <DropdownComponentCheckOut title="Fire Station" data={fireStationData} onPress={(data) => onChangeFireStationListener(data)} />
                </View>
                {renderDateOfDeliverSection()}
            </ScrollView>
            <CheckOutBox label="Order Now" totalMrp={`$${checkoutData?.total_mrp}`} total={`$${checkoutData?.total_amount}`} deliveryFee={checkoutData?.total_amount == 0 ? "Free" : "Paid"} tax="$0" onPress={() => handlePayNow()} />
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

