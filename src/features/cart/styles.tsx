import { FontFamilyFoods } from "components/typography/Typography";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    shoppingCartSection: {
        marginHorizontal: 23,
        marginTop: 40
    },
    shoppingCartBox: {},
    shoppingCartWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
    },
    shoppingCartLeft: {
    },
    cartIcon: {
        height: 24,
        width: 24,
    },
    shoppingCartRight: {
        marginLeft: 31
    },
    shoppingCartTitle: {
        fontFamily: FontFamilyFoods.POPPINSMEDIUM,
        fontSize: 18, color: '#484848',
        lineHeight: 28
    },
    shoppingCartSubTitle: {
        fontFamily: FontFamilyFoods.POPPINSMEDIUM,
        fontSize: 12, color: '#484848',
        lineHeight: 18
    },
    bannerImage: {
        height: 115,
        width: 115,
        borderRadius:5,
        overflow:"hidden"
    },
    cartBox: {
        marginTop: 10,
        marginBottom:10,
    },
    cartItemWrap: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: 23,
        paddingVertical: 13,
        position:"relative",
    },
    borderBox: {
        width: 123,
        height: 121,
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius:5
    },
    productName: {
        fontFamily: FontFamilyFoods.POPPINSMEDIUM,
        fontSize: 16, color: '#484848',
        lineHeight: 24,textTransform:"capitalize",
        paddingRight:100
    },
    productPrice: {
        fontFamily: FontFamilyFoods.POPPINSBOLD,
        fontSize: 20, color: '#484848',
        lineHeight: 30,
        textTransform:"capitalize"
    },
    coupenCodeSection:{
        marginBottom:30
    },
    coupenCodeWrap:{
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: 23,
        paddingVertical: 20,
        borderRadius:23,
    },
    coupenCodeBox:{},
    coupenForm:{
        position:'relative',
    },
    formControl:{
        fontFamily:FontFamilyFoods.POPPINS,
        color:'black',
        paddingHorizontal:25,
        paddingVertical:10,fontSize:16,
        backgroundColor:'#E5E5E5',
        borderRadius:50,
        paddingRight:20
    },
    coupenIcon:{
        height:19,
        width:24,
        position: 'absolute',
        top: 12,
        right: 12,
        maxWidth:40
    },
    removeIcon:{
        position:"absolute",
        right:10,
        top:10
    },
    removeAllTextButton:{
        textAlign: "right", 
        textDecorationLine: "underline",
        fontFamily: FontFamilyFoods.POPPINSMEDIUM,
        fontSize: 16, color: '#484848',
        lineHeight: 22,
        marginRight: 10,
    },
    quantity:{
        fontSize:10,
        marginTop:-5,
        textDecorationLine:'underline'
    }
});
export default styles;