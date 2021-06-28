import SearchComponent from 'components/search/Index';
import { MyStatusBar } from 'components/statusbar/Index';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import BaseScreen from 'features/basescreen/Index';
import ProductDetailScreen from 'features/productdetail/Index';
import StorageService from 'libs/storage/Storage';
import RootNavigator from 'navigation/rootnavigation';
import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';

interface SearchScreenProps {
    route: any
}

const SearchScreen = (props: SearchScreenProps) => {
    const [searchString, setSearchString] = React.useState<string>("");
    const [text, setText] = React.useState<string>("");
    let productList: any[] = [];
    React.useEffect(() => {
        if (props?.route?.params?.params) {
            const {
                route: { params: { params: { searchText } } },
            } = props;
            setSearchString(searchText);
        }
    }, [props?.route]);
    React.useEffect(() => {
        if(searchString){
            setText(searchString);
        }else{
            setText("");
            productList = [];
        }
    }, [searchString])
    productList = useSelector((state: RootStore) => state.ProductInState.data?.data?.data);
    function renderProduct(item: any, index: number) {
        return (
            <View key={index} style={styles.searchDropdown}>
                <View style={styles.searchDropdownBox}>
                    <View style={styles.searchDropdownWrap}>
                        <Typography onPress={() =>{ 
                            ProductDetailScreen.navigate(item.product_id);
                            StorageService.setItem("search", true)
                            }} style={styles.productName}>{item.name}</Typography>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <BaseScreen navigatorBarOptions={{ backIcon: true, cartIcon: true }}>
            <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <ScrollView bounces={false}>
                    <View style={styles.searchSection}>
                        <SearchComponent text={searchString} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <FlatList data={productList}
                            renderItem={({ item, index }) => renderProduct(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </BaseScreen>
    );
};

SearchScreen.SCREEN_NAME = "SearchScreen";
SearchScreen.navigationOptions = {
    headerShown: false,
};
SearchScreen.navigate = (searchText?: string) => {
    RootNavigator.navigation("SearchScreen", SearchScreen.SCREEN_NAME, { searchText });
};
export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    searchSection: {
        marginHorizontal: 21,
        paddingTop: 10
    },
    searchDropdown: {
        marginHorizontal: 21,
    },
    searchDropdownBox: {
        backgroundColor: '#fff',
        borderBottomWidth: 0.3,
        borderBottomColor: "#a7a7a7",
        marginBottom: 5
    },
    searchDropdownWrap: {
        paddingVertical: 10,
        paddingLeft: 10,
    },
    productName: {
        fontFamily: FontFamilyFoods.POPPINS,
        fontSize: 16,
        lineHeight: 25
    }
});


