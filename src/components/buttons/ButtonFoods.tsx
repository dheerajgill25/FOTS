import Typography, { FontFamilyFoods } from '@components/typography/Typography';
import React, { memo } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: "#D80000",
        borderRadius: 50
    },
    elevation: {
        elevation: 10,
        shadowOpacity: 0.15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowRadius: 8,
    },
    label: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 15,
        color: '#0C0D34',
        textAlign: 'center',
        fontFamily:FontFamilyFoods.POPPINSMEDIUM
    },
    icon: {
        marginRight: 8,
    },
});

export enum ButtonFoodType {
    DEFAULT,
    PRIMARY,
    SOCIAL,
}

interface ButtonProps {
    variant?: ButtonFoodType;
    label: string;
    icon?: React.ReactNode;
    onPress: () => void;
    isElevated?: boolean;
    textColor?: string;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const ButtonFood = ({
    variant = ButtonFoodType.PRIMARY,
    label,
    onPress,
    icon,
    isElevated = false,
    textColor = 'white',
    textStyle,
    buttonStyle,
}: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                isElevated && styles.elevation,
                buttonStyle,
            ]}
            {...{ onPress }}
        >
            <Typography {...{ onPress }} style={[styles.label, textStyle, { color: textColor }]}>{label}</Typography>
        </TouchableOpacity>
    );
};

export default memo(ButtonFood);
