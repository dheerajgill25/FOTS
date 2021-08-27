import { FontFamilyFoods } from "components/typography/Typography";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    accountInfoSecion: {
        marginHorizontal: 23,
        marginVertical: 30
    },
    accountInfoBox: {},
    accountInfoWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 22,
        borderBottomWidth: 1,
        borderBottomColor: '#CACACA'
    },
    accountInfoContent: {},
    accountName: {
        fontSize: 20,
        lineHeight: 30,
        fontFamily: FontFamilyFoods.POPPINSMEDIUM,
        color: '#484848'
    },
    accountEmail: {
        fontSize: 14,
        lineHeight: 21,
        fontFamily: FontFamilyFoods.POPPINS,
        color: '#888888'
    },
    editBtn: {
        textAlign: 'right',
        fontSize: 16,
        lineHeight: 24,
        fontFamily: FontFamilyFoods.POPPINS,
        color: '#D80000',
    },
    helpSection: {
        marginHorizontal: 23,
    },
    helpBox: {},
    helpContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    helpLeft: {
        flex: 1
    },
    helpText: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: FontFamilyFoods.POPPINSMEDIUM,
    },
    faqText: {
        fontSize: 14,
        lineHeight: 21,
        fontFamily: FontFamilyFoods.POPPINS,
    },
    helpRight: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    arrowRight: {
        width: 10,
        height: 15
    },
    orderContentbox: {
        marginTop: 17,
    },
    myOrderBox: {
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 23,
        padding: 15,
        marginBottom: 29
    },
    myOrderText: {

    },
    orderContentWrap: {
        marginHorizontal: 23,
        paddingBottom: 20,
        borderBottomWidth: 1,
        marginTop: 16,
    },
    orderContentInner: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    },
    orderContentLeft: {
        flex: 1,
        maxWidth:250
    },
    orderProuctName: {
        fontSize: 18,
        lineHeight: 26,
        fontFamily: FontFamilyFoods.POPPINS,
        color: '#484848'
    },
    orderStatusBox: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        maxWidth:250,
    },
    orderStatuswrp: {
        display: 'flex',
         flexDirection: 'row',
        alignItems: 'center',
    },
    orderStatusType: {
        paddingRight: 5,
        fontFamily: FontFamilyFoods.POPPINS,
        fontSize: 13,
        lineHeight: 20,
        textAlign:"right"
    },
    orderStatus: {
        height: 20,
        width: 20,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#77D32F',
        alignSelf:"flex-end"
    },
    arrowIcon: {
        height: 10,
        width: 10,
    },
    buttonBox: {
        marginTop: 35,
        paddingBottom: 20
    },
    buttonStyle: {
    },
    filterText: {
        fontSize: 17,
        lineHeight: 25,
        color: '#484848',
        textAlign: 'left',
        flex: 1,
        fontFamily: FontFamilyFoods.POPPINSBOLD,
        textTransform: 'uppercase',
        letterSpacing: 0.7
    },
    filterButton: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 20,
        padding: 10,
        paddingVertical: 12,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#A7A7A7',
    },
    dateFieldsName: {
        fontSize: 13,
        lineHeight: 18,
        color: '#484848',
        fontFamily: FontFamilyFoods.POPPINS,
        paddingBottom:3
    },
    date: {
        fontSize: 13,
        lineHeight: 18,
        color: '#484848',
        fontFamily: FontFamilyFoods.POPPINS,
    }
});
export default styles;