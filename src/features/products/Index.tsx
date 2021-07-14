import * as React from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity, Image, } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';
import { window } from 'themes/functions';
import styles from './styles';
import BannerComponent from 'components/banner/Index';
import ImageComponent, { Priority, ResizeMode } from 'components/imageComponent/ImageComponent';
import ModalComponent from 'components/popup/Index';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import ProductDetailScreen from 'features/productdetail/Index';
import RootNavigator from 'navigation/rootnavigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { APIENDPOINTS, URL } from 'libs/api/apiEndpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoadingAction } from 'features/LoadingScreen/actions/LoadingAction';
import { useAppDispatch } from 'libs/functions';
import AlertModal from 'components/alertModal';
import AddToCartControllerInstance from 'features/commonApiCall/addToCart/controllers/addToCart.controller';
import RemoveCartControllerInstance from 'features/commonApiCall/removeCart/controllers/reomveToCart.controller';

interface ProductScreenProps { route: any };


const renderEmptyCom = () => {
    return (
        <Typography style={[{ textAlign: "center", color: "#D80000", fontFamily: FontFamilyFoods.POPPINS, fontSize: 20 }]}>No Products Available</Typography>
    )
}
const ProductScreen = (props: ProductScreenProps) => {
    const [homePageBanner, setHomePageBanner] = React.useState<string>("");
    const [productData, setProductData] = useState([])
    let [offset, setOffset] = useState(1);
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const {
        route: { params: { cId, id, meal } },
    } = props;
    const getProductData = async () => {
        var formData: FormData = new FormData();
        formData.append('category_id', cId || "");
        formData.append('meal_id', id || "");
        formData.append('pageNo', offset || "");
        const token = await AsyncStorage.getItem("token");
        const URLS = APIENDPOINTS.APIBASEURL + URL.PRODUCTS + `?key=${APIENDPOINTS.APIKEY}`;
        fetch(URLS, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token || "",
            },
            body: formData
        }).then((res) => res.json()).then((resJson) => {
            setProductData(productData.concat(resJson?.data?.data))
            useAppDispatch(LoadingAction.showLoading(false))
            var totalPage = resJson?.data?.total_page;
            if (totalPage > offset) {
                setOffset(offset + 1);
            }
            useAppDispatch(LoadingAction.showLoading(false))
        }).catch((eror) => console.log('ererorror', eror))
    }
    useEffect(() => {
        let cancelled = false
        if (!cancelled) {
            getProductData();
            useAppDispatch(LoadingAction.showLoading(true))
        }
        return () => {
            cancelled = false
        }
    }, [offset])
    const generalSettingData = useSelector((state: RootStore) => state.GeneralSettingInState.data);
    React.useEffect(() => {
        if (generalSettingData && generalSettingData.length > 0) {
            generalSettingData.map((obj: any, i: any) => (
                setHomePageBanner(obj.product_banner)
            ))
        }
    }, [generalSettingData]);
    const getItemLayout = (data: any, index: any) => ({
        length: window.width / 5,
        offset: window.width / 5 * index,
        index,
    })

    const handleAddToCart = (data: any) => {
        const products = [];
        const productId = {
            product_id: data.id, quantity: 1
        };
        products.push(productId);
        const request = {
            category_id: data.category_id,
            meal_id: data.meal_id || "",
            products: products
        };
        AsyncStorage.setItem("cartRequest", JSON.stringify(data));
        AddToCartControllerInstance.addToCartProducts(request, data.name, callbackAddToCart,true);
    }
    const callbackAddToCart = async (success: boolean, msg?: any) => {
        console.log(success)
        if (success) {
            setIsShowModal(true);
        } else {
            setIsShowModal(false);
        }
    }
    const ratingComponent = (rating: any) => {
        return (
            <Rating
                style={{ paddingVertical: 5, alignSelf: "flex-start" }}
                imageSize={20}
                startingValue={rating}
                readonly
            />
        )
    }
    const renderCartItems = (data: any, meal: boolean) => {
        const BANNERIMAGEURL = data.image && data?.image?.length > 0 ? data?.image[0]?.image : "";
        const PLUSIMAGEURL = require('../../../assets/images/plus.png');
        return (
            <View style={styles.cartBox}>
                <View style={styles.cartItemWrap}>
                    <View style={styles.shoppingCartBox}>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => ProductDetailScreen.navigate(data.product_id, meal)} style={styles.shoppingCartWrap}>
                            <View style={styles.shoppingCartLeft}>
                                <ImageComponent uri={BANNERIMAGEURL} imageStyle={styles.bannerImage} priority={Priority.low} resizeMode={ResizeMode.cover} />
                            </View>
                            <View style={styles.shoppingCartRight}>
                                <Typography style={[styles.shoppingCartTitle, styles.productName]}>{data.name}</Typography>
                                <View style={styles.ratingComp}>
                                    {ratingComponent(data?.rating)}
                                </View>
                                <Typography style={[styles.shoppingCartSubText]}>{data?.sub_title}</Typography>

                            </View>
                            <View style={{ flex: 1, maxWidth: 60 }}>
                                <Typography style={[styles.shoppingCartSubTitle, styles.productPrice, { marginTop: 10 }]}>{`$${data.net_amount}`}</Typography>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAddToCart(data)} style={{ position: 'absolute', right: 0, bottom: 50 }}>
                            <Image source={PLUSIMAGEURL} style={{
                                height: 22,
                                width: 22,
                                alignSelf: "center",
                            }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
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
    const handleAddToCartAfterRemove = async () => {
        AsyncStorage.getItem('cartRequest').then((val: any) => {
            const cartRequest = JSON.parse(val);
            handleAddToCart(cartRequest)
        });
        AsyncStorage.removeItem("cartRequest");
    }
    return (
        <SafeAreaView style={styles.container}>
            <ModalComponent label={"Orders must be placed by 12pm Friday."} mealPlan subTitle="*5 and 7 - day meal plans will require 2 deliveries to ensure freshness." />
            <View style={{ marginHorizontal: 20 }}>
                <BannerComponent BANNERIMAGEURL={homePageBanner} />
            </View>
            <FlatList
                getItemLayout={getItemLayout}
                data={productData}
                ListEmptyComponent={() => renderEmptyCom()}
                scrollEnabled={true}
                style={{ marginBottom: 23 }}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.6}
                onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false) }}
                contentInset={{ bottom: 20 }}
                nestedScrollEnabled={true}
                renderItem={({ item }) => renderCartItems(item, meal)}
                initialNumToRender={10}
                onEndReached={() => { }}
                bounces={false}

            />
            {
                isShowModal && <AlertModal
                    onClosePress={() => { setIsShowModal(false); }}
                    label="Your cart has another product, do you want to discard the previous selection and add new product?"
                    isVisiable={isShowModal}
                    onSuccess={()=>{handleCartAgainAfterRemove()}}
                />
            }
        </SafeAreaView>
    );
};
ProductScreen.SCREEN_NAME = "ProductScreen";
ProductScreen.navigationOptions = {
    headerShown: false,
};
ProductScreen.navigate = (cId: string, id: string, meal: boolean) => {
    RootNavigator.navigate(ProductScreen.SCREEN_NAME, { cId: cId, id: id, meal: meal });
};
export default ProductScreen;