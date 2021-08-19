import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ReactNativeModal from 'react-native-modal';

interface ModalComponentProps {
    label: string;
    isVisiable?: boolean;
    mealPlan?: boolean;
    subTitle?: string;
    onClose:Function
}

const ModalComponent = ({ label, isVisiable, mealPlan, subTitle,onClose }: ModalComponentProps) => {
    const [isShown, setIsShown] = React.useState(true);
    const closeModal = () => {
        setIsShown(false);
    }
    return (
        <ReactNativeModal isVisible={isVisiable} onModalHide={() => onClose()} style={styles.modal}
            backdropColor={'black'}
            backdropOpacity={0.3}
            coverScreen={true}

        >
            <View style={styles.container} >
                {
                    mealPlan ? (
                        <View style={styles.modalSection}>
                            <View style={styles.modalInner}>
                                <Typography onPress={() => onClose()} style={styles.label}>{label}</Typography>
                            </View>
                            <Typography onPress={() => onClose()} style={[styles.label,{fontStyle:"italic"}]}>{subTitle}</Typography>
                            <View style={styles.modalButton}>
                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={()=>onClose()}
                                >
                                    <Typography style={styles.buttonText}>{'OK'}</Typography>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.modalSection}>
                            <View style={styles.modalInner}>
                                <Typography onPress={() => onClose()} style={styles.label}>{label}</Typography>
                            </View>
                            <View style={styles.modalButton}>
                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={()=>onClose()}
                                >
                                    <Typography style={styles.buttonText}>{'OK'}</Typography>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }

            </View>
        </ReactNativeModal>
    );
};

export default React.memo(ModalComponent);
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
        color: "#fff"
    },
    btn: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 50,
        backgroundColor: "#D80000",
    }
});
