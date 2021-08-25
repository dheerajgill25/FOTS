import ButtonFood from 'components/buttons/ButtonFoods';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import CrashReporterInstance from 'libs/crash-reporter/CrashReporter';
import StorageService from 'libs/storage/Storage';
import RootNavigator from 'navigation/rootnavigation';
import React, {  useState } from 'react';
import {  View, StyleSheet, Image, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity, } from 'react-native';
import * as ImagePicker from 'react-native-image-picker'
import { Modalize } from 'react-native-modalize'
import { ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker'
import { isAndroid } from 'themes/functions';
import ChangePassword from './changePassword';
import EditProfileControllerInstance from './controllers/editProfile.controller';
import FireDepartmentControllerInstance from 'features/registerscreen/controllers/fireDepartment.controller';
import FireStationControllerInstance from 'features/registerscreen/controllers/fireStation.controller';
import DropdownComponent from 'components/dropdown/Index';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';
import UploadImageControllerInstance from './controllers/uploadimage.controller';
import MyAccount from 'features/myaccount/Index';
interface EditProfileProps { }

const EditProfile = (props: EditProfileProps) => {
    const [userData, setUserData] = React.useState<any>({});
    const modalizeRef = React.useRef<Modalize>(null);
    const [fireDepartmentId, setFireDepartmentId] = useState<string>("");
    const [fireStationId, setFireStationId] = useState<string>("");
    const [fireDepartment, setFireDepartment] = useState<any>("Select Fire Department");
    const [fireStation, setFireStation] = useState<any>("Select Fire Station");
    const [profileImage, setProfileImage] = React.useState<ImagePickerResponse | string | any>('')
    const [first_name, setFirst_name] = useState<string>("");
    const [last_name, setLast_name] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [imageChange,setImageChange] = useState<boolean>(false)
    React.useEffect(() => {
        let cancelled = false;
        StorageService.getItem('user').then((values: any) => {
            if (!cancelled) {
                const currentUser = JSON.parse(values);
                setUserData(currentUser);
                setFireDepartment(currentUser?.fire_department_name||"")
                setFireStation(currentUser?.fire_station_name||"")
                setFirst_name(currentUser?.first_name)
                setLast_name(currentUser?.last_name)
                setMobile(currentUser?.mobile)
            }
        }).catch((error) => { CrashReporterInstance.recordError(error); console.log("asyncstorage error", error) });
        FireDepartmentControllerInstance.getFireDepartment();
        FireStationControllerInstance.getFireStation(userData?.fire_department)
        return () => { cancelled = true; }
    }, [StorageService]);
    const fireDepartmentData = useSelector((state: RootStore) => state.FireDepartmentInState.data?.data);
    const fireStationData = useSelector((state: RootStore) => state.FireStationInState.data?.data);

    const onChangeFireStationListener = (data: any) => {
        setFireStationId(data.id);
    }
    const onChangeFireDeparmentListener = (data: any) => {
        setFireDepartmentId(data.id);
        FireStationControllerInstance.getFireStation(data.id)
    }
    const showModal = (camera: boolean): void => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            maxWidth: 400,
            maxHeight: 600,
            quality: 0.5
        };
        modalizeRef?.current?.close()
        if (camera) {
            ImagePicker.launchCamera(options, (response) => {
                if (response && response.assets.length > 0) {
                    response.assets.map((value: any, i) => {
                        const url = isAndroid ? value.uri : value.uri.replace('file://', '');
                        setProfileImage(url);
                        setImageChange(true);
                        const photo = {
                            name: value.fileName,
                            type: value.type,
                            uri: value.uri
                        }
                        UploadImageControllerInstance.uploadImage(photo)
                    })
                }
            })
        } else {
            ImagePicker.launchImageLibrary(options, (response) => {
                if (response && response.assets.length > 0) {
                    response.assets.map((value: any, i) => {
                        const url = isAndroid ? value.uri : value.uri.replace('file://', '');
                        setProfileImage(url);
                        const photo = {
                            name: value.fileName,
                            type: value.type,
                            uri: value.uri
                        }
                        setImageChange(true);
                        UploadImageControllerInstance.uploadImage(photo)
                    })
                }
            })
        }
    }
    const updateProfile = () => {
        EditProfileControllerInstance.updateProfile(first_name, last_name, mobile, fireDepartmentId || userData.fire_department, fireStationId || userData.fire_station,callBackUpdateProfile)
    }
    const callBackUpdateProfile = (success:boolean) =>{
        if(success){
            MyAccount.navigate();
        }
    }
    return (
        <>
            <KeyboardAvoidingView style={styles.container}>
                <ScrollView>
                    <View >
                        <View style={styles.rootContainer}>
                            <View style={styles.profileSection}>
                                <View style={styles.profileSectionBox}>
                                    <View style={styles.profileImage}>
                                        {
                                            imageChange?(
                                                <Image source={{ uri: profileImage }} style={styles.profileImg} />
                                            ):(
                                                <Image source={userData?.profile_photo_path?{uri:userData?.profile_photo_path}:profileImage == '' ? require("../../../assets/images/userdummy.png") : { uri: profileImage }} style={styles.profileImg} />
                                            )
                                        }
                                        <View style={styles.plusiconWrap}>
                                            <TouchableOpacity onPress={() => {
                                                modalizeRef?.current?.open()
                                            }}>
                                                <Image source={require("../../../assets/images/plus.png")} style={styles.plusicon} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.formGroup}>
                                    <TextInput
                                        placeholder="First name"
                                        style={styles.formControl}
                                        placeholderTextColor="#484848"
                                        value={first_name || ""}
                                        onChangeText={(text) => setFirst_name(text)}
                                    />
                                </View>
                                <View style={styles.formGroup}>
                                    <TextInput
                                        placeholder="Last Name"
                                        style={styles.formControl}
                                        placeholderTextColor="#484848"
                                        value={last_name || ""}
                                        onChangeText={(text) => setLast_name(text)}
                                    />
                                </View>
                                <View style={styles.formGroup}>
                                    <TextInput
                                        placeholder="Email"
                                        style={styles.formControl}
                                        placeholderTextColor="#484848"
                                        defaultValue={userData?.email}
                                        editable={false}
                                    />
                                </View>
                                <View style={styles.formGroup}>
                                    <TextInput
                                        placeholder="Mobile"
                                        style={styles.formControl}
                                        placeholderTextColor="#484848"
                                        value={mobile || ""}
                                        keyboardType="number-pad"
                                        onChangeText={(text) => setMobile(text)}
                                    />
                                </View>
                                <View style={styles.formGroup}>
                                    <TextInput
                                        placeholder="*******"
                                        style={[styles.formControl, styles.passwordWrap]}
                                        placeholderTextColor="#484848"
                                        secureTextEntry
                                        editable={false}
                                    />
                                    <Typography onPress={() => ChangePassword.navigate()} style={styles.passwordLink}>Change Password</Typography>
                                </View>
                                <View style={[styles.formGroup, { marginTop:isAndroid?30:20 }]}>
                                    <DropdownComponent edit title={fireDepartment} dropdownData={fireDepartmentData&&fireDepartmentData.length>0?fireDepartmentData:[]} onPress={(data) => onChangeFireDeparmentListener(data)} />
                                </View>
                                <View style={styles.formGroup}>
                                    <DropdownComponent edit title={fireStation} dropdownData={ fireStationData&&fireStationData.length>0?fireStationData:[]} onPress={(data) => onChangeFireStationListener(data)} />
                                </View>
                                <View style={styles.button}>
                                    <ButtonFood label="Update" onPress={() => updateProfile()} />
                                </View>
                            </View>
                        </View>


                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Modalize
                ref={modalizeRef}
                modalHeight={200}
                disableScrollIfPossible
                modalStyle={{
                    backgroundColor: 'gray',
                }}
            >
                <View>
                    <Typography style={styles.text} >
                        Choose the source of your picture.
                    </Typography>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}>
                        <View style={{ flex: 1 }}>
                            <Typography
                                onPress={() => showModal(true)}
                                style={styles.text}
                            >

                                Camera
                            </Typography>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Typography
                                onPress={() => showModal(false)}
                                style={styles.text}
                            >

                                Gallery
                            </Typography>
                        </View>
                    </View>
                </View>
            </Modalize>
        </>

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
    profileSection: {

        position: "relative",
    },
    profileImage: {
        alignSelf: "center"
    },
    profileImg: {
        height: 100,
        width: 100,
        borderRadius: 50
    },
    formGroup: {
        marginHorizontal: 23,
        marginTop: 20,
        marginBottom: isAndroid?0:8,
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
        marginHorizontal: 20,
        marginBottom: 30
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
    }
});
