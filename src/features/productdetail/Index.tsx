import React, { useEffect, useState } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import RootNavigator from "@navigation/rootnavigation";
import Typography, { FontFamilyFoods } from "@components/typography/Typography";
import styles from "./styles";
import ButtonWithText from "@components/buttons/BurttonWithText";
import ModalComponent from "@components/popup/Index";
import { label } from "@features/home/data";
import ProductDetailControllerInstance from "./controllers/productdetail.controller";
import { useSelector } from "react-redux";
import RootStore from "reduxModule/store/Index";
import HTML from "react-native-render-html";
import AddToCartControllerInstance from "features/commonApiCall/addToCart/controllers/addToCart.controller";
import RemoveCartControllerInstance from "features/commonApiCall/removeCart/controllers/reomveToCart.controller";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeModal from 'react-native-modal';
import CartIcon from "components/carticon/Index";
import ImageComponent, { Priority, ResizeMode } from "components/imageComponent/ImageComponent";
import AlertModal from 'components/alertModal';
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
                    <ImageComponent uri={BANNERIMAGEURL} imageStyle={styles.previewImage} priority={Priority.low} resizeMode={ResizeMode.cover} />
                </View>
            </View>
            <View style={styles.cartIconSection}>
                <View style={{ position: 'relative' }}>
                    <CartIcon onDetailPage={true} whiteCartIcon={CARTIMAGEURL} />
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
                    <Typography style={[styles.productSubText, { maxWidth: 280 }]}>{_data.subTitle}</Typography>
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
                    <HTML source={{ html: _data }} baseFontStyle={{ fontSize: 14, fontFamily: FontFamilyFoods.POPPINS, lineHeight: 24 }} contentWidth={width} />
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

                                    </>
                                ))
                            ) : (
                                <View />
                            )
                        }
                        <View style={styles.nutritionContent}>
                            <Typography style={styles.nutritionQuantity}>{totalCalories}</Typography>
                            <Typography style={styles.nutritionType}>TOTAL CAL</Typography>
                        </View>
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
const cookingInstructionSection = (_data: any, ingradient: [], cabinet: [], categoryName: string) => {
    const PLUSIMAGEURL = require('../../../assets/images/plus.png');
    const MINUSIMAGEURL = require('../../../assets/images/minus.png');
    const [accrodien, setAccrodien] = useState<string>("");
    const handleAccordien = (type: string) => {
        if (accrodien != type) {
            setAccrodien(type);
        } else {
            setAccrodien("")
        }
    }
    return (
        <>
            {
                categoryName !== "For Your Table" && <View style={styles.accordienSection}>
                    <View style={styles.accordienBox}>
                        <View style={styles.accordienInner}>
                            <View style={styles.accordienWrap}>
                                <View style={styles.accordienContentFlex}>
                                    <Typography style={styles.accordienTitle}>In Your Box</Typography>
                                </View>
                                <TouchableOpacity style={styles.accordienContentFlexRight} onPress={() => handleAccordien("box")} >
                                    <Image source={accrodien == 'box' ? MINUSIMAGEURL : PLUSIMAGEURL} style={styles.plusIcon} />
                                </TouchableOpacity>
                            </View>
                            {
                                accrodien == 'box' && <View style={[styles.nutritionWrap, { marginBottom: 20 }]}>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginLeft: -10,
                                        marginTop: 10,
                                        flexWrap: 'wrap'
                                    }}>
                                        {
                                            ingradient && ingradient.length > 0 ? (
                                                ingradient && ingradient.map((item: any, index: any) => (
                                                    <>
                                                        <View key={index} style={[styles.inYourBox, {
                                                            width: 100,
                                                            marginBottom: 10,
                                                        }]}>
                                                            {
                                                                item.quantity == "" && item.quantity == 0 ? (
                                                                    <View />
                                                                ) : (
                                                                    <Typography style={styles.nutritionQuantity}>{item.quantity}{item.unit}</Typography>
                                                                )
                                                            }
                                                            <Typography style={styles.nutritionType}>{item.name}</Typography>
                                                        </View>
                                                    </>
                                                ))
                                            ) : (
                                                <View />
                                            )
                                        }

                                    </View>
                                </View>
                            }
                            <View style={styles.accordienWrap}>
                                <View style={styles.accordienContentFlex}>
                                    <Typography style={styles.accordienTitle}>From Your Cabinet</Typography>
                                </View>
                                <TouchableOpacity style={styles.accordienContentFlexRight} onPress={() => handleAccordien("cabinet")} >
                                    <Image source={accrodien == 'cabinet' ? MINUSIMAGEURL : PLUSIMAGEURL} style={styles.plusIcon} />
                                </TouchableOpacity>
                            </View>
                            {
                                accrodien == 'cabinet' && <View style={[styles.nutritionWrap, { marginBottom: 20 }]}>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginLeft: -10,
                                        marginTop: 10,
                                        flexWrap: 'wrap'
                                    }}>
                                        {
                                            cabinet && cabinet.length > 0 ? (
                                                cabinet && cabinet.map((item: any, index: any) => (
                                                    <>
                                                        <View key={index} style={[styles.inYourBox, {
                                                            width: 100,
                                                            marginBottom: 10,
                                                        }]}>
                                                            {
                                                                item.quantity == "" && item.quantity == 0 ? (
                                                                    <View />
                                                                ) : (
                                                                    <Typography style={styles.nutritionQuantity}>{item.quantity}{item.unit}</Typography>
                                                                )
                                                            }
                                                            <Typography style={styles.nutritionType}>{item.name}</Typography>
                                                        </View>
                                                    </>
                                                ))
                                            ) : (
                                                <View />
                                            )
                                        }

                                    </View>
                                </View>
                            }

                            <View style={styles.accordienWrap}>
                                <View style={styles.accordienContentFlex}>
                                    <Typography style={styles.accordienTitle}>Cooking Instructions</Typography>
                                </View>
                                <TouchableOpacity style={styles.accordienContentFlexRight} onPress={() => handleAccordien("cookingIns")}>
                                    <Image source={accrodien == 'cookingIns' ? MINUSIMAGEURL : PLUSIMAGEURL} style={styles.plusIcon} />
                                </TouchableOpacity>
                            </View>
                            {
                                accrodien == 'cookingIns' && <View>
                                    <View>
                                        <HTML source={{ html: _data }} baseFontStyle={{ fontSize: 14, fontFamily: FontFamilyFoods.POPPINS, lineHeight: 24 }} contentWidth={width} />
                                        {/* <Typography style={[styles.description, { fontSize: 14, lineHeight: 19, fontStyle: "italic" }]}>{_data} </Typography> */}
                                    </View>
                                </View>
                            }

                        </View>
                    </View>
                </View>
            }

        </>
    )
}

