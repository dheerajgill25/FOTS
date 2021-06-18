import Typography, { FontFamilyFoods } from "components/typography/Typography";
import ProductListControllerInstance from "features/products/controllers/product.controller";
import SearchScreen from "features/searchScreen/Index";
import React, { memo } from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView, View, StyleSheet, TextInput, Image } from "react-native";
interface SearchProps {
    action?: () => void
    text: string;
}
const handleTextInput = (searchText: string) => {
    if (searchText && searchText.length >= 3) {
        SearchScreen.navigate(searchText);
        ProductListControllerInstance.getProductList("", "", searchText.trim())
    }
}
const renderButtonWithIcon = (searchText: string) => {
    const IMAGEURLFILTER = require("../../../assets/images/search.png")

    return (
        <TouchableOpacity style={styles.filterButton} onPress={() => handleTextInput(searchText)}>
            <Image source={IMAGEURLFILTER} style={styles.filterIcon} />
        </TouchableOpacity>
    )
}
const SearchComponent = ({ action, text }: SearchProps) => {
    const IMAGEURL = require("../../../assets/images/search.png");
    const [searchText, setSearchText] = useState<string>("");

    return (
        <View style={styles.searchBox}>
            <View style={styles.searchWrap}>
                <TextInput placeholder={'Search'} value={searchText||text} onChangeText={(text) => setSearchText(text)} style={styles.formControl} placeholderTextColor={"#484848"} />
            </View>
            <View style={styles.filterBox}>
                {renderButtonWithIcon(searchText)}
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
        paddingLeft: 10,
        fontFamily: FontFamilyFoods.POPPINS,
        color: 'black',
        paddingRight: 10,
        fontSize: 14, lineHeight: 20
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
        width: 18,
        height: 17,
        marginRight:5
    },
    filterButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 10,
        padding: 8,
        borderRadius: 4,
        maxWidth: 120
    },
})