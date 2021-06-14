import { FontFamilyFoods } from "components/typography/Typography";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    homeSection:{
        marginHorizontal:21,
        marginTop: 15,
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
        fontFamily:FontFamilyFoods.POPPINSSEMIBOLD,
        marginBottom:10,
        marginHorizontal:15,
    },
    buttonsGroup:{
        marginHorizontal:20,
        marginBottom:20
    },
    customScrollBar: {
        backgroundColor: '#ccc',
        borderRadius: 3,
        width: 6,
      },
      customScrollBarBackground: {
        backgroundColor: '#232323',
        borderRadius: 3,
        height: '100%',
        width: 6,
      },
});
export default styles;