import React, { memo } from 'react';
import { Image, View } from 'react-native';

const BackIcon = ({ }) => {
    const IMAGEURL = require('../../../assets/images/backicon.png')
    return (
        <>
            <View>
                <Image source={IMAGEURL} style={{ height: 20, width: 30 }} />
            </View>
        </>
    )
}
export default memo(BackIcon);