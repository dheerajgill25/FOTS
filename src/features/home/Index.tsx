import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, View } from "react-native";
import BaseScreen from "@features/basescreen/Index";
import SearchComponent from "@components/search/Index";
import RootNavigator from "navigation/rootnavigation";
import styles from "./styles";
import FoodItemsComponent from "components/foodItems/Index";
import Typography from "components/typography/Typography";
import RenderButtonWithIcon from "components/buttons/ButtonWithIcon";
import TestimonialComponent from "components/testimonial/Index";
import BannerComponent from "components/banner/Index";
import { MyStatusBar } from "components/statusbar/Index";
import CategoryControllerInstance from "./controllers/category.controller";
import { useSelector } from "react-redux";
import RootStore from "reduxModule/store/Index";
import MealPlan from "features/mealplan/Index";
import OrderScreen from "features/orderScreen/Index";
import StorageService from "libs/storage/Storage";
import TestimonialsControllerInstance from "./controllers/testimonials.controller";
import { window } from "themes/functions";
interface HomeScreenProps { }
const renderFoodItems = (item: any, index: number) => {
    return (
        <FoodItemsComponent data={item.products} title={item?.category_name} index={index} />
    )
}
const HomeScreen = ({ }: HomeScreenProps) => {
    const [text, setText] = useState<string>('');
    const [homePageBanner, setHomePageBanner] = useState<string>("");
    const [bannerImages, setBannerImages] = useState<any>([]);
    const [enableScrollViewScroll, setEnableScrollViewScroll] = useState<boolean>(true);
    useEffect(() => {
        CategoryControllerInstance.getCategory();
        TestimonialsControllerInstance.getTestimonials();
        //PopularProductControllerInstance.getPopularProduct()
    }, [])
    const categoryData = useSelector((state: RootStore) => state.CategoryInState.data?.data);
    const testimonialData = useSelector((state: RootStore) => state.TestimonialsInState.data?.data);
    //const popularProduct = useSelector((state: RootStore) => state.PopularProductInState.data?.data);
    const handleCategory = (item: any, index: number) => {
        return (
            <View key={index} style={styles.buttonsGroup}>
                <RenderButtonWithIcon label={item.name} onPress={() => {
                    item.status == 'free' ? OrderScreen.navigate(item.id) : item.status == "meal" ?
                        MealPlan.navigate(item.id) : null; StorageService.setItem("cId", item.id)
                }} />
            </View>
        )
    }
    const generalSettingData = useSelector((state: RootStore) => state.GeneralSettingInState.data);
    useEffect(() => {
        if (generalSettingData && generalSettingData.banner) {
            setBannerImages(generalSettingData.banner?.home);
        }
    }, [generalSettingData])
    const getItemLayout = (data: any, index: any) => ({
        length: window.width / 5,
        offset: window.width / 5 * index,
        index,
    })
    const onEnableScroll = (isScroll: boolean) => {
        setEnableScrollViewScroll(isScroll)
    }
    return (
        <BaseScreen navigatorBarOptions={{ backIcon: true, cartIcon: true }}>
            <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <ScrollView bounces={false} scrollEnabled={enableScrollViewScroll} removeClippedSubviews nestedScrollEnabled>
                    <View style={styles.homeSection}>
                        <SearchComponent text={text} />
                    </View>
                    <BannerComponent BANNERIMAGEURL={homePageBanner} imagesUrl={bannerImages} />
                    <View style={styles.homeSection}>
                        <FlatList bounces={false} onTouchStart={() => onEnableScroll(true)} onMomentumScrollEnd={() => onEnableScroll(true)} getItemLayout={(data: any, index: any) => getItemLayout(data, index)} data={categoryData} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) => handleCategory(item, index)} />
                    </View>

                    {/* <View >
                        <FlatList getItemLayout={(data: any, index: any) => getItemLayout(data, index)}  keyExtractor={(item, index) => index.toString()} bounces={false} data={popularProduct} renderItem={({ item, index }) => renderFoodItems(item, index)}  />
                    </View> */}
                    <View>
                        <View>
                            <Typography style={styles.foodItemPopluar} >Testimonials</Typography>
                        </View>
                        <TestimonialComponent data={testimonialData} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </BaseScreen>
    )
}
HomeScreen.SCREEN_NAME = 'HomeScreen';
HomeScreen.navigationOptions = {
    headerShown: false,
    headerTransparent: true,
};
HomeScreen.navigate = () => {
    RootNavigator.navigate(HomeScreen.SCREEN_NAME);
};
export default HomeScreen;