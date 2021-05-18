import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
interface ButtonWithIconProps {
    label: string;
    onPress: () => void,
    buttonStyle?: {},
    fiveMealBtn?: boolean
}
const RenderButtonWithIcon = ({ label, onPress, buttonStyle, fiveMealBtn }: ButtonWithIconProps) => {
    const IMAGEURLFILTER = require("../../../assets/images/arrowleft.png")
    return (

        <>
            {
                fiveMealBtn ? (
                    <TouchableOpacity onPress={onPress} style={styles.filterButton}>
                        <View style={{ flex: 1 }}>
                            <Typography style={[buttonStyle ? buttonStyle : styles.filterText, { flex: 0 }]}>{label}</Typography>
                        </View>

                        <View style={styles.imageForIcon}>
                            <Image source={IMAGEURLFILTER} style={styles.filterIcon} />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={onPress} style={styles.filterButton}>
                        <Typography style={buttonStyle ? buttonStyle : styles.filterText}>{label}</Typography>
                        <View style={styles.imageForIcon}>
                            <Image source={IMAGEURLFILTER} style={styles.filterIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }
        </>

    )
}



export default RenderButtonWithIcon;

const styles = StyleSheet.create({
    filterText: {
        fontSize: 14,
        lineHeight: 22,
        color: '#fff',
        flex: 1,
        fontFamily: FontFamilyFoods.POPPINSMEDIUM,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    filterIcon: {
        width: 10,
        height: 15,
    },
    filterButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingVertical: 12,
        borderRadius: 5,
        backgroundColor: "#D80000",
    },
    imageForIcon: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        display: 'flex',
        maxWidth: 50,
    },
})