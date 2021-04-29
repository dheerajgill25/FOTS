import { FontFamilyFoods } from "components/typography/Typography";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    homeSection:{
        marginHorizontal:23,
        marginTop: 20,
    },
    homeBannerSection:{
        marginTop:15,
        marginBottom:25,
        elevation:4
    },
    homeBannerImg:{
        width:'100%',
        height:200,
    },
    foodItemPopluar:{
        fontSize:18,
        lineHeight:27,
        fontFamily:FontFamilyFoods.POPPINSBOLD,
        marginBottom:10
    },
    buttonsGroup:{
        marginHorizontal:20,
        marginBottom:20
    }
});
export default styles;