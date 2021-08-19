
import { FontFamilyFoods } from 'components/typography/Typography';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
        width: 62,
        height: 62,
        backgroundColor: "#F2F2F2",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius:5
    },
    cartIcon: {
        height: 20,
        width: 24,
    },
    shoppingCartRight: {
        flex: 1,
        paddingHorizontal: 10
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
    shoppingCartSubText: {
        color: '#404040', fontFamily: FontFamilyFoods.POPPINS,
        fontSize: 10,
        lineHeight: 12,
    },
    bannerImage: {
        width: 62,
        height: 62,
    },
    cartBox: {
        marginTop: 10,
        marginBottom: 10,
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
        paddingVertical:12
    },
    borderBox: {
      
    },
    productName: {
        fontFamily: FontFamilyFoods.POPPINSMEDIUM,
        fontSize: 14, color: '#484848',
        lineHeight: 21,paddingBottom:4,
        textTransform:'capitalize'
    },
    productPrice: {
        fontFamily: FontFamilyFoods.POPPINSBOLD,
        fontSize: 16, color: '#484848',
        lineHeight: 24,
        textAlign: 'right',
    },
    foodItemRatingBox: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: -3
    },
    foodItemRating: {
        marginLeft: 3,
    },
    rating: {
        height: 15,
        width: 15
    },
    ratingComp:{
        paddingBottom:4
    }
});
export default styles;
