import React, { useState, useRef, useEffect, useContext } from 'react';
import { ActivityIndicator, ImageBackground, Alert, Animated, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Dimensions } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";


import { UserContext } from '../../components/CredintailsContext';

//asyn-storage
import AsyncStorage from '@react-native-async-storage/async-storage';


function HelpFQ({ navigation, route }) {
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
    const { authtoken, setAuthtoken } = useContext(UserContext);
    const [getnotify, setGetnotify] = useState(true);
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


    const [personal, setPersonal] = useState(true);
    const [medical, setMedical] = useState(false);
    const [lifestyle, setLifestyle] = useState(false);

    const pressPersonal = () => {

        setPersonal(true);
        setMedical(false);
        setLifestyle(false);
    };
    const pressMedical = () => {

        setPersonal(false);
        setMedical(true);
        setLifestyle(false);

    };

    const pressLifestyle = () => {

        setPersonal(false);
        setMedical(false);
        setLifestyle(true);

    };


    const NotificationCheck = async () => {
        try {
            if (getnotify) {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://qwikmedic.pythonanywhere.com/notification', requestOptions)
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
    const [reminder, setReminder] = useState(route.params.reminder);

    const options = [
        { label: 'To Buy', value: 'buy' },
        { label: 'To Rent', value: 'rent' },
    ];

    const [images, setImages] = useState([]);
    // const [Maindata,setMaindata]=useState(storeData);
    // const[flatid,setFlatid]= useState(route.params.flatid)




    const [lan, setLan] = useState(true);


    const [cartbuy, setCartbuy] = useState(testCredentials.cartbuy);
    const [notify, setNotify] = useState(testCredentials.notify);
    const [indications, setIndications] = useState(false);
    const [adultdose, setAdultdose] = useState(false);
    const [childdose, setChilddose] = useState(false);
    const [renaldose, setRenaldose] = useState(false);
    const [renaldose1, setRenaldose1] = useState(false);
    const [renaldose2, setRenaldose2] = useState(false);
    const [renaldose3, setRenaldose3] = useState(false);
    const [renaldose4, setRenaldose4] = useState(false);
    const [administration, setAdministration] = useState(false);
    const [contraindications, setContraindications] = useState(false);
    const [sideeffects, setSideeffects] = useState(false);
    const [precautionswarnings, setPrecautionswarnings] = useState(false);
    const [precautionswarnings1, setPrecautionswarnings1] = useState(false);
    const [precautionswarnings2, setPrecautionswarnings2] = useState(false);
    const [pregnancy, setPregnancy] = useState(false);
    const [therapeuticclass, setTherapeuticclass] = useState(false);
    const [modeofaction, setModeofaction] = useState(false);
    const [interaction, setInteraction] = useState(false);
    const [interaction1, setInteraction1] = useState(false);




    const fadeAnim = useRef(new Animated.Value(0)).current;


    let cardWidth = Dimensions.get('window').width / 2 - 30;
    let cardHight = Dimensions.get('window').height;

    const [getUser, setGetUser] = useState(true);
    const [tokennumber, setTokennumber] = useState("");


    const sendNotification = async () => {
        const message = {
            to: tokennumber,
            //   sound: 'default',
            //   sound: 'object',
            //   sound: ['custom_sound.wav'], 
            title: 'Test Notification',
            body: 'This is a test notification',
            //   data: {objectId: '1', sound: 'custom_sound.mp3'},
            data: { objectId: '1', sound: 'http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg' },

        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        }).then((response) => response.json())
            .then((json) => {

                // console.log(json)
            })
            .catch((error) => {

            });


    };

    const GetMyalluser = () => {
        if (getUser) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            };

            fetch('https://qwikmedic.pythonanywhere.com/userProfile/1', requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    setTokennumber(json.noficationtoken);

                    //console.log('Fetch API Response', json);
                })
                .catch((error) => {
                    console.error(error);
                    setNointernet(true);
                    setLoading1(false);
                });
            setGetUser(false);
        }

    };

    GetMyalluser();




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
        // console.log("tokennumber: ",tokennumber)
        // NotificationCheck()

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

                        <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  FAQ </Text>

                    </View>



                </View>


                <ScrollView scrollEventThrottle={16} style={{ width: '100%' }}>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 50 }}>

                        {/* <Pressable style={{ width: '55%', justifyContent: 'center', alignItems: 'center', height: 26, backgroundColor: colors.green }} onPress={sendNotification}>
                            <Text style={{ color: colors.white, fontFamily: 'Poppins_500Medium', letterSpacing: .9, top: 1, fontSize: 12 }}>SHIPPING</Text>
                        </Pressable> */}

                        <View style={{ marginBottom: 5, bottom: 15, width: '100%', height: 38, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', left: 0, marginTop: 10 }}>

                            <Pressable style={{ marginLeft: 0, flexDirection: 'row', borderRadius: 14, width: '28%', height: 30, backgroundColor: personal ? "#EE416C" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { pressPersonal(); }}>



                                <Text style={{ fontSize: 12, color: personal ? colors.white : "#EE416C", left: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Popular</Text>

                            </Pressable>
                            <Pressable style={{ marginLeft: 0, flexDirection: 'row', borderRadius: 14, width: '32%', height: 30, backgroundColor: medical ? "#EE416C" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { pressMedical(); }}>



                                <Text style={{ fontSize: 12, color: medical ? colors.white : "#EE416C", left: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>General</Text>

                            </Pressable>
                            <Pressable style={{ marginLeft: 0, flexDirection: 'row', borderRadius: 14, width: '28%', height: 30, backgroundColor: lifestyle ? "#EE416C" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { pressLifestyle(); }}>


                                <Text style={{ fontSize: 12, color: lifestyle ? colors.white : "#EE416C", left: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Services</Text>

                            </Pressable>



                        </View>

                        <View style={[styles.sendform, { bottom: 45 }]}>
                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', display: personal ? 'flex' : 'none' }}>

                                {/* Q1 */}

                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, width: '97%' }]} onPress={() => { indications ? setIndications(false) : setIndications(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: indications ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>1. Lorem ipsum dolor sit amet,?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: indications ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: indications ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: indications ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus. </Text>

                                    </View>


                                </Pressable>
                                {/* Q2 */}

                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { adultdose ? setAdultdose(false) : setAdultdose(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: adultdose ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>2. Lorem ipsum dolor sit amet,?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: adultdose ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: adultdose ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: adultdose ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus. </Text>

                                    </View>


                                </Pressable>
                                {/* Q3 */}

                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { childdose ? setChilddose(false) : setChilddose(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: childdose ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>3. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: childdose ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: childdose ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: childdose ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus. </Text>

                                    </View>


                                </Pressable>
                                {/* Q4 */}


                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { renaldose ? setRenaldose(false) : setRenaldose(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: renaldose ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>4. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: renaldose ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: renaldose ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: renaldose ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus. </Text>

                                    </View>


                                </Pressable>



                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { renaldose1 ? setRenaldose1(false) : setRenaldose1(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: renaldose1 ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>5. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: renaldose ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: renaldose ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: renaldose1 ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus. </Text>

                                    </View>


                                </Pressable>


                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { renaldose2 ? setRenaldose2(false) : setRenaldose2(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: renaldose2 ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>6. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: renaldose ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: renaldose ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: renaldose2 ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus. </Text>

                                    </View>


                                </Pressable>


                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { renaldose3 ? setRenaldose3(false) : setRenaldose3(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: renaldose3 ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>7. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: renaldose ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: renaldose ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: renaldose3 ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus. </Text>

                                    </View>


                                </Pressable>


                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { renaldose4 ? setRenaldose4(false) : setRenaldose4(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: renaldose4 ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>8. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: renaldose ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: renaldose ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: renaldose4 ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus. </Text>

                                    </View>


                                </Pressable>




                            </View>

                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', display: medical ? 'flex' : 'none' }}>

                                {/* Q1 D*/}


                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { administration ? setAdministration(false) : setAdministration(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: administration ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>1. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: administration ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: administration ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: administration ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus.</Text>

                                    </View>


                                </Pressable>

                                {/* Q2 D*/}


                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { contraindications ? setContraindications(false) : setContraindications(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: contraindications ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>2. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: contraindications ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: contraindications ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: contraindications ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus. </Text>

                                    </View>


                                </Pressable>

                                {/* Q3 D*/}


                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { sideeffects ? setSideeffects(false) : setSideeffects(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: sideeffects ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>3. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: sideeffects ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: sideeffects ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: sideeffects ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus.</Text>

                                    </View>


                                </Pressable>

                                {/* Q4 D*/}

                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { precautionswarnings ? setPrecautionswarnings(false) : setPrecautionswarnings(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: precautionswarnings ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>4. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: precautionswarnings ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: precautionswarnings ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: precautionswarnings ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus. </Text>

                                    </View>


                                </Pressable>

                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { precautionswarnings1 ? setPrecautionswarnings1(false) : setPrecautionswarnings1(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: precautionswarnings1 ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>5. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: precautionswarnings ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: precautionswarnings ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: precautionswarnings1 ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus. </Text>

                                    </View>


                                </Pressable>


                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { precautionswarnings2 ? setPrecautionswarnings2(false) : setPrecautionswarnings2(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: precautionswarnings2 ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>6. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: precautionswarnings ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: precautionswarnings ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: precautionswarnings2 ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus. </Text>

                                    </View>


                                </Pressable>

                            </View>

                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', display: lifestyle ? 'flex' : 'none' }}>

                                {/* Q1 S*/}
                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { pregnancy ? setPregnancy(false) : setPregnancy(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: pregnancy ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>1. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: pregnancy ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: pregnancy ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: pregnancy ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus.</Text>

                                    </View>


                                </Pressable>

                                {/* Q2 S*/}


                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { therapeuticclass ? setTherapeuticclass(false) : setTherapeuticclass(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: therapeuticclass ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>2. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: therapeuticclass ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: therapeuticclass ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: therapeuticclass ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus. </Text>

                                    </View>


                                </Pressable>

                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { modeofaction ? setModeofaction(false) : setModeofaction(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: modeofaction ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>1. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: modeofaction ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: modeofaction ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: modeofaction ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus.</Text>

                                    </View>


                                </Pressable>

                                { /* Q3 S*/}


                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { interaction ? setInteraction(false) : setInteraction(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: interaction ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>2. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: interaction ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: interaction ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: interaction ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus.</Text>

                                    </View>


                                </Pressable>


                                <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { interaction1 ? setInteraction1(false) : setInteraction1(true); }}>


                                    <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: interaction1 ? 0 : 0, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                        <Text style={{ left: 20, color: "#000000", fontSize: 12, fontFamily: 'Poppins_500Medium', backgroundColor: "#E6E6E6", paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6, letterSpacing: .9, width: '95%' }}>3. Lorem ipsum dolor sit amet?</Text>
                                        {/* <ArrowDown1 style={{top:4,display: interaction ? 'none' : 'flex',width:'5%',right:7}}/>
<ArrowLeft1 style={{top:4 ,display: interaction ? 'flex' : 'none',width:'5%',right:7}}/> */}
                                    </View>

                                    <View style={{ left: 20, width: '94%', display: interaction1 ? 'flex' : 'none', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1, marginTop: 20, borderRadius: 4 }}>
                                        <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus.</Text>

                                    </View>


                                </Pressable>



                            </View>

                        </View>













                        {/* <View style={{ width: '55%', justifyContent: 'center', alignItems: 'center', height: 26, backgroundColor: colors.oranget, marginTop: 70 }}>
                            <Text style={{ color: colors.white, fontFamily: 'Poppins_500Medium', letterSpacing: .9, top: 1, fontSize: 12 }}>ONLINE DOCTOR</Text>
                        </View> */}


                        {/* 
                        <View style={{ width: '55%', justifyContent: 'center', alignItems: 'center', height: 26, backgroundColor: colors.dblue, marginTop: 70 }}>
                            <Text style={{ color: colors.white, fontFamily: 'Poppins_500Medium', letterSpacing: .9, top: 1, fontSize: 12 }}>AMBULANCE </Text>
                        </View> */}





                        {/* <View style={{ width: '55%', justifyContent: 'center', alignItems: 'center', height: 26, backgroundColor: colors.orange, marginTop: 70 }}>
                            <Text style={{ color: colors.white, fontFamily: 'Poppins_500Medium', letterSpacing: .9, top: 1, fontSize: 12 }}>LAB TEST </Text>
                        </View> */}

                        {/* Q2 S*/}




                    </View>
                </ScrollView>

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
    inputdiv: {
        width: "98%",
        height: 84,
        justifyContent: "center",
        alignItems: 'center',
        paddingBottom: 10,
        //top:-100

    },

    input: {
        width: "100%",
        height: 55,
        borderColor: '#C7C8D2',
        borderBottomWidth: 1,
        // borderWidth:1,
        alignItems: 'center',
        // paddingLeft:10,
        borderRadius: 4,
        fontSize: 12,
        justifyContent: 'space-between'

    },
    sendform: {

        width: "100%",
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 24
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

export default HelpFQ;


