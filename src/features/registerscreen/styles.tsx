import { FontFamilyFoods } from "components/typography/Typography";
import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    banner: {
        height: 229,
        paddingHorizontal: 23,

    },
    bannerWrap: {
        paddingVertical: 31
    },
    bannerBox: {},
    heading: {
        fontSize: 28,
        lineHeight: 42,
        color: '#fff'
    },
    formGroupBox: {
        marginHorizontal: 23,
        backgroundColor: '#F2F2F2',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius:15,
        paddingVertical:50,
        paddingHorizontal:18,
        marginTop: -65,
    },
    formGroup: {
        marginBottom: 22,
        borderBottomWidth: 1,
        borderBottomColor: '#CACACA'
    },
    formControl: {
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    buttonSetion:{
        marginHorizontal: 23,
        marginVertical:40
    },
    buttonStyle:{
        fontFamily:FontFamilyFoods.POPPINSBOLD,
        fontSize:18,
        lineHeight:27
    }
    
});
export default styles;