import { CheckOutBox } from 'components/checkoutbox/Index';
import Typography from 'components/typography/Typography';
import BeforePayNow from 'features/paynow/Index';
import RootNavigator from 'navigation/rootnavigation';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, FlatList, TextInput } from 'react-native';
import styles from './styles';
interface CartProps {

}
interface CartDataProps {
    productName: string;
    price: string;
    id: number
}
const cartData: CartDataProps[] = [
    {
        'productName': 'Lemon Grilled Chicken',
        'price': '$0',
        'id': 1
    },


]
const renderShoppingCartSection = () => {
    const CARTURL = require('../../../assets/images/cart.png');
    return (
        <View style={styles.shoppingCartSection}>
            <View style={styles.shoppingCartBox}>
                <View style={styles.shoppingCartWrap}>
                    <View style={styles.shoppingCartLeft}>
                        <Image style={styles.cartIcon} source={CARTURL} />
                    </View>
                    <View style={styles.shoppingCartRight}>
                        <Typography style={styles.shoppingCartTitle}>Shopping Cart</Typography>
                        <Typography style={styles.shoppingCartSubTitle}>Verify your quantity and click checkout</Typography>
                    </View>
                </View>
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
                        <View style={[styles.shoppingCartLeft, styles.borderBox]}>
                            <Image style={styles.bannerImage} source={BANNERIMAGEURL} />
                        </View>
                        <View style={styles.shoppingCartRight}>
                            <Typography style={[styles.shoppingCartTitle, styles.productName]}>{data.productName}</Typography>
                            <Typography style={[styles.shoppingCartSubTitle, styles.productPrice]}>{data.price}</Typography>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
const coupenCodeSection = () => {
    const COUPENURL = require('../../../assets/images/coupencode.png');
    return (
        <View style={styles.coupenCodeSection}>
            <View style={styles.coupenCodeWrap}>
                <View style={styles.coupenCodeBox}  >
                    <View style={styles.coupenForm}>
                        <TextInput placeholder="Have Coupen Code?" style={styles.formControl} placeholderTextColor={"#A3A3A3"} />
                        <Image source={COUPENURL} style={styles.coupenIcon} />
                    </View>
                </View>
            </View>
        </View>
    )
}
const CartScreen = ({ }: CartProps) => {

    return (
        <View style={styles.container}>
            <ScrollView bounces={false} nestedScrollEnabled={false}>
                {renderShoppingCartSection()}
                <FlatList data={cartData} scrollEnabled={false} style={{ marginTop: 38, marginBottom: 23 }} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => renderCartItems(item)} />
                {coupenCodeSection()}
            </ScrollView>
            <CheckOutBox total="$10" label="Checkout" deliveryFee="free" tax="$0" onPress={()=>BeforePayNow.navigate()} />
        </View>
    )
}
CartScreen.SCREEN_NAME = 'CartScreen';
CartScreen.navigationOptions = {
    headerShown: false,
};
CartScreen.navigate = () => {
    RootNavigator.navigate(CartScreen.SCREEN_NAME);
};
export default CartScreen