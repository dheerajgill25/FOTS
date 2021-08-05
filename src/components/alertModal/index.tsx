
import React, { memo, useEffect, useRef } from 'react';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import { Text, View, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import ReactNativeModal from 'react-native-modal';


interface AlertModalProps {
    label: string;
    isVisiable?: boolean;
    mealPlan?: boolean;
    subTitle?: string;
    onClosePress: Function;
    onSuccess:Function
}

const AlertModal = ({ label,isVisiable,onClosePress,onSuccess }: AlertModalProps) => {
    return (
        <ReactNativeModal isVisible={isVisiable}  style={styles.modal}
            backdropColor={'black'}
            backdropOpacity={0.3}
            coverScreen={true}
            onBackdropPress={()=>onClosePress()}
        >
            <View style={styles.container} >
                <View style={styles.modalSection}>
                    <View style={styles.modalInner}>
                        <Typography  style={styles.label}>{label}</Typography>
                    </View>
                    <View style={styles.modalButton}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={()=>onClosePress()}
                        >
                            <Typography style={styles.buttonText}>{'Cancel'}</Typography>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btn} onPress={()=>onSuccess()}  >
                            <Typography style={styles.buttonText}>{'OK'}</Typography>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ReactNativeModal>
    );
};

export default memo(AlertModal);

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    modal: {
        margin: 0,
        zIndex: 9999,
    },
    container: {
        padding: 13,
        height: 225,
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
        marginTop: 10,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
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
