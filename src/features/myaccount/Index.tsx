
import Typography from 'components/typography/Typography';
import RootNavigator from 'navigation/rootnavigation';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, FlatList } from 'react-native';
import styles from './styles';

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
const renderAccountInfo = () => {
    return (
        <View style={styles.accountInfoSecion}>
            <View style={styles.accountInfoBox}>
                <View style={styles.accountInfoWrap}>
                    <View style={styles.accountInfoContent}>
                        <Typography style={styles.accountName}>Eon Rovena</Typography>
                        <Typography style={styles.accountEmail}>+87-5421368796   •   eon458@gmail.com</Typography>
                    </View>
                    <View style={styles.accountInfoContent}>
                        <Typography style={styles.editBtn}>Edit</Typography>
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
            </View>
        </View>
    )
}
interface ButtonWithIconProps{
    label:string;
    onPress:()=>void
}
const ButtonFood = ({label,onPress}:ButtonWithIconProps)=>{
    return(
        <View style={styles.filterButton}>
            <Typography onPress={onPress} style={styles.filterText}>{label}</Typography>
        </View>
    )
}
const renderItems = (items: OrderDataProps, index: any) => {
    const ARROWRIGHT = require('../../../assets/images/rightarrow.png')
    return (
        <View style={styles.orderContentbox}>
            {
                index == 0 && <View style={styles.myOrderBox}>
                    <Typography style={styles.myOrderText}>MY ORDERS</Typography>
                </View>
            }
            <View style={styles.orderContentWrap}>
                <View style={styles.orderContentInner}>
                    <View style={styles.orderContentLeft}>
                        <Typography style={styles.orderProuctName}>{items.productName}</Typography>
                    </View>
                    <View style={styles.orderStatusBox}>
                        <View style={styles.orderStatuswrp}>
                            <Typography style={styles.orderStatusType}>{items.productStatus == STATUS.PROCESSING ? "In Process" : items.productStatus == STATUS.DISPATCH ? "Dispatch" : items.productStatus == STATUS.DELIVERED ? "Delivered" : "Status Unknown"}</Typography>
                            <View style={[styles.orderStatus,{
                                backgroundColor:items.productStatus == STATUS.PROCESSING ? "#FE8E3C" :items.productStatus == STATUS.DISPATCH ?"#FE8E3C":items.productStatus == STATUS.DELIVERED ? "#77D32F" : "Status Unknown"
                            }]}>
                                <Image source={ARROWRIGHT} style={styles.arrowIcon} />
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.buttonBox}>
                    <ButtonFood onPress={() => { }} label="RATE ORDER"   />
                </View>
            </View>
        </View>
    )
}
const MyAccount = (props: MyAccountProps) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={false} >
                {renderAccountInfo()}
                {renderHelpSection()}
                <FlatList scrollEnabled={false} bounces={false} nestedScrollEnabled={false} data={orderData} renderItem={({ item, index }) => renderItems(item, index)} keyExtractor={(item, index) => index.toString()} />
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