import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, ImageBackground, SafeAreaView, Platform, StatusBar, Image, Button, TextInput, Pressable, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";

import OTPTextInput from 'react-native-otp-textinput';

import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';

//asyn-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credential context
import { CredentialsContext } from '../../components/CredintailsContext';
import { UserContext } from '../../components/CredintailsContext';
import colors from '../config/colors';


function Login({ navigation, route }) {

    const [allUsername, setAllUsername] = useState([]);
    const [phone, setPhone] = useState("00");
    const [pass, setPass] = useState("00");

    // const[lan,setLan] = useState(true)


    const [successNumber, setSuccessNumber] = useState(true);
    const [passwordcheck, setPasswordcheck] = useState(true);

    const [emptypassword, setEmptypassword] = useState(true);

    // const [postflag,setPostflag] = useState(route.params.postflag)
    const [postflag, setPostflag] = useState(false);

    const [getUser, setgetUser] = useState(true);

    const [nointernet, setNointernet] = useState(false);
    const [isLoading1, setLoading1] = useState(false);
    const [isLoading2, setLoading2] = useState(false);
    const [isLoading3, setLoading3] = useState(false);

    const [submitFlag, setSubmitFlag] = useState(false);
    const [wrong, setWrong] = useState(false);

    const [getProductdatapush, setGetProductdatapush] = useState([]);

    //message error

    let screenWidth = Dimensions.get('window').width;
    let screenHight = Dimensions.get('window').height;

    const [message, setMessage] = useState();
    // const [messageType, setMessageType] = useState()

    const [isLoading123, setLoading123] = useState(true);

    //context
    const { storeCredentials, setStoreCredentials } = useContext(CredentialsContext);
    const { testCredentials, setTestCredentials } = useContext(UserContext);
    const { noficationtoken, setNoficationtoken } = useContext(UserContext);
    const { authtoken, setAuthtoken } = useContext(UserContext);
    const { getdiscountproduct, setGetdiscountproduct } = useContext(UserContext);


    const [lan, setLan] = useState(testCredentials.lan);

    const GetMyalluser = () => {
        if (getUser) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },

            };

            fetch('https://qwikit1.pythonanywhere.com/userProfile/', requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    // setLoading1(false)
                    setAllUsername(json);
                    setNointernet(false);
                    // console.log(json)
                })
                .catch((error) => {
                    console.error(error);
                    setNointernet(true);
                    // setLoading1(false)
                    // console.log("Network Error")
                });

            setgetUser(false);
        }

    };
    GetMyalluser();



    const handleMessage = (message) => {
        setMessage(message);
        // setMessageType(type)
    };

    const postUser = async (phonenumber, password) => {

        setLoading1(true);
        setLoading3(true);

        if (nointernet) {
            // setLoading1(false)
            setNointernet(true);
        }
        else {
            setSuccessNumber(true);
            setPasswordcheck(true);
            setEmptypassword(true);
            setgetUser(true);
            if (phonenumber != null && password != null) {

                if (phonenumber.match("(?:\\+88|88)?(01[3-9]\\d{8})") && password.length == 4) {

                    let x = "zero";

                    allUsername.map((value) => {

                        //console.log(username)

                        if (value.phonenumber == phonenumber && value.password == password) {
                            x = "ok";
                            setWrong(false);

                            setSuccessNumber(true);
                            setPasswordcheck(true);
                            setEmptypassword(true);

                            // persistUser({userid:value.id,notify:false,lan:true,raddress: getpromoimg,cartbuy: testCredentials.cartbuy ,cartrent: getProductdatapush,productsave: testCredentials.productsave,flatsave: getProductdata2push})
                            persistUser({ userid: value.id, user_FUId: value?.user_FUId, notify: false, lan: testCredentials.lan, raddress: getpromoimg, cartbuy: testCredentials.cartbuy, cartrent: getProductdatapush, productsave: testCredentials.productsave, flatsave: getProductdata2push });

                            // persistUser({userid:userid,notify:testCredentials.natify,lan:true,raddress: getpromoimg,cartbuy: testCredentials.cartbuy ,cartrent: getProductdata,productsave: testCredentials.productsave,flatsave: testCredentials.flatsave })


                            const requestOptions = {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                                body: JSON.stringify({
                                    noficationtoken: noficationtoken,
                                })
                            };

                            fetch('https://qwikit1.pythonanywhere.com/userProfile/' + value.id, requestOptions)
                                .then((response) => response.json())
                                .then((json) => {
                                    // console.log("Every thing is okey from here")
                                    // setLoading1(false)
                                    persistLogin({ userid: value.id, user_FUId: value?.user_FUId, lan: testCredentials.lan });


                                })
                                .catch((error) => {


                                });



                        }
                        // setLoading1(false)


                    });
                    if (x != "ok") {
                        // console.log(allUsername)
                        // console.log('Wrong Number OR Password')
                        // setSuccessNumber(true)
                        // setEmptypassword(true)
                        // setPasswordcheck(false)
                        // setLoading1(false)
                        setWrong(true);
                        setLoading1(false);
                        setLoading3(false);
                        // setSubmitFlag(true)

                    }

                }

                else if (password.length != 4) {
                    // setLoading1(false)
                    setEmptypassword(false);
                    // setLoading1(false)
                    // setLoading3(false)
                    // setSubmitFlag(true)
                }
                else {
                    // setLoading1(false)
                    setSuccessNumber(false);
                    setWrong(true);
                    console.log("hello");
                    setLoading1(false);
                    // setLoading3(false)
                    setSubmitFlag(true);

                }
            }

            else if (phonenumber == null) {
                // setLoading1(false)
                setSuccessNumber(false);
                // setLoading1(false)
                // setLoading3(false)
                // setSubmitFlag(true)

            }
            else if (password == null) {
                // setLoading1(false)
                setEmptypassword(false);
                // setLoading1(false)
                // setLoading3(false)
                // setSubmitFlag(true)

            }
            else {
                // setLoading1(false)
                // setLoading3(false)
                // setSubmitFlag(true)
                setPasswordcheck(false);

            }

        }

    };


    const postGuestUser = () => {


        persistUser({ userid: 1, notify: false, lan: testCredentials.lan, raddress: getpromoimg, cartbuy: testCredentials.cartbuy, cartrent: getProductdatapush, productsave: testCredentials.productsave, flatsave: getProductdata2push });

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({
                noficationtoken: noficationtoken,
            })
        };

        fetch('https://qwikit1.pythonanywhere.com/userProfile/' + 1, requestOptions)
            .then((response) => response.json())
            .then((json) => {
                // console.log("Every thing is okey from here")

                persistLogin({ userid: 1, lan: testCredentials.lan });


            })
            .catch((error) => {

            });

        // setLoading2(false)
    };

    const [getpromo, setGetpromo] = useState(true);

    const [getpromoimg, setGetpromoimg] = useState([]);


    const Promoimage = () => {

        if (getpromo) {

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            };

            fetch('https://qwikit1.pythonanywhere.com/promotionaladdImage', requestOptions)
                .then((response) => response.json())
                .then((json) => {

                    json.map((item, index) => {
                        if (item.name == "promo1") {
                            if (item.image1) {

                                getpromoimg.push(item.image1);

                            }
                            if (item.image2) {

                                getpromoimg.push(item.image2);

                            }
                            if (item.image3) {

                                getpromoimg.push(item.image3);

                            }
                            if (item.image4) {

                                getpromoimg.push(item.image4);

                            }
                            if (item.image5) {

                                getpromoimg.push(item.image5);

                            }
                            if (item.image6) {

                                getpromoimg.push(item.image6);

                            }
                            if (item.image7) {

                                getpromoimg.push(item.image7);

                            }
                            if (item.image8) {

                                getpromoimg.push(item.image8);

                            }
                            if (item.imag9) {

                                getpromoimg.push(item.image9);

                            }
                            if (item.image10) {

                                getpromoimg.push(item.image10);

                            }

                        }
                        // setLoading1(false)
                    });

                })
                .catch((error) => {
                    console.error(error);

                    // setLoading1(false)

                });



            setGetpromo(false);
        }
    };



    const [getDoctorinfo, setGetDoctorinfo] = useState(true);

    const [getProduct2, setGetProduct2] = useState(true);
    const [getProductdata, setGetProductdata] = useState([]);

    const [getProductdata2, setGetProductdata2] = useState([]);

    const [getProductdata2push, setGetProductdata2push] = useState([]);

    const DoctorInfo1 = async () => {
        try {

            if (getDoctorinfo) {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://qwikit1.pythonanywhere.com/doctorProfile', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {

                        setGetProductdata(json);

                        {
                            getProductdatapush.length = 0;
                            // let x = 0
                            json.map((item, index) => {

                                if (parseInt(item.experience) >= 10) {

                                    // x = x + 1

                                    getProductdatapush.push(item);
                                }


                            });
                        }

                    })
                    .catch((error) => {
                        console.error(error);

                    });


            }

            // console.log("hit");

        }
        catch (error) {
            console.error(error);
            // setLoading1(false)
        } finally {

            // setLoading123(false);
            // setGetProduct(false);

        }

        setGetDoctorinfo(false);


    };


    const [checkdata2, setCheckdata2] = useState(true);

    const Getdata2 = () => {
        if (checkdata2) {


            {
                let x = 0;
                getProductdata.map((item, index) => {

                    if (item.catagory == 1 && x <= 30) {

                        x = x + 1;

                        getProductdata2push.push(item);
                    }


                });
            }



        }
        setCheckdata2(false);

    };

    const ProductInfo2 = async () => {
        try {
            if (getProduct2) {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://qwikit1.pythonanywhere.com/product', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        // setGetProductdata(json.reverse())
                        setGetProductdata2(json.reverse());
                        setNointernet(false);


                        {
                            getProductdata2push.length = 0;
                            let x = 0;
                            json.map((item, index) => {

                                if (x <= 10 && index > 100) {

                                    x = x + 1;

                                    getProductdata2push.push(item);
                                }


                            });
                        }

                    })
                    .catch((error) => {
                        console.error(error);
                        setNointernet(true);
                        // setLoading1(false)
                    });



                setGetProduct2(false);

            }

            // console.log("hit");
        }
        catch (error) {
            console.error(error);
            // setLoading1(false)
        }

        finally {

            setLoading123(false);
        }


        // setGetProduct2(false)


    };





    const NotificationCheck = async () => {
        try {
            if (getnotify) {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://qwikit1.pythonanywhere.com/notification', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {

                        // setGetProductdata(json.reverse())
                        json.map((item, index) => {
                            if (item.userid == userid && item.readstatus == false) {
                                setUnread(true);
                                // console.log("unread")
                            }
                        });

                    })
                    .catch((error) => {

                    });

                unread ? persistUser({ userid: testCredentials.userid, notify: true, lan: testCredentials.lan, raddress: testCredentials.raddress, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave }) : persistUser({ userid: testCredentials.userid, notify: false, lan: true, raddress: testCredentials.raddress, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });



            }

            //     console.log("hit");
        }
        catch (error) {

        } finally {


        }



        setGetnotify(false);


    };


    const ForgetPass = (phonenumber) => {

        if (!phonenumber.match("(?:\\+88|88)?(01[3-9]\\d{8})")) {
            Alert.alert(
                "Missing Information",
                "Please enter your phone number",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("Alert closed")
                    }
                ]
            );
            return;
        }

        if (phonenumber != null) {

            if (phonenumber.match("(?:\\+88|88)?(01[3-9]\\d{8})")) {

                let x = "zero";

                allUsername.map((value) => {

                    //console.log(username)

                    if (value.phonenumber == phonenumber) {
                        x = "ok";
                        // setLoading1(false)
                        navigation.navigate("Otpinput", { number: phonenumber, password: "", forgetpass: true, userid: value.id, lan: testCredentials.lan, otpflag: true, postflag: postflag });

                    }
                    else {

                    }

                });
                if (x != "ok") {
                    setSuccessNumber(false);
                    // setLoading1(false)


                }

            }

            else {
                // setLoading1(false)
                setSuccessNumber(false);


            }
        }

        else {
            // setLoading1(false)
            setSuccessNumber(false);

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

    const persistLogin = (credentials) => {

        AsyncStorage.setItem('qwikmedicLogin', JSON.stringify(credentials))
            .then(() => {
                // handleMessage(message)
                setStoreCredentials(credentials);
                // navigation.navigate("UserLandingPage",{postflag:postflag})
                navigation.navigate("Homepage");
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

        // console.log(noficationtoken)

        // persistUser({userid:value.id,notify:false,lan:true,raddress: getpromoimg,cartbuy: testCredentials.cartbuy ,cartrent: getProductdatapush,productsave: testCredentials.productsave,flatsave: getProductdata2push})


        ProductInfo2();
        // Promoimage()
        DoctorInfo1();

        // if(getProductdata2.length > 0){
        //     Getdata2()
        // }



        if (phone.length == 11 && pass.length == 4) {
            setSubmitFlag(true);
            // setLoading1(false)
            setLoading3(false);
        }
        else {
            setSubmitFlag(false);
            setLoading3(true);

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
                <ImageBackground
                    // source={require("../assets/bg_no_logo_big.jpg")} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    style={{ width: '100%', height: '100%', flex: 1 }}
                >
                    {/* <LogoText width={120} height={100} style={{marginTop:25,marginBottom:45}}/> */}
                    {/* <View style={{width:'100%',justifyContent:'flex-end',alignItems:'flex-end',right:20}}>

                    <Text style={{fontFamily: 'Poppins_400Regular',color:colors.black,fontSize:13,textDecorationLine:'underline',display: testCredentials.lan ? 'none' :'flex'}} onPress={()=>setEnglish()}>English</Text>
                    <Text style={{fontFamily: 'Poppins_400Regular',color:colors.black,fontSize:13,textDecorationLine:'underline',display: testCredentials.lan ? 'flex' :'none'}} onPress={()=>setBangla()}>বাংলা</Text>

                </View> */}

                    <View style={{ width: "100%", alignItems: "center" }}>
                        <Image
                            style={{
                                width: "100%",
                                height: 220,
                                marginTop: 25, top: 10
                            }}
                            resizeMode='contain'
                            source={require('../assets/fitback/login.png')}
                        />
                    </View>

                    <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 30 }}>

                            <Text style={{ fontWeight: "700", fontFamily: 'Poppins_500Medium', color: '#EE426D', fontSize: 24 }}>Welcome Back!</Text>
                            <Text style={{ fontFamily: 'Poppins_400Regular', color: '#585858', fontSize: 13, marginRight: 14, marginTop: 4 }}>Login to your account</Text>
                        </View>



                        <View style={[styles.iddiv, { marginTop: 130 }]} >
                            {/* <Shadow
                        viewStyle={styles.shadow}
                        startColor="#FFFFFF"
                        finalColor="#B69D9D"
                        offset={[0, 0]}
                        > */}

                            <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', width: '100%', top: 5 }}>
                                {/* <Bd_flag width={'12%'} height={20} style={{width:'15%',top:0}}/> */}

                                <Entypo style={{ paddingLeft: 8, paddingRight: 4 }} name="mobile" size={22} color="#8A8F90" />

                                <View style={{ width: '85%' }}>
                                    <TextInput

                                        autoFocus={true}
                                        style={[styles.idinput, { borderColor: passwordcheck == true || successNumber == true ? colors.ash1 : colors.red, borderBottomWidth: 0, paddingLeft: 10 }]}
                                        placeholder={testCredentials.lan ? "Number" : "আপনার ফোন নাম্বার দিন"}
                                        onChangeText={newText => { setPhone(newText); }}
                                        defaultValue={phone == "00" ? "" : phone}
                                        keyboardType="numeric"
                                        maxLength={11}
                                    />

                                </View>
                            </View>


                            {/* </Shadow> */}
                        </View>

                        {/* <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',left:10,display: successNumber == true  ? 'none' : 'flex',top:20}}>
                                        
                            <Text style={{color: colors.red,fontSize:14,top:5,paddingBottom:3,display : lan ? 'flex' : 'none',fontFamily: 'Poppins_400Regular'}}>Incorrect phone number<Text style={{color:colors.red}}></Text></Text>
                            
                        </View> */}


                        <View style={[styles.passdiv, { marginTop: 20 }]}>

                            <View style={styles.inputContainer}>
                                <Fontisto style={{ paddingLeft: 3, paddingRight: 4 }} name="locked" size={22} color="#8A8F90" />
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



                            {/* <View style={{justifyContent:'flex-start',}}>
                            <OTPTextInput
                            autoFocus={false}
                            // autoFocusOnLoad={false}
                            // autoFocusOnLoad={false} 
                            handleTextChange= {value => setPass(value)}
                            tintColor={'#06CD9E'}
                            textInputStyle={{borderWidth:1,backgroundColor:'#fff',fontSize:25}}
                            containerStyle={{justifyContent:'flex-start'}}
                            secureTextEntry={true}
                            inputCount={4}
                             
                            />

                        </View> */}


                        </View>



                        <View style={{ top: -90, marginBottom: 5, width: '95%', height: 38, borderColor: colors.ash2, borderWidth: 0, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: wrong ? "flex" : "none", paddingLeft: 20 }}>
                            <Text style={{ marginLeft: 0, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, color: colors.red }}>Incorrect number or pin.</Text>
                        </View>




                        {/* <View style={[styles.passdiv,{paddingTop:20}]}>
                        <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',left:10}}>
                            <Text style={{color: passwordcheck ? colors.ash : colors.ash,fontSize:14,paddingBottom:5,display : lan ? 'none' : 'flex',fontWeight:'bold'}}>পাসওয়ার্ড</Text>
                            <Text style={{color: passwordcheck ? colors.ash : colors.ash,fontSize:14,paddingBottom:5,display : lan ? 'flex' : 'none',fontWeight:'bold'}}>PIN <Text style={{color:colors.red}}>*</Text></Text>
                        </View>
                        
                        <TextInput 
                            style={[styles.idinput,{borderColor: passwordcheck == true  || emptypassword == true  ? colors.ash1 : colors.red , borderBottomWidth: 1}]}  
                            secureTextEntry={true} 
                            placeholder="Enter your password"
                            onChangeText={newText => { setPass(newText); }}
                            defaultValue={pass}
                            keyboardType="numeric"
                            maxLength={4}
                        />
                        <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',left:10,display:  emptypassword ? 'none' : 'flex'}}>
                                
                            <Text style={{color: colors.red,fontWeight:'700',fontSize:14,paddingBottom:3,display : lan ? 'flex' : 'none'}}>Incorrect Pin<Text style={{color: colors.red,fontWeight:'400'}}> (Pin must be 4 digit)</Text><Text style={{color:colors.red}}></Text></Text>
                                    
                        </View>

                        <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',left:10,display: passwordcheck ? 'none' : 'flex',marginTop:10}}>
                                
                            <Text style={{color: colors.red,fontWeight:'700',fontSize:14,paddingBottom:3,display : lan ? 'flex' : 'none'}}>Incorrect Number or Pin</Text>
                        
                        </View>
                    </View> */}




                        <Pressable disabled={submitFlag ? false : true} style={[styles.tuchabluebutton, { backgroundColor: isLoading3 == true || submitFlag == false ? colors.ash : '#EE426D', flexDirection: 'row' }]} onPress={() => { setLoading3(true), postUser(phone, pass); }}>
                            <ActivityIndicator size="small" color="#00263C" style={{ display: isLoading1 ? 'flex' : 'none', right: 30 }} />

                            <Text style={{ fontFamily: 'Poppins_400Regular', color: colors.white, fontSize: 14, display: testCredentials.lan ? 'none' : 'flex' }}>লগ ইন</Text>
                            <Text style={{ fontFamily: 'Poppins_400Regular', color: colors.white, fontSize: 12, display: testCredentials.lan ? 'flex' : 'none', letterSpacing: 2 }}>Login</Text>
                        </Pressable>

                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', bottom: 10, top: -40 }}>
                            <Text style={{ textDecorationLine: 'underline', color: colors.ash, bottom: 0, fontSize: 15, fontWeight: '400', display: testCredentials.lan ? 'none' : 'flex' }} onPress={() => ForgetPass(phone)}>পিন ভুলে গেছেন?</Text>
                            <Text style={{ textDecorationLine: 'underline', color: '#2929D1', fontSize: 12, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }} onPress={() => ForgetPass(phone)}>FORGOT PIN?</Text>
                        </View>

                        <View style={{ flexDirection: "row", top: -35 }}>
                            <Text style={{ fontFamily: 'Poppins_400Regular', color: '#585858', fontSize: 13, marginRight: 10 }}>Don’t have account?</Text>


                            <Pressable activeOpacity={4} style={{}}
                                onPress={() => navigation.navigate("Signup", { getflag: true, lan: lan })}
                            >

                                <Text style={{ textDecorationLine: 'underline', fontFamily: 'Poppins_400Regular', color: '#2929D1', fontSize: 13 }}>Register</Text>
                            </Pressable>
                        </View>






                        {/* <Pressable  style={[styles.tuchabluebutton,{backgroundColor: isLoading2 == true ? colors.ash : colors.oranget,flexDirection:'row',width:'80%',top:-20}]} onPress={() => {setLoading2(true),postGuestUser()}}>
                        <ActivityIndicator size="small" color="#00263C" style={{display: isLoading2  ? 'flex' : 'none',right:30}}/>
                        
                        <Text style={{fontFamily: 'Poppins_400Regular',color:colors.white,fontSize:14,display : testCredentials.lan ? 'none' : 'flex'}}>লগ ইন</Text> 
                        <Text style={{fontFamily: 'Poppins_400Regular',color:colors.white,fontSize:12,display : testCredentials.lan ? 'flex' : 'none',letterSpacing:2}}>LOG IN AS A GUEST</Text> 
                    </Pressable> */}

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


                        </View>


                    </View>



                    {/* <View style={{marginBottom:5,width:'95%',height:38,borderColor:'#D50400',borderWidth:1,borderRadius:3,justifyContent:'flex-start',alignItems:'center',flexDirection:'row',display: nointernet ? "flex" : "none"}}>
            <Text style={{marginLeft:15,fontSize:12,fontWeight:'700',color:"#D50400"}}>No Internet Connection.</Text>
        </View> */}

                </ImageBackground>

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

    idinput: {
        width: "95%",
        height: 45,
        // backgroundColor:colors.white1,

        padding: 10,
        borderRadius: 4,
        fontSize: 14,
        paddingLeft: 0,
    },

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
        bottom: 60,
        width: "65%",
        height: 45,
        borderRadius: 4,
        backgroundColor: "#488291",
        justifyContent: "center",
        alignItems: 'center',

    },
    shadow: {
        alignSelf: 'stretch',
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

export default Login;