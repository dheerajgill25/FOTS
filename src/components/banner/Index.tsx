import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import * as React from 'react';
import { useRef, useState } from 'react';
import { View, StyleSheet, Image, ImageSourcePropType, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import BannerModal from './BannerModal';

interface BannerComponentProps {
    label?: any;
    BANNERIMAGEURL?: any;
    imagesUrl?: [] | any;
}
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const { height, width } = Dimensions.get('screen');
function wp(percentage: number) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideWidth = wp(76);
const itemHorizontalMargin = wp(8);
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 1.5;
const BannerComponent = ({ BANNERIMAGEURL, imagesUrl }: BannerComponentProps) => {
    const _carousal = useRef(null);
    const [isModalShown, setIsModalShown] = useState<boolean>(false);
    const [selectedDescription, setSelectedDescription] = useState<string>("");
    const handleClickImage = (description: React.SetStateAction<string>) => {
        setIsModalShown(true);
        setSelectedDescription(description);
    }
    const renderItem = (data: any, index: React.Key | null | undefined) => {
        return (
            <>
                <TouchableOpacity key={index} activeOpacity={0.8}>
                    <ImageBackground source={{ uri: data.image,cache:"force-cache" }} style={styles.homeBannerImg} resizeMode="stretch" resizeMethod="scale" >
                    </ImageBackground>
                </TouchableOpacity>

            </>
        )
    }
    return (
        <View style={styles.homeBannerSection}>
            <Carousel
                ref={_carousal}
                data={imagesUrl}
                renderItem={({ item, index }) => renderItem(item, index)}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                autoplay={true}
                autoplayInterval={6000}
                loop={true}
                style={{ marginRight: 20 }}
                layout={'default'}
                layoutCardOffset={18}
                removeClippedSubviews={false}
            />
            {
                isModalShown && <BannerModal isVisiable={isModalShown} label={selectedDescription} onClosePress={() => { setIsModalShown(false); }} />
            }
        </View>
    );
};

export default React.memo(BannerComponent);

const styles = StyleSheet.create({
    homeBannerSection: {
        marginTop: 15,
        marginBottom: 25,
        elevation: 4,
        marginHorizontal: 0
    },
    homeBannerImg: {
        width: itemWidth,
        height: 200,
        borderRadius: 7,
    },
    textBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        paddingHorizontal: 8,
        height: "100%"
    },
    label: {
        fontFamily: FontFamilyFoods.POPPINSBOLD,
        fontSize: 18,
        lineHeight: 27,
        color: 'white',
        textAlign: "center",
        textAlignVertical: "bottom",
    }
});
