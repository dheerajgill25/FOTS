import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage: number) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(9);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 1.7;
const TestimonialComponent = ({ data }: any) => {
    const _carousal = useRef(null);
    const [activeSlides, setactiveSlides] = useState<number>(0);
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
    const renderItem = ({item,index}:any) => {
        return (
            <View  key={index} style={styles.testimonialSection}>
                <View style={styles.testimonialWrap}>
                    <LinearGradient colors={['#D80000', '#D80000',]} >
                        <View style={styles.testimonialBox}>
                            <View style={styles.colonBox}>
                                <Typography style={styles.colon}>“</Typography>
                            </View>
                            <View style={styles.contentText}>
                                <Typography style={styles.text}>{item.description}</Typography>
                            </View>
                            <View style={[styles.colonBox,{display:"flex",justifyContent:'flex-end', alignItems:'flex-end'}]}>
                                <Typography style={[styles.colon, { textAlign: 'right', paddingRight: 10,transform: [{ rotate: '180deg'}], }]}>“</Typography>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={styles.clientSection}>
                        <View style={styles.clientBox}>
                            <Image source={item.imageUrl} style={styles.clientImage} />
                            <View style={styles.ratingSection}>
                                {ratingComponent()}
                            </View>
                            <View style={styles.clientDetail}>
                                <Typography style={styles.clientName}>{item.name}</Typography>
                                <Typography style={styles.clientDesgination}>{item.designation}r</Typography>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    function pagination() {
        return (
            <Pagination
                dotsLength={data&&data.length>0?data.length:0}
                activeDotIndex={activeSlides}
                containerStyle={{ backgroundColor: '#fff' ,}}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: '#D80000',
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }
    return (
        <>
            <View>
                <Carousel
                    ref={_carousal}
                    data={ data }
                    renderItem={renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    autoplay={true}
                    autoplayInterval={6000}
                    onSnapToItem={(index) => setactiveSlides(index)}
                    loop={true}
                    style={{marginRight:50}}
                />
                {pagination()}
            </View>
        </>
    )
}
export default TestimonialComponent;
const styles = StyleSheet.create({
    testimonialSection: {
    },
    testimonialWrap: {
        position: 'relative',
        marginBottom: 120
    },
    testimonialBox: {},
    colonBox: {},
    colon: {
        fontSize: 50,
        lineHeight: 50,
        color: "white",
        paddingLeft: 10,
        paddingTop: 8,
        fontFamily:FontFamilyFoods.POLLERONE
    },
    contentText: {

    },
    text: {
        color: 'white',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        paddingHorizontal: 15
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
    clientSection: {

    },
    clientBox: {
        position: 'absolute',
        bottom: -120,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        left: 140,
    },
    clientImage: {
        height: 80,
        width: 80,
    },
    ratingSection: {
        marginVertical: 10
    },
    clientDetail: {},
    clientDesgination: {
        textAlign: 'center',
        color: '#D80000',
        fontSize: 10,
        lineHeight: 15,
    },
    clientName: {
        textAlign: 'center',
        fontFamily: FontFamilyFoods.POPPINSMEDIUM,
        lineHeight: 20,
        fontSize: 14,
        paddingBottom: 5
    },
});