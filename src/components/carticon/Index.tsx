import CircleNumber from 'components/circleNumber';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';
import RootStore from '@reduxModule/store/Index';
import CartListControllerInstance from 'features/cart/httpCall/controllers/cartList.controller';

const CartIcon = ({ }) => {
    const IMAGEURL = require('../../../assets/images/cart.png');
    useEffect(()=>{
        CartListControllerInstance.getCartProducts();
    },[])
    const cartLength = useSelector((state:RootStore)=>state.CartListInState.data?.data);
    return (
        <>
            <View style={{ position: "relative",right:10,top:10 }}>
                <Image source={IMAGEURL} style={{ height: 20, width: 20 }} />
                <View style={{
                    bottom: 10,
                    left: 10,
                }}>
                    <CircleNumber amountCart={cartLength?.data?.length} cart />
                </View>
            </View>
        </>
    )
}
export default CartIcon;