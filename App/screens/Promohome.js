import React, { useState, useRef, useEffect, useContext } from 'react';
import { ActivityIndicator, ImageBackground, Alert, Animated, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Dimensions } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";

import { UserContext } from '../../components/CredintailsContext';

//asyn-storage
import AsyncStorage from '@react-native-async-storage/async-storage';


function Promohome({ navigation, route }) {
    const [unread, setUnread] = useState(false);

    const [getnotify, setGetnotify] = useState(true);
    const { authtoken, setAuthtoken } = useContext(UserContext);

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

    const { testCredentials, setTestCredentials } = useContext(UserContext);
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




    const fadeAnim = useRef(new Animated.Value(0)).current;


    let cardWidth = Dimensions.get('window').width / 2 - 30;
    let cardHight = Dimensions.get('window').height;

    const [getpromo, setGetpromo] = useState(true);

    const [isLoading1, setLoading1] = useState(true);

    const { promo, setPromo } = useContext(UserContext);

    // const [promo1, setPromo1]= useState(null)
    // const [promo2, setPromo2]= useState(null)
    // const [promo3, setPromo3]= useState(null)
    // const [promo4, setPromo4]= useState(null)
    // const [promo5, setPromo5]= useState(null)

    const Promoimage = () => {

        if (getpromo) {

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            };

            fetch('https://qwikmedic.pythonanywhere.com/promotionaladdImage', requestOptions)
                .then((response) => response.json())
                .then((json) => {

                    json.map((item, index) => {
                        if (item.name == "promo1") {
                            if (item.image1) {

                                setPromo1(item.image1);

                            }
                            if (item.image2) {

                                setPromo2(item.image2);

                            }
                            if (item.image3) {

                                setPromo3(item.image3);

                            }
                            if (item.image4) {

                                setPromo4(item.image4);

                            }
                            if (item.image5) {

                                setPromo5(item.image5);

                            }


                        }
                        setLoading1(false);
                    });

                })
                .catch((error) => {
                    console.error(error);

                    setLoading1(false);

                });

            setGetpromo(false);
        }
    };


    const back = (() => {

        const { goBack } = navigation;
        goBack();

    });

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

        // Promoimage()


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

                            <Pressable style={{ width: 22, height: 22, right: 15 }} onPress={() => navigation.navigate("Pharmacy", { reminder: true })} >
                                <Image
                                    style={{ width: 22, height: 22, left: 0, top: 2 }}
                                    resizeMode='contain'
                                    source={require('../assets/search.jpg')}
                                />
                            </Pressable>

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

                        <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Promo Offer </Text>

                    </View>



                </View>


                <ScrollView scrollEventThrottle={16} style={{ width: '100%' }}>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 50 }}>

                        {promo.length < 1 ? <ActivityIndicator size="large" color="#2D6A8D" style={{ paddingTop: 10, height: 200 }} /> :
                            <>
                                <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'center', height: 240 }}>
                                    <Pressable style={{ width: '100%', height: '100%' }} onPress={() => navigation.navigate("MyQcoins", {})}>
                                        <Image
                                            style={{ width: '100%', height: '100%' }}
                                            resizeMode='contain'
                                            source={{ uri: promo[0].image1 }}
                                        />

                                    </Pressable>
                                </View>

                                <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'center', height: 240, marginTop: 50 }}>
                                    <Pressable style={{ width: '100%', height: '100%' }} onPress={() => navigation.navigate("Pharmacy", { reminder: true })}>
                                        <Image
                                            style={{ width: '100%', height: '100%' }}
                                            resizeMode='contain'
                                            source={{ uri: promo[0].image2 }}
                                        />

                                    </Pressable>
                                </View>

                                <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'center', height: 240, marginTop: 50 }}>
                                    <Pressable style={{ width: '100%', height: '100%' }} onPress={() => navigation.navigate("Pharmacy", {})}>
                                        <Image
                                            style={{ width: '100%', height: '100%' }}
                                            resizeMode='contain'
                                            source={{ uri: promo[0].image3 }}
                                        />

                                    </Pressable>
                                </View>


                                <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'center', height: 240, marginTop: 50 }}>
                                    <Pressable style={{ width: '100%', height: '100%' }} onPress={() => navigation.navigate("ReferEarn", {})}>
                                        <Image
                                            style={{ width: '100%', height: '100%' }}
                                            resizeMode='contain'
                                            source={{ uri: promo[0].image4 }}
                                        />

                                    </Pressable>
                                </View>


                                <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'center', height: 240, marginTop: 50 }}>
                                    <Pressable style={{ width: '100%', height: '100%' }} onPress={() => navigation.navigate("Heathmart", {})}>
                                        <Image
                                            style={{ width: '100%', height: '100%' }}
                                            resizeMode='contain'
                                            source={{ uri: promo[0].image5 }}
                                        />

                                    </Pressable>
                                </View>
                            </>
                        }

                    </View>
                </ScrollView>
                <View style={styles.footerStyle}>

                    <View style={{ width: '100%', height: 65, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: colors.white }}>

                        <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.red, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Homepage", {})}>

                            <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/1_med.jpg")} />

                            <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>বাসা অনসন্ধান করুন</Text>
                            <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>HOME</Text>

                        </Pressable>

                        <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.dblue, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Reminder", {})}>
                            <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/2_reminder.jpg")} />
                            <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
                            <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>REMINDER</Text>

                        </Pressable>



                        <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.red, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Services", {})}>

                            <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/services.jpg")} />
                            <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
                            <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>SERVICES</Text>

                        </Pressable>


                        <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.green, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Heathmart", {})}>

                            <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/estore.jpg")} />
                            <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>বাসা অনসন্ধান করুন</Text>
                            <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>E-STORE</Text>

                        </Pressable>


                        <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.red, borderBottomWidth: 4 }]} onPress={() => navigation.navigate("Promohome", {})}>

                            <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require('../assets/top_right_promo.jpg')} />
                            <Text style={{ top: 4, color: colors.black, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
                            <Text style={{ top: 7.8, color: colors.red, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>PROMO</Text>

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
        fontSize: 14,
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

export default Promohome;


