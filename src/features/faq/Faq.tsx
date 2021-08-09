import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import BaseScreen from 'features/basescreen/Index';
import RootNavigator from 'navigation/rootnavigation';
import { Image } from 'react-native';
import { useEffect } from 'react';
import FaqControllerInstance from './httpCallFaq/controllers/faq.controller';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';

interface FaqScreenProps { }

const style = StyleSheet.create({
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: 'white',
    }
});

interface ElementProfile {
    question?: string;
    answer: string;
    id?: any
}

const FaqScreen = ({ }: FaqScreenProps) => {
    const [shownAnswer, setShownAnswer] = useState<any>({});
    useEffect(() => {
        FaqControllerInstance.getFaq();
    }, []);
    const faqData = useSelector((state: RootStore) => state.FaqInState.data);
    const renderItemProfile = ({ question, answer, id }: ElementProfile, index: any) => {
        const arrowRight = require("../../../assets/images/arrowright.png");
        const handleAccordian = (id: string | number) => {
            if (id !== shownAnswer[id]) {
                setShownAnswer((shownAnswer: { [x: string]: any; }) => ({
                    ...shownAnswer,
                    [id]: !shownAnswer[id]
                }));
            }
        }
        return (
            <View key={index} style={{ marginBottom: 20, borderBottomWidth: 2, borderBottomColor: '#ddd', paddingBottom: 20 }}>
                <View
                    style={{
                        alignItems: 'center',
                        flex: 1,
                        marginLeft: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View style={{ flexDirection: 'column', width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: "center", width: '100%' }}>
                            <View style={{ flex: 1 }}>
                                <Typography style={{ color: 'black', fontSize: 16, fontFamily: FontFamilyFoods.POPPINS }}> Q : {question}</Typography>
                            </View>
                            <View style={{ flex: 1, alignItems: "flex-end", marginRight: 20, maxWidth: 100 }}>
                                <TouchableOpacity onPress={_ => handleAccordian(id)}>
                                    <Image source={arrowRight} style={{ height: 18, width: 10, transform: [{ rotate: shownAnswer[id] ? '-90deg' : "90deg" }] }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            shownAnswer[id] ? (
                                <Typography style={{ color: 'black', fontSize: 14, marginTop: 10, lineHeight: 22, fontFamily: FontFamilyFoods.POPPINS, paddingRight: 20, paddingLeft: 6 }}>A : {answer}</Typography>
                            ) : (
                                null
                            )
                        }
                    </View>
                </View>
            </View>
        );

    };

    return (
        <BaseScreen navigatorBarOptions={{ backIcon: true, }}>
            <View style={{ flex: 1, width: '100%', flexDirection: 'column' }}>
                <ScrollView bounces={false}>
                    <View
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 18,
                        }}
                    >
                        <View style={{ flexDirection: 'column', borderBottomWidth: 10, borderBottomColor: '#d80000', width: "100%" }}>
                            <Typography style={{ color: 'black', fontSize: 20, marginTop: 6, textAlign: "center", fontFamily: FontFamilyFoods.POPPINSBOLD, }}>
                                {'FAQ'}
                            </Typography>
                        </View>
                    </View>
                    <View style={style.separator} />
                    {  //@ts-ignore
                        faqData && faqData?.map<ElementProfile>((item, index) => {
                            return renderItemProfile(item, index);
                        })}
                </ScrollView>
            </View>
        </BaseScreen>
    );
};

FaqScreen.SCREEN_NAME = 'FaqScreen';
FaqScreen.navigationOptions = {
    headerShown: false,
};
FaqScreen.navigate = () => {
    RootNavigator.navigate(FaqScreen.SCREEN_NAME);
};

export default FaqScreen;
