import BannerComponent from 'components/banner/Index';
import RenderButtonWithIcon from 'components/buttons/ButtonWithIcon';
import Typography from 'components/typography/Typography';
import RootNavigator from 'navigation/rootnavigation';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import styles from './styles';

interface MealPlanProps { }
const MealPlan = (props: MealPlanProps) => {
  const BANNERIMAGEURL = require('../../../assets/images/banner1.png');
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
              <RenderButtonWithIcon  buttonStyle={styles.buttonstyles} label={"5 Days (15 Meals) = $180 (12.00 per meal)"} onPress={() => { }} />
            </View>
            <View style={styles.mealPlanButtons}>
              <RenderButtonWithIcon buttonStyle={styles.buttonstyles} label={"7 Days (21 Meals) = $230 ($10.95 per meal)"} onPress={() => { }} />
            </View>
          </View>
          <View style={[styles.mealPlanSection,{marginTop:47}]}>
            <Typography style={styles.mealPlanText}>A La Carte</Typography>
            <View style={styles.mealPlanButtons}>
              <RenderButtonWithIcon buttonStyle={[styles.buttonstyles,{textAlign:'center'}]} fiveMealBtn={true} label={"Select at least 5 meals"} onPress={() => { }} />
            </View>

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
