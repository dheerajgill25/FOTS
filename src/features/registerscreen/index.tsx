import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, TextInput } from 'react-native';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonFood from 'components/buttons/ButtonFoods';
import FireStationControllerInstance from './controllers/fireStation.controller';
import FireDepartmentControllerInstance from './controllers/fireDepartment.controller';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';
import RegisterControllerInstance from './controllers/register-controller';
import Snackbar from 'react-native-snackbar';
import Typography, { FontFamilyFoods } from '@components/typography/Typography';
import RootNavigator from '@navigation/rootnavigation';
import DropdownComponent from '@components/dropdown/Index';
import { MyStatusBar } from '@components/statusbar/Index';
import { isAndroid } from 'themes/functions';
import Toaster from 'features/commonApiCall/toaster';
interface RegisterProps { }
const registerForm = () => {
    const [fireDepartmentId, setFireDepartmentId] = useState<string>("");
    const [fireStationId, setFireStationId] = useState<string>("");
    const [first_name, setFirst_name] = useState<string>("");
    const [last_name, setLast_name] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("")
    const [passError, setPassError] = useState<string>("")
    useEffect(() => {
        FireDepartmentControllerInstance.getFireDepartment()
    }, [])
  
    const onChangeFireStationListener = (data: any) => {
        setFireStationId(data.id);
    }
    const onChangeFireDeparmentListener = (data: any) => {
        setFireDepartmentId(data.id);
        FireStationControllerInstance.getFireStation(data.id)
    }
    const fireDepartmentData = useSelector((state: RootStore) => state.FireDepartmentInState.data?.data);
    const fireStationData = useSelector((state: RootStore) => state.FireStationInState.data?.data);
    const handleRegisterButton = () => {
        if (first_name !== '' && last_name !== '' && email !== '' && password !== '' && mobile !== '' && fireDepartmentId !== "" && fireStationId !== '') { 
            RegisterControllerInstance.reigsterUser(first_name?.trim(), last_name?.trim(), email?.trim(), password, mobile, fireDepartmentId, fireStationId)
        } else {
           Toaster.show("Please fill all required Fields")
        }
    }
    return (
        <>
            <View style={styles.formGroupBox}>
                <View style={styles.formGroup}>
                    <TextInput style={styles.formControl} value={first_name} onChangeText={(text) => setFirst_name(text)} placeholder={'First name'} placeholderTextColor={"#A7A7A7"} />
                </View>
                <View style={styles.formGroup}>
                    <TextInput style={styles.formControl} value={last_name} onChangeText={(text) => setLast_name(text)} placeholder={'Last name'} placeholderTextColor={"#A7A7A7"} />
                </View>
                <View style={styles.formGroup}>
                    <TextInput value={email} style={styles.formControl} onChangeText={(text) => {
                        setEmail(text)
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(text)) {
                            setError("Please enter valid email")
                        } else {
                            setError("")
                        }
                    }}
                        placeholder={'Email'} placeholderTextColor={"#A7A7A7"} keyboardType="email-address" autoCompleteType="email" />
                </View>
                {
                    error ? (
                        <Typography style={styles.errors}>{error}</Typography>
                    ) : (
                        <View />
                    )
                }
                <View style={styles.formGroup}>
                    <TextInput style={styles.formControl} value={password} onChangeText={(text) => {
                        setPassword(text);
                        if (text?.length >= 6) {
                            setPassError("")
                        } else {
                            setPassError("Password must be at least 6 characters")
                        }
                    }} placeholder={'Password'} placeholderTextColor={"#A7A7A7"} secureTextEntry={true} />
                </View>
                {
                    passError ? (
                        <Typography style={styles.errors}>{passError}</Typography>
                    ) : (
                        <View />
                    )
                }
                <View style={styles.formGroup}>
                    <TextInput style={styles.formControl} value={mobile} onChangeText={(text) => setMobile(text)} placeholder={'Mobile No.'} placeholderTextColor={"#A7A7A7"} keyboardType="number-pad" />
                </View>
                <View style={{marginBottom: isAndroid?0:20}}>
                    <DropdownComponent title="Fire Department" dropdownData={fireDepartmentData} onPress={(data) => onChangeFireDeparmentListener(data)} />
                </View>
                <View >
                    <DropdownComponent title="Fire Station / Engine" dropdownData={fireStationData} onPress={(data) => onChangeFireStationListener(data)} />
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