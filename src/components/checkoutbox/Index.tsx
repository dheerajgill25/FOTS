import ButtonWithText from 'components/buttons/BurttonWithText';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
interface CheckoutProps {
	total: string;
	deliveryFee: string;
	tax: string;
	onPress: () => void,
	label: string;
	totalMrp:string
}
export const CheckOutBox = ({ total, deliveryFee, tax, onPress, label,totalMrp }: CheckoutProps) => {
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
							<Typography style={[styles.checkoutPrice, { fontFamily: FontFamilyFoods.POPPINSMEDIUM }]}>{deliveryFee}</Typography>
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
				<View style={{justifyContent:'center',display:"flex"}}>
				<ButtonWithText label={label} onPress={() => onPress()} subText={totalMrp} />
				</View>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	checkoutSection: {},
	checkoutBox: {
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
		paddingVertical: 23,
		borderTopLeftRadius: 22,
		borderTopRightRadius: 22,
	},
	checkoutWrap: {
		marginBottom: 29
	},
	checkoutSectionFlex: {
		display: 'flex',
		flexDirection: "row",
		alignItems: 'center',
		marginBottom: 15
	},
	checkoutTitleSection: {
		flex: 1
	},
	checkoutTitle: {
		fontFamily:FontFamilyFoods.POPPINSMEDIUM,
		fontSize: 16,
		color: '#484848',
		lineHeight: 24
	},
	checkoutPriceSection: {
		flex: 1
	},
	checkoutPrice: {
		textAlign: 'right',
		fontFamily: FontFamilyFoods.POPPINSBOLD,
		fontSize: 16, color: '#484848',
		lineHeight: 24,
		textTransform: 'capitalize'
	},
});