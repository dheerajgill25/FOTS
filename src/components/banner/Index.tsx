import * as React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface BannerComponentProps {
    BANNERIMAGEURL: ImageSourcePropType;
}

const BannerComponent = (props: BannerComponentProps) => {
    return (
        <View style={styles.homeBannerSection}>
            <Image source={props.BANNERIMAGEURL} style={styles.homeBannerImg} resizeMode="stretch" resizeMethod="scale" />
        </View>
    );
};

export default BannerComponent;

const styles = StyleSheet.create({
    homeBannerSection: {
        marginTop: 15,
        marginBottom: 25,
        elevation: 4,
        marginHorizontal:0
    },
    homeBannerImg: {
        width: '100%',
        height: 200,
        borderRadius:6
    },
});
