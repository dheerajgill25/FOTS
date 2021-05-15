import BannerComponent from 'components/banner/Index';
import RenderButtonWithIcon from 'components/buttons/ButtonWithIcon';
import Typography from 'components/typography/Typography';
import RootNavigator from 'navigation/rootnavigation';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, FlatList } from 'react-native';
import styles from './styles';

interface MealPlanProps { }
const orderData: any[] = [
  {
      imageUrl: require("../../../assets/images/icon4.png"),
      title: 'Choose Your Plan'
  },
  {
      imageUrl: require("../../../assets/images/icon2.png"),
      title: 'Choose Your Meals'
  },
  {
      imageUrl: require("../../../assets/images/icon3.png"),
      title: 'Meals Made & Delivered Fresh'
  },
  {
      imageUrl: require("../../../assets/images/icon1.png"),
      title: 'Eat & Enjoy'
  },
];

const renderHowItsWorks = (item: any,index:number) => {
  return (
    <>
      <View key={item.index} style={styles.howWorkSection}>
        <View style={styles.worksFlex}>
          <View style={styles.howWorkBox}>
            <View style={styles.howWorkwrap}>
            <Image style={[styles.icon,index==0&&styles.itemImg]} source={item.imageUrl} />
            </View>
            <Typography onPress={() => { }} style={styles.title}>{item.title}</Typography>
          </View>
        </View>
      </View>
    </>
  )
};
const MealPlan = (props: MealPlanProps) => {
  const BANNERIMAGEURL = require('../../../assets/images/banner2.png');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false}>
        <View style={{ marginHorizontal: 21 }}>
          <BannerComponent BANNERIMAGEURL={BANNERIMAGEURL} />
          <View style={styles.mealPlanSection}>
            <Typography style={styles.mealPlanText}>Meal Plan</Typography>
            <View style={styles.mealPlanButtons}>
              <RenderButtonWithIcon buttonStyle={styles.buttonstyles} label={"3 Days (9 Meals) = $120 ($13.33 per meal)"} onPress={() => { }} />
            </View>
            <View style={styles.mealPlanButtons}>
              <RenderButtonWithIcon buttonStyle={styles.buttonstyles} label={"5 Days (15 Meals) = $180 (12.00 per meal)"} onPress={() => { }} />
            </View>
            <View style={styles.mealPlanButtons}>
              <RenderButtonWithIcon buttonStyle={styles.buttonstyles} label={"7 Days (21 Meals) = $230 ($10.95 per meal)"} onPress={() => { }} />
            </View>
          </View>
          <View style={[styles.mealPlanSection, { marginTop: 12 ,marginBottom:11}]}>
            <Typography style={styles.mealPlanText}>À la carte</Typography>
            <View style={styles.mealPlanButtons}>
              <RenderButtonWithIcon buttonStyle={[styles.buttonstyles, { textAlign: 'center' }]} fiveMealBtn={true} label={"Select at least 5 meals"} onPress={() => { }} />
            </View>
          </View>
          <View>
            <Typography style={styles.foodItemPopluar}>How It Works</Typography>
            <FlatList scrollEnabled={false} keyExtractor={(item, index) => index.toString()} contentContainerStyle={styles.worksFlex} data={orderData} renderItem={({item,index})=>renderHowItsWorks(item,index)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
MealPlan.SCREEN_NAME = 'MealPlan';
MealPlan.navigationOptions = {
  headerShown: false,
};
MealPlan.navigate = () => {
  RootNavigator.navigate(MealPlan.SCREEN_NAME);
};
export default MealPlan;
