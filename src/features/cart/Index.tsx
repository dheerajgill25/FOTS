import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckOutBox from 'components/checkoutbox/Index';
import ImageComponent, { Priority, ResizeMode } from 'components/imageComponent/ImageComponent';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import CheckOutControllerInstance from 'features/commonApiCall/checkout/controllers/checkout.controller';
import RemoveCartControllerInstance from 'features/commonApiCall/removeCart/controllers/reomveToCart.controller';
import HomeScreen from 'features/home/Index';
import RootNavigator from 'navigation/rootnavigation';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';
import { window } from 'themes/functions';
import CartListControllerInstance from './httpCall/controllers/cartList.controller';
import styles from './styles';
interface CartProps { }
const renderShoppingCartSection = (length: any, type: string, data: any) => {
    const CARTURL = require('../../../assets/images/cart.png');
    const removeAllProduct = async () => {
        length > 0 ? RemoveCartControllerInstance.RemoveCartAllProducts(data && data.category_id, data && data.meal_id, type) : Snackbar.show({
            text: 'Cart is already empty',
            textColor: "white",
            duration: 3000,
            fontFamily: FontFamilyFoods.POPPINS
        });
        return
    }
    return (
        <>
            {length > 0 && <View style={{ justifyContent: "flex-end", flex: 1, marginTop: 10, }}>
                <TouchableOpacity onPress={() => removeAllProduct()}>
                    <Typography style={styles.removeAllTextButton}>Remove All</Typography>
                </TouchableOpacity>
            </View>}
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
        </>
    )
}
const renderCartItems = (data: any, i: number, type: string, length: any) => {
    const CLOSEICON = require('../../../assets/images/cut.png');
    const { product, id, cart_id } = data;
    const handleRemoveCart = () => {
        RemoveCartControllerInstance.RemoveCartProducts(cart_id, product.id, type, product?.category_id, length)
    }
    return (
        <View key={i} style={styles.cartBox}>
            <View style={styles.cartItemWrap}>
                <View style={styles.shoppingCartBox}>
                    <View style={styles.shoppingCartWrap}>
                        <View style={[styles.shoppingCartLeft]}>
                            <ImageComponent imageStyle={styles.bannerImage} uri={product?.thumbnail} resizeMode={ResizeMode.cover} priority={Priority.low} />
                        </View>
                        <View style={styles.shoppingCartRight}>
                            <Typography style={[styles.shoppingCartTitle, styles.productName]}>{product?.name}</Typography>
                            <Typography style={[styles.shoppingCartSubTitle, styles.productPrice]}>{"$" + product?.net_amount}</Typography>
                        </View>

                    </View>
                </View>
                <View style={[styles.removeIcon]}>
                    <TouchableOpacity onPress={() => handleRemoveCart()}>
                        <Image source={CLOSEICON} style={{ height: 22, width: 20, }} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const renderEmptyCom = () => {
    return (
        <Typography style={[{ textAlign: "center", color: "#D80000", fontFamily: FontFamilyFoods.POPPINS, fontSize: 20, marginTop: 50, }]}>Cart is Empty</Typography>
    )
}
const CartScreen = ({ }: CartProps) => {
    const [coupenCode, setCoupenCode] = useState<string>("")
    useEffect(() => {
        CartListControllerInstance.getCartProducts();
    }, []);
    const countNumber = useSelector((state: RootStore) => state.CartCountInState.data)
    const cartData = useSelector((state: RootStore) => state.CartListInState.data?.data);
    useEffect(() => {
        if (countNumber && countNumber.length > 0) {
            countNumber.map((obj: { carts_count: number; }) => {
                if (obj.carts_count <= 0) {
                    HomeScreen.navigate();
                    Snackbar.show({
                        text: 'Cart is empty',
                        textColor: "white",
                        duration: 3000,
                        fontFamily: FontFamilyFoods.POPPINS
                    });
                }
            })
        }
    }, [countNumber, cartData])
    const handleCheckout = () => {
        CheckOutControllerInstance.Checkout(coupenCode);
    }
    const coupenCodeSection = () => {
        const COUPENURL = require('../../../assets/images/coupencode.png');
        return (
            <View style={styles.coupenCodeSection}>
                <View style={styles.coupenCodeWrap}>
                    <View style={styles.coupenCodeBox}  >
                        <View style={styles.coupenForm}>
                            <TextInput placeholder="Have Coupen Code?"
                                editable={cartData?.type == "meal" ? true : false}
                                style={styles.formControl}
                                onChangeText={(code: string) => setCoupenCode(code)}
                                placeholderTextColor={"#A3A3A3"} />
                            <Image source={COUPENURL} style={styles.coupenIcon} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    const getItemLayout = (data: any, index: any) => ({
        length: window.width / 5,
        offset: window.width / 5 * index,
        index,
    })
    return (
        <View style={styles.container}>
            <ScrollView bounces={false} nestedScrollEnabled={false}>
                {renderShoppingCartSection(cartData && cartData?.data[0]?.cart_item?.length, cartData && cartData?.type, cartData && cartData?.data[0])}
                <FlatList
                    getItemLayout={getItemLayout}
                    data={cartData?.data && cartData?.data[0]?.cart_item}
                    ListEmptyComponent={() => renderEmptyCom()} scrollEnabled={false}
                    style={{ marginTop: 20, marginBottom: 13 }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => renderCartItems(item, index, cartData?.type, cartData && cartData?.data[0]?.cart_item?.length)} />
                {cartData?.type == "meal" && coupenCodeSection()}
            </ScrollView>
            {
                cartData?.type == "meal" || cartData?.type == "free" ? (
                    <CheckOutBox totalMrp={`$${parseInt(cartData?.total_mrp)}`}
                        totalDiscount={`$${parseInt(cartData?.total_discount)}`}
                        total={`$${parseInt(cartData?.total_amount)}`} label="Checkout" deliveryFee={cartData?.delivery_fee == 0 ? "Free" : `$${cartData?.delivery_fee}`} tax={`$${parseInt(cartData?.tax_amount)}`} onPress={() => handleCheckout()} />
                ) : (
                    <View />
                )
            }

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


