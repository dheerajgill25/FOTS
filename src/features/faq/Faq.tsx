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

const elementsProfileArray: ElementProfile[] = [
    {
        id: 0,
        question: 'What is Lorem Ipsum?',
        answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)"

    },
    {
        id: 1,
        question: 'What is Lorem Ipsum?',
        answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)"

    },
    {
        id: 2,
        question: 'What is Lorem Ipsum?',
        answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)"

    },
    {
        id: 3,
        question: 'What is Lorem Ipsum?',
        answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)"

    },
    {
        id: 4,
        question: 'What is Lorem Ipsum?',
        answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)"

    },

];

const renderItemProfile = ({ question, answer, id }: ElementProfile, index: any) => {
    const arrowRight = require("../../../assets/images/arrowright.png");
    const [shownAnswer, setShownAnswer] = useState<any>({});
    const handleAccordian = (id: string | number) => {
        setShownAnswer((shownAnswer: { [x: string]: any; }) => ({
            ...shownAnswer,
            [id]: !shownAnswer[id]
        }));
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
                            <Typography style={{ color: 'black', fontSize: 14, fontFamily: FontFamilyFoods.POPPINS }}> Q : {question}</Typography>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end", marginRight: 20, maxWidth: 100 }}>
                            <TouchableOpacity onPress={() => handleAccordian(id)}>
                                <Image source={arrowRight} style={{ height: 18, width: 10, transform: [{ rotate: shownAnswer[id] ? '90deg' :"0deg"}] }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        shownAnswer[id] ? (
                            <Typography style={{ color: 'black', fontSize: 11, marginTop: 10, lineHeight: 18, fontFamily: FontFamilyFoods.POPPINS }}> A : {answer}</Typography>
                        ) : (
                            null
                        )
                    }
                </View>
            </View>
        </View>
    );

};

const FaqScreen = ({ }: FaqScreenProps) => {
    useEffect(()=>{
        FaqControllerInstance.getFaq();
    },[]);
    const faqData = useSelector((state:RootStore)=>state.FaqInState.data);
    return (
        <BaseScreen navigatorBarOptions={{ backIcon: true, }}>
            <View style={{ flex: 1, width: '100%', flexDirection: 'column' }}>
                <ScrollView>
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
                        faqData.map<ElementProfile>((item, index) => {
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
