import React from "react";
import { FlatList, Image, SafeAreaView, ScrollView, View } from "react-native";
import BaseScreen from "@features/basescreen/Index";
import SearchComponent from "@components/search/Index";
import RootNavigator from "navigation/rootnavigation";
import styles from "./styles";
import FoodItemsComponent from "components/foodItems/Index";
import Typography from "components/typography/Typography";
import RenderButtonWithIcon from "components/buttons/ButtonWithIcon";
import { foodItemData, groceryItemData, testimonialData } from "./data";
import TestimonialComponent from "components/testimonial/Index";
import OrderScreen from "features/orderScreen/Index";
interface HomeScreenProps { }

const renderFoodItems = (item: any) => {
    return (
        <FoodItemsComponent text={item.item.text} imageUrl={item.item.imageUrl} />
    )
}
const HomeScreen = ({ }: HomeScreenProps) => {
    const HOMEBANNERIMAGEURL = require('../../../assets/images/homeBanner.png');
    const ARROWLEFTIMAGE = require('../../../assets/images/arrowleft.png');
    return (
        <BaseScreen navigatorBarOptions={{ backIcon: true, cartIcon: true }}>
            <SafeAreaView style={styles.container}>
                <ScrollView bounces={false}>
                    <View style={styles.homeSection}>
                        <SearchComponent text="" action={async () => console.log('')} />
                        <View style={styles.homeBannerSection}>
                            <Image source={HOMEBANNERIMAGEURL} style={styles.homeBannerImg} resizeMode="stretch" resizeMethod="scale" />
                        </View>
                        <View>
                            <View style={styles.buttonsGroup}>
                                <RenderButtonWithIcon label={'Farm To Firehouse'} onPress={()=>OrderScreen.navigate()} />
                            </View>
                            <View style={styles.buttonsGroup}>
                                <RenderButtonWithIcon label={'from the farm'} onPress={()=>OrderScreen.navigate()} />
                            </View>
                            <View style={styles.buttonsGroup}>
                                <RenderButtonWithIcon label={'for your table'} onPress={()=>OrderScreen.navigate()} />
                            </View>

                        </View>
                        <View>
                            <Typography style={styles.foodItemPopluar}>Popular Food Items</Typography>
                            <FlatList keyExtractor={(item, index) => index.toString()} bounces={false} data={foodItemData} renderItem={renderFoodItems} horizontal={true} showsHorizontalScrollIndicator={false} />
                        </View>
                        <View>
                            <Typography style={styles.foodItemPopluar}>Popular Food Item</Typography>
                            <FlatList keyExtractor={(item, index) => index.toString()} bounces={false} data={foodItemData} renderItem={renderFoodItems} horizontal={true} showsHorizontalScrollIndicator={false} />
                        </View>
                        <View>
                            <Typography style={styles.foodItemPopluar}>Popular Grocery</Typography>
                            <FlatList keyExtractor={(item, index) => index.toString()} bounces={false} data={groceryItemData} renderItem={renderFoodItems} horizontal={true} showsHorizontalScrollIndicator={false} />
                        </View>

                    </View>
                    <View>
                        <View style={{marginHorizontal:23}}>
                            <Typography style={styles.foodItemPopluar} >Testimonial</Typography>
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
};
HomeScreen.navigate = () => {
    RootNavigator.navigate(HomeScreen.SCREEN_NAME);
};
export default HomeScreen;