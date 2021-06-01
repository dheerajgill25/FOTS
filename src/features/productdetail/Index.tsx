import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image, SafeAreaView, ScrollView, TouchableOpacity, useWindowDimensions, View } from "react-native";
import RootNavigator from "@navigation/rootnavigation";
import Typography, { FontFamilyFoods } from "@components/typography/Typography";
import styles from "./styles";
import { MyStatusBar } from "@components/statusbar/Index";
import ButtonWithText from "@components/buttons/BurttonWithText";
import CartScreen from "@features/cart/Index";
import ModalComponent from "@components/popup/Index";
import { label } from "@features/home/data";
import CircleNumber from "components/circleNumber";
import ProductDetailControllerInstance from "./controllers/productdetail.controller";
import { useSelector } from "react-redux";
import RootStore from "reduxModule/store/Index";
import HTML from "react-native-render-html";
import AddToCartControllerInstance from "features/commonApiCall/addToCart/controllers/addToCart.controller";
const { height, width } = Dimensions.get('screen');
interface ProductDetailScreenProps {
    route: any
};
const bannerSection = (_data: any) => {
    const BANNERIMAGEURL = _data && _data.length > 0 ? _data[0].image : "";
    const CARTIMAGEURL = require('../../../assets/images/cartwhite.png');
    return (
        <View style={styles.bannerSection}>
            <View style={styles.bannerPreview}>
                <View style={styles.previewImageSection}>
                    <Image source={{ uri: BANNERIMAGEURL }} style={styles.previewImage} resizeMode="contain" />
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
const headingSection = (_data: any) => {
    return (
        <View style={styles.headingSection}>
            <View style={styles.headingBox}>
                <View style={styles.headingInner}>
                    <Typography style={styles.productName}>{_data.heading}</Typography>
                    <Typography style={styles.productSubText}>With roasted baby potatoes</Typography>
                </View>
                <View style={styles.productPrice}>
                    <Typography style={styles.price}>${_data.amount}</Typography>
                </View>
            </View>
        </View>
    )
}
const renderDescriptionSection = (_data: any) => {
    return (
        <View style={styles.descriptionSection}>
            <View style={styles.descriptiongBox}>
                <View style={styles.descriptionInner}>
                    <Typography style={styles.descriptionName}>Description</Typography>
                </View>
                <View style={styles.borderBottom}></View>
                <View>
                    <HTML source={{ html: _data }} baseFontStyle={{fontSize:14,fontFamily:FontFamilyFoods.POPPINS,lineHeight:24}} contentWidth={width} />
                    {/* <Typography style={styles.description}>{_data}</Typography> */}
                </View>
            </View>
        </View>
    )
}
const nutritionSection = (_data: any, totalCalories: string) => {
    return (
        <View style={styles.descriptionSection}>
            <View style={styles.descriptiongBox}>
                <View style={styles.descriptionInner}>
                    <Typography style={styles.descriptionName}>Nutrition Facts (per serving)</Typography>
                </View>
                <View style={styles.borderBottom}></View>
                <View style={styles.nutritionWrap}>
                    <View style={styles.nutritionBox}>
                        {
                            _data && _data.length > 0 ? (
                                _data && _data.map((item: any, index: any) => (
                                    <>
                                        <View key={index} style={styles.nutritionContent}>
                                            <Typography style={styles.nutritionQuantity}>{item.value}{item.unit}</Typography>
                                            <Typography style={styles.nutritionType}>{item.name}</Typography>
                                        </View>
                                        {
                                            index == 2 && (
                                                <View style={styles.nutritionContent}>
                                                    <Typography style={styles.nutritionQuantity}>{totalCalories}</Typography>
                                                    <Typography style={styles.nutritionType}>TOTAL CAL</Typography>
                                                </View>
                                            )
                                        }

                                    </>
                                ))
                            ) : (
                                <View />
                            )
                        }

                    </View>
                </View>
            </View>
        </View>
    )
}
const cookingSection = (_data: any) => {
    return (
        <View style={styles.cookingSection}>
            <View style={styles.cookingSectionWrap}>
                <View style={styles.cookingSectionBox}>
                    <View style={styles.cookingSectioContent}>
                        <Typography style={styles.cookingTime}>Cooking Time</Typography>
                    </View>
                    <View style={styles.cookingSectionTime}>
                        <Typography style={styles.cookingTimeText}>{_data} Minutes</Typography>
                    </View>
                </View>
            </View>
        </View>
    )
}
const cookingInstructionSection = (_data: any) => {
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
                            <HTML source={{ html: _data }} baseFontStyle={{fontSize:14,fontFamily:FontFamilyFoods.POPPINS,lineHeight:24}} contentWidth={width} />
                            {/* <Typography style={[styles.description, { fontSize: 14, lineHeight: 19, fontStyle: "italic" }]}>{_data} </Typography> */}
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
const renderButtonSection = (_data: string,item:any) => {
    const handleAddToCart = ()=>{
      const products:any[] = [];
      const productId = {
          product_id:item.id,quantity:1
      };
      products.push(productId);
      const request = {
        category_id:item.category_id,
        meal_id:"",
        products:products
      };
      AddToCartControllerInstance.addToCartProducts(request);
    }
    return (
        <View style={styles.descriptionSection}>
            <ButtonWithText label={"Add to cart"} subText={"$" + _data} onPress={() => handleAddToCart()} />
        </View>
    )
}
const ProductDetailScreen = (props: ProductDetailScreenProps) => {
    const [isShown, setIsShown] = useState<boolean>(false);
    const {
        route: { params: { id } },
    } = props;
    useEffect(() => {
        ProductDetailControllerInstance.getProductDetails(id)
    }, []);
    const productDetail = useSelector((state: RootStore) => state.ProductDetailInState.data?.data);
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

                    {bannerSection(productDetail?.image)}
                    {headingSection({ heading: productDetail?.name, slug: productDetail?.slug, amount: productDetail?.amount })}
                    {
                        isShown && scrollHeadingSection()
                    }
                    {renderDescriptionSection(productDetail?.description)}
                    {nutritionSection(productDetail?.nutrition, productDetail?.total_calories)}
                    {cookingSection(productDetail?.cooking_time)}
                    {cookingInstructionSection(productDetail?.cooking_instructions)}
                    {renderButtonSection(productDetail?.amount,productDetail)}
                </ScrollView>
            </SafeAreaView>
        </>
    )
}
ProductDetailScreen.SCREEN_NAME = 'ProductDetailScreen';
ProductDetailScreen.navigationOptions = {
    headerShown: false,
};
ProductDetailScreen.navigate = (id?: string) => {
    RootNavigator.navigate(ProductDetailScreen.SCREEN_NAME, { id: id });
};
export default ProductDetailScreen;