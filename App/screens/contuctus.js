import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, Linking, View, ImageBackground, SafeAreaView, Platform, StatusBar, Image, Button, TextInput, Pressable, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '../config/colors';


import { UserContext } from '../../components/CredintailsContext';
function Contuctus({ navigation, route }) {

    const { authtoken, setAuthtoken } = useContext(UserContext);
    // const [RecivedPhone, setRecivedPhone] =useState(route.params.phoneVal);
    // const[serviceType,setServiceType] = useState(route.params.serviceType)

    // const [userid,setUserid] = useState(route.params.userid)

    // const [RecivedPhone, setRecivedPhone] =useState("01622049519");
    const [serviceType, setServiceType] = useState("genaral");

    const { testCredentials, setTestCredentials } = useContext(UserContext);
    const [userid, setUserid] = useState(testCredentials.userid);
    const [notallow, setNotallow] = useState(userid == 0 ? true : false);
    const [notify, setNotify] = useState(testCredentials.notify);
    const [cartbuy, setCartbuy] = useState(testCredentials.cartbuy);
    const [cartrent, setCartrent] = useState(testCredentials.cartrent);
    const [productsave, setProductsave] = useState(testCredentials.productsave);
    const [flatsave, setflatsave] = useState(testCredentials.flatsave);
    const [getUser, setGetUser] = useState(true);

    const [phonenumber, setPhonenumber] = useState(null);
    const [Name, setName] = useState(null);
    const [message, setMessage] = useState(null);
    const [address, setAddress] = useState(null);
    const [renterAddress, setRenterAddress] = useState(null);

    // const [renterflag, setRenterflag]= useState(route.params.renterflag)
    const [renterflag, setRenterflag] = useState(false);

    const [image, setImage] = useState(null);
    const [lan, setLan] = useState(true);

    const [phonenumberflag, setPhonenumberflag] = useState(true);
    const [messageflag, setMessageflag] = useState(true);
    const [addressflag, setAddressflag] = useState(true);
    const [nointernet, setNointernet] = useState(false);
    const [isLoading1, setLoading1] = useState(false);


    const axios = require('axios');



    const [getaccount, setGetaccount] = useState(true);
    const [getaccountdata, setGetaccountdata] = useState([]);

    const Accountdetail = () => {

        if (getaccount) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            };

            fetch('https://qwikmedic.pythonanywhere.com/phoneNumbers/', requestOptions)
                .then((response) => response.json())
                .then((json) => {

                    setGetaccountdata(json);
                    setNointernet(false);

                })
                .catch((error) => {
                    console.error(error);
                    setNointernet(true);
                    setLoading1(false);
                });

            setGetaccount(false);
        }
    };

    Accountdetail();

    const UserInfo = () => {


        if (getUser & userid != "Renter") {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            };

            fetch('https://qwikmedic.pythonanywhere.com/userProfile/' + userid, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    setNointernet(false);
                    setPhonenumber(json.phonenumber),
                        setName(json.name),
                        setAddress("houseNo" + "- " + json.houseno + ", " + json.area + ", " + json.streetaddress + ", " + json.city + " " + json.postcode),
                        setImage(json.image);
                    // console.log(json.phonenumber)

                })
                .catch((error) => {
                    console.error(error);
                    setNointernet(true);
                    setLoading1(false);
                });

            setGetUser(false);
        }
    };
    UserInfo();

    const SendMessage = () => {
        if (nointernet) {
            setLoading1(false);

            nointernet(true);
        }
        else {
            setPhonenumberflag(true);
            setMessageflag(true);
            setAddressflag(true);

            if (message != null && (phonenumber != "" || phonenumber != null)) {
                if (phonenumber.match("(?:\\+88|88)?(01[3-9]\\d{8})")) {




                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                        body: JSON.stringify({
                            userid: userid,
                            name: Name,
                            phonenumber: phonenumber,
                            message: message,
                            address: address,
                        })
                    };

                    fetch('https://qwikmedic.pythonanywhere.com/helpSupport/new', requestOptions)
                        .then((response) => response.json())
                        .then((json) => {
                            if (lan == true) {
                                let success = "Thank you sir/madam" + "\n\n" + "We have recived your message." + "\n" + "We will contuct with you in short time.";
                                Alert.alert(
                                    "Message Send Successfully",
                                    success,
                                    [{ text: "Ok", onPress: () => navigation.navigate("Homepage") },
                                    ], { cancelable: true, });
                            }
                            else {
                                let success = "ধন্যবাদ স্যার/ম্যাডাম" + "\n\n" + "আমরা আপনার মেসেজ রিসিভ করেছি." + "\n" + "আমরা অল্প সময়ের মধ্যে আপনার সাথে যোগাযোগ করব.";
                                Alert.alert(
                                    "মেসেজ সফলভাবে পাঠানো হয়েছে",
                                    success,
                                    [{ text: "Ok", onPress: () => navigation.navigate("Homepage") },
                                    ], { cancelable: true });



                            }

                            setLoading1(false);


                        })
                        .catch((error) => {
                            setLoading1(false);
                            if (lan == true) {
                                Alert.alert(
                                    "No Internet Connection",
                                    "\n" + "please try again",

                                    [
                                        { text: "Ok" }
                                    ], { cancelable: true, });
                            }
                            else {
                                Alert.alert(
                                    "ইন্টারনেট সংযোগ নেই",
                                    "\n" + "অনুগ্রহ করে আবার চেষ্টা করুন ধন্যবাদ",


                                    [
                                        { text: "ঠিক আছে" }
                                    ], { cancelable: true, });
                            }
                        });

                }
                else {
                    setLoading1(false);
                    setPhonenumberflag(false);

                }

            }
            else if (phonenumber == "") {
                setLoading1(false);
                setPhonenumberflag(false);

            }

            else if (message == null) {
                setLoading1(false);
                setMessageflag(false);

            }

        }



    };

    // console.log(message)

    // const imgnumber = route.params.picSource;
    const images = {


        // image1: require('../assets/ser1.jpg')
        // image1: route.params.picSource === 1 ? require('../assets/ser1.jpg') : route.params.picSource === 2 ?  require('../assets/ser2.jpg') : route.params.picSource === 3 ?  require('../assets/ser3.jpg') : route.params.picSource === 4 ?  require('../assets/acservice1.jpg') :route.params.picSource === 5 ?  require('../assets/ser5.jpg') : route.params.picSource === 6 ? require('../assets/ser6.jpg') : route.params.picSource === 10 ? require('../assets/Welding_Industrial.jpg') : route.params.picSource === 7 ? require('../assets/aluminium.jpg') : route.params.picSource === 8 ? require('../assets/tailsmojaic.jpg') : route.params.picSource === 11 ? require('../assets/truckgari.jpg') : require('../assets/doorfittings.jpg')

    };



    const onPressMobileNumberClick = (number) => {

        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }

        Linking.openURL(phoneNumber);
    };

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

        <SafeAreaView style={styles.MainContainer}>
            <StatusBar
                animated={true}
                backgroundColor="#303030"
            // barStyle={statusBarStyle}

            />
            <View style={styles.navbar}>

                <Text style={{ left: 55, top: 17, color: colors.black, fontWeight: '700', fontSize: 14 }} >Help & Support</Text>

            </View>
            <View style={styles.body1}>
                <ScrollView style={{ width: '95%' }}>
                    {/* <View style={{display: route.params.picture ? "flex" : "none" ,paddingTop:5,justifyContent: "center",alignItems:'center',}}>
                            <Image resizeMode='cover' style={[styles.ImgContainer]} source={images.image1}/>
                        </View> */}

                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', top: 10 }}>

                        <View style={[styles.mainbody, { borderColor: colors.white1, borderWidth: 1, borderRadius: 4, marginTop: 0, marginBottom: 0, }]}>


                            <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', borderBottomColor: colors.white1, borderBottomWidth: 1, marginTop: 10 }}>
                                <Text style={{ marginTop: 10, color: colors.black, fontSize: 14, marginBottom: 10, fontWeight: '700', display: lan ? 'flex' : 'none', left: 10 }}>Let us know your feedback & issues</Text>

                            </View>



                            <View style={styles.sendform}>

                                <View style={styles.inputdiv}>
                                    <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 0 }}>
                                        <Text style={{ color: phonenumberflag ? colors.ash : colors.red, fontSize: 12, fontWeight: '700', marginBottom: 7, display: lan ? 'none' : 'flex' }}>ফোন নাম্বার</Text>
                                        <Text style={{ color: phonenumberflag ? colors.ash : colors.red, fontSize: 12, fontWeight: '700', marginBottom: 7, display: lan ? 'flex' : 'none' }}>Phone No <Text style={{ color: colors.red }}>*</Text></Text>
                                    </View>
                                    <TextInput
                                        style={[styles.input, { borderColor: phonenumberflag ? "#C7C8D2" : colors.red, }]}
                                        onChangeText={newTest => setPhonenumber(newTest)}
                                        defaultValue={phonenumber}
                                        keyboardType='numeric'
                                        maxLength={11}
                                        placeholder="Enter your number"
                                        placeholderTextColor={colors.ash}
                                    />
                                    <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, display: phonenumberflag ? 'none' : 'flex' }}>

                                        <Text style={{ color: colors.red, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Invalid number<Text style={{ color: colors.red }}></Text></Text>

                                    </View>
                                </View>
                                <View style={{ width: '100%', height: 10, }} />

                                <View style={{ width: '100%', height: 30 }} />


                                <View style={{ width: '100%', height: 50, display: renterflag == true ? 'flex' : 'none' }} />

                                <View style={[styles.inputdiv]}>
                                    <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 0 }}>

                                        <Text style={{ color: messageflag ? colors.ash : colors.red, fontSize: 12, fontWeight: '700', marginBottom: 7, display: lan ? 'none' : 'flex' }}>মেসেজ</Text>
                                        <Text style={{ color: messageflag ? colors.ash : colors.red, fontSize: 12, fontWeight: '700', marginBottom: 7, display: lan ? 'flex' : 'none' }}>Feedbacks <Text style={{ color: colors.red }}>*</Text></Text>
                                    </View>
                                    <TextInput
                                        style={[styles.input, { height: 100, borderColor: messageflag ? "#C7C8D2" : colors.red, }]}
                                        multiline={true}
                                        onChangeText={newTest => setMessage(newTest)}
                                        defaultValue={message}
                                        numberOfLines={5}
                                        placeholderTextColor={colors.ash}
                                        placeholder={lan ? "Enter your feedbacks & issues..." : "আপনার মেসেজ টাইপ করুন..."} />

                                </View>
                                <View style={{ marginTop: 15, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, display: messageflag ? 'none' : 'flex' }}>

                                    <Text style={{ left: 10, color: colors.red, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>message box can't be empty<Text style={{ color: colors.red }}></Text></Text>

                                </View>

                                <View style={{ width: '100%', height: 40 }} />

                                <Pressable style={[styles.tuchabluebutton, { backgroundColor: isLoading1 ? colors.ash : '#065540', flexDirection: 'row' }]} onPress={() => { setLoading1(true), SendMessage(); }}>
                                    <ActivityIndicator size="small" color="#00263C" style={{ display: isLoading1 ? 'flex' : 'none', right: 30 }} />
                                    <Text style={{ color: '#FFF', fontSize: 14, display: lan ? 'none' : 'flex' }}>মেসেজ পাঠান</Text>
                                    <Text style={{ color: '#FFF', fontSize: 14, display: lan ? 'flex' : 'none' }}>Send</Text>
                                </Pressable>

                            </View>
                        </View>


                        <View style={{ width: '100%', borderColor: colors.ash1, borderRadius: 6, borderWidth: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 25, height: 90, marginBottom: 20, left: 0, flexDirection: 'row', }}>

                            <View style={{ width: '50%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 20, top: 5 }}>
                                <Text style={{ fontSize: 12, color: colors.ash, paddingTop: 10, display: lan ? 'none' : 'flex' }}>সেফটি টিপস</Text>
                                <Text style={{ fontSize: 12, color: colors.ash, paddingTop: 10, display: lan ? 'flex' : 'none' }}>Available 24 hours</Text>

                                <Text style={{ fontSize: 14, color: colors.black, paddingTop: 10 }}>Call us our helpline</Text>

                            </View>
                            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', top: 35, left: 10 }}>

                                {getaccountdata.map((item, index) => {
                                    if (item.id == 1) {

                                        return <View key={index}>
                                            <Text style={[styles.textstyle, { color: '#00646B', right: 10, fontWeight: '700' }]} onPress={() => { onPressMobileNumberClick(item.phonenumber); }}>{item.phonenumber}</Text>

                                            {/* <Callcalling style={{top:2}} onPress={() => { onPressMobileNumberClick(item.phonenumber) }}/> */}

                                        </View>;
                                    }
                                })}


                            </View>



                        </View>

                        {/* <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',marginBottom:140,marginTop:30,left:20}}>

                             
                                    <Text style={{color:"#2C3135",fontSize:15,display : lan ? 'none' : 'flex'}} onPress={() => {navigation.navigate("Conditions",{userid:userid,lan:lan})}}>*     <Text style={{textDecorationLine:'underline'}}>শর্তাবলী  এবং  নীতিমালা</Text></Text>
                                    <Text style={{color:"#2C3135",fontSize:15,display : lan ? 'flex' : 'none'}} onPress={() => {navigation.navigate("Conditions",{userid:userid,lan:lan})}}>*     <Text style={{textDecorationLine:'underline'}}>Terms  &  Conditions</Text></Text>
                                    <Text style={{color:"#2C3135",fontSize:15,top:20,display : lan ? 'none' : 'flex'}} onPress={() => {navigation.navigate("Privacy",{userid:userid,lan:lan})}}>*    <Text style={{textDecorationLine:'underline'}}>গোপনীয়তার নীতিমালা</Text></Text>
                                    <Text style={{color:"#2C3135",fontSize:15,top:10,display : lan ? 'flex' : 'none'}} onPress={() => {navigation.navigate("Privacy",{userid:userid,lan:lan})}}>*     <Text style={{textDecorationLine:'underline'}}>Privacy Policy</Text></Text>

                                </View> */}

                    </View>
                </ScrollView>

                <View style={{ marginBottom: 5, width: '95%', height: 38, borderColor: '#D50400', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: nointernet ? "flex" : "none" }}>
                    <Text style={{ marginLeft: 15, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: "#D50400" }}>No Internet Connection.</Text>
                </View>

            </View>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    footerStyle: {
        height: '8%',
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    tuchabluebuttonf: {
        width: "20%",
        height: '100%',
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: 'center',
    },
    mainbody: {
        flex: 1,
        paddingBottom: 20,
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },


    inputdiv: {
        width: "90%",
        height: 84,
        justifyContent: "center",
        alignItems: 'center',
        paddingBottom: 10,
        //top:-100

    },

    input: {
        width: "100%",
        height: 50,
        borderColor: '#C7C8D2',
        borderWidth: 1,
        alignItems: 'center',
        padding: 10,
        borderRadius: 4,
        fontSize: 15,
        paddingLeft: 25

    },


    navbar: {

        backgroundColor: colors.white,
        width: '100%',
        height: 50,
    },
    sendform: {

        width: "100%",
        justifyContent: "center",
        alignItems: 'center',
        paddingTop: 30,
    },

    tuchabluebutton: {
        // paddingTop:20,
        width: "90%",
        height: 35,
        borderRadius: 4,
        backgroundColor: "#303030",
        justifyContent: "center",
        alignItems: 'center',

    },
    ImgContainer: {

        width: "97.5%",
        height: 160,

    },
    body1: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',

    },

});

export default Contuctus;