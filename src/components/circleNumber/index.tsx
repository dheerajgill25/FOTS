
import {StyleSheet, View} from "react-native";
import React from "react";
import Typography, { FontFamilyFoods } from "components/typography/Typography";

const style = StyleSheet.create({
    circleNumber: {
        marginLeft: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#484848",
        borderRadius: 90,
        width: 16,
        height: 16,
    },
});

const CircleNumber = ({ amountCart,cart }: { amountCart: number,cart?:boolean }) => {
  
    return (
        <View style={[style.circleNumber,{backgroundColor:cart?"#D80000":"#484848"}]}>
            <Typography style={{ fontSize: 9, color: 'white',fontFamily:FontFamilyFoods.POPPINS,lineHeight:18}}>{amountCart}</Typography>
        </View>
    );
};

export default CircleNumber;