import CircleNumber from 'components/circleNumber';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import RootStore from '@reduxModule/store/Index';
const CartIcon = ({ onDetailPage, whiteCartIcon, cart }: any) => {
    const IMAGEURL = require('../../../assets/images/cart.png');
    const [cartItems, setCartItems] = useState<number>(0)
    const countNumber = useSelector((state: RootStore) => state.CartCountInState.data?.data)
    useEffect(() => {
        if (countNumber && countNumber.length > 0) {
            countNumber.map((obj: { carts_count: number; }) => {
                setCartItems(obj.carts_count)
            })
        }
    }, [countNumber, cartItems])
    return (
        <>
            <View style={[styles.cartFix, onDetailPage && styles.cartIconOnDetail]}>
                <Image source={onDetailPage ? whiteCartIcon : IMAGEURL} style={{ height: 20, width: 20 }} />
                <View style={{
                    bottom: 10,
                    left: 10,
                }}>
                    <CircleNumber amountCart={cartItems} onDetailPage={onDetailPage}  />
                </View>
            </View>
        </>
    )
}
export default CartIcon;
const styles = StyleSheet.create({
    cartFix: {
        position: "relative",
        right: 10,
        top: 10
    },
    cartIconOnDetail: {
        right: 0
    }
})