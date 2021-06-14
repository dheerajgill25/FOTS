import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import * as React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType, ImageBackground } from 'react-native';

interface BannerComponentProps {
    label?: any;
    BANNERIMAGEURL: any;
}

const BannerComponent = (props: BannerComponentProps) => {
    return (
        <View style={styles.homeBannerSection}>
            <ImageBackground source={{uri:props.BANNERIMAGEURL}} style={styles.homeBannerImg} resizeMode="stretch" resizeMethod="scale" >
                {
                    props.label && (
                        <View style={styles.textBox}>
                            <Typography style={styles.label}>Order one of our farm fresh recipes
                            & have the ingredients delivered to
                        your firehouse the same day.</Typography>
                        </View>
                    )
                }

            </ImageBackground>
        </View>
    );
};

export default React.memo(BannerComponent);

const styles = StyleSheet.create({
    homeBannerSection: {
        marginTop: 15,
        marginBottom: 25,
        elevation: 4,
        marginHorizontal: 0
    },
    homeBannerImg: {
        width: '100%',
        height: 200,
        borderRadius: 7
    },
    textBox:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        paddingHorizontal:8,
        height:"100%"
    },
    label: {
        fontFamily: FontFamilyFoods.POPPINSBOLD,
        fontSize: 18,
        lineHeight: 27,
        color: 'white',
        textAlign: "center",
        textAlignVertical:"bottom",
    }
});
