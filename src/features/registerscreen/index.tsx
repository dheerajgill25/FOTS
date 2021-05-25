import Typography, { FontFamilyFoods } from '@components/typography/Typography';
import RootNavigator from '@navigation/rootnavigation';
import DropdownComponent from '@components/dropdown/Index';
import { MyStatusBar } from '@components/statusbar/Index';
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, TextInput, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import { isAndroid } from 'themes/functions';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonFood from 'components/buttons/ButtonFoods';
import HomeStack from 'navigation/homestack';
import FireStationControllerInstance from './controllers/fireStation.controller';
import FireDepartmentControllerInstance from './controllers/fireDepartment.controller';
import StateControllerInstance from './controllers/state.controller';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';
import RegisterControllerInstance from './controllers/register-controller';
import Snackbar from 'react-native-snackbar';
interface RegisterProps { }
const registerForm = () => {
    const [fireDepartmentId, setFireDepartmentId] = useState("");
    const [fireStationId, setFireStationId] = useState("");
    const [first_name,setFirst_name] = useState("");
    const [last_name,setLast_name] = useState("");
    const [email,setEmail] = useState("");
    const [mobile,setMobile] = useState("");
    const [password,setPassword] = useState("");
    useEffect(() => {
        StateControllerInstance.getState();
    }, [])
    const onChangeStateListener = (data: any) => {
        FireDepartmentControllerInstance.getFireDepartment(data.id)
    }
    const onChangeFireStationListener = (data: any) => {
        setFireStationId(data.id);
    }
    const onChangeFireDeparmentListener = (data: any) => {
        setFireDepartmentId(data.id);
        FireStationControllerInstance.getFireStation(data.id)
    }
    const stateData = useSelector((state: RootStore) => state.StateInState.data?.data);
    const fireDepartmentData = useSelector((state: RootStore) => state.FireDepartmentInState.data?.data);
    const fireStationData = useSelector((state: RootStore) => state.FireStationInState.data?.data);
    const handleRegisterButton = ()=>{
        if(first_name!==''&&last_name!==''&&email!==''&&password!==''&&mobile!==''&&fireDepartmentId!==""&&fireStationId!==''){
            RegisterControllerInstance.reigsterUser(first_name,last_name,email,password,mobile,fireDepartmentId,fireStationId)
        }else{
            Snackbar.show({
                text:'Please fill all required Fields',
                textColor:"white",
                duration:3000
            })
        }
    }
    return (
        <>
            <View style={styles.formGroupBox}>
                <View style={styles.formGroup}>
                    <TextInput style={styles.formControl} onChangeText={(text)=>setFirst_name(text)} placeholder={'First name'} placeholderTextColor={"#A7A7A7"} />
                </View>
                <View style={styles.formGroup}>
                    <TextInput style={styles.formControl} onChangeText={(text)=>setLast_name(text)} placeholder={'Last name'} placeholderTextColor={"#A7A7A7"} />
                </View>
                <View style={styles.formGroup}>
                    <TextInput style={styles.formControl} onChangeText={(text)=>setEmail(text)} placeholder={'Email'} placeholderTextColor={"#A7A7A7"} keyboardType="email-address" autoCompleteType="email" />
                </View>
                <View style={styles.formGroup}>
                    <TextInput style={styles.formControl} onChangeText={(text)=>setPassword(text)} placeholder={'Password'} placeholderTextColor={"#A7A7A7"} secureTextEntry={true} />
                </View>
                <View style={styles.formGroup}>
                    <TextInput style={styles.formControl} onChangeText={(text)=>setMobile(text)} placeholder={'Mobile No.'} placeholderTextColor={"#A7A7A7"} keyboardType="number-pad" />
                </View>
                <View>
                    <DropdownComponent title="State" data={stateData} onPress={(data) => onChangeStateListener(data)} />
                </View>
                <View >
                    <DropdownComponent title="Fire Department" data={fireDepartmentData} onPress={(data) => onChangeFireDeparmentListener(data)} />
                </View>
                <View >
                    <DropdownComponent title="Fire Station / Engine" data={fireStationData} onPress={(data) => onChangeFireStationListener(data)} />
                </View>
            </View>
            <View style={styles.buttonSetion}>
                <ButtonFood onPress={() => handleRegisterButton()} label={'Sign Up'} textColor={'white'} textStyle={styles.buttonStyle} />
            </View>
        </>
    )
}
const Register = ({ }: RegisterProps) => {
    return (
        <>
            <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
            <SafeAreaView style={styles.rootContainer}>
                <ScrollView bounces={false} showsVerticalScrollIndicator={false} nestedScrollEnabled={false}>
                    <View style={styles.banner}>
                        <View style={styles.bannerWrap}>
                        </View>
                        <View style={styles.bannerBox}>
                            <Typography style={styles.heading}>Sign Up</Typography>
                        </View>

                    </View>
                    {registerForm()}

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