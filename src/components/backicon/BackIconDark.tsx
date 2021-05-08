
import React from 'react';
import { Image, View } from 'react-native';

const BackIconDark = ({ }) => {
    const IMAGEURL = require('../../../assets/images/backicondark.png')
    return (
        <>
            <View>
                <Image source={IMAGEURL} style={{ height: 15, width: 25,marginBottom:5 }} />
            </View>
        </>
    )
}
export default BackIconDark;