import ButtonFood from 'components/buttons/ButtonFoods';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import Toaster from 'features/commonApiCall/toaster';
import Register from 'features/registerscreen';
import { validateLogin } from 'libs/functions/validation';
import RootNavigator from 'navigation/rootnavigation';
import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Snackbar from 'react-native-snackbar';
import SignInControllerInstance from './controllers/login.controller';
import ForgotPassword from './screens';
import styles from './styles';
interface error {
    [key: string]: any;
}
interface LoginProps { }
const loginForm = () => {
    const inputFeilds = React.createRef<TextInput>();
    const [formValidate, setSubmitting] = useState({
        isSubmitting: false,
        error: undefined,
    });
    const [loginRequest, setLoginRequest] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<error>({ selected: undefined });
    React.useEffect(() => {
        const validationErrors = validateLogin(loginRequest);
        let noErrors = Object.keys(validationErrors).length == 0;
        let currentError = validationErrors[errors.selected];
        setSubmitting({ isSubmitting: noErrors, error: currentError });
    }, [errors]);
    const handleTextInput = (id: any, text: any) => {
        setLoginRequest({
            ...loginRequest,
            [id]: text,
        });
        setErrors({
            ...errors,
            selected: id,
        });
    };
    const handleLoginButton = () => {
        const { email, password } = loginRequest;
        if (email !== '' && password !== '' && formValidate.isSubmitting) {
            SignInControllerInstance.loginUser(email.trim(), password);
        } else {
          Toaster.show(!formValidate.isSubmitting?"Please validate your Credentials":'Please fill all required Fields')
        }
    }
    return (
        <>
            <View style={styles.formGroupBox}>
                <View style={styles.formGroup}>
                    <TextInput
                        style={styles.formControl}
                        ref={inputFeilds}
                        onChangeText={(value) =>
                            handleTextInput('email', value)
                        }
                        placeholder={'Email'}
                        placeholderTextColor={"#A7A7A7"}
                        keyboardType="email-address"
                        autoCompleteType="email"
                        value={loginRequest.email}
                    />
                </View>
                {errors?.selected == 'email' && (
                    <Typography style={styles.errors}>
                        {formValidate?.error}
                    </Typography>
                )}
                <View style={styles.formGroup}>
                    <TextInput
                        style={styles.formControl}
                        ref={inputFeilds}
                        onChangeText={(value) =>
                            handleTextInput('password', value)
                        }
                        placeholder={'Password'}
                        placeholderTextColor={"#A7A7A7"}
                        secureTextEntry={true}
                        value={loginRequest.password}

                    />
                </View>
                {errors?.selected == 'password' && (
                    <Typography style={styles.errors}>
                        {formValidate?.error}
                    </Typography>
                )}
                <View>
                    <TouchableOpacity onPress={()=>ForgotPassword.navigate()}>
                        <Typography style={styles.forgotPass}>Forgot Password?</Typography>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonSetion}>
                    <ButtonFood onPress={() => handleLoginButton()} label={'Sign IN'} textColor={'white'} textStyle={styles.buttonStyle} />
                </View>
                <View style={styles.registerButton}>
                    <Typography style={styles.dontHave}>Don't have an account?</Typography>
                    <TouchableOpacity onPress={() => Register.navigate()}>
                        <Typography style={styles.register}>Register</Typography>
                    </TouchableOpacity>
                </View>
            </View>

        </>
    )
}
const Login = (props: LoginProps) => {
    return (
        <SafeAreaView style={styles.rootContainer}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} nestedScrollEnabled={false}>
                <View style={styles.banner}>
                    <View style={styles.bannerWrap}>
                    </View>
                    <View style={styles.bannerBox}>
                        <Typography style={styles.heading}>Sign In</Typography>
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
