
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
        width: 20,
        height: 20,
    },
});

const CircleNumber = ({ amountCart }: { amountCart: number }) => {
    return (
        <View style={style.circleNumber}>
            <Typography style={{ fontSize: 10, color: 'white',fontFamily:FontFamilyFoods.POPPINS,marginTop: 3, }}>{amountCart}</Typography>
        </View>
    );
};

export default CircleNumber;