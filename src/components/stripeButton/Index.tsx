import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import React from 'react';
import {
    AccessibilityProps,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Props = AccessibilityProps & {
    title?: string | React.ReactElement;
    variant?: 'default' | 'primary';
    disabled?: boolean;
    loading?: boolean;
    onPress(): void;
};

export default function Button({
    title,
    variant = 'default',
    disabled,
    loading,
    onPress,
    ...props
}: Props) {
    const titleElement = React.isValidElement(title) ? (
        title
    ) : (
        <Typography style={[styles.text, variant === 'primary' && styles.textPrimary]}>
            {title}
        </Typography>
    );
    return (
        <View style={disabled && styles.disabled}>
            <TouchableOpacity
                disabled={disabled}
                style={[
                    styles.container,
                    variant === 'primary' && styles.primaryContainer,
                ]}
                onPress={onPress}
                {...props}
            >
                {loading ? (
                    <ActivityIndicator color={'white'} size="small" />
                ) : (
                    titleElement
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        borderRadius: 12,
    },
    primaryContainer: {
        backgroundColor: '#D80000',
        alignItems: 'center',
    },
    text: {
        color: '#0A2540',
        fontWeight: '600',
        fontSize: 16,
    },
    textPrimary: {
        color: 'white',
        fontFamily:FontFamilyFoods.POPPINS
    },
    disabled: {
        opacity: 0.3,
    },
});