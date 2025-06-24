import React, { useState, useRef, useEffect, useContext } from 'react';
import { ActivityIndicator, ImageBackground, Alert, Animated, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Dimensions } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';


import { UserContext } from '../../components/CredintailsContext';
import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";

//asyn-storage
import AsyncStorage from '@react-native-async-storage/async-storage';


import * as Clipboard from 'expo-clipboard';


function MyQcoins({ navigation, route }) {
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


    const [getAllUser, setGetAllUser] = useState(true);
    const [allUserData, setAllUserData] = useState();



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
    const [myreferralcode, setMyreferralcode] = useState(route.params.myreferralcode);
    const [qmoney, setQmoney] = useState(route.params.qmoney);
    const [qcoins, setQcoins] = useState(route.params.qcoins);

    const fMoney = Number(qcoins) / 100;

    const options = [
        { label: 'To Buy', value: 'buy' },
        { label: 'To Rent', value: 'rent' },
    ];

    const [images, setImages] = useState([]);

    // const [Maindata,setMaindata]=useState(storeData);
    // const[flatid,setFlatid]= useState(route.params.flatid)




    const [lan, setLan] = useState(true);

    const [userid, setUserid] = useState(testCredentials.userid);
    const [cartbuy, setCartbuy] = useState(testCredentials.cartbuy);
    const [notify, setNotify] = useState(testCredentials.notify);
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


    // Fetch user profile data from API
    const allUserInfo = () => {
        if (getAllUser) {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: authtoken,
                },
            };

            fetch(`https://qwikit1.pythonanywhere.com/userProfile/${userid}`, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    setAllUserData(json);
                    setQcoins(json.fcoins);
                })
                .catch((error) => {
                    console.error('Error fetching user info:', error);
                });

            setGetAllUser(false);
        }
    };

    // Initial setup
    useEffect(() => {
        allUserInfo();
    }, [route.params]);

    const formatDateTime = (date) => {
        const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' }; // Format: 27 June 2024
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true }; // Format: 10:10 AM
        const formattedDate = date.toLocaleDateString('en-GB', dateOptions);
        const formattedTime = date.toLocaleTimeString('en-GB', timeOptions);
        return `${formattedDate}, ${formattedTime}`; // Example: 27 June 2024, 10:10 AM
    };


    const fadeAnim = useRef(new Animated.Value(0)).current;


    let cardWidth = Dimensions.get('window').width / 2 - 30;
    let cardHight = Dimensions.get('window').height;

    const [bcopy, setBcopy] = useState(false);
    const [copiedText, setCopiedText] = React.useState('');

    const [isLoading, setLoading] = useState(true);
    const [isLoading12, setLoading12] = useState(true);
    const [isLoading1, setLoading1] = useState(false);
    const [getorder, setGetorder] = useState(true);
    const [allorder, setAllorder] = useState([]);
    const [allsubmitted, setAllsubmitted] = useState([]);
    const [emptyList1, setEmptyList1] = useState(false);

    const GetAllorder = async () => {
        try {
            if (getorder) {
                // console.log("getorder")

                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://qwikmedic.pythonanywhere.com/referralHistory', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {

                        setAllorder(json.reverse());

                        // setLoading1(false)

                        // setNointernet(false)
                    })
                    .catch((error) => {
                        // setNointernet(true)
                        setLoading1(false);

                    });

                // setLoading12(false);
                // setGetorder(false)
            }
        }
        catch (error) {
            // setNointernet(true)
            // setLoading1(false)

        } finally {
            setLoading(false);
            setLoading12(false);
            setGetorder(false);
        }
        setGetorder(false);


    };

    const [checkdata1, setCheckdata1] = useState(true);

    const Getdata1 = () => {
        if (checkdata1) {
            //    console.log("checkdatacheckdatacheckdata")

            // console.log("checkdata1")

            {
                allorder.map((item, index) => {

                    if (item.userid == userid) {
                        allsubmitted.push(item);
                    }


                });
            }

            if (allsubmitted.length === 0) {
                setEmptyList1(true);
            }


            setLoading1(false);

            setCheckdata1(false);

        }
        setCheckdata1(false);

    };

    const fadeIn1 = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true
        }).start(() => {
            setBcopy(false);
        });
    };

    const copyToClipboard = (text) => {
        // Clipboard.setString(text);
        Clipboard.setStringAsync(text);
        fadeIn1();
    };

    const fetchCopiedText = async () => {
        const text = await Clipboard.getStringAsync();
        setCopiedText(text);

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
        GetAllorder();
        if (isLoading12 == false) {
            Getdata1();
            // setLoading1(false)
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

                        <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Fit Coins </Text>

                    </View>



                </View>

                {/* <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}> */}
                <ScrollView scrollEventThrottle={16} style={{ width: '100%' }}>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 50 }}>

                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <View style={{ width: '100%', justifyContent: "center", alignItems: "center" }}>

                                {/* <Referral width={'100%'} height={170} style={{marginTop:0,right:10,width:'40%'}}/> */}
                                <Image
                                    style={{ height: 230, marginTop: 0, width: 260 }}
                                    resizeMode="stretch"
                                    source={require('../assets/fitback/fCoinImg.png')}
                                />
                            </View>

                            <View style={{ width: '100%', paddingHorizontal: 16, marginTop: 26 }}>
                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', height: 27, bottom: 20 }}>
                                    <Text style={{ color: "#000000", fontFamily: 'Poppins_500Medium', letterSpacing: .9, top: 1, fontSize: 14 }}>CURRENT BALANCE:</Text>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', alignContent: "center" }}>

                                    <View style={{ width: '50%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 20 }}>
                                        <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 12 }]}>Fit-Coins :</Text>
                                        <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 12, marginTop: 10 }]}></Text>
                                    </View>

                                    <View style={{ width: '50%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                        <Text style={[{ color: colors.text, fontFamily: 'Poppins_500Medium', letterSpacing: .9, display: lan ? 'flex' : 'none', paddingRight: 10, fontSize: 12 }]}>{qcoins}</Text>
                                        <Text style={[{ color: colors.text, fontFamily: 'Poppins_500Medium', letterSpacing: .9, display: lan ? 'flex' : 'none', paddingRight: 10, fontSize: 12, marginTop: 10 }]}>= Tk {fMoney}</Text>
                                    </View>
                                </View>
                            </View>



                        </View>


                        <View style={{ width: '90%', justifyContent: 'flex-start', alignItems: 'flex-start', height: 27, marginTop: 20 }}>
                            <Text style={{ color: "#000000", fontFamily: 'Poppins_500Medium', letterSpacing: .9, top: 1, fontSize: 14 }}>Fit-coins transaction:</Text>
                        </View>


                        {isLoading ? <ActivityIndicator size="large" color="#2D6A8D" style={{ paddingTop: 10, height: 200 }} /> :
                            <View style={{ width: '100%', marginBottom: 10 }}>

                                <View style={{ width: '100%', display: emptyList1 ? 'none' : 'flex', marginBottom: 10 }}>

                                    <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, left: 10, display: 'flex', bottom: 10 }}>

                                        <View style={{ borderBottomWidth: 1, borderColor: colors.text, width: '30%', justifyContent: 'center', alignItems: 'center' }}>

                                            <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 12 }]}>DATE EARNED</Text>

                                        </View>

                                        <View style={{ borderBottomWidth: 1, borderColor: colors.text, width: '40%', justifyContent: 'center', alignItems: 'center' }}>

                                            <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 12 }]}>DETAILS</Text>

                                        </View>

                                        <View style={{ borderBottomWidth: 1, borderColor: colors.text, width: '20%', justifyContent: 'center', alignItems: 'center' }}>

                                            <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 12 }]}>Fit-COINS</Text>

                                        </View>

                                    </View>

                                    {allUserData?.fcoindata?.map((item, index) => (
                                        <View key={index} style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }}>



                                            <View style={[styles.samaryView, { marginBottom: 10, height: 50 }]} >

                                                <View style={{ width: '30%', top: 7, justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                                                    <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textDecorationLine: 'underline', paddingLeft: 10, fontSize: 11 }]}>
                                                        {new Date(item.timestamp).toLocaleDateString('en-GB')}
                                                    </Text>

                                                </View>

                                                <View style={{ width: '50%', left: 5, top: 7, justifyContent: 'flex-start', alignItems: 'center' }}>

                                                    <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingLeft: 10, fontSize: 11 }]}>{item.details}</Text>

                                                </View>

                                                <View style={{ width: '20%', top: 7, justifyContent: 'flex-end', alignItems: 'flex-end' }}>

                                                    <Text style={[{ color: item.details == "PURCHASE PRODUCT" ? colors.red : colors.text, fontFamily: 'Poppins_500Medium', letterSpacing: .9, paddingRight: 5, fontSize: 11 }]}>{item.fCoin}</Text>

                                                </View>


                                            </View>

                                        </View>
                                    ))}


                                    {/* <ActivityIndicator size="small" color="#0000ff"  animating={animate}/> */}



                                </View>

                            </View>
                        }


                    </View>
                </ScrollView>
                <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', marginBottom: 100, display: emptyList1 ? 'flex' : 'none', flex: 0 }}>
                    {/* <Emptyorder1/> */}
                    <Text style={{ fontSize: 14, fontWeight: '700', color: colors.black, marginTop: 10 }}>transaction list is empty</Text>
                    {/* <Text style={{fontSize:12,fontWeight:'400',color:colors.ash,marginTop:10}}>Let’s check our trendy <Text style={{fontSize:12,fontWeight:'400',textDecorationLine:'underline',color:colors.ash}} onPress={()=> navigation.navigate("PagkageDecoration",{})}>decoration items</Text> </Text> */}
                </View>
                {/* </View> */}

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

                        <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.dblue, borderBottomWidth: 0 }]}

                            onPress={() => {
                                if (allUserData?.chat_status) {
                                    navigation.navigate("UserChat", {
                                        userName: allUserData?.name,
                                        user_FUId: allUserData?.user_FUId,
                                        image: allUserData?.image,
                                    });
                                } else {
                                    Alert.alert(
                                        "You do not have permission to chat.",
                                        "Please purchase a package.",
                                    );
                                }
                            }}

                        >

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

    samaryView: {
        width: "100%",
        borderColor: colors.white,
        backgroundColor: "#FAFAFA",
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        top: 5,
        paddingBottom: 15,
        left: 10,

        borderLeftColor: '#ebebeb',
        borderTopWidth: 1,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderLeftWidth: 1,
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

export default MyQcoins;


