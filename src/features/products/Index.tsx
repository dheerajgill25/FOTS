import BannerComponent from 'components/banner/Index';
import ImageComponent, { Priority, ResizeMode } from 'components/imageComponent/ImageComponent';
import ModalComponent from 'components/popup/Index';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import ProductDetailScreen from 'features/productdetail/Index';
import RootNavigator from 'navigation/rootnavigation';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity, } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';
import { window } from 'themes/functions';
import ProductListControllerInstance from './controllers/product.controller';
import styles from './styles';

interface ProductScreenProps { route: any };

const ratingComponent = (rating:any) => {
    return (
        <Rating
            style={{ paddingVertical: 5, alignSelf: "flex-start" }}
            imageSize={20}
            startingValue={rating}
            readonly
        />
    )
}
const renderCartItems = (data: any, meal: boolean) => {
    const BANNERIMAGEURL = data.image && data?.image?.length > 0 ? data?.image[0]?.image : "";
    return (
        <View style={styles.cartBox}>
            <View style={styles.cartItemWrap}>
                <View style={styles.shoppingCartBox}>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => ProductDetailScreen.navigate(data.product_id, meal)} style={styles.shoppingCartWrap}>
                        <View style={styles.shoppingCartLeft}>
                            <ImageComponent uri={BANNERIMAGEURL} imageStyle={styles.bannerImage} priority={Priority.low} resizeMode={ResizeMode.cover} />
                        </View>
                        <View style={styles.shoppingCartRight}>
                            <Typography style={[styles.shoppingCartTitle, styles.productName]}>{data.name}</Typography>
                            <View style={styles.ratingComp}>
                                {ratingComponent(data?.rating)}
                            </View>
                            <Typography style={[styles.shoppingCartSubText]}>{data?.sub_title}</Typography>

                        </View>
                        <View style={{ flex: 1, maxWidth: 60 }}>
                            <Typography style={[styles.shoppingCartSubTitle, styles.productPrice]}>{`$${data.net_amount}`}</Typography>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const renderEmptyCom = () => {
    return (
        <Typography style={[{ textAlign: "center", color: "#D80000", fontFamily: FontFamilyFoods.POPPINS, fontSize: 20 }]}>No Products Available</Typography>
    )
}
const ProductScreen = (props: ProductScreenProps) => {
    const [homePageBanner, setHomePageBanner] = React.useState<string>("");
    const {
        route: { params: { cId, id, meal } },
    } = props;
    React.useEffect(() => {
        ProductListControllerInstance.getProductList(cId, id)
    }, [])
    const productList = useSelector((state: RootStore) => state.ProductInState.data?.data?.data);
    const generalSettingData = useSelector((state: RootStore) => state.GeneralSettingInState.data);
    React.useEffect(() => {
        if (generalSettingData && generalSettingData.length > 0) {
            generalSettingData.map((obj: any, i: any) => (
                setHomePageBanner(obj.product_banner)
            ))
        }
    }, [generalSettingData]);
    const getItemLayout = (data: any, index: any) => ({
        length: window.width / 5,
        offset: window.width / 5 * index,
        index,
    })
    return (
        <SafeAreaView style={styles.container}>
            <ModalComponent label={"Orders must be placed by 12pm Friday."} mealPlan subTitle="*5 and 7 - day meal plans will require 2 deliveries to ensure freshness." />
            <ScrollView bounces={false}>
                <View style={{ marginHorizontal: 20 }}>
                    <BannerComponent BANNERIMAGEURL={homePageBanner} />
                </View>
                <FlatList getItemLayout={getItemLayout} data={productList} ListEmptyComponent={() => renderEmptyCom()} scrollEnabled={false} style={{ marginBottom: 23 }} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => renderCartItems(item, meal)} />
            </ScrollView>
        </SafeAreaView>
    );
};
ProductScreen.SCREEN_NAME = "ProductScreen";
ProductScreen.navigationOptions = {
    headerShown: false,
};
ProductScreen.navigate = (cId: string, id: string, meal: boolean) => {
    RootNavigator.navigate(ProductScreen.SCREEN_NAME, { cId: cId, id: id, meal: meal });
};
export default ProductScreen;