
import React, { memo } from 'react';
import { Image, View } from 'react-native';

const BackIconDark = ({ }) => {
    const IMAGEURL = require('../../../assets/images/backicondark.png')
    return (
        <>
            <View>
                <Image source={IMAGEURL} style={{ height: 13, width: 22,marginBottom:5 }} />
            </View>
        </>
    )
}
export default memo(BackIconDark);