
import React, { memo, useEffect, useRef } from 'react';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import { Text, View, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import ReactNativeModal from 'react-native-modal';


interface AlertModalProps {
    label: string;
    isVisiable?: boolean;
    onClosePress: Function;
}

const BannerModal = ({ label, isVisiable, onClosePress }: AlertModalProps) => {
    return (
        <ReactNativeModal isVisible={isVisiable} style={styles.modal}
            backdropColor={'black'}
            backdropOpacity={0.3}
            coverScreen={true}
            onBackdropPress={() => onClosePress()}
        >
            <View style={[styles.container, { height: label.length < 150 ? 150 : 355 }]} >
                <ScrollView bounces={false} scrollEnabled={label.length > 100 ? true : false} showsVerticalScrollIndicator={false}>
                    <View style={styles.modalSection}>
                        <View style={styles.modalInner}>
                            <Typography style={styles.label}>{label}</Typography>
                        </View>

                    </View>
                </ScrollView>
                <View style={styles.modalButton}>
                    <TouchableOpacity
                        style={styles.btn} onPress={() => onClosePress()}  >
                        <Typography style={styles.buttonText}>{'OK'}</Typography>
                    </TouchableOpacity>
                </View>
            </View>
        </ReactNativeModal>
    );
};

export default memo(BannerModal);

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    modal: {
        margin: 0,
        zIndex: 9999,
    },
    container: {
        padding: 13,
        height: 355,
        backgroundColor: "white",
        width: width * 0.93,
        zIndex: 99,
        borderRadius: 10,
        marginLeft: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalSection: {
        paddingTop: 18
    },
    modalInner: {
        marginBottom: 15,
    },
    label: {
        textAlign: 'center',
        paddingHorizontal: 20,
        fontFamily: FontFamilyFoods.POPPINS,
        fontSize: 16,
        lineHeight: 24,
        color: '#484848',
        textAlignVertical: "center"
    },
    modalButton: {
        marginHorizontal: 40,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    buttonText: {
        fontFamily: FontFamilyFoods.POPPINSSEMIBOLD,
        fontSize: 14,
        color: "#fff"
    },
    btn: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 50,
        backgroundColor: '#d80000',
        flex: 1
    }
});
