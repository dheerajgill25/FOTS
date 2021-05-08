import ButtonFood from 'components/buttons/ButtonFoods';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import ReactNativeModal from 'react-native-modal';

interface ModalComponentProps {
    label: string,
    isVisiable?: boolean,
}


const ModalComponent = ({ label, isVisiable }: ModalComponentProps) => {
    const [isShown, setIsShown] = React.useState(true);
    const closeModal = () => {
        console.log(isShown)
        setIsShown(false);
    }
    return (
        <ReactNativeModal isVisible={isShown} onModalHide={()=>closeModal()} style={styles.modal} coverScreen={true}  >
            <View style={styles.container}>
                <View style={styles.modalSection}>
                    <View style={styles.modalInner}>
                        <Typography onPress={()=>closeModal()} style={styles.label}>{label}</Typography>
                    </View>
                    <View style={styles.modalButton}>
                        <ButtonFood label={"Ok"} onPress={() => closeModal()} textStyle={styles.buttonText} />
                    </View>
                </View>
            </View>
        </ReactNativeModal>
    );
};

export default ModalComponent;
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
    },
    buttonText: {
        fontFamily: FontFamilyFoods.POPPINSSEMIBOLD,
        fontSize: 16
    }
});
