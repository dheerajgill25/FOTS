import ButtonFood from 'components/buttons/ButtonFoods';
import Typography from 'components/typography/Typography';
import Register from 'features/registerscreen';
import StorageService from 'libs/storage/Storage';
import HomeStack from 'navigation/homestack';
import RootNavigator from 'navigation/rootnavigation';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Snackbar from 'react-native-snackbar';
import SignInControllerInstance from './controllers/login.controller';
import styles from './styles';

interface LoginProps { }
const loginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const inputFeilds = React.createRef<TextInput>()
    const handleLoginButton = () => {
        if (email !== '' && password !== '') {
            SignInControllerInstance.loginUser(email, password);
            inputFeilds.current?.clear();
        } else {
            Snackbar.show({
                text: 'Please fill all required Fields',
                textColor: "white",
                duration: 3000
            })
        }
    }
    return (
        <>
            <View style={styles.formGroupBox}>
                <View style={styles.formGroup}>
                    <TextInput style={styles.formControl} ref={inputFeilds} onChangeText={(text) => setEmail(text)} placeholder={'Email'} placeholderTextColor={"#A7A7A7"} keyboardType="email-address" autoCompleteType="email" />
                </View>
                <View style={styles.formGroup}>
                    <TextInput style={styles.formControl} ref={inputFeilds} onChangeText={(text) => setPassword(text)} placeholder={'Password'} placeholderTextColor={"#A7A7A7"} secureTextEntry={true} />
                </View>
                <View>
                    <TouchableOpacity>
                        <Typography style={styles.forgotPass}>Forgot Password?</Typography>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonSetion}>
                    <ButtonFood onPress={() => handleLoginButton()} label={'Sign IN'} textColor={'white'} textStyle={styles.buttonStyle} />
                </View>
                <View style={styles.registerButton}>
                    <Typography style={styles.dontHave}>Don't have an account?</Typography>
                    <TouchableOpacity onPress={()=>Register.navigate()}>
                        <Typography style={styles.register}>Register</Typography>
                    </TouchableOpacity>
                </View>
            </View>

        </>
    )
}
const Login = (props: LoginProps) => {
    useEffect(()=>{
        StorageService.getItem('token').then((token)=>{
          if(token){
              HomeStack.navigate()
          }
      })
    },[])
    return (
        <SafeAreaView style={styles.rootContainer}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} nestedScrollEnabled={false}>
                <View style={styles.banner}>
                    <View style={styles.bannerWrap}>
                    </View>
                    <View style={styles.bannerBox}>
                        <Typography style={styles.heading}>Sign IN</Typography>
                    </View>

                </View>
                {loginForm()}

            </ScrollView>
        </SafeAreaView>
    );
};
Login.SCREEN_NAME = 'Login';
Login.navigationOptions = {
    headerShown: false,
};
Login.navigate = () => {
    RootNavigator.navigate(Login.SCREEN_NAME);
};
export default Login;
