import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
interface ButtonWithIconProps{
    label:string;
    onPress:()=>void,
    buttonStyle:{}
}
const RenderButtonWithIcon = ({label,onPress,buttonStyle}:ButtonWithIconProps) => {
    const IMAGEURLFILTER = require("../../../assets/images/arrowleft.png")
    return (
        <LinearGradient colors={['#D80000', '#D80000']} style={{borderRadius:5}}>
            <View style={styles.filterButton}>
                <Typography onPress={onPress} style={buttonStyle?buttonStyle:styles.filterText}>{label}</Typography>
                <Image source={IMAGEURLFILTER} style={styles.filterIcon} />
            </View>
        </LinearGradient>
    )
}
export default RenderButtonWithIcon;

const styles = StyleSheet.create({
    filterText: {
        fontSize:17 ,
        lineHeight: 25,
        color:'#fff',
        textAlign:'left',
        flex:1,
        fontFamily:FontFamilyFoods.POPPINSBOLD,
        textTransform:'uppercase',
        letterSpacing:0.7
    },
    filterIcon: {
        width:10,
        height:15,
        alignItems:'flex-end',
        justifyContent:'flex-end',
        display:'flex',
        marginLeft:15
    },
    filterButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingVertical:12,
        borderRadius: 4,
        justifyContent:'space-between'
    },
})