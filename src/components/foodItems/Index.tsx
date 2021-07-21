import ImageComponent, { Priority, ResizeMode } from "components/imageComponent/ImageComponent";
import Typography, { FontFamilyFoods } from "components/typography/Typography";
import ProductDetailScreen from "features/productdetail/Index";
import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView, Touchable } from "react-native";
import { SafeAreaView, View, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { Rating } from "react-native-ratings";
import { isAndroid } from "themes/functions";
interface FoodItemsProps {
    text?: string;
    imageUrl?: string;
    index?: number;
    title?: string;
    data: []
}
const ratingComponent = (rating: any) => {
    return (
        <Rating
            style={{ paddingVertical: 5, alignSelf: "flex-start" }}
            imageSize={18}
            startingValue={rating}
            readonly
        />
    )
}
const FoodItemsComponent = ({ title, data, index }: FoodItemsProps) => {
    return (
        <>
            <View key={index}>
                <View>
                    {
                        data.length > 0 && <Typography style={styles.foodItemPopluar}>Popular “{title}” Meals</Typography>
                    }

                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.foodItemSection}>
                        {
                            data && data.length > 0 ? (
                                data.map((items: any, i) => (
                                    <View key={i} >
                                        <View style={styles.foodItemBox}> 
                                        <TouchableOpacity onPress={() => ProductDetailScreen.navigate(items.product_id)}>
                                            <View style={styles.foodItemContent}>
                                                <View style={styles.foodItemImageSection}>
                                                    <ImageComponent uri={items?.thumbnail}
                                                        priority={Priority.high}
                                                        imageStyle={styles.foodImage}
                                                        resizeMode={ResizeMode.cover} />
                                                </View>
                                                <View style={styles.foodItemDetail}>
                                                    <Typography style={styles.text}>{items?.name}</Typography>
                                                    <View style={styles.foodItemRate}>
                                                        {ratingComponent(items?.rating)}
                                                    </View>

                                                </View>
                                            </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))
                            ) : (
                                <View />
                            )
                        }
                    </View>
                </ScrollView>
            </View>

        </>
    )
}
export default memo(FoodItemsComponent);
const styles = StyleSheet.create({
    foodItemSection: {
        flexDirection: "row",
        display: 'flex',
        paddingLeft: 21
    },
    foodItemBox: {

    },
    foodItemPopluar: {
        fontSize: 18,
        lineHeight: 27,
        fontFamily: FontFamilyFoods.POPPINSSEMIBOLD,
        marginBottom: 10,
        marginHorizontal: 15,
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
        marginLeft: 5,
        borderRadius: 5,
        minHeight: 200,
        overflow: isAndroid?"hidden":"visible"
    },
    foodItemImageSection: {},
    foodImage: {
        width: '100%',
        height: 100,
        borderRadius: isAndroid?0:5, 
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