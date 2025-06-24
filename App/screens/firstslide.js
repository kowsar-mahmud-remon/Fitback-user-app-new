import React, { useEffect, useState, useContext } from 'react';
import { Dimensions, StyleSheet, Text, View, ImageBackground, SafeAreaView, Platform, StatusBar, Image, Button, TextInput, Pressable, ScrollView } from 'react-native';

import { useFonts } from 'expo-font';
import colors from '../config/colors';
// import Slider1 from "./slider1.svg"
import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


import { WellcomeContext } from '../../components/CredintailsContext';
import { UserContext } from '../../components/CredintailsContext';

import AsyncStorage from '@react-native-async-storage/async-storage';


function Firstslider({ navigation, route, props }) {

    //context
    const { storeWellcome, setStoreWellcome } = useContext(WellcomeContext);
    const { testCredentials, setTestCredentials } = useContext(UserContext);
    const { noficationtoken, setNoficationtoken } = useContext(UserContext);

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
                console.log(error);
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
                console.log(error);
                handleMessage('persisting login failed');
            });
    };


    const [lan, setLan] = useState(true); // false = bangla , true = eng
    let login = "  house-owner";
    const changelan = (value) => {
        setLan(value);
    };
    // useEffect(()=>{
    //     console.log("Hello i am here for :",noficationtoken)
    // }, []);

    const skip = () => {
        persistUser({ userid: 0, notify: false, lan: true, raddress: "", cartbuy: [], productsave: [], cartrent: [], flatsave: [] });
    };


    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>


            <View style={[styles.MainContainer]}>
                <StatusBar
                    animated={true}
                    backgroundColor="#00335A"
                // barStyle={statusBarStyle}

                />
                <View style={styles.navbar}>

                    <Text style={{ left: 55, top: 17, color: colors.black, fontSize: 16, display: lan ? 'none' : 'flex' }} >  বিস্তারিত</Text>
                    <Text style={{ left: 55, top: 17, color: colors.black, fontSize: 16, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_500Medium' }} onPress={() => console.log("hello")}>  MY ORDERS</Text>


                </View>



                <View style={{ alignItems: 'center', width: '100%', height: screenHight, justifyContent: 'flex-start', top: 40 }}>

                    {/* <ScrollView> */}

                    <View style={{ alignItems: 'center', width: '100%', height: (screenHight / 2) + 50, justifyContent: 'flex-start' }}>

                        <View style={{ width: '100%', top: 10, backgroundColor: colors.white, justifyContent: 'flex-end', alignItems: 'flex-end', right: 30 }} >
                            <Text style={{ color: '#4A90E2', fontSize: 14, display: lan ? 'none' : 'flex' }}>বাসা অনসন্ধান করুন</Text>
                            {/* <Text style={{color:'#4A90E2',fontSize:14,display : lan ? 'flex' : 'none',letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}  onPress={()=> console.log("hello")}>Skip</Text> */}
                        </View>


                        <Image
                            style={{ width: "85%", height: "100%", left: 0, top: 2 }}
                            resizeMode='contain'
                            source={require('../assets/fitback/WelcomeScreen01.png')}
                        />



                        <View style={{ top: 0, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <View style={{ marginTop: 60, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <Text style={{ fontSize: 25, color: '#4A90E2', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>Order Medicine Online</Text>

                            </View> */}
                            <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center', height: 42 }}>
                                <Text style={{ fontWeight: '400', fontSize: 14, color: '#585858', letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>Discover personalized meal plans</Text>
                                <Text style={{ fontWeight: '400', fontSize: 14, color: '#585858', top: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>and nutrition tips to support your</Text>
                                <Text style={{ fontWeight: '400', fontSize: 14, color: '#585858', top: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>health journey.</Text>
                            </View>



                        </View>


                    </View>






                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: (screenHight / 2) - 50, borderWidth: 0 }}>

                        <View style={{ flexDirection: 'row', width: '100%', height: 100, justifyContent: 'space-between', alignItems: 'center', top: 30 }}>

                            <View style={{ width: "50%", left: 50, top: 10 }}>

                                <Svg style={{ left: 0 }} width="40" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <Circle cx="4" cy="4" r="4" fill="#FF6A8F" />
                                    <Circle cx="20" cy="4" r="4" fill="#E5E8E8" />
                                    <Circle cx="36" cy="4" r="4" fill="#E5E8E8" />

                                </Svg>

                            </View>
                            <View style={{ width: "50%", justifyContent: 'center', alignItems: 'flex-end', right: 50 }}>

                                <Pressable
                                    // style={{ width: "50%", height: 40, borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.blue }}

                                    onPress={() => navigation.navigate("Secondslide")}>
                                    {/* <Text style={{ color: colors.white }}>Next
                                    </Text> */}
                                    <FontAwesome6 name="circle-arrow-right" size={40} color="#FF6A8F" />
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
    }, navbar: {

        // backgroundColor: colors.white,
        // width:'100%',
        // height:45,

        backgroundColor: colors.white,
        width: '100%',
        height: 0,

        shadowColor: '#000',
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 6,

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

export default Firstslider;



