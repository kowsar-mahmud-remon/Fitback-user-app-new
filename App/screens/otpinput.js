import React, { useState, useEffect, useRef, useContext } from 'react';
// import axios from 'axios';
import { Animated, ActivityIndicator, Alert, StyleSheet, Text, View, ImageBackground, SafeAreaView, Platform, StatusBar, Image, Button, TextInput, Pressable, Keyboard } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import colors from '../config/colors';

// import { registerIndieID } from 'native-notify';
import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";

//asyn-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credential context
import { CredentialsContext } from '../../components/CredintailsContext';
import { UserContext } from '../../components/CredintailsContext';
// import {CountDownText} from 'react-native-countdown-timer-text';


function Otpinput({ navigation, route }) {
    const currentTime = new Date().toISOString();

    const { authtoken, setAuthtoken } = useContext(UserContext);
    const [markerPosition, setMarkerPosition] = useState({
        latitude: 23.811056,
        longitude: 90.407608,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });


    const { noficationtoken, setNoficationtoken } = useContext(UserContext);
    const [getMylocation, setGetMylocation] = useState(true);



    const [date, setDate] = useState(new Date());
    const [todayDatetest, setTodayDatetest] = useState(String(date.getFullYear() + '/' + (date.getMonth() + 1).toString().padStart(2, "0") + '/' + date.getDate().toString().padStart(2, "0")));

    const [otp, setOtp] = useState("00");
    const [username, setUsername] = useState(route.params.username);
    const [number, setNumber] = useState(route.params.number);
    const [password, setPassword] = useState(route.params.password);
    const [sendedOTP, setSendedOTP] = useState(null);
    const [userid, setUserid] = useState(route.params.userid);
    const [nointernet, setNointernet] = useState(false);
    const [isLoading1, setLoading1] = useState(false);
    const [signupflag, setSignupflag] = useState(route.params.signupflag);
    const [postbysignup, setPostbysignup] = useState(route.params.postbysignup);
    const [otptime, setOtptime] = useState(true);
    const [message, setMessage] = useState();
    const [submitFlag, setSubmitFlag] = useState(false);
    const [otpflag, setotpflag] = useState(true);
    const [otpflagempt, setotpflagempt] = useState(true);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const [getpromo, setGetpromo] = useState(true);

    const [success, setSuccess] = useState(false);

    const [getqmoney, setGetqmoney] = useState(null);

    const [myreferralcode, setMyreferralcode] = useState("");

    const [postflag, setPostflag] = useState(route.params.postflag);

    const [refercode, setRefercode] = useState(route.params.refercode);

    const [referuserid, setReferuserid] = useState(null);
    const [refererNewQmoney, setRefererNewQmoney] = useState(null);
    const [refererNewCoin, setRefererNewCoin] = useState(null);
    const [referername, setReferername] = useState(null);
    const [refererphonenumber, setRefererphonenumber] = useState(null);


    const [allUser, setAllUser] = useState([]);
    //context
    const { storeCredentials, setStoreCredentials } = useContext(CredentialsContext);
    const { testCredentials, setTestCredentials } = useContext(UserContext);
    const [lan, setLan] = useState(true);

    const [referflag, setReferflag] = useState(false);



    const [seconds, setSeconds] = useState(60); // Initial countdown time
    const [showCountdown, setShowCountdown] = useState(true);

    useEffect(() => {
        let timer;

        if (showCountdown && seconds > 0) {
            timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else {
            // Countdown finished, hide the countdown and show the restart button
            setShowCountdown(false);
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [showCountdown, seconds]);

    const restartCountdown = () => {
        setSeconds(60); // Reset the countdown to 60 seconds
        setShowCountdown(true); // Show the countdown
    };


    const fadeIn1 = (newid, newname, newnumber) => {


        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
        }).start(() => {
            let x = parseInt(newid);

            // setMyreferralcode(x < 10 ? ('QA-0000'+newid) : x < 100 &&  x >= 10 ? ('QA-000'+newid) : x < 1000 &&  x >= 100 ? ('QA-00'+newid) : x < 10000 &&  x >= 1000 ? ('QA-0'+newid) : ('QA-'+newid)) 

            const requestOptions1 = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                body: JSON.stringify({
                    myreferralcode: x < 10 ? ('QA-0000' + newid) : x < 100 && x >= 10 ? ('QA-000' + newid) : x < 1000 && x >= 100 ? ('QA-00' + newid) : x < 10000 && x >= 1000 ? ('QA-0' + newid) : ('QA-' + newid),
                })
            };

            fetch('https://qwikit1.pythonanywhere.com/userProfile/' + newid, requestOptions1)
                .then((response) => response.json())
                .then((json) => {
                    // setNointernet(false)       
                })
                .catch((error) => {
                    // setNointernet(true)

                });

            const requestOptions3 = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                body: JSON.stringify({
                    userid: newid,
                    name: newname,
                    phonenumber: newnumber,
                    details: "SIGNUP BONUS",
                    qcoin: String(parseInt(getqmoney) * 100),
                    datetime: todayDatetest

                })
            };

            fetch('https://qwikit1.pythonanywhere.com/referralHistory/new', requestOptions3)
                .then((response) => response.json())
                .then((json) => {


                })
                .catch((error) => {
                    setLoading1(false);

                    console.error(error);

                    setNointernet(true);

                });

            if (referflag) {

                const requestOptions2 = {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                    body: JSON.stringify({
                        qmoney: refererNewQmoney,
                        qcoins: refererNewCoin,
                    })
                };

                fetch('https://qwikit1.pythonanywhere.com/userProfile/' + referuserid, requestOptions2)
                    .then((response) => response.json())
                    .then((json) => {
                        // setNointernet(false)       
                    })
                    .catch((error) => {
                        // setNointernet(true)

                    });

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                    body: JSON.stringify({
                        userid: referuserid,
                        name: referername,
                        phonenumber: refererphonenumber,
                        details: "REFERRAL BONUS",
                        qcoin: "4000",
                        datetime: todayDatetest

                    })
                };

                fetch('https://qwikit1.pythonanywhere.com/referralHistory/new', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {


                    })
                    .catch((error) => {
                        setLoading1(false);

                        console.error(error);

                        setNointernet(true);

                    });



            }


            // persistUser({userid:newid,notify:false,lan:true,cartbuy: testCredentials.cartbuy ,cartrent: testCredentials.cartrent,productsave: testCredentials.productsave,flatsave: testCredentials.flatsave})

            persistUser({ userid: newid, notify: false, lan: true, raddress: getpromoimg, cartbuy: testCredentials.cartbuy, cartrent: getProductdatapush, productsave: testCredentials.productsave, flatsave: getProductdata2push });


            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                body: JSON.stringify({
                    noficationtoken: noficationtoken,
                })
            };

            fetch('https://qwikit1.pythonanywhere.com/userProfile/' + newid, requestOptions)
                .then((response) => response.json())
                .then((json) => {



                })
                .catch((error) => {


                });

            persistLogin({ userid: newid, lan: true });

            navigation.navigate("Homepage", {});



        });
    };




    if (route.params.repassflag) {
        navigation.navigate("Repassword", { userid: route.params.userid, lan: lan, postflag: postflag, postbysignup: postbysignup });
    }



    const Alldiscount = () => {

        if (getpromo) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            };

            fetch('https://qwikit1.pythonanywhere.com/companyContacts', requestOptions)
                .then((response) => response.json())
                .then((json) => {



                    json.map((item, index) => {
                        if (item.name == "qmoney") {
                            setGetqmoney(item.qmoney);
                        }
                    });

                })
                .catch((error) => {
                    console.error(error);

                    setLoading1(false);

                });

            setGetpromo(false);
        }
    };







    const axios = require('axios');


    const [getUser, setgetUser] = useState(true);

    Math.random();

    const GetMyalluser = () => {
        // console.log("hitnow")
        // if(getUser == true && route.params.otpflag == true)
        if (getUser) {


            if (signupflag == true) {
                // console.log("*****************************")
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                fetch('https://qwikit1.pythonanywhere.com/userProfile', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        setLoading1(false);
                        // setAllUser(json)
                        setNointernet(false);
                        let x = "zero";
                        json.map((value) => {

                            // console.log("##########################")
                            if (value.phonenumber == number) {
                                x = "booked";
                                // console.log("###########booked#########")
                                // navigation.navigate("UserLandingPage")
                                navigation.navigate("Homepage");

                            }
                            if (value.myreferralcode == refercode) {
                                setReferuserid(value.id);
                                setRefererNewQmoney(parseInt(value.qmoney) + 40);
                                setRefererNewCoin(parseInt(value.qcoins) + 4000);
                                setReferername(value.name);
                                setRefererphonenumber(value.phonenumber);
                                setReferflag(true);
                            }

                        });
                        if (x == "zero") {
                            // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!")
                            var theRandomNumber = Math.floor(Math.random() * (9999 - 1000)) + 1000;
                            setSendedOTP(theRandomNumber);
                            // console.log(theRandomNumber);   



                            let msg = theRandomNumber + " is your FitBack OTP";


                            const greenwebsms = 'token=97681508331739696913f08cdf73b133c59841ca922ba99a026a&to=' + number + '&message=' + msg;

                            axios.post('https://api.bdbulksms.net/api.php?json', greenwebsms).then(response => {

                                // console.log(response)

                                const requestOptions = {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                                    body: JSON.stringify({
                                        successnumber: number,
                                        otp: theRandomNumber,

                                    })
                                };

                                fetch('https://qwikit1.pythonanywhere.com/otpCheck/new', requestOptions)
                                    .then((response) => response.json())
                                    .then((json) => {
                                        setNointernet(false);
                                        console.log("All ok 11");
                                    })
                                    .catch((error) => {
                                        setNointernet(true);
                                        console.log("Not ok 11");
                                    });


                            })
                                .catch((error) => {


                                    setLoading1(false);

                                    setNointernet(true);

                                    const requestOptions = {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                                        body: JSON.stringify({
                                            failnumbers: number,
                                            otp: theRandomNumber,

                                        })
                                    };

                                    fetch('https://qwikit1.pythonanywhere.com/otpCheck/new', requestOptions)
                                        .then((response) => response.json())
                                        .then((json) => {
                                            setNointernet(false);
                                        })
                                        .catch((error) => {
                                            setNointernet(true);
                                        });

                                    console.error(error);

                                });
                            // console.log(greenwebsms);
                            // console.log(theRandomNumber)


                        }

                    })
                    .catch((error) => {
                        console.error(error);
                        setLoading1(false);
                        // console.log("went wrong")

                        setNointernet(true);

                    });


            }

            if (route.params.forgetpass || route.params.changenumber) {

                var theRandomNumber = Math.floor(Math.random() * (9999 - 1000)) + 1000;
                setSendedOTP(theRandomNumber);
                // console.log(theRandomNumber);     

                let msg = theRandomNumber + " is your FitBack OTP";

                const greenwebsms = '97681508331739696913f08cdf73b133c59841ca922ba99a026a' + number + '&message=' + msg;
                axios.post('https://api.bdbulksms.net/api.php?json', greenwebsms).then(response => {
                    // console.log(response.json)
                    setNointernet(false);
                    console.log("All ok");
                })
                    .catch((error) => {
                        setLoading1(false);
                        // console.log("went wrong")
                        console.error(error);
                        setNointernet(true);
                        console.log("Not ok");

                    });
                // console.log(greenwebsms);
                // console.log(theRandomNumber)


            }

            setgetUser(false);
        }

        setgetUser(false);


    };



    const Varify = () => {
        setotpflagempt(true);
        setotpflag(true);

        if (otp != null && otp == sendedOTP) {


            if (route.params.forgetpass) {
                setLoading1(false);
                navigation.navigate("Repassword", { userid: route.params.userid, lan: lan, postflag: postflag, postbysignup: postbysignup });


            }

            else {

                const updatedFCoinData =
                    [{
                        fCoin: 1100,
                        details: "Sign Up Bonus",
                        timestamp: currentTime
                    }];

                const updatedFCoin = 1100;

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                    body: JSON.stringify({
                        name: username,
                        phonenumber: number,
                        password: password,
                        // qmoney: getqmoney,
                        // qcoins: parseInt(getqmoney) * 100,
                        opendate: todayDatetest,
                        // initlongitude: markerPosition.longitude,
                        // initlatitude: markerPosition.latitude,
                        fcoindata: updatedFCoinData,
                        fcoins: updatedFCoin


                    })
                };

                fetch('https://qwikit1.pythonanywhere.com/userProfile/new', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        // console.log('create user', json);
                        setLoading1(false);


                        // console.log(json.id)


                        // persistUser({userid:json.id,lan:true,cartbuy: testCredentials.cartbuy ,cartrent: testCredentials.cartrent,productsave: testCredentials.productsave,flatsave: testCredentials.flatsave})

                        // persistLogin({userid:json.id,lan:lan})

                        // setMyreferralcode(parseInt(json.id) < 10 ? ('QA-0000'+String(json.id)) : parseInt(json.id) < 100 &&  parseInt(json.id) >= 10 ? ('QA-000'+String(json.id)) : parseInt(json.id) < 1000 &&  parseInt(json.id) >= 100 ? ('QA-00'+String(json.id)) : parseInt(json.id) < 10000 &&  parseInt(json.id) >= 1000 ? ('QA-0'+String(json.id)) : ('QA-'+String(json.id))) 


                        setSuccess(true);

                        // registerIndieID(`${json.id}`, 6383, 'CrsbZIYbqTCzQGe76Ek15O');

                        // axios.post(`https://app.nativenotify.com/api/indie/notification`, {     
                        //     subID: `${json.id}`,  
                        //     appId: 6383, 
                        //     appToken: 'CrsbZIYbqTCzQGe76Ek15O', 
                        //     title: 'put your push notification title here as a string',
                        //     message: 'put your push notification message here as a string',
                        //     pushData: { yourProperty: "yourPropertyValue" }
                        // });


                        fadeIn1(json.id, json.name, json.phonenumber);
                        // postflag ? navigation.navigate("UserLandingPage",{postflag:postflag}) : navigation.navigate("UserLandingPage",{})


                    })
                    .catch((error) => {
                        setLoading1(false);

                        console.error(error);

                        setNointernet(true);

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


    const [getpromo1, setGetpromo1] = useState(true);

    const [getpromoimg, setGetpromoimg] = useState([]);


    const Promoimage = () => {

        if (getpromo1) {

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
                        setLoading1(false);
                    });

                })
                .catch((error) => {
                    console.error(error);

                    setLoading1(false);

                });



            setGetpromo1(false);
        }
    };

    const [getDoctorinfo, setGetDoctorinfo] = useState(true);

    const [getProduct2, setGetProduct2] = useState(true);
    const [getProductdata, setGetProductdata] = useState([]);
    const [getProductdatapush, setGetProductdatapush] = useState([]);


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

                                if (parseInt(item.experience) <= 10) {

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
            setLoading1(false);
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

                fetch('https://qwikit1.pythonanywhere.com/product', requestOptions)
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
                        setLoading1(false);
                    });



                setGetProduct2(false);

            }

            // console.log("hit");
        }
        catch (error) {
            console.error(error);
            setLoading1(false);
        }

        finally {


        }



    };



    const handleMessage = (message) => {
        setMessage(message);
        // setMessageType(type)
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
                // navigation.navigate("MyflatDetails",{newflat:true,forrentadd:true})
                // postbysignup ?: navigation.navigate("UserLandingPage",{postflag:postflag})

            })
            .catch((error) => {
                // console.log(error)
                handleMessage('persisting login failed');
            });
    };


    useEffect(() => {

        // console.log(getProductdata2push)
        // console.log(getProductdatapush)
        // console.log(getpromoimg)

        GetMyalluser();
        Alldiscount();

        ProductInfo2();
        // Promoimage()
        DoctorInfo1();

        // console.log("myreferralcode",myreferralcode)

        if (otp.length == 4) {
            setSubmitFlag(true);
        }
        else {
            setSubmitFlag(false);

        }




        //     RNOtpVerify.getHash().then(console.log).catch(console.log);

        //     RNOtpVerify.getOtp()
        //     .then(p => RNOtpVerify.addListener(otpHandler))
        //     .catch(p => console.log(p));
        //     },[])

        //     const otpHandler = message => {
        //         const lOtp = /(\d{4})/g.exec(message)[1];
        //         setOtp(lOtp);
        //         RNOtpVerify.removeListener();
        //         Keyboard.dismiss();

        // if(otp != null && otp == sendedOTP)
        // {


        //     if(route.params.forgetpass)
        //     {
        //         setLoading1(false)

        //         navigation.navigate("Repassword",{userid:route.params.userid,lan:lan,postflag:postflag,postbysignup:postbysignup})

        //     }

        //     else{


        //                 const requestOptions = {
        //                     method: 'POST',
        //                     headers: { 'Content-Type': 'application/json','Accept': 'application/json', 'Authorization': authtoken },
        //                     body: JSON.stringify({ 
        //                         name:username,
        //                         phonenumber: number,
        //                         password: password,
        //                         qmoney: getqmoney
        //                     })
        //                 };

        //                 fetch('https://qwikit1.pythonanywhere.com/userProfile/new', requestOptions)
        //                 .then((response) => response.json())
        //                 .then((json) => {
        //                     console.log('create user', json.id);
        //                     setLoading1(false)
        //                     setNointernet(false)


        //                     // postflag ? navigation.navigate("UserLandingPage",{postflag:postflag}) : navigation.navigate("UserLandingPage",{})
        //                     // setSuccess(true)

        //                     fadeIn1(json.id)



        //                 })
        //                 .catch((error) => {
        //                     setNointernet(true)
        //                     setLoading1(false)

        //                 console.error(error);



        //                 });




        //     }
        // }


    });



    return (
        <SafeAreaView style={styles.MainContainer}>
            <StatusBar
                animated={true}
                backgroundColor="#303030"
            />
            {/* <ImageBackground source={require("../assets/backgrounimg.jpg")} style={{width:'100%',height:'100%',flex:1}}> */}
            <View
                // style={{ height: '100%', width: '100%' }}
                style={{ position: 'absolute', width: '100%', justifyContent: 'flex-end' }}
            >
                <ImageBackground
                    // source={require("../assets/bg_no_logo_big.jpg")} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    style={{ width: '100%', height: '100%', flex: 1 }}
                >
                    {/* <LogoText width={120} height={100} style={{bottom: 50,display: success ? 'none' : 'flex'}}/> */}

                    {/* <Image
                    style={{ width: 170, height: 150 ,bottom: 10,display: success ? 'none' : 'flex'}}
                    resizeMode='contain'
                    source={require('../assets/logo_with_text.jpg')}
                    // source={{uri: "http://drive.google.com/uc?export=view&id=1Aomuqg51XB28iZOa7vDOp_RzwI6cW9tk"}}
                /> */}

                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 30, display: success ? 'none' : 'block' }}>

                        <Text style={{ fontWeight: "700", fontFamily: 'Poppins_500Medium', color: '#EE426D', fontSize: 26 }}>Verification</Text>
                        <Text style={{ fontFamily: 'Poppins_500Medium', color: '#585858', fontSize: 14, marginRight: 14, marginTop: 8 }}>We have sent you an activation code.</Text>
                        <Text style={{ fontFamily: 'Poppins_400Regular', color: '#8A8F90', fontSize: 13, marginRight: 14, marginTop: 4 }}>A SMS has been sent to your Mobile</Text>
                        <Text style={{ fontFamily: 'Poppins_400Regular', color: '#8A8F90', fontSize: 13, marginRight: 14, marginTop: 1 }}>number containing a code to reset</Text>
                        <Text style={{ fontFamily: 'Poppins_400Regular', color: '#8A8F90', fontSize: 13, marginRight: 14, marginTop: 1 }}>your Pin</Text>
                    </View>

                    <View style={[styles.navbar]}>
                        <Text style={{ left: 55, top: 17, color: colors.black, fontSize: 14, paddingBottom: 3, display: lan ? 'none' : 'flex', fontWeight: 'bold' }} >নতুন পাসওয়ার্ড</Text>
                        <Text style={{ left: 55, top: 17, color: colors.black, fontSize: 14, paddingBottom: 3, display: lan ? 'flex' : 'none', fontWeight: 'bold' }} ></Text>

                    </View>

                    <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', bottom: 50, marginTop: 30, top: 0, display: success ? 'none' : 'flex' }}>


                        <Text style={{ color: colors.black, fontWeight: '400', fontSize: 14, bottom: 40, display: lan ? 'none' : 'flex' }}>অনুগ্রহ করে পাঠানো OTP লিখুন</Text>
                        <Text style={{ color: colors.ash, fontSize: 12, bottom: 40, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_500Medium' }}>Please enter the OTP we just sent you to</Text>
                        <Text style={{ color: colors.ash, fontSize: 12, bottom: 33, fontFamily: 'Poppins_500Medium' }}>01{number.slice(2, 3)}*****{number.slice(8, 11)}</Text>

                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', top: 0 }}>
                            {/* <OTPTextInput
                       handleTextChange= {value => setOtp(value)}
                       tintColor={otpflag == false || otpflagempt == false ? 'red' : "#2FD9DF"}
                       
                    /> */}
                            <OTPTextInput
                                handleTextChange={value => setOtp(value)}
                                // tintColor={colors.ash1}
                                tintColor={otpflag == false || otpflagempt == false ? 'red' : "#EE426D"}
                                textInputStyle={{ borderWidth: 1, backgroundColor: '#fff', fontSize: 25 }}
                                containerStyle={{ justifyContent: 'flex-start' }}
                                // secureTextEntry={true}
                                inputCount={4}
                            />


                        </View>

                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', top: 10 }}>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', left: 0, display: otpflagempt ? 'none' : 'flex' }}>

                                <Text style={{ color: colors.red, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Incorrect OTP<Text style={{ color: colors.red }}></Text></Text>

                            </View>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', left: 0, display: otpflag ? 'none' : 'flex' }}>

                                <Text style={{ color: colors.red, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Enter your OTP<Text style={{ color: colors.red }}></Text></Text>

                            </View>
                        </View>




                        <Pressable disabled={submitFlag ? false : true} style={[styles.tuchabluebutton, { marginTop: 50, top: 40, backgroundColor: isLoading1 || submitFlag == false ? colors.ash : '#EE426D', flexDirection: 'row' }]} onPress={() => { setLoading1(true), Varify(); }}>
                            <ActivityIndicator size="small" color="#00263C" style={{ display: isLoading1 ? 'flex' : 'none', right: 30 }} />

                            <Text style={{ color: colors.white, fontSize: 14, fontWeight: '400', display: lan ? 'none' : 'flex' }}>যাচাই করুন</Text>
                            <Text style={{ color: colors.white, fontSize: 12, fontFamily: 'Poppins_500Medium', display: lan ? 'flex' : 'none' }}>VERIFY CODE</Text>
                        </Pressable>




                        <View style={{ flexDirection: 'row', marginTop: 50 }}>


                            {/* <CountDownText
                            style={{color: '#F06FC5' ,fontWeight:'600',fontSize:15,top:30,left:5,display: otptime ? 'flex':'none'}}
                            countType='seconds'
                            auto={true}
                            afterEnd={() => setOtptime(false)}
                            timeLeft={59}
                            step={-1}
                            startText='Start'
                            endText='Resend'
                            intervalText={(sec) =>'00:' +sec}
                        /> */}
                            {/* <Pressable style={[styles.tuchabluebutton,{backgroundColor:'#4C65CB',fontSize:14,top:26,left:15,bottom:0,width:'30%',height:30,display: otptime ? 'none':'flex'}]} onPress={()=> {setgetUser(true),setOtptime(true)}}>
                            <Text style={{color:colors.white ,fontWeight:'400',fontSize:14,display : lan ? 'none' : 'flex'}}>পুনরায় পাঠান</Text>
                            <Text style={{color:colors.white ,fontWeight:'400',fontSize:14,display : lan ? 'flex' : 'none'}}>Resend</Text>
                        </Pressable> */}


                            {showCountdown ? (
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: colors.black, fontFamily: 'Poppins_400Regular', fontSize: 14, top: 30, display: lan ? 'none' : 'flex' }}>পুনরায় ওটিপি পাঠান?</Text>
                                    <Text style={{ color: '#00646B', fontFamily: 'Poppins_400Regular', fontSize: 12, top: 30, display: lan ? 'flex' : 'none' }}>Didn't receive the code? Resend code in</Text>
                                    <Text style={{ color: colors.orange, fontFamily: 'Poppins_400Regular', fontSize: 14, top: 28, display: lan ? 'flex' : 'none' }}>    00:{seconds}s</Text>
                                </View>
                            ) : (
                                <View style={{ flexDirection: 'row', left: 10 }}>
                                    <View style={{ flexDirection: 'row', marginTop: 60, top: 5, width: "55%", left: 20 }}>
                                        <Text style={{ color: colors.black, fontFamily: 'Poppins_400Regular', fontSize: 12, display: lan ? 'none' : 'flex' }}>পুনরায় ওটিপি পাঠান?</Text>
                                        <Text style={{ color: '#00646B', fontFamily: 'Poppins_400Regular', fontSize: 12, display: lan ? 'flex' : 'none' }}>Didn't receive the code?</Text>

                                    </View>

                                    <Pressable style={[styles.tuchabluebutton, { top: 60, backgroundColor: "#EE426D", flexDirection: 'row', width: "35%", height: 30 }]} onPress={() => { restartCountdown(), setgetUser(true), setOtptime(true); }}>
                                        <ActivityIndicator size="small" color="#00263C" style={{ display: isLoading1 ? 'flex' : 'none', right: 30 }} />

                                        <Text style={{ color: colors.white, fontSize: 11, fontFamily: 'Poppins_400Regular', display: lan ? 'none' : 'flex' }}>Resend Code</Text>
                                        <Text style={{ color: colors.white, fontSize: 11, fontFamily: 'Poppins_400Regular', display: lan ? 'flex' : 'none' }}>RESEND CODE</Text>
                                    </Pressable>

                                </View>
                            )}


                        </View>

                        {/* <View style={{flexDirection:'row',display: otptime ? 'none' : 'flex',marginTop:60,top:20}}>
                        <Text style={{color:colors.black ,fontFamily: 'Poppins_400Regular',fontSize:12,top:30,display : lan ? 'none' : 'flex'}}>পুনরায় ওটিপি পাঠান?</Text>
                        <Text style={{color:'#00646B' ,fontFamily: 'Poppins_400Regular',fontSize:12,top:30,display : lan ? 'flex' : 'none'}}>Didn't receive the code?</Text>

                    </View>

                    <Pressable disabled={submitFlag ? false : true}  style={[styles.tuchabluebutton,{top:60,backgroundColor: "#3A78F3" ,flexDirection:'row',display: otptime ? 'none':'flex',width:"50%"}]} onPress={()=> {setgetUser(true),setOtptime(true)}}>
                        <ActivityIndicator size="small" color="#00263C" style={{display: isLoading1  ? 'flex' : 'none',right:30}}/>
                        
                        <Text style={{color:colors.white,fontSize:12,fontFamily: 'Poppins_400Regular',display : lan ? 'none' : 'flex'}}>Resend Code</Text> 
                        <Text style={{color:colors.white,fontSize:12,fontFamily: 'Poppins_400Regular',display : lan ? 'flex' : 'none'}}>RESEND CODE</Text> 
                    </Pressable> */}


                    </View>

                    <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', bottom: 70, display: success ? 'flex' : 'none' }}>

                        {/* <SuccessFull width={60} height={60}/> */}

                        <SvgUri
                            width="60"
                            height="60"
                            // style={{marginTop:80}} 
                            uri="http://drive.google.com/uc?export=view&id=1BzHhSffwzfRnWbax7q4nP06kJQBYFETx"

                        />

                        <Text style={{ color: colors.ash, fontSize: 18, marginTop: 30, fontFamily: 'Poppins_500Medium' }}>Registration Complete.</Text>

                        <Text style={{ color: colors.ash, fontSize: 18, marginTop: 10, fontFamily: 'Poppins_500Medium' }}>Thank You.</Text>


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
        width: "65%",
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


export default Otpinput;