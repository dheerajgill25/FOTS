
import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
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

const CircleNumber = ({ amountCart, cart, onDetailPage=false }: { amountCart: number, cart?: boolean, onDetailPage?: boolean }) => {
    return (
        <>
            {
                onDetailPage ? (
                    <View style={[style.circleNumber, { backgroundColor:"#484848" }]}>
                        <Typography style={{ fontSize: 9, color: 'white', fontFamily: FontFamilyFoods.POPPINS, lineHeight: 18 }}>{amountCart}</Typography>
                    </View>
                ) : (
                    <View style={[style.circleNumber, { backgroundColor:"#d80000"  }]}>
                        <Typography style={{ fontSize: 9, color: 'white', fontFamily: FontFamilyFoods.POPPINS, lineHeight: 18 }}>{amountCart}</Typography>
                    </View>
                )
            }

        </>
    );
};

export default memo(CircleNumber);