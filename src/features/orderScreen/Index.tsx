import React from "react";
import { FlatList, Image, SafeAreaView, ScrollView, View } from "react-native";
import BaseScreen from "@features/basescreen/Index";
import RootNavigator from "navigation/rootnavigation";
import styles from "./styles";
import FoodItemsComponent from "components/foodItems/Index";
import RenderButtonWithIcon from "components/buttons/ButtonWithIcon";
import Typography from "components/typography/Typography";
import ProductDetailScreen from "features/productdetail/Index";
import BannerComponent from "components/banner/Index";
import MealPlan from "features/mealplan/Index";
import OrderScreenSecond from "features/orderScreentwo/Index";
import { MyStatusBar } from "components/statusbar/Index";
interface OrderScreenProps { }
const orderData: any[] = [
    {
        imageUrl: require("../../../assets/images/icon2.png"),
        title: 'Choose Your Meal'
    },
    {
        imageUrl: require("../../../assets/images/icon1.png"),
        title: 'We Package & Deliver'
    },
    {
        imageUrl: require("../../../assets/images/icon3.png"),
        title: 'You Cook & Eat'
    },
];

const renderHowItsWorks = (item: any) => {
    return (
        <>
            <View key={item.index} style={styles.howWorkSection}>
                <View style={styles.worksFlex}>
                    <View style={styles.howWorkBox}>
                        <View style={styles.howWorkwrap}>
                            <Image style={styles.icon} source={item.item.imageUrl} />
                        </View>
                        <Typography onPress={()=>MealPlan.navigate()} style={styles.title}>{item.item.title}</Typography>
                    </View>
                </View>
            </View>
        </>
    )
};
// const renderFooterItem = () => {
//     return (
//         <View style={styles.footerSection}>
//             <View style={styles.footerBox}>
//                 <Typography style={styles.footerTitle}>Orders must be placed by 9am to receive the same day delivery</Typography>
//             </View>
//         </View>
//     )
// }
const OrderScreen = ({ }: OrderScreenProps) => {
    const BANNERIMAGEURL = require('../../../assets/images/banner2.png');
    return (
        <BaseScreen navigatorBarOptions={{ backIcon: true, cartIcon: true }}>
             <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <ScrollView bounces={false} nestedScrollEnabled={false}>
                    <View style={styles.homeSection}>
                    <BannerComponent BANNERIMAGEURL={BANNERIMAGEURL}/>
                        <View>
                            <View style={styles.buttonsGroup}>
                                <RenderButtonWithIcon label={'Peruvian Chicken'} buttonStyle={styles.buttonText}  onPress={() => ProductDetailScreen.navigate()} />
                            </View>
                            <View style={styles.buttonsGroup}>
                                <RenderButtonWithIcon label={'meal type 2'} buttonStyle={styles.buttonText} onPress={() => { OrderScreenSecond.navigate()}} />
                            </View>
                            <View style={styles.buttonsGroup}>
                                <RenderButtonWithIcon label={'meal type 3'} buttonStyle={styles.buttonText} onPress={() => { }} />
                            </View>
                        </View>
                        <View>
                            <Typography style={styles.foodItemPopluar}>How It Works</Typography>
                            <FlatList scrollEnabled={false} keyExtractor={(item, index) => index.toString()} contentContainerStyle={styles.worksFlex} data={orderData} renderItem={renderHowItsWorks} />
                        </View>
                        {/* {renderFooterItem()} */}
                    </View>

                </ScrollView>
            </SafeAreaView>
        </BaseScreen>
    )
}
OrderScreen.SCREEN_NAME = 'OrderScreen';
OrderScreen.navigationOptions = {
    headerShown: false,
};
OrderScreen.navigate = () => {
    RootNavigator.navigate(OrderScreen.SCREEN_NAME);
};
export default OrderScreen;