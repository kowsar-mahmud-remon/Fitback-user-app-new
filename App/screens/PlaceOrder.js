import React, { useState, useRef, useEffect, useContext } from 'react';
import { ActivityIndicator, Alert, ImageBackground, Animated, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Dimensions } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { WebView } from "react-native-webview";
// import { useNavigation } from "@react-navigation/native";


import CheckBox from 'expo-checkbox';

import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";
import * as Clipboard from 'expo-clipboard';

import { UserContext } from '../../components/CredintailsContext';

import RadioForm from 'react-native-simple-radio-button';

//asyn-storage

import AsyncStorage from '@react-native-async-storage/async-storage';


// import MapView, { Marker } from 'react-native-maps';
// import Geocoder from 'react-native-geocoding';
// import {getDistance, getPreciseDistance} from 'geolib';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


function PlaceOrder({ navigation, route }) {
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

    const [openmap, setOpenmap] = useState(false);
    const [newAddress, setNewAddress] = useState("");
    const { authtoken, setAuthtoken } = useContext(UserContext);
    const { noficationtoken, setNoficationtoken } = useContext(UserContext);

    const [rqstid, setRqstid] = useState(null);

    const [markerPosition, setMarkerPosition] = useState({
        // latitude: 23.811056,
        // longitude: 90.407608,
        latitude: parseFloat(route.params.latitude) == 0.0 ? 23.811056 : parseFloat(route.params.latitude),
        longitude: parseFloat(route.params.longitude) == 0.0 ? 90.407608 : parseFloat(route.params.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const axios = require('axios');

    //   const getData=(()=>{
    //     Geocoder.init("AIzaSyCXSQN60rmVblqkNYQkWFI291xwYvmLjvc");

    //     // Search by geo-location (reverse geo-code)
    //     Geocoder.from(markerPosition.latitude , markerPosition.longitude)
    //     .then(json => {
    //         var addressComponent = json.results[2].formatted_address;
    //         // console.log("json.results[] :",json.results[3].address_components[2].short_name);
    //         setNewAddress(addressComponent)
    //         // console.log("newAddress ",newAddress)
    //         const results = json.results;

    //         const dhakaResults = results.filter(
    //             (result) =>
    //               result.address_components.some(
    //                 (component) => component.long_name === 'Dhaka'
    //               )
    //           );

    //         //   console.log("dhakaResults",dhakaResults);
    //         //   console.log("dhakaResults",dhakaResults.length);

    //           if(dhakaResults.length == 0){
    //             setInsideDhaka(false)
    //             }
    //             else{
    //                 setInsideDhaka(true)
    //             }
    //     })
    //     .catch(error => console.warn(error));



    //   }) 

    const [getMylocation, setGetMylocation] = useState(true);


    //   const handleMapPress = event => {
    //       setMarkerPosition(event.nativeEvent.coordinate);
    //   };




    const [unread, setUnread] = useState(false);

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
    const [bcopy, setBcopy] = useState(false);
    const [rcopy, setRcopy] = useState(false);
    const [bncopy, setBncopy] = useState(false);
    const [bacopy, setBacopy] = useState(false);
    const [bbcopy, setBbcopy] = useState(false);

    const [address1, setAddress1] = useState(route.params.address1);
    const [address2, setAddress2] = useState(route.params.address2);
    const [address3, setAddress3] = useState(route.params.address3);

    const [freedelivery, setFreedelivery] = useState(route.params.freedelivery);

    const [locationdif, setLocationdif] = useState(route.params.location);

    const [voucherstatus, setVoucherstatus] = useState(false);
    const [freedeliverystatus, setFreedeliverystatus] = useState(false);

    const [confirmedflag, setConfirmedflag] = useState(route.params.confirmedflag);

    const [dateTime, setDateTime] = useState('');
    const [noaddress, setNoaddress] = useState(false);
    const [locationflag, setLocationFlag] = useState(true);
    const [submitflag, setSubmitflag] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn1 = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true
        }).start(() => {
            setBcopy(false);
            setRcopy(false);
            setBncopy(false);
            setBacopy(false);
            setBbcopy(false);
        });
    };

    const fadeIn2 = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start(() => {

            // setSuccessorder(false)
            navigation.navigate("OrdermedicineHome", {});

            // setProceedorder(false)



        });

    };


    const fadeIn5 = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
        }).start(() => { setNoaddress(false); });

    };



    const [copiedText, setCopiedText] = React.useState('');



    const copyToClipboard = (text) => {
        Clipboard.setStringAsync(text);
        fadeIn1();
    };

    const fetchCopiedText = async () => {
        const text = await Clipboard.getStringAsync();
        setCopiedText(text);
    };

    const [productlist, setProductlist] = useState([]);

    const [terms, setTerms] = useState(false);
    const [qmoneyuse, setQmoneyuse] = useState(false);

    const [prescriborder, setPrescriborder] = useState(route.params.prescriborder);
    const [Name, setName] = useState(route.params.Name);
    const [phonenumber, setPhonenumber] = useState(route.params.phonenumber);
    const [location, setLocation] = useState(route.params.location);
    const [locationTwo, setLocationTwo] = useState("");
    const [insideDhaka, setInsideDhaka] = useState(route.params.insideDhaka);
    const [longitude, setLongitude] = useState(route.params.longitude);
    const [latitude, setLatitude] = useState(route.params.latitude);

    const [longitudeold, setLongitudeold] = useState(route.params.longitude);
    const [latitudeold, setLatitudeold] = useState(route.params.latitude);
    const [insideDhakaold, setInsideDhakaold] = useState(route.params.insideDhaka);

    const [totalquantity, setTotalquantity] = useState(route.params.totalquantity);
    const [totalamount, setTotalamount] = useState(route.params.totalamount);
    const [data, setData] = useState(route.params.data);
    console.log("data", data);
    const [notes, setNotes] = useState(null);
    const [vat, setVat] = useState(route.params.vat);
    const [qmoney, setQmoney] = useState(route.params.qmoney);
    const [image, setImage] = useState(route.params.image);
    const [remainsdata, setRemainsdata] = useState(route.params.remainsdata);
    const [prescriptionorder, sePrescriptionorder] = useState(route.params.prescriptionorder);
    const [promovalue, setPromovalue] = useState(route.params.promo);
    const [delivery, setDelivery] = useState(route.params.delivery);
    const [deliverytype, setDeliverytype] = useState(route.params.deliverytype);
    const [qcoins, setQcoins] = useState(route.params.qcoins);

    const [blockqmoney, setBlockqmoney] = useState(route.params.blockqmoney);

    const [totalregularPrice, setTotalregularPrice] = useState(route.params.totalregularPrice);

    const [finalPrice, setFinalPrice] = useState(route.params.finalPrice);
    console.log("finalprice", finalPrice);

    const [superfinalPrice, setSuperfinalPrice] = useState(route.params.finalPrice);

    const [showtype, setShowtype] = useState(route.params.showtype);
    const [payflag, setPayflag] = useState(false);
    const [successorder, setSuccessorder] = useState(false);


    const [showaddress, setShowaddress] = useState(false);

    const options1 = [
        { label: 'Digital payment', value: 'Digital_payment' },
        { label: 'Cash on delivery', value: 'Cash_on_delivery' }
    ];

    const options = [
        { label: 'Cash on Delivery', value: 'Cash_on_delivery' },
        // { label: 'Online Payment', value: 'Online Payment' }
    ];

    //   const options2 = [
    //     { label: <Bkash/>, value: 'Bkash' },
    //     { label: <Roket/>, value: 'Roket' },
    //     { label: <Islami/>, value: 'IslamiBank' },
    //   ];

    const options2 = [
        { label: 'Bkash', value: 'Bkash' },
        { label: 'Roket', value: 'Roket' },
        { label: 'IslamiBank', value: 'IslamiBank' },
    ];

    const [paymenttype1, setpaymenttype1] = useState('Cash_on_delivery');

    const [paymenttype, setpaymenttype] = useState("Digital_payment");
    const [paymentmethod, setPaymentmethod] = useState('Bkash');

    const [orderid, setOrderid] = useState(route.params.orderid);
    // console.log(orderid)

    const [getorder, setGetorder] = useState(true);
    const [getOrderdata, setGetOrderdata] = useState([]);
    const [confirm, setConfirm] = useState(false);

    let formdata = new FormData();


    const [lan, setLan] = useState(true);


    const [notify, setNotify] = useState(testCredentials.notify);
    const [cartbuy, setCartbuy] = useState(testCredentials.cartbuy);
    const [cartrent, setCartrent] = useState(testCredentials.cartrent);
    const [productsave, setProductsave] = useState(testCredentials.productsave);
    const [flatsave, setflatsave] = useState(testCredentials.flatsave);

    const [transaction, setTransaction] = useState(null);
    const [transactionflag, setTransactionflag] = useState(true);

    const [vouture, setVouture] = useState(null);
    const [voutureflag, setVoutureflag] = useState(true);

    const [accountname, setAccountname] = useState(null);
    const [accountnameflag, setAccountnameflag] = useState(true);

    const [accountnumber, setAccountnumber] = useState(null);
    const [accountnumberflag, setAccountnumberflag] = useState(true);



    const [nointernet, setNointernet] = useState(false);
    const [isLoading1, setLoading1] = useState(false);

    const [promofill, setPromofill] = useState(false);


    const [nodata, setNodata] = useState(true);


    const [getaccount, setGetaccount] = useState(true);
    const [getaccountdata, setGetaccountdata] = useState([]);

    const [bkashnumber, setBkashnumber] = useState(null);
    const [roketnumber, setRoketnumber] = useState(null);
    const [accountnamei, setAccountnamei] = useState(null);
    const [accountnumberi, setAccountnumberi] = useState(null);
    const [brunchnamei, setBrunchnamei] = useState(null);


    const [remaindingqcoin, setRemaindingqcoin] = useState(0);
    const [remaindingqmoney, setRemaindingqmoney] = useState(0);



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

                    {
                        json.map((item, index) => {
                            if (item.name == 'bkash') {
                                setBkashnumber(item.phonenumber);
                            }
                            if (item.name == 'roket') {
                                setRoketnumber(item.phonenumber);
                            }
                            if (item.name == 'bank') {
                                setAccountnamei(item.accountName);
                                setAccountnumberi(item.accountNumber);
                                setBrunchnamei(item.branchname);
                                return item.phonenumber;
                            }

                        });
                    }

                })
                .catch((error) => {
                    console.error(error);
                    setNointernet(true);
                    setLoading1(false);
                });

            setGetaccount(false);
        }


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



    const postMoney = () => {

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


        // if(locationdif != location)
        //     {
        //         if(location == address1)
        //         {

        //         }
        //         else if(location == address2)
        //         {
        //             const requestOptions = {
        //                 method: 'PATCH',
        //                 headers: { 'Content-Type': 'application/json','Accept': 'application/json', 'Authorization': authtoken },
        //                 body: JSON.stringify({ 
        //                     address1: address2,
        //                     address2: address1,

        //                 })
        //             };

        //             fetch('https://qwikmedic.pythonanywhere.com/userProfile/'+userid, requestOptions)
        //             .then((response) => response.json())
        //             .then((json) => {
        //                 setNointernet(false)
        //                 setLoading1(false)

        //             })
        //             .catch((error) => {
        //                 setLoading1(false)
        //               console.error(error);
        //               setNointernet(true)
        //             });
        //         }
        //         else if(location == address3)
        //         {
        //             const requestOptions = {
        //                 method: 'PATCH',
        //                 headers: { 'Content-Type': 'application/json','Accept': 'application/json', 'Authorization': authtoken },
        //                 body: JSON.stringify({ 
        //                     address1: address3,
        //                     address2: address1,
        //                     address3: address2,

        //                 })
        //             };

        //             fetch('https://qwikmedic.pythonanywhere.com/userProfile/'+userid, requestOptions)
        //             .then((response) => response.json())
        //             .then((json) => {
        //                 setNointernet(false)
        //                 setLoading1(false)

        //             })
        //             .catch((error) => {
        //                 setLoading1(false)
        //               console.error(error);
        //               setNointernet(true)
        //             });
        //         }
        //         else{
        //             const requestOptions = {
        //                 method: 'PATCH',
        //                 headers: { 'Content-Type': 'application/json','Accept': 'application/json', 'Authorization': authtoken },
        //                 body: JSON.stringify({ 
        //                     address1: location,
        //                     address2: address1,
        //                     address3: address2
        //                 })
        //             };

        //             fetch('https://qwikmedic.pythonanywhere.com/userProfile/'+userid, requestOptions)
        //             .then((response) => response.json())
        //             .then((json) => {
        //                 setNointernet(false)
        //                 setLoading1(false)

        //             })
        //             .catch((error) => {
        //                 setLoading1(false)
        //               console.error(error);
        //               setNointernet(true)
        //             });
        //         }


        //     }


        // setSuccessorder(true);
        // fadeIn2();

        const userDetailsInfo = {
            userid: userid,
            username: Name,
            phonenumber: phonenumber,
            address: location,
            totalquantity: totalquantity,
            totalamount: Math.round(finalPrice),
            suppertotalamount: Math.round(superfinalPrice),
            orderproductdata: data,
            orderstatus: 'submitted',
            paymentstatus: 'unpaid',
            paymentmethod: paymenttype1,
            voucherstatus: voucherstatus,
            freedeliverystatus: freedeliverystatus,
            totalproductamount: Math.round(totalamount),
            voucher: vouture,
            notes: notes,
            vat: vat,
            qmoney: qmoneyuse ? qmoney : "0",
            totalMRP: Math.round(totalregularPrice),
            deliverycharge: delivery,
            deliverytype: deliverytype,
            orderdate: statusdate,
            ordertime: statustime,
            deliveryCompanyid: 1,
            image: image,
            prescriptionorder: route.params.prescriptionorder,
            promoAmount: promovalue,
            insidedhaka: insideDhaka,
            longitude: longitude,
            latitude: latitude,
            usernoficationtoken: noficationtoken,
        };

        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({

                userid: userid,
                username: Name,
                phonenumber: phonenumber,
                address: location || null,  // Ensure address is passed, default null if undefined
                totalquantity: totalquantity || 1, // Ensure default values if undefined
                totalamount: Math.round(finalPrice),
                //
                totalprice: Math.round(finalPrice),
                //
                suppertotalamount: Math.round(superfinalPrice),
                orderproductdata: data || [],
                orderstatus: 'submitted',
                paymentstatus: false,
                paymentmethod: paymenttype1 || 'Cash_on_delivery',  // Ensure a default value for paymentmethod
                voucherstatus: voucherstatus || false,
                freedeliverystatus: freedeliverystatus || false,
                totalproductamount: Math.round(totalamount),
                voucher: vouture || null,
                notes: notes || null,
                vat: vat || 0, // Ensure proper defaults
                qmoney: qmoneyuse ? qmoney : "0",
                //
                fmoney: qmoneyuse ? qmoney : "0",
                //
                totalMRP: Math.round(totalregularPrice),
                deliverycharge: delivery || 0,  // Ensure default delivery charge
                deliverytype: deliverytype || 'Regular',  // Ensure default delivery type
                orderdate: statusdate,
                ordertime: statustime,
                deliveryCompanyid: 1,
                image: image || null,
                prescriptionorder: route.params.prescriptionorder,
                promoAmount: promovalue || 0,
                insidedhaka: insideDhaka || false,
                longitude: longitude || 0,
                latitude: latitude || 0,
                usernoficationtoken: noficationtoken || '',
            })
        };

        fetch('https://qwikit1.pythonanywhere.com/orderFitbackProduct/new', requestOptions1)
            .then((response) => response.json())
            .then((json) => {

                setOrderid(json.id);
                // persistUser({userid:userid,notify:testCredentials.natify,lan:true,raddress: testCredentials.raddress,cartbuy:remainsdata ,cartrent: testCredentials.cartrent,productsave: testCredentials.productsave,flatsave: testCredentials.flatsave })
                setRqstid(json.id);


                // let msg = "New order has been placed by " + json.username + "." + "\n-> Order Number: " + json.id + ". \n" + "-> Total Ammount:  " + json.suppertotalamount + "TK." + "\n-> Date and Time: " + json.orderdate + ", " + json.ordertime + ".\n-> Order Details:\n" + json.orderproductdata.map((item, index) => (
                //     "name: " + item.tytle + " - " + item.power + ".\n"

                // )
                // );



                // const greenwebsms = 'token=97681508331739696913f08cdf73b133c59841ca922ba99a026a&to=' + "[01623060606,01622049519]" + '&message=' + msg;
                // axios.post('https://api.bdbulksms.net/api.php?json', greenwebsms).then(response => {
                //     // console.log(response.json)
                //     setNointernet(false);
                // })
                //     .catch((error) => {
                //         setLoading1(false);
                //         // console.log("went wrong")
                //         console.error(error);
                //         setNointernet(true);

                //     });

                // const requestOptions5 = {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                //     body: JSON.stringify({


                //         user_codeId: userid,
                //         orderitemid: json.id,
                //         name: "productorder",
                //         tytle: String("We received your order. Your new Order is #QM-000" + String(json.id)),
                //         movepageid: 1,
                //         avtivetime: statustime,
                //         avtivedate: statusdate

                //     })
                // };

                // fetch('https://qwikit1.pythonanywhere.com/notification/new', requestOptions5)
                //     .then((response) => response.json())
                //     .then((json) => {

                //         // persistUser({userid:userid,notify:true,lan:testCredentials.lan,raddress: testCredentials.raddress,cartbuy:remainsdata ,cartrent: testCredentials.cartrent,productsave: testCredentials.productsave,flatsave: testCredentials.flatsave })


                //     })
                //     .catch((error) => {
                //         setLoading1(false);
                //         console.error(error);
                //         setNointernet(true);
                //     });

            })
            .catch((error) => {
                setLoading1(false);
                console.error(error);
                setNointernet(true);
            });



        if (qmoneyuse) {

            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                body: JSON.stringify({
                    qmoney: remaindingqmoney,
                    qcoins: remaindingqcoin,
                    blockqmoney: true

                })
            };

            fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    setNointernet(false);
                    setLoading1(false);

                })
                .catch((error) => {
                    setLoading1(false);
                    console.error(error);
                    setNointernet(true);
                });

        }
        persistUser({ userid: userid, notify: true, lan: testCredentials.lan, raddress: testCredentials.raddress, cartbuy: [], cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });

        // fadeIn2()


        if (paymenttype1 == "Online Payment") {
            handleSubmit();
        } else {
            fadeIn2();
        }



        if (nointernet == true) {
            setLoading1(false);
            setNointernet(true);
        }



    };
    const setFinalRateOrder = (flag) => {

        if (flag == true) {
            if (finalPrice >= qmoney) {
                setSuperfinalPrice(finalPrice - qmoney);  // qcoin 0 ,qmoney 0
                setRemaindingqcoin(0);
                setRemaindingqmoney(0);
            }
            else {
                setRemaindingqcoin((qmoney - finalPrice) * 1000);
                setRemaindingqmoney(qmoney - finalPrice);
            }

        }
        else {

            setSuperfinalPrice(finalPrice);

        }

    };

    const cashondelivary = () => {


        // setAmount(amount.toString())

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({
                paymentmethod: "cash on dalivary",
            })
        };

        fetch('https://qwikit1.pythonanywhere.com/orderFitbackProduct/' + orderid, requestOptions)
            .then((response) => response.json())
            .then((json) => {
                // console.log('create expance', json);
                setNointernet(false);
                setLoading1(false);

                Alert.alert(
                    "",
                    "\n" + "Thanks for your confarmation. We will contuct with you soon",

                    [
                        { text: "Ok", onPress: () => navigation.navigate("Onprogresshome", {}) }
                    ], { cancelable: false, });



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

    const Donepick = () => {

        setLatitude(markerPosition.latitude);
        setLongitude(markerPosition.longitude);
        setLocation(newAddress);
        setOpenmap(false);

    };

    useEffect(() => {
        // NotificationCheck()


        // getData()


        // console.log(data)
        if (paymenttype1 != "00" && location != "" && terms == true) {
            setSubmitflag(true);
        }
        else {
            setSubmitflag(false);
        }
    });

    const back = (() => {

        const { goBack } = navigation;
        goBack();

    });

    const [paymentDetails, setPaymentDetails] = useState({
        amount: route.params.totalamount,
        customer_name: route.params.Name,
        customer_email: route.params.Email,
        customer_address: locationTwo,
        customer_phone: route.params.phonenumber,
        customer_city: locationTwo,
    });


    console.log("paymentDetails", paymentDetails);

    const [paymentUrl, setPaymentUrl] = useState(null); // Stores payment URL
    // const [loading, setLoading] = useState(false); 
    //   const navigation = useNavigation();


    const handleSubmit = async () => {
        // setLoading(true);

        fetch("https://sslcommerz-payment.vercel.app/initiate-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentDetails),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("paymentData", result);
                // setLoading(false);
                if (result.url) {
                    setPaymentUrl(result.url); // Set payment URL to open in WebView
                } else {
                    Alert.alert("Error", "Payment URL not received");
                }
            })
            .catch((error) => {
                // setLoading(false);
                console.error("Error initiating payment:", error);
                Alert.alert("Error", "Failed to initiate payment");
            });
    };





    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (

                <>
                    <StatusBar
                        animated={true}
                        backgroundColor="#000066"
                        // barStyle={statusBarStyle}
                        style={{ display: paymentUrl ? "none" : "block" }}

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

    if (paymentUrl) {
        return (
            <WebView
                source={{ uri: paymentUrl }}
                style={{ width: "100%", height: "100%" }}
                startInLoadingState={true} // Show loader while WebView is loading
                renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
                javaScriptEnabled={true} // Enable JavaScript for the page
                domStorageEnabled={true} // Enable DOM storage for the payment page
                onNavigationStateChange={(event) => {
                    console.log("Navigating to:", event.url); // Log URL changes
                    console.log("event.url", event.url);

                    if (event.url.includes("paymentapp://Success")) {
                        setPaymentUrl(null); // Clear the WebView URL state
                        setPaymentDetails(""); // reset input data
                        navigation.navigate("Success"); // Navigate to the Success screen
                    } else if (event.url.includes("failure")) {
                        Alert.alert("Payment Failed", "Your payment failed.");
                        setPaymentUrl(null);
                    }
                }}
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.warn("WebView error: ", nativeEvent);
                    Alert.alert("Error", "Failed to load the payment page");
                }}
            />
        );
    }

    return (
        <SafeAreaView style={{ width: '100%', height: '100%', flex: 1 }}>
            {/* <View style={{position: openmap  ? 'relative' : 'absolute',right: openmap == false ? 10000 : 0,width: openmap ? '100%' : 500 ,height: openmap ? '100%' : 500 ,marginTop:  0 }} >
            <GooglePlacesAutocomplete
           

            placeholder='Enter Location'
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            GooglePlacesDetailsQuery={{
                rankby: "distance"
            }}

            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                // console.log(data, details);
                setMarkerPosition({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                })
                // getData()
            }}
            query={{
                key: 'AIzaSyCXSQN60rmVblqkNYQkWFI291xwYvmLjvc',
                language: 'en',
                components:"country:bd",
                types:"establishment",

                radius: 30000,
                location: `${markerPosition.latitude}, ${markerPosition.longitude}`
            }}


            styles={{
                container : {flex:0,width:'100%',zIndex:1},
                listView:{backgroundColor:"white"},
                textInputContainer: {
                backgroundColor: 'grey',
                },
                textInput: {
                height: 38,
                color: '#5d5d5d',
                fontSize: 14,
                },
                predefinedPlacesDescription: {
                color: '#1faadb',
                }
            }}
            />
            <MapView
            style={{flex:1}}
            onPress={handleMapPress}
            initialRegion={markerPosition}
            >
            <Marker
                coordinate={markerPosition}
                title="Pick Up"
                description="Set Pick Up Location"
                draggable = {true}
                pinColor={'black'}
                key = {'random'}
                onDragStart={(e) =>{
                // console.log("Dragstart",e.nativeEvent.coordinate)
                }}
                onDragEnd={(e)=>{
                // handleMapPress()
                setMarkerPosition(e.nativeEvent.coordinate);
                // getData()
                }}

            />

            </MapView>
            <View style={{width:'100%',height:30,justifyContent:'flex-start',alignItems:'flex-start'}}> 
                <Text>{newAddress}</Text>
            </View>

            <Pressable style={{marginTop:10,borderRadius:4,width:'100%',height:40,justifyContent:'center',alignItems:'center',backgroundColor: "#EE416C",marginTop:0}}   onPress={()=>  Donepick()}>
                            
                <Text style={{color:colors.white,fontSize:12,fontFamily: 'Poppins_400Regular',letterSpacing:.9}}>Done</Text>
                                    
            </Pressable>
        </View> */}

            <View style={[styles.MainContainer, { display: openmap ? 'none' : 'flex' }]}>
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
                <ScrollView scrollEnabled={showaddress ? false : true} style={{ width: '100%', display: payflag == true ? 'none' : 'flex' }}>
                    <View pointerEvents={showaddress ? 'none' : 'auto'} style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10, opacity: showaddress ? .5 : 1, display: successorder ? "none" : 'flex' }}>


                        <View style={{ width: '98%', justifyContent: 'center', alignItems: 'center', left: 0 }}>

                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', borderWidth: 0, borderColor: colors.ash1, borderRadius: 4 }}>
                                {/* <View style={{width:'100%',height:35,justifyContent:'center',alignItems:'center',backgroundColor:colors.ash1}}>
                            <Text style={{fontSize:14,fontWeight:'700',color:colors.black,}}>Product List</Text>
                        </View> */}
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 20, flexDirection: 'row', marginBottom: 30, display: image ? 'flex' : 'none' }}>
                                        {/* <Text style={{fontSize:14,color:colors.black}}>{item.tytle}</Text> */}
                                        <Text style={{ fontSize: 12, color: colors.black, width: '5%', marginLeft: 6 }}>* </Text>

                                        <View style={{ width: '30%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 20 }}>

                                            <Text style={{ fontSize: 14, color: colors.green }}>Prescribtion</Text>

                                            {/* <Text style={{fontSize:12,color:colors.ash}}>Price:<Text style={{fontSize:12,color:colors.ash,fontWeight:'700'}}> {item.regularPrice} X {item.quantity} = {Math.round(item.regularPrice * item.quantity)} TK.</Text></Text> */}

                                        </View>
                                        <Pressable style={{ width: '25%' }}>
                                            <Image resizeMode='cover' style={[styles.addsImg, { width: 150, height: 150 }]} source={{ uri: image }}></Image>
                                        </Pressable>
                                    </View>

                                    {/* <View style={{justifyContent:'flex-start',alignItems:'flex-start',width:'100%',marginBottom:12,marginTop:0,display:route.params.prescriptionorder ? "none" : 'flex'}}> */}
                                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', marginBottom: 12, marginTop: 0, display: 'flex' }}>

                                        <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>ORDER DETAILS: </Text>

                                    </View>



                                    {/* <View style={{width:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center',left:10,display:route.params.prescriptionorder ? "none" : 'flex'}}> */}
                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', left: 10, display: 'flex' }}>
                                        {/* <View style={{width:'8%',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                                        
                                                        <Text style={{color:colors.text,fontSize:12,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular',textDecorationLine:'underline',marginBottom:10}}>#</Text>
                                                        {data.map((item,index)=>(
                                                        <View key={index} style={{marginTop:15}}>


                                                            <Text style={{bottom:10,color:colors.text,fontSize:10,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular',textDecorationLine:'underline'}}>{index+1}.</Text>

                                                                        
                                                        </View>
                                                        )
                                                        )}
                                                    </View> */}
                                        <View style={{ width: '50%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                                            <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular', textDecorationLine: 'underline', marginBottom: 10 }}>NAME</Text>
                                            {data.map((item, index) => (
                                                <View key={index} style={{ marginTop: 7, flexDirection: 'row', height: 50 }}>
                                                    <View >

                                                        <Text style={{ color: colors.text, fontSize: 10, paddingRight: 6, paddingLeft: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular', textDecorationLine: 'underline' }}>{index + 1}.</Text>

                                                    </View>
                                                    <View >

                                                        <Text style={{ color: colors.text, fontSize: 10, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>{item.tytle}</Text>

                                                        <Text style={{ color: colors.ash, fontSize: 9, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: item.ptype == "none" ? 'none' : 'flex' }}>{item.ptype}  {item.power}</Text>
                                                        {/* <Text style={{ color: colors.ash, fontSize: 9, paddingLeft: 0, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: item.type == "healthmart" ? 'none' : 'flex' }}>({parseInt(item.quantity)} pis)</Text> */}


                                                    </View>


                                                </View>
                                            )
                                            )}
                                        </View>
                                        <View style={{ width: '25%', justifyContent: 'flex-start', alignItems: 'center', left: 10 }}>

                                            <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular', textDecorationLine: 'underline', marginBottom: 10 }}>QNTY</Text>
                                            {data.map((item, index) => (
                                                <View key={index} style={{ marginTop: 7, height: 50 }}>

                                                    <Text style={{ color: colors.text, fontSize: 10, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>{item.quantity} x {parseFloat(item.discountPrice).toFixed(2)}</Text>
                                                    {/* <Text style={{color:colors.ash,fontSize:11,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}></Text> */}

                                                </View>
                                            )
                                            )}
                                        </View>
                                        <View style={{ width: '25%', justifyContent: 'flex-end', alignItems: 'flex-end', right: 30 }}>

                                            <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular', textDecorationLine: 'underline', marginBottom: 10 }}>PRICE</Text>
                                            {data.map((item, index) => (
                                                <View key={index} style={{ marginTop: 7, height: 50 }}>

                                                    <Text style={{ color: colors.text, fontSize: 10, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>{Math.round(item.totalprice)}</Text>
                                                    {/* <Text style={{color:colors.ash,fontSize:11,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}></Text> */}

                                                </View>
                                            )
                                            )}
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row', marginTop: 20, display: route.params.prescriptionorder ? "none" : 'flex' }}>
                                        <View style={{ width: '60%', flexDirection: 'row', borderTopColor: colors.ash, borderTopWidth: 1, right: 25 }}>
                                            <View style={{ width: '60%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>

                                                <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>ORDER SUBTOTAL:</Text>
                                                <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>DISCOUNT:</Text>
                                                <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>VAT:</Text>
                                                {/* <Text style={{color:colors.text,fontSize:12,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>Q-REWARDS:</Text> */}
                                                <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>PROMO:</Text>
                                                <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>DELIVERY FEE:</Text>
                                                <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>ORDER TOTAL:</Text>

                                            </View>
                                            <View style={{ width: '40%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>{Math.round(totalregularPrice)}</Text>
                                                <Text style={{ color: colors.red, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>-{Math.round(totalregularPrice - totalamount)}</Text>
                                                <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>{vat}</Text>
                                                {/* <Text style={{color:colors.red,fontSize:12,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>-{qmoney ? qmoney : '0'}</Text> */}
                                                <Text style={{ color: colors.red, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>-{freedelivery == false ? promovalue : "0.00"}</Text>
                                                <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>{freedelivery == false ? delivery : "0.00"}</Text>
                                                <Text style={{ color: "#EE416C", fontSize: 12.5, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>{Math.round(finalPrice)}.00</Text>

                                            </View>
                                        </View>
                                    </View>


                                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', marginBottom: 12, marginTop: 45, }}>

                                        <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>DELIVERY DETAILS: </Text>

                                    </View>
                                    <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>

                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                            <View style={{ width: '40%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                                                <Text style={{ color: colors.ash, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'none' : 'flex' }}>নাম</Text>
                                                <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>NAME: </Text>

                                            </View>
                                            <View style={{ width: '60%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>

                                                <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', letterSpacing: .9, left: 0, letterSpacing: .9 }}>{Name}</Text>

                                            </View>

                                        </View>
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
                                            <View style={{ width: '40%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                                                <Text style={{ color: colors.ash, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'none' : 'flex' }}>নাম</Text>
                                                <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>PHONE: </Text>

                                            </View>
                                            <View style={{ width: '60%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>

                                                <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', letterSpacing: .9, left: 0, letterSpacing: .9 }}>{phonenumber}</Text>

                                            </View>

                                        </View>
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
                                            <View style={{ width: '40%', justifyContent: 'center', alignItems: 'flex-start', height: 50, top: 15 }}>

                                                <Text style={{ color: colors.ash, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'none' : 'flex' }}>নাম</Text>
                                                <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>ADDRESS: <Text style={{ color: "red", fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 14, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>* </Text></Text>

                                            </View>
                                            <TextInput

                                                style={[styles.input, { borderColor: colors.white1, marginTop: 5, width: '60%', left: 15, height: 60, fontSize: 12, color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.text }]}
                                                onChangeText={newTest => {
                                                    setLocation(newTest); setLocationTwo(newTest);
                                                }}

                                                defaultValue={location}
                                                placeholder="Type you full address"
                                                placeholderTextColor={colors.ash}
                                                multiline={true}
                                            // textAlign={'center'}
                                            />
                                            {/* <Pressable style={{flexDirection:'row',right:10,bottom:0,width:'60%',justifyContent:'flex-end',alignItems:'flex-end',borderBottomColor:colors.ash2,borderBottomWidth: location == " " ? 1 : 0,height:50}} onPress={ ()=> setOpenmap(true)}>
                                        <Image
                                            style={{ width: 20, height: 20,right:5,bottom:2}}
                                            resizeMode='contain'
                                            source={require('../assets/Google_Maps.jpg')}
                                        />
                                        <Text style={{fontSize:12,color:colors.text,fontFamily: 'Poppins_400Regular',letterSpacing:.9,bottom:0}}>{location == null || location == "" ? "Select Location" : location}</Text>
                                </Pressable> */}

                                        </View>
                                        <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', display: noaddress ? 'none' : 'flex' }}>

                                            <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', letterSpacing: .9, left: 0 }}>(tap to change)</Text>

                                        </View>

                                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', marginBottom: 12, marginTop: 45, right: 5 }}>

                                            <Text style={{ color: colors.text, fontSize: 12, padding: 6, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>ADDITIONAL DETAILS:   <Text style={{ color: colors.ash, letterSpacing: .9, fontFamily: 'Poppins_400Regular', fontSize: 12 }}>  (optional)</Text></Text>

                                        </View>

                                        <TextInput
                                            style={[styles.input, { borderColor: '#C7C8D2', top: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.text, paddingRight: 20, paddingLeft: 20, marginTop: 10 }]}
                                            onChangeText={newTest => setNotes(newTest)}
                                            defaultValue={notes}
                                            placeholder="If you have any special instructions, please let us know"
                                            placeholderTextColor={colors.ash}
                                            multiline={true}
                                        // textAlign={'center'}
                                        />



                                    </View>



                                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', marginTop: 45, }}>

                                        <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>PAYMENT MODE: </Text>

                                    </View>

                                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', left: 30, display: blockqmoney ? 'none' : 'flex', marginBottom: 20 }}>

                                        <CheckBox

                                            disabled={parseInt(route.params.totalamount) >= 500 ? false : true}
                                            value={qmoneyuse}
                                            onValueChange={(newValue) => { setQmoneyuse(newValue), setFinalRateOrder(newValue); }}
                                            style={[styles.checkbox, { top: 20, right: 13, width: 18, height: 18, marginTop: 10 }]}
                                        />
                                        <Text style={{ color: colors.ash, fontSize: 12, left: 10, letterSpacing: 0.9, fontFamily: 'Poppins_400Regular' }}> USE Q-REWARDS BY CHECKING THE BOX.</Text>
                                        <Text style={{ color: "#EE416C", fontSize: 12, left: 10, letterSpacing: 0.9, fontFamily: 'Poppins_400Regular' }}> YOU HAVE <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 12 }}>{qcoins}</Text> QCOINS = <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 12 }}>Tk.{qmoney}</Text></Text>

                                    </View>

                                    <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white, borderRadius: 4, display: qmoneyuse ? 'flex' : 'none', marginTop: 10, marginBottom: 30 }}>
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
                                            <View style={{ width: '60%', justifyContent: 'flex-start', alignItems: 'flex-start', borderBottomColor: colors.ash1, borderBottomWidth: 0 }}>
                                                <Text style={{ color: colors.ash, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>TOTAL:</Text>
                                                <Text style={{ color: colors.ash, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>PAID WITH Q-REWARD:</Text>
                                                <Text style={{ color: colors.ash, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>DUE AMOUNT:</Text>

                                            </View>
                                            <View style={{ width: '40%', justifyContent: 'flex-end', alignItems: 'flex-end', borderBottomColor: colors.ash1, borderBottomWidth: 0, right: 5 }}>
                                                <Text style={{ color: colors.text, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>{Math.round(finalPrice)}.00</Text>
                                                <Text style={{ color: colors.red, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>-{Math.round(qmoney)}.00</Text>
                                                <Text style={{ color: "#EE416C", fontSize: 14, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>Tk. {Math.round(superfinalPrice)}.00</Text>

                                            </View>
                                        </View>

                                    </View>
                                    <View style={{ marginTop: 0, width: '100%', justifyContent: 'center', left: 10, borderBottomColor: colors.ash1, borderBottomWidth: 0, left: 30, marginTop: 10 }}>

                                        <RadioForm

                                            initial={0}
                                            radio_props={options}
                                            formHorizontal={false}
                                            labelHorizontal={true}
                                            buttonColor={colors.ash1}
                                            selectedButtonColor={colors.ash}
                                            labelStyle={{ fontSize: 13, color: colors.text, bottom: 2, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}
                                            buttonSize={5}
                                            buttonOuterColor={'white'}
                                            buttonOuterSize={17}
                                            buttonWrapStyle={10}
                                            animation={false}
                                            buttonStyle={{ color: "#303030", paddingLeft: 10 }}
                                            onPress={(value) => setpaymenttype1(value)}
                                            style={{ marginTop: 0, marginBottom: 0 }}

                                        />
                                    </View>





                                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', left: 30, marginTop: 0 }}>
                                        <CheckBox

                                            disabled={false}
                                            value={terms}
                                            onValueChange={(newValue) => setTerms(newValue)}
                                            style={[styles.checkbox, { top: 20, right: 13, width: 18, height: 18 }]}
                                        />
                                        <Text style={{ color: colors.ash, fontSize: 12, left: 10, letterSpacing: 0.9, fontFamily: 'Poppins_400Regular' }}> BY CHECKING THE BOX. I AGREE TO THE</Text>
                                        <Text style={{ color: "#EE416C", fontSize: 12, left: 10, letterSpacing: 0.9, fontFamily: 'Poppins_400Regular' }}> TERMS & CONDITIONS</Text>

                                    </View>

                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 30, display: showtype == true ? 'flex' : 'none', marginTop: 20 }}>

                                        <Pressable disabled={submitflag ? false : true} style={{ marginTop: 10, borderRadius: 4, width: '95%', height: 45, justifyContent: 'center', alignItems: 'center', backgroundColor: submitflag ? "#EE416C" : colors.ash }} onPress={() => { setSubmitflag(false), postMoney(); }}>
                                            <Text style={{ color: colors.white, fontSize: 14, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>SUBMIT ORDER</Text>
                                        </Pressable>

                                    </View>
                                </View>



                            </View>



                        </View>

                    </View>

                </ScrollView>

                {/* Address PopUp */}

                <View style={[styles.sendform, { position: 'absolute', width: '88%', top: 200, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ECFFFA', borderRadius: 6, borderWidth: 1, borderColor: colors.ash1, display: showaddress ? 'flex' : 'none' }]}>

                    {/* <Icon name='coffin-cross' style={{position:'absolute',fontSize:14,color:'#007B9A',top:2,right:0}} onPress={()=> navigation.navigate("Medicine",{})}/>                     */}
                    <Pressable style={{ left: 172, height: 10 }} onPress={() => setShowaddress(false)}>
                        <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/cross.jpg")} />
                    </Pressable>


                    <View style={{ marginTop: 10, width: '90%' }}>
                        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 20 }}>
                            <Text style={{ color: colors.ash, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'none' : 'flex' }}>পোস্ট কোড</Text>
                            <Text style={{ color: colors.ash, fontSize: 12, letterSpacing: 0.9, fontFamily: 'Poppins_400Regular', paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Address1</Text>
                        </View>
                        <Pressable style={{ borderWidth: 0, backgroundColor: colors.white, height: 45, justifyContent: 'center', alignItems: 'center' }} onPress={() => (setLocation(address1), setShowaddress(false))}>
                            <Text style={{ color: colors.text, fontSize: 12, letterSpacing: 0.9, fontFamily: 'Poppins_400Regular' }}>{address1}</Text>
                        </Pressable>

                    </View>

                    <View style={{ marginTop: 10, width: '90%', display: (address2 == null || address2 == "") ? 'none' : 'flex' }} >
                        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Text style={{ color: colors.ash, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'none' : 'flex' }}>পোস্ট কোড</Text>
                            <Text style={{ color: colors.ash, fontSize: 12, letterSpacing: 0.9, fontFamily: 'Poppins_400Regular', paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Address2</Text>
                        </View>
                        <Pressable style={{ borderWidth: 0, backgroundColor: colors.white, height: 45, justifyContent: 'center', alignItems: 'center' }} onPress={() => (setLocation(address2), setShowaddress(false))}>
                            <Text style={{ color: colors.text, fontSize: 12, letterSpacing: 0.9, fontFamily: 'Poppins_400Regular' }}>{address2}</Text>
                        </Pressable>

                    </View>

                    <View style={{ marginTop: 10, width: '90%', display: (address3 == null || address3 == "") ? 'none' : 'flex' }} >
                        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Text style={{ color: colors.ash, fontSize: 12, letterSpacing: 0.9, fontFamily: 'Poppins_400Regular', paddingBottom: 3, display: lan ? 'none' : 'flex' }}>পোস্ট কোড</Text>
                            <Text style={{ color: colors.ash, fontSize: 12, letterSpacing: 0.9, fontFamily: 'Poppins_400Regular', paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Address3</Text>
                        </View>
                        <Pressable style={{ borderWidth: 0, backgroundColor: colors.white, height: 45, justifyContent: 'center', alignItems: 'center' }} onPress={() => (setLocation(address3), setShowaddress(false))}>
                            <Text style={{ color: colors.text, fontSize: 12, letterSpacing: 0.9, fontFamily: 'Poppins_400Regular' }}>{address3}</Text>
                        </Pressable>

                    </View>

                    <Pressable style={{ marginTop: 35, width: '90%', borderWidth: 0, backgroundColor: colors.white1, height: 45, justifyContent: 'center', alignItems: 'center', marginBottom: 30 }} onPress={() => (setNoaddress(true), setShowaddress(false))}>
                        <Text style={{ color: colors.text, fontSize: 12, letterSpacing: 0.9, fontFamily: 'Poppins_400Regular' }}>+ Use New Address</Text>
                    </Pressable>



                </View>


                {/* For Future Code */}

                <ScrollView style={{ width: '100%', display: payflag == true ? 'flex' : 'none' }}>
                    {/* for payment */}

                    <View style={{ left: 4, width: '98%', justifyContent: 'flex-start', alignItems: 'center', borderWidth: 1, borderColor: colors.ash1, marginTop: 10, borderRadius: 4, marginBottom: 20, display: successorder ? "none" : 'flex' }}>
                        <View style={{ width: '95%', height: 50, justifyContent: 'flex-start', alignItems: 'flex-start', borderBottomWidth: 1, borderBottomColor: colors.ash1, marginBottom: 10 }}>
                            <Text style={{ fontSize: 14, color: colors.black, fontWeight: '700', top: 15 }}>Choose Payment method</Text>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>

                            <View style={{ marginTop: 0, width: '100%', justifyContent: 'center', left: 10, borderBottomColor: colors.ash1, borderBottomWidth: 0 }}>

                                <RadioForm
                                    radio_props={payflag == true ? options1 : []}
                                    formHorizontal={true}
                                    labelHorizontal={true}
                                    buttonColor={'#747474'}
                                    selectedButtonColor='#303030'
                                    labelStyle={{ fontSize: 14, color: '#303030', fontWeight: "400" }}
                                    buttonSize={8}
                                    buttonOuterSize={20}
                                    animation={false}
                                    buttonStyle={{ color: "#303030", paddingLeft: 10 }}
                                    onPress={(value) => setpaymenttype(value)}
                                    style={{ right: 30, marginTop: 20, justifyContent: 'space-evenly', marginBottom: 10 }}
                                />
                            </View>



                            <View style={{ marginTop: 20, width: '90%', justifyContent: 'center', left: 0, borderWidth: 1, borderColor: colors.white1, borderRadius: 4, display: paymenttype == "Digital_payment" ? 'flex' : 'none' }}>

                                <Text style={{ color: colors.black, fontSize: 14, fontWeight: '400', left: 10, top: 8 }}>Choose any of these<Text style={{ color: colors.red }}>*</Text></Text>

                                <RadioForm
                                    radio_props={payflag == true && paymenttype == "Digital_payment" ? options2 : []}
                                    formHorizontal={true}
                                    labelHorizontal={true}
                                    buttonColor={'#747474'}
                                    selectedButtonColor='#303030'
                                    labelStyle={{ fontSize: 14, color: '#303030', fontWeight: "400" }}
                                    buttonSize={8}
                                    buttonOuterSize={20}
                                    animation={false}
                                    buttonStyle={{ color: "#303030", paddingLeft: 10 }}
                                    onPress={(value) => setPaymentmethod(value)}
                                    style={{ right: 18, marginTop: 35, justifyContent: 'space-evenly', marginBottom: 0 }}
                                />


                                {/* for Bkash */}

                                <View style={{ marginTop: 0, width: '100%', justifyContent: 'center', display: paymentmethod == "Bkash" ? 'flex' : 'none' }}>

                                    <Text style={{ fontSize: 14, color: colors.ash, fontWeight: '700', marginTop: 30, marginLeft: 10 }}>After making the payment please fill up</Text>
                                    <View style={{ width: '95%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.ash1, marginBottom: 10, alignItems: 'center', marginTop: 10, left: 8, paddingBottom: 20 }}>
                                        {/* <Larrow style={{marginLeft:5,top:5}}/> */}
                                        <Text style={{ fontSize: 12, color: colors.black, fontWeight: '400', marginTop: 10, marginLeft: 5 }}>Make Send money to  <Text style={{ color: colors.black, fontWeight: '700' }} onPress={() => { setBcopy(true), copyToClipboard(bkashnumber); }}>
                                            {bkashnumber}
                                        </Text></Text>

                                        {/* <Copy style={{marginLeft:5,top:5}}  onPress={()=> {setBcopy(true),copyToClipboard(bkashnumber)}}/>  */}

                                        <Text style={{ bottom: 10, right: 5, fontSize: 12, fontWeight: '700', color: colors.ash, display: bcopy ? 'flex' : 'none' }}>  copied</Text>


                                        {/* <Copy style={{marginLeft:10,top:5}}   onPress={()=> copyToClipboard()}/>  */}
                                    </View>

                                    <Text style={{ fontSize: 14, color: colors.ash, fontWeight: '700', marginTop: 10, marginLeft: 10 }}>After making the payment please fill up</Text>

                                    <View style={[styles.inputdiv, { marginTop: 20, marginLeft: 10, marginBottom: 20 }]} >
                                        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 0 }}>

                                            <Text style={{ color: transactionflag ? colors.ash : colors.red, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'none' : 'flex' }}>সাইজ   (বর্গফুট)</Text>
                                            <Text style={{ color: transactionflag ? colors.ash : colors.red, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Transaction ID <Text style={{ color: colors.red }}>*</Text></Text>
                                        </View>
                                        <TextInput
                                            style={[styles.input, { paddingLeft: 10, borderColor: transactionflag ? "#C7C8D2" : colors.red, marginTop: 5 }]}
                                            onChangeText={newTest => setTransaction(newTest)}
                                            defaultValue={transaction}
                                            maxLength={25}
                                            placeholder="  Enter your Transaction ID"
                                            placeholderTextColor={colors.ash}

                                        />
                                        <View style={{ marginTop: 5, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 0, display: transactionflag ? 'none' : 'flex' }}>

                                            <Text style={{ color: colors.red, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>TransactionId can't be empty<Text style={{ color: colors.red }}></Text></Text>

                                        </View>
                                    </View>

                                </View>


                                {/* for Roket */}

                                <View style={{ marginTop: 0, width: '100%', justifyContent: 'center', display: paymentmethod == "Roket" ? 'flex' : 'none' }}>

                                    <Text style={{ fontSize: 14, color: colors.ash, fontWeight: '700', marginTop: 30, marginLeft: 10 }}>After making the payment please fill up</Text>
                                    <View style={{ width: '95%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.ash1, marginBottom: 10, alignItems: 'center', marginTop: 10, left: 8, paddingBottom: 20 }}>
                                        {/* <Larrow style={{marginLeft:5,top:5}}/> */}
                                        <Text style={{ fontSize: 12, color: colors.black, fontWeight: '400', marginTop: 10, marginLeft: 5 }}>Make Send money to <Text style={{ color: colors.black, fontWeight: '700' }} onPress={() => { setRcopy(true), copyToClipboard(roketnumber); }} >
                                            {roketnumber}
                                        </Text></Text>
                                        {/* <Copy style={{marginLeft:5,top:5}}  onPress={()=> {setRcopy(true),copyToClipboard(roketnumber)}}/>  */}
                                        <Text style={{ bottom: 10, right: 5, fontSize: 12, fontWeight: '700', color: colors.ash, display: rcopy ? 'flex' : 'none' }}>  copied</Text>

                                        {/* <Text style={{fontSize:12,bottom:15,right:10}}>  copied</Text> */}
                                        {/* <Copy style={{marginLeft:10,top:5}}   onPress={()=> copyToClipboard()}/>  */}
                                    </View>

                                    <Text style={{ fontSize: 14, color: colors.ash, fontWeight: '700', marginTop: 10, marginLeft: 10 }}>After making the payment please fill up</Text>

                                    <View style={[styles.inputdiv, { marginTop: 20, marginLeft: 10, marginBottom: 20 }]} >
                                        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 0 }}>

                                            <Text style={{ color: transactionflag ? colors.ash : colors.red, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'none' : 'flex' }}>সাইজ   (বর্গফুট)</Text>
                                            <Text style={{ color: transactionflag ? colors.ash : colors.red, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Transaction ID <Text style={{ color: colors.red }}>*</Text></Text>
                                        </View>
                                        <TextInput

                                            style={[styles.input, { paddingLeft: 10, borderColor: transactionflag ? "#C7C8D2" : colors.red, marginTop: 5 }]}
                                            onChangeText={newTest => setTransaction(newTest)}
                                            defaultValue={transaction}
                                            maxLength={25}
                                            placeholder="  Enter your Transaction ID"
                                            placeholderTextColor={colors.ash}

                                        />
                                        <View style={{ marginTop: 5, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 0, display: transactionflag ? 'none' : 'flex' }}>

                                            <Text style={{ color: colors.red, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>TransactionId can't be empty<Text style={{ color: colors.red }}></Text></Text>

                                        </View>
                                    </View>

                                </View>




                                {/* for Islami bank */}

                                <View style={{ marginTop: 0, width: '100%', justifyContent: 'center', display: paymentmethod == "IslamiBank" ? 'flex' : 'none' }}>


                                    <Text style={{ fontSize: 14, color: colors.ash, fontWeight: '700', marginTop: 30, marginLeft: 10 }}>Please follow the procedure</Text>
                                    <View style={{ width: '95%', flexDirection: 'row', marginBottom: 10, alignItems: 'center', marginTop: 5, left: 8, paddingBottom: 0 }}>
                                        {/* <Larrow style={{marginLeft:5,top:5}}/> */}
                                        <Text style={{ fontSize: 12, color: colors.black, fontWeight: '400', marginTop: 10, marginLeft: 5 }}>Account Name:   <Text style={{ color: colors.black, fontWeight: '700' }} onPress={() => { setBncopy(true), copyToClipboard(accountnamei); }}>

                                            {accountnamei}

                                        </Text></Text>
                                        {/* <Copy style={{marginLeft:5,top:5}} onPress={()=> {setBncopy(true),copyToClipboard(accountnamei)}}/> */}
                                        <Text style={{ bottom: 10, right: 5, fontSize: 12, fontWeight: '700', color: colors.ash, display: bncopy ? 'flex' : 'none' }}>  copied</Text>

                                        {/* <Text style={{fontSize:12,bottom:15,right:10}}>  copied</Text> */}
                                    </View>

                                    <View style={{ width: '95%', flexDirection: 'row', marginBottom: 10, alignItems: 'center', marginTop: 5, left: 8, paddingBottom: 0 }}>
                                        {/* <Larrow style={{marginLeft:5,top:5}}/> */}
                                        <Text style={{ fontSize: 12, color: colors.black, fontWeight: '400', marginTop: 10, marginLeft: 5 }}>Account No:   <Text style={{ color: colors.black, fontWeight: '700' }} onPress={() => { setBacopy(true), copyToClipboard(accountnumberi); }}>

                                            {accountnumberi}

                                        </Text></Text>
                                        {/* <Copy style={{marginLeft:10,top:5}} onPress={()=> {setBacopy(true),copyToClipboard(accountnumberi)}}/> */}
                                        <Text style={{ bottom: 10, right: 5, fontSize: 12, fontWeight: '700', color: colors.ash, display: bacopy ? 'flex' : 'none' }}>  copied</Text>

                                        {/* <Text style={{fontSize:12,bottom:15,right:10}}>  copied</Text> */}
                                    </View>

                                    <View style={{ width: '95%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.ash1, marginBottom: 0, alignItems: 'center', marginTop: 5, left: 8, paddingBottom: 20 }}>
                                        {/* <Larrow style={{marginLeft:5,top:5}}/> */}
                                        <Text style={{ fontSize: 12, color: colors.black, fontWeight: '400', marginTop: 10, marginLeft: 5 }}>Branch:   <Text style={{ color: colors.black, fontWeight: '700' }} onPress={() => { setBbcopy(true), copyToClipboard(brunchnamei); }}>


                                            {brunchnamei}
                                        </Text></Text>

                                        {/* <Copy  style={{marginLeft:5,top:5}} onPress={()=>{setBbcopy(true),copyToClipboard(brunchnamei)}}/> */}
                                        <Text style={{ bottom: 10, right: 5, fontSize: 12, fontWeight: '700', color: colors.ash, display: bbcopy ? 'flex' : 'none' }}>  copied</Text>

                                        {/* <Text style={{fontSize:12,bottom:15,right:10}}>  copied</Text> */}
                                    </View>



                                    <Text style={{ fontSize: 14, color: colors.ash, fontWeight: '700', marginTop: 10, marginLeft: 10 }}>After making the payment please fill up</Text>

                                    <View style={[styles.inputdiv, { marginTop: 20, marginLeft: 10, marginBottom: 20 }]} >
                                        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 0 }}>

                                            <Text style={{ color: accountnameflag ? colors.ash : colors.red, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'none' : 'flex' }}>সাইজ   (বর্গফুট)</Text>
                                            <Text style={{ color: accountnameflag ? colors.ash : colors.red, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Name <Text style={{ color: colors.red }}>*</Text></Text>
                                        </View>
                                        <TextInput
                                            style={[styles.input, { paddingLeft: 10, borderColor: accountnameflag ? "#C7C8D2" : colors.red, marginTop: 5 }]}
                                            onChangeText={newTest => setAccountname(newTest)}
                                            defaultValue={accountname}
                                            maxLength={25}
                                            placeholder=" Enter your accountname"
                                            placeholderTextColor={colors.ash}

                                        />
                                        <View style={{ marginTop: 5, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 0, display: accountnameflag ? 'none' : 'flex' }}>

                                            <Text style={{ color: colors.red, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Account name can't be empty<Text style={{ color: colors.red }}></Text></Text>

                                        </View>
                                    </View>


                                    <View style={[styles.inputdiv, { marginTop: 0, marginLeft: 10, marginBottom: 20 }]} >
                                        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 0 }}>

                                            <Text style={{ color: accountnumberflag ? colors.ash : colors.red, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'none' : 'flex' }}>সাইজ   (বর্গফুট)</Text>
                                            <Text style={{ color: accountnumberflag ? colors.ash : colors.red, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Your Account <Text style={{ color: colors.red }}>*</Text></Text>
                                        </View>
                                        <TextInput
                                            style={[styles.input, { paddingLeft: 10, borderColor: accountnumberflag ? "#C7C8D2" : colors.red, marginTop: 5 }]}
                                            onChangeText={newTest => setAccountnumber(newTest)}
                                            defaultValue={accountnumber}
                                            maxLength={25}
                                            placeholder=" Enter your account number"
                                            placeholderTextColor={colors.ash}

                                        />
                                        <View style={{ marginTop: 5, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 0, display: accountnumberflag ? 'none' : 'flex' }}>

                                            <Text style={{ color: colors.red, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Account number can't be empty<Text style={{ color: colors.red }}></Text></Text>

                                        </View>
                                    </View>

                                </View>




                            </View>

                        </View>


                        <View style={{ width: '95%', height: 50, justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 0 }}>
                            <Text style={{ fontSize: 14, color: colors.black, fontWeight: '700', top: 10 }}>*Our  represnts will contact with you soon</Text>
                        </View>

                    </View>
                </ScrollView>


                <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', bottom: 250, display: successorder ? "flex" : 'none' }}>

                    {/* <SuccessFull width={80} height={80}/> */}
                    <SvgUri
                        width="80"
                        height="80"
                        // style={{marginTop:80}} 
                        uri="http://drive.google.com/uc?export=view&id=1BzHhSffwzfRnWbax7q4nP06kJQBYFETx"

                    />

                    <Text style={{ color: colors.ash, fontSize: 14, marginTop: 30, fontFamily: 'Poppins_400Regular' }}>Thank you for your request.</Text>

                    <Text style={{ marginTop: 40, color: colors.ash, fontSize: 14, fontFamily: 'Poppins_400Regular' }}>You order has been placed </Text>
                    <Text style={{ color: colors.ash, fontSize: 14, marginTop: 0, fontFamily: 'Poppins_400Regular' }}>Successfully</Text>

                    <Text style={{ top: 60, color: colors.blue, fontSize: 14, marginTop: 10, fontFamily: 'Poppins_400Regular' }}>Your Order ID is #00695{rqstid}</Text>

                </View>




                <View style={{ marginBottom: 5, width: '95%', height: 38, borderColor: '#D50400', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: nointernet ? "flex" : "none" }}>
                    <Text style={{ marginLeft: 15, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: "#D50400" }}>No Internet Connection.</Text>
                </View>

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: confirmedflag == true ? 'none' : 'flex' }}>

                    {/* Order Placed */}
                    {/* <View style={{width:'100%',justifyContent:'center',alignItems:'center',marginBottom:10,display: showtype == true ? 'flex' : 'none'}}>
                    
                    <Pressable style={{marginTop:10,borderRadius:4,width:'90%',height:45,justifyContent:'center',alignItems:'center',backgroundColor:"#EE416C"}} onPress={()=> {setShowtype(false),setPayflag(true)}}>
                        <Text style={{color:colors.white,fontSize:14,letterSpacing:.9,fontFamily: 'Poppins_500Medium'}}>SUBMIT ORDER</Text>            
                    </Pressable>
                </View>  */}

                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10, display: payflag == true ? 'flex' : 'none' }}>

                        <View style={{ borderRadius: 4, width: '90%', height: 30, alignItems: 'center', backgroundColor: colors.white, flexDirection: 'row', justifyContent: 'space-between', borderColor: '#065540', borderWidth: 1.5 }}>
                            <Text style={{ color: colors.black, fontSize: 14, fontWeight: '400', left: 10 }}>Total Amount</Text>
                            <Text style={{ color: colors.black, fontSize: 14, fontWeight: '400', right: 20 }}>TK. {Math.round(finalPrice)}</Text>
                        </View>
                        {/* <Pressable disabled={false} style={{marginTop:10,borderRadius:4,width:'90%',height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#065540'}}  onPress={()=> { paymenttype == "Cash_on_delivery" ? AddOrder()  : postMoney(totalamount, paymentmethod)}}>
                        <Text style={{color:colors.white,fontSize:14,fontWeight:'700'}}>Confirm Payment</Text>              
                    </Pressable> */}

                    </View>

                </View>

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10, display: confirmedflag == true ? 'flex' : 'none' }}>
                    <View style={{ borderRadius: 4, width: '90%', height: 30, alignItems: 'center', backgroundColor: '#065540', flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Text style={{ color: colors.white, fontSize: 14, fontWeight: '400', left: 10 }}>Total Amount</Text>
                        <Text style={{ color: colors.white, fontSize: 14, fontWeight: '400', right: 20 }}>TK. {Math.round(finalPrice)}</Text>

                    </View>
                    <Pressable disabled={false} style={{ marginTop: 10, borderRadius: 4, width: '90%', height: 45, justifyContent: 'center', alignItems: 'center', borderColor: '#303030', borderWidth: 2 }} onPress={() => { }}>

                        <Text style={{ color: colors.black, fontSize: 14, fontWeight: '700' }}>Order Again</Text>

                    </Pressable>

                </View>




            </View>

            <View style={[styles.footerStyle, { display: openmap ? 'none' : 'flex' }]}>

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
    navbar1: {

        backgroundColor: colors.white,
        width: '60%',
        height: 40,
        left: 50,

    },
    sendform: {

        width: "100%",
        justifyContent: "center",
        alignItems: 'center',
    },
    inputdiv: {
        width: "95%",
        height: 84,
        justifyContent: "center",
        alignItems: 'center',
        paddingBottom: 10,
        //top:-100

    },

    input: {
        width: "100%",
        height: 100,
        borderColor: '#C7C8D2',
        borderWidth: 1,
        alignItems: 'center',
        paddingLeft: 10,
        borderRadius: 4,
        fontSize: 12,
        backgroundColor: colors.white

    },
    checkbox: {
        color: 'white',
        marginTop: 24,
    },
    adds: {
        width: 156,
        height: 187,
        borderColor: colors.ash1,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: colors.white,

    },
    addsImg: {
        width: 35,
        borderTopLeftRadius: 0,
        height: 45,
    },
    addstext: {
        width: 149,
        height: 83,

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
        width: "98%",
        height: 250,

    },
    imgpagenumber: {
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: colors.black,
        borderRadius: 100,
        position: 'absolute',
        left: 15,
        bottom: 220


    },
    flatdetails: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        paddingLeft: 20,
    }

});



export default PlaceOrder;



