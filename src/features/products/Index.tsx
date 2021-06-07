import BannerComponent from 'components/banner/Index';
import ModalComponent from 'components/popup/Index';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import ProductDetailScreen from 'features/productdetail/Index';
import RootNavigator from 'navigation/rootnavigation';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';
import ProductListControllerInstance from './controllers/product.controller';
import styles from './styles';

interface ProductScreenProps { route: any };

const ratingComponent = () => {
    return (
        <View style={styles.foodItemRatingBox}>
            <View style={styles.foodItemRating}>
                <Image source={require("../../../assets/images/star.png")} style={styles.rating} />
            </View>
            <View style={styles.foodItemRating}>
                <Image source={require("../../../assets/images/star.png")} style={styles.rating} />
            </View>
            <View style={styles.foodItemRating}>
                <Image source={require("../../../assets/images/star.png")} style={styles.rating} />
            </View>
            <View style={styles.foodItemRating}>
                <Image source={require("../../../assets/images/star.png")} style={styles.rating} />
            </View>

        </View>
    )
}
const renderCartItems = (data: any,meal:boolean) => {
    const BANNERIMAGEURL = data.image && data?.image?.length > 0 ? data?.image[0]?.image : "";
    console.log(meal)
    return (
        <View style={styles.cartBox}>
            <View style={styles.cartItemWrap}>
                <View style={styles.shoppingCartBox}>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => ProductDetailScreen.navigate(data.product_id,meal)} style={styles.shoppingCartWrap}>
                        <View style={styles.shoppingCartLeft}>
                            <Image style={styles.bannerImage} source={{ uri: BANNERIMAGEURL }} resizeMode="center" />
                        </View>
                        <View style={styles.shoppingCartRight}>
                            <Typography style={[styles.shoppingCartTitle, styles.productName]}>{data.name}</Typography>
                            <View style={styles.ratingComp}>
                                {ratingComponent()}
                            </View>
                            <Typography style={[styles.shoppingCartSubText]}>{data?.sub_title}</Typography>

                        </View>
                        <View style={{ flex: 1, maxWidth: 60 }}>
                            <Typography style={[styles.shoppingCartSubTitle, styles.productPrice]}>{`$${data.amount}`}</Typography>
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
    const HOMEBANNERIMAGEURL = require('../../../assets/images/banner2.png');
    const {
        route: { params: { cId, id ,meal} },
    } = props;
    React.useEffect(() => {
        ProductListControllerInstance.getProductList(cId, id)
    }, [])
    const productList = useSelector((state: RootStore) => state.ProductInState.data?.data?.data);
    return (
        <SafeAreaView style={styles.container}>
            <ModalComponent label={"Orders must be placed by 12pm Friday."} mealPlan subTitle="*5 and 7 - day meal plans will require 2 deliveries to ensure freshness." />
            <ScrollView bounces={false}>
                <View style={{ marginHorizontal: 20 }}>
                    <BannerComponent BANNERIMAGEURL={HOMEBANNERIMAGEURL} />
                </View>
                <FlatList data={productList} ListEmptyComponent={() => renderEmptyCom()} scrollEnabled={false} style={{ marginBottom: 23 }} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => renderCartItems(item,meal)} />
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