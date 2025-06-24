import React, { useEffect, useState, useContext } from 'react';
import { Dimensions, StyleSheet, Text, View, ImageBackground, ScrollView, SafeAreaView, Platform, StatusBar, Image, Button, TextInput, Pressable } from 'react-native';

import { WellcomeContext } from '../../components/CredintailsContext';
import { UserContext } from '../../components/CredintailsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import colors from '../config/colors';

import Svg, { Path, Circle, G, SvgUri, Defs, ClipPath, Rect, Ellipse, Stop, LinearGradient } from "react-native-svg";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


function Secondslide({ navigation, route }) {

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
        // <SafeAreaView style={styles.MainContainer}>


        //        <View style={{marginTop:20,alignItems:'center',width:'100%',height:screenHight,justifyContent:'center'}}>
        //             <Walkthrough_2 width={300} height={200}/>

        //             <View style={{top:0,justifyContent:'center',alignItems:'center'}}>
        //                 <View style={{marginTop:60,justifyContent:'center',alignItems:'center',width:248}}>
        //                     <Text style={{fontWeight:'400',fontSize:20,color:'#00646B'}}>Take A look At Our Doctor</Text>
        //                     <Text style={{fontWeight:'bold',fontSize:20,color:'#00646B',top:5}}>Facilities</Text>
        //                 </View>
        //                 <View style={{marginTop:16,justifyContent:'center',alignItems:'center',height:42}}>
        //                     <Text style={{fontWeight:'400',fontSize:14,color:'#5B8B8E'}}>You’ve got 100+ doctor here so</Text>
        //                     <Text style={{fontWeight:'400',fontSize:14,color:'#5B8B8E',top:2}}>get your desire doctor now</Text>
        //                 </View>
        //                 <View style={{justifyContent:'center',alignItems:'center',marginTop:54}}>
        //                     <Slider2/>
        //                 </View>


        //                 <View style={{marginTop:40,width:'100%',flexDirection:'row',top:30,marginBottom:10}}>
        //                     <Pressable style={[styles.tuchabluebutton,{backgroundColor:colors.white,right:16.5}]} onPress={() => skip()}>
        //                         <Text style={{color:'#00646B',fontSize:14,fontWeight:'bold',display : lan ? 'none' : 'flex'}}>বাসা অনসন্ধান করুন</Text>
        //                         <Text style={{color:'#00646B',fontSize:14,fontWeight:'bold',display : lan ? 'flex' : 'none'}}>Skip</Text>
        //                     </Pressable>

        //                     <Pressable style={[styles.tuchabluebutton,{backgroundColor:'#00646B',flexDirection:'row',left:15.5}]} onPress={() => navigation.navigate("Thirdslide")}>
        //                         <Text style={{color:colors.white,fontSize:14,fontWeight:'bold',display : lan ? 'none' : 'flex'}}>লগ ইন করুন </Text>
        //                         <Text style={{color:colors.white,fontSize:14,fontWeight:'bold',display : lan ? 'flex' : 'none'}}>Next</Text>
        //                         <Arrow style={{left:10}}/>

        //                     </Pressable>


        //                 </View>
        //             </View>

        //         </View>
        // </SafeAreaView>

        <SafeAreaView style={{ width: '100%', height: '100%' }}>


            <View style={[styles.MainContainer]}>

                <StatusBar
                    animated={true}
                    backgroundColor="#005A12"
                // barStyle={statusBarStyle}

                />


                <View style={{ marginTop: 0, alignItems: 'center', width: '100%', height: screenHight, justifyContent: 'flex-start', top: 40 }}>
                    {/* <ScrollView> */}
                    <View style={{ alignItems: 'center', width: '100%', height: (screenHight / 2) + 50, justifyContent: 'flex-start' }}>
                        {/* <View style={[styles.tuchabluebutton,{width:'100%',top:10,backgroundColor:colors.white,justifyContent:'flex-end',alignItems:'flex-end',right:30}]} onPress={() => skip()}>
                            <Text style={{color:'#00646B',fontSize:14,display : lan ? 'none' : 'flex'}}>বাসা অনসন্ধান করুন</Text>
                            <Text style={{color:'#4A90E2',fontSize:14,display : lan ? 'flex' : 'none',letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>Skip</Text>
                    </View>    */}


                        {/* <Walkthrough_2 width={300} height={200} style={{marginTop:80}}/>   */}
                        {/* <SvgUri
                            width="300"
                            height="200"
                            style={{marginTop:80}} 
                            // source={require('../../icons_new/walkthrough_2.svg')}
                            uri="http://drive.google.com/uc?export=view&id=12jLF2KnyUb1XDU-BLCNS89rYX52V_LAD"
     
                    /> */}
                        {/* {seconds} */}

                        <Image
                            style={{ width: "80%", height: "100%", left: 0, top: 30 }}
                            resizeMode='contain'
                            source={require('../assets/fitback/WelcomeScreen02.png')}
                        />

                        <View style={{ top: 0, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <View style={{ marginTop: 60, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <Text style={{ fontSize: 25, color: '#00646B', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>Online Consultation</Text>

                            </View> */}
                            <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center', height: 42 }}>
                                <Text style={{ fontWeight: '400', fontSize: 14, color: '#585858', letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>Access to doctors, gym trainers, and</Text>
                                <Text style={{ fontWeight: '400', fontSize: 14, color: '#585858', top: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>physiotherapists for complete health</Text>
                                <Text style={{ fontWeight: '400', fontSize: 14, color: '#585858', top: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>support</Text>
                            </View>


                        </View>



                    </View>

                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: (screenHight / 2) - 50, borderWidth: 0 }}>

                        <View style={{ flexDirection: 'row', width: '100%', height: 100, justifyContent: 'space-between', alignItems: 'center', top: 30 }}>

                            <View style={{ width: "50%", left: 50, top: 10 }}>

                                <Svg width="40" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <Circle cx="4" cy="4" r="4" fill="#E5E8E8" />
                                    <Circle cx="20" cy="4" r="4" fill="#FF6A8F" />
                                    <Circle cx="36" cy="4" r="4" fill="#E5E8E8" />

                                </Svg>

                            </View>
                            <View style={{ width: "50%", justifyContent: 'center', alignItems: 'flex-end', right: 50 }}>

                                <Pressable
                                    // style={{ width: "50%", height: 40, borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.green }} 
                                    onPress={() => navigation.navigate("Thirdslide")} >
                                    {/* <Text style={{ color: colors.white }}>Next</Text> */}
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

export default Secondslide;
