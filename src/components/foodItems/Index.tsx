import Typography, { FontFamilyFoods } from "components/typography/Typography";
import React from "react";
import { SafeAreaView, View, StyleSheet, Image, ImageSourcePropType } from "react-native";
interface FoodItemsProps {
    text: string;
    imageUrl: ImageSourcePropType;
    key?:any
}
const ratingComponent = () => {
    return (
        <View style={styles.foodItemRatingBox}>
            <View style={styles.foodItemRating}>
                <Image source={require("../../../assets/images/star.png")} style={styles.rating} />
            </View>
            <View style={styles.foodItemRating}>
                <Image source={require("../../../assets/images/star.png")} style={styles.rating} />
            </View>
            <View style={styles.foodItemRating}>
                <Image source={require("../../../assets/images/star.png")} style={styles.rating} />
            </View>
            <View style={styles.foodItemRating}>
                <Image source={require("../../../assets/images/star.png")} style={styles.rating} />
            </View>

        </View>
    )
}
const FoodItemsComponent = ({ imageUrl, text,key }: FoodItemsProps) => {
    return (
        <View key={key} style={styles.foodItemSection}>
            <View style={styles.foodItemBox}>
                <View style={styles.foodItemContent}>
                    <View style={styles.foodItemImageSection}>
                        <Image source={imageUrl} style={styles.foodImage} resizeMode="contain" />
                    </View>
                    <View style={styles.foodItemDetail}>
                        <Typography style={styles.text}>{text}</Typography>
                        <View style={styles.foodItemRate}>
                            {ratingComponent()}
                        </View>

                    </View>
                </View>
            </View>
        </View>
    )
}
export default FoodItemsComponent;
const styles = StyleSheet.create({
    foodItemSection: {},
    foodItemBox: {
    },
    foodItemContent: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
        marginRight: 15,
        width: 135,
        marginLeft:5,
        borderRadius:5
    },
    foodItemImageSection: {},
    foodImage: {
        width: '100%',
        height: 140,
        
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
    foodItemRate: {
        marginTop: 6
    },
    foodItemDetail: {
        padding: 15,
    },
    text: {
        textAlignVertical: 'top',
        lineHeight: 21,
        fontSize: 13
    }
})