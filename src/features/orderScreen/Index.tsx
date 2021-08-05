import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, View } from "react-native";
import BaseScreen from "@features/basescreen/Index";
import RootNavigator from "navigation/rootnavigation";
import styles from "./styles";
import RenderButtonWithIcon from "components/buttons/ButtonWithIcon";
import Typography from "components/typography/Typography";
import ProductDetailScreen from "features/productdetail/Index";
import BannerComponent from "components/banner/Index";
import { MyStatusBar } from "components/statusbar/Index";
import ProductListControllerInstance from "features/products/controllers/product.controller";
import { useSelector } from "react-redux";
import RootStore from "reduxModule/store/Index";
import { window } from "themes/functions";
interface OrderScreenProps {
    route: any;
    params: any
}
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
                        <Typography style={styles.title}>{item.item.title}</Typography>
                    </View>
                </View>
            </View>
        </>
    )
};

const OrderScreen = (props: OrderScreenProps) => {
    const [homePageBanner, setHomePageBanner] = useState<string>("");
    const [bannerImages, setBannerImages] = useState<any>([]);
    const {
        route: { params: { params: { params: { id } } }, },
    } = props;
    useEffect(() => {
        ProductListControllerInstance.getProductList(id,)
    }, [])
    const productList = useSelector((state: RootStore) => state.ProductInState.data?.data?.data);
    const handleProducts = (item: any, index: number) => {
        return (
            <View key={index} style={styles.buttonsGroup}>
                <RenderButtonWithIcon fiveMealBtn label={item.name} onPress={() => ProductDetailScreen.navigate(item.product_id)} />
            </View>
        )
    }
    const generalSettingData = useSelector((state: RootStore) => state.GeneralSettingInState.data);
    useEffect(() => {
        if (generalSettingData && generalSettingData.banner) {
            setBannerImages(generalSettingData.banner?.product);
        }
    }, [generalSettingData])
    const getItemLayout = (data: any, index: any) => ({
        length: window.width / 5,
        offset: window.width / 5 * index,
        index,
    })
    return (
        <BaseScreen navigatorBarOptions={{ backIcon: true, cartIcon: true }}>
            <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <ScrollView bounces={false} nestedScrollEnabled={false}>
                    <BannerComponent imagesUrl={bannerImages} />
                    <View style={styles.homeSection}>
                        <View>
                            <FlatList getItemLayout={getItemLayout} data={productList} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) => handleProducts(item, index)} />
                        </View>
                        <View style={{ paddingBottom: 30 }}>
                            <Typography style={styles.foodItemPopluar}>How It Works</Typography>
                            <FlatList getItemLayout={getItemLayout} scrollEnabled={false} keyExtractor={(item, index) => index.toString()} contentContainerStyle={styles.worksFlex} data={orderData} renderItem={renderHowItsWorks} />
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
OrderScreen.navigate = (id: any) => {
    RootNavigator.navigation('OrderScreen', OrderScreen.SCREEN_NAME, { id: id });
};
export default OrderScreen;