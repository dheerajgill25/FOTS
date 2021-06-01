import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, View } from "react-native";
import BaseScreen from "@features/basescreen/Index";
import SearchComponent from "@components/search/Index";
import RootNavigator from "navigation/rootnavigation";
import styles from "./styles";
import FoodItemsComponent from "components/foodItems/Index";
import Typography from "components/typography/Typography";
import RenderButtonWithIcon from "components/buttons/ButtonWithIcon";
import { foodItemData, groceryItemData, testimonialData } from "./data";
import TestimonialComponent from "components/testimonial/Index";
import BannerComponent from "components/banner/Index";
import { MyStatusBar } from "components/statusbar/Index";
import CategoryControllerInstance from "./controllers/category.controller";
import { useSelector } from "react-redux";
import RootStore from "reduxModule/store/Index";
import MealPlan from "features/mealplan/Index";
import OrderScreen from "features/orderScreen/Index";
import ProductListControllerInstance from "features/products/controllers/product.controller";
interface HomeScreenProps { }
const renderFoodItems = (item: any) => {
    return (
        <FoodItemsComponent text={item.item.text} imageUrl={item.item.imageUrl} key={item.index}   />
    )
}
const HomeScreen = ({ }: HomeScreenProps) => {
    const HOMEBANNERIMAGEURL = require('../../../assets/images/homeBanner.png');
    const [text,setText] = useState<string>('');
    useEffect(() => {
        CategoryControllerInstance.getCategory();
    }, [])
    const categoryData = useSelector((state: RootStore) => state.CategoryInState.data?.data);
    const handleCategory = (item: any, index: number) => {  
        return (
            <View key={index} style={styles.buttonsGroup}>
                <RenderButtonWithIcon fiveMealBtn label={item.name} onPress={() =>
                    item.status == 'free' ? OrderScreen.navigate(item.id) : item.status == "paid" ?
                        null : MealPlan.navigate(item.id)} />
            </View>
        )
    }
    const handleTextInput = (text: string)=>{
       setText(text);
       ProductListControllerInstance.getProductList("","",text)
    }
    return (
        <BaseScreen navigatorBarOptions={{ backIcon: true, cartIcon: true }}>
            <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <ScrollView bounces={false}>
                    <View style={styles.homeSection}>
                        <SearchComponent text={text} action={(text) => handleTextInput(text)} />
                        <BannerComponent BANNERIMAGEURL={HOMEBANNERIMAGEURL} />
                        <View>
                            <FlatList data={categoryData} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) => handleCategory(item, index)} />
                        </View>
                    </View>
                    <View >
                        <Typography style={styles.foodItemPopluar}>Popular "Farm To Firehouse" Meals</Typography>
                        <FlatList style={{ paddingLeft: 21, }} keyExtractor={(item, index) => index.toString()} bounces={false} data={foodItemData} renderItem={renderFoodItems} horizontal={true} showsHorizontalScrollIndicator={false} />
                    </View>
                    <View>
                        <Typography style={styles.foodItemPopluar}>Popular “For Your Table” Meals </Typography>
                        <FlatList style={{ paddingLeft: 21, }} keyExtractor={(item, index) => index.toString()} bounces={false} data={foodItemData} renderItem={renderFoodItems} horizontal={true} showsHorizontalScrollIndicator={false} />
                    </View>
                    <View>
                        <Typography style={styles.foodItemPopluar}>Popular “Farm to Firehouse” Recipes</Typography>
                        <FlatList style={{ paddingLeft: 21, }} keyExtractor={(item, index) => index.toString()} bounces={false} data={groceryItemData} renderItem={renderFoodItems} horizontal={true} showsHorizontalScrollIndicator={false} />
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