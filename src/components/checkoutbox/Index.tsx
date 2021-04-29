import ButtonWithText from 'components/buttons/BurttonWithText';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
interface CheckoutProps{
	total:string;
	deliveryFee:string;
	tax:string;
}
export const CheckOutBox = ({total,deliveryFee,tax}:CheckoutProps) => {
	return (
		<View style={styles.checkoutSection}>
			<View style={styles.checkoutBox}>
				<View style={styles.checkoutWrap}>
					<View style={styles.checkoutSectionFlex}>
						<View style={styles.checkoutTitleSection}>
							<Typography style={styles.checkoutTitle}>Subtotal</Typography>
						</View>
						<View style={styles.checkoutPriceSection}>
							<Typography style={styles.checkoutPrice}>{total}</Typography>
						</View>
					</View>
					<View style={styles.checkoutSectionFlex}>
					<View style={styles.checkoutTitleSection}>
							<Typography style={styles.checkoutTitle}>Delivery Fee</Typography>
						</View>
						<View style={styles.checkoutPriceSection}>
							<Typography style={styles.checkoutPrice}>{deliveryFee}</Typography>
						</View>
						
					</View>
					<View style={styles.checkoutSectionFlex}>
						<View style={styles.checkoutTitleSection}>
							<Typography style={styles.checkoutTitle}>TAX (6.17%)</Typography>
						</View>
						<View style={styles.checkoutPriceSection}>
							<Typography style={styles.checkoutPrice}>{tax}</Typography>
						</View>
					</View>
				</View>
			<ButtonWithText label="Checkout" onPress={()=>{}} subText={total} />
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	checkoutSection:{},
	checkoutBox:{
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
		borderTopLeftRadius:22,
        borderTopRightRadius:22,
	},
	checkoutWrap:{
		marginBottom:29
	},
	checkoutSectionFlex:{
		display:'flex',
		flexDirection:"row",
		alignItems:'center',
		marginBottom:15
	},
	checkoutTitleSection:{
		flex:1
	},
	checkoutTitle:{
		fontFamily: FontFamilyFoods.POPPINSMEDIUM,
        fontSize: 18, color: '#484848',
        lineHeight: 27
	},
	checkoutPriceSection:{
		flex:1
	},
	checkoutPrice:{
		textAlign:'right',
		fontFamily: FontFamilyFoods.POPPINSBOLD,
        fontSize: 18, color: '#484848',
        lineHeight: 27
	},
});