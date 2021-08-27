
import { MyStatusBar } from 'components/statusbar/Index';
import Typography from 'components/typography/Typography';
import OrderListControllerInstance from 'features/commonApiCall/orderList/controllers/orderList.controller';
import SignInControllerInstance from 'features/login/controllers/login.controller';
import CrashReporterInstance from 'libs/crash-reporter/CrashReporter';
import StorageService from 'libs/storage/Storage';
import RootNavigator from 'navigation/rootnavigation';
import * as React from 'react';
import { View, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';
import styles from './styles';
import moment from "moment";
import EditProfile from 'features/editProfile/Index';
import ProductRating from 'features/rating/Index';
import { useState } from 'react';
import FaqScreen from 'features/faq/Faq';
interface MyAccountProps { }

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
                        <Typography onPress={() => EditProfile.navigate()} style={styles.editBtn}>Edit</Typography>
                    </View>
                </View>
            </View>
        </View>
    )
}
const renderHelpSection = (contactEmail: string) => {
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
                        <TouchableOpacity onPress={() => FaqScreen.navigate()}>
                            <Image source={ARROWRIGHT} style={styles.arrowRight} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.helpContent}>
                    <View style={styles.helpLeft}>
                        <Typography style={styles.helpText}>Sign out</Typography>
                    </View>
                    <View style={styles.helpRight}>
                        <TouchableOpacity onPress={() => SignInControllerInstance.signout()}>
                            <Image source={ARROWRIGHT} style={styles.arrowRight} />
                        </TouchableOpacity>
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
                items && items.cart_order.length > 0 || index == 0 && <View style={styles.myOrderBox}>
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
                                            backgroundColor: items.status == "Pending" ? "#FE8E3C" : items.status == "Cancel" ? "red" : items.status == "Scheduled" ? "#FE8E3C" : items.status == "Accepted" ? "#FE8E3C" : items.status == "In Progress" ? "#FE8E3C" : items.status == "Dispatched" ? "#FE8E3C" : "#77D32F"
                                        }]}>
                                            <Image source={ARROWRIGHT} style={styles.arrowIcon} />
                                        </View>
                                    </View>

                                </View>
                            </View>
                            <View style={[styles.orderContentInner, { paddingTop: 15 }]}>
                                <View style={{ flex: 1 }}>
                                    <Typography style={styles.dateFieldsName}>{'Placed on'}</Typography>
                                    <Typography style={styles.date}>{dates(foods.created_at)}</Typography>
                                </View>
                                <View style={{ flex: 1, }}>
                                    <Typography style={[styles.dateFieldsName, { textAlign: "right" }]}>{items.status == "Delivered" ? "Delivered on" : "Arriving on"}</Typography>
                                    <Typography style={[styles.date, { textAlign: "right" }]}>{deliverDate}</Typography>
                                    {
                                        items.delivery_date2 !== "" && <Typography style={[styles.date, { textAlign: "right" }]}>{moment(items.delivery_date2).format("DD|MM|YYYY")}</Typography>
                                    }

                                </View>
                            </View>
                            {
                                items.status == "Delivered" && foods.product.rating == 0 && <View style={styles.buttonBox}>
                                    <ButtonFood onPress={() => { ProductRating.navigate(items.id, foods?.product?.id) }} label="RATE ORDER" />
                                </View>
                            }

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
    const [contactEmail, setContactEmail] = useState("");
    const [enableScrollViewScroll, setEnableScrollViewScroll] = useState<boolean>(true);
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
    const generalSettingData = useSelector((state: RootStore) => state.GeneralSettingInState.data);
    const orderListData = useSelector((state: RootStore) => state.OrderListInState.data?.data);
    React.useEffect(() => {
        OrderListControllerInstance.getOrderList();
    }, [])
    React.useEffect(() => {
        if (generalSettingData && generalSettingData.length > 0) {
            generalSettingData.map((obj: any, i: any) => (
                setContactEmail(obj.contact_email)
            ))
        }
    }, [generalSettingData]);
    const onEnableScroll = (isScroll: boolean) => {
        setEnableScrollViewScroll(isScroll)
    }
    return (
        <SafeAreaView style={styles.container}>
            <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
            <ScrollView bounces={false} scrollEnabled={enableScrollViewScroll} >
                {renderAccountInfo(userData)}
                {renderHelpSection(contactEmail)}
                <FlatList
                    scrollEnabled={false}
                    bounces={false}
                    onTouchStart={() => onEnableScroll(true)}
                    onMomentumScrollEnd={() => onEnableScroll(true)}
                    nestedScrollEnabled={false}
                    data={orderListData}
                    renderItem={({ item, index }) => renderItems(item, index)}
                    keyExtractor={(item, index) => index.toString()} />
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