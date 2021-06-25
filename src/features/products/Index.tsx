import * as React from 'react';
import { View, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Platform, } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';
import { window } from 'themes/functions';
import ProductListControllerInstance from './controllers/product.controller';
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

interface ProductScreenProps { route: any };

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
                            <Typography style={[styles.shoppingCartSubTitle, styles.productPrice]}>{`$${data.net_amount}`}</Typography>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const renderEmptyCom = () => {
    return (
        <Typography style={[{ textAlign: "center", color: "#D80000", fontFamily: FontFamilyFoods.POPPINS, fontSize: 20 }]}>No Products Available</Typography>
    )
}
const ProductScreen = (props: ProductScreenProps) => {
    const [homePageBanner, setHomePageBanner] = React.useState<string>("");
    const [productData, setProductData] = useState([])
    let [offset, setOffset] = useState(1);
    let [totalPage, settTotalPage] = useState(1);
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);
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
        console.log("offset", offset)
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
    // const handleMore = () => {
    //     if (!onEndReachedCalledDuringMomentum) {
    //         getProductData()
    //         console.log("offset", offset)
    //         useAppDispatch(LoadingAction.showLoading(true))
    //         setOnEndReachedCalledDuringMomentum(true)
    //     }
    //     useAppDispatch(LoadingAction.showLoading(false))
    // }
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
                contentInset={{ bottom: 90 }}
                nestedScrollEnabled={true}
                renderItem={({ item }) => renderCartItems(item, meal)}
                initialNumToRender={10}
                onEndReached={() => {}}

            />
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