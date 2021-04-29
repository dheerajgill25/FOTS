import React from 'react';
import { Image, View } from 'react-native';

const MenusIcons = ({ }) => {
    const IMAGEURL = require('../../../assets/images/menus.png')
    return (
        <>
            <View>
                <Image source={IMAGEURL} style={{ height: 15, width: 25 }} />
            </View>
        </>
    )
}
export default MenusIcons;