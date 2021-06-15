import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, SafeAreaView, ScrollView, View, VirtualizedList } from "react-native";
import BaseScreen from "@features/basescreen/Index";
import SearchComponent from "@components/search/Index";
import RootNavigator from "navigation/rootnavigation";
import styles from "./styles";
import FoodItemsComponent from "components/foodItems/Index";
import Typography from "components/typography/Typography";
import RenderButtonWithIcon from "components/buttons/ButtonWithIcon";
import { foodItemData, groceryItemData, } from "./data";
import TestimonialComponent from "components/testimonial/Index";
import BannerComponent from "components/banner/Index";
import { MyStatusBar } from "components/statusbar/Index";
import CategoryControllerInstance from "./controllers/category.controller";
import { useSelector } from "react-redux";
import RootStore from "reduxModule/store/Index";
import MealPlan from "features/mealplan/Index";
import OrderScreen from "features/orderScreen/Index";
import ProductListControllerInstance from "features/products/controllers/product.controller";
import StorageService from "libs/storage/Storage";
import SearchScreen from "features/searchScreen/Index";
import TestimonialsControllerInstance from "./controllers/testimonials.controller";
import { window } from "themes/functions";
interface HomeScreenProps { }
const renderFoodItems = (item: any) => {
    const { index } = item;
    return (
        <FoodItemsComponent text={item.item.text} imageUrl={item.item.imageUrl} index={index} />
    )
}
const HomeScreen = ({ }: HomeScreenProps) => {
    const [text, setText] = useState<string>('');
    const [homePageBanner, setHomePageBanner] = useState<string>("");
    useEffect(() => {
        CategoryControllerInstance.getCategory();
        TestimonialsControllerInstance.getTestimonials()
    }, [])
    const categoryData = useSelector((state: RootStore) => state.CategoryInState.data?.data);
    const testimonialData = useSelector((state: RootStore) => state.TestimonialsInState.data?.data);
    const handleCategory = (item: any, index: number) => {
        return (
            <View key={index} style={styles.buttonsGroup}>
                <RenderButtonWithIcon fiveMealBtn label={item.name} onPress={() => {
                    item.status == 'free' ? OrderScreen.navigate(item.id) : item.status == "meal" ?
                        MealPlan.navigate(item.id) : null; StorageService.setItem("cId", item.id)
                }} />
            </View>
        )
    }
    const handleTextInput = (text: string) => {
        setText(text);
        if (text && text.length >= 3) {
            SearchScreen.navigate(text);
            ProductListControllerInstance.getProductList("", "", text.trim())
        }
    }
    const generalSettingData = useSelector((state: RootStore) => state.GeneralSettingInState.data);
    useEffect(() => {
        if (generalSettingData && generalSettingData.length > 0) {
            generalSettingData.map((obj: any, i: any) => (
                setHomePageBanner(obj.home_banner)
            ))
        }
    }, [generalSettingData])
    const getItemLayout = (data: any, index: any) => ({
        length: window.width / 5,
        offset: window.width / 5 * index,
        index,
    })
    return (
        <BaseScreen navigatorBarOptions={{ backIcon: true, cartIcon: true }}>
            <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <ScrollView bounces={false} removeClippedSubviews nestedScrollEnabled>
                    <View style={styles.homeSection}>
                        <SearchComponent text={text} action={(text) => handleTextInput(text)} />
                        <BannerComponent BANNERIMAGEURL={homePageBanner} />
                        <View>
                            <FlatList getItemLayout={(data:any, index:any) => getItemLayout(data,index)} data={categoryData} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) => handleCategory(item, index)} />
                        </View>
                    </View>
                    <View >
                        <Typography style={styles.foodItemPopluar}>Popular "Farm To Firehouse" Meals</Typography>
                        <FlatList getItemLayout={(data:any, index:any) => getItemLayout(data,index)} style={{ paddingLeft: 21, }} keyExtractor={(item, index) => index.toString()} bounces={false} data={foodItemData} renderItem={renderFoodItems} horizontal={true} showsHorizontalScrollIndicator={false} />
                    </View>
                    <View>
                        <Typography style={styles.foodItemPopluar}>Popular “For Your Table” Meals </Typography>
                        <FlatList getItemLayout={(data:any, index:any) => getItemLayout(data,index)} style={{ paddingLeft: 21, }} keyExtractor={(item, index) => index.toString()} bounces={false} data={foodItemData} renderItem={renderFoodItems} horizontal={true} showsHorizontalScrollIndicator={false} />
                    </View>
                    <View>
                        <Typography style={styles.foodItemPopluar}>Popular “Farm to Firehouse” Recipes</Typography>
                        <FlatList getItemLayout={(data:any, index:any) => getItemLayout(data,index)} style={{ paddingLeft: 21, }} keyExtractor={(item, index) => index.toString()} bounces={false} data={groceryItemData} renderItem={renderFoodItems} horizontal={true} showsHorizontalScrollIndicator={false} />
                    </View>
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