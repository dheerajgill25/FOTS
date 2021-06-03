import ButtonFood from 'components/buttons/ButtonFoods';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import CrashReporterInstance from 'libs/crash-reporter/CrashReporter';
import StorageService from 'libs/storage/Storage';
import RootNavigator from 'navigation/rootnavigation';
import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';

interface EditProfileProps { }

const EditProfile = (props: EditProfileProps) => {
    const [userData, setUserData] = React.useState<any>({});

    React.useEffect(() => {
        let cancelled = false;
        StorageService.getItem('user').then((values: any) => {
            if (!cancelled) {
                const currentUser = JSON.parse(values);
                setUserData(currentUser);
            }
        }).catch((error) => { CrashReporterInstance.recordError(error); console.log("asyncstorage error", error) });
        return () => { cancelled = true; }
    }, [userData])
    return (
        <KeyboardAvoidingView>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.rootContainer}>
                        <View style={styles.profileSection}>
                            <View style={styles.profileImage}>
                                <Image source={require("../../../assets/images/userdummy.png")} style={styles.profileImg} />
                            </View>
                            <View style={styles.formGroup}>
                                <TextInput
                                    placeholder="First name"
                                    style={styles.formControl}
                                    placeholderTextColor="#484848"
                                    value={userData?.first_name}
                                />
                            </View>
                            <View style={styles.formGroup}>
                                <TextInput
                                    placeholder="Last Name"
                                    style={styles.formControl}
                                    placeholderTextColor="#484848"
                                    value={userData?.last_name}
                                />
                            </View>
                            <View style={styles.formGroup}>
                                <TextInput
                                    placeholder="Email"
                                    style={styles.formControl}
                                    placeholderTextColor="#484848"
                                    value={userData?.email}
                                />
                            </View>
                            <View style={styles.formGroup}>
                                <TextInput
                                    placeholder="Mobile"
                                    style={styles.formControl}
                                    placeholderTextColor="#484848"
                                    value={userData?.mobile}
                                />
                            </View>
                            <View style={styles.formGroup}>
                                <TextInput
                                    placeholder="Password"
                                    style={[styles.formControl,styles.passwordWrap]}
                                    placeholderTextColor="#484848"
                                    secureTextEntry
                                />
                                <Typography style={styles.passwordLink}>Change Password</Typography>
                            </View>
                            <View style={styles.button}>
                                <ButtonFood label="Update" onPress={() => { }} />
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
EditProfile.SCREEN_NAME = "EditProfile";
EditProfile.navigationOptions = {
    headerShown: false,
};
EditProfile.navigate = (id?: string,) => {
    RootNavigator.navigate(EditProfile.SCREEN_NAME, { id: id });
};
export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    rootContainer: {
        paddingTop: 15
    },
    profileSection: {},
    profileImage: {
        borderBottomWidth: 15,
        paddingBottom: 20,
        borderBottomColor:"#d80000"
    },
    profileImg: {
        height: 100,
        width: 100,
        alignSelf: "center"
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
        color:"black",
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
        textDecorationLine:"underline"
    },
    passwordWrap:{
        paddingRight:150
    }
});
