import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Platform, StyleSheet, View } from 'react-native';
import HTML from 'react-native-render-html';
import Carousel, { Pagination } from 'react-native-snap-carousel';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const { height, width } = Dimensions.get('screen');
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
    const [sliderData, setSliderData] = useState<[]>([]);
    useEffect(() => {
        if (data && data.length > 0) {
            setSliderData(data);
        } else {
            setSliderData([])
        }
    }, [data])

    const renderItem = ({ item, index }: any) => {
        return (
            <View key={index} style={styles.testimonialSection}>
                <View style={styles.testimonialWrap}>
                    <View style={styles.testimonialBox}>
                        <View style={styles.colonBox}>
                            <Typography style={styles.colon}>“</Typography>
                        </View>
                        <View style={styles.contentText}>
                            {/* <Typography style={styles.text}>{item.description}</Typography> */}
                            <HTML source={{ html: item.description }} tagsStyles={{
                                p: {
                                    color: 'white',
                                    fontSize: 15,
                                    lineHeight: 22,
                                    textAlign: 'center',
                                    paddingHorizontal: 25,
                                    fontFamily: FontFamilyFoods.POPPINS,
                                    paddingBottom:10,
                                    fontStyle:'normal'
                                },
                                strong:{
                                    color: 'white',
                                    textAlign: 'center',
                                    fontFamily: FontFamilyFoods.POPPINS, 
                                    fontStyle:'normal'
                                }
                            }} containerStyle={{ paddingHorizontal: 15 }} baseFontStyle={Platform.OS == "android" ? styles.testDescription : styles.text} contentWidth={width} />
                        </View>
                        <View style={[styles.colonBox, { display: "flex", justifyContent: 'flex-end', alignItems: 'flex-end' }]}>
                            <Typography style={[styles.colon, { textAlign: 'right', paddingRight: 10, transform: [{ rotate: '180deg' }], }]}>“</Typography>
                        </View>
                    </View>
                    {/* <View style={styles.clientSection}>
                        <View style={styles.clientBox}>
                            <Image source={{ uri: item.image }} style={styles.clientImage} />
                            <View style={styles.clientDetail}>
                                <Typography style={styles.clientName}>{item.name}</Typography>
                                <Typography style={styles.clientDesgination}>{item.sub_title}r</Typography>
                            </View>
                        </View>
                    </View> */}
                </View>
            </View>
        )
    }
    function pagination() {
        return (
            <Pagination
                dotsLength={sliderData && sliderData.length > 0 ? sliderData.length : 0}
                activeDotIndex={activeSlides}
                containerStyle={{ backgroundColor: '#fff', }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: '#D80000',
                    bottom: 40,
                    paddingHorizontal: 0
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
                    data={sliderData}
                    renderItem={renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    autoplay={true}
                    autoplayInterval={6000}
                    onSnapToItem={(index) => setactiveSlides(index)}
                    loop={true}
                    style={{ marginRight: 50 }}
                />
                {pagination()}
            </View>
        </>
    )
}
export default memo(TestimonialComponent);
const styles = StyleSheet.create({
    testimonialSection: {
    },
    testimonialWrap: {
        position: 'relative',
        marginBottom: 40,
        backgroundColor: "#D80000",
        borderRadius: 6
    },
    testimonialBox: {},
    colonBox: {},
    colon: {
        fontSize: 40,
        lineHeight: 50,
        color: "white",
        paddingLeft: 10,
        paddingTop: 8,
        fontFamily: FontFamilyFoods.POLLERONE
    },
    contentText: {

    },
    text: {
        color: 'white',
        fontSize: 13,
        lineHeight: 18,
        textAlign: 'center',
        paddingHorizontal: 25,
        fontFamily: FontFamilyFoods.POPPINS,
    },
    testDescription: {
        textAlign: 'center',
        color: 'white',
        fontSize: 13,
        paddingHorizontal: 25,
        fontFamily: FontFamilyFoods.POPPINS,
        
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
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        left: 0,
        right: 0,
        top: "100%",
        marginTop: 10
    },
    clientImage: {
        height: 80,
        width: 80,
        borderRadius: 50
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