const renderFooterSection = () => {
    return (
        <View style={{ marginVertical: 18, marginHorizontal: 20 }}>
            <Typography style={{ fontStyle: 'italic', fontSize: 14, lineHeight: 21, fontFamily: FontFamilyFoods.POPPINS }}>*Food on the Stove encourages portion control. The
                quantity provided is based on the known staffing
                count provided by your department. Food on the
                Stove buffers for 2-3 extra servings per delivery. </Typography>
        </View>
    )
}


const ProductDetailScreen = (props: ProductDetailScreenProps) => {
    const modalizeRef = React.useRef<ReactNativeModal>(null);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(true);
    const {
        route: { params: { id, meal } },
    } = props;
    useEffect(() => {
        ProductDetailControllerInstance.getProductDetails(id)
    }, []);
    const productDetail = useSelector((state: RootStore) => state.ProductDetailInState.data?.data);
    const callbackAddToCart = async (success: boolean, msg?: any) => {
        if (success) {
            setIsShowModal(true);
        } else {
            setIsShowModal(false);
        }
    }
    const handleAddToCart = (item: any) => {
        const products: any[] = [];
        const productId = {
            product_id: item.id, quantity: 1
        };
        products.push(productId);
        const request = {
            category_id: item.category_id,
            meal_id: item.meal_id || "",
            products: products
        };
        AsyncStorage.setItem("cartRequest", JSON.stringify(item));
        AddToCartControllerInstance.addToCartProducts(request, item.name, callbackAddToCart, false, item.category_name);

    }
    const handleAddToCartAfterRemove = async () => {
        AsyncStorage.getItem('cartRequest').then((val: any) => {
            const cartRequest = JSON.parse(val);
            handleAddToCart(cartRequest)
        });
        AsyncStorage.removeItem("cartRequest");
    }
    const handleCartAgainAfterRemove = async () => {
        const categoryId = await AsyncStorage.getItem("cId");
        RemoveCartControllerInstance.RemoveCartOtherProducts(categoryId)
        const successfully = await RemoveCartControllerInstance.removeProductSuccess();
        setTimeout(() => {
            if (successfully) {
                handleAddToCartAfterRemove();
            }
        }, 1000);
    }
    const renderButtonSection = (_data: any, item: any) => {
        return (
            <View style={styles.descriptionSection}>
                <ButtonWithText label={"Add to cart"} subText={"$" + _data} onPress={() => { handleAddToCart(item) }} />
            </View>
        )
    }
    return (
        <>
            <SafeAreaView style={styles.container}>

                {
                    meal ? (
                        <View />
                    ) : (
                        <ModalComponent label={label} isVisiable={showConfirmModal} onClose={() => setShowConfirmModal(false)} />
                    )
                }

                <ScrollView bounces={false}
                    nestedScrollEnabled={false}>

                    {bannerSection(productDetail?.image)}
                    {headingSection({ heading: productDetail?.name, slug: productDetail?.slug, amount: productDetail?.net_amount, subTitle: productDetail?.sub_title })}
                    {/* {
                        isShown && scrollHeadingSection()
                    } */}
                    {renderDescriptionSection(productDetail?.description)}
                    {nutritionSection(productDetail?.nutrition, productDetail?.total_calories)}
                    {productDetail?.meal_id == "" && cookingSection(productDetail?.cooking_time)}
                    {cookingInstructionSection(productDetail?.cooking_instructions, productDetail?.ingredient, productDetail?.cabinet, productDetail?.category_name)}
                    {productDetail?.category_name == "Farm to Firehouse" && renderFooterSection()}
                    {renderButtonSection(productDetail?.net_amount, productDetail)}
                    {
                        isShowModal && <AlertModal
                            onClosePress={() => { setIsShowModal(false); }}
                            label="Your cart has another product, do you want to discard the previous selection and add new product?"
                            isVisiable={isShowModal}
                            onSuccess={() => { handleCartAgainAfterRemove() }}
                        />
                    }
                </ScrollView>

            </SafeAreaView>

        </>
    )
}
ProductDetailScreen.SCREEN_NAME = 'ProductDetailScreen';
ProductDetailScreen.navigationOptions = {
    headerShown: false,
};
ProductDetailScreen.navigate = (id?: string, meal?: boolean) => {
    RootNavigator.navigate(ProductDetailScreen.SCREEN_NAME, { id: id, meal: meal });
};
export default ProductDetailScreen;