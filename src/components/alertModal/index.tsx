
import React, { useEffect, useRef } from 'react';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import { Text, View, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import ReactNativeModal from 'react-native-modal';


interface AlertModalProps {
    label: string;
    isVisiable?: boolean;
    mealPlan?: boolean;
    subTitle?: string;
}

const AlertModal = ({ label, }: AlertModalProps) => {
    const [isShown, setIsShown] = React.useState(true);
    const closeModal = () => {
        setIsShown(false);
    }
    return (
        <ReactNativeModal isVisible={isShown} onModalHide={() => closeModal()} style={styles.modal}
            backdropColor={'black'}
            backdropOpacity={0.3}
            coverScreen={true}

        >
            <View style={styles.container} >

                <View style={styles.modalSection}>
                    <View style={styles.modalInner}>
                        <Typography onPress={() => closeModal()} style={styles.label}>{label}</Typography>
                    </View>
                    <View style={styles.modalButton}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={closeModal}
                        >
                            <Typography style={styles.buttonText}>{'Cancel'}</Typography>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={closeModal}
                        >
                            <Typography style={styles.buttonText}>{'OK'}</Typography>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ReactNativeModal>
    );
};

export default AlertModal;

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    modal: {
        margin: 0,
        zIndex: 9999,
    },
    container: {
        padding: 13,
        height: 325,
        backgroundColor: "white",
        width: width * 0.93,
        zIndex: 99,
        borderRadius: 10,
        marginLeft: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalSection: {},
    modalInner: {
        marginBottom: 15,
    },
    label: {
        textAlign: 'center',
        paddingHorizontal: 20,
        fontFamily: FontFamilyFoods.POPPINS,
        fontSize: 16,
        lineHeight: 24,
        color: '#484848'
    },
    modalButton: {
        marginHorizontal: 40,
        marginTop: 10
    },
    buttonText: {
        fontFamily: FontFamilyFoods.POPPINSSEMIBOLD,
        fontSize: 14,
        color: "#000"
    },
    btn: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 50,
    }
});
