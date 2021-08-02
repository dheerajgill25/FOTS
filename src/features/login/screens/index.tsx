import ButtonFood from 'components/buttons/ButtonFoods';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import Toaster from 'features/commonApiCall/toaster';
import Register from 'features/registerscreen';
import { validateForgotPassword, validateLogin } from 'libs/functions/validation';
import RootNavigator from 'navigation/rootnavigation';
import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Snackbar from 'react-native-snackbar';
import ForgotPasswordControllerInstance from '../controllers/forgot.controller';
import Login from '../Index';
import styles from '../styles';
interface error {
    [key: string]: any;
}
const ForgotPassForm = () => {
    const inputFeilds = React.createRef<TextInput>();
    const [formValidate, setSubmitting] = useState({
        isSubmitting: false,
        error: undefined,
    });
    const [forgotRequest, setForgotRequest] = useState({
        email: '',
    });
    const [errors, setErrors] = useState<error>({ selected: undefined });
    React.useEffect(() => {
        const validationErrors = validateForgotPassword(forgotRequest);
        let noErrors = Object.keys(validationErrors).length == 0;
        let currentError = validationErrors[errors.selected];
        setSubmitting({ isSubmitting: noErrors, error: currentError });
    }, [errors]);
    const handleTextInput = (id: any, text: any) => {
        setForgotRequest({
            ...forgotRequest,
            [id]: text,
        });
        setErrors({
            ...errors,
            selected: id,
        });
    };
    const handleLoginButton = () => {
        const { email, } = forgotRequest;
        if (email !== '' && formValidate.isSubmitting) {
            ForgotPasswordControllerInstance.forgotUserPassword(email.trim());
        } else {
            Toaster.show(!formValidate.isSubmitting ? "Please validate your Credentials" : 'Please fill all required Fields')
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
                        value={forgotRequest.email}
                    />
                </View>
                {errors?.selected == 'email' && (
                    <Typography style={styles.errors}>
                        {formValidate?.error}
                    </Typography>
                )}
                <View style={styles.buttonSetion}>
                    <ButtonFood onPress={() => handleLoginButton()} label={'Submit'} textColor={'white'} textStyle={styles.buttonStyle} />
                </View>
                <View style={styles.registerButton}>
                    <Typography style={styles.dontHave}>Already have an account?</Typography>
                    <TouchableOpacity onPress={() => Login.navigate()}>
                        <Typography style={styles.register}>Login</Typography>
                    </TouchableOpacity>
                </View>
            </View>

        </>
    )
}
const ForgotPassword = (props: any) => {
    return (
        <SafeAreaView style={styles.rootContainer}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} nestedScrollEnabled={false}>
                <View style={styles.banner}>
                    <View style={styles.bannerWrap}>
                    </View>
                    <View style={styles.bannerBox}>
                        <Typography style={styles.heading}>Forgot Password</Typography>
                    </View>

                </View>
                {ForgotPassForm()}

            </ScrollView>
        </SafeAreaView>
    );
};
ForgotPassword.SCREEN_NAME = 'ForgotPassword';
ForgotPassword.navigationOptions = {
    headerShown: false,
};
ForgotPassword.navigate = () => {
    RootNavigator.navigate(ForgotPassword.SCREEN_NAME);
};
export default ForgotPassword;
