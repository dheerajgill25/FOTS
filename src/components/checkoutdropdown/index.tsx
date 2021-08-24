import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import Toaster from 'features/commonApiCall/toaster';
import React, { memo, useState } from 'react';
import { useEffect } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface DropdownProps {
    title: string;
    onPress: (data: any) => void;
    data: DropdownData[];
    imageLeftUrl?: any
}
export interface DropdownData { name?: string; id?: any }
let isShown: boolean = false;
const DropdownComponentCheckOut = ({ data, title, onPress, imageLeftUrl }: DropdownProps) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownValue, setDropdownValue] = useState(title);
    const [selectedValue, setSelectedValue] = useState<boolean>(false);
    const handleValue = (data: any) => {
        if(data){
            setDropdownValue(data?.name);
            setShowDropdown(false);
            setSelectedValue(true)
        }else{
            Toaster.show("No data found")
        }
       
    }
    return (
        <>
            <View style={styles.dropdownBox}>
                <View>
                    <TouchableOpacity activeOpacity={1} style={[styles.dropdownFlex, { marginBottom: showDropdown ? 0 : 22 }]} onPress={() => { setShowDropdown(showDropdown ? false : true); isShown = showDropdown ? false : true }}>
                        <View style={[styles.deliveryContentContent, { maxWidth: 50 }]}>
                            <Image source={imageLeftUrl} style={{
                                width: 16,
                                height: 22
                            }} />
                        </View>
                        <View style={styles.deliveryContentContent}>
                        <Typography style={[styles.title, { color: selectedValue ? 'black' : 'black' }]}>{dropdownValue?dropdownValue:'No data found'}</Typography>
                        </View>
                        <View style={[styles.deliveryContentContent, { maxWidth: 50, }]}>
                            <Image source={require('../../../assets/images/dropdown.png')} style={{ height: 10, width: 15,alignSelf:"flex-end" }} />
                        </View>
                    </TouchableOpacity>
                    {
                        showDropdown ? (
                            data && data.length > 0 && (
                                data && data.map((item: any, index: any) => (
                                    <View key={index} style={styles.dropdownWrap}>
                                        <TouchableOpacity onPress={() => { onPress(item); handleValue(item) }} activeOpacity={0.6} style={styles.dropdownInner}>
                                            <Typography style={styles.values}>{item?item.name:'No Data found'}</Typography>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            )
                        ) : (
                            <View />
                        )
                    }
                </View>


            </View>
        </>
    )
}

const styles = StyleSheet.create({
    dropdownBox: {
        marginHorizontal:23,
        marginTop:20
    },
    dropdownWrap: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingVertical: 10,
        paddingLeft: 10,
        overflow: "hidden",
        borderBottomWidth: 0.2,
        borderBottomColor: "#a7a7a7",
    },
    dropdownInner: {},
    dropdownFlex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        paddingVertical: 20,
        paddingHorizontal: 36,
        borderRadius: 5
    },
    title: {
        color: '#A7A7A7',
        fontFamily: FontFamilyFoods.POPPINS,
        textAlign:"center",
    },
    values: {
        color: '#000',
        fontFamily: FontFamilyFoods.POPPINS,
        paddingLeft:15
    },
    deliveryContentContent:{
        flex:1
    },
});
export default memo(DropdownComponentCheckOut);