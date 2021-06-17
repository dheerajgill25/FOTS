import { FontFamilyFoods } from "components/typography/Typography";
import { StyleSheet } from "react-native";
import { window } from "themes/functions";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
    },
    mealPlanSection:{},
    mealPlanText:{
        fontFamily:FontFamilyFoods.POPPINSSEMIBOLD,
        fontSize:18,
        lineHeight:27,
        color:'#484848',
        marginBottom:10
    },
    mealPlanButtons:{
        marginBottom:16,
   
    },
    buttonstyles:{
        fontFamily:FontFamilyFoods.POPPINSMEDIUM,
        fontSize:13,
        lineHeight:21,
        color:'#fff',
    },
    howWorkSection: {
       width:window.width/4.39,
       flex:1
    },
    worksFlex:{
        display: "flex",
        alignItems: 'center',
        flexDirection:'row',
    },
    howWorkBox: {
    },
    howWorkwrap: {
        backgroundColor: '#F2F2F2',
        padding: 10,
        borderRadius: 50,
        width:75,
        height:75,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
    },
    icon: {
        width: 40,
        height: 40,
    },
    title: {
        textAlign:'center',
        maxWidth:75,
        alignSelf:'center',
        marginTop:10,
        color:'#484848',
        fontFamily:FontFamilyFoods.POPPINSMEDIUM,
        fontSize:13,
        lineHeight:17,
    },
    foodItemPopluar: {
        fontSize: 17,
        lineHeight: 25,
        fontFamily: FontFamilyFoods.POPPINSSEMIBOLD,
        marginBottom: 15,
        color:'#484848',
    },
    itemImg:{
        width:28,height:39
    }
  });
  
  export default styles;