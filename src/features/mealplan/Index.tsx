import BannerComponent from 'components/banner/Index';
import RenderButtonWithIcon from 'components/buttons/ButtonWithIcon';
import Typography from 'components/typography/Typography';
import RootNavigator from 'navigation/rootnavigation';
import React, { useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';
import MealPlanControllerInstance from './controllers/meal-plan.controller';
import styles from './styles';

interface MealPlanProps { 
  route:any;
  params:any
}
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
const renderMealButton = (item: any,index: number)=>{
  return(
    <View key={index} style={styles.mealPlanButtons}>
    <RenderButtonWithIcon buttonStyle={styles.buttonstyles} label={`${item.day}-Days Plan (${item.meal_count} Meals)`} onPress={() => { }} />
  </View>
  )
}
const renderEmptyCom = ()=>{
  return(
    <Typography style={[styles.mealPlanText,{textAlign:"center",color:"#D80000"}]}>No Data Available</Typography>
  )
}
const MealPlan = (props: MealPlanProps) => {
  const {
    route: { params,  },
} = props;

  const BANNERIMAGEURL = require('../../../assets/images/banner2.png');
  useEffect(()=>{
    MealPlanControllerInstance.getMealPlan(params.id);
  },[]);
  const mealPlanData = useSelector((state:RootStore)=>state.MealPlanInState.data?.data);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false}>
        <View style={{ marginHorizontal: 21 }}>
          <BannerComponent BANNERIMAGEURL={BANNERIMAGEURL} />
          <View style={styles.mealPlanSection}>
            <Typography style={styles.mealPlanText}>Meal Plan</Typography>
            <View>
            <FlatList scrollEnabled={false} ListEmptyComponent={()=>renderEmptyCom()} keyExtractor={(item, index) => index.toString()}  data={mealPlanData} renderItem={({item,index})=>renderMealButton(item,index)} />
            </View>
          </View>
          <View style={{marginTop:21,paddingBottom:30}}>
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
MealPlan.navigate = (id:string) => {
  RootNavigator.navigate(MealPlan.SCREEN_NAME,{id:id});
};
export default MealPlan;
