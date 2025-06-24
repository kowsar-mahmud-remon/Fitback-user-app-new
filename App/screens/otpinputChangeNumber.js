import React, { useState, useEffect, useRef, useContext } from 'react';
// import axios from 'axios';
import { ActivityIndicator, Alert, StyleSheet, Text, View, ImageBackground, SafeAreaView, Platform, StatusBar, Image, Button, TextInput, Pressable, Keyboard } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import colors from '../config/colors';

//asyn-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credential context
import { CredentialsContext } from '../../components/CredintailsContext';
import { UserContext } from '../../components/CredintailsContext';
// import {CountDownText} from 'react-native-countdown-timer-text';


function OtpinputChangeNumber({ navigation, route }) {
    const { authtoken, setAuthtoken } = useContext(UserContext);
    const [otp, setOtp] = useState(null);
    const [number, setNumber] = useState(route.params.number);
    const [password, setPassword] = useState(route.params.password);
    const [sendedOTP, setSendedOTP] = useState(null);
    const [userid, setUserid] = useState(route.params.userid);
    const [nointernet, setNointernet] = useState(false);
    const [isLoading1, setLoading1] = useState(false);
    const [signupflag, setSignupflag] = useState(route.params.signupflag);
    const [otptime, setOtptime] = useState(true);
    const [message, setMessage] = useState();
    const [otpflag, setotpflag] = useState(true);
    const [otpflagempt, setotpflagempt] = useState(true);

    const [postflag, setPostflag] = useState(route.params.postflag);

    const [allUser, setAllUser] = useState([]);
    //context
    const { storeCredentials, setStoreCredentials } = useContext(CredentialsContext);
    const { testCredentials, setTestCredentials } = useContext(UserContext);
    const [lan, setLan] = useState(true);

    if (route.params.repassflag) {
        navigation.navigate("Repassword", { userid: route.params.userid, lan: lan });
    }


    useEffect(() => {





        if (otp != null && otp == sendedOTP) {


            if (route.params.forgetpass) {
                setLoading1(false);

                navigation.navigate("Repassword", { userid: route.params.userid, lan: lan, postflag: postflag });

            }
            else if (route.params.changenumber) {

                const requestOptions = {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                    body: JSON.stringify({
                        phonenumber: number,
                    })
                };

                fetch('https://qwikmedic.pythonanywhere.com/userProfile' + route.params.userid, requestOptions)
                    .then((response) => response.json())
                    .then((json) => {

                        setNointernet(false);

                        if (lan == true) {
                            Alert.alert(
                                "Successfully Changed",
                                "\n" + "Your new number is " + number,

                                [
                                    { text: "Ok", }
                                ], { cancelable: true, });
                        }
                        else {
                            Alert.alert(
                                "সফল ভাবে পরিবর্তিত হয়েছে",
                                "\n" + "আপনার নতুন নম্বর হলো " + number,


                                [
                                    { text: "ঠিক আছে", }
                                ], { cancelable: true, });
                        }
                        setLoading1(false);
                        navigation.navigate("Homepage");


                    })

                    .catch((error) => {
                        setLoading1(false);

                        setNointernet(true);
                        console.error(error);
                    });

            }
            else {

                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                fetch('https://qwikmedic.pythonanywhere.com/userProfile', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        setNointernet(false);
                        setLoading1(false);
                        let x = "zero";
                        json.map((value) => {

                            if (value.phonenumber == number) {
                                x = "booked";
                                // console.log("###########booked#########")
                                navigation.navigate("Homepage");

                            }
                        });
                        if (x == "zero") {
                            const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                                body: JSON.stringify({
                                    phonenumber: number,
                                    password: password,
                                })
                            };

                            fetch('https://qwikmedic.pythonanywhere.com/userProfile/new', requestOptions)
                                .then((response) => response.json())
                                .then((json) => {
                                    // console.log('create user', json);
                                    setLoading1(false);
                                    setNointernet(false);

                                    persistUser({ userid: json.id, notify: false, lan: true, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, save: testCredentials.save });

                                    persistLogin({ userid: json.id, lan: true });


                                })
                                .catch((error) => {
                                    setLoading1(false);
                                    setNointernet(true);

                                    console.error(error);



                                });
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        setNointernet(true);
                        setLoading1(false);
                    });


            }
        }


    });

    const axios = require('axios');


    const [getUser, setgetUser] = useState(true);

    Math.random();

    const GetMyalluser = () => {
        // console.log("hitnow")
        if (getUser == true & route.params.otpflag == true) {


            if (signupflag == true) {
                // console.log("*****************************")
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                fetch('https://qwikmedic.pythonanywhere.com/userProfile', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        setLoading1(false);
                        // setAllUser(json)

                        let x = "zero";
                        json.map((value) => {

                            // console.log("##########################")
                            if (value.phonenumber == number) {
                                x = "booked";
                                // console.log("###########booked#########")
                                // navigation.navigate("WelcomeVaradibo")
                                navigation.navigate("Homepage");

                            }

                        });
                        if (x == "zero") {
                            // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!")
                            var theRandomNumber = Math.floor(Math.random() * (9999 - 1000)) + 1000;
                            setSendedOTP(theRandomNumber);
                            // console.log(theRandomNumber);     

                            let msg = theRandomNumber + " is your QwikMedic OTP";

                            const greenwebsms = 'token=97681508331739696913f08cdf73b133c59841ca922ba99a026a&to=' + number + '&message=' + msg;
                            axios.post('https://api.bdbulksms.net/api.php?json', greenwebsms).then(response => {
                                setNointernet(false);
                            })
                                .catch((error) => {
                                    setLoading1(false);

                                    console.error(error);
                                    setNointernet(true);
                                });
                            // console.log(greenwebsms);
                            // console.log(theRandomNumber)


                        }

                    })
                    .catch((error) => {
                        console.error(error);
                        setLoading1(false);

                        console.error(error);
                        setNointernet(true);

                    });


            }

            if (route.params.forgetpass || route.params.changenumber) {

                var theRandomNumber = Math.floor(Math.random() * (9999 - 1000)) + 1000;
                setSendedOTP(theRandomNumber);
                // console.log(theRandomNumber);     

                let msg = theRandomNumber + " is your QwikMedic OTP";

                const greenwebsms = 'token=97681508331739696913f08cdf73b133c59841ca922ba99a026a&to=' + number + '&message=' + msg;
                axios.post('https://api.bdbulksms.net/api.php?json', greenwebsms).then(response => {
                    setNointernet(false);
                })
                    .catch((error) => {
                        setLoading1(false);

                        setNointernet(true);
                    });
                // console.log(greenwebsms);
                // console.log(theRandomNumber)


            }

            setgetUser(false);
        }



    };

    GetMyalluser();

    const Varify = () => {
        setotpflagempt(true);
        setotpflag(true);
        if (otp != null && otp == sendedOTP) {


            if (route.params.forgetpass) {
                setLoading1(false);

                navigation.navigate("Repassword", { userid: route.params.userid, lan: lan, postflag: postflag });

            }
            else if (route.params.changenumber) {



                const requestOptions = {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                    body: JSON.stringify({
                        phonenumber: number,
                    })
                };

                fetch('https://qwikmedic.pythonanywhere.com/userProfile/' + route.params.userid, requestOptions)
                    .then((response) => response.json())
                    .then((json) => {



                        if (lan == true) {
                            Alert.alert(
                                "Successfully Changed",
                                "\n" + "Your new number is " + number,

                                [
                                    { text: "Ok", }
                                ], { cancelable: true, });
                        }
                        else {
                            Alert.alert(
                                "সফল ভাবে পরিবর্তিত হয়েছে",
                                "\n" + "আপনার নতুন নম্বর হলো " + number,


                                [
                                    { text: "ঠিক আছে", }
                                ], { cancelable: true, });
                        }
                        setLoading1(false);
                        navigation.navigate("Homepage");


                    })

                    .catch((error) => {
                        setLoading1(false);

                        setNointernet(true);
                        console.error(error);
                    });

            }
            else {

                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                fetch('https://qwikmedic.pythonanywhere.com/userProfile', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        setNointernet(false);
                        setLoading1(false);
                        let x = "zero";
                        json.map((value) => {

                            if (value.phonenumber == number) {
                                x = "booked";
                                // console.log("###########booked#########")
                                navigation.navigate("Homepage");

                            }
                        });
                        if (x == "zero") {
                            const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                                body: JSON.stringify({
                                    phonenumber: number,
                                    password: password,
                                })
                            };

                            fetch('https://qwikmedic.pythonanywhere.com/userProfile/new', requestOptions)
                                .then((response) => response.json())
                                .then((json) => {
                                    setNointernet(false);
                                    // console.log('create user', json);
                                    setLoading1(false);

                                    persistUser({ userid: json.id, notify: false, lan: true, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, save: testCredentials.save });

                                    persistLogin({ userid: json.id, lan: lan });



                                })
                                .catch((error) => {
                                    setLoading1(false);
                                    setNointernet(true);
                                    console.error(error);



                                });
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        setNointernet(true);
                        setLoading1(false);
                    });


            }
        }

        else if (otp == null) {
            setLoading1(false);
            setotpflag(false);

        }
        else {
            setLoading1(false);
            setotpflagempt(false);
        }
        // }
    };
    const handleMessage = (message) => {
        setMessage(message);
        // setMessageType(type)
    };

    const persistUser = (credentials) => {

        AsyncStorage.setItem('checkuserid', JSON.stringify(credentials))
            .then(() => {
                setNointernet(false);
                setTestCredentials(credentials);

            })
            .catch((error) => {
                // console.log(error)
                setNointernet(true);
                handleMessage('persisting login failed');
            });
    };

    const persistLogin = (credentials) => {

        AsyncStorage.setItem('varadiboLogin', JSON.stringify(credentials))
            .then(() => {
                // handleMessage(message)
                setNointernet(false);
                setStoreCredentials(credentials);
                navigation.navigate("Homepage");
            })
            .catch((error) => {
                // console.log(error)
                setNointernet(true);
                handleMessage('persisting login failed');
            });
    };




    return (
        <SafeAreaView style={styles.MainContainer}>
            <StatusBar
                animated={true}
                backgroundColor="#303030"
            />
            {/* <ImageBackground source={require("../assets/backgrounimg.jpg")} style={{width:'100%',height:'100%',flex:1}}> */}
            <ImageBackground style={{ width: '100%', height: '100%', flex: 1 }}>

                <View style={[styles.navbar]}>
                    <Text style={{ left: 55, top: 17, color: colors.black, fontSize: 14, paddingBottom: 3, display: lan ? 'none' : 'flex', fontWeight: 'bold' }} >নতুন পাসওয়ার্ড</Text>
                    <Text style={{ left: 55, top: 17, color: colors.black, fontSize: 14, paddingBottom: 3, display: lan ? 'flex' : 'none', fontWeight: 'bold' }} >varify otp</Text>

                </View>




                <View style={styles.body}>



                    <View style={{ width: 170, height: 138, marginTop: 370, bottom: 35 }}>
                        {/* <QM width={175} height={125} /> */}
                        <Image
                            style={{ width: 120, height: 100, bottom: 50, display: success ? 'none' : 'flex' }}
                            resizeMode='contain'
                            source={require('../assets/logo_with_text.jpg')}
                        // source={{uri: "http://drive.google.com/uc?export=view&id=1Aomuqg51XB28iZOa7vDOp_RzwI6cW9tk"}}
                        />
                    </View>
                    {/* <View style={{width:170,height:138,marginBottom:0,}}>
                <QM width={170} height={140} />
            </View> */}
                    <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>

                        <View style={{ width: '100%', height: '100%', alignItems: 'center', marginTop: 20 }}>


                            <Text style={{ color: colors.black, fontWeight: '400', fontSize: 14, bottom: 40, display: lan ? 'none' : 'flex' }}>অনুগ্রহ করে পাঠানো OTP লিখুন</Text>
                            <Text style={{ color: '#00646B', fontWeight: '400', fontSize: 14, bottom: 40, display: lan ? 'flex' : 'none' }}>Please enter the OTP we just send you</Text>
                            <Text style={{ color: '#00646B', fontWeight: '700', fontSize: 14, bottom: 33 }}>{number}</Text>

                            <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', top: 0 }}>
                                <OTPTextInput
                                    handleTextChange={value => setOtp(value)}
                                    tintColor={otpflag == false || otpflagempt == false ? 'red' : "#2FD9DF"}

                                />


                            </View>

                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', top: 10 }}>
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', left: 0, display: otpflagempt ? 'none' : 'flex' }}>

                                    <Text style={{ color: colors.red, fontWeight: '700', fontSize: 14, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Incorrect OTP<Text style={{ color: colors.red }}></Text></Text>

                                </View>
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', left: 0, display: otpflag ? 'none' : 'flex' }}>

                                    <Text style={{ color: colors.red, fontWeight: '700', fontSize: 14, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Enter your OTP<Text style={{ color: colors.red }}></Text></Text>

                                </View>
                            </View>


                            <View style={{ flexDirection: 'row', display: otptime ? 'flex' : 'none' }}>
                                <Text style={{ color: colors.black, fontWeight: '400', fontSize: 14, top: 30, display: lan ? 'none' : 'flex' }}>পুনরায় ওটিপি পাঠান?</Text>
                                <Text style={{ color: '#00646B', fontWeight: '400', fontSize: 14, top: 30, display: lan ? 'flex' : 'none' }}>Resend OTP After</Text>

                                {/* <CountDownText
                    style={{color: '#00646B' ,fontWeight:'600',fontSize:14,top:30,left:5,display: otptime ? 'flex':'none'}}
                    countType='seconds'
                    auto={true}
                    afterEnd={() => setOtptime(false)}
                    timeLeft={59}
                    step={-1}
                    startText='Start'
                    endText='Resend'
                    intervalText={(sec) =>'00:' +sec}
                /> */}
                                <Pressable style={[styles.tuchabluebutton, { backgroundColor: '#4C65CB', fontSize: 14, top: 26, left: 15, bottom: 0, width: '30%', height: 30, display: otptime ? 'none' : 'flex' }]} onPress={() => { setgetUser(true), setOtptime(true); }}>
                                    <Text style={{ color: colors.white, fontWeight: '400', fontSize: 14, display: lan ? 'none' : 'flex' }}>পুনরায় পাঠান</Text>
                                    <Text style={{ color: colors.white, fontWeight: '400', fontSize: 14, display: lan ? 'flex' : 'none' }}>Resend</Text>
                                </Pressable>

                            </View>

                            <View style={{ flexDirection: 'row', display: otptime ? 'none' : 'flex' }}>
                                <Text style={{ color: colors.black, fontWeight: '400', fontSize: 14, top: 30, display: lan ? 'none' : 'flex' }}>পুনরায় ওটিপি পাঠান?</Text>
                                <Text style={{ color: '#00646B', fontWeight: '400', fontSize: 14, top: 30, display: lan ? 'flex' : 'none' }}>Didn't receive the code? Click <Text style={{ color: "#C930C9" }} onPress={() => { setgetUser(true), setOtptime(true); }}>here</Text> to resend code.</Text>

                            </View>



                            <Pressable style={[styles.tuchabluebutton, { top: 90, backgroundColor: isLoading1 ? colors.ash : '#00646B', flexDirection: 'row' }]} onPress={() => { setLoading1(true), Varify(); }}>
                                <ActivityIndicator size="small" color="#00263C" style={{ display: isLoading1 ? 'flex' : 'none', right: 30 }} />

                                <Text style={{ color: colors.white, fontSize: 14, fontWeight: '400', display: lan ? 'none' : 'flex' }}>যাচাই করুন</Text>
                                <Text style={{ color: colors.white, fontSize: 14, fontWeight: '400', display: lan ? 'flex' : 'none' }}>VERIFY</Text>
                            </Pressable>

                            {/* <Bottom_bar width={'100%'} style={{top:200}}/> */}

                        </View>

                    </View>
                </View>

                {/* <View style={{marginBottom:5,width:'95%',height:38,borderColor:'#D50400',borderWidth:1,borderRadius:3,justifyContent:'flex-start',alignItems:'center',flexDirection:'row',display: nointernet ? "flex" : "none"}}>
        <Text style={{marginLeft:15,fontSize:14,fontWeight:'700',color:"#D50400"}}>No Internet Connection.</Text>
    </View> */}

            </ImageBackground>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

        backgroundColor: colors.white,

        //paddingTop:200
    },

    body: {
        // flex:1,
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',

    },
    tuchabluebutton: {
        bottom: 75,
        width: "85%",
        height: 45,
        borderRadius: 4,
        backgroundColor: "#488291",
        justifyContent: "center",
        alignItems: 'center',

    }
    ,

    navbar: {

        width: '100%',
        height: 30,

    },

});
export default OtpinputChangeNumber;