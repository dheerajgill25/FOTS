import ButtonFood from 'components/buttons/ButtonFoods';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import Toaster from 'features/commonApiCall/toaster';
import { validateResetPassword } from 'libs/functions/validation';
import RootNavigator from 'navigation/rootnavigation';
import * as React from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput, View, StyleSheet } from 'react-native';
import Snackbar from 'react-native-snackbar';
import ChangePasswordControllerInstance from './controllers/changepassword.controller';
interface ChangePasswordProps { }
interface error {
    [key: string]: any;
}
interface ResetPasswordRequest {
    current_password?: string
    password?: string;
    confirm_password?: string
}
const ChangePassword = (props: ChangePasswordProps) => {
    const [values, setValues] = React.useState<ResetPasswordRequest>({
        current_password: '',
        password: '',
        confirm_password: '',
    });
    const [errors, setErrors] = React.useState<error>({ selected: undefined });
    const [formValidate, setSubmitting] = React.useState({
        isSubmitting: false,
        error: undefined,
    });
    React.useEffect(() => {
        const validationErrors = validateResetPassword(values);
        let noErrors = false;
        noErrors = validationErrors.oldPassword
            ? validationErrors.oldPassword.length > 0
                ? false
                : false
            : true;
        noErrors = validationErrors.confirm_password
            ? validationErrors.confirm_password.length > 0
                ? false
                : false
            : true;
        let currentError = validationErrors[errors.selected];
        setSubmitting({ isSubmitting: noErrors, error: currentError });
    }, [errors]);
    const handleTextInput = (id: any, text: any) => {
        setValues({
            ...values,
            [id]: text,
        });
        setErrors({
            ...errors,
            selected: id,
        });
    };
    const handleChangePass = () => {
        const { current_password, password, confirm_password } :any = values;
        if (current_password !== "" && password !== "" && confirm_password !== "") {
            ChangePasswordControllerInstance.ChangePassword(current_password, password, confirm_password)
        } else {
            Toaster.show('Please fill all required Fields');
        }
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                <View >
                    <View style={styles.rootContainer}>
                        <View style={styles.profileSection}>
                            <View style={styles.profileSectionBox}>
                            </View>
                            <View style={styles.formGroup}>
                                <TextInput
                                    placeholder="Old password"
                                    style={styles.formControl}
                                    placeholderTextColor="#484848"
                                    secureTextEntry
                                    value={values.current_password}
                                    onChangeText={value => handleTextInput("current_password", value)}
                                />
                            </View>
                            {errors?.selected == 'current_password' && (
                                <Typography style={styles.errors}>
                                    {formValidate?.error}
                                </Typography>
                            )}
                            <View style={styles.formGroup}>
                                <TextInput
                                    placeholder="New password"
                                    style={styles.formControl}
                                    placeholderTextColor="#484848"
                                    secureTextEntry
                                    value={values.password}
                                    onChangeText={value => handleTextInput("password", value)}
                                />
                            </View>
                            {errors?.selected == 'password' && (
                                <Typography style={styles.errors}>
                                    {formValidate?.error}
                                </Typography>
                            )}
                            <View style={styles.formGroup}>
                                <TextInput
                                    placeholder="confirm password"
                                    style={styles.formControl}
                                    placeholderTextColor="#484848"
                                    secureTextEntry
                                    value={values.confirm_password}
                                    onChangeText={value => handleTextInput("confirm_password", value)}
                                />
                            </View>
                            {errors?.selected == 'confirm_password' && (
                                <Typography style={styles.errors}>
                                    {formValidate?.error}
                                </Typography>
                            )}
                            <View style={styles.button}>
                                <ButtonFood label="Update" onPress={() => handleChangePass()} />
                            </View>
                        </View>
                    </View>


                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
ChangePassword.SCREEN_NAME = "ChangePassword";
ChangePassword.navigationOptions = {
    headerShown: false,
};
ChangePassword.navigate = () => {
    RootNavigator.navigate(ChangePassword.SCREEN_NAME);
};
export default ChangePassword;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    rootContainer: {
        paddingTop: 15
    },
    profileSection: {

        position: "relative",
    },
    heading: {
        fontSize: 18,
        fontFamily: FontFamilyFoods.POPPINS,
        textAlign: "center",
        lineHeight: 28
    },
    formGroup: {
        marginHorizontal: 23,
        marginTop: 20
    },
    formControl: {
        borderBottomWidth: 1,
        borderBottomColor: "#A7a7a7",
        paddingBottom: 7,
        fontSize: 14,
        fontFamily: FontFamilyFoods.POPPINS,
        position: "relative",
        color: "black",
    },
    button: {
        marginTop: 30,
        marginHorizontal: 20
    },
    passwordLink: {
        position: "absolute",
        right: 0,
        bottom: 10,
        fontSize: 14,
        fontFamily: FontFamilyFoods.POPPINS,
        textDecorationLine: "underline"
    },
    passwordWrap: {
        paddingRight: 150
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        color: 'white',
        fontFamily: FontFamilyFoods.POPPINSSEMIBOLD,
    },
    plusiconWrap: {
        position: "absolute",
        right: 0,
        bottom: 0,
        alignSelf: "center"
    },
    plusicon: {
        height: 20,
        width: 20,
        alignSelf: "center"
    },
    profileSectionBox: {
        borderBottomWidth: 15,
        paddingBottom: 20,
        borderBottomColor: "#d80000",
    },
    errors: {
        textAlign: "right",
        fontSize: 12,
        fontFamily: FontFamilyFoods.POPPINS,
        color: "#D80000",
        maxWidth: 250,
        alignSelf: "flex-end",
        paddingRight: 20
    }
});
