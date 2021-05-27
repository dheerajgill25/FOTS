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
        paddingVertical:40,
        paddingHorizontal:18,
        marginTop: -75,
        marginBottom:20

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
        marginVertical:40,
        marginBottom:10
    },
    buttonStyle:{
        fontFamily:FontFamilyFoods.POPPINSMEDIUM,
        fontSize:18,
        lineHeight:27
    },
    forgotPass:{
        textAlign:"right",
        fontSize:15,
        textDecorationLine:"underline",
        fontFamily:FontFamilyFoods.POPPINSMEDIUM,
    },
    registerButton:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    },
    dontHave:{
        fontFamily:FontFamilyFoods.POPPINS,
        fontSize:14,
        lineHeight:23
    },
    register:{
        fontFamily:FontFamilyFoods.POPPINSMEDIUM,
        fontSize:14,
        lineHeight:23,
        color:"#D80000",
        paddingLeft:5
    },
    errors:{
        textAlign:"right",
        fontSize:14,
        fontFamily:FontFamilyFoods.POPPINS,
        color:"#D80000",
    }
  });
export default styles;