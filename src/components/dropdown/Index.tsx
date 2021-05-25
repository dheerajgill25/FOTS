import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface DropdownProps {
    title: string;
    onPress: (data:any) => void;
    data: DropdownData[];
}
export interface DropdownData { name?: string; id?: any }
let isShown: boolean = false;
const DropdownComponent = ({ data, title ,onPress}: DropdownProps) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownValue, setDropdownValue] = useState(title);
    const handleValue = (data:any)=>{
        setDropdownValue(data.name);
        setShowDropdown(false)
    }
    return (
        <>
            <View style={styles.dropdownBox}>
                <View>
                    <TouchableOpacity activeOpacity={1} style={[styles.dropdownFlex, { marginBottom: showDropdown ? 0 : 22 }]} onPress={() => { setShowDropdown(showDropdown ? false : true); isShown = showDropdown ? false : true }}>
                        <Typography style={styles.title}>{dropdownValue}</Typography>
                        <Image source={require('../../../assets/images/dropdown.png')} style={{ height: 10, width: 15 }} />
                    </TouchableOpacity>
                    {
                        showDropdown ? (
                            data && data.length > 0 && (
                                data.map((item: any, index: any) => (
                                    <View key={index} style={styles.dropdownWrap}>
                                        <TouchableOpacity onPress={() =>  {onPress(item);handleValue(item)}} activeOpacity={0.6} style={styles.dropdownInner}>
                                            <Typography style={styles.values}>{item.name}</Typography>
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
    dropdownBox: {},
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
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#CACACA',
    },
    title: {
        color: '#A7A7A7',
        fontFamily: FontFamilyFoods.POPPINS
    },
    values: {
        color: '#000',
        fontFamily: FontFamilyFoods.POPPINS
    },
});
export default DropdownComponent;