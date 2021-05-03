import { FontFamilyFoods } from "components/typography/Typography";
import { StyleSheet } from "react-native";

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
        marginBottom:19
    },
    mealPlanButtons:{
        marginBottom:16,
   
    },
    buttonstyles:{
        fontFamily:FontFamilyFoods.POPPINSMEDIUM,
        fontSize:14,
        lineHeight:21,
        color:'#fff',
    }
  });
  
  export default styles;