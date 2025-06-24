import React, { useState, useRef, useEffect, useContext } from 'react';
import { ActivityIndicator, ImageBackground, Alert, Animated, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Dimensions } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";


import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import { UserContext } from '../../components/CredintailsContext';

//asyn-storage
import AsyncStorage from '@react-native-async-storage/async-storage';



function MedRequest({ navigation, route }) {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.delay(1000), // Wait before next bounce
            ])
        ).start();
    }, []);

    const [unread, setUnread] = useState(false);

    const [getnotify, setGetnotify] = useState(true);
    const { authtoken, setAuthtoken } = useContext(UserContext);
    const [rqstid, setRqstid] = useState(null);
    const [successorder, setSuccessorder] = useState(false);


    const { testCredentials, setTestCredentials } = useContext(UserContext);
    const [userid, setUserid] = useState(testCredentials.userid);

    const [getUserTwo, setgetUserTwo] = useState(true);
    const [userData, setUserData] = useState();

    const UserInfoTwo = () => {

        if (getUserTwo) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            };

            fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    setUserData(json);


                })
                .catch((error) => {
                    console.error(error);
                    setNointernet(true);
                    setLoading1(false);

                });

            setgetUserTwo(false);
        }
    };

    UserInfoTwo();



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


            }

            // console.log("hit");
        }
        catch (error) {

        } finally {

        }



        setGetnotify(false);


    };

    const [Name, setName] = useState(route.params.Name);
    console.log("name", Name);
    const [phone, setphone] = useState(route.params.phone);

    const [submit, setSubmit] = useState(false);

    const [submit1, setSubmit1] = useState(false);
    const [submit2, setSubmit2] = useState(false);
    const [submit3, setSubmit3] = useState(false);

    const options = [
        { label: 'To Buy', value: 'buy' },
        { label: 'To Rent', value: 'rent' },
    ];

    const [images, setImages] = useState([]);
    // const [Maindata,setMaindata]=useState(storeData);
    // const[flatid,setFlatid]= useState(route.params.flatid)



    const [isLoading1, setLoading1] = useState(false);
    const [lan, setLan] = useState(true);

    const [cartbuy, setCartbuy] = useState(testCredentials.cartbuy);
    const [notify, setNotify] = useState(testCredentials.notify);
    const { noficationtoken, setNoficationtoken } = useContext(UserContext);

    const [nointernet, setNointernet] = useState(false);

    const [indications, setIndications] = useState(false);
    const [adultdose, setAdultdose] = useState(false);
    const [childdose, setChilddose] = useState(false);
    const [renaldose, setRenaldose] = useState(false);
    const [administration, setAdministration] = useState(false);
    const [contraindications, setContraindications] = useState(false);
    const [sideeffects, setSideeffects] = useState(false);
    const [precautionswarnings, setPrecautionswarnings] = useState(false);
    const [pregnancy, setPregnancy] = useState(false);
    const [therapeuticclass, setTherapeuticclass] = useState(false);
    const [modeofaction, setModeofaction] = useState(false);
    const [interaction, setInteraction] = useState(false);

    const [medicinename, setMedicinename] = useState("00");
    const [manufacturer, setManufacturer] = useState("00");
    const [additional, setAdditional] = useState("  ");

    const [additional1, setAdditional1] = useState("  ");

    const [additional2, setAdditional2] = useState("  ");

    const [additional3, setAdditional3] = useState("  ");

    const [opt, setOp] = useState(true);
    const [opt1, setOp1] = useState(false);
    const [opt2, setOp2] = useState(false);
    const [opt3, setOp3] = useState(false);

    const OnpressOpt = () => {
        setOp(true);
        setOp1(false);
        setOp2(false);
        setOp3(false);


    };

    const OnpressOpt1 = () => {
        setOp(false);
        setOp1(true);
        setOp2(false);
        setOp3(false);

    };
    const OnpressOpt2 = () => {
        setOp(false);
        setOp1(false);
        setOp2(true);
        setOp3(false);

    };
    const OnpressOpt3 = () => {
        setOp(false);
        setOp1(false);
        setOp2(false);
        setOp3(true);

    };

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn2 = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {

            setSuccessorder(false);

            navigation.navigate("Homepage", {});

        });

    };


    let cardWidth = Dimensions.get('window').width / 2 - 30;
    let cardHight = Dimensions.get('window').height;


    const AddRequest = () => {


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({

                // userid: userid,
                // phonenumber: phone,
                // medicinename: medicinename,
                // name: Name,
                // manufacture: manufacturer,
                // additional: additional,
                // usernoficationtoken: noficationtoken

                userid: userid,
                phonenumber: phone,
                name: Name,
                message: additional,
                supporttype: "General Inquiry",
                usernoficationtoken: noficationtoken


            })
        };

        fetch('https://qwikit1.pythonanywhere.com/helpSupport/new', requestOptions)
            .then((response) => response.json())
            .then((json) => {
                setRqstid(json.id);
                setSuccessorder(true);

                fadeIn2();

                setNointernet(false);
                setLoading1(true);

            })
            .catch((error) => {
                setLoading1(true);
                console.error(error);
                setNointernet(true);
            });



    };


    const HelpSupport1 = () => {


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({

                userid: userid,
                phonenumber: phone,
                name: Name,
                message: additional1,
                supporttype: "Quiz Inquiry",
                usernoficationtoken: noficationtoken

            })
        };

        fetch('https://qwikit1.pythonanywhere.com/helpSupport/new', requestOptions)
            .then((response) => response.json())
            .then((json) => {
                setRqstid(json.id);
                setSuccessorder(true);

                fadeIn2();

                setNointernet(false);
                setLoading1(true);

            })
            .catch((error) => {
                setLoading1(true);
                console.error(error);
                setNointernet(true);
            });



    };


    const HelpSupport2 = () => {


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({

                userid: userid,
                phonenumber: phone,
                name: Name,
                message: additional2,
                supporttype: "Product Inquiry",
                usernoficationtoken: noficationtoken

            })
        };

        fetch('https://qwikit1.pythonanywhere.com/helpSupport/new', requestOptions)
            .then((response) => response.json())
            .then((json) => {
                setRqstid(json.id);
                setSuccessorder(true);

                fadeIn2();

                setNointernet(false);
                setLoading1(true);

            })
            .catch((error) => {
                setLoading1(true);
                console.error(error);
                setNointernet(true);
            });



    };


    const HelpSupport3 = () => {


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({

                userid: userid,
                phonenumber: phone,
                name: Name,
                message: additional3,
                supporttype: "Chat Inquiry",
                usernoficationtoken: noficationtoken

            })
        };

        fetch('https://qwikit1.pythonanywhere.com/helpSupport/new', requestOptions)
            .then((response) => response.json())
            .then((json) => {
                setRqstid(json.id);
                setSuccessorder(true);

                fadeIn2();

                setNointernet(false);
                setLoading1(true);

            })
            .catch((error) => {
                setLoading1(true);
                console.error(error);
                setNointernet(true);
            });



    };



    const [proceedorder, setProceedorder] = useState(false);

    const onPressMobileNumberClick = (number) => {

        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }

        Linking.openURL(phoneNumber);
    };
    const viewImg = (img) => {


    };
    let screenWidth = Dimensions.get('window').width - 14;
    let screenHight = Dimensions.get('window').height;

    useEffect(() => {

        // NotificationCheck()
        // console.log(phone)


        if (additional.length > 2) {
            setSubmit(true);
        }
        else {
            setSubmit(false);

        }

        if (additional1.length > 2) {
            setSubmit1(true);
        }
        else {
            setSubmit1(false);
        }

        if (additional2.length > 2) {
            setSubmit2(true);
        }
        else {
            setSubmit2(false);
        }

        if (additional3.length > 2) {
            setSubmit3(true);
        }
        else {
            setSubmit3(false);
        }
        // DetailsInfo()
        // ProductInfo()
        // checkSaveproduct()
        // UserInfo()


        // if(isLoading23 == false){
        //     Getdata2()
        // }




        // DetailsInfo()

    });
    const back = (() => {

        const { goBack } = navigation;
        goBack();

    });
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (

                <>
                    <StatusBar
                        animated={true}
                        backgroundColor="#000066"
                    // barStyle={statusBarStyle}

                    />
                    <View style={[styles.navbar1]}>


                        <View style={{ width: '100%', height: 30, top: 8, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 20 }} >

                            {/* <Pressable style={{ width: 22, height: 22, right: 15 }} onPress={() => navigation.navigate("Pharmacy", { reminder: true })} >
<Image
style={{ width: 22, height: 22, left: 0, top: 2 }}
resizeMode='contain'
source={require('../assets/search.jpg')}
/>
</Pressable> */}

                            {/* <Svg xmlns="http://www.w3.org/2000/svg" style={{
                                marginTop: 2, right: 15,
                                // display: testCredentials.notify == undefined ? 'flex' : testCredentials.notify == true ? 'none' : 'flex'
                            }} onPress={() => navigation.navigate("Notification", {})} width="22" height="22" viewBox="0 0 58.44 70">
                                <Defs>
                                    <ClipPath id="clip-path">
                                        <Rect id="Rectangle_253" data-name="Rectangle 253" width="58.44" height="70" fill="none" />
                                    </ClipPath>
                                </Defs>
                                <G id="Group_2120" data-name="Group 2120" transform="translate(-1187 -87)">
                                    <G id="Group_1647" data-name="Group 1647" transform="translate(1187 87)">
                                        <G id="Group_1646" data-name="Group 1646" transform="translate(0 -0.001)" clip-path="url(#clip-path)">
                                            <Path id="Path_1920" data-name="Path 1920" d="M23.357,53.424a6.773,6.773,0,0,1-5.863-10.173,1.122,1.122,0,0,1,1.937,1.134,4.535,4.535,0,1,0,7.851,0,1.122,1.122,0,0,1,1.937-1.134,6.773,6.773,0,0,1-5.863,10.173" transform="translate(5.864 15.102)" fill="#0C1A30" />
                                            <Path id="Path_1921" data-name="Path 1921" d="M23.742,55.283a8.247,8.247,0,0,1-7.135-12.392,2.6,2.6,0,0,1,4.753.657,2.569,2.569,0,0,1-.272,1.968,3.062,3.062,0,1,0,5.306,0,2.6,2.6,0,1,1,4.485-2.623,8.246,8.246,0,0,1-7.137,12.39M19.154,44.377h0" transform="translate(5.478 14.717)" fill="#0C1A30" />
                                            <Path id="Path_1922" data-name="Path 1922" d="M26.124,13.357A1.122,1.122,0,0,1,25,12.235V5.394a2.244,2.244,0,1,0-4.487,0v6.84a1.122,1.122,0,1,1-2.243,0V5.394a4.487,4.487,0,1,1,8.974,0v6.84a1.122,1.122,0,0,1-1.121,1.122" transform="translate(6.462 0.321)" fill="#0C1A30" />
                                            <Path id="Path_1923" data-name="Path 1923" d="M26.443,14.907a2.353,2.353,0,0,1-2.35-2.35V5.715a1.015,1.015,0,1,0-2.029,0v6.841a2.35,2.35,0,0,1-4.7,0V5.715a5.715,5.715,0,1,1,11.429,0v6.841a2.353,2.353,0,0,1-2.35,2.35" transform="translate(6.141 0.001)" fill="#0C1A30" />
                                            <Path id="Path_1924" data-name="Path 1924" d="M55.77,56.645H2.029a1.123,1.123,0,0,1-.973-1.68l4.517-7.851a23.227,23.227,0,0,0,3.138-12.3V27.726c0-10.572,9.244-19.505,20.189-19.505s20.189,8.933,20.189,19.505v7.092A23.228,23.228,0,0,0,52.214,47.1l4.528,7.869a1.121,1.121,0,0,1-.972,1.68M3.968,54.4H53.83L50.28,48.23a25.366,25.366,0,0,1-3.434-13.412V27.726c0-9.357-8.217-17.262-17.946-17.262S10.954,18.37,10.954,27.726v7.092a25.366,25.366,0,0,1-3.446,13.43Z" transform="translate(0.321 2.908)" fill="#0C1A30" />
                                            <Path id="Path_1925" data-name="Path 1925" d="M56.09,58.194H2.349A2.35,2.35,0,0,1,.312,54.673l4.517-7.851A22.079,22.079,0,0,0,7.8,35.138V28.047c0-11.24,9.807-20.734,21.417-20.734s21.418,9.495,21.418,20.734v7.091A22.024,22.024,0,0,0,53.59,46.785l4.539,7.888a2.351,2.351,0,0,1-2.039,3.521m-49.677-4.7H52.027l-2.492-4.329a26.527,26.527,0,0,1-3.6-14.027V28.047c0-8.691-7.656-16.034-16.718-16.034S12.5,19.357,12.5,28.047v7.091A26.569,26.569,0,0,1,8.882,49.2Z" transform="translate(0 2.587)" fill="#0C1A30" />
                                        </G>
                                    </G>

                                </G>
                            </Svg> */}

                            <Pressable style={{ width: 22, height: 22, right: 0, display: testCredentials.cartbuy == undefined ? 'none' : testCredentials.cartbuy.length > 0 ? 'none' : 'flex' }} onPress={() => navigation.navigate("Cart", {})} >
                                <Image
                                    style={{ width: 22, height: 22, left: 0, top: 2 }}
                                    resizeMode='contain'
                                    source={require('../assets/ecart.jpg')}
                                />
                            </Pressable>

                            <Pressable style={{ width: 22, height: 22, right: 0, display: testCredentials.cartbuy == undefined ? 'none' : testCredentials.cartbuy.length > 0 ? 'flex' : 'none' }} onPress={() => navigation.navigate("Cart", {})} >
                                <Image
                                    style={{ width: 22, height: 22, left: 0 }}
                                    resizeMode='contain'
                                    source={require('../assets/ecart.jpg')}
                                />
                            </Pressable>

                            <Pressable style={{ width: 20, height: 20, left: 15 }} onPress={() => navigation.toggleDrawer()} >
                                <Image
                                    style={{ width: 20, height: 20, left: 0, top: 3 }}
                                    resizeMode='contain'
                                    source={require('../assets/more.jpg')}
                                />
                            </Pressable>

                        </View>

                    </View>

                </>
            ),
        });
    }, [navigation]);

    return (
        <>
            <SafeAreaView style={[styles.MainContainer]}>
                <StatusBar
                    animated={true}
                    backgroundColor="#303030"
                // barStyle={statusBarStyle}

                />
                <View style={[styles.navbar, { flexDirection: 'row' }]}>

                    <Pressable activeOpacity={4} style={{ width: '5%', height: 25, left: 15, top: 17, borderWidth: 0 }} >
                        <Image
                            style={{ width: 17, height: 17, left: 0, top: 3 }}
                            resizeMode='contain'
                            source={require('../assets/back.jpg')}
                        />
                    </Pressable>

                    <View style={{ width: '50%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10 }}>

                        <Text style={{ top: 17, color: colors.black, fontSize: 14, display: lan ? 'none' : 'flex' }} >  বিস্তারিত</Text>

                        <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Help & Support </Text>

                    </View>



                </View>


                <ScrollView scrollEventThrottle={16} style={{ width: '100%', display: successorder ? "none" : 'flex' }}>

                    <View style={{ width: '100%', paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' }}>
                        <ImageBackground
                            source={require("../assets/fitback/helpAndSupport.png")}
                            style={{ width: '100%', height: 500, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                        // style={{ width: '100%', height: '100%', flex: 1 }}
                        >
                            <Text style={{ color: "white", fontFamily: 'Poppins_700Bold', fontSize: 20, marginBottom: 5 }}>Contact Information</Text>
                            <Text style={{ color: "white", fontFamily: 'Poppins_400Regular', fontSize: 13, marginBottom: 20 }}>Say something to start a live chat!</Text>
                            <MaterialIcons name="wifi-calling-3" size={30} color="white" />

                            <Text style={{ color: "white", fontFamily: 'Poppins_400Regular', fontSize: 13, marginBottom: 20, marginTop: 6 }}>+1012 3456 789</Text>
                            <MaterialIcons name="email" size={28} color="white" />
                            <Text style={{ color: "white", fontFamily: 'Poppins_400Regular', fontSize: 13, marginBottom: 20, marginTop: 6 }}>demo@gmail.com</Text>
                            <FontAwesome6 name="location-dot" size={28} color="white" />
                            <Text style={{ color: "white", fontFamily: 'Poppins_400Regular', fontSize: 13, marginTop: 6 }}>132 Dartmouth Street Boston,</Text>
                            <Text style={{ color: "white", fontFamily: 'Poppins_400Regular', fontSize: 13 }}>Massachusetts 02156 United States</Text>


                            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 40 }}>
                                <Entypo style={{ marginRight: 30 }} name="twitter-with-circle" size={34} color="white" />
                                <Entypo style={{ marginRight: 30 }} name="instagram-with-circle" size={34} color="white" />
                                <MaterialIcons style={{ marginRight: 0 }} name="discord" size={34} color="white" />
                            </View>
                        </ImageBackground>
                        <View style={{ width: '90%', justifyContent: 'flex-start', alignItems: 'flex-start', height: 27, marginTop: 20 }}>
                            <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, top: 1, fontSize: 12 }}>Select Subject</Text>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                            <Pressable style={{ width: '40%', height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: opt ? "#EE426D" : colors.ash2 }} onPress={() => { OnpressOpt(); }}>
                                <Text style={{ color: colors.white, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12 }}>General Inquiry</Text>
                            </Pressable>
                            <Pressable style={{ width: '40%', height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: opt1 ? "#EE426D" : colors.ash2 }} onPress={() => { OnpressOpt1(); }}>
                                <Text style={{ color: colors.white, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12 }}>Quiz Inquiry</Text>
                            </Pressable>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                            <Pressable style={{ width: '40%', height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: opt2 ? "#EE426D" : colors.ash2 }} onPress={() => { OnpressOpt2(); }}>
                                <Text style={{ color: colors.white, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12 }}>Product Inquiry</Text>
                            </Pressable>
                            <Pressable style={{ width: '40%', height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: opt3 ? "#EE426D" : colors.ash2 }} onPress={() => { OnpressOpt3(); }}>
                                <Text style={{ color: colors.white, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12 }}>Chat Inquiry</Text>
                            </Pressable>
                        </View>

                    </View>


                    {/* Med REQ */}
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 20, display: opt ? 'flex' : 'none' }}>

                        <View style={{ width: '90%', justifyContent: 'flex-start', alignItems: 'flex-start', height: 27, marginTop: 10 }}>
                            <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, top: 1, fontSize: 12 }}>Please let us know your reason for contuct us:</Text>
                        </View>

                        <View style={[styles.inputdiv, { height: 120, marginTop: 20 }]}>

                            <TextInput
                                style={[styles.input, { borderColor: "#C7C8D2", height: 120, borderWidth: 1, paddingLeft: 20 }]}
                                onChangeText={newTest => setAdditional(newTest)}
                                multiline={true}
                            />

                        </View>

                        <Pressable disabled={submit ? false : true} style={{ width: '55%', justifyContent: 'center', alignItems: 'center', height: 35, marginTop: 30, backgroundColor: submit ? "#EE426D" : colors.ash1 }} onPress={() => AddRequest()}>
                            <Text style={{ color: colors.white, fontFamily: 'Poppins_400Regular', letterSpacing: .9, top: 1, fontSize: 15 }}>SUBMIT REQUEST</Text>
                        </Pressable>







                    </View>



                    {/* Give FeedBack */}
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 50, display: opt1 ? 'flex' : 'none' }}>


                        <View style={{ width: '90%', justifyContent: 'flex-start', alignItems: 'flex-start', height: 27, marginTop: 10 }}>
                            <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, top: 1, fontSize: 12 }}>Please provide your Quiz issues below:</Text>
                        </View>

                        <View style={[styles.inputdiv, { height: 120, marginTop: 20 }]}>

                            <TextInput
                                style={[styles.input, { borderColor: "#C7C8D2", height: 120, borderWidth: 1, paddingLeft: 20 }]}
                                onChangeText={newTest => setAdditional1(newTest)}
                                multiline={true}
                            />

                        </View>

                        <Pressable disabled={submit1 ? false : true} style={{ width: '55%', justifyContent: 'center', alignItems: 'center', height: 35, marginTop: 30, backgroundColor: submit1 ? "#EE426D" : colors.ash1 }} onPress={() => HelpSupport1()}>
                            <Text style={{ color: colors.white, fontFamily: 'Poppins_400Regular', letterSpacing: .9, top: 1, fontSize: 15 }}>SUBMIT REQUEST</Text>
                        </Pressable>

                    </View>


                    {/* Order Issue*/}
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 50, display: opt2 ? 'flex' : 'none' }}>


                        <View style={{ width: '90%', justifyContent: 'flex-start', alignItems: 'flex-start', height: 27, marginTop: 10 }}>
                            <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, top: 1, fontSize: 12 }}>Please provide your product issues below:</Text>
                        </View>

                        <View style={[styles.inputdiv, { height: 120, marginTop: 20 }]}>

                            <TextInput
                                style={[styles.input, { borderColor: "#C7C8D2", height: 120, borderWidth: 1, paddingLeft: 20 }]}
                                onChangeText={newTest => setAdditional2(newTest)}
                                multiline={true}
                            />

                        </View>

                        <Pressable disabled={submit2 ? false : true} style={{ width: '55%', justifyContent: 'center', alignItems: 'center', height: 35, marginTop: 30, backgroundColor: submit2 ? "#EE426D" : colors.ash1 }} onPress={() => HelpSupport2()}>
                            <Text style={{ color: colors.white, fontFamily: 'Poppins_400Regular', letterSpacing: .9, top: 1, fontSize: 15 }}>SUBMIT REQUEST</Text>
                        </Pressable>

                    </View>


                    {/* Other Reason */}
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 50, display: opt3 ? 'flex' : 'none' }}>


                        <View style={{ width: '90%', justifyContent: 'flex-start', alignItems: 'flex-start', height: 27, marginTop: 10 }}>
                            <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, top: 1, fontSize: 12 }}>Please provide your chat issues below:</Text>
                        </View>

                        <View style={[styles.inputdiv, { height: 120, marginTop: 20 }]}>

                            <TextInput
                                style={[styles.input, { borderColor: "#C7C8D2", height: 120, borderWidth: 1, paddingLeft: 20 }]}
                                onChangeText={newTest => setAdditional3(newTest)}
                                multiline={true}
                            />

                        </View>

                        <Pressable disabled={submit3 ? false : true} style={{ width: '55%', justifyContent: 'center', alignItems: 'center', height: 35, marginTop: 30, backgroundColor: submit3 ? "#EE426D" : colors.ash1 }} onPress={() => HelpSupport3()}>
                            <Text style={{ color: colors.white, fontFamily: 'Poppins_400Regular', letterSpacing: .9, top: 1, fontSize: 15 }}>SUBMIT REQUEST</Text>
                        </Pressable>

                    </View>


                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 30 }}>

                        <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Or call Us Directly at <Text style={{ color: colors.blue }} onPress={() => { onPressMobileNumberClick("+880 1623 06 06 06"); }}> +880 1623 06 06 06</Text></Text>

                    </View>

                </ScrollView>

                <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', bottom: 70, display: successorder ? "flex" : 'none', flex: 1 }}>

                    {/* <SuccessFull width={80} height={80}/> */}

                    <SvgUri
                        width="80"
                        height="80"
                        // style={{marginTop:80}} 
                        uri="http://drive.google.com/uc?export=view&id=1BzHhSffwzfRnWbax7q4nP06kJQBYFETx"

                    />

                    <Text style={{ color: colors.ash, fontSize: 14, marginTop: 30, fontFamily: 'Poppins_400Regular' }}>Thank you for your request.</Text>

                    <Text style={{ marginTop: 40, color: colors.ash, fontSize: 14, fontFamily: 'Poppins_400Regular' }}>We received your request and will</Text>
                    <Text style={{ color: colors.ash, fontSize: 14, marginTop: 0, fontFamily: 'Poppins_400Regular' }}>get back to you soon</Text>

                    <Text style={{ top: 60, color: colors.blue, fontSize: 14, marginTop: 10, fontFamily: 'Poppins_400Regular' }}>Your Request ID # {rqstid}</Text>

                </View>


                <View style={styles.footerStyle}>

                    <View style={{ width: '100%', height: 69, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: colors.white }}>

                        <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.red, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Homepage", {})}>

                            <Image resizeMode={'cover'} style={{ width: 24, height: 24 }} source={require("../assets/fitback/homeIcon.png")} />

                            <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>বাসা অনসন্ধান করুন</Text>
                            <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>HOME</Text>

                        </Pressable>

                        <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.green, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Heathmart", {})}>

                            <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/fitback/shopIcon.png")} />
                            <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>বাসা অনসন্ধান করুন</Text>
                            <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>Shop</Text>

                        </Pressable>


                        {/* <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.dblue, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Reminder", {})}>
<Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/2_reminder.jpg")} />
<Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
<Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>REMINDER</Text>

</Pressable> */}



                        {/* <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.red, borderBottomWidth: 0 }]} onPress={() => navigation.navigate('Services', {})}>

<Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/services.jpg")} />
<Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
<Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>SERVICES</Text>

</Pressable> */}

                        <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.dblue, borderBottomWidth: 0 }]} onPress={() => {
                            if (userData?.chat_status) {
                                navigation.navigate("UserChat", {
                                    userName: userData?.name,
                                    user_FUId: userData?.user_FUId,
                                    image: userData?.image,
                                });
                            } else {
                                Alert.alert(
                                    "You do not have permission to chat.",
                                    "Please purchase a package.",
                                );
                            }
                        }}>

                            <View style={{
                                backgroundColor: "#fff",
                                paddingVertical: 14,
                                paddingHorizontal: 15,
                                shadowColor: '#000',
                                shadowOffset: { width: 3, height: 3 },
                                shadowOpacity: 5,
                                shadowRadius: 5,
                                elevation: 6,
                                borderRadius: 60,
                                marginTop: -16,
                                // borderWidth: 1,
                                // borderColor: colors.ash1
                            }}>
                                {/* <Image resizeMode={'cover'} style={{ width: 36, height: 36 }} source={require("../assets/fitback/chatIcon.png")} /> */}
                                <Animated.View
                                    style={{ width: 36, height: 36, transform: [{ scale: scaleAnim }] }}
                                >
                                    <Animated.Image
                                        source={require('../assets/fitback/chatIcon.png')}
                                        resizeMode="cover"
                                        style={{ width: 36, height: 36 }}
                                    />
                                </Animated.View>

                            </View>
                            <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>

                        </Pressable>


                        <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.dblue, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("HealthTracking", {})}>

                            <Image resizeMode={'cover'} style={{ width: 24, height: 24 }} source={require("../assets/fitback/healthIcon.png")} />
                            <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
                            <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>Health</Text>

                        </Pressable>





                        <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.dblue, borderBottomWidth: 0 }]} onPress={() =>
                            Alert.alert(
                                "Are you sure to start the quiz?",
                                "You will get 20 minutes for 20 questions.",
                                [
                                    {
                                        text: "No",
                                        onPress: () => null,
                                        style: "cancel",
                                    },
                                    {
                                        text: "Yes",
                                        onPress: () => navigation.navigate("TestPage", {}),
                                    },
                                ]
                            )
                        }>

                            <Image resizeMode={'cover'} style={{ width: 24, height: 24 }} source={require('../assets/fitback/qwizIcon.png')} />
                            <Text style={{ top: 4, color: colors.black, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
                            <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>Quiz</Text>

                        </Pressable>



                    </View>
                </View>


            </SafeAreaView>

        </>
    );
}
const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: colors.body,
        justifyContent: "center",
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },

    footerStyle: {
        height: '8%',
        borderTopColor: colors.white,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'flex-end',

        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 6,
    },


    tuchabluebuttonf: {
        width: "20%",
        height: '100%',
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: 'center',
    },
    inputdiv: {
        width: "98%",
        height: 40,
        justifyContent: "center",
        alignItems: 'center',
        paddingBottom: 10,

    },

    input: {
        // width:"98%",
        // height:55,
        // borderColor:'#C7C8D2',
        // borderWidth:1,
        // alignItems:'center', 
        // padding:10,
        // borderRadius:4,
        // fontSize:14,
        width: "85%",
        height: 40,
        borderColor: '#C7C8D2',
        borderBottomWidth: 1,
        alignItems: 'flex-start',
        padding: 5,
        paddingBottom: 0,
        borderRadius: 4,
        fontSize: 12,
        justifyContent: 'flex-start'
    },


    navbar: {

        backgroundColor: colors.white,
        width: '100%',
        height: 55,

        shadowColor: '#000',
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 6,

    },
    navbar1: {

        backgroundColor: colors.white,
        width: '60%',
        height: 40,
        left: 50,

    },
    adds: {
        width: 156,
        height: 200,

        borderColor: colors.ash1,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: colors.white,

    },
    addsImg: {
        width: 154,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        height: 100,
    },
    addstext: {
        width: 149,
        height: 90,

    },

    sendform: {

        width: "100%",
        justifyContent: "center",
        alignItems: 'center',
    },

    textstyle: {
        color: "#273B40",
        fontSize: 14,
        paddingTop: 10,
    },
    tuchabluebutton1: {
        // paddingTop:20,
        width: "55%",
        height: 35,
        borderRadius: 4,
        backgroundColor: "#488291",
        justifyContent: "center",
        alignItems: 'center',
        top: 20

    },
    textResult: {
        color: colors.black,
        fontWeight: "400",

    },
    tuchabluebutton: {
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 10,
    },

    body1: {
        flex: 1,
        justifyContent: "center",
        // alignItems:'center',
        width: '100%',
        height: '100%',
        paddingBottom: 10,
        paddingLeft: 7,

    },
    dateview: {
        width: '100%',
        height: 25,


    },
    imgView: {
        width: "99%",
        height: 280,

    },
    imgpagenumber: {
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: colors.ash,
        borderRadius: 100,
        position: 'absolute',
        left: 15,
        bottom: 240


    },
    flatdetails: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        paddingLeft: 10,
    }

});

export default MedRequest;


