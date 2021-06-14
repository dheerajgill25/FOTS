import Typography, { FontFamilyFoods } from "components/typography/Typography";
import React, { memo } from "react";
import { SafeAreaView, View, StyleSheet, TextInput, Image } from "react-native";
interface SearchProps {
    action: (text: string) => void
    text: string;
}
const renderButtonWithIcon = () => {
    const IMAGEURLFILTER = require("../../../assets/images/filter.png")
    return (
        <View style={styles.filterButton}>
            <Typography style={styles.filterText}>Filter</Typography>
            <Image source={IMAGEURLFILTER} style={styles.filterIcon} />
        </View>
    )
}
const SearchComponent = ({ action,text}: SearchProps) => {
    const IMAGEURL = require("../../../assets/images/search.png")
    return (
        <View style={styles.searchBox}>
            <View style={styles.searchWrap}>
                <Image source={IMAGEURL} style={styles.searchIcon} />
                <TextInput placeholder={'Search'} value={text} onChangeText={(text)=>action(text)} style={styles.formControl} placeholderTextColor={"#484848"} />
            </View>
            <View style={styles.filterBox}>
                {renderButtonWithIcon()}
            </View>
        </View>
    )
}
export default memo(SearchComponent);
const styles = StyleSheet.create({
    searchBox: {
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#C4C4C4',
        borderRadius: 7
    },
    searchWrap: {
        position: 'relative',
        flex: 1
    },
    filterBox: {
        flex: 0
    },
    formControl: {
        paddingVertical: 12,
        paddingLeft: 40,
        fontFamily: FontFamilyFoods.POPPINS,
        color: 'black',
        paddingRight: 10,
        fontSize:14,lineHeight:20
    },
    searchIcon: {
        position: 'absolute',
        top: 20,
        left: 12,
        height: 15,
        width: 15,
    },
    filterText: {
        fontSize: 12,
        lineHeight: 20,
        fontFamily: FontFamilyFoods.POPPINS
    },
    filterIcon: {
        width:20,
        height:18
    },
    filterButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 20,
        backgroundColor: '#F2F2F2',
        padding: 8,
        borderRadius: 4,
        maxWidth: 100
    },
})