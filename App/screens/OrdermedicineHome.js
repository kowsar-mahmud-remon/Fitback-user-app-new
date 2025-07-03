import React, { useState, useEffect, useContext, useRef } from 'react';

import { ActivityIndicator, Animated, StyleSheet, SafeAreaView, Alert, View, StatusBar, Dimensions, Pressable, Text, ScrollView, TextInput, Image } from 'react-native';
import colors from '../config/colors';

import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";

//asyn-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserContext } from '../../components/CredintailsContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
function OrdermedicineHome({ navigation, route }) {
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

    const [getnotify, setGetnotify] = useState(true);

    const { authtoken, setAuthtoken } = useContext(UserContext);
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


    const [isLoading12, setLoading12] = useState(true);

    const [lan, setLan] = useState(true);

    const [notify, setNotify] = useState(testCredentials.notify);
    const [cartbuy, setCartbuy] = useState(testCredentials.cartbuy);
    const [cartrent, setCartrent] = useState(testCredentials.cartrent);
    const [productsave, setProductsave] = useState(testCredentials.productsave);
    const [flatsave, setflatsave] = useState(testCredentials.flatsave);

    const [notallow, setNotallow] = useState(testCredentials.userid == 0 ? true : false);

    //const [x,setX] = useState(null);
    let x = "";

    const [getFlat, setGetFlat] = useState(true);

    const [successorder, setSuccessorder] = useState(false);

    const [isLoading, setLoading] = useState(true);

    const [nointernet, setNointernet] = useState(false);

    const [isLoading1, setLoading1] = useState(false);

    const [nodata, setNodata] = useState(true);

    const [cartmsg, setCartmsg] = useState(false);

    const [location, setLocation] = useState(true);
    const [pharmacyname, setPharmacyname] = useState(null);
    const [phonenumber, setPhonenumber] = useState(null);
    const [discount, setDiscount] = useState(null);

    const [allsubmitted, setAllsubmitted] = useState([]);
    const [allonprogress, setAllonprogress] = useState([]);
    const [allcanceled, setAllcanceled] = useState([]);



    const [notok, setNotok] = useState(false);

    const [confirm, setConfirm] = useState(false);

    const [proceedorder, setProceedorder] = useState(false);

    let screenWidth = Dimensions.get('window').width - 14;
    let screenHight = Dimensions.get('window').height;

    // const [orderid, setOrderid] = useState(null);
    // const [rentorderid, setRentorderid] = useState(null);
    const [getorder, setGetorder] = useState(true);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [allorder, setAllorder] = useState([]);

    const [emptyList1, setEmptyList1] = useState(false);
    const [emptyList2, setEmptyList2] = useState(false);
    const [emptyList3, setEmptyList3] = useState(false);

    const [opt, setOp] = useState(true);
    const [opt1, setOp1] = useState(false);
    const [opt2, setOp2] = useState(false);

    const OnpressOpt = () => {
        setOp(true);
        setOp1(false);
        setOp2(false);


    };

    const OnpressOpt1 = () => {
        setOp(false);
        setOp1(true);
        setOp2(false);


    };
    const OnpressOpt2 = () => {
        setOp(false);
        setOp1(false);
        setOp2(true);

    };


    const fadeIn1 = (orderid) => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {

            setSuccessorder(false);

            // setProceedorder(false)

            navigation.navigate("OrderDetails", { orderid: orderid, showtype: true });



        });

    };

    const fadeIn2 = (orderid) => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {

            setSuccessorder(false);

            // setProceedorder(false)

            // navigation.navigate("RentDetailsOnprocess",{orderid : orderid,showtype:  true })



        });

    };


    const fadeIn3 = () => {


        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 7000,
            useNativeDriver: true
        }).start(() => { setNotok(false); });
    };

    const GetAllorder = async () => {
        try {
            if (getorder) {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://qwikit1.pythonanywhere.com/orderFitbackProduct', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {

                        // setAllorder(json.reverse());

                        const userOrders = json.filter(
                            (item) => String(item.userid) == (userid)
                        );

                        setAllorder(userOrders.reverse());


                        // setLoading1(false)

                        setNointernet(false);
                    })
                    .catch((error) => {
                        setNointernet(true);
                        setLoading1(false);

                    });


            }
        }
        catch (error) {
            setNointernet(true);
            // setLoading1(false)

        } finally {
            setLoading(false);
            setLoading12(false);
        }
        setGetorder(false);


    };

    const fadeIn4 = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
        }).start(() => { setCartmsg(false); });
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

    const addbuytocart = (data, tytle, regularPrice, discountPrice, image) => {


        data.map((item, index) => {

            cartbuy.map((item1, index) => {

                if (item1.productid == item.productid) {

                    cartbuy.splice(index, 1);

                }

            });

        });

        data.map((item, index) => {

            cartbuy.push({ productid: item.productid, image: item.image, tytle: item.tytle, regularPrice: item.regularPrice, discountPrice: item.discountPrice, quantity: item.quantity, totalprice: item.totalprice, totalregularPrice: item.totalregularPrice });

        });


        persistUser({ userid: userid, notify: testCredentials.natify, lan: true, raddress: testCredentials.raddress, cartbuy: cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });

        setCartmsg(true);

        fadeIn4();

    };



    const [checkdata1, setCheckdata1] = useState(true);

    const Getdata1 = () => {
        if (checkdata1) {
            //    console.log("checkdatacheckdatacheckdata")



            {
                allorder.map((item, index) => {
                    console.log("useridddddddddd", item.userid, userid);

                    // if (item.userid == userid && item.orderstatus != 'submitted'
                    // ) {
                    //     allsubmitted.push(item);
                    // }

                    // if (item.userid == userid && (item.orderstatus == 'completed' || item.orderstatus == 'Delivered')) {
                    //     allonprogress.push(item);
                    // }

                    // if (item.userid == userid && item.orderstatus == 'Cancelled') {
                    //     allcanceled.push(item);
                    // }




                    if (item.orderstatus == 'submitted') {
                        allsubmitted.push(item);
                    }

                    if (
                        // item.userid == userid && 
                        item.orderstatus == 'completed' || item.orderstatus == 'Delivered'
                    ) {
                        allonprogress.push(item);
                    }

                    if (
                        // item.userid == userid && 
                        item.orderstatus == 'Cancelled') {
                        allcanceled.push(item);
                    }


                });
            }

            if (allsubmitted.length === 0) {
                setEmptyList1(true);
            }
            if (allonprogress.length === 0) {
                setEmptyList2(true);
            }
            if (allcanceled.length === 0) {
                setEmptyList3(true);
            }

            setLoading1(false);


        }
        setCheckdata1(false);

    };



    const OrderAgain = (item) => {

        // setConfirm(true)
        //Get Current Date
        var date = new Date().getDate();

        //Get Current Month
        var month = new Date().getMonth() + 1;

        //Get Current Year
        var year = new Date().getFullYear();

        //Get Current Time Hours
        var hours = new Date().getHours();

        //Get Current Time Minutes
        var min = new Date().getMinutes();

        //Get Current Time Seconds
        var sec = new Date().getSeconds();

        var statusdate = date + '/' + month + '/' + year;

        var statustime = hours + ':' + min + ':' + sec;



        setLoading1(true);


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({


                userid: item.userid,
                username: item.username,
                phonenumber: item.phonenumber,
                address: item.address,
                totalquantity: item.totalquantity,
                totalamount: item.totalamount,
                orderproductdata: item.orderproductdata,
                orderstatus: 'submitted',
                paymentstatus: 'unpaid',
                paymentmethod: item.paymentmethod,
                voucherstatus: item.voucherstatus,
                freedeliverystatus: item.freedeliverystatus,
                voucher: item.voucher,
                notes: item.notes,
                vat: item.vat,
                totalMRP: item.totalMRP,
                totalproductamount: item.totalproductamount,
                deliverycharge: item.deliverycharge,
                orderdate: statusdate,
                ordertime: statustime
            })
        };

        fetch('https://qwikit1.pythonanywhere.com/orderFitbackProduct/new', requestOptions)
            .then((response) => response.json())
            .then((json) => {


                // persistUser({userid:userid,lan:true,raddress: testCredentials.raddress,cartbuy:[] ,cartrent: testCredentials.cartrent,productsave: testCredentials.productsave,flatsave: testCredentials.flatsave })

                setSuccessorder(true);

                fadeIn2();

                setNointernet(false);
                setLoading1(false);

                GetAllorder();
                setGetorder(true);

                setEmptyList2(false);

                setAllonprogress([]);
                setAllsubmitted([]);

                setLoading12(true);
                setCheckdata1(true);



                // navigation.navigate("UserProfileLatest",{flagRe:true})

            })
            .catch((error) => {
                setLoading1(false);
                console.error(error);
                setNointernet(true);
            });



        if (nointernet == true) {
            setLoading1(false);
            setNointernet(true);


        }
    };

    const UpdateStatus = (orderid, pharmacytotalamount) => {


        // setAmount(amount.toString())
        //Get Current Date
        var date = new Date().getDate();

        //Get Current Month
        var month = new Date().getMonth() + 1;

        //Get Current Year
        var year = new Date().getFullYear();

        //Get Current Time Hours
        var hours = new Date().getHours();

        //Get Current Time Minutes
        var min = new Date().getMinutes();

        //Get Current Time Seconds
        var sec = new Date().getSeconds();

        var statusdate = date + '/' + month + '/' + year;

        var statustime = hours + ':' + min + ':' + sec;

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({
                pharmacyid: userid,
                orderstatus: 'onprogress',
                parcelreadystatusdate: statusdate,
                parcelreadystatustime: statustime,
                pharmacyname: pharmacyname,
                pharmacynumber: phonenumber,
                pharmacylocation: location,
                pharmacytotalamount: pharmacytotalamount
            })
        };

        fetch('https://qwikit1.pythonanywhere.com/orderFitbackProduct/' + orderid, requestOptions)
            .then((response) => response.json())
            .then((json) => {
                // console.log('create expance', json);
                setNointernet(false);

                setLoading1(true);

                GetAllorder();
                setGetorder(true);

                setEmptyList2(false);

                setAllonprogress([]);
                setAllsubmitted([]);

                setLoading12(true);
                setCheckdata1(true);


            })
            .catch((error) => {
                setLoading1(false);
                console.error(error);
                setNointernet(true);
            });




        if (nointernet == true) {
            setLoading1(false);
            setNointernet(true);
        }
    };

    // const UserInfo = ()=>{


    //         if(getFlat && userid != 0)
    //         {

    //             const requestOptions1 = {
    //                 method: 'GET',
    //                 headers: { 'Content-Type': 'application/json','Accept': 'application/json', 'Authorization': authtoken},
    //             };

    //             fetch('https://qwikit1.pythonanywhere.com/pharmacyProfile/'+userid, requestOptions1)
    //             .then((response) => response.json())
    //             .then((json) => {

    //                 setNointernet(false)
    //                 setPharmacyname(json.pharmacyname)
    //                 setPhonenumber(json.phonenumber)
    //                 setLocation(json.area ? json.streetaddress+", "+json.area+", "+json.city+" "+json.postcode : null)
    //                 setDiscount(json.discount)
    //             })
    //             .catch((error) => {
    //                 setNointernet(true)
    //             });
    //         }
    //         setLoading(false)
    //         setGetFlat(false)
    //     }


    useEffect(() => {
        GetAllorder();
        // NotificationCheck()
        // UserInfo()

        if (isLoading12 == false) {
            Getdata1();
            // setLoading1(false)
        }
        // console.log(allsubmitted)
        // console.log(allonprogress)
        // console.log(cartbuy)


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
        <SafeAreaView style={{ width: '100%', height: '100%' }}>

            <View style={[styles.MainContainer]}>

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

                        <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Order </Text>

                    </View>



                </View>

                <View style={{ marginTop: 20, width: '100%', height: 38, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', left: 0 }}>

                    <Pressable style={{ marginLeft: 0, flexDirection: 'row', borderRadius: 4, width: '28%', height: 28, backgroundColor: opt ? "#EE416C" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { OnpressOpt(); }}>



                        <Text style={{ fontSize: 11.5, color: opt ? colors.white : "#EE416C", fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>ACTIVE</Text>

                    </Pressable>
                    <Pressable style={{ marginLeft: 0, flexDirection: 'row', borderRadius: 4, width: '32%', height: 28, backgroundColor: opt1 ? "#EE416C" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { OnpressOpt1(); }}>



                        <Text style={{ fontSize: 11.5, color: opt1 ? colors.white : "#EE416C", fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>COMPLETED</Text>

                    </Pressable>
                    <Pressable style={{ marginLeft: 0, flexDirection: 'row', borderRadius: 4, width: '28%', height: 28, backgroundColor: opt2 ? "#EE416C" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { OnpressOpt2(); }}>


                        <Text style={{ fontSize: 11.5, color: opt2 ? colors.white : "#EE416C", fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>CANCELED</Text>

                    </Pressable>



                </View>

                <ScrollView style={{ width: '100%', height: '100%', bottom: 10 }}>

                    {/* <Text style={{marginLeft:10,fontSize:14,fontFamily: 'Poppins_400Regular',letterSpacing:.9,color:"#067A1F"}}>You’ve order is plased SccessFully.</Text> */}


                    <View style={{ width: '100%', marginTop: 10 }}>


                        {isLoading ? <ActivityIndicator size="large" color="#2D6A8D" style={{ paddingTop: 10, height: 200 }} /> :
                            <View style={{ width: '100%', display: opt ? 'flex' : 'none', marginBottom: 10 }}>



                                <View style={{ width: '100%', height: '100%', display: emptyList1 ? 'none' : 'flex', marginBottom: 10 }}>

                                    <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, left: 10, display: 'flex', bottom: 10 }}>
                                        <View style={{ borderBottomWidth: 0.5, borderColor: colors.green, width: '22%', justifyContent: 'center', alignItems: 'center' }}>

                                            <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 11 }]}>ORDER</Text>

                                        </View>

                                        <View style={{ borderBottomWidth: 0.5, borderColor: colors.green, width: '25%', justifyContent: 'center', alignItems: 'center' }}>

                                            <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 11 }]}>DATE</Text>

                                        </View>

                                        <View style={{ borderBottomWidth: 0.5, borderColor: colors.green, width: '15%', justifyContent: 'center', alignItems: 'center' }}>

                                            <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 11, fontSize: 11 }]}>ITEM(S)</Text>

                                        </View>

                                        <View style={{ borderBottomWidth: 0.5, borderColor: colors.green, width: '22%', justifyContent: 'center', alignItems: 'center' }}>

                                            <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 11 }]}>TOTAL(TK)</Text>

                                        </View>




                                    </View>

                                    {allsubmitted.map((item, index) => (
                                        <View key={index} style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }}>



                                            <Pressable style={[styles.samaryView, { marginBottom: 10, height: 50 }]} onPress={() => navigation.navigate("OrdermedicineDetails", { order: item, active: true })}>

                                                <View style={{ width: '22%', top: 7, justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                                                    <Text style={[{ color: "#000000", fontFamily: 'Poppins_400Regular', letterSpacing: .9, textDecorationLine: 'underline', fontSize: 11 }]}>00695{item.id}</Text>



                                                </View>
                                                <View style={{ width: '25%', top: 7, justifyContent: 'center', alignItems: 'center' }}>

                                                    <Text style={[{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 11 }]}>{item.orderdate}</Text>


                                                </View>
                                                <View style={{ width: '15%', left: 5, top: 7, justifyContent: 'center', alignItems: 'center' }}>

                                                    <Text style={[{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 11 }]}>{item.orderproductdata.length}</Text>

                                                </View>

                                                <View style={{ width: '22%', top: 7, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                    <Text style={[{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 11 }]}>{item.suppertotalamount}.00</Text>
                                                </View>



                                            </Pressable>

                                        </View>
                                    ))}


                                    {/* <ActivityIndicator size="small" color="#0000ff"  animating={animate}/> */}



                                </View>

                            </View>
                        }

                        <View style={{ width: '100%', display: opt1 ? 'flex' : 'none', marginBottom: 10 }}>



                            <View style={{ width: '100%', height: '100%', display: emptyList2 ? 'none' : 'flex', marginBottom: 10 }}>


                                <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, left: 10, display: 'flex', bottom: 10 }}>
                                    <View style={{ borderBottomWidth: 0.5, borderColor: colors.green, width: '22%', justifyContent: 'center', alignItems: 'center' }}>

                                        <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 11 }]}>ORDER #</Text>

                                    </View>

                                    <View style={{ borderBottomWidth: 0.5, borderColor: colors.green, width: '25%', justifyContent: 'center', alignItems: 'center' }}>

                                        <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 11 }]}>DATE</Text>

                                    </View>

                                    <View style={{ borderBottomWidth: 0.5, borderColor: colors.green, width: '15%', justifyContent: 'center', alignItems: 'center' }}>

                                        <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 11 }]}>ITEM(S)</Text>

                                    </View>

                                    <View style={{ borderBottomWidth: 0.5, borderColor: colors.green, width: '22%', justifyContent: 'center', alignItems: 'center' }}>

                                        <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 11 }]}>TOTAL(TK)</Text>

                                    </View>




                                </View>

                                {isLoading ? <ActivityIndicator size="large" color="#2D6A8D" style={{ paddingTop: 10, height: 200 }} /> : allonprogress.map((item, index) => (
                                    <View key={index} style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }}>



                                        <Pressable style={[styles.samaryView, { marginBottom: 10, height: 50 }]} onPress={() => navigation.navigate("OrdermedicineDetails", { order: item, complete: true })}>

                                            <View style={{ width: '22%', top: 7, justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                                                <Text style={[{ color: colors.blue, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textDecorationLine: 'underline', fontSize: 11 }]}>00695{item.id}</Text>



                                            </View>
                                            <View style={{ width: '25%', top: 7, justifyContent: 'center', alignItems: 'center' }}>

                                                <Text style={[{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 11 }]}>{item.orderdate}</Text>


                                            </View>
                                            <View style={{ width: '15%', left: 5, top: 7, justifyContent: 'center', alignItems: 'center' }}>

                                                <Text style={[{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 11 }]}>{item.orderproductdata.length}</Text>

                                            </View>

                                            <View style={{ width: '22%', top: 7, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                <Text style={[{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 11 }]}>{item.suppertotalamount}.00</Text>
                                            </View>



                                        </Pressable>

                                    </View>
                                ))}

                                {/* <ActivityIndicator size="small" color="#0000ff"  animating={animate}/> */}



                            </View>

                        </View>


                        <View style={{ width: '100%', display: opt2 ? 'flex' : 'none', marginBottom: 10 }}>



                            <View style={{ width: '100%', height: '100%', display: emptyList3 ? 'none' : 'flex', marginBottom: 10 }}>


                                <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, left: 10, display: 'flex', bottom: 10 }}>
                                    <View style={{ borderBottomWidth: 0.5, borderColor: colors.green, width: '22%', justifyContent: 'center', alignItems: 'center' }}>

                                        <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 11 }]}>ORDER #</Text>

                                    </View>

                                    <View style={{ borderBottomWidth: 0.5, borderColor: colors.green, width: '25%', justifyContent: 'center', alignItems: 'center' }}>

                                        <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 11 }]}>DATE</Text>

                                    </View>

                                    <View style={{ borderBottomWidth: 0.5, borderColor: colors.green, width: '15%', justifyContent: 'center', alignItems: 'center' }}>

                                        <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 11 }]}>ITEM(S)</Text>

                                    </View>

                                    <View style={{ borderBottomWidth: 0.5, borderColor: colors.green, width: '22%', justifyContent: 'center', alignItems: 'center' }}>

                                        <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 11 }]}>TOTAL(TK)</Text>

                                    </View>




                                </View>

                                {isLoading ? <ActivityIndicator size="large" color="#2D6A8D" style={{ paddingTop: 10, height: 200 }} /> : allcanceled.map((item, index) => (
                                    <View key={index} style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }}>



                                        <Pressable style={[styles.samaryView, { marginBottom: 10, height: 50 }]} onPress={() => navigation.navigate("OrdermedicineDetails", { order: item, cancel: true })}>

                                            <View style={{ width: '22%', top: 7, justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                                                <Text style={[{ color: colors.blue, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textDecorationLine: 'underline', fontSize: 11 }]}>00695{item.id}</Text>



                                            </View>
                                            <View style={{ width: '25%', top: 7, justifyContent: 'center', alignItems: 'center' }}>

                                                <Text style={[{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 11 }]}>{item.orderdate}</Text>


                                            </View>
                                            <View style={{ width: '15%', left: 5, top: 7, justifyContent: 'center', alignItems: 'center' }}>

                                                <Text style={[{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 11 }]}>{item.orderproductdata.length}</Text>

                                            </View>

                                            <View style={{ width: '22%', top: 7, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                <Text style={[{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 11 }]}>{item.suppertotalamount}.00</Text>
                                            </View>



                                        </Pressable>

                                    </View>
                                ))}

                                {/* <ActivityIndicator size="small" color="#0000ff"  animating={animate}/> */}



                            </View>

                        </View>
                    </View>





                </ScrollView>

                <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', marginBottom: 300, display: emptyList1 && nointernet == false && opt ? 'flex' : 'none', flex: 0 }}>
                    {/* <Emptyorder1/> */}
                    <Text style={{ fontSize: 14, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.black, marginTop: 10 }}>No Active Orders</Text>
                    {/* <Text style={{fontSize:12,fontWeight:'400',color:colors.ash,marginTop:10}}>Let’s check our trendy <Text style={{fontSize:12,fontWeight:'400',textDecorationLine:'underline',color:colors.ash}} onPress={()=> navigation.navigate("PagkageDecoration",{})}>decoration items</Text> </Text> */}
                </View>
                <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', marginBottom: 300, display: emptyList2 && nointernet == false && opt1 ? 'flex' : 'none', flex: 0 }}>
                    {/* <Emptyorder1/> */}
                    <Text style={{ fontSize: 14, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.black, marginTop: 10 }}>No Transactions Found</Text>
                    {/* <Text style={{fontSize:12,fontWeight:'400',color:colors.ash,marginTop:10}}>Let’s check our trendy <Text style={{fontSize:12,fontWeight:'400',textDecorationLine:'underline',color:colors.ash}} onPress={()=> navigation.navigate("PagkageDecoration",{})}>decoration items</Text> </Text> */}
                </View>
                <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', marginBottom: 300, display: emptyList3 && nointernet == false && opt2 ? 'flex' : 'none', flex: 0 }}>
                    {/* <Emptyorder1/> */}
                    <Text style={{ fontSize: 14, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.black, marginTop: 10 }}>No Transactions Found</Text>
                    {/* <Text style={{fontSize:12,fontWeight:'400',color:colors.ash,marginTop:10}}>Let’s check our trendy <Text style={{fontSize:12,fontWeight:'400',textDecorationLine:'underline',color:colors.ash}} onPress={()=> navigation.navigate("PagkageDecoration",{})}>decoration items</Text> </Text> */}
                </View>
                <View style={{ bottom: 20, width: '95%', height: 38, borderColor: '#067A1F', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: cartmsg ? "flex" : 'none' }}>
                    {/* <Gtick style={{marginLeft:30}}/> */}
                    <Text style={{ marginLeft: 10, fontSize: 14, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: "#067A1F" }}>You’ve add this product in your Cart.</Text>
                </View>

                <View style={{ marginBottom: 20, width: '95%', height: 38, borderColor: '#067A1F', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: successorder ? "flex" : 'none' }}>
                    {/* <Gtick style={{marginLeft:10}}/> */}
                    <Text style={{ marginLeft: 10, fontSize: 14, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: "#067A1F" }}>You’ve order is plased SccessFully.</Text>
                </View>

                <View style={{ marginBottom: 5, width: '95%', height: 38, borderColor: '#D50400', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: nointernet ? "flex" : "none" }}>
                    <Text style={{ marginLeft: 15, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: "#D50400" }}>No Internet Connection.</Text>
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
    navbar1: {

        backgroundColor: colors.white,
        width: '60%',
        height: 40,
        left: 50,


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

    tuchabluebuttonf: {
        width: "20%",
        height: '100%',
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: 'center',
    },


    navbar: {

        // backgroundColor: colors.white,
        // width:'100%',
        // height:45,

        backgroundColor: colors.white,
        width: '100%',
        height: 55,

        shadowColor: '#000',
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 6,

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
        paddingBottom: 10,


    },
    searchview: {
        width: '100%',
        height: 60,
        top: 10,
        justifyContent: "center",
        alignItems: 'center',

    },
    adds: {
        width: '95%',
        // height:120,
        borderRadius: 6,
        flexDirection: 'row',
        borderColor: '#C7C8D2',
        borderWidth: 1,

    },
    addsImg: {
        width: 35,
        borderTopLeftRadius: 0,
        height: 45,
    },
    addstext: {
        width: '68%',
        height: 80,
        justifyContent: "center",
        alignItems: 'center',
        padding: 2.5,
        paddingLeft: 0,
        backgroundColor: "#E5E5E5",
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
    },
    flatdetails: {
        paddingLeft: 0,
        width: '100%',
        marginTop: 10
    }
});

export default OrdermedicineHome;