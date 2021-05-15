import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
interface ButtonWithTextProps{
    label:string;
    onPress:()=>void;
    subText:string
}
const ButtonWithText = ({label,onPress,subText}:ButtonWithTextProps) => {
    const IMAGEURLFILTER = require("../../../assets/images/arrowleft.png")
    return (
        <LinearGradient colors={['#D80000', '#D80000']} style={{borderRadius:30}}>
            <View style={styles.filterButton}>
                <Typography onPress={onPress} style={styles.filterText}>{label}</Typography>
                <Typography onPress={onPress} style={styles.subText}>{subText}</Typography>
            </View>
        </LinearGradient>
    )
}
export default ButtonWithText;

const styles = StyleSheet.create({
    filterText: {
        fontSize:15,
        lineHeight: 23,
        color:'#fff',
        textAlign:'left',
        flex:1,
        fontFamily:FontFamilyFoods.POPPINSMEDIUM,
        textTransform:'capitalize',
        letterSpacing:0.7,
        paddingLeft:10
    },
    subText: {
        fontSize:17 ,
        lineHeight: 25,
        color:'#fff',
        textAlign:"right",
        flex:1,
        fontFamily:FontFamilyFoods.POPPINSBOLD,
        textTransform:'capitalize',
        letterSpacing:0.7
    },
    filterButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginRight: 20,
        padding: 10,
        paddingVertical:12,
        borderRadius: 4,
    },
})