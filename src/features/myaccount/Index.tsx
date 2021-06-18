
import { MyStatusBar } from 'components/statusbar/Index';
import Typography from 'components/typography/Typography';
import OrderListControllerInstance from 'features/commonApiCall/orderList/controllers/orderList.controller';
import SignInControllerInstance from 'features/login/controllers/login.controller';
import CrashReporterInstance from 'libs/crash-reporter/CrashReporter';
import StorageService from 'libs/storage/Storage';
import RootNavigator from 'navigation/rootnavigation';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';
import styles from './styles';
import  moment from "moment";
import EditProfile from 'features/editProfile/Index';
import ProductRating from 'features/rating/Index';
interface MyAccountProps { }
interface OrderDataProps {
    productName: string;
    productStatus: number;
}
enum STATUS {
    PROCESSING,
    DISPATCH,
    DELIVERED
}
const orderData: OrderDataProps[] = [
    {
        productName: 'Farm To Firehouse (Peruvian Chicken )',
        productStatus: STATUS.PROCESSING
    },
    {
        productName: 'Farm To Firehouse (Peruvian Chicken )',
        productStatus: STATUS.DISPATCH
    },
    {
        productName: 'Farm To Firehouse (Peruvian Chicken )',
        productStatus: STATUS.DELIVERED
    },
];
const renderAccountInfo = (data: any) => {
    return (
        <View style={styles.accountInfoSecion}>
            <View style={styles.accountInfoBox}>
                <View style={styles.accountInfoWrap}>
                    <View style={styles.accountInfoContent}>
                        <Typography style={styles.accountName}>{`${data.first_name} ${data.last_name}`}</Typography>
                        <Typography style={styles.accountEmail}>{data.mobile}   •   {data.email}</Typography>
                    </View>
                    <View style={styles.accountInfoContent}>
                        <Typography onPress={()=>EditProfile.navigate()} style={styles.editBtn}>Edit</Typography>
                    </View>
                </View>
            </View>
        </View>
    )
}
const renderHelpSection = () => {
    const ARROWRIGHT = require('../../../assets/images/arrowright.png')
    return (
        <View style={styles.helpSection}>
            <View style={styles.helpBox}>
                <View style={styles.helpContent}>
                    <View style={styles.helpLeft}>
                        <Typography style={styles.helpText}>Help</Typography>
                        <Typography style={styles.faqText}>FAQ & Links</Typography>
                    </View>
                    <View style={styles.helpRight}>
                        <Image source={ARROWRIGHT} style={styles.arrowRight} />
                    </View>
                </View>
                <View style={styles.helpContent}>
                    <View style={styles.helpLeft}>
                        <Typography onPress={() => SignInControllerInstance.signout()} style={styles.helpText}>Sign out</Typography>
                    </View>
                    <View style={styles.helpRight}>
                        <Image source={ARROWRIGHT} style={styles.arrowRight} />
                    </View>
                </View>
            </View>
        </View>
    )
}
interface ButtonWithIconProps {
    label: string;
    onPress: () => void
}
const ButtonFood = ({ label, onPress }: ButtonWithIconProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.filterButton}>
            <Typography style={styles.filterText}>{label}</Typography>
        </TouchableOpacity>
    )
}
function dates(date: string | number | Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('|');
}

const renderItems = (items: any, index: any) => {
    const ARROWRIGHT = require('../../../assets/images/rightarrow.png')
    const deliverDate = moment(items.delivery_date).format("DD|MM|YYYY");
    return (
        <View key={index} style={styles.orderContentbox}>
            {
                index == 0 && <View style={styles.myOrderBox}>
                    <Typography style={styles.myOrderText}>MY ORDERS</Typography>
                </View>
            }
            {
                items && items.cart_order.length > 0 ? (
                    items.cart_order.map((foods: any, i: any) => (
                        < View key={i} style={styles.orderContentWrap}>
                            <View style={styles.orderContentInner}>
                                <View style={styles.orderContentLeft}>
                                    <Typography style={styles.orderProuctName}>{`${foods.product.category_name} (${foods.product.name})`}</Typography>
                                </View>
                                <View style={styles.orderStatusBox}>
                                    <View style={styles.orderStatuswrp}>
                                        <Typography style={styles.orderStatusType}>{items.status}</Typography>
                                        <View style={[styles.orderStatus, {
                                            backgroundColor: items.status == "Scheduled" ? "#FE8E3C" : items.status == "Accepted" ? "#FE8E3C" : items.status == "In Progress" ? "#FE8E3C" : items.status == "Dispatched" ? "#FE8E3C" : "#77D32F"
                                        }]}>
                                            <Image source={ARROWRIGHT} style={styles.arrowIcon} />
                                        </View>
                                    </View>

                                </View>
                            </View>
                            <View style={[styles.orderContentInner,{paddingTop:15}]}>
                                <View style={{ flex: 1 }}>
                                    <Typography style={styles.dateFieldsName}>{'Placed on'}</Typography>
                                    <Typography style={styles.date}>{dates(foods.created_at)}</Typography>
                                </View>
                                <View style={{ flex: 1, }}>
                                    <Typography style={[styles.dateFieldsName,{textAlign:"right"}]}>{items.status=="Delivered"?"Delivered on":"Arriving on"}</Typography>
                                    <Typography style={[styles.date,{textAlign:"right"}]}>{deliverDate}</Typography>
                                </View>
                            </View>
                            <View style={styles.buttonBox}>
                                <ButtonFood onPress={() => { ProductRating.navigate(items.id,foods?.product?.id)}} label="RATE ORDER" />
                            </View>
                        </ View>
                    ))
                ) : (
                    <View />
                )
            }

        </View >
    )
}
const MyAccount = (props: MyAccountProps) => {
    const [userData, setUserData] = React.useState({});

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
    React.useEffect(() => {
        OrderListControllerInstance.getOrderList();
    }, [])
    const orderListData = useSelector((state: RootStore) => state.OrderListInState.data?.data);
    return (
        <SafeAreaView style={styles.container}>
            <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
            <ScrollView bounces={false} >
                {renderAccountInfo(userData)}
                {renderHelpSection()}
                <FlatList scrollEnabled={false} bounces={false} nestedScrollEnabled={false} data={orderListData} renderItem={({ item, index }) => renderItems(item, index)} keyExtractor={(item, index) => index.toString()} />
            </ScrollView>
        </SafeAreaView>
    );
};
MyAccount.SCREEN_NAME = 'MyAccount';
MyAccount.navigationOptions = {
    headerShown: false,
};
MyAccount.navigate = () => {
    RootNavigator.navigate(MyAccount.SCREEN_NAME);
};
export default MyAccount;