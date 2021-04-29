import Typography from 'components/typography/Typography';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface DropdownProps {
    title: string;
    onPress: () => {};
    data: DropdownData[];
}
export interface DropdownData { name?: string }
let isShown:boolean=false;
const renderItem = (item: DropdownData,index?: DropdownData) => {
    return (
        <View  style={styles.dropdownWrap}>
            <TouchableOpacity activeOpacity={0.6} style={styles.dropdownInner}>
                <Typography style={styles.values}>{item.name}</Typography>
            </TouchableOpacity>
        </View>
    )
}
const DropdownComponent = ({ data, title }: DropdownProps) => {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <>
            <View style={styles.dropdownBox}>
                <View>
                    <TouchableOpacity activeOpacity={1} style={styles.dropdownFlex} onPress={() => {setShowDropdown(showDropdown ? false : true);isShown=showDropdown?false:true}}>
                        <Typography style={styles.title}>{title}</Typography>
                        <Image source={require('../../../assets/images/dropdown.png')} style={{ height: 10, width: 15 }} />
                    </TouchableOpacity>
                    {
                    showDropdown ? <FlatList keyExtractor={(item,index)=>index.toString()} data={data} renderItem={({item})=>renderItem(item)} /> : <View />
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
        paddingVertical:10,
        paddingLeft:10,
        overflow:'hidden',
        
    },
    dropdownInner: {
       
      
    },
    dropdownFlex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:'#CACACA',
        marginTop: isShown?-20:0,
        marginBottom:isShown?10:22
    },
    title: { color: '#A7A7A7' },
    values: { color: '#000' },
});
export default DropdownComponent;