import { FontFamilyFoods } from "components/typography/Typography";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    bannerSection:{
        position:'relative',
    },
    bannerPreview:{
        backgroundColor:'#F2F2F2',
        height:346, 
         display:'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
    },
    previewImageSection:{
    },
    previewImage:{
        width: 110,
        height:92
    },
    cartIconSection:{
        position: "absolute",
        top:10,
        right: 10,
        height:66,
        width:66,
        borderRadius:50,
        backgroundColor:'#D80000',
        display:'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
    },
    cartImage:{
        height:26,
        width:26,
    },
    headingSection:{
        marginTop: 16,
        marginBottom:29,
        marginHorizontal: 21,
    },
    headingBox:{
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
    },
    headingInner:{
        
    },
    productName:{
        fontSize: 20,
        lineHeight:30,
        fontFamily:FontFamilyFoods.POPPINS,
        color:'#404040'
    },
    productSubText:{
        fontSize: 12,
        lineHeight:18,
        fontFamily:FontFamilyFoods.POPPINS,
        color:'#484848'
    },
    productPrice:{
        flex:1,
        
    },
    price:{
        textAlign:'right',
        fontSize: 18,
        lineHeight:26,
        fontFamily:FontFamilyFoods.POPPINSBOLD,
        color:'#D80000'
    },
    descriptionSection:{
        marginTop: 16,
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
    nutritionWrap:{},
    nutritionBox:{
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        marginLeft: -10,
        marginTop: 10,
    },
    nutritionContent:{
        flex:1,
        borderWidth:1,
        borderColor:'#484848',
        marginLeft: 10,
        padding:10,
        borderRadius:3
    },
    nutritionQuantity:{
        textAlign:'center',
        color:'#D80000',
        fontSize: 18,
        lineHeight:27,
        fontFamily:FontFamilyFoods.POPPINSBOLD,
    },
    nutritionType:{
        textAlign:'center',
        fontSize: 12,
        lineHeight:17,
        fontFamily:FontFamilyFoods.POPPINS,
        color:'#404040'
    },
    cookingSection:{
        marginHorizontal: 21,
        backgroundColor:"#F2F2F2",
        padding:15,
        borderRadius:5
    },
    cookingSectionWrap:{},
    cookingSectionBox:{
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
    },
    cookingSectioContent:{
        flex:1,
       
    },
    cookingSectionTime:{
        backgroundColor:'#DFDFDF',
        flex:1,
        maxWidth: 120,
        height:42,
        width:112,
    },
    cookingTime:{
        fontFamily:FontFamilyFoods.POPPINSMEDIUM,
        fontSize:18, color:'#484848',
        lineHeight:27
    },
    cookingTimeText:{
        textAlignVertical:'center',
        textAlign:"center",
        marginTop: 9,
        fontFamily:FontFamilyFoods.POPPINSMEDIUM,
        fontSize:16, color:'#484848',
        lineHeight:25
    },
    accordienSection:{
        marginTop:36,
        marginBottom:29,
        marginHorizontal:21
    },
    accordienBox:{},
    accordienInner:{},
    accordienWrap:{
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        marginBottom:29,
        paddingBottom:10,
        borderBottomWidth:1,
        borderColor:"#D80000"
    },
    accordienContentFlex:{
        flex:1
    },
    accordienContentFlexRight:{
    },
    plusIcon:{
        height:22,
        width: 22,
    },
    accordienTitle:{
        fontFamily:FontFamilyFoods.POPPINSMEDIUM,
        fontSize:20, color:'#484848',
        lineHeight:30
    },
});
export default styles;