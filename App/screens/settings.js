import React, { useContext } from 'react';
import { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ImageBackground, Switch, SafeAreaView, Platform, StatusBar, Image, Button, TextInput, Pressable, ScrollView, Alert, Animated } from 'react-native';
import { UserContext } from '../../components/CredintailsContext';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import colors from '../config/colors';

function Settings({ navigation, route }) {
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

    const { authtoken, setAuthtoken } = useContext(UserContext);
    // const [getnotify, setGetnotify] = useState(true);

    const [userPass, setUserPass] = useState("00");

    const [Pass, setPass] = useState("00");

    const [oldPass, setOldPass] = useState("00");
    const [newPass, setNewPass] = useState("00");
    const [confirmPass, setConfirmPass] = useState("00");

    // const [oldno, setOldno] = useState(route.params.oldno);
    const [phonenumber1, setPhonenumber1] = useState("");
    const [password, setPassword] = useState("00");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [postcode, setPostcode] = useState("");
    const [streetaddress, setStreetaddress] = useState("");
    const [nid, setNid] = useState("");


    const { testCredentials, setTestCredentials } = useContext(UserContext);
    const [lan, setLan] = useState(testCredentials.lan);
    const [userid, setUserid] = useState(testCredentials.userid);

    //context
    const [getUser, setGetUser] = useState(true);
    const [getUser1, setGetUser1] = useState(true);

    const [phonenumber, setPhonenumber] = useState("00");
    const [allUsername, setAllUsername] = useState([]);

    const [nointernet, setNointernet] = useState(false);
    const [isLoading1, setLoading1] = useState(false);

    const [submit1, setSubmit1] = useState(false);
    const [submit2, setSubmit2] = useState(false);


    const [userData, setUserData] = useState();

    const GetMyalluser = () => {
        if (getUser) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            };

            fetch('https://qwikit1.pythonanywhere.com/userProfile/', requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    setAllUsername(json);


                    setNointernet(false);
                    setPhonenumber1(json.phonenumber);
                    setPassword(json.password);
                    setName(json.name);
                    setEmail(json.email);
                    setCity(json.city);
                    setArea(json.area);
                    setPostcode(json.postcode);
                    setStreetaddress(json.streetaddress);
                    setNid(json.nid);
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

    const GetMyalluser1 = () => {
        if (getUser1) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            };

            fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    setNointernet(false);
                    setUserPass(json.password);
                    setUserData(json);

                })
                .catch((error) => {
                    console.error(error);
                    setNointernet(true);
                    setLoading1(false);
                });
            setGetUser1(false);
        }

    };

    GetMyalluser1();



    useEffect(() => {
        // NotificationCheck()
        if (oldPass.length == 4 && newPass.length == 4 && confirmPass.length == 4) {
            setSubmit1(true);
        }
        else {
            setSubmit1(false);

        }

        if (phonenumber.length == 11 && Pass.length == 4) {
            setSubmit2(true);
        }
        else {
            setSubmit2(false);

        }
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

        <SafeAreaView style={styles.MainContainer}>
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

                    <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Settings </Text>

                </View>



            </View>

            <ScrollView style={{ width: '100%' }}>






                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 60 }}>


                    <View style={[styles.body2, { borderWidth: 0, width: '95%', borderColor: colors.ash1, borderRadius: 6, marginTop: 20, marginBottom: 10 }]}>
                        <View style={{
                            width: "100%",
                            backgroundColor: colors.white,
                            shadowColor: '#000',
                            shadowOffset: { width: 1.5, height: 1.5 },
                            shadowOpacity: 0.8,
                            shadowRadius: 5,
                            elevation: 3,
                            paddingHorizontal: 10,
                            paddingVertical: 20,
                            borderRadius: 4
                        }}>
                            <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', }}>


                                <Text style={{ color: colors.text, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>Account</Text>
                            </View>

                            <Pressable
                                // style={{ width: '45%', height: 150, borderRadius: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: "#f6a5b9" }} 
                                style={{ width: '100%', flexDirection: "row", justifyContent: 'space-between', alignItems: "center", paddingVertical: 10, borderRadius: 4, borderWidth: 0, paddingHorizontal: 4 }}

                                onPress={() => navigation.navigate("ChangePinPage", { reminder: true })}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <MaterialIcons name="lock-outline" size={20} color="#EE416C" />
                                    <Text style={{ letterSpacing: .9, fontFamily: 'Poppins_400Regular', marginLeft: 4, marginTop: 2, color: "#7B6F72" }}>Pin Change</Text>

                                </View>
                                <MaterialIcons name="arrow-forward-ios" size={20} color="#7B6F72" />
                            </Pressable>
                        </View>

                        {/* <View style={{ width: '100%', flexDirection: "row", justifyContent: 'space-between', alignItems: "center", paddingTop: 10, borderWidth: 0, paddingHorizontal: 10 }}>


                           
                        </View> */}




                    </View>


                </View>



            </ScrollView>
            <View style={{ marginBottom: 5, width: '95%', height: 38, borderColor: '#D50400', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: nointernet ? "flex" : "none" }}>
                <Text style={{ marginLeft: 15, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: "#D50400" }}>No Internet Connection.</Text>
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

    );
}
const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: colors.body,
        justifyContent: "center",
        alignItems: 'center',
        height: '100%',
        width: '100%'
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
    body1: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    body2: {
        flex: 1,
        // paddingBottom:30,
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    navbar1: {

        backgroundColor: colors.white,
        width: '60%',
        height: 40,
        left: 50,

    },


    inputdiv: {
        // width:"95%",
        // height:84,
        // justifyContent: "center",
        // alignItems:'center',  
        // paddingBottom:10,
        // //top:-100

        width: "98%",
        height: 60,
        // justifyContent: "center",
        // alignItems:'center',  
        paddingBottom: 10,
        //top:-100

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
        alignItems: 'center',
        padding: 5,
        paddingBottom: 0,
        borderRadius: 4,
        fontSize: 12,
        justifyContent: 'space-between'
    },


    navbar: {

        // backgroundColor: colors.white,
        // width:'100%',
        // height:50,
        backgroundColor: colors.white,
        width: '100%',
        height: 55,

        shadowColor: '#000',
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 6,
    },
    sendform: {

        width: "100%",
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 10
        // marginBottom: 40
    },

    tuchabluebutton: {
        // paddingTop:20,
        width: "93%",
        height: 35,
        borderRadius: 4,
        backgroundColor: colors.black,
        justifyContent: "center",
        alignItems: 'center',
        top: 20

    },
    languagetuchabluebutton: {
        width: "35%",
        height: 28,
        borderRadius: 0,
        borderColor: colors.ash1,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    language: {
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
        top: 40,
    },
    notifiactions: {
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
        top: 40,
    },

});

export default Settings;





