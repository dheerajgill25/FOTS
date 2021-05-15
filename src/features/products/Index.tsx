import BannerComponent from 'components/banner/Index';
import Typography from 'components/typography/Typography';
import RootNavigator from 'navigation/rootnavigation';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, FlatList } from 'react-native';
import styles from './styles';

interface ProductScreenProps { };
interface CartDataProps {
    productName: string;
    price: string;
    id: number,
    subTitle: string
}
const cartData: CartDataProps[] = [
    {
        'productName': 'Lemon Grilled Chicken',
        'price': '$0',
        'id': 1,
        "subTitle": 'With roasted baby'
    },
    {
        'productName': 'Grilled Chicken',
        'price': '$0',
        'id': 1,
        "subTitle": 'With roasted baby'
    },
    {
        'productName': 'Lemon Grilled Chicken',
        'price': '$0',
        'id': 1,
        "subTitle": 'With roasted baby'
    },
    {
        'productName': 'Lemon Grilled Chicken',
        'price': '$0',
        'id': 1,
        "subTitle": 'With roasted baby'
    },

]
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
const renderCartItems = (data: any) => {
    const BANNERIMAGEURL = require('../../../assets/images/noimg.png');
    return (
        <View style={styles.cartBox}>
            <View style={styles.cartItemWrap}>
                <View style={styles.shoppingCartBox}>
                    <View style={styles.shoppingCartWrap}>
                        <View style={styles.shoppingCartLeft}>
                            <Image style={styles.bannerImage} source={BANNERIMAGEURL} />
                        </View>
                        <View style={styles.shoppingCartRight}>
                            <Typography style={[styles.shoppingCartTitle, styles.productName]}>{data.productName}</Typography>
                            <View style={styles.ratingComp}>
                                {ratingComponent()}
                            </View>
                            <Typography style={[styles.shoppingCartSubText]}>{data.subTitle}</Typography>

                        </View>
                        <View style={{ flex: 1, maxWidth: 60 }}>
                            <Typography style={[styles.shoppingCartSubTitle, styles.productPrice]}>{data.price}</Typography>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
const ProductScreen = (props: ProductScreenProps) => {
    const HOMEBANNERIMAGEURL = require('../../../assets/images/banner2.png');
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={false}>
                <View style={{ marginHorizontal: 20 }}>
                    <BannerComponent BANNERIMAGEURL={HOMEBANNERIMAGEURL} />
                </View>
                <FlatList data={cartData} scrollEnabled={false} style={{ marginBottom: 23 }} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => renderCartItems(item)} />
            </ScrollView>
        </SafeAreaView>
    );
};
ProductScreen.SCREEN_NAME = "ProductScreen";
ProductScreen.navigationOptions = {
    headerShown: false,
};
ProductScreen.navigate = () => {
    RootNavigator.navigate(ProductScreen.SCREEN_NAME);
};
export default ProductScreen;