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
        alignItems: "center"
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
        fontSize: 20, color: '#484848',
        lineHeight: 30
    },
    shoppingCartSubTitle: {
        fontFamily: FontFamilyFoods.POPPINSMEDIUM,
        fontSize: 12, color: '#484848',
        lineHeight: 18
    },
    bannerImage: {
        height: 33,
        width: 40,
    },
    cartBox: {
        marginTop: 10,
        marginBottom: 30,
    },
    cartItemWrap: {
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
        paddingVertical: 30,
    },
    borderBox: {
        width: 123,
        height: 121,
        backgroundColor: "#F2F2F2",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    productName: {
        fontFamily: FontFamilyFoods.POPPINSMEDIUM,
        fontSize: 16, color: '#484848',
        lineHeight: 24
    },
    productPrice: {
        fontFamily: FontFamilyFoods.POPPINSBOLD,
        fontSize: 20, color: '#484848',
        lineHeight: 30
    },
    coupenCodeSection:{},
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
        paddingVertical: 25,
        borderRadius:23,
    },
    coupenCodeBox:{},
    coupenForm:{
        position:'relative',
        borderBottomColor: '#CACACA',
        borderBottomWidth:1
    },
    formControl:{
        fontFamily:FontFamilyFoods.POPPINS,
        color:'black',
        paddingHorizontal:15,
        paddingVertical:10,fontSize:16
    },
    coupenIcon:{
        height:19,
        width:24,
        position: 'absolute',
        top: 10,
        right: 12,
    },
});
export default styles;