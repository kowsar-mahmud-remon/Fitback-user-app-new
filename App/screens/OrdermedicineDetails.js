import React, { useState, useEffect, useContext, useRef } from 'react';

import { ActivityIndicator, Animated, StyleSheet, SafeAreaView, Alert, View, StatusBar, Dimensions, Pressable, Text, ScrollView, TextInput, Image, Linking } from 'react-native';
import colors from '../config/colors';

import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserContext } from '../../components/CredintailsContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
function OrdermedicineDetails({ navigation, route }) {
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
    const [getnotify, setGetnotify] = useState(true);


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

    const [opt, setOp] = useState(true);
    const [opt1, setOp1] = useState(false);

    const [product, setProduct] = useState(route.params.order);

    const [active, setActive] = useState(route.params.active);
    const [complete, setComplete] = useState(route.params.complete);
    const [cancel, setCancel] = useState(route.params.cancel);


    const html = `
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    
    .coupon {
      border: 5px dotted #bbb;
      border-radius: 15px;
      margin: 0 auto;
      max-width: 600px;
      width: 90%;
      page-break-inside: avoid; /* Avoid breaking within the coupon */
    }
    
    .container {
      padding: 16px;
      background-color: #f1f1f1;
    }
    
    .promo {
      background: #ccc;
      padding: 3px;
    }
    
    .expire {
      color: red;
    }
    
    .total {
      color: rgb(255, 123, 0);
    }
    
    .content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }
    
    .box {
      flex: 1;
      padding: 10px;
    }
    
    .title {
      width: 100%;
      text-align: center;
    }
    
    table {
      width: 100%;
      margin: 0 auto;
      border-collapse: collapse;
      margin-top: 20px;
    }
    
    th, td {
      padding: 8px 12px;
      text-align: center;
      border: 1px solid #ddd;
    }
    
    th {
      font-family: 'Poppins', sans-serif;
      font-weight: bold;
      text-decoration: underline;
    }
    
    td {
      font-family: 'Poppins', sans-serif;
      font-size: 13px;
    }
    
    .page-break {
    //   page-break-before: always;
      break-before: always;
    }
    
    /* Responsive Adjustments */
    @media screen and (max-width: 600px) {
      .content {
        flex-direction: column;
      }
    
      .box {
        padding: 5px;
      }
    
      th, td {
        font-size: 12px;
      }
    }
    </style>
    </head>
    <body>
    
    <div class="coupon">
    
      <div style="text-align:center">
        <h3 style="font-family: 'Poppins', sans-serif;">Fitback Invoice</h3>
      </div>
    
      <div class="content">
        <div class="box">
          <h5 style="text-decoration: underline;font-family: 'Poppins', sans-serif;font-size: 15px;">DELIVERY ADDRESS:</h5>
          <h6 style="font-family: 'Poppins', sans-serif;font-size: 14px;">Name: ${product.username}</h6>
          <h6 style="font-family: 'Poppins', sans-serif;font-size: 14px;">Address: ${product.address}</h6>
          <h6 style="font-family: 'Poppins', sans-serif;font-size: 14px;">Mobile: ${product.phonenumber}</h6>
        </div>
        <div class="box" style="text-align:right;">
          <img src="../assets/fitback/fitbackLogo.png" alt="Logo" style="width:90px;height:80px;">
          <h6 style="font-family: 'Poppins', sans-serif;font-size: 14px;">ORDER: #qmo-000${product.id}</h6>
          <h6 style="font-family: 'Poppins', sans-serif;font-size: 14px;">DATE: ${product.orderdate}</h6>
        </div>
      </div>
    
      <div style="width:100%;text-align:center;margin-top:20px;">
        <table>
          <tr>
            <th>#</th>
            <th style="text-align:left;">NAME</th>
            <th>QNTY</th>
            <th style="text-align:right;">PRICE</th>
          </tr>
          ${product.orderproductdata.map((item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td style="text-align:left;">${item.tytle === "None" ? "" : item.tytle}<br>${item.power === "None" ? "" : item.power}</td>
            <td>${item.quantity} x ${parseFloat(item.discountPrice).toFixed(2)}</td>
            <td style="text-align:right;">${Math.round(item.totalprice)}</td>
          </tr>
          `).join('')}
        </table>
      </div>
    
      <div class="content page-break">
        <div class="box"></div>
        <div class="box" style="text-align:right; border-top: 1px solid #1b1a20; padding-top: 20px; margin-top:20px">
          <h5>ORDER SUBTOTAL:</h5>
          <h5>DISCOUNT:</h5>
          <h5>VAT:</h5>
          <h5>Q-REWARDS:</h5>
          <h5>PROMO:</h5>
          <h5>DELIVERY FEE:</h5>
          <h4 class="total">ORDER TOTAL:</h4>
          <h5>PAYMENT STATUS:</h5>
        </div>
        <div class="box" style="text-align:right; margin-top:20px">
          <h5>${product.totalMRP}</h5>
          <h5 class="expire">-${product.totalMRP - product.totalproductamount}</h5>
          <h5>${product.vat}</h5>
          <h5 class="expire">-${product.qmoney ? product.qmoney : '0'}</h5>
          <h5 class="expire">-${product.promoAmount}</h5>
          <h5>${product.deliverycharge}</h5>
          <h4 class="total">Tk ${product.totalprice}</h4>
          <h5>${product.orderstatus}</h5>
        </div>
      </div>
    
      
      
    
      <div style="text-align:center;margin-bottom:20px;">
        <h4 style="font-family: 'Poppins', sans-serif;">THANK YOU FOR YOUR BUSINESS</h4>
      </div>
    
    </div>
    
    </body>
    </html>
    `;


    {/* <div style="text-align:center;margin-top:20px;">
        <h4 style="font-family: 'Poppins', sans-serif;">Q-REWARDS EARNED: ${product.totalproductamount}</h4>
      </div> */}

    let generatePdf = async () => {
        const file = await printToFileAsync({
            html: html,
            base64: false
        });

        await shareAsync(file.uri);
    };


    const OnpressOpt = () => {
        setOp(true);
        setOp1(false);


    };

    const OnpressOpt1 = () => {
        setOp(false);
        setOp1(true);


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

                        setAllorder(json);

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

                    if (item.userid == userid && item.orderstatus != 'delivered') {
                        allsubmitted.push(item);
                    }

                    if (item.userid == userid && item.orderstatus == 'delivered') {
                        allonprogress.push(item);
                    }

                });
            }

            if (allsubmitted.length === 0) {
                setEmptyList1(true);
            }
            if (allonprogress.length === 0) {
                setEmptyList2(true);
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

    //             fetch('https://qwikmedic.pythonanywhere.com/pharmacyProfile/'+userid, requestOptions1)
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
        // NotificationCheck()
        // GetAllorder()
        // UserInfo()

        // if(isLoading12 == false){
        // Getdata1()
        // setLoading1(false)
        // }
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


                <ScrollView style={{ width: '100%', height: '100%' }}>

                    {/* <Text style={{marginLeft:10,fontSize:14,fontWeight:'700',color:"#067A1F"}}>You’ve order is plased SccessFully.</Text> */}


                    <View style={{ width: '100%', marginTop: 10 }}>



                        <View style={{ width: '100%', marginBottom: 10 }}>



                            <View style={{ width: '100%', height: '100%', marginBottom: 10 }}>




                                <View style={{ width: "100%", justifyContent: "center", alignItems: 'center', top: 10 }}>

                                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>

                                        <Text style={{ fontSize: 12, color: colors.text, padding: 3, left: active ? 10 : 20, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>ORDER # 00695{product.id}</Text>
                                        <Text style={{ fontSize: 12, color: colors.text, padding: 3, right: active ? 10 : 20, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>DATE : {product.orderdate}</Text>

                                    </View>
                                    {/* <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: active ? 'flex' : 'none', left: 15 }}>
                                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 40, marginBottom: 15 }}>
                                            <Text style={{ color: '#065540', bottom: 22, right: 0, fontSize: 10, letterSpacing: .5, fontFamily: 'Poppins_400Regular' }}>placed</Text>
                                            <View style={{ width: '20%', flexDirection: 'row', right: 40 }}>

                                                <View style={{ backgroundColor: '#25DAB0', borderRadius: 100, width: 12, height: 12, bottom: 3.5, left: .5 }}></View>
                                                <View style={{ backgroundColor: '#065540', height: 5, width: '100%' }}></View>

                                                <View style={{ backgroundColor: '#25DAB0', borderRadius: 100, width: 12, height: 12, bottom: 3.5, right: .5 }}></View>

                                            </View>
                                            <Text style={{ color: '#065540', bottom: 22, right: 50, fontSize: 10, letterSpacing: .5, fontFamily: 'Poppins_400Regular' }}>received</Text>

                                            <View style={{ width: '20%', flexDirection: 'row', right: 65 }}>

                                                <View style={{ backgroundColor: (product.orderstatus == 'Ready' || product.orderstatus == 'Picked' || product.orderstatus == 'Delivered') ? '#065540' : colors.ash1, height: 5, width: '100%' }}></View>

                                                <View style={{ backgroundColor: (product.orderstatus == 'Ready' || product.orderstatus == 'Picked' || product.orderstatus == 'Delivered') ? '#25DAB0' : colors.ash1, borderRadius: 100, width: 12, height: 12, bottom: 3.5 }}></View>

                                            </View>
                                            <Text style={{ color: (product.orderstatus == 'Ready' || product.orderstatus == 'Picked' || product.orderstatus == 'Delivered') ? '#065540' : colors.ash1, bottom: 22, right: 90, fontSize: 10, letterSpacing: .5, fontFamily: 'Poppins_400Regular' }}>confirmed</Text>

                                            <View style={{ width: '20%', flexDirection: 'row', right: 115 }}>

                                                <View style={{ backgroundColor: (product.orderstatus == 'Picked' || product.orderstatus == 'Delivered') ? '#065540' : colors.ash1, height: 5, width: '100%' }}></View>

                                                <View style={{ backgroundColor: (product.orderstatus == 'Picked' || product.orderstatus == 'Delivered') ? '#25DAB0' : colors.ash1, borderRadius: 100, width: 12, height: 12, bottom: 3.5 }}></View>

                                            </View>
                                            <Text style={{ color: (product.orderstatus == 'Picked' || product.orderstatus == 'Delivered') ? '#065540' : colors.ash1, bottom: 22, right: 140, fontSize: 10, letterSpacing: .5, fontFamily: 'Poppins_400Regular' }}>ontheway</Text>

                                            <View style={{ width: '20%', flexDirection: 'row', right: 160 }}>

                                                <View style={{ backgroundColor: (product.orderstatus == 'Delivered') ? '#25DAB0' : colors.ash1, height: 5, width: '100%' }}></View>

                                                <View style={{ backgroundColor: (product.orderstatus == 'Delivered') ? '#25DAB0' : colors.ash1, borderRadius: 100, width: 12, height: 12, bottom: 3.5 }}></View>

                                            </View>
                                            <Text style={{ color: (product.orderstatus == 'Delivered') ? '#065540' : colors.ash1, bottom: 22, right: 200, fontSize: 10, letterSpacing: .5, fontFamily: 'Poppins_400Regular' }}>delivered</Text>

                                        </View>
                                    </View> */}


                                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 14, marginTop: 16 }}>
                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins_500Medium', letterSpacing: .9 }}>Check Your Delivery Status</Text>

                                        <Pressable style={{ flexDirection: 'row', borderRadius: 4, backgroundColor: "#EE416C", justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4 }} onPress={() => {
                                            console.log("click", product?.redx_link);
                                            if (product?.redx_link) {
                                                Linking.openURL(product?.redx_link)
                                                    .catch(err => console.error("Failed to open link:", err));
                                            }
                                        }}
                                        >


                                            <Text style={{ fontSize: 12, color: colors.white, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Click Here</Text>

                                        </Pressable>
                                    </View>


                                    <View style={[styles.adds, { marginLeft: 0, flexDirection: 'row', marginTop: 15, marginBottom: 50 }]}>


                                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', left: 15, top: 10, width: '100%' }}>

                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%', height: 60 }}>

                                                <Text style={{ top: 10, color: colors.ash, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular', marginBottom: 12 }}>DELIVERY ADDRESS:: </Text>
                                                {/* <LogoText width={70} height={60} style={{marginBottom:12,right:30}}/> */}

                                                <Image
                                                    style={{ width: 70, height: 60, marginBottom: 12, right: 30 }}
                                                    resizeMode='contain'
                                                    source={require('../assets/fitback/fitbackLogo.png')}
                                                />

                                            </View>

                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>

                                                <View style={{ width: '60%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                                                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>

                                                        <Text style={{ fontWeight: '400', fontSize: 12, color: colors.ash, padding: 3, marginLeft: 5 }}>{product.username}</Text>


                                                    </View>
                                                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>

                                                        <Text style={{ fontWeight: '400', fontSize: 12, color: colors.ash, padding: 3, marginLeft: 5, width: 190 }}>{product.address}</Text>


                                                    </View>

                                                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>

                                                        <Text style={{ fontWeight: '400', fontSize: 12, color: colors.ash, padding: 3, marginLeft: 5 }}>MOBILE: {product.phonenumber}</Text>

                                                    </View>

                                                </View>



                                                <View style={{ width: '40%', justifyContent: 'flex-end', alignItems: 'flex-end', right: 30 }}>


                                                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'flex-end' }}>

                                                        <Text style={{ fontWeight: '400', fontSize: 12, color: colors.ash, padding: 3, marginLeft: 5 }}>ORDER # 00695{product.id}</Text>


                                                    </View>
                                                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>

                                                        <Text style={{ fontWeight: '400', fontSize: 12, color: colors.ash, padding: 3, marginLeft: 5 }}>Date: {product.orderdate}</Text>


                                                    </View>



                                                </View>

                                            </View>

                                            <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 12, marginTop: 20, }}>

                                                <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular', textDecorationLine: 'underline' }}>ORDER DETAILS: </Text>

                                            </View>
                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', left: 0 }}>
                                                <View style={{ width: '8%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                                                    <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular', textDecorationLine: 'underline', marginBottom: 10 }}>#</Text>
                                                    {product.orderproductdata.map((item, index) => (
                                                        <View key={index} style={{ height: 60, }}>


                                                            <Text style={{ color: colors.text, fontSize: 10, padding: 6, paddingTop: 2, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular', textDecorationLine: 'underline' }}>{index + 1}.</Text>
                                                            {/* <Text style={{color:colors.ash,fontSize:11,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}></Text> */}

                                                            {/* <Image resizeMode='contain' style={{ width: 50, height: 50 }} source={{ uri: item.image != "" ? item.image : "https://static.vecteezy.com/system/resources/thumbnails/002/272/156/small_2x/medicine-drug-icon-flat-style-and-colorful-design-illustration-free-vector.jpg" }} /> */}



                                                        </View>
                                                    )
                                                    )}
                                                </View>
                                                <View style={{ width: '55%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                                                    <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular', textDecorationLine: 'underline', marginBottom: 10 }}>NAME</Text>
                                                    {product.orderproductdata.map((item, index) => (
                                                        <View key={index} style={{ height: 60 }}>

                                                            <Text style={{ color: colors.text, fontSize: 10, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>{item.tytle}</Text>

                                                            <Text style={{ color: colors.ash, fontSize: 10, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: item.ptype == "" || item.ptype == null || item.ptype == "none" ? 'none' : 'flex' }}>{item.ptype}  <Text style={{ display: item.power == "" || item.power == null || item.ptype == "none" ? 'none' : 'flex' }}>{item.power}</Text></Text>

                                                            {/* <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>

                                                                <Text style={{color:colors.ash,fontSize:12,padding:8,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>{item.ptype}</Text>
                                                                <Text style={{color:colors.ash,fontSize:12,padding:8,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>{item.power}</Text>
                                                                

                                                            </View>  */}
                                                        </View>
                                                    )
                                                    )}
                                                </View>
                                                <View style={{ width: '25%', justifyContent: 'flex-start', alignItems: 'flex-start', right: 10 }}>

                                                    <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular', textDecorationLine: 'underline', marginBottom: 10 }}>QNTY</Text>
                                                    {product.orderproductdata.map((item, index) => (
                                                        <View key={index} style={{ height: 60 }}>

                                                            <Text style={{ color: colors.text, fontSize: 10, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>{item.quantity} X {parseFloat(item.discountPrice).toFixed(2)}</Text>
                                                            {/* <Text style={{color:colors.ash,fontSize:11,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}></Text> */}

                                                        </View>
                                                    )
                                                    )}
                                                </View>
                                                <View style={{ width: '15%', justifyContent: 'flex-end', alignItems: 'flex-end', right: 30 }}>

                                                    <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular', textDecorationLine: 'underline', marginBottom: 10 }}>PRICE</Text>
                                                    {product.orderproductdata.map((item, index) => (
                                                        <View key={index} style={{ height: 60 }}>

                                                            <Text style={{ color: colors.text, fontSize: 10, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>{Math.round(item.totalprice)}</Text>


                                                        </View>
                                                    )
                                                    )}
                                                </View>
                                            </View>

                                            {/* <View style={{width:'100%',flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                                    <View style={{width:'8%',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                                        
                                                        <Text style={{color:colors.text,fontSize:12,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular',textDecorationLine:'underline'}}>#</Text>
                                                        {product.orderproductdata.map((item,index)=>(
                                                        <View key={index} style={{marginTop:10}}>


                                                            <Text style={{color:colors.text,fontSize:12,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular',textDecorationLine:'underline'}}>{index+1}.</Text>

                                                                        
                                                        </View>
                                                        )
                                                        )}
                                                    </View>
                                                    <View style={{width:'40%',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                                        
                                                        <Text style={{color:colors.text,fontSize:12,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular',textDecorationLine:'underline'}}>NAME</Text>
                                                        {product.orderproductdata.map((item,index)=>(
                                                        <View key={index} style={{marginTop:10}}>
                                                            
                                                            <Text style={{color:colors.text,fontSize:12,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>{item.tytle}</Text>
                                                            
                                                        </View>
                                                        )
                                                        )}
                                                    </View>
                                                    <View style={{width:'25%',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                                        
                                                        <Text style={{color:colors.text,fontSize:12,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular',textDecorationLine:'underline'}}>QNTY</Text>
                                                        {product.orderproductdata.map((item,index)=>(
                                                        <View key={index} style={{marginTop:10}}>
                                                            
                                                            <Text style={{color:colors.text,fontSize:12,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>{item.quantity}</Text>
                                                            
                                                        </View>
                                                        )
                                                        )}
                                                    </View>
                                                    <View style={{width:'25%',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                                        
                                                        <Text style={{color:colors.text,fontSize:12,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular',textDecorationLine:'underline'}}>PRICE</Text>
                                                        {product.orderproductdata.map((item,index)=>(
                                                        <View key={index} style={{marginTop:10}}>
                                                            
                                                            <Text style={{color:colors.text,fontSize:12,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>{item.totalprice}0</Text>
                                                            
                                                        </View>
                                                        )
                                                        )}
                                                    </View>
                                                </View> */}

                                            <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row', marginTop: 30, right: 0 }}>
                                                <View style={{ width: '70%', flexDirection: 'row', borderTopColor: colors.ash, borderTopWidth: 1, right: 35 }}>
                                                    <View style={{ width: '65%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>

                                                        <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>ORDER SUBTOTAL:</Text>
                                                        <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>DISCOUNT:</Text>
                                                        <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>VAT:</Text>
                                                        <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>Q-REWARDS:</Text>
                                                        <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>PROMO:</Text>
                                                        <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>DELIVERY FEE:</Text>
                                                        <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>ORDER TOTAL:</Text>

                                                    </View>
                                                    <View style={{ width: '40%', justifyContent: 'flex-end', alignItems: 'flex-end', right: 10 }}>
                                                        <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>{product.totalMRP}</Text>
                                                        <Text style={{ color: colors.red, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>-{product.totalMRP - product.totalproductamount}</Text>
                                                        <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>{product.vat}</Text>
                                                        <Text style={{ color: colors.red, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>-{product.qmoney ? product.qmoney : '0'}</Text>
                                                        <Text style={{ color: colors.red, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>-{product.promoAmount}</Text>
                                                        <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>{product.deliverycharge}</Text>
                                                        <Text style={{ color: "#EE416C", fontSize: 12.5, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>{product.totalprice}.00</Text>

                                                    </View>
                                                </View>
                                            </View>

                                            <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row', right: 50 }}>

                                                <Text style={{ color: colors.text, fontSize: 12, letterSpacing: .9, fontFamily: 'Poppins_400Regular', marginTop: 20 }}>STATUS:</Text>
                                                <View style={{ width: '30%', marginTop: 20, left: 10, borderWidth: 1, borderColor: colors.ash1, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>

                                                    <Text style={{ color: "#EE416C", fontSize: 12, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>{product.orderstatus}</Text>

                                                </View>

                                            </View>


                                            {/* <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row', right: 100, marginTop: 20 }}>

                                                <Text style={{ color: colors.text, fontSize: 12, letterSpacing: .9, fontFamily: 'Poppins_400Regular', marginTop: 20 }}>Q-REWARDS EARNED:</Text>


                                                <Text style={{ color: colors.text, fontSize: 12, letterSpacing: .9, fontFamily: 'Poppins_400Regular', marginTop: 20, left: 10 }}>{product.totalproductamount}</Text>



                                            </View> */}

                                            {/* <View style={{flexDirection:'row',justifyContent:'space-between',left:10,top:20,alignItems:'center' }}>
    


                                                <Pressable disabled={true} style={{width:70,justifyContent:'center',alignItems:'center',height:22,backgroundColor: product.paymentstatus == 'unpaid' ? "#FA8A73": "#73FAA0",borderRadius:3,left:0,display: product.status == 3  ? 'none' : 'flex'}} onPress={()=> navigation.navigate("DeliveryOrderdetails",{orderid:product.id,payflag:true})}>
                                                        <Text style={{fontSize:12,fontWeight:'700',color:colors.white,display: product.paymentstatus == 'unpaid' ? 'flex' : 'none' }}>Unpaid</Text>
                                                        <Text style={{fontSize:12,fontWeight:'700',color:colors.white,display: product.paymentstatus == 'paid' ? 'flex' : 'none' }}>Paid</Text>
                                                </Pressable>
    

                                                <View style={{width:140,justifyContent:'space-between',alignItems:'center',height:30,backgroundColor: product.orderstatus == 'submitted' ? "#F8FFC7" : product.orderstatus == 'onprogress' ? '#FFE9C1' : '#D0FEFF',borderRadius:4,left:  130,flexDirection:'row'}} onPress={()=> UpdateStatus(product.id,Math.round(product.totalMRP - (product.totalMRP * (discount / 100))))}>
                                                    <Text style={{fontSize:12,fontWeight:'700',color: product.orderstatus == 'submitted' ? "#99B000" : product.orderstatus == 'onprogress' ? '#B07000' : '#009EA4' ,left:10}}>{product.orderstatus == 'submitted' ? 'Order Received' : product.orderstatus == 'onprogress' ? 'Order Confirmed' : 'Ontheway'}</Text>
                                                    <View style={{height:'100%',width:35,backgroundColor:colors.white1,justifyContent:'center',alignItems:'center',borderTopRightRadius:4,borderBottomRightRadius:4}}>
                                                        <Eye/>
                                                    </View>
                                                </View>     
                                            </View> */}

                                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30, bottom: 20 }}>

                                                <Text style={{ color: "#cc5572", fontSize: 12, letterSpacing: .9, fontFamily: 'Poppins_400Regular', marginTop: 20, right: 20 }}>THANK YOU FOR YOUR BUSSINESS</Text>

                                            </View>
                                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: 30, marginBottom: 20, right: 15 }}>
                                                <Pressable style={{ width: 120, height: 30, justifyContent: 'center', alignItems: 'center', marginTop: 30, bottom: 20, backgroundColor: "#EE416C", flexDirection: "row", alignItems: "center", borderRadius: 4 }} onPress={() => generatePdf()}>

                                                    <MaterialIcons name="file-download" size={20} color="white" />
                                                    <Text style={{ color: colors.white, fontSize: 12, letterSpacing: .9, fontFamily: 'Poppins_400Regular', marginLeft: 2 }}>Invoice</Text>

                                                </Pressable>
                                            </View>
                                            {/* <View style={{justifyContent:'flex-start',left:4,top:10,marginBottom:30}}>
                                                            
                                                <Text style={{fontSize:10,letterSpacing:.9,fontFamily: 'Poppins_400Regular',color:colors.ash,padding:3,marginLeft:5,textDecorationLine:'underline'}} onPress={() => navigation.navigate("Contuctus",{})}>Need Help ?</Text>

                                            </View> */}




                                        </View>

                                    </View>

                                </View>



                            </View>

                        </View>


                    </View>



                </ScrollView>

                <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', marginBottom: 300, display: emptyList1 && nointernet == false && opt ? 'flex' : 'none', flex: 0 }}>
                    {/* <Emptyorder1/> */}
                    <Text style={{ fontSize: 14, fontWeight: '700', color: colors.black, marginTop: 10 }}>OnGoning Oder list is empty</Text>
                    {/* <Text style={{fontSize:12,fontWeight:'400',color:colors.ash,marginTop:10}}>Let’s check our trendy <Text style={{fontSize:12,fontWeight:'400',textDecorationLine:'underline',color:colors.ash}} onPress={()=> navigation.navigate("PagkageDecoration",{})}>decoration items</Text> </Text> */}
                </View>
                <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', marginBottom: 300, display: emptyList2 && nointernet == false && opt1 ? 'flex' : 'none', flex: 0 }}>
                    {/* <Emptyorder1/> */}
                    <Text style={{ fontSize: 14, fontWeight: '700', color: colors.black, marginTop: 10 }}>Order History is empty</Text>
                    {/* <Text style={{fontSize:12,fontWeight:'400',color:colors.ash,marginTop:10}}>Let’s check our trendy <Text style={{fontSize:12,fontWeight:'400',textDecorationLine:'underline',color:colors.ash}} onPress={()=> navigation.navigate("PagkageDecoration",{})}>decoration items</Text> </Text> */}
                </View>
                <View style={{ bottom: 20, width: '95%', height: 38, borderColor: '#067A1F', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: cartmsg ? "flex" : 'none' }}>
                    {/* <Gtick style={{marginLeft:30}}/> */}
                    <Text style={{ marginLeft: 10, fontSize: 14, fontWeight: '700', color: "#067A1F" }}>You’ve add this product in your Cart.</Text>
                </View>

                <View style={{ marginBottom: 20, width: '95%', height: 38, borderColor: '#067A1F', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: successorder ? "flex" : 'none' }}>
                    {/* <Gtick style={{marginLeft:10}}/> */}
                    <Text style={{ marginLeft: 10, fontSize: 14, fontWeight: '700', color: "#067A1F" }}>You’ve order is plased SccessFully.</Text>
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
        width: '90%',
        // height:120,
        borderRadius: 20,
        flexDirection: 'row',
        // borderColor: '#CFCFCF',
        // borderWidth: 1,

        // shadowColor: '#000',
        // shadowOffset: { width: 10, height: 0 },
        // shadowOpacity:  0.4,
        // shadowRadius: 1,
        // elevation: 6,
        // borderTopColor:'#ebebeb',


        // borderLeftColor: '#D4D4D4',
        // borderTopWidth: 2,
        // borderBottomWidth: 8,
        // borderRightWidth: 6,
        // borderLeftWidth: 2,

        backgroundColor: colors.white

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

export default OrdermedicineDetails;