import React, { useState, useEffect, useContext, useRef } from 'react';

import { ActivityIndicator, Animated, StyleSheet, SafeAreaView, Alert, View, StatusBar, Dimensions, Pressable, Text, ScrollView, TextInput, Image } from 'react-native';
import colors from '../config/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";

import InputSpinner from "react-native-input-spinner";

import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';


import RadioForm from 'react-native-simple-radio-button';

import Icon from 'react-native-vector-icons/FontAwesome5';
//asyn-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserContext } from '../../components/CredintailsContext';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';




// const ListItem = ({ item, onDelete }) => {
//     return (
//       <Swipeable
//         renderRightActions={(_, dragX) => <SwipeToDelete onDelete={onDelete} dragX={dragX} item={item}/>}
//         overshootRight={false}
//       >
//         <Pressable style={{ padding: 16 }}>
//           <Text>{item.title}</Text>
//         </Pressable>
//       </Swipeable>

//     );
//   };

const SwipeToDelete = ({ onDelete, dragX, item, removefrombuycart }) => {
    const [animationValue] = useState(new Animated.Value(0));

    const handleDelete = (productid, type) => {
        <Cart item={item} removefrombuycart={removefrombuycart(productid, type)} />;
        // console.log("productid :",productid)
        // console.log("type :",type)
        //   onDelete();
    };


    return (

        <View style={[styles.adds, { width: 85, height: 120, justifyContent: 'flex-end', alignItems: 'flex-end', }]}>
            <Pressable style={{ width: 100, backgroundColor: colors.red, height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => handleDelete(item.productid, item.type)}>

                <Text style={{ fontSize: 12, color: colors.white, paddingTop: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>Remove</Text>

            </Pressable>
        </View>

    );
};


function Cart({ navigation, route }) {
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

    console.log("route", route.params);


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



    // const [imgpres, setImgpres]= useState(null)
    const [imgpres, setImgpres] = useState(route.params.imgpres);

    const [city, setCity] = useState(null);
    const [area, setArea] = useState(null);
    const [filter, setFilter] = useState(null);
    const { testCredentials, setTestCredentials } = useContext(UserContext);

    const [lan, setLan] = useState(true);

    const [userid, setUserid] = useState(testCredentials.userid);
    const [cartbuy, setCartbuy] = useState(testCredentials.cartbuy);

    const [data, setData] = useState([]);
    const [remainsdata, setRemainsdata] = useState([]);
    const [notify, setNotify] = useState(testCredentials.notify);

    const [cartrent, setCartrent] = useState(testCredentials.cartrent);
    const [productsave, setProductsave] = useState(testCredentials.productsave);
    const [flatsave, setflatsave] = useState(testCredentials.flatsave);
    const [raddress, setraddress] = useState(testCredentials.raddress);
    const [recentuse, setRecentuse] = useState(testCredentials.raddress);

    const [notallow, setNotallow] = useState(testCredentials.userid == 0 ? true : false);

    //const [x,setX] = useState(null);
    let x = "";



    const [promoDis, setPromoDis] = useState(null);

    const [getFlat, setGetFlat] = useState(true);
    const [getFlatdata, setGetFlatdata] = useState([]);
    const [FilterID, setFilterID] = useState(null);


    const [productNumber, setProductNumber] = useState(1);

    const [buyproductcount, setBuyproductcount] = useState(1);
    const [rentproductcount, setRentproductcount] = useState(1);

    const [longitude, setLongitude] = useState(0.0);
    const [latitude, setLatitude] = useState(0.0);
    const [insideDhaka, setInsideDhaka] = useState(true);

    const [search, setSearch] = useState(null);
    const [searchFlag, setSearchFlag] = useState(false);

    const [successorder, setSuccessorder] = useState(false);

    const [animate, setAnimate] = useState(true);

    const [text, setText] = useState('');
    const [isLoading, setLoading] = useState(true);

    const [nointernet, setNointernet] = useState(false);
    const [isLoading1, setLoading1] = useState(false);

    const [nodata, setNodata] = useState(true);

    const [getTree, setGetTree] = useState(true);
    const [getTreedata, setGetTreedata] = useState([]);

    const [chosenOption, setChosenOption] = useState('buy');

    const [buytotalcount, setBuytotalcount] = useState(0);
    const [buydistotalcount, setBuydistotalcount] = useState(0);
    const [buyregulartotalcount, setBuyregulartotalcount] = useState(0);

    const [renttotalcount, setRenttotalcount] = useState(0);
    const [savelist, setSavelist] = useState([]);

    const [buytotalQnt, setBuytotalQnt] = useState(0);
    const [renttotalQnt, setRenttotalQnt] = useState(0);

    const [location, setLocation] = useState(null);
    const [locationdif, setLocationdif] = useState(true);

    const [notes, setNotes] = useState(null);
    const [Name, setName] = useState(null);
    const [Email, setEmail] = useState(null);
    const [qmoney, setQmoney] = useState(null);
    const [qcoins, setQcoins] = useState(null);

    const [address1, setAddress1] = useState(null);
    const [address2, setAddress2] = useState(null);
    const [address3, setAddress3] = useState(null);
    let formdata = new FormData();

    //IMAGE PERMITION
    const [hasGallaryPermission, setHasGallaryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [image12, setImage12] = useState(null);

    const [ready, setReady] = useState(false);
    const [imageupdate, setImageupdate] = useState(null);
    const [imageupdate1, setImageupdate1] = useState(null);


    const [falgimg1, setFalgimg1] = useState(false);

    const [newimg, setNewimg] = useState(false);

    const [noaddress, setNoaddress] = useState(false);
    const [showaddress, setShowaddress] = useState(false);

    const [phonenumber, setPhonenumber] = useState(null);

    const [Nameflag, setNameflag] = useState(true);
    const [locationflag, setLocationFlag] = useState(true);
    const [phonenumberflag, setPhonenumberflag] = useState(true);
    const [notok, setNotok] = useState(false);


    const [getaccount, setGetaccount] = useState(true);
    const [getaccountdata, setGetaccountdata] = useState([]);

    const [confirm, setConfirm] = useState(false);

    const [minorder, setMinorder] = useState(false);

    const [proceedorder, setProceedorder] = useState(false);

    const [blockqmoney, setBlockqmoney] = useState(false);

    const [promovalue, setPromovalue] = useState(0.00);
    const [promofill, setPromofill] = useState(false);

    const [persentDis, sePersentDis] = useState(false);

    const options = [
        { label: 'Regular', value: 'Regular' },
        { label: 'Express', value: 'Express' }
    ];

    const [data1, setData1] = useState([
        { id: '1', title: 'Item 1' },
        { id: '2', title: 'Item 2' },
        { id: '3', title: 'Item 3' },
    ]);


    const handleDeleteItem = (id) => {
        // const updatedData = data.filter((item) => item.productid !== id);
        // setData(updatedData);
    };



    const [deliverytype, setDeliverytype] = useState('Regular');

    let screenWidth = Dimensions.get('window').width - 14;
    let screenHight = Dimensions.get('window').height;

    translateX = new Animated.Value(0);
    translateY = new Animated.Value(0);

    let minvalue = 1000;

    let maxvalue = 600;


    onPanGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: translateX,
                    translationY: translateY,
                },
            },
        ],
        { useNativeDriver: true }
    );

    // const [orderid, setOrderid] = useState(null);
    // const [rentorderid, setRentorderid] = useState(null);

    const [vouture, setVouture] = useState(null);
    const [voutureflag, setVoutureflag] = useState(true);

    const [voucherstatus, setVoucherstatus] = useState(false);
    const [freedeliverystatus, setFreedeliverystatus] = useState(false);


    const [totalregularPrice, setTotalregularPrice] = useState(0);
    const [totalamount, setTotalamount] = useState(0);
    const [totalamount1, setTotalamount1] = useState(0);

    const [vat, setVat] = useState(0.00);
    // const [finalPrice,setFinalPrice] = useState(route.params.totalamount + 60 - route.params.qmoney)
    // const [finalPrice,setFinalPrice] = useState(totalamount + 60 - qmoney)
    const [finalPrice, setFinalPrice] = useState(0);

    const fadeAnim = useRef(new Animated.Value(0)).current;

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

            navigation.navigate("RentDetailsOnprocess", { orderid: orderid, showtype: true });



        });

    };


    const fadeIn3 = () => {


        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 7000,
            useNativeDriver: true
        }).start(() => { setNotok(false); });
    };

    const fadeIn4 = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
        }).start(() => { setMinorder(false); });

    };

    const fadeIn5 = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
        }).start(() => { setNoaddress(false); });

    };

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

    const [userData, setUserData] = useState();

    const UserInfo = () => {


        if (getFlat && userid != 0) {

            const requestOptions1 = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            };

            fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions1)
                .then((response) => response.json())
                .then((json) => {
                    setNointernet(false);
                    setUserData(json);

                    setName(json.name);
                    setEmail(json.email);
                    setPhonenumber(json.phonenumber);

                    setLocation(json.streetaddress == "" || json.streetaddress == null ? [] : json.streetaddress);

                    setInsideDhaka(json.insidedhaka);

                    setLatitude(parseFloat(json.latitude));

                    setLongitude(parseFloat(json.longitude));

                    setSavelist(json.savelist);
                    setAddress1(json.address1);
                    setAddress2(json.address2);
                    setAddress3(json.address3);
                    setQmoney(json.fmoney);
                    setQcoins(json.fcoins);
                    setBlockqmoney(json.blockqmoney);

                    // setFinalPrice(60 - qmoney)

                })
                .catch((error) => {
                    setNointernet(true);
                });
        }
        setLoading(false);
        setGetFlat(false);
    };



    const Checkout = () => {

        setData([]);

        testCredentials.cartbuy.map((item, index) => {
            if (imgpres) {
                data.push(item);
            }
            else {
                if (image == null) {
                    remainsdata.push(item);
                }
                else {
                    data.push(item);
                }
            }

        });

        navigation.navigate("PlaceOrder", { Name: Name, Email: Email, phonenumber: phonenumber, location: location, insideDhaka: insideDhaka, longitude: longitude, latitude: latitude, address1: address1, address2: address2, address3: address3, userid: userid, blockqmoney: blockqmoney, qcoins: qcoins, vat: vat, totalquantity: buytotalQnt, totalamount: totalamount, totalregularPrice: totalregularPrice, finalPrice: finalPrice, delivery: deliverytype == 'Regular' ? 60 : 120, deliverytype: deliverytype, freedelivery: freedeliverystatus, promo: promovalue, data: testCredentials.cartbuy, showtype: true, notes: notes, qmoney: qmoney, image: imgpres ? imgpres : image12, remainsdata: remainsdata, prescriborder: true, prescriptionorder: imgpres ? true : false });

    };

    const AddOrder = () => {

        setConfirm(true);
        setLoading1(true);
        setNameflag(true);
        setPhonenumberflag(true);
        setLocationFlag(true);


        if (Name != "" && phonenumber != "" && location != "" && Name != null && phonenumber != null && location != null && phonenumber.match("(?:\\+88|88)?(01[3-9]\\d{8})")) {
            // setAmount(amount.toString())
            if (recentuse != raddress) {
                if (recentuse != locationdif) {
                    // persistUser({userid:userid,notify:testCredentials.natify,lan:true,raddress: recentuse,cartbuy: testCredentials.cartbuy ,cartrent: testCredentials.cartrent,productsave: testCredentials.productsave,flatsave: testCredentials.flatsave })

                }
            }
            // console.log("i am here")

            if (locationdif != location) {
                if (location == address1) {

                }
                else if (location == address2) {
                    const requestOptions = {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                        body: JSON.stringify({
                            address1: address2,
                            address2: address1,

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
                else if (location == address3) {
                    const requestOptions = {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                        body: JSON.stringify({
                            address1: address3,
                            address2: address1,
                            address3: address2,

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
                else {
                    const requestOptions = {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                        body: JSON.stringify({
                            address1: location,
                            address2: address1,
                            address3: address2
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


            }


            // non otc medicine

            // cartbuy.map((item,index)=>{
            //     if(imgpres)
            //     {
            //         data.push(item)
            //     }
            //     else{
            //         if(item.otc == false && image == null)
            //         {
            //             remainsdata.push(item)
            //         }
            //         else{
            //             data.push(item)
            //         }
            //     }

            // })


            navigation.navigate("PlaceOrder", { Name: Name, Email: Email, phonenumber: phonenumber, location: location, prescriptionorder: true, userid: userid, totalquantity: buytotalQnt, totalamount: buytotalcount, totalregularPrice: buyregulartotalcount, data: data, showtype: true, notes: notes, vat: 0, qmoney: qmoney, image: imgpres ? imgpres : image12, remainsdata: remainsdata, prescriborder: true, prescriptionorder: imgpres ? true : false });

        }

        else if (Name == "" || Name == null) {
            setConfirm(false);

            setNameflag(false);
            setLoading1(false);

        }
        else if (location == "" || location == null) {

            setConfirm(false);

            setLoading1(false);
            setLocationFlag(false);

        }
        else {

            setConfirm(false);

            setLoading1(false);
            setPhonenumberflag(false);
        }
        if (nointernet == true) {
            setLoading1(false);
            setNointernet(true);


        }
    };

    const Checkpromo = () => {



        getaccountdata.map((item, index) => {

            if ((item.codename).toUpperCase() == vouture.toUpperCase()) {

                if (item.freedelivery == true) {
                    if (deliverytype == 'Regular') {

                        // setFinalPrice(finalPrice-60)
                        setFreedeliverystatus(true);
                        setPromofill(true);
                        setPromovalue(60);
                        // setTotalamount1
                    }



                }

                else {

                    // setFinalPrice( finalPrice - parseInt(item.codemoney) )

                    if ((item.codename).toUpperCase() == "QMFAM" || (item.codename).toUpperCase() == "MITFAM" || (item.codename).toUpperCase() == "RASFAM" || (item.codename).toUpperCase() == "HAMFAM") {
                        setVoucherstatus(true);
                        setPromofill(true);
                        sePersentDis(true);
                        setFreedeliverystatus(true);
                        setPromoDis(parseInt(item.codemoney));
                        // console.log(item.codemoney)
                        // setPromoDis(2)

                    }
                    else {
                        setVoucherstatus(true);
                        setPromofill(true);
                        setPromovalue(parseInt(item.codemoney));
                        // setTotalamount1()
                    }

                }

                setVoutureflag(true);


            }
            else {
                setVoutureflag(false);
            }

        });

    };

    const AddRentOrder = () => {


        setConfirm(true);
        setNameflag(true);
        setLoading1(true);
        setPhonenumberflag(true);
        setLocationFlag(true);


        if (Name != "" && phonenumber != "" && location != "" && phonenumber.match("(?:\\+88|88)?(01[3-9]\\d{8})")) {
            // setAmount(amount.toString())

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                body: JSON.stringify({
                    userid: userid,
                    name: Name,
                    phonenumber: phonenumber,
                    address: location,
                    totalquantity: renttotalQnt,
                    totalamount: renttotalcount,
                    data: cartrent,
                    activestatus: false,
                    status: 1,
                    paystatus: 2,
                })
            };

            fetch('https://ahasanhamza.pythonanywhere.com/rentOrder/new', requestOptions)
                .then((response) => response.json())
                .then((json) => {

                    persistUser({ userid: userid, notify: testCredentials.natify, lan: true, raddress: testCredentials.raddress, cartbuy: testCredentials.cartbuy, cartrent: [], productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });

                    setSuccessorder(true);

                    fadeIn2(json.id);

                    setNointernet(false);
                    setLoading1(false);


                })
                .catch((error) => {
                    setLoading1(false);
                    console.error(error);
                    setNointernet(true);
                });


        }

        else if (Name == "") {
            setConfirm(false);
            setNameflag(false);
            setLoading1(false);

        }
        else if (location == "") {

            setConfirm(false);

            setLoading1(false);
            setLocationFlag(false);

        }
        else {


            setConfirm(false);
            setLoading1(false);
            setPhonenumberflag(false);


        }
        if (nointernet == true) {
            setNointernet(true);

            setLoading1(false);

        }
    };

    const pickImage = async () => {



        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing :true,
            aspect: [4, 3],
            quality: 1,


        });
        // console.log("start")
        // if(!result.cancelled){


        //     setImage(result.uri)
        //     setFalgimg1(true)


        // }

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setFalgimg1(true);
        }
    };

    const resizer = async () => {
        const manipResult = await manipulateAsync(
            imageupdate1.localUri || imageupdate1.uri,
            [
                { resize: { height: 250, width: 300 } },
            ],
            { compress: 1, format: SaveFormat.PNG }
        );
        // console.log("manipResult ***************************************:",manipResult)
        // console.log("manipResult ppppppppppppppppppppppppppppppppppppppppppp :", imageupdate1)
        setImageupdate(manipResult);
        setImage(manipResult.uri);
        setNewimg(true);

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

    const removeflattosave = (flatid) => {


        if (flatsave === undefined) {

        }
        else {

            flatsave.map((data, index) => {

                if (data.flatid == flatid) {
                    flatsave.splice(index, 1);
                }
            });
        }

        persistUser({ userid: userid, notify: testCredentials.natify, lan: true, raddress: testCredentials.raddress, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: flatsave });

    };

    const removeproducttosave = (productid, type) => {


        productsave.map((data, index) => {

            if ((data.productid == productid) && (type == 'medicine')) {
                productsave.splice(index, 1);
            }
            else {
                productsave.splice(index, 1);
            }
        });

        persistUser({ userid: userid, notify: testCredentials.natify, lan: true, raddress: testCredentials.raddress, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: productsave, flatsave: testCredentials.flatsave });

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({
                savelist: productsave,
            })
        };

        fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
            .then((response) => response.json())
            .then((json) => {
                // console.log('create expance', json);
                setNointernet(false);
                setLoading1(false);

            })
            .catch((error) => {
                setLoading1(false);
                console.error(error);
                setNointernet(true);
            });

    };
    const removefromrentcart = (productid) => {


        cartrent.map((data, index) => {

            if (data.productid == productid) {
                cartrent.splice(index, 1);
            }
        });

        persistUser({ userid: userid, notify: testCredentials.natify, lan: true, raddress: testCredentials.raddress, cartbuy: testCredentials.cartbuy, cartrent: cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });
        totalcountrent();

    };
    const removefrombuycart = (productid, type) => {
        // console.log("productid :",productid)
        // console.log("type :",type)
        // console.log("productid :",productid)

        testCredentials.cartbuy.map((data, index) => {

            if ((data.productid == productid) && (type == 'medicine')) {
                cartbuy.splice(index, 1);
            }
            else if ((data.productid == productid) && (type == 'healthmart')) {
                cartbuy.splice(index, 1);
            }
            else {

            }
        });

        persistUser({ userid: userid, notify: testCredentials.natify, lan: true, raddress: testCredentials.raddress, cartbuy: cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });
        // console.log("cartbuy :",cartbuy)
        totalcountbuy();

    };


    const changeproductnumber = (productid, type, quantity) => {


        testCredentials.cartbuy.map((data, index) => {

            if ((data.productid == productid) && (data.type == 'medicine')) {

                cartbuy[index] = { productid: data.productid, image: data.image, tytle: data.tytle, regularPrice: data.regularPrice, discountPrice: data.discountPrice, quantity: quantity, totalprice: data.discountPrice * quantity, totalregularPrice: data.regularPrice * quantity, type: data.type, ptype: data.ptype, power: data.power };

            }
            else if ((data.productid == productid) && (data.type == 'healthmart')) {

                cartbuy[index] = { productid: data.productid, image: data.image, tytle: data.tytle, regularPrice: data.regularPrice, discountPrice: data.discountPrice, quantity: quantity, totalprice: data.discountPrice * quantity, totalregularPrice: data.regularPrice * quantity, type: data.type, ptype: data.ptype, power: data.power };

            }

        });
        0;

        persistUser({ userid: userid, notify: testCredentials.natify, lan: true, raddress: testCredentials.raddress, cartbuy: cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });

        totalcountbuy();
    };

    const changerentproductnumber = (productid, quantity) => {


        cartrent.map((data, index) => {

            if (data.productid == productid) {
                // cartrent.splice(index,1)

                cartrent[index] = { productid: data.productid, image: data.image, tytle: data.tytle, rentregularPrice: data.rentregularPrice, rentdiscountPrice: data.rentdiscountPrice, quantity: quantity, totalprice: data.rentdiscountPrice * quantity };

                // cartrent.push({productid : data.productid ,image: data.image,tytle : data.tytle, rentregularPrice : data.rentregularPrice,rentdiscountPrice : data.rentdiscountPrice, quantity: quantity, totalprice: data.rentdiscountPrice * quantity})

            }
        });


        persistUser({ userid: userid, notify: testCredentials.natify, lan: true, raddress: testCredentials.raddress, cartbuy: testCredentials.cartbuy, cartrent: cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });

        totalcountrent();
    };




    const totalcountbuy = () => {

        let x = 0;
        let q = 0;
        let z = 0;
        testCredentials.cartbuy.map((data, index) => {
            if (imgpres) {
                x = data.totalprice + x;

                q = data.quantity + q;

                z = data.totalregularPrice + z;
            }
            else {
                // if(data.otc == false && image == null)
                // {
                //     x = x
                //     q = q
                //     z = z
                // }
                // else{
                x = data.totalprice + x;

                q = data.quantity + q;

                z = data.totalregularPrice + z;
                // }
            }


        });

        if (promofill) {
            if (persentDis) {
                // promoDis
                setBuytotalcount(x);
                // setFinalPrice(finalPrice - totalamount)
                setTotalamount(x - (z - (z - (z * (parseInt(promoDis) / 100)))));

                setTotalamount1(x - (z - (z - (z * (parseInt(promoDis) / 100)))) - (deliverytype == 'Regular' ? 60 : 120));

                // setFinalPrice(finalPrice + totalamount)

                // setFinalPrice(x)
                setBuytotalQnt(q);

                setBuyregulartotalcount();
                setTotalregularPrice(z);
            }
            else {
                setBuytotalcount(x);
                // setFinalPrice(finalPrice - totalamount)
                setTotalamount(x);

                setTotalamount1(x - promovalue);

                // setFinalPrice(finalPrice + totalamount)

                // setFinalPrice(x)
                setBuytotalQnt(q);

                setBuyregulartotalcount();
                setTotalregularPrice(z);
            }

        }

        else {

            setBuytotalcount(x);
            // setFinalPrice(finalPrice - totalamount)
            setTotalamount(x);
            setTotalamount1(x);
            // setFinalPrice(finalPrice + totalamount)

            // setFinalPrice(x)
            setBuytotalQnt(q);

            setBuyregulartotalcount();
            setTotalregularPrice(z);

        }



    };

    const totalcountrent = () => {

        let y = 0;
        let q = 0;

        cartrent.map((data, index) => {

            y = data.totalprice + y;
            q = data.quantity + q;
        });

        setRenttotalcount(y);

        setRenttotalQnt(q);

    };



    useEffect(() => {

        UserInfo();
        totalcountbuy();
        Accountdetail();
        // console.log(data)
        // console.log(testCredentials.cartbuy)


        // console.log(translateX.x.value)
        setFinalPrice(totalamount1 + (deliverytype == 'Regular' ? 60 : 120));
        // setData([])
        // if(route.params.imgpres){
        //     setImgpres(route.params.imgpres)
        // }
        // console.log(testCredentials.cartbuy)
        // totalcountrent()

        if (falgimg1 == true && (imageupdate == null || imageupdate == "")) {

            (async () => {

                // console.log("hello")
                const image1 = await Asset.loadAsync(image);
                await image1.downloadAsync();
                // console.log("###############################",newimg)
                setImageupdate1(image1);

                setImageupdate(image);
                setImage(image);
                setNewimg(true);

                // setReady(true);

                // resizer();
            })();

            let filename = image ? image.split('/').pop() : null;
            let match = /\.(\w+)$/.exec(filename);

            let type = match ? `image/${match[1]}` : `image`;

            image ? formdata.append('image', { uri: image, name: filename, type }) : formdata.append('image', "");

            formdata.append('userid', userid);

            fetch('https://qwikit1.pythonanywhere.com/prescription/new', {
                method: 'POST',
                body: formdata,
                headers: {
                    'content-type': 'multipart/form-data', 'Authorization': authtoken
                },
            })
                .then((response) => response.json())
                .then((json) => {

                    setImage12(json.image);

                })
                .catch((error) => {
                    setLoading1(false);
                    setNointernet(false);
                });
            setFalgimg1(false);
        }

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

                        <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Cart </Text>

                    </View>



                </View>

                <ScrollView style={{ width: '100%', height: '100%', display: (proceedorder || (imgpres && (testCredentials.cartbuy === undefined || testCredentials.cartbuy.length == 0))) ? 'none' : 'flex' }}>


                    <View style={[styles.body1]}>



                        {isLoading ? <ActivityIndicator size="large" color="#2D6A8D" style={{ paddingTop: 100, display: 'none' }} /> : <View style={{ position: 'absolute' }}>
                            <View style={{ display: 'none' }}>
                                <View style={{ display: nodata ? 'flex' : 'none' }}>
                                    <Text style={{ display: lan ? 'none' : 'flex', fontSize: 17, fontWeight: 'bold', color: '#982525' }} > কোন ফ্ল্যাট পাওয়া যায়নি!</Text>
                                    <Text style={{ display: lan ? 'flex' : 'none', fontSize: 17, fontWeight: 'bold', color: '#982525' }}> No Flat found!</Text>
                                </View>
                            </View>
                        </View>}

                        {isLoading ? <ActivityIndicator size="large" color="#2D6A8D" style={{ paddingTop: 100 }} /> :


                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                                <ScrollView style={{ width: '100%', height: '100%', opacity: (proceedorder || (imgpres && (testCredentials.cartbuy === undefined || testCredentials.cartbuy.length == 0))) ? 0.5 : 1 }}>


                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: 0, }}>




                                        <View style={{ width: '100%', marginTop: 10, display: chosenOption == "buy" ? 'flex' : 'none' }}>
                                            {/* //Plants */}


                                            <View style={{ width: '100%', display: cartbuy === undefined || testCredentials.cartbuy.length == 0 ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center' }}>


                                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 20, flexDirection: 'row', marginBottom: 30, display: route.params.imgflag ? 'flex' : 'none' }}>
                                                    {/* <Text style={{fontSize:14,color:colors.black}}>{item.tytle}</Text> */}
                                                    <Text style={{ fontSize: 12, color: colors.black, width: '5%', marginLeft: 6 }}>* </Text>
                                                    <View style={{ width: '30%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 20 }}>

                                                        <Text style={{ fontSize: 14, color: colors.green }}>Prescribtion</Text>

                                                        {/* <Text style={{fontSize:12,color:colors.ash}}>Price:<Text style={{fontSize:12,color:colors.ash,fontWeight:'700'}}> {item.regularPrice} X {item.quantity} = {Math.round(item.regularPrice * item.quantity)} TK.</Text></Text> */}

                                                    </View>
                                                    <Pressable style={{ width: '25%' }}>
                                                        <Image resizeMode='cover' style={[styles.addsImg, { width: 150, height: 150 }]} source={{ uri: route.params.imgpres }}></Image>
                                                    </Pressable>

                                                </View>




                                                {cartbuy === undefined || cartbuy.length == 0 ? <></> : testCredentials.cartbuy.map((item, index) => (

                                                    <View key={index} style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>

                                                        {/* <ListItem item={item} onDelete={() => handleDeleteItem(item.id)}/> */}
                                                        <Swipeable
                                                            //   renderRightActions={(_, dragX) => renderRightActions onDelete={() => handleDeleteItem(item.id)} dragX={dragX} item={item} }
                                                            renderRightActions={(_, dragX) => <SwipeToDelete onDelete={() => handleDeleteItem(item.id)} dragX={dragX} item={item} removefrombuycart={() => removefrombuycart(item.productid, item.type)} />}
                                                            overshootRight={false}

                                                        >
                                                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                                                                {/* <PanGestureHandler onGestureEvent={onPanGestureEvent}> */}



                                                                <View key={item.productid} style={[styles.adds, { width: '92%', flexDirection: 'row' }]} >



                                                                    {/* <View style={[styles.adds,{flexDirection:'row',paddingHorizontal: 30,paddingVertical: 20,backgroundColor: 'white'}]} > */}
                                                                    {/* <View >
              <Image  resizeMode='cover' style={styles.addsImg} source={{uri:item.image}}></Image> 
          </View> */}
                                                                    <View style={{ width: '18%', justifyContent: 'center', alignItems: 'center' }}>
                                                                        <Image resizeMode='contain' style={{ width: '95%', height: '95%' }} source={{ uri: item.image != "" ? item.image : "https://static.vecteezy.com/system/resources/thumbnails/002/272/156/small_2x/medicine-drug-icon-flat-style-and-colorful-design-illustration-free-vector.jpg" }}></Image>
                                                                    </View>
                                                                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, width: '67%' }}>

                                                                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', top: item.type == "healthmart" ? 20 : 10, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                                                                            <Text style={{ color: colors.text, fontSize: 11, padding: 8, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>{item.tytle.length > 25 ? item.tytle.split("", 25) : item.tytle} {item.tytle.length > 25 ? "..." : ""}</Text>
                                                                            {/* <Text  style={{ color: image  || imgpres ? "#067A1F" : "#FF6666",padding:8, display: item.otc == true  ? 'none' : 'flex',fontSize:10,textDecorationLine:'underline'}} onPress={()=> pickImage()}>{image || imgpres ? "uploaded" : "upload prescription"}</Text> */}

                                                                        </View>
                                                                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', height: 38 }}>

                                                                            <Text style={{ color: colors.ash, fontSize: 10, padding: 8, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: item.type == "healthmart" ? 'none' : 'flex' }}>{item.ptype}</Text>
                                                                            <Text style={{ color: colors.ash, fontSize: 10, padding: 8, paddingLeft: 0, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: item.type == "healthmart" ? 'none' : 'flex' }}>{item.power}</Text>
                                                                            {/* <Text style={{color:colors.ash,fontSize:10,padding:8,paddingLeft:0,letterSpacing:.9,fontFamily: 'Poppins_500Medium',display: item.type == "healthmart" ? 'none' : 'flex'}}>({parseInt(item.quantity)} pis)</Text> */}


                                                                        </View>
                                                                        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>

                                                                            <Text style={{ fontWeight: '400', fontSize: 12, color: colors.ash, padding: 8, left: 2, paddingTop: 2, textDecorationLine: 'line-through' }}>{(parseFloat(item.regularPrice) * parseInt(item.quantity)).toFixed(2)}</Text>
                                                                            <Text style={{ fontSize: 12, color: "#EE416C", padding: 8, left: 2, paddingTop: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>Tk. {(parseFloat(item.discountPrice) * parseInt(item.quantity)).toFixed(2)}</Text>

                                                                        </View>
                                                                    </View>
                                                                    <View style={{ width: '25%' }}>
                                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>


                                                                            <View style={{ bottom: 0, right: 70, top: 60 }}>
                                                                                {/* <NumericInput 

                              onChange={value => {changeproductnumber(item.productid,item.type,value),setBuyproductcount(value) }}
                              onLimitReached={(isMax,msg) => {console.log(isMax,msg),setMinorder(true),fadeIn4()}}
                              totalWidth={100} 
                              totalHeight={30} 
                              iconSize={5}
                              initValue ={parseInt(item.quantity)}
                              minValue={parseInt(item.minqnt)}
                              maxValue={50}
                              step={1}
                              valueType='real'                             
                              textColor={colors.dblue} 
                              borderColor={'#fff'}                                  
                              editable={false}                                   
                              separatorWidth={0}                                   
                              rounded = {false}      
                              inputStyle={{color:colors.text}}
                              // inputStyle={{color:colors.text,bottom:40,left:50}}
                              // containerStyle={{backgroundColor:colors.text,width:100,height:100}} 
                              // type='up-down'                         
                              iconStyle={{ color: colors.white ,fontSize:20}} 
                              // rightButtonBackgroundColor= {buyproductcount == 50 ? '#FCFCFC' : "#E5E8E8"}
                              // leftButtonBackgroundColor= {buyproductcount == 1 ? '#FCFCFC' : '#E5E8E8'}
                              // />'#606060' : "#FF9999"
                              rightButtonBackgroundColor= {parseInt(item.quantity) == 500 ? '#606060' : colors.green }
                              leftButtonBackgroundColor= {parseInt(item.quantity) == parseInt(item.minqnt) ? '#606060' : "#FF9999" }/>
                           */}


                                                                                <InputSpinner
                                                                                    max={100}
                                                                                    // min={parseInt(item.minqnt)}
                                                                                    min={1}
                                                                                    step={1}

                                                                                    // colorMax="#606060"
                                                                                    // colorMin="#FF9999"
                                                                                    value={parseInt(item.quantity)}
                                                                                    onChange={value => { changeproductnumber(item.productid, item.type, value), setBuyproductcount(value); }}

                                                                                    buttonStyle={{ backgroundColor: '#FFFFFF', width: 55, height: 55 }}
                                                                                    buttonTextColor={"#EE416C"}
                                                                                    // colorLeft={{color:"red"}}
                                                                                    // colorRight={{color:"red"}}
                                                                                    // colorMin={{color:"red"}}
                                                                                    // colorMax={{color:"red"}}
                                                                                    buttonPressStyle={{ backgroundColor: "#FFFFFF" }}
                                                                                    buttonPressTextColor={"#1C1A1A"}
                                                                                    textColor={"#332727"}
                                                                                    style={{ backgroundColor: "#FFFFFF" }}
                                                                                // buttonFontSize={20} 
                                                                                />

                                                                            </View>




                                                                        </View>
                                                                    </View>






                                                                    {/* </View> */}
                                                                </View>

                                                                {/* </PanGestureHandler> */}
                                                            </View>
                                                        </Swipeable>

                                                    </View>


                                                ))}


                                                <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white, borderRadius: 4, marginTop: 40 }}>

                                                    <View style={{ marginTop: 0, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, borderBottomColor: colors.ash1, borderBottomWidth: 0 }}>
                                                        <Text style={{ color: colors.ash, fontSize: 11, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>DELIVERY TYPE:</Text>
                                                    </View>

                                                    <View style={{ marginTop: 0, width: '100%', justifyContent: 'center', left: 10, borderBottomColor: colors.ash1, borderBottomWidth: 0, marginBottom: 10 }}>

                                                        <RadioForm
                                                            radio_props={options}
                                                            formHorizontal={true}
                                                            labelHorizontal={true}
                                                            buttonColor={'#747474'}
                                                            selectedButtonColor={"#EE416C"}
                                                            labelStyle={{ fontSize: 12, color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}
                                                            buttonSize={6}
                                                            buttonOuterSize={18}
                                                            animation={false}
                                                            buttonStyle={{ color: "#303030", paddingLeft: 10 }}
                                                            onPress={(value) => setDeliverytype(value)}
                                                            style={{ right: 30, marginTop: 20, justifyContent: 'space-evenly', marginBottom: 10 }}
                                                        />

                                                    </View>

                                                </View>


                                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', borderColor: colors.ash1, marginTop: 10, borderRadius: 4, display: promofill ? 'none' : 'flex' }}>


                                                    <View style={[styles.inputdiv, { marginTop: 20, marginLeft: 10, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' }]} >
                                                        <View style={{ width: '65%', borderWidth: 0, left: 10 }}>
                                                            {/* <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',top:20}}>
                                                
                                                    <Text style={{color: voutureflag ? colors.ash : colors.red,fontSize:12,fontWeight:'700',paddingBottom:3,display : lan ? 'none' : 'flex'}}>সাইজ   (বর্গফুট)</Text>
                                                    <Text style={{color: voutureflag ? colors.ash : colors.red,fontSize:12,fontWeight:'700',paddingBottom:3,display : lan ? 'flex' : 'none'}}>Promo Code <Text style={{color:colors.red}}>*</Text></Text>
                                                </View> */}
                                                            <TextInput
                                                                style={[styles.input, { fontSize: 11, width: '100%', paddingLeft: 10, borderColor: voutureflag ? "#C7C8D2" : colors.red, marginTop: 5, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }]}
                                                                onChangeText={newTest => setVouture(newTest)}
                                                                defaultValue={vouture}
                                                                maxLength={25}
                                                                placeholder="COUPON CODE (IF ANY)"
                                                                placeholderTextColor={colors.ash2}
                                                                autoCapitalize={"characters"}

                                                            />
                                                            <View style={{ marginTop: 5, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 0, display: voutureflag ? 'none' : 'flex' }}>

                                                                <Text style={{ color: colors.red, letterSpacing: .9, fontFamily: 'Poppins_400Regular', fontSize: 11, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Invalid Promo Code<Text style={{ color: colors.red }}></Text></Text>

                                                            </View>
                                                        </View>

                                                        <Pressable disabled={(vouture == "" || vouture == null) ? true : false} style={{ right: 22, marginTop: 10, borderRadius: 4, width: '25%', height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: (vouture == "" || vouture == null) ? '#C7C2B8' : "#EE416C", top: 10 }} onPress={() => Checkpromo()}>
                                                            <Text style={{ color: colors.white, fontSize: 12, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>Apply</Text>
                                                        </Pressable>

                                                    </View>


                                                </View>



                                                <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white, borderRadius: 4, marginTop: promofill ? 80 : 0 }}>

                                                    <Text style={{ color: "#000000", fontSize: 13, padding: 6, left: 18, letterSpacing: .9, fontFamily: 'Poppins_500Medium', textAlign: "left", width: "100%", marginTop: 6 }}>Order Info</Text>

                                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 4 }}>

                                                        <View style={{ width: '50%', justifyContent: 'flex-start', alignItems: 'flex-start', borderBottomColor: colors.ash1, borderBottomWidth: 1 }}>
                                                            <Text style={{ color: colors.ash, fontSize: 11, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>SUBTOTAL:</Text>
                                                            <Text style={{ color: colors.ash, fontSize: 11, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>DISCOUNT:</Text>
                                                            <Text style={{ color: colors.ash, fontSize: 11, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>VAT:</Text>
                                                            {/* <Text style={{color:colors.ash,fontSize:12,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>Q-REWARDS:</Text> */}
                                                            <Text style={{ color: colors.ash, fontSize: 11, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>PROMO DISCOUNT:</Text>
                                                            <Text style={{ color: colors.ash, fontSize: 11, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular', marginBottom: 5 }}>DELIVERY FEE:</Text>
                                                            {/* <Text style={{color:colors.text,fontSize:12,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>ORDER TOTAL:</Text> */}

                                                        </View>
                                                        <View style={{ width: '40%', justifyContent: 'flex-end', alignItems: 'flex-end', borderBottomColor: colors.ash1, borderBottomWidth: 1 }}>
                                                            {/* <Text style={{color:colors.text,fontSize:11,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_500Medium'}}>{Math.round(totalregularPrice)}.00</Text>
                <Text style={{color:colors.red,fontSize:11,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_500Medium'}}>-{Math.round(totalregularPrice) - Math.round(totalamount)}.00</Text>
                 */}
                                                            <Text style={{ color: colors.text, fontSize: 11, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>{totalregularPrice.toFixed(2)}</Text>
                                                            <Text style={{ color: colors.red, fontSize: 11, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>-{(totalregularPrice - totalamount).toFixed(2)}</Text>


                                                            <Text style={{ color: colors.text, fontSize: 11, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>0.00</Text>
                                                            {/* <Text style={{color:colors.red,fontSize:12,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_500Medium'}}>-{qmoney ? qmoney : "0.00"}</Text> */}
                                                            <Text style={{ color: colors.red, fontSize: 11, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>-{freedeliverystatus == false ? promovalue : 0}.00</Text>
                                                            <Text style={{ color: colors.text, fontSize: 11, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium', marginBottom: 5 }}> {deliverytype == 'Regular' && freedeliverystatus == false ? "60.00" : deliverytype == 'Express' && freedeliverystatus == false ? "120.00" : "0.00"}</Text>
                                                            {/* <Text style={{color:colors.oranget,fontSize:12.5,padding:6,left:2,letterSpacing:.9,fontFamily: 'Poppins_500Medium'}}>{product.totalamount}.00</Text> */}

                                                        </View>
                                                    </View>
                                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                                                        <View style={{ width: '50%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 18 }}>

                                                            <Text style={{ color: colors.ash, fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_400Regular' }}>TOTAL:</Text>

                                                        </View>
                                                        <View style={{ width: '50%', justifyContent: 'flex-end', alignItems: 'flex-end', right: 20 }}>

                                                            <Text style={{ color: "#EE416C", fontSize: 12, padding: 6, left: 2, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>Tk. {Math.round(finalPrice)}.00</Text>

                                                        </View>
                                                    </View>



                                                </View>

                                                <Pressable style={{ marginTop: 20, borderRadius: 4, width: '90%', height: 45, justifyContent: 'center', alignItems: 'center', backgroundColor: "#EE416C" }} onPress={() => { userid == 0 ? navigation.navigate("Login", {}) : Checkout(); }}>
                                                    {/* <Pressable style={{marginTop:20,borderRadius:4,width:'90%',height:45,justifyContent:'center',alignItems:'center',backgroundColor:colors.oranget}}  onPress={()=>{ navigation.navigate("Homepage",{}) }}>  */}

                                                    <Text style={{ color: colors.white, fontSize: 12, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>PROCEED TO CHECKOUT</Text>

                                                </Pressable>

                                            </View>
                                        </View>


                                        {/* for empty Crat list */}
                                        <View style={{ width: '100%', display: chosenOption == "buy" ? 'flex' : 'none' }}>
                                            <View style={{ width: '100%', marginTop: 70, justifyContent: 'center', alignItems: 'center', display: (testCredentials.cartbuy === undefined || testCredentials.cartbuy.length == 0) && nointernet == false ? 'flex' : 'none' }}>
                                                {/* <EmptyCart/> */}
                                                <Image
                                                    style={{ width: 135, height: 120 }}
                                                    resizeMode='contain'
                                                    source={require('../assets/emptcartnew.jpg')}
                                                // source={{uri: "http://drive.google.com/uc?export=view&id=1R99J_v7DGG5Ne-xvaArWe9UD4dTK8-Yh"}}
                                                />
                                                <Text style={{ fontSize: 14, letterSpacing: .9, fontFamily: 'Poppins_500Medium', color: colors.black, marginTop: 10 }}>Your cart is empty</Text>
                                                {/* <Text style={{fontSize:12,fontWeight:'400',color:colors.ash,marginTop:10}}>Let’s check our trendy <Text style={{fontSize:12,fontWeight:'400',textDecorationLine:'underline',color:colors.ash}} onPress={() => navigation.navigate("PagkageDecoration",{})}>new items</Text> </Text> */}
                                            </View>
                                        </View>




                                    </View>

                                </ScrollView>

                            </View>

                        }

                    </View>


                </ScrollView>
                {/* <ScrollView style={{width:'100%' ,height:'100%',marginTop:50,display: (proceedorder || (imgpres && (testCredentials.cartbuy === undefined  || testCredentials.cartbuy.length == 0))) ? 'flex' : 'none',flex:0,top:5,marginBottom:5}}> */}
                <ScrollView style={{ width: '100%', height: '100%', marginTop: 50, display: (proceedorder || (imgpres && (testCredentials.cartbuy === undefined || testCredentials.cartbuy.length == 0))) ? 'flex' : 'none', flex: 0, top: 5, marginBottom: 5 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={[styles.sendform, { width: '88%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: colors.white, top: 0, borderRadius: 6, borderWidth: 1, borderColor: colors.ash1, opacity: showaddress ? 0.3 : 1 }]}>

                            <View style={[styles.inputdiv, { marginTop: 30, width: '95%' }]} >
                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 0 }}>

                                    <Text style={{ color: Nameflag ? colors.ash : colors.red, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'none' : 'flex' }}>নাম</Text>
                                    <Text style={{ color: Nameflag ? colors.ash : colors.red, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Name <Text style={{ color: colors.red }}>*</Text></Text>
                                </View>
                                <TextInput
                                    style={[styles.input, { borderColor: Nameflag ? '#C7C8D2' : colors.red }]}
                                    onChangeText={newTest => setName(newTest)}
                                    defaultValue={Name}
                                    placeholder="Mr. Your Name"
                                    placeholderTextColor={colors.ash}
                                // textAlign={'center'}
                                />
                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 0, display: Nameflag ? 'none' : 'flex' }}>

                                    <Text style={{ color: colors.red, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Name can't be empty<Text style={{ color: colors.red }}></Text></Text>

                                </View>
                            </View>



                            <View style={{ width: '100%', height: 10 }} />
                            <View style={[styles.inputdiv, { marginTop: 10, width: '95%' }]} >
                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={{ color: phonenumberflag ? colors.ash : colors.red, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'none' : 'flex' }}>পোস্ট কোড</Text>
                                    <Text style={{ color: phonenumberflag ? colors.ash : colors.red, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Phone Number <Text style={{ color: colors.red }}>*</Text></Text>
                                </View>
                                <TextInput
                                    style={[styles.input, { borderColor: '#C7C8D2' }]}
                                    onChangeText={newTest => { setPhonenumber(newTest); }}
                                    defaultValue={phonenumber}
                                    placeholder="01600000000"
                                    placeholderTextColor={colors.ash}
                                    // textAlign={'center'}
                                    editable={false}

                                />

                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 0, display: phonenumberflag ? 'none' : 'flex' }}>

                                    <Text style={{ color: colors.red, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Invalid phone number<Text style={{ color: colors.red }}></Text></Text>

                                </View>
                            </View>

                            <View style={{ width: '100%', height: 10 }} />
                            <View style={[styles.inputdiv, { marginTop: 10, width: '95%' }]}>
                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>
                                    <Text style={{ color: locationflag ? colors.ash : colors.red, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'none' : 'flex' }}>সড়কের নাম</Text>
                                    <Text style={{ color: locationflag ? colors.ash : colors.red, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Address <Text style={{ color: colors.red }}>*</Text></Text>
                                    <Text style={{ color: '#065540', fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'flex' : 'none', left: 160 }} onPress={() => { (address1 == null || address1 == "") ? (setNoaddress(true), fadeIn5()) : setShowaddress(true); }}>Recently Used</Text>
                                </View>
                                <TextInput
                                    style={[styles.input, { borderColor: locationflag ? '#C7C8D2' : colors.red }]}
                                    onChangeText={newTest => { setLocation(newTest), setRecentuse(newTest); }}
                                    defaultValue={location}
                                    placeholder="129/4, Block-A, Road-5, Nurani mosjid road,Vatara......."
                                    placeholderTextColor={colors.ash}
                                // textAlign={'center'}

                                />
                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 0, display: locationflag ? 'none' : 'flex' }}>

                                    <Text style={{ color: colors.red, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Address can not be empty<Text style={{ color: colors.red }}></Text></Text>

                                </View>
                            </View>

                            <View style={{ width: '100%', height: 10 }} />
                            <View style={[styles.inputdiv, { marginTop: 10, width: '95%' }]}>
                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={{ color: colors.ash, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'none' : 'flex' }}>সড়কের নাম</Text>
                                    <Text style={{ color: colors.ash, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Additional Details</Text>
                                </View>
                                <TextInput
                                    style={[styles.input, { borderColor: '#C7C8D2' }]}
                                    onChangeText={newTest => setNotes(newTest)}
                                    defaultValue={notes}
                                    placeholder="Type additional details......."
                                    placeholderTextColor={colors.ash}
                                // textAlign={'center'}

                                />

                            </View>

                            <Pressable disabled={confirm} style={[styles.tuchabluebutton, { width: '90%', borderRadius: 4, top: 20, marginBottom: 50, backgroundColor: isLoading1 || confirm ? colors.ash : '#065540', flexDirection: 'row' }]} onPress={() => { chosenOption == "buy" ? AddOrder() : AddRentOrder(); }}>
                                <ActivityIndicator size="small" color="#00263C" style={{ display: isLoading1 ? 'flex' : 'none', right: 30 }} />

                                <Text style={{ color: colors.white, fontSize: 14, display: lan ? 'none' : 'flex' }}>জমা দিন</Text>
                                <Text style={{ color: colors.white, fontSize: 14, display: lan ? 'flex' : 'none' }}>Continue</Text>
                            </Pressable>

                        </View>






                        <View style={[styles.sendform, { position: 'absolute', width: '88%', top: 200, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ECFFFA', borderRadius: 6, borderWidth: 1, borderColor: colors.ash1, display: showaddress ? 'flex' : 'none' }]}>

                            {/* <Icon name='coffin-cross' style={{position:'absolute',fontSize:14,color:'#007B9A',top:2,right:0}} onPress={()=> navigation.navigate("Medicine",{})}/>                     */}
                            <Pressable style={{ left: 172, height: 10 }} onPress={() => setShowaddress(false)}>
                                <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/cross.jpg")} />
                            </Pressable>


                            <View style={[styles.inputdiv, { marginTop: 10, width: '95%' }]}>
                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={{ color: colors.ash, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'none' : 'flex' }}>পোস্ট কোড</Text>
                                    <Text style={{ color: colors.ash, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Address1</Text>
                                </View>
                                <Pressable style={[styles.input, { borderWidth: 1, backgroundColor: colors.white }]} onPress={() => (setLocation(address1), setShowaddress(false))}>
                                    <Text style={{ color: colors.black, fontSize: 12, top: 15 }}>{address1}</Text>
                                </Pressable>

                            </View>

                            <View style={[styles.inputdiv, { marginTop: 10, width: '95%', display: (address2 == null || address2 == "") ? 'none' : 'flex' }]} >
                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={{ color: colors.ash, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'none' : 'flex' }}>পোস্ট কোড</Text>
                                    <Text style={{ color: colors.ash, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Address2</Text>
                                </View>
                                <Pressable style={[styles.input, { borderWidth: 1, backgroundColor: colors.white }]} onPress={() => (setLocation(address2), setShowaddress(false))}>
                                    <Text style={{ color: colors.black, fontSize: 12, top: 15 }}>{address2}</Text>
                                </Pressable>

                            </View>

                            <View style={[styles.inputdiv, { marginTop: 10, width: '95%', display: (address3 == null || address3 == "") ? 'none' : 'flex' }]} >
                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={{ color: colors.ash, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'none' : 'flex' }}>পোস্ট কোড</Text>
                                    <Text style={{ color: colors.ash, fontSize: 12, fontWeight: '700', paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Address3</Text>
                                </View>
                                <Pressable style={[styles.input, { borderWidth: 1, backgroundColor: colors.white }]} onPress={() => (setLocation(address3), setShowaddress(false))}>
                                    <Text style={{ color: colors.black, fontSize: 12, top: 15 }}>{address3}</Text>
                                </Pressable>

                            </View>



                        </View>

                    </View>


                </ScrollView>




                <View style={{ marginBottom: 5, width: '95%', height: 38, borderColor: '#067A1F', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: successorder ? "flex" : 'none' }}>
                    {/* <Gtick style={{marginLeft:10}}/> */}
                    <Text style={{ marginLeft: 10, fontSize: 14, fontWeight: '700', color: "#067A1F" }}>You’ve order is plased SccessFully.</Text>
                </View>

                <View style={{ marginBottom: 5, width: '95%', height: 38, borderColor: '#D50400', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: notok ? "flex" : 'none' }}>
                    {/* <Gtick style={{marginLeft:10}}/> */}
                    <Text style={{ marginLeft: 10, fontSize: 14, fontWeight: '700', color: "#D50400" }}>You need to order atleast 10 products for rent.</Text>
                </View>

                <View style={{ marginBottom: 5, width: '95%', height: 38, borderColor: '#067A1F', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: minorder ? "flex" : 'none' }}>
                    {/* <Gtick style={{marginLeft:10}}/> */}
                    <Text style={{ marginLeft: 10, fontSize: 14, fontWeight: '700', color: "#067A1F" }}>Minimum number of quantity reached.</Text>
                </View>
                <View style={{ bottom: 10, marginBottom: 5, width: '95%', height: 38, borderColor: '#D50400', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: noaddress ? "flex" : 'none' }}>
                    {/* <Gtick style={{marginLeft:10}}/> */}
                    <Text style={{ marginLeft: 10, fontSize: 14, fontWeight: '700', color: "#D50400" }}>You do not have any recently used address.</Text>
                </View>

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: (imgpres && (testCredentials.cartbuy === undefined || testCredentials.cartbuy.length == 0)) ? 'none' : 'flex' }}>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: proceedorder ? 'none' : 'flex' }}>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10, display: chosenOption == "buy" && testCredentials.cartbuy.length != 0 ? 'flex' : 'none' }}>
                            {/* <View style={{borderRadius:4,width:'90%',height:30,alignItems:'center',backgroundColor:colors.white,flexDirection:'row',justifyContent:'space-between',borderColor:'#065540',borderWidth:1.5,display: imgpres ? 'none' : 'flex'}}>
                        <Text style={{color:colors.black,fontSize:14,fontWeight:'400',left:10}}>Total Amount</Text>
                        <Text style={{color:colors.black,fontSize:14,fontWeight:'400',right:20}}>TK {buytotalcount.toFixed(2)}</Text>
                    </View> */}
                            {/* <Pressable style={{marginTop:10,borderRadius:4,width:'90%',height:45,justifyContent:'center',alignItems:'center',backgroundColor:colors.oranget}}  onPress={()=>{ userid == 0 ? navigation.navigate("Login",{}) : Checkout() }}> 
                        <Text style={{color:colors.white,fontSize:14,letterSpacing:.9,fontFamily: 'Poppins_500Medium'}}>PROCEED TO CHECKOUT</Text>
                    
                    </Pressable> */}
                        </View>

                    </View>
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
                    <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.dblue, borderBottomWidth: 0 }]}

                        onPress={() => {
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
    square: {
        width: 150,
        height: 150,
        backgroundColor: '#28b5b5',
        marginTop: 22,
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
        width: '92%',
        height: 120,

        borderColor: colors.ash1,
        borderBottomWidth: 1,
        borderRadius: 4,
        backgroundColor: colors.white,

    },
    addsImg: {
        width: 90,
        top: 3,
        // borderTopEndRadius:4,
        borderTopLeftRadius: 4,
        borderWidth: 1,
        left: 10,
        height: 90,
    },
    addstext: {
        width: 149,
        height: 83,
    },
    flatdetails: {
        paddingLeft: 0,
        width: '100%',
        marginTop: 10
    }
});

export default Cart;




// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {

//     // Conversations collection rules
//     match /conversations/{conversationId} {
//     	allow read: if true;
// 			allow create: if true;
// 			allow update, delete: if true;

//       // Allow only admins to delete conversations
//       allow delete: if get(/databases/$(database)/documents/roles/$(request.auth.uid)).data.role == "admin";
//     }

//     // Roles collection rules for managing user roles
//     match /roles/{userId} {
//       // Allow users to read their own role document (for checking admin status)
//       allow read: if request.auth != null && request.auth.uid == userId;

//       // Only allow admins to write/update roles (e.g., assign admin role)
//       allow write: if request.auth != null && request.auth.uid == userId;
//     }

//     // Users collection rules for managing user data
//     match /users/{userId} {
//       // Allow authenticated users to create their own user document
//       allow create: if request.auth != null && request.auth.uid == userId;

//       // Allow users to read their own user document
//       allow read: if request.auth != null && request.auth.uid == userId;

//       // Allow admins to read any user document
//       allow read: if request.auth != null && get(/databases/$(database)/documents/roles/$(request.auth.uid)).data.role == "admin";

//       // Allow only the authenticated user or an admin to update user data
//       allow update: if request.auth != null && (request.auth.uid == userId || get(/databases/$(database)/documents/roles/$(request.auth.uid)).data.role == "admin");

//       // Allow only admins to delete user data
//       allow delete: if request.auth != null && get(/databases/$(database)/documents/roles/$(request.auth.uid)).data.role == "admin";
//     }
//   }
// }

// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if true; // Anyone can upload/download files
//     }
//   }
// }
