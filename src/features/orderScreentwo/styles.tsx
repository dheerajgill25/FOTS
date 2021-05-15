import { FontFamilyFoods } from "components/typography/Typography";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    homeSection: {
        marginHorizontal: 21,
        marginTop: 20,
    },
    foodItemPopluar: {
        fontSize: 18,
        lineHeight: 27,
        fontFamily: FontFamilyFoods.POPPINSBOLD,
        marginBottom: 15,
        color:'#484848',
    },
    buttonsGroup: {
        marginHorizontal: 20,
        marginBottom: 20
    },
    howWorkSection: {
        flex: 1,
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
        fontSize:14,
        lineHeight:20,
    },
    footerSection:{
        marginVertical:27
    },
    footerBox:{
        borderColor:'#888888',
        paddingHorizontal:47,
        paddingVertical:12,
        borderRadius:5,
        borderWidth:1
    },
    footerTitle:{
        textAlign:'center', fontFamily:FontFamilyFoods.POPPINSMEDIUM,
        fontSize:12,
        lineHeight:18,
        color:'#484848'
    },
    buttonText:{
        fontSize:16 ,
        lineHeight: 24,
        color:'#fff',
        flex:1,
        fontFamily:FontFamilyFoods.POPPINSSEMIBOLD,
        textTransform:'uppercase',
        letterSpacing:0.7,
        textAlign:'center'
    },
    itemImg:{
        width:28,height:39
    }
});
export default styles;