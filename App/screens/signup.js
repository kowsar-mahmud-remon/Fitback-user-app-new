import React, { useState, useEffect, useContext } from 'react';
import { Linking, ActivityIndicator, Alert, StyleSheet, Text, View, ImageBackground, SafeAreaView, Platform, StatusBar, Image, Button, TextInput, Pressable, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

//asyn-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credential context
import { CredentialsContext } from '../../components/CredintailsContext';
import { UserContext } from '../../components/CredintailsContext';
import colors from '../config/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';

import OTPTextInput from 'react-native-otp-textinput';


function Signup({ navigation, route }) {

    const { authtoken, setAuthtoken } = useContext(UserContext);
    const [phone, setPhone] = useState("00");
    const [pass, setPass] = useState("00");
    const [name, setName] = useState("00");
    const [refercode, setRefercode] = useState("00");


    //message error

    const [message, setMessage] = useState();
    // const [messageType, setMessageType] = useState()

    const [allUsername, setAllUsername] = useState([]);


    const [successName, setSuccessName] = useState(true);

    const [successNumber, setSuccessNumber] = useState(true);
    const [passwordcheck, setPasswordcheck] = useState(true);

    const [nointernet, setNointernet] = useState(false);
    const [isLoading1, setLoading1] = useState(false);

    // const [postflag,setPostflag] = useState(route.params.postflag)
    // const [postbysignup,setpostbysignup] = useState(route.params.postbysignup)

    const [postflag, setPostflag] = useState(false);
    const [postbysignup, setpostbysignup] = useState(false);

    //message error

    //const [message, setMessage] = useState()
    const [messageType, setMessageType] = useState();


    //const [getUser,setgetUser] = useState(true)
    const [getUser, setgetUser] = useState(true);

    //context
    const { storeCredentials, setStoreCredentials } = useContext(CredentialsContext);
    const { testCredentials, setTestCredentials } = useContext(UserContext);

    const [lan, setLan] = useState(testCredentials.lan);

    const [submitFlag, setSubmitFlag] = useState(false);

    const GetMyalluser = () => {
        if (getUser) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            };

            fetch('https://qwikit1.pythonanywhere.com/userProfile', requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    setLoading1(false);
                    setAllUsername(json);
                    setNointernet(false);
                })
                .catch((error) => {
                    console.error(error);
                    setNointernet(true);
                    setLoading1(false);
                });
            setgetUser(false);
        }

    };
    GetMyalluser();


    const postUser = (username, phonenumber, password) => {

        if (nointernet) {
            setLoading1(false);
            setNointernet(true);
        }

        else {
            setSuccessNumber(true);
            setPasswordcheck(true);
            setSuccessName(true);
            setgetUser(true);
            if (username != null && phonenumber != null && password != null) {

                if (phonenumber.match("(?:\\+88|88)?(01[3-9]\\d{8})") && password.length == 4) {

                    let x = "zero";
                    allUsername.map((value) => {

                        //console.log(username)

                        if (value.phonenumber == phonenumber) {
                            setLoading1(false);
                            x = "booked";
                            if (testCredentials.lan == true) {
                                Alert.alert(
                                    "Number Already Registered",
                                    "please try again with another phone number",

                                    [
                                        { text: "Ok" }
                                    ], { cancelable: true, });
                            }
                            else {
                                Alert.alert(
                                    "এই নম্বরটি ইতিমধ্যে নিবন্ধিত রয়েছে",
                                    "\n" + "অনুগ্রহ করে আবার চেষ্টা করুন ধন্যবাদ",

                                    [
                                        { text: "ঠিক আছে", }
                                    ], { cancelable: true, });
                            }

                            return setSuccessNumber(false);

                        }
                        else {

                        }
                    });

                    if (x == "zero") {
                        setLoading1(false);

                        postbysignup && postflag ? navigation.navigate("Otpinput", { username: username, number: phonenumber, password: password, refercode: refercode, lan: testCredentials.lan, otpflag: true, signupflag: true, postbysignup: true, postflag: postflag }) : navigation.navigate("Otpinput", { username: username, number: phonenumber, password: password, refercode: refercode, lan: lan, otpflag: true, signupflag: true });

                        // Linking.openURL('https://api.greenweb.com.bd/api.php?token=93632355001681062900bec862397284db78c679c5&to=01622049519&message=test')

                    }

                }
                else if (password.length != 4) {
                    setLoading1(false);
                    setPasswordcheck(false);


                }
                else {
                    setLoading1(false);
                    setSuccessNumber(false);

                }

            }
            else if (username == null) {
                setLoading1(false);
                setSuccessName(false);

            }
            else if (phonenumber == null) {
                setLoading1(false);
                setSuccessNumber(false);

            }
            else {
                setLoading1(false);
                setPasswordcheck(false);

            }
        }

    };

    const persistUser = (credentials) => {

        AsyncStorage.setItem('checkuserid', JSON.stringify(credentials))
            .then(() => {
                // handleMessage(message)
                setTestCredentials(credentials);

            })
            .catch((error) => {
                // console.log(error)
                handleMessage('persisting login failed');
            });
    };


    const setEnglish = () => {

        persistUser({ userid: testCredentials.userid, notify: false, lan: true, raddress: testCredentials.raddress, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });

    };
    const setBangla = () => {
        persistUser({ userid: testCredentials.userid, notify: false, lan: false, raddress: testCredentials.raddress, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });

    };

    useEffect(() => {
        if (phone.match("(?:\\+88|88)?(01[3-9]\\d{8})") && pass.length == 4 && name != "00") {
            setSubmitFlag(true);
        }
        else {
            setSubmitFlag(false);

        }
    });



    return (

        <SafeAreaView style={[styles.MainContainer]}>
            <StatusBar
                animated={true}
                backgroundColor="#303030"
            />
            <View
                // style={{ height: '100%', width: '100%' }}
                style={{ position: 'absolute', width: '100%', justifyContent: 'flex-end' }}
            >

                {/* <ScrollView style={{width:'100%',height:'100%',flex:1.5}}> */}

                <ImageBackground
                    // source={require("../assets/bg_no_logo_big.jpg")} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    style={{ width: '100%', height: '100%', flex: 1 }}
                >
                    {/* <LogoText width={120} height={100} style={{marginTop:25,marginBottom:45,top:40}}/> */}
                    {/* <View style={{width:'100%',justifyContent:'flex-end',alignItems:'flex-end',right:20,top:40}}>

                    <Text style={{fontFamily: 'Poppins_400Regular',color:colors.black,fontSize:13,textDecorationLine:'underline',display: testCredentials.lan ? 'none' :'flex'}} onPress={()=>setEnglish()}>English</Text>
                    <Text style={{fontFamily: 'Poppins_400Regular',color:colors.black,fontSize:13,textDecorationLine:'underline',display: testCredentials.lan ? 'flex' :'none'}} onPress={()=>setBangla()}>বাংলা</Text>

                </View> */}
                    <View style={{ width: "100%", alignItems: "center" }}>
                        <Image
                            style={{
                                width: "100%",
                                height: 190,
                                marginTop: 25, top: 10
                            }}
                            resizeMode='contain'
                            source={require('../assets/fitback/signUp.png')}
                        />
                    </View>

                    {/* <View style={[styles.navbar]}>
                    <Text style={{left:55,top:17,color:colors.black,fontSize:14,paddingBottom:3,display : lan ? 'none' : 'flex',fontWeight:'bold'}} >নতুন পাসওয়ার্ড</Text>                 
                    <Text style={{left:55,top:17,color:colors.black,fontSize:14,paddingBottom:3,display : lan ? 'flex' : 'none',fontWeight:'bold'}} ></Text>                 

                </View> */}

                    <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>

                        {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: 50, marginTop: 15 }}>
                            <Pressable activeOpacity={4} style={{ justifyContent: 'center', alignItems: 'center', width: '42%', height: 50, borderBottomColor: colors.ash1, borderBottomWidth: 1, paddingBottom: 3 }} onPress={() => navigation.navigate("Login", {})}>
                                <Text style={{ fontFamily: 'Poppins_500Medium', color: '#303030', fontSize: 13, display: testCredentials.lan ? 'none' : 'flex' }}>সাইন ইন</Text>
                                <Text style={{ fontFamily: 'Poppins_500Medium', color: '#303030', fontSize: 13, display: testCredentials.lan ? 'flex' : 'none' }}>SIGN IN</Text>
                            </Pressable>
                            <Pressable activeOpacity={4} style={{ justifyContent: 'center', alignItems: 'center', width: '42%', height: 50, borderBottomColor: '#06CD9E', borderBottomWidth: 5 }}>
                                <Text style={{ color: colors.ash1, fontFamily: 'Poppins_500Medium', fontSize: 13, display: testCredentials.lan ? 'none' : 'flex' }}>সাইন আপ</Text>
                                <Text style={{ color: colors.ash1, fontFamily: 'Poppins_500Medium', fontSize: 13, display: testCredentials.lan ? 'flex' : 'none' }}>SIGN UP</Text>
                            </Pressable>
                        </View> */}

                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 30 }}>

                            <Text style={{ fontWeight: "700", fontFamily: 'Poppins_500Medium', color: '#EE426D', fontSize: 26 }}>Registration</Text>
                            <Text style={{ fontFamily: 'Poppins_400Regular', color: '#585858', fontSize: 13, marginRight: 14, marginTop: 4 }}>Start your journey now!!!</Text>
                        </View>

                        <View style={[styles.iddiv, { marginTop: 120 }]} >


                            <View style={styles.inputContainer}>
                                <FontAwesome style={{ paddingLeft: 8, paddingRight: 4 }} name="user" size={22} color="#8A8F90" />
                                <TextInput
                                    style={[styles.idinput, { borderColor: successName ? colors.ash1 : colors.red, borderBottomWidth: 0 }]}
                                    placeholder={testCredentials.lan ? "Enter your name" : "আপনার ফোন নাম্বার দিন"}
                                    onChangeText={newText => { setName(newText); }}
                                    defaultValue={name == "00" ? "" : name}
                                    maxLength={20}
                                />
                            </View>

                            {/* <TextInput
                                style={[styles.idinput, { borderColor: successName ? colors.ash1 : colors.red, borderBottomWidth: 0 }]}
                                placeholder={testCredentials.lan ? "Enter your name" : "আপনার ফোন নাম্বার দিন"}
                                onChangeText={newText => { setName(newText); }}
                                defaultValue={name == "00" ? "" : name}
                                maxLength={20}

                            /> */}
                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, display: successName ? 'none' : 'flex' }}>

                                <Text style={{ color: colors.red, fontWeight: '700', fontSize: 14, paddingBottom: 3, display: testCredentials.lan ? 'flex' : 'none' }}>Insert your name<Text style={{ color: colors.red }}></Text></Text>

                            </View>
                        </View>

                        <View style={[styles.passdiv, { marginTop: 20 }]}>


                            <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', width: '100%', top: 5 }}>
                                <Entypo style={{ paddingLeft: 8, paddingRight: 4 }} name="mobile" size={22} color="#8A8F90" />

                                <View style={{ width: '85%' }}>
                                    <TextInput
                                        style={[styles.idinput, { borderColor: passwordcheck == true || successNumber == true ? colors.ash1 : colors.red, borderBottomWidth: 0, paddingLeft: 10 }]}
                                        placeholder={testCredentials.lan ? "Number" : "আপনার ফোন নাম্বার দিন"}
                                        onChangeText={newText => { setPhone(newText); }}
                                        defaultValue={phone == "00" ? "" : phone}
                                        keyboardType="numeric"
                                        maxLength={11}
                                    />
                                    
                                </View>
                                
                            </View>
                          
                        </View>
                        
                        <View style={[styles.passdiv, { marginTop: 20 }]}>

                            <View style={styles.inputContainer}>
                                <Fontisto style={{ paddingLeft: 8, paddingRight: 4 }} name="locked" size={22} color="#8A8F90" />
                                <TextInput
                                    style={[styles.idinput, { borderColor: passwordcheck ? colors.ash1 : colors.red, borderBottomWidth: 0 }]}
                                    secureTextEntry={true}
                                    placeholder="Pin"
                                    onChangeText={newText => { setPass(newText); }}
                                    defaultValue={pass == "00" ? "" : pass}
                                    keyboardType="numeric"
                                    maxLength={4}
                                // textAlign={'center'}
                                />
                            </View>

                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, display: passwordcheck ? 'none' : 'flex' }}>

                                <Text style={{ color: colors.red, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: testCredentials.lan ? 'flex' : 'none' }}>Incorrect Pin<Text style={{ color: colors.red, fontWeight: '400' }}> (Pin must be 4 digit)</Text><Text style={{ color: colors.red }}></Text></Text>

                            </View>
                        </View>

                        {/* <View style={[styles.iddiv, { marginTop: 20 }]} >
                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10 }}>
                                <Text style={{ color: colors.ash, fontSize: 12, display: testCredentials.lan ? 'none' : 'flex', fontWeight: 'bold' }}>রেফারেল কোড</Text>
                                <Text style={{ color: colors.ash, fontSize: 12, display: testCredentials.lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', left: 5, top: 7 }}>REFERRAL CODE </Text>
                            </View>
                            <TextInput
                                style={[styles.idinput, { borderColor: colors.ash1, borderBottomWidth: 0 }]}
                                // placeholder= {lan ? "Enter your name" : "আপনার ফোন নাম্বার দিন"} 
                                onChangeText={newText => { setRefercode(newText); }}
                                defaultValue={refercode == "00" ? "" : refercode}
                                maxLength={15}

                            />

                        </View> */}


                        <Pressable disabled={submitFlag ? false : true} style={[styles.tuchabluebutton, { backgroundColor: isLoading1 || submitFlag == false ? colors.ash : '#EE426D', flexDirection: 'row' }]} onPress={() => { setLoading1(true), postUser(name, phone, pass); }}>
                            <ActivityIndicator size="small" color="#00263C" style={{ display: isLoading1 ? 'flex' : 'none', right: 30 }} />

                            <Text style={{ color: colors.white, color: colors.white, display: testCredentials.lan ? 'none' : 'flex' }}>নিশ্চিত করুন</Text>
                            <Text style={{ fontFamily: 'Poppins_400Regular', color: colors.white, fontSize: 14, display: testCredentials.lan ? 'flex' : 'none', fontSize: 12 }}>Register</Text>
                        </Pressable>

                        <View style={{ flexDirection: "row", top: -36 }}>
                            <Text style={{ fontFamily: 'Poppins_400Regular', color: '#585858', fontSize: 13, marginRight: 10 }}>Already have an account?</Text>


                            <Pressable activeOpacity={4} style={{}} onPress={() => navigation.navigate("Login", {})}>

                                <Text style={{ fontFamily: 'Poppins_400Regular', color: '#2929D1', fontSize: 13 }}>Login</Text>
                            </Pressable>
                        </View>


                    </View>

                    {/* <View style={{marginBottom:5,width:'95%',height:38,borderColor:'#D50400',borderWidth:1,borderRadius:3,justifyContent:'flex-start',alignItems:'center',flexDirection:'row',display: nointernet ? "flex" : "none"}}>
            <Text style={{marginLeft:15,fontSize:12,fontWeight:'700',color:"#D50400"}}>No Internet Connection.</Text>
        </View> */}

                </ImageBackground>
                {/* </ScrollView> */}

            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: 'center',
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        //paddingTop:200
    },
    navbar: {

        // backgroundColor: colors.white,
        width: '100%',
        height: 45,

    },
    ImgContainer: {

        justifyContent: "center",
        alignItems: 'center',
        width: "100%",
        height: 230,
        bottom: 90,

    },
    varadivologo: {
        width: "100%",
        height: "100%",

    },
    varadivowritten: {
        width: 118,
        height: 45,
        bottom: 189,
        paddingRight: 150,
    },


    iddiv: {
        width: "90%",
        // height:60,
        height: 65,
        //borderColor:'black',
        // backgroundColor:colors.white,
        backgroundColor: "#f3f2f2",
        //borderWidth:1,
        justifyContent: "center",
        alignItems: 'center',
        paddingBottom: 10,
        borderRadius: 4,
        top: -100,

    },

    // idinput: {
    //     width: "95%",
    //     height: 40,
    //     // backgroundColor:colors.white1,

    //     padding: 10,
    //     borderRadius: 4,
    //     fontSize: 14,
    //     paddingLeft: 5,


    // },

    passdiv: {
        width: "90%",
        height: 65,
        backgroundColor: "#f3f2f2",
        justifyContent: "center",
        alignItems: 'center',
        paddingBottom: 10,
        borderRadius: 4,
        top: -100,
        paddingLeft: 5,

    },

    tuchabluebutton: {
        bottom: 10,
        width: "65%",
        height: 45,
        borderRadius: 4,
        backgroundColor: "#488291",
        justifyContent: "center",
        alignItems: 'center',
        top: -50

    },

    inputContainer: {
        flexDirection: "row", // Aligns the icon and text input horizontally
        alignItems: "center", // Vertically aligns the icon and text input
        // borderWidth: 1,
        borderRadius: 4, // Border radius for the entire container
        padding: 5, // Add padding inside the container
    },

    idinput: {
        flex: 1, // Ensures the text input takes up the remaining space
        height: 40,
        fontSize: 14,
        paddingLeft: 10,
        color: "#2C3132" // Adds some space between the icon and the text
    },



});

export default Signup;

