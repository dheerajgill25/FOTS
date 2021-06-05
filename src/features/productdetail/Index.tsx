import React, { useEffect, useRef, useState } from "react";
import { Alert, Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import RootNavigator from "@navigation/rootnavigation";
import Typography, { FontFamilyFoods } from "@components/typography/Typography";
import styles from "./styles";
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
import RemoveCartControllerInstance from "features/commonApiCall/removeCart/controllers/reomveToCart.controller";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeModal from 'react-native-modal';
import HomeScreen from "features/home/Index";
const { height, width } = Dimensions.get('screen');
let cartAgainAdd: boolean = false;
interface ProductDetailScreenProps {
    route: any
};
const bannerSection = (_data: any, length: number) => {
    const BANNERIMAGEURL = _data && _data.length > 0 ? _data[0].image : "";
    const CARTIMAGEURL = require('../../../assets/images/cartwhite.png');
    return (
        <View style={styles.bannerSection}>
            <View style={styles.bannerPreview}>
                <View style={styles.previewImageSection}>
                    <Image source={{ uri: BANNERIMAGEURL, cache: "force-cache" }} style={styles.previewImage} resizeMethod="auto" resizeMode="cover" />
                </View>
            </View>
            <View style={styles.cartIconSection}>
                <View style={{ position: 'relative' }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => CartScreen.navigate()}>
                        <Image source={CARTIMAGEURL} style={styles.cartImage} />
                        <View style={styles.amountCart}>
                            <CircleNumber amountCart={length} />
                        </View>
                    </TouchableOpacity>
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
const cookingInstructionSection = (_data: any, ingradient: []) => {
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
        <View style={styles.accordienSection}>
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
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: -10,
                                marginTop: 10,
                                flexWrap: 'wrap'
                            }}>
                                {
                                    ingradient && ingradient.length > 0 ? (
                                        ingradient && ingradient.map((item: any, index: any) => (
                                            <>
                                                <View key={index} style={[styles.nutritionContent, { flex: 0, width: 100, marginBottom: 10 }]}>
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
const callbackAddToCart = async (success: boolean, msg?: any) => {
    cartAgainAdd = success
}

const renderButtonSection = (_data: any, item: any) => {
    return (
        <View style={styles.descriptionSection}>
            <ButtonWithText label={"Add to cart"} subText={"$" + _data} onPress={() => handleAddToCart(item)} />
        </View>
    )
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
    AddToCartControllerInstance.addToCartProducts(request, item.name, callbackAddToCart);
}
const handleCartAgainAfterRemove = async (cart: {}) => {
    const categoryId = await AsyncStorage.getItem("cId");
    RemoveCartControllerInstance.RemoveCartOtherProducts(categoryId)
    const successfully = await RemoveCartControllerInstance.removeProductSuccess();
    setTimeout(() => {
        if (successfully) {
            handleAddToCartAfterRemove(cart);
            cart={}
        }
    }, 1000);
}

const renderModal = (modalizeRef: any, cart: {}) => {
    const closeModal = () => {
        modalizeRef?.current?.close();
        cartAgainAdd = false;
        cart = {};
        HomeScreen.navigate()
    }
    return (
        <>
            {
                cartAgainAdd ? (
                    <ReactNativeModal ref={modalizeRef} isVisible={true} onModalHide={() => closeModal()} style={styles.modal}
                        backdropColor={'black'}
                        backdropOpacity={0.3}
                        coverScreen={true}
                    >
                        <View style={styles.modalcontainer} >
                            <View style={styles.modalSection}>
                                <View style={styles.modalInner}>
                                    <Typography style={styles.label}>{'Your cart has another product, do you want to discard the previous selection and add new product?'}</Typography>
                                </View>
                                <View style={styles.modalButton}>
                                    <TouchableOpacity
                                        style={styles.btn}
                                        onPress={() => closeModal()}
                                    >
                                        <Typography style={styles.buttonText}>{'Cancel'}</Typography>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.btn}
                                        onPress={() => handleCartAgainAfterRemove(cart)}
                                    >
                                        <Typography style={styles.buttonText}>{'OK'}</Typography>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ReactNativeModal>
                ) : (
                    <View />
                )
            }
        </>
    )
}
const handleAddToCartAfterRemove = async (cart: {}) => {
    AsyncStorage.getItem('cartRequest').then((val: any) => {
        const cartRequest = JSON.parse(val);
        handleAddToCart(cartRequest)
    });
    AsyncStorage.removeItem("cartRequest");
    cart={}
}
const ProductDetailScreen = (props: ProductDetailScreenProps) => {
    let addCart: { popup?: any; };
    const modalizeRef = React.useRef<ReactNativeModal>(null);
    const [isShown, setIsShown] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<number>(0)
    const {
        route: { params: { id, meal } },
    } = props;
    useEffect(() => {
        addCart ={popup:false}
        ProductDetailControllerInstance.getProductDetails(id)
    }, []);
    const productDetail = useSelector((state: RootStore) => state.ProductDetailInState.data?.data);
    const cartData = useSelector((state: RootStore) => state.CartListInState.data?.data);
    addCart = useSelector((state: any) => state.AddToCartInState.data);
    useEffect(() => {
        addCart={};
        if (cartData?.data && cartData?.data?.length > 0) {
            setCartItems(cartData?.data[0]?.cart_item?.length);
        } else {
            setCartItems(0)
        }
    }, [cartData])
    useEffect(() => {
        if (addCart?.popup) {
            renderModal(modalizeRef, addCart);
        }
        cartAgainAdd = false;
        addCart={}
    }, [addCart])
    return (
        <>
            <SafeAreaView style={styles.container}>

                {
                    meal ? (
                        <View />
                    ) : (
                        <ModalComponent label={label} />
                    )
                }

                <ScrollView bounces={false}
                    nestedScrollEnabled={false}>

                    {bannerSection(productDetail?.image, cartItems)}
                    {headingSection({ heading: productDetail?.name, slug: productDetail?.slug, amount: productDetail?.amount, subTitle: productDetail?.sub_title })}
                    {/* {
                        isShown && scrollHeadingSection()
                    } */}
                    {renderDescriptionSection(productDetail?.description)}
                    {nutritionSection(productDetail?.nutrition, productDetail?.total_calories)}
                    {cookingSection(productDetail?.cooking_time)}
                    {cookingInstructionSection(productDetail?.cooking_instructions, productDetail?.ingredient)}
                    {renderButtonSection(productDetail?.amount, productDetail)}
                    {
                        addCart?.popup ? renderModal(modalizeRef, addCart) : null
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