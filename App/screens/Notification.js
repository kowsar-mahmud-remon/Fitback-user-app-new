import React, { useState, useEffect, useContext, useRef } from 'react';
import { Animated, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Alert } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';


import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";

import { UserContext } from '../../components/CredintailsContext';

import AsyncStorage from '@react-native-async-storage/async-storage';


import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

function Notification({ navigation, route }) {
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


    const [unread, setUnread] = useState(false);
    const { authtoken, setAuthtoken } = useContext(UserContext);
    const [unread1, setUnread1] = useState(false);

    const [getnotify, setGetnotify] = useState(true);
    const [city, setCity] = useState(null);
    const [area, setArea] = useState(null);
    const [filter, setFilter] = useState(null);

    const [lan, setLan] = useState(true);


    const [notallow, setNotallow] = useState(testCredentials.userid == 0 ? true : false);

    //IMAGE PERMITION
    const [hasGallaryPermission, setHasGallaryPermission] = useState(null);
    const [image, setImage] = useState(null);

    const [ready, setReady] = useState(false);
    const [imageupdate, setImageupdate] = useState(null);
    const [imageupdate1, setImageupdate1] = useState(null);


    const [falgimg1, setFalgimg1] = useState(false);

    const [newimg, setNewimg] = useState(false);

    const [getdiscount, setGetdiscount] = useState(null);

    const [notify, setNotify] = useState(testCredentials.notify);
    const [cartbuy, setCartbuy] = useState(testCredentials.cartbuy);
    const [cartrent, setCartrent] = useState(testCredentials.cartrent);
    const [productsave, setProductsave] = useState(testCredentials.productsave);
    const [flatsave, setflatsave] = useState(testCredentials.flatsave);

    //const [x,setX] = useState(null);
    let x = "";
    const [filterview, setFilterview] = useState(route.params.filter);


    const [minvalue, setMinvalue] = useState(route.params.minvalue);
    const [maxvalue, setMaxvalue] = useState(route.params.maxvalue);
    const [offer, setOffer] = useState(route.params.offer);


    const [locationflag, setLocationflag] = useState(false);
    const [getFlTreesetGetTree] = useState(true);

    const [getProduct, setGetProduct] = useState(true);

    const [getProduct1, setGetProduct1] = useState(true);

    const [getProductdata, setGetProductdata] = useState(null);
    // console.log("setGetProductdata", getProductdata);

    const [allimage, setAllimage] = useState([]);
    console.log("allimage", allimage);

    const [FilterID, setFilterID] = useState(null);

    const [search, setSearch] = useState("");
    const [searchFlag, setSearchFlag] = useState(false);

    const [animate, setAnimate] = useState(true);


    const [text, setText] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [isLoading123, setLoading123] = useState(true);

    const [nointernet, setNointernet] = useState(false);
    const [isLoading1, setLoading1] = useState(false);

    const [getFlat, setGetFlat] = useState(true);
    const [getFlatdata, setGetFlatdata] = useState([]);

    const [nodata, setNodata] = useState(true);

    const [getelecteic, setGetElecteic] = useState([]);
    const [getplants, setGetplants] = useState([]);

    const [getpackage, setGetpackage] = useState([]);
    const [arrayloading, setArrayloading] = useState(true);

    const [getallf, setGetallf] = useState([]);

    let formdata = new FormData();

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn1 = (move) => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
        }).start(() => {

            setLoading(false);
            move == 1 ? navigation.navigate("OrdermedicineHome", {}) : navigation.navigate("Notification", {});

            // setSuccessorder(false)

            // setProceedorder(false)

            // navigation.navigate("OrderDetails",{orderid: orderid,showtype: true})



        });

    };

    const ProductInfo = async () => {
        try {
            if (getProduct) {


                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://qwikit1.pythonanywhere.com/notification', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {

                        setGetProductdata(json.reverse());

                        // json.map((item,index)=>{
                        //     if(item.userid == userid && item.readstatus == false)
                        //     {
                        //         setUnread(true)
                        //         console.log("unread")
                        //     }
                        // })



                        setNointernet(false);


                    })
                    .catch((error) => {
                        console.error(error);
                        setNointernet(true);
                        setLoading1(false);
                    });

                // unread ?  persistUser({userid: testCredentials.userid,notify:true,lan:true,raddress: testCredentials.raddress,cartbuy: testCredentials.cartbuy,cartrent:testCredentials.cartrent,productsave: testCredentials.productsave,flatsave: testCredentials.flatsave}) : persistUser({userid: testCredentials.userid,notify:false,lan:true,raddress: testCredentials.raddress,cartbuy: testCredentials.cartbuy,cartrent:testCredentials.cartrent,productsave: testCredentials.productsave,flatsave: testCredentials.flatsave})



            }

            // console.log("hit");
        }
        catch (error) {
            console.error(error);
            setLoading1(false);
        } finally {

            setLoading(false);
            setLoading123(false);

        }

        setGetProduct(false);


    };


    const CheckProductInfo = async (move) => {
        try {
            if (getProduct1) {


                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://qwikit1.pythonanywhere.com/notification', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {


                        json.map((item, index) => {
                            if ((item.user_codeId == userid || item.user_codeId == '0') && item.readstatus == false) {
                                setUnread1(true);
                                // console.log("unread")
                            }
                        });



                        setNointernet(false);


                    })
                    .catch((error) => {
                        console.error(error);
                        setNointernet(true);
                        setLoading1(false);
                    });

                unread1 ? persistUser({ userid: testCredentials.userid, notify: true, lan: true, raddress: testCredentials.raddress, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave }) : persistUser({ userid: testCredentials.userid, notify: false, lan: true, raddress: testCredentials.raddress, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });



            }

            // console.log("hit");
        }
        catch (error) {
            console.error(error);
            setLoading1(false);
        } finally {


            // where to go

            move == 1 ? navigation.navigate("OrdermedicineHome", {}) :
                move == 2 ? navigation.navigate("Myappointment", {}) :
                    move == 3 ? navigation.navigate("AmbulanceRequest", { nofi: true }) :
                        move == 4 ? navigation.navigate("BloodDonation", {}) :
                            move == 5 ? navigation.navigate("Heathmart", {}) :
                                move == 5 ? navigation.navigate("MakeAppoinment", { getDoctordata: [] }) :
                                    navigation.navigate("Promohome", {});


        }

        setGetProduct1(false);


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

    const [checkdata, setCheckdata] = useState(true);

    const Getdata = () => {


        if (checkdata) {

            getProductdata.map((item, index) => {
                if (item.user_codeId == userid || item.user_codeId == '0') {
                    allimage.push(item);
                }
            });
        }
        setArrayloading(false);
        setCheckdata(false);

    };

    //  const[checkdata1,setCheckdata1] = useState(true)

    //  const Getdata1 = ()=>{
    //     if(checkdata1){

    //         setUnread(false)

    //         getProductdata.map((item,index)=>{
    //             if(item.userid == userid && item.readstatus == false)
    //             {
    //                 setUnread(true)
    //             }
    //         })
    //     }
    //     setCheckdata(false)

    //  }


    const Updatenotification = (itemid, read, move) => {

        setLoading(true);

        if (read == true) {
            // where to go

            move == 1 ? navigation.navigate("OrdermedicineHome", {}) :
                move == 2 ? navigation.navigate("Myappointment", {}) :
                    move == 3 ? navigation.navigate("AmbulanceRequest", { nofi: true }) :
                        move == 4 ? navigation.navigate("BloodDonation", {}) :
                            move == 5 ? navigation.navigate("Heathmart", {}) :
                                move == 5 ? navigation.navigate("MakeAppoinment", { getDoctordata: [] }) :
                                    navigation.navigate("Promohome", {});

        }
        else {

            const requestOptions1 = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                body: JSON.stringify({

                    readstatus: true,

                })
            };

            fetch('https://qwikit1.pythonanywhere.com/notification/' + itemid, requestOptions1)
                .then((response) => response.json())
                .then((json) => {

                    CheckProductInfo(move);
                    // setUnread(false)

                    // setGetProductdata([])


                    // setGetProduct(true)

                    // setLoading123(false)
                    // ProductInfo()

                    // fadeIn1(move)


                    // move == 1 ? navigation.navigate("OrdermedicineHome",{}) : navigation.navigate("Notification",{})


                })
                .catch((error) => {
                    setNointernet(true);

                });

        }



    };


    const deleteimg = (itemid) => {


        const requestOptions1 = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
        };

        fetch('https://qwikit1.pythonanywhere.com/prescription/' + itemid, requestOptions1)
            .then(response => response.ok)
            .then((json) => {
                setNointernet(false);
                navigation.navigate("Homepage", { uploadprescription: true });
            })
            .catch((error) => {
                setNointernet(true);

            });

        // setImage(null)
        // setFalgimg1(false)
        // setNewimg(true)

    };



    useEffect(() => {

        ProductInfo();


        if (isLoading123 == false) {
            Getdata();
        }


    });
    // console.log(searchFlag)

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
        <SafeAreaView style={{ width: '100%', height: '100%' }}>

            <View style={styles.MainContainer}>
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

                        <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Notification </Text>

                    </View>



                </View>



                <ScrollView style={{ width: '100%', height: '100%' }}>
                    <View style={[styles.body1, { justifyContent: 'flex-start', alignItems: 'center', width: '100%', top: 10, marginBottom: 40 }]}>

                        {isLoading ? <ActivityIndicator size="large" color="#2D6A8D" style={{ paddingTop: 100 }} /> : allimage.map((item, index) => (

                            <View key={item.id} style={{ justifyContent: 'center', alignItems: 'center', width: '98%', borderColor: colors.white1, borderWidth: .5, height: 85, }}>

                                <Pressable style={{ alignItems: 'center', width: '98%', height: 70, bottom: 4, borderRadius: 4, backgroundColor: item.readstatus == false ? '#E4E4E4' : '#F9F9F9', flexDirection: 'row', borderBottomColor: colors.white1, borderBottomWidth: 0, marginTop: 10, shadowColor: '#000', shadowOffset: { width: 1.5, height: 1.5 }, shadowOpacity: 0.8, elevation: 6, }} onPress={() => Updatenotification(item.id, item.readstatus, item.movepageid)}>

                                    <Image resizeMode={'contain'} style={{ marginLeft: 10, width: 35, height: 35, opacity: .80 }} source={item.movepageid == 1 ? require("../assets/estore.jpg") : item.movepageid == 1 ? require("../assets/estore.jpg") : item.movepageid == 2 ? require("../assets/services_online_doctor.jpg") : item.movepageid == 3 ? require("../assets/services_ambulance.jpg") : item.movepageid == 4 ? require("../assets/services_blood_donation.jpg") : item.movepageid == 5 ? require("../assets/nutrationandsupplements.jpg") : item.movepageid == 6 ? require("../assets/14generalpractinioner.jpg") : require("../assets/top_right_promo.jpg")} />
                                    <View>
                                        <Text style={{ paddingLeft: 15, fontSize: 11.5, bottom: 5, paddingRight: 40 }}>{item.tytle}</Text>

                                        <Text style={{ paddingLeft: 15, color: colors.ash, fontSize: 11 }}>{item.avtivedate}  {item.avtivetime}</Text>
                                    </View>

                                </Pressable>

                            </View>
                        ))}

                    </View>



                    <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', display: (allimage === undefined || allimage.length == 0) && nointernet == false && isLoading == false ? 'flex' : 'none' }}>
                        {/* <EmptyCart/> */}
                        <Image
                            style={{ width: 135, height: 120 }}
                            resizeMode='contain'
                            source={require('../assets/emptcartnew.jpg')}
                        // source={{uri: "http://drive.google.com/uc?export=view&id=1R99J_v7DGG5Ne-xvaArWe9UD4dTK8-Yh"}}
                        />
                        <Text style={{ fontSize: 11, letterSpacing: .9, fontFamily: 'Poppins_500Medium', color: colors.black, marginTop: 10 }}>No notification found</Text>
                        {/* <Text style={{fontSize:12,fontWeight:'400',color:colors.ash,marginTop:10}}>Let’s check our trendy <Text style={{fontSize:12,fontWeight:'400',textDecorationLine:'underline',color:colors.ash}} onPress={() => navigation.navigate("PagkageDecoration",{})}>new items</Text> </Text> */}
                    </View>


                </ScrollView>


                {/* no internet  */}



                <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', marginBottom: 350, display: nointernet ? 'flex' : 'none' }}>
                    {/* <Nointernet/> */}
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.black, marginTop: 10 }}>No Internet Connection</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.ash, marginTop: 10 }}>Please check you internet connection <Text style={{ fontSize: 12, fontWeight: '400', textDecorationLine: 'underline', color: colors.ash }} onPress={() => { setLoading123(true), setLoading1(true), setGetProduct(true), setCheckdata(true); }}>try again</Text> </Text>
                </View>

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
    );
}
const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: colors.body,
        justifyContent: "center",
        alignItems: 'center',
        height: '92%',
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

    ImgContainer: {

        width: 300,
        height: 250,

    },

    tuchabluebutton: {
        // paddingTop:20,
        width: "55%",
        height: 35,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: 'center',
        top: 20

    },
    navbarbutton: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textstyle: {
        color: '#FFF',
        fontSize: 14,
    },
    textstyle1: {
        color: colors.blacktext,
        fontSize: 12,
        //fontFamily:'Nunito',
    },
    body1: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',


    },
    searchview: {
        width: '100%',
        height: 50,
        top: 3,
        justifyContent: "center",
        alignItems: 'center',

    },

    input: {
        width: "94%",
        height: 40,
        borderColor: colors.ash1,
        borderWidth: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        //padding:5,
        paddingLeft: 45,
        borderRadius: 3,
        paddingRight: 30,
        fontSize: 12,

    },
    adds: {
        width: "100%",
        height: 240,

        borderColor: colors.ash1,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: colors.white,

    },
    addsImg: {
        width: '100%',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        height: '100%',
    },
    addstext: {
        width: '100%',
        height: 115,

    },
    adds1: {
        width: 156,
        height: 187,

        borderColor: colors.ash1,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: colors.white,

    },
    addsImg1: {
        width: 156,
        // borderTopEndRadius:4,
        borderTopLeftRadius: 4,
        height: 104,
    },
    addstext1: {
        width: 149,
        height: 83,

    },
    flatdetails: {
        paddingLeft: 0,
        width: '100%',
        marginTop: 10
    }
});

export default Notification;