import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { TextInput } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import { isAndroid } from 'themes/functions';
import RatingControllerInstance from './controllers/productRating.controller';
import ButtonFoods from 'components/buttons/ButtonFoods';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import BaseScreen from 'features/basescreen/Index';
import RootNavigator from 'navigation/rootnavigation';
import Toaster from 'features/commonApiCall/toaster';

interface ProductRatingProps {
    route: any;
}

const ProductRating = (props: ProductRatingProps) => {
    const { params } = props.route;
    const [message, setMessage] = useState<string>("");
    const [rating, setRating] = useState<any>("");
    function ratingCompleted(rating: string) {
        setRating(rating)
    }
    const handleRatingSubmit = () => {
        if (rating !== "" && message !== "") {
            RatingControllerInstance.rateProduct(params?.orderId, params?.productId, rating, message)
        } else {
            Toaster.show("Please give us rating and write review");
        }
    }

    return (
        <BaseScreen navigatorBarOptions={{ backIcon: true, cartIcon: true }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.ratingBox}>
                    <View style={styles.ratingWrap}>
                        <Typography style={styles.ratingText}>Rating</Typography>
                    </View>
                    <Rating
                        onFinishRating={ratingCompleted}
                        style={{ paddingVertical: 10, alignSelf: "flex-start" }}
                        imageSize={30}
                        startingValue={0}
                    />
                </View>
                <View style={styles.reviewBox}>
                    <View style={styles.reviewWrap}>
                        <Typography style={styles.reviewText}>Write your Review</Typography>
                    </View>
                    <View style={styles.formGroup}>
                        <TextInput
                            placeholder="Message*"
                            multiline={true}
                            numberOfLines={10}
                            value={message}
                            onChangeText={(message: string) => setMessage(message)}
                            style={[
                                styles.formControl,
                                {
                                    textAlignVertical: 'top',
                                    height: 180,
                                    backgroundColor: '#cccccccc',
                                    borderRadius: 5,
                                    paddingLeft: 10,
                                    borderBottomWidth: 0,
                                },
                            ]}
                            placeholderTextColor={'white'}
                        />
                    </View>
                </View>
                <View>
                    <ButtonFoods label={'Submit'} onPress={() => { handleRatingSubmit() }} />
                </View>
            </SafeAreaView>
        </BaseScreen>
    );
};
ProductRating.SCREEN_NAME = 'ProductRating';
ProductRating.navigationOptions = {
    headerShown: false,
};
ProductRating.navigate = (orderId?: string, productId?: string,) => {
    RootNavigator.navigate(ProductRating.SCREEN_NAME, { orderId: orderId, productId: productId, });
};
export default ProductRating;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        marginHorizontal: 23
    },
    ratingBox: {
        marginVertical: 20
    },
    ratingWrap: {},
    ratingText: {
        fontSize: 18,
        lineHeight: 27,
        fontFamily: FontFamilyFoods.POPPINSSEMIBOLD
    },
    reviewBox: {},
    reviewWrap: {},
    reviewText: {
        fontSize: 18,
        lineHeight: 27,
        fontFamily: FontFamilyFoods.POPPINSSEMIBOLD,
        paddingVertical: 10
    },
    formGroup: {
        marginBottom: 20
    },
    formControl: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingLeft: 0,
        paddingBottom: isAndroid ? 3 : 9,
        fontFamily: FontFamilyFoods.POPPINS,
        color: '#000',
    },
});
