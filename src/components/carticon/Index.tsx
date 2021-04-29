import React from 'react';
import { Image, View } from 'react-native';

const CartIcon = ({ }) => {
    const IMAGEURL = require('../../../assets/images/cart.png')
    return (
        <>
            <View>
                <Image source={IMAGEURL} style={{ height: 20, width: 20 }} />
            </View>
        </>
    )
}
export default CartIcon;