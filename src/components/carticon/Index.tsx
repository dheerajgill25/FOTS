import CircleNumber from 'components/circleNumber';
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';
import RootStore from '@reduxModule/store/Index';
import CartListControllerInstance from 'features/cart/httpCall/controllers/cartList.controller';

const CartIcon = ({ }) => {
    const IMAGEURL = require('../../../assets/images/cart.png');
    const [cartItems,setCartItems] = useState<number>(0)
    useEffect(()=>{
        CartListControllerInstance.getCartProducts();
    },[])
    const cartData = useSelector((state:RootStore)=>state.CartListInState.data?.data);
    useEffect(()=>{
        if(cartData?.data&&cartData?.data?.length>0){
            setCartItems(cartData?.data[0]?.cart_item?.length)
        }else{
            setCartItems(0)
        }
    },[cartData])
    return (
        <>
            <View style={{ position: "relative",right:10,top:10 }}>
                <Image source={IMAGEURL} style={{ height: 20, width: 20 }} />
                <View style={{
                    bottom: 10,
                    left: 10,
                }}>
                    <CircleNumber amountCart={cartItems} cart />
                </View>
            </View>
        </>
    )
}
export default CartIcon;