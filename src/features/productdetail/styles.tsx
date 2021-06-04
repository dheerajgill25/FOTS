import { FontFamilyFoods } from "components/typography/Typography";
import { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:20
    },
    bannerSection: {
        position: 'relative',
    },
    bannerPreview: {
        height: 346,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    previewImageSection: {
        maxWidth: "100%",
        maxHeight: 346,
    },
    previewImage: {
        height: 346,
        width: width,
    },
    cartIconSection: {
        position: "absolute",
        top: 20,
        right: 10,
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: '#D80000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    cartImage: {
        height: 20,
        width: 20,
        marginTop: 17,
    },
    headingSection: {
        marginTop: 16,
        marginBottom: 20,
        marginHorizontal: 21,
    },
    headingBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headingInner: {

    },
    productName: {
        fontSize: 20,
        lineHeight: 30,
        fontFamily: FontFamilyFoods.POPPINS,
        color: '#404040'
    },
    productSubText: {
        fontSize: 12,
        lineHeight: 18,
        fontFamily: FontFamilyFoods.POPPINS,
        color: '#484848'
    },
    productPrice: {
        flex: 1,

    },
    price: {
        textAlign: 'right',
        fontSize: 18,
        lineHeight: 26,
        fontFamily: FontFamilyFoods.POPPINSBOLD,
        color: '#D80000'
    },
    descriptionSection: {
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 21,
    },
    descriptiongBox: {},
    descriptionInner: {},
    descriptionName: {
        fontSize: 16,
        lineHeight: 25,
        fontFamily: FontFamilyFoods.POPPINSMEDIUM,
        color: '#404040'
    },
    borderBottom: {
        marginTop: 6,
        marginBottom: 11,
        height: 5,
        width: 61,
        backgroundColor: "#D80000",
        borderRadius: 5
    },
    description: {
        fontSize: 13,
        lineHeight: 19,
        fontFamily: FontFamilyFoods.POPPINS,
        color: '#484848'
    },
    nutritionWrap: {},
    nutritionBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -10,
        marginTop: 10,
    },
    nutritionContent: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#484848',
        marginLeft: 10,
        padding: 10,
        borderRadius: 3,
        height: 70,
        alignSelf: 'center',
        display: "flex",
        justifyContent: "center"
    },
    nutritionQuantity: {
        textAlign: 'center',
        color: '#D80000',
        fontSize: 15,
        lineHeight: 20,
        fontFamily: FontFamilyFoods.POPPINSBOLD,
        textAlignVertical: 'center'
    },
    nutritionType: {
        textAlign: 'center',
        fontSize: 11,
        lineHeight: 15,
        fontFamily: FontFamilyFoods.POPPINS,
        color: '#404040',
        textAlignVertical: 'center'
    },
    cookingSection: {
        marginHorizontal: 21,
        backgroundColor: "#F2F2F2",
        padding: 7,
        borderRadius: 5
    },
    cookingSectionWrap: {},
    cookingSectionBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cookingSectioContent: {
        flex: 1,
        paddingLeft:14
    },
    cookingSectionTime: {
        backgroundColor: '#DFDFDF',
        flex: 1,
        maxWidth: 120,
        height: 42,
        width: 112,
        borderRadius: 5
    },
    cookingTime: {
        fontFamily: FontFamilyFoods.POPPINSMEDIUM,
        fontSize: 16, color: '#484848',
        lineHeight: 27
    },
    cookingTimeText: {
        textAlignVertical: 'center',
        textAlign: "center",
        marginTop: 9,
        fontFamily: FontFamilyFoods.POPPINSMEDIUM,
        fontSize: 15, color: '#484848',
        lineHeight: 25
    },
    accordienSection: {
        marginTop: 36,
        marginBottom: 29,
        marginHorizontal: 21
    },
    accordienBox: {},
    accordienInner: {},
    accordienWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: "#D80000"
    },
    accordienContentFlex: {
        flex: 1
    },
    accordienContentFlexRight: {
    },
    plusIcon: {
        height: 22,
        width: 22,
    },
    accordienTitle: {
        fontFamily: FontFamilyFoods.POPPINSMEDIUM,
        fontSize: 18, color: '#484848',
        lineHeight: 27
    },
    fixedHeaderView: {

    },
    headerSection: {
        backgroundColor: "#D80000",
        padding: 20,
    },
    headerImage: {
        marginLeft: 5,
        marginTop:10
    },
    backicon: {},
    amountCart: {
        bottom: 10,
        left: 10
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        color: 'white',
        fontFamily: FontFamilyFoods.POPPINSSEMIBOLD,
    },
});
export default styles;