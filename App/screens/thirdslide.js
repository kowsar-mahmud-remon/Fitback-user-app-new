import React, { useEffect, useState, useContext } from 'react';
import { Dimensions, StyleSheet, Text, View, ImageBackground, SafeAreaView, ScrollView, Platform, StatusBar, Image, Button, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WellcomeContext } from '../../components/CredintailsContext';
import { UserContext } from '../../components/CredintailsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import colors from '../config/colors';

import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";

function Thirdslide({ navigation, route }) {

    //context
    const { storeWellcome, setStoreWellcome } = useContext(WellcomeContext);
    const { testCredentials, setTestCredentials } = useContext(UserContext);

    let screenWidth = Dimensions.get('window').width;
    let screenHight = Dimensions.get('window').height;

    const persistWellcome = (credentials) => {

        AsyncStorage.setItem('qwikmedicwellcome3page', JSON.stringify(credentials))
            .then(() => {
                // handleMessage(message)
                setStoreWellcome(credentials);
                navigation.navigate("Login");
            })
            .catch((error) => {
                // console.log(error)
                handleMessage('persisting login failed');
            });
    };

    const persistUser = (credentials) => {

        AsyncStorage.setItem('checkuserid', JSON.stringify(credentials))
            .then(() => {
                // handleMessage(message)
                setTestCredentials(credentials);
                persistWellcome({ wellcome: true });
            })
            .catch((error) => {
                // console.log(error)
                handleMessage('persisting login failed');
            });
    };


    const [lan, setLan] = useState(true); // false = bangla , true = eng
    let login = "  house-owner";
    const changelan = (value) => {
        setLan(value);
    };
    // useEffect(()=>{

    // }, []);

    const skip = () => {
        persistUser({ userid: 0, notify: false, lan: true, raddress: "", cartbuy: [], productsave: [], cartrent: [], flatsave: [] });

    };



    return (


        <SafeAreaView style={{ width: '100%', height: '100%' }}>


            <View style={[styles.MainContainer]}>

                <StatusBar
                    animated={true}
                    backgroundColor="#5A0600"
                // barStyle={statusBarStyle}

                />

                <View style={{ alignItems: 'center', width: '100%', height: screenHight, justifyContent: 'flex-start', top: 40 }}>
                    {/* <ScrollView> */}
                    <View style={{ alignItems: 'center', width: '100%', height: (screenHight / 2) + 50, justifyContent: 'flex-start' }}>
                        <View style={[styles.tuchabluebutton, { width: '100%', top: 10, backgroundColor: colors.white, justifyContent: 'flex-end', alignItems: 'flex-end', right: 30, display: 'none' }]} onPress={() => skip()}>
                            <Text style={{ color: '#479787', fontSize: 14, display: lan ? 'none' : 'flex' }}>বাসা অনসন্ধান করুন</Text>
                            <Text style={{ color: '#4A90E2', fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>Skip</Text>
                        </View>

                        {/* <SvgUri
                            width="300"
                            height="200"
                            style={{marginTop:80}} 
                            source={require('../../icons_new/walkthrough_1.svg')}
                            uri="http://drive.google.com/uc?export=view&id=1RGuDRunekgYBRWfX85AROYTMEm9S78iL"
     
                    /> */}

                        <Image
                            style={{ width: "78%", height: "100%", left: 0, top: 10 }}
                            resizeMode='contain'
                            source={require('../assets/fitback/WelcomeScreen03.png')}
                        />

                        <View style={{ top: 0, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <View style={{ marginTop: 60, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <Text style={{ fontSize: 25, color: '#CA5362', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>Ambulance Service</Text>

                            </View> */}
                            <View style={{ marginTop: 60, justifyContent: 'center', alignItems: 'center', height: 42 }}>
                                <Text style={{ fontWeight: '400', fontSize: 14, color: '#585858', letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>Access to perfect combination of</Text>
                                <Text style={{ fontWeight: '400', fontSize: 14, color: '#585858', top: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>expert advice and top-quality</Text>
                                <Text style={{ fontWeight: '400', fontSize: 14, color: '#585858', top: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>healthcare products.</Text>
                            </View>



                        </View>

                    </View>

                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: (screenHight / 2) - 50, borderWidth: 0 }}>

                        <View style={{ flexDirection: 'row', width: '100%', height: 100, justifyContent: 'space-between', alignItems: 'center', top: 30 }}>

                            <View style={{ width: "50%", left: 50, top: 10 }}>

                                <Svg width="40" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <Circle cx="4" cy="4" r="4" fill="#E5E8E8" />
                                    <Circle cx="20" cy="4" r="4" fill="#E5E8E8" />
                                    <Circle cx="36" cy="4" r="4" fill="#FF6A8F" />

                                </Svg>

                            </View>
                            <View style={{ width: "50%", justifyContent: 'center', alignItems: 'flex-end', right: 50 }}>

                                <Pressable style={{ width: "60%", height: 40, borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FF6A8F" }} onPress={() => skip()} >
                                    <Text style={{ color: colors.white }}>Continue</Text>
                                </Pressable>

                            </View>
                        </View>
                    </View>
                    {/* </ScrollView> */}
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
    },

    ImgContainer: {

        width: "100%",
        height: 209,
        // top:182

    },

    language: {
        flex: 1,

        backgroundColor: "#3C709E",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 5,
        width: 75,
        height: 30


    },
    tuchabluebutton: {
        width: "35%",
        height: 34,
        borderRadius: 2,
        backgroundColor: colors.black,
        justifyContent: "center",
        alignItems: 'center',
    }

});

export default Thirdslide;
