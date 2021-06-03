import { FontFamilyFoods } from "components/typography/Typography";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        justifyContent:'center',
       
    },
    successSection:{
        marginHorizontal:23
    },
    successBox:{},
    successWrap:{},
    successImage:{
        height:80,
        width:80,
        alignSelf:'center',
        marginBottom:23
    },
    successMessage:{},
    orderMessage:{
        textAlign:'center',
        color:'#404040',
        fontFamily:FontFamilyFoods.POPPINSMEDIUM,
        fontSize:26,
        lineHeight:39,
        paddingHorizontal:50,
        marginBottom:32
    },
    deliveryMessage:{
        textAlign:'center',
        color:'#D80000',
        fontFamily:FontFamilyFoods.POPPINS,
        fontSize:18,
        lineHeight:27,
        paddingHorizontal:40
    },
    successBtn:{
        marginTop:53
    },
    orderBtn:{
       
    },
    donateBtn:{
        backgroundColor:'#E5E5E5',
        borderRadius:50
    },
    successBtnBox:{
        marginBottom:30
    },
    donateBtnBox:{},
    buttonText:{
        fontSize:16,
        lineHeight:24,
        fontFamily:FontFamilyFoods.POPPINSMEDIUM
    }
})
export default styles;