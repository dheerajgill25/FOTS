import ButtonWithText from 'components/buttons/BurttonWithText';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
interface CheckoutProps {
	total: string;
	deliveryFee: string;
	tax: string | number;
	onPress: () => void,
	label: string;
	totalMrp?: any;
	couponDiscount?: number | string
}
export const CheckOutBox = ({ total, deliveryFee, tax, onPress, label, totalMrp, couponDiscount }: CheckoutProps) => {
	return (
		<View style={styles.checkoutSection}>
			<View style={styles.checkoutBox}>
				<View style={styles.checkoutWrap}>
					<View style={styles.checkoutSectionFlex}>
						<View style={styles.checkoutTitleSection}>
							<Typography style={styles.checkoutTitle}>Subtotal</Typography>
						</View>
						<View style={styles.checkoutPriceSection}>
							<Typography style={styles.checkoutPrice}>{totalMrp}</Typography>
						</View>
					</View>
					{
						couponDiscount !== 0 && (
							<View style={styles.checkoutSectionFlex}>
								<View style={styles.checkoutTitleSection}>
									<Typography style={styles.checkoutTitle}>Coupon Discount</Typography>
								</View>
								<View style={styles.checkoutPriceSection}>
									<Typography style={[styles.checkoutPrice, { fontFamily: FontFamilyFoods.POPPINSMEDIUM }]}>{couponDiscount}</Typography>
								</View>
							</View>
						)
					}

					{
						tax !== 0 && (<View style={styles.checkoutSectionFlex}>
							<View style={styles.checkoutTitleSection}>
								<Typography style={styles.checkoutTitle}>TAX</Typography>
							</View>
							<View style={styles.checkoutPriceSection}>
								<Typography style={[styles.checkoutPrice, { fontFamily: FontFamilyFoods.POPPINSMEDIUM }]}>{tax}</Typography>
							</View>
						</View>
						)
					}
					<View style={styles.checkoutSectionFlex}>
						<View style={styles.checkoutTitleSection}>
							<Typography style={styles.checkoutTitle}>Delivery Fee</Typography>
						</View>
						<View style={styles.checkoutPriceSection}>
							<Typography style={[styles.checkoutPrice, { fontFamily: FontFamilyFoods.POPPINSMEDIUM }]}>{deliveryFee}</Typography>
						</View>
					</View>


				</View>
				<View style={{ justifyContent: 'center', display: "flex" }}>
					<ButtonWithText label={label} onPress={() => onPress()} subText={total} />
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
		fontFamily: FontFamilyFoods.POPPINSMEDIUM,
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