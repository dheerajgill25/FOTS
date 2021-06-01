import { CheckOutBox } from 'components/checkoutbox/Index';
import Typography from 'components/typography/Typography';
import BeforePayNow from 'features/paynow/Index';
import RootNavigator from 'navigation/rootnavigation';
import React, { useEffect } from 'react';
import { View, ScrollView, Image, FlatList, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';
import CartListControllerInstance from './httpCall/controllers/cartList.controller';
import styles from './styles';
interface CartProps {}
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
    const {product} = data;
    return (
        <View style={styles.cartBox}>
            <View style={styles.cartItemWrap}>
                <View style={styles.shoppingCartBox}>
                    <View style={styles.shoppingCartWrap}>
                        <View style={[styles.shoppingCartLeft, styles.borderBox]}>
                            <Image style={styles.bannerImage} resizeMode="contain" source={{uri:product?.thumbnail}} />
                        </View>
                        <View style={styles.shoppingCartRight}>
                            <Typography style={[styles.shoppingCartTitle, styles.productName]}>{product?.name}</Typography>
                            <Typography style={[styles.shoppingCartSubTitle, styles.productPrice]}>{"$"+product?.amount}</Typography>
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
                        <TextInput placeholder="Have Coupen Code?" editable={false} style={styles.formControl} placeholderTextColor={"#A3A3A3"} />
                        <Image source={COUPENURL} style={styles.coupenIcon} />
                    </View>
                </View>
            </View>
        </View>
    )
}
const CartScreen = ({ }: CartProps) => {
    useEffect(()=>{
        CartListControllerInstance.getCartProducts();
    },[]);
    const cartData = useSelector((state:RootStore)=>state.CartListInState.data?.data);

    return (
        <View style={styles.container}>
            <ScrollView bounces={false} nestedScrollEnabled={false}>
                {renderShoppingCartSection()}
                <FlatList data={cartData?.data} scrollEnabled={false} style={{ marginTop: 20, marginBottom: 13 }} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => renderCartItems(item)} />
                {coupenCodeSection()}
            </ScrollView>
            <CheckOutBox totalMrp={`$${cartData?.total_mrp}`} total={`$${cartData?.total_amount}`} label="Checkout" deliveryFee={cartData?.total_amount==0?"Free":"Paid"} tax="$0" onPress={()=>BeforePayNow.navigate()} />
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