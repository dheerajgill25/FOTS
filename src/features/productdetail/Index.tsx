import React, { useRef, useState } from "react";
import { Animated, Dimensions, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import RootNavigator from "@navigation/rootnavigation";
import Typography from "@components/typography/Typography";
import styles from "./styles";
import { MyStatusBar } from "@components/statusbar/Index";
import ButtonWithText from "@components/buttons/BurttonWithText";
import CartScreen from "@features/cart/Index";
import ModalComponent from "@components/popup/Index";
import { label } from "@features/home/data";
import CircleNumber from "components/circleNumber";
const { height, width } = Dimensions.get('screen');
interface ProductDetailScreenProps { };
const bannerSection = () => {
    const BANNERIMAGEURL = require('../../../assets/images/noimg.png');
    const CARTIMAGEURL = require('../../../assets/images/cartwhite.png');
    return (
        <View style={styles.bannerSection}>
            <View style={styles.bannerPreview}>
                <View style={styles.previewImageSection}>
                    <Image source={BANNERIMAGEURL} style={styles.previewImage} />
                </View>
            </View>
            <View style={styles.cartIconSection}>
                <View style={{ position: 'relative' }}>
                    <Image source={CARTIMAGEURL} style={styles.cartImage} />
                    <View style={styles.amountCart}>
                        <CircleNumber amountCart={0} />
                    </View>
                </View>
            </View>
        </View>
    )
}
const headingSection = () => {
    return (
        <View style={styles.headingSection}>
            <View style={styles.headingBox}>
                <View style={styles.headingInner}>
                    <Typography style={styles.productName}>Peruvian Chicken</Typography>
                    <Typography style={styles.productSubText}>With roasted baby potatoes</Typography>
                </View>
                <View style={styles.productPrice}>
                    <Typography style={styles.price}>$0</Typography>
                </View>
            </View>
        </View>
    )
}
const renderDescriptionSection = () => {
    return (
        <View style={styles.descriptionSection}>
            <View style={styles.descriptiongBox}>
                <View style={styles.descriptionInner}>
                    <Typography style={styles.descriptionName}>Description</Typography>
                </View>
                <View style={styles.borderBottom}></View>
                <View>
                    <Typography style={styles.description}>This healthy classic is a definite crowd pleaser. Simply grilled chicken breast has been marinated in lemon and herbs. Served with roasted baby potato and seasonal vegetables.
                        Ingredients: chicken breast, canola oil, salt, black pepper, lemon juice, baby potatoes, parsley, Thai vegetable blend, rice vinegar, Italian seasoning, garlic.</Typography>
                </View>
            </View>
        </View>
    )
}
const nutritionSection = () => {
    return (
        <View style={styles.descriptionSection}>
            <View style={styles.descriptiongBox}>
                <View style={styles.descriptionInner}>
                    <Typography style={styles.descriptionName}>Nutrition Facts (per serving)</Typography>
                </View>
                <View style={styles.borderBottom}></View>
                <View style={styles.nutritionWrap}>
                    <View style={styles.nutritionBox}>
                        <View style={styles.nutritionContent}>
                            <Typography style={styles.nutritionQuantity}>50g</Typography>
                            <Typography style={styles.nutritionType}>PROTEIN</Typography>
                        </View>
                        <View style={styles.nutritionContent}>
                            <Typography style={styles.nutritionQuantity}>50g</Typography>
                            <Typography style={styles.nutritionType}>PROTEIN</Typography>
                        </View>
                        <View style={styles.nutritionContent}>
                            <Typography style={styles.nutritionQuantity}>50g</Typography>
                            <Typography style={styles.nutritionType}>PROTEIN</Typography>
                        </View>
                        <View style={styles.nutritionContent}>
                            <Typography style={styles.nutritionQuantity}>50g</Typography>
                            <Typography style={styles.nutritionType}>PROTEIN</Typography>
                        </View>

                    </View>
                </View>
            </View>
        </View>
    )
}
const cookingSection = () => {
    return (
        <View style={styles.cookingSection}>
            <View style={styles.cookingSectionWrap}>
                <View style={styles.cookingSectionBox}>
                    <View style={styles.cookingSectioContent}>
                        <Typography style={styles.cookingTime}>Cooking Time</Typography>
                    </View>
                    <View style={styles.cookingSectionTime}>
                        <Typography style={styles.cookingTimeText}>30 Minutes</Typography>
                    </View>
                </View>
            </View>
        </View>
    )
}
const cookingInstructionSection = () => {
    const PLUSIMAGEURL = require('../../../assets/images/plus.png');
    return (
        <View style={styles.accordienSection}>
            <View style={styles.accordienBox}>
                <View style={styles.accordienInner}>
                    <View style={styles.accordienWrap}>
                        <View style={styles.accordienContentFlex}>
                            <Typography style={styles.accordienTitle}>In Your Box</Typography>
                        </View>
                        <TouchableOpacity style={styles.accordienContentFlexRight}>
                            <Image source={PLUSIMAGEURL} style={styles.plusIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.accordienWrap}>
                        <View style={styles.accordienContentFlex}>
                            <Typography style={styles.accordienTitle}>Cooking Instructions</Typography>
                        </View>
                        <TouchableOpacity style={styles.accordienContentFlexRight}>
                            <Image source={PLUSIMAGEURL} style={styles.plusIcon} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View>
                            <Typography style={[styles.description, { fontSize: 14, lineHeight: 19, fontStyle: "italic" }]}>Food on the Stove encourages portion control. The
                            quantity provided is based on the known staffing
                            count provided by your department. Food on the
                            Stove buffers for 2-3 extra servings per delivery. </Typography>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
const scrollHeadingSection = () => {
    return (
        <View style={[styles.fixedHeaderView]}>
            <View style={styles.headerSection}>
                <TouchableOpacity onPress={() => RootNavigator.pop()} style={styles.headerImage}>
                    <Image source={require("../../../assets/images/backicon.png")} style={styles.backicon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const renderButtonSection = () => {
    return (
        <View style={styles.descriptionSection}>
            <ButtonWithText label={"Add to cart"} subText="$0" onPress={() => CartScreen.navigate()} />
        </View>
    )
}
const ProductDetailScreen = ({ }: ProductDetailScreenProps) => {
    const [isShown, setIsShown] = useState<boolean>(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    return (
        <>
            <MyStatusBar backgroundColor="#F2F2F2" height={29} barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <ModalComponent label={label} />
                <ScrollView bounces={false} stickyHeaderIndices={[2]}
                    onScroll={(event) => {
                        const y = event.nativeEvent.contentOffset.y;
                        if (y >= height / 2) {
                            setIsShown(true);
                        } else {
                            setIsShown(false)
                        }
                    }}
                    nestedScrollEnabled={false}>

                    {bannerSection()}
                    {headingSection()}
                    {
                        isShown && scrollHeadingSection()
                    }
                    {renderDescriptionSection()}
                    {nutritionSection()}
                    {cookingSection()}
                    {cookingInstructionSection()}
                    {renderButtonSection()}
                </ScrollView>
            </SafeAreaView>
        </>
    )
}
ProductDetailScreen.SCREEN_NAME = 'ProductDetailScreen';
ProductDetailScreen.navigationOptions = {
    headerShown: false,
};
ProductDetailScreen.navigate = () => {
    RootNavigator.navigate(ProductDetailScreen.SCREEN_NAME);
};
export default ProductDetailScreen;