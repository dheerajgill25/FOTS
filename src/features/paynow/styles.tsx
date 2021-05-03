import { FontFamilyFoods } from "components/typography/Typography";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
    },
    deliveryContentbox:{
        marginHorizontal:23,
        marginTop:36
    },
    deliveryContentWrap:{},
    deliveryContentInner:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#F2F2F2',
        paddingVertical:20,
        paddingHorizontal:36,
        borderRadius:5
    },
    deliveryContentContent:{
        flex:1
    },
    iconLeft:{
        width:16,
        height:22
    },
    title:{
        textAlign:'center',
        fontSize:18,
        fontFamily:FontFamilyFoods.POPPINS,
        lineHeight:27,
        color:'#484848',
    },
    arrowdownIcon:{
        width:14,
        height:8,
        alignSelf:'flex-end'
    },
    descriptionSection:{
        marginTop: 41,
        marginBottom:29,
        marginHorizontal: 21,
    },
    descriptiongBox:{},
    descriptionInner:{},
    descriptionName:{
        fontSize: 18,
        lineHeight:27,
        fontFamily:FontFamilyFoods.POPPINSMEDIUM,
        color:'#404040'
    },
    borderBottom:{
         marginTop: 6,
         marginBottom: 11,
         height:5,
         width:61,
         backgroundColor:"#D80000",
         borderRadius:5
    },
    description:{
        fontSize: 14,
        lineHeight:20,
        fontFamily:FontFamilyFoods.POPPINS,
        color:'#484848'
    },
    dateBox:{},
    dateSection:{
        marginTop: 30,
    },
    dateWrap:{
        borderBottomWidth:1,
        borderBottomColor:'#CACACA',
        paddingBottom:5,
        paddingLeft:20,
        marginBottom:15
    },
    date:{
        fontSize: 14,
        lineHeight:20,
        fontFamily:FontFamilyFoods.POPPINS,
        color:'#484848'
    },
    time:{
        fontSize: 14,
        lineHeight:20,
        fontFamily:FontFamilyFoods.POPPINS,
        color:'#484848'
    },
  });
  export default styles;
  