import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
export enum FontFamilyFoods {
    POPPINS = 'Poppins-Regular',
    POPPINSMEDIUM = 'Poppins-SemiBold',
    POPPINSBOLD='Poppins-Bold'
}

interface RoundedButtonProps {
    children: React.ReactNode;
    onPress?: Function;
    style?: StyleProp<TextStyle>;
    fontFamily?: string;
}

const Typography: React.FC<RoundedButtonProps> = ({ onPress, children, style }: RoundedButtonProps) => {
    return onPress ? (
        <Text
            style={[style]}
            onPress={() => (onPress ? onPress() : null)}
        >
            {children}
        </Text>
    ) : (
        <Text style={[style]}>{children}</Text>
    );
};

export default Typography;
