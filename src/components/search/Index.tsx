import Typography, { FontFamilyFoods } from "components/typography/Typography";
import React from "react";
import { SafeAreaView, View, StyleSheet, TextInput, Image } from "react-native";
interface SearchProps {
    action: () => {}
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
const SearchComponent = ({ }: SearchProps) => {
    const IMAGEURL = require("../../../assets/images/search.png")
    return (
        <SafeAreaView>
            <View style={styles.searchBox}>
                <View style={styles.searchWrap}>
                    <TextInput placeholder={'Search'} style={styles.formControl} />
                    <Image source={IMAGEURL} style={styles.searchIcon} />
                </View>
                <View style={styles.filterBox}>
                    {renderButtonWithIcon()}
                </View>
            </View>
        </SafeAreaView>
    )
}
export default SearchComponent;
const styles = StyleSheet.create({
    searchBox: {
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor:'#C4C4C4',
        borderRadius:7
    },
    searchWrap: {
        position: 'relative',
        flex: 1
    },
    filterBox: {
        flex: 0
    },
    formControl: {
        paddingVertical: 20,
        paddingLeft: 40,
        fontFamily:FontFamilyFoods.POPPINS,
        color:'black',
        paddingRight:10
    },
    searchIcon: {
        position: 'absolute',
        top: 21.5,
        left: 12,
    },
    filterText: {
        fontSize:12,
        lineHeight:20
    },
    filterIcon: {},
    filterButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 20,
        backgroundColor:'#F2F2F2',
        padding: 10,
        borderRadius:4,
        maxWidth:100
    },
})