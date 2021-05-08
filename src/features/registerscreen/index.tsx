import Typography, { FontFamilyFoods } from '@components/typography/Typography';
import RootNavigator from '@navigation/rootnavigation';
import DropdownComponent from '@components/dropdown/Index';
import { MyStatusBar } from '@components/statusbar/Index';
import React from 'react';
import { View, SafeAreaView, TextInput, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { isAndroid } from 'themes/functions';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonFood from 'components/buttons/ButtonFoods';
import HomeScreen from 'features/home/Index';
import BackIcon from 'components/backicon/Index';
import BottomTabNavigation from 'navigation/tabbar';
import HomeStack from 'navigation/homestack';
import ModalComponent from 'components/popup/Index';
interface RegisterProps { }
const state = [
    {
        "name": "Rajasthan"
    },
    {
        "name": "Madhyapradesh"
    },
    {
        "name": "Uttarpradesh"
    },
    {
        "name": "Delhi"
    },
];
const onChangeListener = () => {

}
const keyboardVerticalOffset = isAndroid ? 0 : 40

const registerForm = () => {
    return (
            <View style={styles.formGroupBox}>
                <View style={styles.formGroup}>
                    <TextInput style={styles.formControl} placeholder={'Name'} placeholderTextColor={"#A7A7A7"} />
                </View>
                <View style={styles.formGroup}>
                    <TextInput style={styles.formControl} placeholder={'Email'} placeholderTextColor={"#A7A7A7"} keyboardType="email-address" autoCompleteType="email" />
                </View>
                <View style={styles.formGroup}>
                    <TextInput style={styles.formControl} placeholder={'Password'} placeholderTextColor={"#A7A7A7"} secureTextEntry={true} />
                </View>
                <View style={styles.formGroup}>
                    <TextInput style={styles.formControl} placeholder={'Mobile No.'} placeholderTextColor={"#A7A7A7"} keyboardType="number-pad" />
                </View>
                <View>
                    <DropdownComponent title="State" data={state} onPress={async () => onChangeListener()} />
                </View>
                <View >
                    <DropdownComponent title="Fire Department" data={state} onPress={async () => onChangeListener()} />
                </View>
                <View >
                    <DropdownComponent title="Fire Station / Engine" data={state} onPress={async () => onChangeListener()} />
                </View>
            </View>
    )
}
const Register = ({ }: RegisterProps) => {
    return (
        <>
            <MyStatusBar backgroundColor="#D80000" barStyle="light-content" />
            <SafeAreaView style={styles.rootContainer}>
                <ScrollView bounces={false} showsVerticalScrollIndicator={false} nestedScrollEnabled={false}>
                    <LinearGradient colors={['#D80000', '#D80000']}>
                        <View style={styles.banner}>
                            <View style={styles.bannerWrap}>
                                <BackIcon />
                            </View>
                            <View style={styles.bannerBox}>
                                <Typography style={styles.heading}>Sign Up</Typography>
                            </View>

                        </View>
                    </LinearGradient>
                    {registerForm()}
                    <View style={styles.buttonSetion}>
                       <ButtonFood onPress={()=>HomeStack.navigate()} label={'Sign Up'} textColor={'white'} textStyle={styles.buttonStyle} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}
Register.SCREEN_NAME = 'RegisterScreen';
Register.navigationOptions = {
    headerShown: false,
};
Register.navigate = () => {
    RootNavigator.navigate(Register.SCREEN_NAME);
};
export default Register;