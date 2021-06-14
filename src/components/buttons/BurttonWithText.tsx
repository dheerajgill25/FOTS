import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import React, { memo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
interface ButtonWithTextProps{
    label:string;
    onPress:()=>void;
    subText:string|undefined
}
const ButtonWithText = ({label,onPress,subText}:ButtonWithTextProps) => {
    return (
            <TouchableOpacity style={styles.filterButton}>
                <Typography onPress={onPress} style={styles.filterText}>{label}</Typography>
                <Typography onPress={onPress} style={styles.subText}>{subText}</Typography>
            </TouchableOpacity>
    )
}
export default memo(ButtonWithText);

const styles = StyleSheet.create({
    filterText: {
        fontSize:15,
        lineHeight: 23,
        color:'#fff',
        textAlign:'left',
        flex:1,
        fontFamily:FontFamilyFoods.POPPINS,
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
        letterSpacing:0.7,
        paddingRight:10
    },
    filterButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginRight: 10,
        padding: 10,
        paddingVertical:12,
        borderRadius: 30,
        backgroundColor:"#D80000",
        alignSelf:"center",
        paddingRight:10
    },
})