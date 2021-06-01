import { CheckOutBox } from 'components/checkoutbox/Index';
import Typography from 'components/typography/Typography';
import ThankYouScreen from 'features/thankyou/Index';
import RootNavigator from 'navigation/rootnavigation';
import * as React from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, FlatList } from 'react-native';
import styles from './styles';

interface BeforePayNowProps { }
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
const renderDateOfDeliverSection = () => {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var currentDate:Date =new Date()
    var day = days[currentDate.getDay()];
    var month = months[currentDate.getMonth()];
    function dates() {
        var dayOfWeek = 5;//friday
        var date = currentDate;
        date.setDate(date.getDate() + (dayOfWeek + 7 - date.getDay()) % 7);
       return date;
      }
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
                            <Typography style={styles.date}>{dates().toDateString()}</Typography>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
const BeforePayNow = (props: BeforePayNowProps) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={false} nestedScrollEnabled={false}>
                <FlatList scrollEnabled={false} bounces={false} nestedScrollEnabled={false} data={data} renderItem={({ item }) => renderItems(item)} keyExtractor={(item, index) => index.toString()} />
                {renderDateOfDeliverSection()}
            </ScrollView>
            <CheckOutBox label="Order Now" total="$10" deliveryFee="free" tax="$0" onPress={() => ThankYouScreen.navigate()} />
        </SafeAreaView>
    );
};
BeforePayNow.SCREEN_NAME = 'BeforePayNow';
BeforePayNow.navigationOptions = {
    headerShown: false,
};
BeforePayNow.navigate = () => {
    RootNavigator.navigate(BeforePayNow.SCREEN_NAME);
};
export default BeforePayNow;
