import CircleNumber from 'components/circleNumber';
import React, { memo, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import RootStore from '@reduxModule/store/Index';
import CartScreen from 'features/cart/Index';
import Snackbar from 'react-native-snackbar';
import { FontFamilyFoods } from 'components/typography/Typography';
interface CartIconProps{
    onDetailPage?:any;
    whiteCartIcon?:any;
    cart?:any;
    height?:any;
    width?:any;
    alignItems?: string,
    justifyContent?: string,
}
const CartIcon = ({ onDetailPage, whiteCartIcon, cart,height,width,alignItems ,justifyContent}: CartIconProps) => {
    const IMAGEURL = require('../../../assets/images/cart.png');
    const [cartItems, setCartItems] = useState<number>(0)
    const countNumber = useSelector((state: RootStore) => state.CartCountInState.data)
    useEffect(() => {
        if (countNumber && countNumber.length > 0) {
            countNumber.map((obj: { carts_count: number; }) => {
                setCartItems(obj.carts_count)
            })
        } else {
            setCartItems(0)
        }
    }, [countNumber, cartItems])
    const navigateToCart = () => {
        if (cartItems <= 0) {
            Snackbar.show({
                text: 'Cart is empty',
                textColor: "white",
                duration: 3000,
                fontFamily: FontFamilyFoods.POPPINS
            })
            return
        } else {
            CartScreen.navigate()
        }
    }
    return (
        <>
            <View style={[styles.cartFix, onDetailPage && styles.cartIconOnDetail,height,width,justifyContent,alignItems,{marginRight: 10,}]}>
                <TouchableOpacity onPress={() =>  navigateToCart()}>
                    <Image source={onDetailPage ? whiteCartIcon : IMAGEURL} style={{ height: 20, width: 20 }} />
                    <View style={{
                        bottom: 10,
                        left: 10,
                    }}>
                        <CircleNumber amountCart={cartItems} onDetailPage={onDetailPage} />
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
}
export default memo(CartIcon);
const styles = StyleSheet.create({
    cartFix: {
        position: "relative",
        right: 10,
        top: 10
    },
    cartIconOnDetail: {
        right: 0,
    }
})