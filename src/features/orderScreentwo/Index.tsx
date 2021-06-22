import React from "react";
import { FlatList, Image, SafeAreaView, ScrollView, View } from "react-native";
import BaseScreen from "@features/basescreen/Index";
import RootNavigator from "navigation/rootnavigation";
import styles from "./styles";
import RenderButtonWithIcon from "components/buttons/ButtonWithIcon";
import Typography from "components/typography/Typography";
import ProductDetailScreen from "features/productdetail/Index";
import BannerComponent from "components/banner/Index";
import MealPlan from "features/mealplan/Index";
import RootStore from "reduxModule/store/Index";
import { useSelector } from "react-redux";
interface OrderScreenSecondProps { }
const orderData: any[] = [
    {
        imageUrl: require("../../../assets/images/icon4.png"),
        title: 'Choose Your Plan'
    },
    {
        imageUrl: require("../../../assets/images/icon2.png"),
        title: 'Choose Your Meals'
    },
    {
        imageUrl: require("../../../assets/images/icon3.png"),
        title: 'Meals Made & Delivered Fresh'
    },
    {
        imageUrl: require("../../../assets/images/icon1.png"),
        title: 'Eat & Enjoy'
    },
];

const renderHowItsWorks = (item: any, index: number) => {
    return (
        <>
            <View key={item.index} style={styles.howWorkSection}>
                <View style={styles.worksFlex}>
                    <View style={styles.howWorkBox}>
                        <View style={styles.howWorkwrap}>
                            <Image style={[styles.icon, index == 0 && styles.itemImg]} source={item.imageUrl} />
                        </View>
                        <Typography onPress={() => MealPlan.navigate("")} style={styles.title}>{item.title}</Typography>
                    </View>
                </View>
            </View>
        </>
    )
};
const renderFooterItem = () => {
    return (
        <View style={styles.footerSection}>
            <View style={styles.footerBox}>
                <Typography style={styles.footerTitle}>Orders must be placed by 9am to receive the same day delivery</Typography>
            </View>
        </View>
    )
}
const OrderScreenSecond = ({ }: OrderScreenSecondProps) => {
    const generalSettingData = useSelector((state: RootStore) => state.GeneralSettingInState.data);
    const [homePageBanner, setHomePageBanner] = React.useState<string>("");
    React.useEffect(() => {
        if (generalSettingData && generalSettingData.length > 0) {
            generalSettingData.map((obj: any, i: any) => (
                setHomePageBanner(obj.category_banner)
            ))
        }
    }, [generalSettingData])
    return (
        <BaseScreen navigatorBarOptions={{ backIcon: true, cartIcon: true }}>
            <SafeAreaView style={styles.container}>
                <ScrollView bounces={false} nestedScrollEnabled={false}>
                    <View style={styles.homeSection}>
                        <BannerComponent BANNERIMAGEURL={homePageBanner} />
                        <View>
                            <View style={styles.buttonsGroup}>
                                <RenderButtonWithIcon label={'breakfast'} buttonStyle={styles.buttonText} onPress={() => ProductDetailScreen.navigate()} />
                            </View>
                            <View style={styles.buttonsGroup}>
                                <RenderButtonWithIcon label={'lunch'} buttonStyle={styles.buttonText} onPress={() => { OrderScreenSecond.navigate() }} />
                            </View>
                            <View style={styles.buttonsGroup}>
                                <RenderButtonWithIcon label={'dinner'} buttonStyle={styles.buttonText} onPress={() => { }} />
                            </View>
                        </View>
                        <View>
                            <Typography style={styles.foodItemPopluar}>How It Works</Typography>
                            <FlatList scrollEnabled={false} keyExtractor={(item, index) => index.toString()} contentContainerStyle={styles.worksFlex} data={orderData} renderItem={({ item, index }) => renderHowItsWorks(item, index)} />
                        </View>
                        {renderFooterItem()}
                    </View>

                </ScrollView>
            </SafeAreaView>
        </BaseScreen>
    )
}
OrderScreenSecond.SCREEN_NAME = 'OrderScreenSecond';
OrderScreenSecond.navigationOptions = {
    headerShown: false,
};
OrderScreenSecond.navigate = () => {
    RootNavigator.navigate(OrderScreenSecond.SCREEN_NAME);
};
export default OrderScreenSecond;