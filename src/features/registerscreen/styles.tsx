import { FontFamilyFoods } from "components/typography/Typography";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    banner: {
        height: 159,
        paddingHorizontal: 23,
        backgroundColor:"#D80000"
    },
    bannerWrap: {
        paddingVertical: 12
    },
    bannerBox: {},
    heading: {
        fontSize: 28,
        lineHeight: 42,
        color: '#fff',
        fontFamily:FontFamilyFoods.POPPINSBOLD
    },
    formGroupBox: {
        marginHorizontal: 23,
        backgroundColor: '#fff',
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
        paddingVertical: 10,
        fontFamily:FontFamilyFoods.POPPINS,
        color:"black"
    },
    buttonSetion:{
        marginHorizontal: 23,
        marginVertical:40
    },
    buttonStyle:{
        fontFamily:FontFamilyFoods.POPPINSMEDIUM,
        fontSize:18,
        lineHeight:27
    },
    errors:{
        textAlign:"right",
        fontSize:14,
        fontFamily:FontFamilyFoods.POPPINS,
        color:"#D80000",
    }
});
export default styles;