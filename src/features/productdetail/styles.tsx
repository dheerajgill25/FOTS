import { FontFamilyFoods } from "components/typography/Typography";
import { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bannerSection: {
        position: 'relative',
    },
    bannerPreview: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    previewImageSection: {
        maxHeight: height * 0.46,
    },
    previewImage: {
        height:'100%',
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
        flex:1,
    },
    productName: {
        fontSize: 20,
        lineHeight: 30,
        fontFamily: FontFamilyFoods.POPPINS,
        color: '#404040',
        textTransform: "capitalize",
        paddingRight:40
    },
    productSubText: {
        fontSize: 12,
        lineHeight: 18,
        fontFamily: FontFamilyFoods.POPPINS,
        color: '#484848'
    },
    productPrice: {
        flex: 1,
        maxWidth:150
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
    inYourBox:{
        borderWidth: 1,
        borderColor: '#484848',
        marginLeft: 10,
        padding: 10,
        borderRadius: 3,
        alignItems:"center",
        justifyContent:"center"
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
        paddingLeft: 14
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
        fontSize: 15, color: '#d80000',
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
        fontFamily: FontFamilyFoods.POPPINSBOLD,
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
        marginTop: 10
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
    modal: {
        margin: 0,
        zIndex: 9999,
    },
    modalcontainer: {
        padding: 13,
        height: 225,
        backgroundColor: "white",
        width: width * 0.93,
        zIndex: 99,
        borderRadius: 10,
        marginLeft: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalSection: {},
    modalInner: {
        marginBottom: 15,
    },
    label: {
        textAlign: 'center',
        paddingHorizontal: 20,
        fontFamily: FontFamilyFoods.POPPINS,
        fontSize: 16,
        lineHeight: 24,
        color: '#484848'
    },
    modalButton: {
        marginHorizontal: 40,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    buttonText: {
        fontFamily: FontFamilyFoods.POPPINSSEMIBOLD,
        fontSize: 14,
        color: "#000"
    },
    btn: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 50,
    }
});
export default styles;