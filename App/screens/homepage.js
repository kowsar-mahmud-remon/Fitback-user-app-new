import React, { useEffect, useRef, useState, useContext, useCallback } from 'react';
import { FlatList, ScrollView, ActivityIndicator, Animated, Dimensions, StyleSheet, Text, View, ImageBackground, SafeAreaView, Platform, StatusBar, Image, Button, TextInput, Pressable, Alert, Modal, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as Notifications from 'expo-notifications';
import { differenceInDays } from 'date-fns';


import InputSpinner from "react-native-input-spinner";
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";

import { WellcomeContext } from '../../components/CredintailsContext';
import { UserContext } from '../../components/CredintailsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../config/colors';

import { storeData, getData } from "../AsyncStorage/asyncStorage";
import testJson from "../assets/fitback/set3.json";  // Import your JSON file

const upIcon = require('../assets/1_med.jpg'); // Replace with your actual path
const downIcon = require('../assets/1_med.jpg'); // Replace with your actual path

//credential context
import { CredentialsContext } from '../../components/CredintailsContext';


import { WebView } from 'react-native-webview';
const { width, height } = Dimensions.get('window');



function Homepage({ navigation, route }) {
    ///// for Test//////////
    const [isInitialized, setIsInitialized] = useState();
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const initializeData = async () => {
            const initialized = await getData("initialized");
            setIsInitialized(initialized);

            if (!initialized) {
                await storeData("testData", testJson);
                await storeData("initialized", true);
            }

        };

        initializeData();
    }, []);

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

    ///////end/////////

    const [unread, setUnread] = useState(false);
    const { authtoken, setAuthtoken } = useContext(UserContext);
    const [getnotify, setGetnotify] = useState(true);
    const [userData, setUserData] = useState();

    const inputRef = useRef(null);
    //context
    const { storeWellcome, setStoreWellcome } = useContext(WellcomeContext);
    const { testCredentials, setTestCredentials } = useContext(UserContext);
    const { storeCredentials, setStoreCredentials } = useContext(CredentialsContext);

    const { noficationid, setNoficationid } = useContext(UserContext);

    const [userid, setUserid] = useState(testCredentials.userid);
    const [getpromo, setGetpromo] = useState(true);

    const [getpromoimg, setGetpromoimg] = useState(testCredentials.raddress);
    // const [getpromoimg, setGetpromoimg]= useState([])

    const [estore, setEstore] = useState(testCredentials.flatsave);
    // const [estore, setEstore] = useState([]);

    const [isLoading1, setLoading1] = useState(true);

    const [details, setDetails] = useState([]);
    const [showdetails, setShowdetails] = useState(false);
    const [checkSave, setCheckSave] = useState(true);

    const [forremainder, setForremainder] = useState(false);

    const [search, setSearch] = useState("");
    const [searchFlag, setSearchFlag] = useState(false);

    const [getallf, setGetallf] = useState([]);

    const [arrayloading, setArrayloading] = useState(true);

    const [filter, setFilter] = useState(null);

    const [notify, setNotify] = useState(testCredentials.notify);
    const [raddress, setRaddress] = useState(testCredentials.raddress);
    const [cartbuy, setCartbuy] = useState(testCredentials.cartbuy);
    const [cartrent, setCartrent] = useState(testCredentials.cartrent);
    const [productsave, setProductsave] = useState(testCredentials.productsave);
    const [flatsave, setflatsave] = useState(testCredentials.flatsave);

    const [getProduct, setGetProduct] = useState(true);

    const [getProductdata, setGetProductdata] = useState(testCredentials.cartrent);
    // const [getProductdata,setGetProductdata] =useState([]);

    // const [getProductdata1,setGetProductdata1] =useState([]);

    const { getProductdata1, setGetProductdata1 } = useContext(UserContext);

    const { getdiscount, setGetdiscount } = useContext(UserContext);
    const { getdiscountproduct, setGetdiscountproduct } = useContext(UserContext);

    const [getdoctor, setGetdoctor] = useState([]);

    const [getDoctorinfo, setGetDoctorinfo] = useState(true);

    const [isLoading123, setLoading123] = useState(true);

    // const [getdiscount, setGetdiscount]= useState(null)

    const [savelist, setSavelist] = useState([]);


    // for medicine

    const [productNumber, setProductNumber] = useState(1);

    const [minproduct, setMinproduct] = useState(0);
    const [discountprice, setDiscountprice] = useState(0.00);
    const [discountpricecon, setDiscountpricecon] = useState(0.00);
    const [discountpricecon1, setDiscountpricecon1] = useState(0.00);

    const [regularPrice, setRegularPrice] = useState(0.00);
    const [regularPricecon, setRegularPricecon] = useState(0.00);
    const [regularPricecon1, setRegularPricecon1] = useState(0.00);

    const [nointernet, setNointernet] = useState(false);
    const [getProductdatapush, setGetProductdatapush] = useState([]);

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

    const [height, setHeight] = useState([]);
    const [weight, setWeight] = useState([]);
    const [gender, setGender] = useState(" ");

    const { getall, setGetall } = useContext(UserContext);




    const ProductInfo = async () => {
        try {
            if (getProduct) {
                // console.log("*******************************")
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                fetch('https://qwikit1.pythonanywhere.com/product/', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        // setGetProductdata(json.reverse())

                        // console.log("#################################################")
                        setGetProductdata1(json);
                        setEstore(json);
                        // console.log(json)
                        // setNointernet(false)


                    })
                    .catch((error) => {
                        console.error(error);
                        // setNointernet(true)
                        setLoading1(false);
                    });

                const requestOptions1 = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://qwikmedic.pythonanywhere.com/companyContacts/' + 1, requestOptions1)
                    .then((response) => response.json())
                    .then((json) => {
                        // setGetProductdata(json.reverse())

                        setGetdiscount(json.medicinediscount);
                        // setNointernet(false)


                    })
                    .catch((error) => {
                        console.error(error);
                        // setNointernet(true)
                        setLoading1(false);
                    });


            }

            // console.log("hit");
        }
        catch (error) {
            console.error(error);
            setLoading1(false);
        } finally {

            setLoading123(false);

        }

        setGetProduct(false);


    };

    const [minorder, setMinorder] = useState(false);

    let screenWidth = Dimensions.get('window').width;
    let screenHight = Dimensions.get('window').height;

    let cardWidth = Dimensions.get('window').width / 3 - 10;
    let newCardWidth = Dimensions.get('window').width;
    let ExerciseVideoCardWidth = Dimensions.get('window').width / 1.8;
    let cartwidth = (Dimensions.get('window').width / 3) - 7;

    const [notallow, setNotallow] = useState(userid == 0 ? true : false);


    const [cartmsg, setCartmsg] = useState(false);
    const [savemsg, setSavemsg] = useState(false);
    const [rsavemsg, setRsavemsg] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn1 = () => {


        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start(() => { setSavemsg(false); });
    };

    const testr = () => {
        setRsavemsg(false);
    };

    const fadeIn2 = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start(() => { setRsavemsg(false); });

    };

    const fadeIn3 = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start(() => { setCartmsg(false); });
    };

    const fadeIn7 = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start(() => { setMinorder(false); });

    };


    const checkSaveproduct = (data) => {

        if (savelist === undefined) {

        }
        else {
            savelist.map((item, index) => {

                if ((item.productid == data.id) && (item.type == "medicine")) {
                    setCheckSave(false);
                }

            });
        }


    };



    const setDetailsdata = (item) => {

        UserInfo();

        setDetails(item);
        // setDiscountprice(item.mrp)
        // setRegularPrice(item.mrp)

        setMinproduct(item.quantity);

        // setDiscountprice(((parseFloat(item.regularunitprice.replace(",", "")) - (parseFloat(item.regularunitprice.replace(",", "")) * (parseInt(getdiscount) / 100))) * parseInt(item.quantity)).toFixed(2))
        // setDiscountpricecon((parseFloat(item.regularunitprice.replace(",", "")) - (parseFloat(item.regularunitprice.replace(",", "")) * (parseInt(getdiscount) / 100)) * parseInt(item.quantity)).toFixed(2))

        setDiscountprice(((parseFloat(item.regularunitprice.replace(",", "")) - (parseFloat(item.regularunitprice.replace(",", "")) * (parseInt(getdiscount) / 100)))).toFixed(2));
        setDiscountpricecon((parseFloat(item.regularunitprice.replace(",", "")) - (parseFloat(item.regularunitprice.replace(",", "")) * (parseInt(getdiscount) / 100))).toFixed(2));

        setDiscountpricecon1((parseFloat(item.regularunitprice.replace(",", "")) - (parseFloat(item.regularunitprice.replace(",", "")) * (parseInt(getdiscount) / 100))).toFixed(2));

        // setRegularPrice((parseFloat(item.regularunitprice.replace(",", "")) * parseInt(item.quantity)).toFixed(2))
        // setRegularPricecon((parseFloat(item.regularunitprice.replace(",", ""))  * parseInt(item.quantity)).toFixed(2))

        setRegularPrice((parseFloat(item.regularunitprice.replace(",", ""))).toFixed(2));
        setRegularPricecon((parseFloat(item.regularunitprice.replace(",", ""))).toFixed(2));

        setRegularPricecon1(parseFloat(item.regularunitprice.replace(",", "")));

        checkSaveproduct(item);

        setShowdetails(true);
    };

    const persistWellcome = (credentials) => {

        AsyncStorage.setItem('qwikmedicwellcome3page', JSON.stringify(credentials))
            .then(() => {
                // handleMessage(message)
                setStoreWellcome(credentials);
                navigation.navigate("Homepage");
            })
            .catch((error) => {
                // console.log(error)
                handleMessage('persisting login failed');
            });
    };

    const persistUser = (credentials) => {

        AsyncStorage.setItem('checkuserid', JSON.stringify(credentials))
            .then(() => {
                // handleMessage(message)
                setTestCredentials(credentials);
                // persistWellcome({wellcome: true})
            })
            .catch((error) => {
                // console.log(error)
                handleMessage('persisting login failed');
            });
    };

    const persistLogout = () => {

        AsyncStorage.removeItem('qwikmedicLogin')
            .then(() => {

                setStoreCredentials("");


                persistUser({ userid: 0, lan: true, raddress: testCredentials.raddress, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });


            })
            .catch((error) => {
                // console.log(error)
            });
        setNotallow(true);
    };

    const [lan, setLan] = useState(true); // false = bangla , true = eng
    let login = "  house-owner";
    const changelan = (value) => {
        setLan(value);
    };


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
                            getpromoimg.length = 0;

                            if (item.image1) {

                                getpromoimg.push(item.image1);

                            }
                            if (item.image2) {

                                getpromoimg.push(item.image2);

                            }
                            if (item.image3) {

                                getpromoimg.push(item.image3);

                            }
                            if (item.image4) {

                                getpromoimg.push(item.image4);

                            }
                            if (item.image5) {

                                getpromoimg.push(item.image5);

                            }
                            if (item.image6) {

                                getpromoimg.push(item.image6);

                            }
                            if (item.image7) {

                                getpromoimg.push(item.image7);

                            }
                            if (item.image8) {

                                getpromoimg.push(item.image8);

                            }
                            if (item.imag9) {

                                getpromoimg.push(item.image9);

                            }
                            if (item.image10) {

                                getpromoimg.push(item.image10);

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

                            }
                        });

                    })
                    .catch((error) => {

                    });

                unread ? persistUser({ userid: testCredentials.userid, notify: true, lan: true, raddress: testCredentials.raddress, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave }) : persistUser({ userid: testCredentials.userid, notify: false, lan: true, raddress: testCredentials.raddress, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });



            }


        }
        catch (error) {

        } finally {


        }



        setGetnotify(false);


    };
    const [getFlat, setGetFlat] = useState(true);

    const UserInfo = () => {

        if (getFlat) {

            const requestOptions1 = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            };

            fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions1)
                .then((response) => response.json())
                .then((json) => {

                    setUserData(json);
                    setSavelist(json.savelist == null ? [] : json.savelist);
                    setHeight(json.height);
                    setWeight(json.weight);
                    setGender(json.gender);



                })
                .catch((error) => {
                    setNointernet(true);
                });


        }

        setGetFlat(false);
    };


    const searchFilter = (text) => {


        if (text) {
            const newData = getProductdata1.filter((item) => {
                if (item.regularunitprice != "" & item.regularunitprice != null & item.regularunitprice != "0" & item.regularunitprice != "0.0" & item.regularunitprice != "0.00") {

                    const itemData = item.medicinename ? item.medicinename.toUpperCase() : ''.toUpperCase();
                    // const itemData = item.types ?  item.types.toUpperCase() : ''.toUpperCase()
                    // const itemData = item.power ?  item.power.toUpperCase() : ''.toUpperCase()
                    // const itemData = item.imagelink ?  item.imagelink.toUpperCase() : ''.toUpperCase()

                    const textData = text.toUpperCase();

                    return itemData.indexOf(textData) > -1;
                }

            });

            setGetallf(newData);

            setSearch(text);
        }
        else {

            setGetallf([]);
            setSearch(text);
        }





    };



    // for medicine details


    const addbuytocart = (tytle, regularPrice, discountPrice, image, quantity, ptype, power) => {

        console.log(tytle, regularPrice, discountPrice, image, quantity, ptype, power);

        cartbuy.map((item, index) => {

            if ((item.productid == details.id) && (item.type == "medicine")) {

                cartbuy.splice(index, 1);

            }

        });

        cartbuy.push({ productid: details.id, image: image, tytle: tytle, regularPrice: regularPrice, discountPrice: discountPrice, quantity: productNumber, totalprice: parseInt(discountPrice) * parseInt(productNumber), totalregularPrice: parseInt(regularPrice) * parseInt(productNumber), type: "medicine", ptype: ptype, power: power });

        persistUser({ userid: userid, notify: testCredentials.natify, lan: true, raddress: testCredentials.raddress, cartbuy: cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });

        setCartmsg(true);

        fadeIn3();

    };

    const removeproducttosaveM = () => {

        savelist.map((item, index) => {

            if ((item.productid == details.id) && (item.type == "healthmart")) {
                savelist.splice(index, 1);
            }
        });

        // persistUser({userid:userid,lan:true,raddress: testCredentials.raddress,cartbuy: testCredentials.cartbuy ,cartrent: testCredentials.cartrent,productsave: productsave,flatsave: testCredentials.flatsave })

        setSavelist(savelist);

        setRsavemsg(true);

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({
                savelist: savelist,
            })
        };

        fetch('https://qwikmedic.pythonanywhere.com/userProfile/' + userid, requestOptions)
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


        fadeIn2();

        setCheckSave(true);

    };




    const addproducttosave = (genericname, companyname, productid, image, tytle, regularPrice, discountPrice) => {

        let x = 0;

        savelist.map((item, index) => {

            if ((item.productid == details.id) && (item.type == "medicine")) {

                x = 1;
            }
        });

        if (x == 0) {
            savelist.push({ productid: productid, image: image, tytle: tytle, genericname: genericname, companyname: companyname, regularPrice: regularPrice, discountPrice: discountPrice, type: "medicine" });

            // persistUser({userid:userid,lan:true,raddress: testCredentials.raddress,cartbuy: testCredentials.cartbuy ,cartrent: testCredentials.cartrent,productsave: productsave,flatsave: testCredentials.flatsave })

            setSavelist(savelist);

            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                body: JSON.stringify({
                    savelist: savelist,
                })
            };

            fetch('https://qwikmedic.pythonanywhere.com/userProfile/' + userid, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    // console.log('create expance', json);
                    setNointernet(false);
                    setLoading1(false);
                    checkSaveproduct(details);
                })
                .catch((error) => {
                    setLoading1(false);
                    console.error(error);
                    setNointernet(true);
                });


            setSavemsg(true);

            fadeIn1();

            setCheckSave(false);

        }

        else {
            // removeproducttosave()
        }

    };

    const removeproducttosave = () => {

        savelist.map((item, index) => {

            if ((item.productid == details.id) && (item.type == "medicine")) {
                savelist.splice(index, 1);
            }
        });

        // persistUser({userid:userid,lan:true,raddress: testCredentials.raddress,cartbuy: testCredentials.cartbuy ,cartrent: testCredentials.cartrent,productsave: productsave,flatsave: testCredentials.flatsave })

        setSavelist(savelist);

        setRsavemsg(true);

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({
                savelist: savelist,
            })
        };

        fetch('https://qwikmedic.pythonanywhere.com/userProfile/' + userid, requestOptions)
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


        fadeIn2();

        setCheckSave(true);

    };


    const deleteimg = (itemid) => {


        const requestOptions1 = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
        };

        fetch('https://qwikmedic.pythonanywhere.com/medicineNewData/' + itemid, requestOptions1)
            .then(response => response.ok)
            .then((json) => {
                // setNointernet(false)       
                console.log("Deleted");
                // navigation.navigate("Homepage",{})
                // setGetProduct(true)
            })
            .catch((error) => {
                // setNointernet(true)         

            });

    };


    const [getReview, setGetReview] = useState(true);
    const [getAllReview, setGetAllReview] = useState();
    const [getReviewImage, setGetReviewImage] = useState();

    const [avgRating, setAvgRating] = useState();

    const reviewData = () => {
        if (getReview) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },

            };

            fetch('https://qwikit1.pythonanywhere.com/userReviews/', requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    // setLoading1(false)
                    setGetAllReview(json);

                    const filteredData = json.filter(item => item.review_image && item.review_image.trim() !== '');
                    setGetReviewImage(filteredData);

                    const totalRatings = json.reduce(
                        (acc, review) => acc + (parseFloat(review.rating) || 0),
                        0
                    );
                    const average = totalRatings / json.length || 0; // Handle empty data
                    setAvgRating(average.toFixed(1)); // Round to 1 decimal place


                    setNointernet(false);
                    // console.log(json);
                })
                .catch((error) => {
                    console.error(error);
                    setNointernet(true);
                    // setLoading1(false)
                    // console.log("Network Error");
                });

            setGetReview(false);
        }

    };

    // reviewData();

    const [getExerciseVideo, setGetExerciseVideo] = useState(true);
    const [getAllExerciseVideo, setGetAllExerciseVideo] = useState();

    const AllVideoData = () => {
        if (getExerciseVideo) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },

            };

            fetch('https://qwikit1.pythonanywhere.com/exerciseVideos/', requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    // setLoading1(false)
                    setGetAllExerciseVideo(json);
                    setNointernet(false);
                    // console.log(json);
                })
                .catch((error) => {
                    console.error(error);
                    setNointernet(true);
                    // setLoading1(false)
                    // console.log("Network Error");
                });

            setGetExerciseVideo(false);
        }

    };

    const [getHealthVideo, setGetHealthVideo] = useState(true);
    const [getAllHealthVideo, setGetAllHealthVideo] = useState();

    const AllHealthVideoData = () => {
        if (getHealthVideo) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },

            };

            fetch('https://qwikit1.pythonanywhere.com/healthTipsVideos/', requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    // setLoading1(false)
                    setGetAllHealthVideo(json);
                    setNointernet(false);
                    // console.log(json);
                })
                .catch((error) => {
                    console.error(error);
                    setNointernet(true);
                    // setLoading1(false)
                    // console.log("Network Error");
                });

            setGetHealthVideo(false);
        }

    };


    const [getRecipeVideo, setGetRecipeVideo] = useState(true);
    const [getAllRecipeVideo, setGetAllRecipeVideo] = useState();

    const AllRecipeVideo = () => {
        if (getHealthVideo) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },

            };

            fetch('https://qwikit1.pythonanywhere.com/recipeVideos/', requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    // setLoading1(false)
                    setGetAllRecipeVideo(json);
                    setNointernet(false);
                    // console.log(json);
                })
                .catch((error) => {
                    console.error(error);
                    setNointernet(true);
                    // setLoading1(false)
                    // console.log("Network Error");
                });

            setGetRecipeVideo(false);
        }

    };


    useEffect(() => {
        reviewData();
        AllVideoData();
        AllHealthVideoData();
        AllRecipeVideo();
    }, [route.params]);



    const [selectedVideo, setSelectedVideo] = useState(null);

    const openModal = (video) => {
        setSelectedVideo(video);
    };

    const closeModal = () => {
        setSelectedVideo(null);
    };

    const convertToEmbedUrl = (url) => {
        if (!url) return "";

        if (url.includes("youtu.be")) {
            let videoId = url.split("youtu.be/")[1]?.split("?")[0];
            return `https://www.youtube.com/embed/${videoId}`;
        } else if (url.includes("watch?v=")) {
            let videoId = url.split("v=")[1]?.split("&")[0];
            return `https://www.youtube.com/embed/${videoId}`;
        } else if (url.includes("drive.google.com")) {
            let match = url.match(/\/d\/(.+?)\//);
            let videoId = match ? match[1] : "";
            return `https://drive.google.com/file/d/${videoId}/preview`;
        }

        return url; // If it's not YouTube or Drive, return as is
    };


    const renderItem = useCallback(({ item, index }) => (

        <View key={index}>
            <View style={{ justifyContent: 'flex-start', alignItems: 'center', width: cartwidth, borderWidth: 0 }}>


                <View style={{ paddingLeft: 2, paddingRight: 2, width: cartwidth }}>

                    <Pressable activeOpacity={4} disabled={item.regularunitprice == "" || item.regularunitprice == null || item.regularunitprice == "0" || item.regularunitprice == "0.0" || item.regularunitprice == "0.00" ? true : false} style={[styles.adds, { height: 210 }]} onPress={() => setDetailsdata(item)} >


                        <Image resizeMode='contain' style={[styles.addsImg, { height: item.medicinename.length < 25 ? 85 : 70, width: cartwidth - 10 }]} source={{ uri: item.imagelink != "" ? item.imagelink : "https://static.vecteezy.com/system/resources/thumbnails/002/272/156/small_2x/medicine-drug-icon-flat-style-and-colorful-design-illustration-free-vector.jpg" }}></Image>


                        <View style={{ width: cartwidth - 7, justifyContent: 'flex-start', alignItems: 'flex-start', left: 2 }}>
                            <Text style={{ color: colors.dblue, fontSize: 9, padding: 4, paddingBottom: 0, paddingTop: 2, paddingLeft: 5, fontFamily: 'Poppins_500Medium', paddingRight: 3 }}>{item.medicinename.length > 42 ? item.medicinename.split("", 42) : item.medicinename} {item.medicinename.length > 42 ? "..." : ""}  <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .2, fontSize: 9, color: colors.ash, display: item.power == "" || item.power == null ? 'none' : 'flex' }}></Text>{item.power}</Text>


                            <Text style={{ paddingLeft: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .2, fontSize: 9, color: colors.ash, padding: 1, top: 0, paddingTop: 0, paddingRight: 3, display: item.types == "" || item.types == null ? 'none' : 'flex' }}>{item.types}</Text>
                            <Text style={{ paddingLeft: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .2, fontSize: 9, color: colors.ash, padding: 1, top: 0, paddingTop: 0, paddingRight: 3, display: item.genericname == "" || item.genericname == null ? 'none' : 'flex' }}>{item.genericname.length > 14 ? item.genericname.split("", 14) : item.genericname} {item.genericname.length > 14 ? "..." : ""}</Text>
                            <Text style={{ paddingLeft: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .2, fontSize: 9, color: colors.ash, padding: 1, top: 0, paddingTop: 0, paddingRight: 3, display: item.companyname == "" || item.companyname == null ? 'none' : 'flex' }}>{item.companyname.length > 14 ? item.companyname.split("", 14) : item.companyname} {item.companyname.length > 14 ? "..." : ""}</Text>

                            <View style={{ paddingLeft: 5, flexDirection: 'row', width: cartwidth - 10, padding: 0, top: 0 }}>

                                <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .2, fontSize: 10, color: colors.ash, textDecorationLine: 'line-through' }}>{item.regularunitprice}</Text>

                                <Text style={{ letterSpacing: .2, fontSize: 10, color: colors.black, left: 5, color: "#FF8000", fontFamily: 'Poppins_500Medium' }}>{(parseFloat(item.regularunitprice.replace(",", "")) - (parseFloat(item.regularunitprice.replace(",", "")) * (parseInt(getdiscount) / 100))).toFixed(2)} TK  </Text>

                            </View>

                        </View>





                    </Pressable>

                    <View style={{ width: '100%', height: 16, }}></View>
                </View>

            </View>
        </View>

    ), []);


    const DoctorInfo1 = async () => {
        try {

            if (getDoctorinfo) {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://qwikmedic.pythonanywhere.com/doctorProfile', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {

                        setGetProductdata(json);

                        {
                            getProductdatapush.length = 0;

                            json.map((item, index) => {

                                if (parseInt(item.experience) >= 10) {

                                    getProductdatapush.push(item);
                                }


                            });
                        }

                    })
                    .catch((error) => {
                        console.error(error);

                    });


            }

        }
        catch (error) {
            console.error(error);

        } finally {


        }

        setGetDoctorinfo(false);


    };


    // useEffect(() => {

    //     DoctorInfo1();

    // }, []);



    useEffect(() => {

        // setNotallow(testCredentials.userid != 0 ? false : true)
        // console.log(notify)
        UserInfo();
        // console.log(getProductdata1)
        // NotificationCheck()
        // console.log(showdetails)
        ProductInfo();
        // Promoimage()
        // DoctorInfo1()
        inputRef?.current?.focus();

        if (noficationid != "" && noficationid != null && noficationid != undefined) {

            // Product Order
            if (noficationid == "1") {
                setNoficationid("");
                navigation.navigate("OrdermedicineHome", {});
            }

            // Online Doctor 
            if (noficationid == "2") {
                setNoficationid("");
                navigation.navigate("Myappointment", {});
            }

            // Ambulance Order 
            if (noficationid == "3") {
                setNoficationid("");
                navigation.navigate("AmbulanceRequest", { nofi: true });
            }


            // blood donation
            if (noficationid == "4") {
                setNoficationid("");
                navigation.navigate("BloodDonation", {});
            }


            // message reply
            if (noficationid == "5") {
                setNoficationid("");
                navigation.navigate("Homepage", {});
            }


            // medicine remainder
            if (noficationid == "6") {
                setNoficationid("");
                navigation.navigate("Reminder", {});
            }


            // promocode
            if (noficationid == "7") {
                setNoficationid("");
                navigation.navigate("Promohome", {});
            }


            // for call
            if (noficationid == "8") {
                // setNoficationid("")
                // navigation.navigate("Promohome",{})
            }

        }



        if (route.params) {
            if (route.params.bypassreminder) {
                navigation.navigate("Reminder", {});
            }
            if (route.params.refFav) {
                navigation.navigate("Favourites", {});
            }
            if (route.params.refPrec) {
                navigation.navigate("Prescribtions", {});
            }

            if (route.params.reminder) {
                setForremainder(true);
            }


        }

    }, []);

    // wehight and medical history notification 
    // Check and notify once user data is loaded
    useEffect(() => {
        const checkWeightUpdateAndNotify = async () => {
            if (!userData?.weight || userData.weight.length === 0) return;

            // Get latest weight entry by timestamp
            const latest = userData.weight.reduce((a, b) =>
                new Date(a.timestamp) > new Date(b.timestamp) ? a : b
            );

            const days = differenceInDays(new Date(), new Date(latest.timestamp));

            if (days >= 14) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Health Reminder',
                        body: 'Please update your weight and medical history.',
                        sound: true,
                    },
                    trigger: null, // send immediately
                });
            }
        };

        if (userData) {
            checkWeightUpdateAndNotify();
        }
    }, [userData]);


    const skip = () => {
        persistUser({ userid: 0, lan: true, raddress: "", cartbuy: [], productsave: [], cartrent: [], flatsave: [] });

    };


    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        const autoScroll = setInterval(() => {
            if (getProductdata.length > 0) {
                let nextIndex = currentIndex + 1;
                if (nextIndex >= getProductdata.length) {
                    nextIndex = 0; // Reset to the beginning
                }
                setCurrentIndex(nextIndex);

                scrollViewRef.current.scrollTo({
                    x: nextIndex * newCardWidth, // Scroll by full screen width
                    animated: true,
                });
            }
        }, 3000); // Adjust time interval (3000ms = 3 seconds)

        return () => clearInterval(autoScroll); // Cleanup interval on unmount
    }, [currentIndex, getProductdata.length]);


    // Exercise Video
    const scrollViewRefTwo = useRef(null);
    const [currentIndexTwo, setCurrentIndexTwo] = useState(0);

    useEffect(() => {
        const autoScroll = setInterval(() => {
            if (getProductdata.length > 0) {
                let nextIndex = currentIndexTwo + 1;
                if (nextIndex >= getProductdata.length) {
                    nextIndex = 0; // Reset to the beginning
                }
                setCurrentIndexTwo(nextIndex);

                scrollViewRefTwo.current.scrollTo({
                    x: nextIndex * ExerciseVideoCardWidth, // Scroll by full screen width
                    animated: true,
                });
            }
        }, 3000); // Adjust time interval (3000ms = 3 seconds)

        return () => clearInterval(autoScroll); // Cleanup interval on unmount
    }, [currentIndexTwo, getProductdata.length]);

    // Exercise Video
    const scrollViewRefThree = useRef(null);
    const [currentIndexThree, setCurrentIndexThree] = useState(0);

    useEffect(() => {
        const autoScroll = setInterval(() => {
            if (getProductdata.length > 0) {
                let nextIndex = currentIndexThree + 1;
                if (nextIndex >= getProductdata.length) {
                    nextIndex = 0; // Reset to the beginning
                }
                setCurrentIndexThree(nextIndex);

                scrollViewRefThree.current.scrollTo({
                    x: nextIndex * ExerciseVideoCardWidth, // Scroll by full screen width
                    animated: true,
                });
            }
        }, 3000); // Adjust time interval (3000ms = 3 seconds)

        return () => clearInterval(autoScroll); // Cleanup interval on unmount
    }, [currentIndexThree, getProductdata.length]);

    // Customer's Review
    const scrollViewRefFour = useRef(null);
    const [currentIndexFour, setCurrentIndexFour] = useState(0);

    useEffect(() => {
        const autoScroll = setInterval(() => {
            if (getProductdata.length > 0) {
                let nextIndex = currentIndexFour + 1;
                if (nextIndex >= getProductdata.length) {
                    nextIndex = 0; // Reset to the beginning
                }
                setCurrentIndexFour(nextIndex);

                scrollViewRefFour.current.scrollTo({
                    x: nextIndex * ExerciseVideoCardWidth, // Scroll by full screen width
                    animated: true,
                });
            }
        }, 3000); // Adjust time interval (3000ms = 3 seconds)

        return () => clearInterval(autoScroll); // Cleanup interval on unmount
    }, [currentIndexFour, getProductdata.length]);


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
                    backgroundColor="#000066"

                />

                <View style={[styles.navbar, { flexDirection: 'row' }]}>



                    <View style={{ width: '50%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10 }}>

                        <Text style={{ top: 17, color: colors.black, fontSize: 14, display: lan ? 'none' : 'flex' }} >  বিস্তারিত</Text>

                        {/* <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >{forremainder ? "MEDICINE" : "HOME"}   </Text> */}

                        <Image
                            resizeMode="stretch"
                            style={{ left: 4, top: 4, color: colors.black, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', width: 165, height: 50 }}
                            source={require("../assets/fitback/fitback-logo.png")}
                        />

                    </View>



                </View>


                {/* <Pressable style={{ width: '100%' }} onPress={() => setShowdetails(false)}>
                    <View style={[styles.searchview, { width: '100%', flexDirection: 'row' }]}>

                        <TextInput
                            ref={inputRef}
                            style={styles.input}
                            placeholder='Search for any Medicine'
                            // onChangeText={newTest => setSearch(newTest)}
                            onChangeText={(text) => searchFilter(text)}
                            defaultValue={search}
                            value={search}
                            editable={showdetails ? false : true}
                            // editable = {false}
                            underlineColorAndroid="transparent"

                        />

                        <Pressable style={{ width: 28, height: '65%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start', left: 20 }} onPress={() => setSearchFlag(true)}>
                            <Icon name="search" size={20} color='#065540' />
                        </Pressable>

                    </View>

                </Pressable> */}

                <View style={[styles.body1, { justifyContent: 'flex-start', alignItems: 'center', top: 10 }]}>

                    <View style={{ width: '100%', display: search != "" && search != null ? 'flex' : 'none' }} scrollEnabled={showdetails ? false : true}>

                        {/* for All */}
                        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 0, display: showdetails ? 'none' : 'flex', opacity: showdetails ? 0.25 : 1, marginBottom: 10 }}>

                            {getProductdata1.length < 5 ? <ActivityIndicator size="large" color="#2D6A8D" style={{ paddingTop: 10, height: 200 }} /> :

                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 0 }}>

                                    <FlatList
                                        columnWrapperStyle={{ justifyContent: 'space-around' }}
                                        data={getallf}
                                        style={{ width: '98%', top: 5 }}
                                        keyExtractor={(item, index) => item.id}
                                        // keyExtractor={ (item, index) => index.toString }
                                        numColumns={3}
                                        renderItem={renderItem}
                                    />
                                    {/* <View style={{width:'100%',marginTop:40,justifyContent:'center',alignItems:'center',display: getallf.length == 0 && nointernet ==  false && isLoading123 == false  ? 'flex' : 'none'}}>
                                
                                <Text style={{fontSize:14,fontWeight:'700',color:colors.black}}>No Search Found</Text>
                                <Text style={{fontSize:12,fontWeight:'400',color:colors.ash,marginTop:10}}>Let’s check our trendy <Text style={{fontSize:12,fontWeight:'400',textDecorationLine:'underline',color:colors.ash}} onPress={()=>navigation.navigate("PagkageDecoration",{})}>new items</Text> </Text>
                            </View> */}
                                </View>

                            }
                        </View>

                        <View style={{ backgroundColor: colors.body, width: '100%', justifyContent: 'flex-start', alignItems: 'center', display: showdetails ? 'flex' : 'none', marginBottom: 0, top: 10 }}>


                            <View activeOpacity={4} style={[{ width: '95%', alignItems: 'center', justifyContent: 'flex-start', height: "100%", borderWidth: 1, backgroundColor: colors.white, borderColor: colors.green, borderRadius: 4 }]}>
                                <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                                    <Pressable style={{ top: 4, right: 6, height: 22, width: 22 }} onPress={() => { setCheckSave(true), setShowdetails(false), setProductNumber(1); }}>

                                        <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/cross.jpg")} />

                                    </Pressable>

                                </View>
                                <ScrollView style={{ width: '100%' }}>

                                    <View style={{ justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>



                                        {/* <Image  resizeMode='contain' style={[styles.addsImg,{borderWidth:1,marginTop:8,height:180,width:'80%'}]} source={{uri: details.imagelink != "" ? details.imagelink : "http://drive.google.com/uc?export=view&id=1KSibQ8cZLe5TaZ1fSR-qG3f_-zIE2-Dc"}}></Image>  */}
                                        <Image resizeMode='contain' style={[styles.addsImg, { borderWidth: 1, marginTop: 8, height: 180, width: '80%' }]} source={{ uri: details.imagelink != "" ? details.imagelink : "https://static.vecteezy.com/system/resources/thumbnails/002/272/156/small_2x/medicine-drug-icon-flat-style-and-colorful-design-illustration-free-vector.jpg" }}></Image>

                                        {/* <View style={{position:'absolute',width:'100%',justifyContent:'flex-end',alignItems:'flex-end'}} >
                                        <Pressable style={{top:4,right:6,height: 22 ,width:22}} onPress={()=> {setCheckSave(true),setShowdetails(false),setProductNumber(1)}}>
                                            
                                            <Image resizeMode={'cover'} style={{width:22 ,height:22}}  source={require("../assets/cross.jpg")} />

                                        </Pressable>

                                    </View> */}

                                        <View style={[styles.addstext, { width: '94%', marginBottom: 100 }]} >


                                            <Text style={{ fontFamily: 'Poppins_500Medium', letterSpacing: .9, color: colors.dblue, fontSize: 14, padding: 8, paddingBottom: 0, marginTop: 0 }}>{details.medicinename} <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12 }}>  {details.genericname} </Text> </Text>

                                            <View style={{ justifyContent: 'flex-start', alignItems: 'center', width: '100%', flexDirection: 'row' }}>

                                                <Text style={{ paddingLeft: 10, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, color: colors.ash, padding: 4, top: 0, marginTop: 0, display: details.companyname == "" || details.companyname == null ? 'none' : 'flex' }}>{details.companyname}</Text>
                                                <Text style={{ paddingLeft: 10, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, color: colors.blue, padding: 4, top: 0, marginTop: 0, display: details.types == "" || details.types == null ? 'none' : 'flex' }}>{details.types}</Text>

                                            </View>

                                            {/* <View style={{justifyContent:'flex-start',alignItems:'center',width:'100%',flexDirection:'row',display: details.packsize == "" || details.packsize == null ? 'none' : 'flex'}}>
                                            
                                            <Text style={{paddingLeft:10,fontFamily: 'Poppins_400Regular',letterSpacing:.9,fontSize:12,color:colors.ash,padding:4,top:0,marginTop:0,}}>Packsize: {details.packsize}</Text>

                                        </View> */}

                                            <Text style={{ paddingLeft: 10, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, color: colors.ash, padding: 4, top: 0, marginTop: 0, }}></Text>

                                            <View style={{ paddingLeft: 10, flexDirection: 'row', width: '100%', padding: 4, top: 0, paddingBottom: 0, marginTop: 0 }}>

                                                <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 14, color: colors.ash, textDecorationLine: 'line-through', bottom: 20 }}>{regularPrice} TK</Text>

                                                <Text style={{ fontFamily: 'Poppins_500Medium', letterSpacing: .9, fontSize: 14, color: colors.oranget, left: 10, bottom: 20 }}>{discountprice} TK  </Text>

                                                {/* <Text style={{fontFamily: 'Poppins_500Medium',letterSpacing:.9,fontSize:14,color:colors.red,left:10,bottom:20}} onPress={()=>deleteimg(details.id)}>Deleted  </Text> */}

                                            </View>

                                        </View>

                                        {/* <View style={{position:'absolute',top:13,left:15}}>
                                            <Pressable style={{bottom:9,right:10,display: checkSave ? "none" : 'flex' }} onPress={()=> removeproducttosave()}>


                                                <Image
                                                    style={{ width: 20, height: 20}}
                                                    resizeMode='contain'
                                                    source={require('../assets/favourite_selected.jpg')}
                                                />

                                            </Pressable>

                                            <Pressable style={{bottom:9,right:10,display: checkSave ? "flex" : 'none'}} onPress={()=> {addproducttosave(details.id,details.imagelink,details.productname,parseInt(details.mrp.replace(",", "")),parseInt(details.mrp.replace(",", "")),'1')}}>
                                            
                                        
                                                <Image
                                                    style={{ width: 20, height: 20}}
                                                    resizeMode='contain'
                                                    source={require('../assets/favourite_unselected.jpg')}
                                                />

                                            </Pressable> 

                                        </View> */}

                                        <View style={{ marginTop: 60, right: 0, flexDirection: 'row', justifyContent: 'flex-start', width: '90%', bottom: 80 }}>

                                            <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, color: colors.black, top: 15, color: colors.dblue }}>Qty:</Text>

                                            <View style={{ left: 10 }}>

                                                {/* 
                                        <NumericInput 

                                            onChange={value => {setProductNumber(value),setDiscountprice((value*discountpricecon1).toFixed(2)),setRegularPrice((value*regularPricecon1).toFixed(2))}}
                                            onLimitReached={(isMax,msg) => {console.log(isMax,msg),setMinorder(true),fadeIn7()}}
                                            totalWidth={130} 
                                            totalHeight={35} 
                                            iconSize={5}
                                            initValue ={productNumber}
                                            minValue={1}
                                            maxValue={500}
                                            step={1}
                                            separatorWidth={1}
                                            borderColor={'#ffff'}
                                            valueType='real'
                                            rounded = {false}
                                            textColor={colors.dblue}  
                                            iconStyle={{ color:  colors.white  ,fontSize:20}} 
                                            rightButtonBackgroundColor= {productNumber == 500 ? '#606060' : colors.green}
                                            leftButtonBackgroundColor= {productNumber == details.quantity  ? '#606060' : "#FF9999"}
                                           
                                        /> 
                                        */}
                                                {/* <InputSpinner
                                            max={500}
                                            min={1}
                                            step={1}
                                            colorMax="#606060"
                                            colorMin="#FF9999"
                                            value={productNumber}
                                            onChange={(num) => {
                                            setProductNumber(num);
                                            setDiscountprice((num * discountpricecon1).toFixed(2));
                                            setRegularPrice((num * regularPricecon1).toFixed(2));
                                            }}
                                            onMax={(isMax, msg) => {
                                            console.log(isMax, msg);
                                            setMinorder(true);
                                            fadeIn7();
                                            }}
                                            onMin={(isMin, msg) => {
                                            console.log(isMin, msg);
                                            // Optionally handle minimum event if needed
                                            }}
                                            buttonStyle={styles.buttonStyle}
                                            buttonTextStyle={styles.buttonText}
                                        /> */}

                                                <InputSpinner
                                                    max={100}
                                                    // min={parseInt(item.minqnt)}
                                                    min={1}
                                                    step={1}
                                                    // colorMax="#606060"
                                                    // colorMin="#FF9999"
                                                    value={productNumber}
                                                    onChange={(num) => {
                                                        setProductNumber(num);
                                                        setDiscountprice((num * discountpricecon1).toFixed(2));
                                                        setRegularPrice((num * regularPricecon1).toFixed(2));

                                                    }}
                                                    onMax={(isMax, msg) => {
                                                        console.log(isMax, msg);
                                                        setMinorder(true);
                                                        fadeIn7();
                                                    }}
                                                    onMin={(isMin, msg) => {
                                                        console.log(isMin, msg);
                                                        // Optionally handle minimum event if needed
                                                    }}
                                                    buttonStyle={styles.buttonStyle}
                                                // buttonTextStyle={styles.buttonText}
                                                // buttonFontSize={20} 
                                                />
                                            </View>

                                            {/* <View style={{paddingLeft:10,flexDirection:'row',width:'100%',padding:4,top:20,paddingBottom:0,left:20}}>
                    
                                        <Text style={{fontFamily: 'Poppins_400Regular',letterSpacing:.9,fontSize:14,color:colors.ash,textDecorationLine:'line-through',bottom:20}}>{regularPrice}</Text>
                                                        
                                        <Text style={{fontFamily: 'Poppins_400Regular',letterSpacing:.9,fontSize:14,color:colors.black,left:10,bottom:20}}>{discountprice} Tk</Text>
                    
                                    </View> */}



                                        </View>

                                        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', bottom: 50, left: 20 }}>

                                            {/* <Pressable style={{marginTop:10,borderRadius:4,width:'55%',height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#065540',bottom:20}} onPress={()=> addbuytocart(details.productname,parseInt(details.mrp.replace(",", "")), details.app,details.imagelink,1,true)}>
                                        
                                        <Text style={{color:colors.white,fontSize:14,fontWeight:'700'}}>Add to Cart</Text>            
                                    
                                    </Pressable> */}

                                            <Pressable style={{ backgroundColor: colors.dblue, borderRadius: 6, width: 100, height: 35, justifyContent: 'center', alignItems: 'center' }} onPress={() => addbuytocart(details.medicinename, parseFloat(details.regularunitprice.replace(",", "")), parseFloat(details.regularunitprice.replace(",", "")) - (parseFloat(details.regularunitprice.replace(",", "")) * (parseInt(getdiscount) / 100)), details.imagelink, productNumber, details.types, details.power)}>
                                                <Text style={{ color: colors.white, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 11 }}>Add to Cart</Text>
                                            </Pressable>

                                            <Pressable style={{ flexDirection: 'row', left: 15, backgroundColor: colors.oranget, borderRadius: 6, width: 100, height: 35, justifyContent: 'center', alignItems: 'center', display: checkSave ? "none" : 'flex' }} onPress={() => removeproducttosave()}>
                                                <Image
                                                    style={{ width: 18, height: 18, right: 3 }}
                                                    resizeMode='contain'
                                                    source={require('../assets/favourite_selected.jpg')}
                                                />
                                                <Text style={{ color: colors.white, fontFamily: 'Poppins_400Regular', letterSpacing: .9, top: 2, fontSize: 11 }}>Favourite</Text>
                                            </Pressable>


                                            <Pressable style={{ flexDirection: 'row', left: 15, backgroundColor: colors.white1, borderRadius: 6, width: 100, height: 35, justifyContent: 'center', alignItems: 'center', display: checkSave ? "flex" : 'none' }} onPress={() => { addproducttosave(details.genericname, details.companyname, details.id, details.imagelink, details.medicinename, parseFloat(details.regularunitprice.replace(",", "")) - (parseFloat(details.regularunitprice.replace(",", "")) * (parseInt(details.discount) / 100)), parseFloat(details.regularunitprice.replace(",", "")), details.quantity); }}>
                                                <Image
                                                    style={{ width: 18, height: 18, right: 3 }}
                                                    resizeMode='contain'
                                                    source={require('../assets/favourite_unselected.jpg')}
                                                />
                                                <Text style={{ color: colors.oranget, fontFamily: 'Poppins_400Regular', letterSpacing: .9, top: 2, fontSize: 11 }}>Favourite</Text>
                                            </Pressable>


                                            {/* Remainder */}

                                            <Pressable style={{ backgroundColor: colors.green, borderRadius: 6, width: 100, left: 30, height: 35, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => navigation.navigate("Reminder", { medicineitem: details })}>

                                                <Image resizeMode={'cover'} style={{ width: 17, height: 17 }} source={require("../assets/Bottom_icon_2_REMINDER.jpg")} />

                                                <Text style={{ color: colors.white, fontFamily: 'Poppins_400Regular', letterSpacing: .9, top: 2, fontSize: 11 }}> Reminder</Text>

                                            </Pressable>

                                            {/* <Pressable style={{bottom:9,right:10,display: checkSave ? "none" : 'flex' }} onPress={()=> removeproducttosave()}>

                                        

                                                <Image
                                                    style={{ width: 20, height: 20}}
                                                    resizeMode='contain'
                                                    source={require('../assets/favourite_selected.jpg')}
                                                />

                                            </Pressable>

                                            <Pressable style={{bottom:9,right:10,display: checkSave ? "flex" : 'none'}} onPress={()=> {addproducttosave(details.id,details.imagelink,details.productname,parseInt(details.mrp.replace(",", "")),parseInt(details.mrp.replace(",", "")),'1')}}>
                                            
                                 

                                                <Image
                                                    style={{ width: 20, height: 20}}
                                                    resizeMode='contain'
                                                    source={require('../assets/favourite_unselected.jpg')}
                                                />

                                            </Pressable>  */}

                                        </View>



                                        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', bottom: 50 }}>

                                            <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { indications ? setIndications(false) : setIndications(true); }}>


                                                <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: indications ? 0 : 0, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                                    <Text style={{ left: 20, color: colors.blue, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, width: '95%', textDecorationLine: 'underline' }}>Indication</Text>
                                                    {/* <ArrowDown1 style={{top:2,left:30,display: indications ? 'flex' : 'none'}}/> */}
                                                    {/* <ArrowLeft1 style={{top:2,left:30 ,display: indications ? 'none' : 'flex'}}/> */}
                                                </View>


                                                <View style={{ display: indications ? 'flex' : 'none', left: 20, width: '85%', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1 }}>
                                                    <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>{details.indication == "" ? "No Data Is Available" : details.indication}</Text>

                                                </View>


                                            </Pressable>




                                            <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { adultdose ? setAdultdose(false) : setAdultdose(true); }}>


                                                <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: adultdose ? 0 : 0, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                                    <Text style={{ left: 20, color: colors.blue, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, width: '95%', textDecorationLine: 'underline' }}>Dose</Text>
                                                </View>


                                                <View style={{ display: adultdose ? 'flex' : 'none', left: 20, width: '85%', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1 }}>
                                                    <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>{details.dose == "" ? "No Data Is Available" : details.dose}</Text>

                                                </View>


                                            </Pressable>


                                            <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { contraindications ? setContraindications(false) : setContraindications(true); }}>


                                                <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: contraindications ? 0 : 0, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                                    <Text style={{ left: 20, color: colors.blue, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, width: '95%', textDecorationLine: 'underline' }}>Contraindications</Text>
                                                </View>


                                                <View style={{ display: contraindications ? 'flex' : 'none', left: 20, width: '85%', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1 }}>
                                                    <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>{details.contraindication == "" ? "No Data Is Available" : details.contraindication}</Text>

                                                </View>


                                            </Pressable>


                                            <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { sideeffects ? setSideeffects(false) : setSideeffects(true); }}>


                                                <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: sideeffects ? 0 : 0, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                                    <Text style={{ left: 20, color: colors.blue, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, width: '95%', textDecorationLine: 'underline' }}>Sideeffects</Text>
                                                    {/* <ArrowDown1 style={{top:2,left:30,display: indications ? 'flex' : 'none'}}/> */}
                                                    {/* <ArrowLeft1 style={{top:2,left:30 ,display: indications ? 'none' : 'flex'}}/> */}
                                                </View>


                                                <View style={{ display: sideeffects ? 'flex' : 'none', left: 20, width: '85%', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1 }}>
                                                    <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>{details.sideeffect == "" ? "No Data Is Available" : details.sideeffect}</Text>

                                                </View>


                                            </Pressable>


                                            <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { precautionswarnings ? setPrecautionswarnings(false) : setPrecautionswarnings(true); }}>


                                                <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: precautionswarnings ? 0 : 0, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                                    <Text style={{ left: 20, color: colors.blue, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, width: '95%', textDecorationLine: 'underline' }}>Precautions</Text>
                                                </View>


                                                <View style={{ display: precautionswarnings ? 'flex' : 'none', left: 20, width: '85%', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1 }}>
                                                    <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>{details.precaution == "" ? "No Data Is Available" : details.precaution}</Text>

                                                </View>


                                            </Pressable>


                                            <Pressable style={[styles.flatdetails, { paddingLeft: 0, borderColor: colors.ash1, borderRadius: 6, borderWidth: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, paddingBottom: 0, width: '97%' }]} onPress={() => { modeofaction ? setModeofaction(false) : setModeofaction(true); }}>


                                                <View style={{ width: '100%', borderBottomColor: colors.ash1, borderBottomWidth: modeofaction ? 0 : 0, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: 10, top: 8 }} >
                                                    <Text style={{ left: 20, color: colors.blue, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, width: '95%', textDecorationLine: 'underline' }}>Modeofaction</Text>
                                                </View>


                                                <View style={{ display: modeofaction ? 'flex' : 'none', left: 20, width: '85%', paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderColor: colors.ash1, borderRadius: 1, borderWidth: 1 }}>
                                                    <Text style={{ fontSize: 12, color: colors.ash, left: 10, padding: 10, paddingRight: 15, fontFamily: 'Poppins_400Regular', letterSpacing: .9, textAlign: 'justify', lineHeight: 22 }}>{details.modeofaction == "" ? "No Data Is Available" : details.modeofaction}</Text>

                                                </View>


                                            </Pressable>








                                            {/* <Pressable style={[styles.flatdetails,{paddingLeft:0,borderColor:colors.ash1,borderRadius:6,borderWidth:0,flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',marginTop:10,paddingBottom:0,width:'97%'}]} onPress={()=>{childdose ? setChilddose(false) : setChilddose(true)}}>
                        

                        <View style={{width:'100%',borderBottomColor:colors.ash1,borderBottomWidth: childdose ? 0 : 0,justifyContent:'space-evenly',alignItems:'center',flexDirection:'row',marginTop:10,top:8}} >
                            <Text style={{left:20,color:colors.blue,fontSize:12,fontFamily: 'Poppins_400Regular',letterSpacing:.9,width:'95%',textDecorationLine:'underline'}}>Child Dose</Text>
                        </View>
                       
                        
                        <View style={{display: childdose ? 'flex' : 'none',left:20,width:'85%',paddingRight:10,justifyContent:'flex-start',alignItems:'flex-start',marginTop:10,borderColor:colors.ash1,borderRadius:1,borderWidth:1}}>
                            <Text style={{fontSize:12,color:colors.ash,left:10,padding:10,paddingRight:15,fontFamily: 'Poppins_400Regular',letterSpacing:.9,textAlign: 'justify',lineHeight: 22}}>{details.childdose == ""  ? "No Data Is Available" : details.childdose}</Text>

                        </View>

                        
                    </Pressable>

                    <Pressable style={[styles.flatdetails,{paddingLeft:0,borderColor:colors.ash1,borderRadius:6,borderWidth:0,flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',marginTop:10,paddingBottom:0,width:'97%'}]} onPress={()=>{renaldose ? setRenaldose(false) : setRenaldose(true)}}>
                        

                        <View style={{width:'100%',borderBottomColor:colors.ash1,borderBottomWidth: renaldose ? 0 : 0,justifyContent:'space-evenly',alignItems:'center',flexDirection:'row',marginTop:10,top:8}} >
                            <Text style={{left:20,color:colors.blue,fontSize:12,fontFamily: 'Poppins_400Regular',letterSpacing:.9,width:'95%',textDecorationLine:'underline'}}>Renal Dose</Text>
                        </View>
                       
                        
                        <View style={{display: renaldose ? 'flex' : 'none',left:20,width:'85%',paddingRight:10,justifyContent:'flex-start',alignItems:'flex-start',marginTop:10,borderColor:colors.ash1,borderRadius:1,borderWidth:1}}>
                            <Text style={{fontSize:12,color:colors.ash,left:10,padding:10,paddingRight:15,fontFamily: 'Poppins_400Regular',letterSpacing:.9,textAlign: 'justify',lineHeight: 22}}>{details.renaldose == ""  ? "No Data Is Available" : details.renaldose}</Text>

                        </View>

                        
                    </Pressable>


                    <Pressable style={[styles.flatdetails,{paddingLeft:0,borderColor:colors.ash1,borderRadius:6,borderWidth:0,flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',marginTop:10,paddingBottom:0,width:'97%'}]}  onPress={()=>{administration ? setAdministration(false) : setAdministration(true)}}>
                        

                        <View style={{width:'100%',borderBottomColor:colors.ash1,borderBottomWidth: administration ? 0 : 0,justifyContent:'space-evenly',alignItems:'center',flexDirection:'row',marginTop:10,top:8}} >
                            <Text style={{left:20,color:colors.blue,fontSize:12,fontFamily: 'Poppins_400Regular',letterSpacing:.9,width:'95%',textDecorationLine:'underline'}}>Administration</Text>
                        </View>
                       
                        
                        <View style={{display: administration ? 'flex' : 'none',left:20,width:'85%',paddingRight:10,justifyContent:'flex-start',alignItems:'flex-start',marginTop:10,borderColor:colors.ash1,borderRadius:1,borderWidth:1}}>
                            <Text style={{fontSize:12,color:colors.ash,left:10,padding:10,paddingRight:15,fontFamily: 'Poppins_400Regular',letterSpacing:.9,textAlign: 'justify',lineHeight: 22}}>{details.administration == ""  ? "No Data Is Available" : details.administration}</Text>

                        </View>

                        
                    </Pressable> 
                    
                     <Pressable style={[styles.flatdetails,{paddingLeft:0,borderColor:colors.ash1,borderRadius:6,borderWidth:0,flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',marginTop:10,paddingBottom:0,width:'97%'}]} onPress={()=>{pregnancy ? setPregnancy(false) : setPregnancy(true)}}>
                        

                        <View style={{width:'100%',borderBottomColor:colors.ash1,borderBottomWidth: pregnancy ? 0 : 0,justifyContent:'space-evenly',alignItems:'center',flexDirection:'row',marginTop:10,top:8}} >
                            <Text style={{left:20,color:colors.blue,fontSize:12,fontFamily: 'Poppins_400Regular',letterSpacing:.9,width:'95%',textDecorationLine:'underline'}}>Pregnancy</Text>
                        </View>
                       
                        
                        <View style={{display: pregnancy ? 'flex' : 'none',left:20,width:'85%',paddingRight:10,justifyContent:'flex-start',alignItems:'flex-start',marginTop:10,borderColor:colors.ash1,borderRadius:1,borderWidth:1}}>
                            <Text style={{fontSize:12,color:colors.ash,left:10,padding:10,paddingRight:15,fontFamily: 'Poppins_400Regular',letterSpacing:.9,textAlign: 'justify',lineHeight: 22}}>{details.pregnancycategory == ""  ? "No Data Is Available" : details.pregnancycategory}</Text>

                        </View>

                        
                    </Pressable>
                    
                    */}




                                        </View>

                                    </View>
                                </ScrollView>
                            </View>


                        </View>


                        {/* <View style={{position:'absolute',width:'75%',height:60,borderWidth:1,borderRadius:3,justifyContent:'flex-start',alignItems:'center',display: cartmsg ? "flex" : 'none'}}>
                           
                            <View style={{width:'100%',height:60,backgroundColor:colors.ash,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{marginLeft:10,fontSize:13,letterSpacing:.9,fontFamily: 'Poppins_500Medium',color:colors.white}}>Item added to the cart</Text>
                            </View>

                        </View>

                        <View style={{position:'absolute',width:'75%',height:60,backgroundColor:colors.ash,borderWidth:1,borderRadius:3,justifyContent:'flex-start',alignItems:'center',flexDirection:'row',display: savemsg ? "flex" : 'none'}}>
                         
                            <Text style={{marginLeft:10,fontSize:13,letterSpacing:.9,fontFamily: 'Poppins_500Medium',color:colors.white}}>Item added to favourites</Text>
                        </View>

                        <View style={{position:'absolute',width:'75%',height:60,backgroundColor:colors.ash,borderWidth:1,borderRadius:3,justifyContent:'flex-start',alignItems:'center',flexDirection:'row',display: rsavemsg ? "flex" : 'none'}}>
                         
                            <Text style={{marginLeft:10,fontSize:13,letterSpacing:.9,fontFamily: 'Poppins_500Medium',color:colors.white}}>Item removed from favourites</Text>
                        </View>

                        <View style={{position:'absolute',width:'75%',height:60,backgroundColor:colors.ash,borderWidth:1,borderRadius:3,justifyContent:'flex-start',alignItems:'center',flexDirection:'row',display: minorder ? "flex" : 'none'}}>
                        
                            <Text style={{marginLeft:10,fontSize:13,letterSpacing:.9,fontFamily: 'Poppins_500Medium',color:colors.white}}>Minimum number of quantity reached.</Text>
                        </View>
                        
                        <View style={{position:'absolute',width:'75%',height:60,backgroundColor:colors.ash,borderWidth:1,borderRadius:3,justifyContent:'flex-start',alignItems:'center',flexDirection:'row',display: nointernet ? "flex" : "none"}}>
                            <Text style={{marginLeft:15,fontSize:13,letterSpacing:.9,fontFamily: 'Poppins_500Medium',color:"#D50400"}}>No internet connection</Text>
                        </View> */}


                    </View>

                    <ScrollView style={{ width: '100%', display: ((search == "" || search == null) && forremainder == false) ? 'flex' : 'none' }}>

                        <View style={{ alignItems: 'center', width: '100%', justifyContent: "flex-start" }}>

                            {/* promo image */}


                            {/* <View style={{marginTop:10,width:'95%',height:240,flexDirection:'row',marginBottom:0,alignItems:'center',justifyContent:'flex-start'}}>
                  
                  <SliderBox
                  images={getpromoimg}
                  sliderBoxHeight={200}
                  parentWidth = {screenWidth-20}  
                  onCurrentImagePressed={()=> navigation.navigate("Promohome",{})}
                  dotColor="#FFEE58"
                  resizeMethod={'resize'}
                  resizeMode={'contain'}
                  inactiveDotColor="#90A4AE"
                  dotStyle={{
                      width: 10,
                      height: 10,
                      borderRadius: 15,
                      marginHorizontal: 0,
                      padding: 0,
                      margin: 0
                  }}
                  paginationBoxStyle={{
                      position: "absolute",
                      bottom: 0,
                      padding: 0,
                      alignItems: "center",
                      alignSelf: "center",
                      justifyContent: "center",
                      paddingVertical: 10
                    }}
                  ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
                  autoplay         
                  circleLoop
                  />
                          
              </View> */}



                            {/* start adds */}

                            <View style={{ width: '100%', marginBottom: 4 }}>
                                <View style={{ width: "100%", paddingHorizontal: 14, marginVertical: 15, display: gender == null || gender == "" || height.length == 0 || weight.length == 0 ? 'flex' : 'none' }}>

                                    <View style={{
                                        width: "100%", backgroundColor: "#EE416C", flexDirection: "row", alignItems: "center", paddingHorizontal: 8, paddingVertical: 10, borderRadius: 8,
                                        shadowColor: '#000',
                                        shadowOpacity: 1,
                                        shadowRadius: 5,
                                        elevation: 8,
                                        justifyContent: "space-between"

                                    }}>
                                        <View style={{ width: "65%", flexDirection: 'row' }}>
                                            <Text style={{ color: "white", fontSize: 10, fontFamily: 'Poppins_500Medium', letterSpacing: 0.9 }}>Update your profile to unlock better features!</Text>
                                        </View>
                                        <View style={{ width: "35%", paddingLeft: 4 }}>

                                            <TouchableOpacity
                                                style={{
                                                    width: "100%",
                                                    paddingVertical: 8,
                                                    justifyContent: "center",
                                                    backgroundColor: 'white',
                                                    borderRadius: 5,
                                                }}
                                                onPress={() => navigation.navigate("UserProfile", {})}

                                            >
                                                <Text style={{ color: '#512631', textAlign: "center", fontSize: 11 }}>Update Now</Text>
                                            </TouchableOpacity>
                                            {/* 
                                            <TouchableOpacity
                                                style={{
                                                    width: "47%",
                                                    paddingVertical: 8,
                                                    justifyContent: "center",
                                                    backgroundColor: 'white',
                                                    borderRadius: 5,
                                                }}
                                            >
                                                <Text style={{ color: '#512631', textAlign: "center", fontSize: 12 }}>Renew</Text>
                                            </TouchableOpacity> */}
                                        </View>
                                    </View>


                                </View>



                                <ScrollView


                                    ref={scrollViewRef}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    style={{}}
                                    pagingEnabled={true}

                                >
                                    {/* {getProductdata.map((item, index) => ( */}

                                    <Pressable activeOpacity={4} style={[styles.newAdds, { width: newCardWidth }]} onPress={() => navigation.navigate("Heathmart", {})}>
                                        <View style={{ width: "100%", paddingHorizontal: 4, paddingTop: 4 }}>
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: "100%", height: 160 }}
                                                source={require("../assets/fitback/FitbackUserBanner.png")} />
                                        </View>

                                    </Pressable>

                                    <Pressable activeOpacity={4} style={[styles.newAdds, { width: newCardWidth }]} onPress={() => navigation.navigate("Heathmart", {})}>
                                        <View style={{ width: "100%", paddingHorizontal: 4, paddingTop: 4 }}>
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: "100%", height: 160 }}
                                                source={require("../assets/fitback/FitbackUserBanner02.png")} />
                                        </View>

                                    </Pressable>

                                    <Pressable activeOpacity={4} style={[styles.newAdds, { width: newCardWidth }]} onPress={() => navigation.navigate("Heathmart", {})}>
                                        <View style={{ width: "100%", paddingHorizontal: 4, paddingTop: 4 }}>
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: "100%", height: 160 }}
                                                source={require("../assets/fitback/FitbackUserBanner03.png")} />
                                        </View>

                                    </Pressable>
                                    {/* ))} */}
                                </ScrollView>

                            </View>

                            {/* end adds */}

                            {/* Free app start */}

                            <View style={{
                                width: "100%",
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                top: 5,
                            }}  >

                                <Text style={{ fontSize: 12, color: colors.black, left: 12, width: '80%', fontFamily: 'Poppins_400Regular', letterSpacing: .4, color: colors.dblue }}>Explore Our Free Wellness Features</Text>
                                {/* <Pressable style={{ right: 20, width: '20%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.ash, textDecorationLine: 'underline' }} onPress={() => navigation.navigate("Heathmart", {})}>See all</Text>

                                </Pressable> */}
                            </View>



                            <View style={{ width: '95%', height: 1, backgroundColor: colors.ash1, top: 9 }}></View>

                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>

                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 14 }}>
                                    <Pressable
                                        style={{
                                            width: '23%',
                                            // height: 200,
                                            borderRadius: 8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: colors.white,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 1.5, height: 1.5 },
                                            shadowOpacity: 0.8,
                                            shadowRadius: 5,
                                            elevation: 3,
                                            paddingTop: 3,
                                            paddingHorizontal: 2,

                                        }}
                                        onPress={() => navigation.navigate("BmiCalculator", {
                                            reminder: true

                                        })}
                                    >
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                style={{ width: 50, height: 38, borderRadius: 8, }}
                                                resizeMode="stretch"
                                                source={require('../assets/fitback/bmi-1.png')}
                                            />
                                        </View>

                                        <View style={{ width: '100%' }}>
                                            <Text style={{ color: colors.ash, fontSize: 10, fontFamily: 'Poppins_400Regular', letterSpacing: 0.2, color: "#EE426D", textAlign: "center", marginTop: 3 }}>Body Mass Index</Text>

                                        </View>
                                    </Pressable>
                                    <Pressable
                                        style={{
                                            width: '23%',
                                            // height: 200,
                                            borderRadius: 8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: colors.white,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 1.5, height: 1.5 },
                                            shadowOpacity: 0.8,
                                            shadowRadius: 5,
                                            elevation: 3,
                                            paddingTop: 3,
                                            paddingHorizontal: 2,

                                        }}
                                        onPress={() => navigation.navigate("CalorieCalculator", {
                                            reminder: true

                                        })}
                                    >
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                style={{ width: 40, height: 36 }}
                                                resizeMode="stretch"
                                                source={require('../assets/fitback/caloriesImg.png')}
                                            />
                                        </View>

                                        <View style={{ width: '100%' }}>
                                            <Text style={{ color: colors.ash, fontSize: 10, fontFamily: 'Poppins_400Regular', letterSpacing: 0.2, color: "#EE426D", textAlign: "center", marginTop: 3 }}>Calories Calculator</Text>

                                        </View>
                                    </Pressable>


                                    {/* ////// */}
                                    <Pressable
                                        style={{
                                            width: '23%',
                                            // height: 200,
                                            borderRadius: 8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: colors.white,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 1.5, height: 1.5 },
                                            shadowOpacity: 0.8,
                                            shadowRadius: 5,
                                            elevation: 3,
                                            paddingTop: 3,
                                            paddingHorizontal: 2,


                                        }}
                                        onPress={() => navigation.navigate("HealthTracking", {
                                            reminder: true

                                        })}
                                    >
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                style={{ width: 55, height: 40 }}
                                                resizeMode="stretch"
                                                source={require('../assets/fitback/health.png')}
                                            />
                                        </View>

                                        <View style={{ width: '100%' }}>
                                            <Text style={{ color: colors.ash, fontSize: 10, fontFamily: 'Poppins_400Regular', letterSpacing: 0.2, color: "#EE426D", textAlign: "center", marginTop: 3 }}>Health Tracker</Text>

                                        </View>
                                    </Pressable>
                                    <Pressable
                                        style={{
                                            width: '23%',
                                            // height: 200,
                                            borderRadius: 8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: colors.white,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 1.5, height: 1.5 },
                                            shadowOpacity: 0.8,
                                            shadowRadius: 5,
                                            elevation: 3,
                                            paddingTop: 3,
                                            paddingHorizontal: 2,

                                        }}
                                        onPress={() =>
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
                                        }
                                    >
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                style={{ width: 50, height: 40 }}
                                                resizeMode="stretch"
                                                source={require('../assets/fitback/brain.png')}
                                            />
                                        </View>

                                        <View style={{ width: '100%' }}>
                                            <Text style={{ color: colors.ash, fontSize: 10, fontFamily: 'Poppins_400Regular', letterSpacing: 0.2, color: "#EE426D", textAlign: "center", marginTop: 5 }}>Health Quiz</Text>

                                        </View>
                                    </Pressable>

                                </View>

                            </View>

                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>

                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 14 }}>
                                    <Pressable
                                        style={{
                                            width: '23%',
                                            // height: 200,
                                            borderRadius: 8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: colors.white,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 1.5, height: 1.5 },
                                            shadowOpacity: 0.8,
                                            shadowRadius: 5,
                                            elevation: 3,
                                            paddingTop: 3,
                                            paddingHorizontal: 2,

                                        }}
                                        onPress={() => navigation.navigate("FoodWiseCalories", {
                                            reminder: true

                                        })}
                                    >
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                style={{ width: 50, height: 38, borderRadius: 8, }}
                                                resizeMode="stretch"
                                                source={require('../assets/fitback/caloriesImage.png')}
                                            />
                                        </View>

                                        <View style={{ width: '100%' }}>
                                            <Text style={{ color: colors.ash, fontSize: 10, fontFamily: 'Poppins_400Regular', letterSpacing: 0.2, color: "#EE426D", textAlign: "center", marginTop: 4 }}>Calories Wise Food</Text>

                                        </View>
                                    </Pressable>
                                    <Pressable
                                        style={{
                                            width: '23%',
                                            // height: 200,
                                            borderRadius: 8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: colors.white,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 1.5, height: 1.5 },
                                            shadowOpacity: 0.8,
                                            shadowRadius: 5,
                                            elevation: 3,
                                            paddingTop: 3,
                                            paddingHorizontal: 2,

                                        }}
                                        onPress={() => navigation.navigate("WaterIntakePage", {
                                            reminder: true

                                        })}
                                    >
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                style={{ width: 55, height: 40, borderRadius: 8, }}
                                                resizeMode="stretch"
                                                source={require('../assets/fitback/drink.png')}
                                            />
                                        </View>

                                        <View style={{ width: '100%' }}>
                                            <Text style={{ color: colors.ash, fontSize: 10, fontFamily: 'Poppins_400Regular', letterSpacing: 0.2, color: "#EE426D", textAlign: "center", marginTop: 0 }}>Water Intake</Text>

                                        </View>
                                    </Pressable>
                                    <Pressable
                                        style={{
                                            width: '23%',
                                            // height: 200,
                                            borderRadius: 8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: colors.white,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 1.5, height: 1.5 },
                                            shadowOpacity: 0.8,
                                            shadowRadius: 5,
                                            elevation: 3,
                                            paddingTop: 3,
                                            paddingHorizontal: 2,

                                        }}
                                        onPress={() => navigation.navigate("CheckWellness", {
                                            reminder: true

                                        })}
                                    >
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                style={{ width: 60, height: 44 }}
                                                resizeMode="stretch"
                                                source={require('../assets/fitback/better-health.png')}
                                            />
                                        </View>

                                        <View style={{ width: '100%' }}>
                                            <Text style={{ color: colors.ash, fontSize: 10, fontFamily: 'Poppins_400Regular', letterSpacing: 0.2, color: "#EE426D", textAlign: "center", marginTop: 0 }}>Check Wellness</Text>

                                        </View>
                                    </Pressable>

                                    <Pressable
                                        style={{
                                            width: '23%',
                                            // height: 200,
                                            borderRadius: 8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: colors.white,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 1.5, height: 1.5 },
                                            shadowOpacity: 0.8,
                                            shadowRadius: 5,
                                            elevation: 3,
                                            paddingTop: 3,
                                            paddingHorizontal: 2,

                                        }}
                                        onPress={() => navigation.navigate("ActivitiesTracking", {})}
                                    >
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', top: 4 }}>
                                            <Image
                                                style={{ width: 36, height: 36 }}
                                                resizeMode="stretch"
                                                source={require('../assets/fitback/physical activities tracker.png')}
                                            />
                                        </View>

                                        <View style={{ width: '100%' }}>
                                            <Text style={{ color: colors.ash, fontSize: 10, fontFamily: 'Poppins_400Regular', letterSpacing: 0.2, color: "#EE426D", textAlign: "center", marginTop: 5 }}>Activities Tracker</Text>

                                        </View>
                                    </Pressable>


                                    {/* <Pressable
                                        style={{
                                            width: '23%',
                                            // height: 200,
                                            borderRadius: 8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: colors.white,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 1.5, height: 1.5 },
                                            shadowOpacity: 0.8,
                                            shadowRadius: 5,
                                            elevation: 3,
                                            paddingTop: 3,
                                            paddingHorizontal: 2,

                                        }}
                                        onPress={() => navigation.navigate("RecipeVideo", {
                                            reminder: true

                                        })}
                                    >
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                style={{ width: 60, height: 44 }}
                                                resizeMode="stretch"
                                                source={require('../assets/fitback/youtube.png')}
                                            />
                                        </View>

                                        <View style={{ width: '100%' }}>
                                            <Text style={{ color: colors.ash, fontSize: 10, fontFamily: 'Poppins_500Medium', letterSpacing: 0.9, color: "#EE426D", textAlign: "center", marginTop: 8 }}>Recipe Video</Text>

                                        </View>
                                    </Pressable> */}


                                </View>

                            </View>
                            {/* Free app end */}

                            {/* <View style={{ width: "100%", paddingHorizontal: 14, marginVertical: 30 }}>

                                <View style={{
                                    width: "100%", backgroundColor: "#EE416C", flexDirection: "row", alignItems: "center", paddingHorizontal: 8, paddingVertical: 10, borderRadius: 8,
                                    shadowColor: '#000',
                                    shadowOpacity: 1,
                                    shadowRadius: 5,
                                    elevation: 8,
                                    justifyContent: "space-between"

                                }}>
                                    <View style={{ width: "58%", flexDirection: 'row' }}>
                                        <Text style={{ color: "white", fontSize: 10, fontFamily: 'Poppins_500Medium', letterSpacing: 0.9 }}>Your Fitback Reset Pack Validity 20 Days Remaining</Text>
                                    </View>
                                    <View style={{ width: "40%", flexDirection: 'row', justifyContent: "space-between", paddingLeft: 4 }}>

                                        <TouchableOpacity
                                            style={{
                                                width: "47%",
                                                paddingVertical: 8,
                                                justifyContent: "center",
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                            }}
                                        >
                                            <Text style={{ color: '#512631', textAlign: "center", fontSize: 12 }}>View Pack</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{
                                                width: "47%",
                                                paddingVertical: 8,
                                                justifyContent: "center",
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                            }}
                                        >
                                            <Text style={{ color: '#512631', textAlign: "center", fontSize: 12 }}>Renew</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>


                            </View> */}


                            {/* Exercise Video start */}

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', top: 5, marginTop: 20 }}  >

                                <Text style={{ fontSize: 12, color: colors.black, left: 12, width: '50%', fontFamily: 'Poppins_400Regular', letterSpacing: .4, color: colors.dblue }}>Exercise Videos</Text>
                                <Pressable style={{ right: 20, width: '50%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', letterSpacing: .4, color: colors.ash, textDecorationLine: 'underline' }} onPress={() => navigation.navigate("ExerciseVideo", {})}>See all</Text>

                                </Pressable>
                            </View>



                            <View style={{ width: '95%', height: 1, backgroundColor: colors.ash1, top: 9 }}></View>


                            <View style={{ width: '100%', marginTop: 25, marginBottom: 10 }}>


                                <ScrollView
                                    ref={scrollViewRefTwo}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    style={{ marginRight: 10 }}
                                    pagingEnabled={true}

                                >

                                    {/* <Pressable activeOpacity={4} style={[styles.newAdds, { marginLeft: 8, width: ExerciseVideoCardWidth, borderRadius: 5 }]} onPress={() => navigation.navigate("DoctorInfo", {})}>
                                        <View style={{ width: "100%", paddingHorizontal: 4, paddingTop: 4, paddingBottom: 12 }}>
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: "100%", height: 150 }}
                                                source={require("../assets/fitback/WorkoutImg01.png")} />

                                            <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "left", color: "white", marginTop: -26, paddingHorizontal: 8 }}>Quick Core Workout</Text>

                                        </View>

                                    </Pressable> */}

                                    {getAllExerciseVideo?.map((data, index) => {
                                        let videoId = "";
                                        let isYouTube = data.youtubelink.includes("youtu.be") || data.youtubelink.includes("watch?v=");
                                        let isDrive = data.youtubelink.includes("drive.google.com");

                                        if (isYouTube) {
                                            if (data.youtubelink.includes("youtu.be")) {
                                                videoId = data.youtubelink.split("youtu.be/")[1]?.split("?")[0];
                                            } else if (data.youtubelink.includes("watch?v=")) {
                                                videoId = data.youtubelink.split("v=")[1]?.split("&")[0];
                                            }
                                        } else if (isDrive) {
                                            let match = data.youtubelink.match(/\/d\/(.+?)\//);
                                            videoId = match ? match[1] : "";
                                        }
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                activeOpacity={4}
                                                style={[styles.newAdds, { marginLeft: 8, width: ExerciseVideoCardWidth, borderRadius: 5 }]}

                                                onPress={() => openModal(data)}
                                            >
                                                <View style={{ width: '100%', height: 125, paddingHorizontal: 6, paddingTop: 6, backgroundColor: "#fff", }}>
                                                    {isYouTube && videoId ? (
                                                        <Image
                                                            source={{ uri: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }}
                                                            style={styles.thumbnail}
                                                            resizeMode='cover'
                                                        />
                                                    ) : isDrive && videoId ? (
                                                        <Image
                                                            source={{ uri: `https://drive.google.com/thumbnail?id=${videoId}` }}
                                                            style={styles.thumbnail}
                                                            resizeMode='cover'
                                                        />
                                                    ) : (
                                                        <Text style={{ textAlign: "center", marginTop: 50 }}>Thumbnail not available</Text>
                                                    )}


                                                </View>
                                                <View style={{ width: "100%", paddingHorizontal: 4, paddingBottom: 12, backgroundColor: "#fff" }}>
                                                    <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', letterSpacing: 0.2, textAlign: "left", marginTop: 6, paddingHorizontal: 8 }}>
                                                        {/* {data.exercise_name} */}
                                                        {data.exercise_name
                                                            ? data.exercise_name.length > 22
                                                                ? data.exercise_name.slice(0, 22) + "..."
                                                                : data.exercise_name
                                                            : ""}




                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })}

                                </ScrollView>

                                <Modal
                                    visible={!!selectedVideo}
                                    animationType="slide"
                                    transparent={true}
                                    onRequestClose={closeModal}
                                >
                                    <View style={styles.modalContainer}>
                                        <View style={styles.modalContent}>
                                            {selectedVideo && (
                                                <WebView
                                                    source={{ uri: convertToEmbedUrl(selectedVideo.youtubelink) }}
                                                    style={styles.video}
                                                    javaScriptEnabled={true}
                                                    domStorageEnabled={true}
                                                    allowsFullscreenVideo={true}
                                                    mediaPlaybackRequiresUserAction={false}
                                                />
                                            )}
                                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                                <Text style={{ color: colors.white, fontSize: 12, fontFamily: "Poppins_400Regular" }}>Close</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>


                            </View>

                            {/* Exercise Video end */}


                            {/* Health Tips Video start */}

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', top: 5 }}  >

                                <Text style={{ fontSize: 12, color: colors.black, left: 12, width: '50%', fontFamily: 'Poppins_400Regular', letterSpacing: .4, color: colors.dblue }}>Health Tips Videos</Text>
                                <Pressable style={{ right: 20, width: '50%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', letterSpacing: .4, color: colors.ash, textDecorationLine: 'underline' }} onPress={() => navigation.navigate("HealthTipsVideo", {})}>See all</Text>

                                </Pressable>
                            </View>



                            <View style={{ width: '95%', height: 1, backgroundColor: colors.ash1, top: 9 }}></View>


                            <View style={{ width: '100%', marginTop: 25, marginBottom: 30 }}>

                                <ScrollView
                                    ref={scrollViewRefThree}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    style={{ marginRight: 10 }}
                                    pagingEnabled={true}

                                >

                                    {/* <Pressable activeOpacity={4} style={[styles.newAdds, { marginLeft: 8, width: ExerciseVideoCardWidth, borderRadius: 5 }]} onPress={() => navigation.navigate("DoctorInfo", {})}>
                                        <View style={{ width: "100%", paddingHorizontal: 4, paddingTop: 4, paddingBottom: 12 }}>
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: "100%", height: 150 }}
                                                source={require("../assets/fitback/HealthTipsImg01.png")} />

                                            <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "left", color: "white", marginTop: -26, paddingHorizontal: 8 }}>Quick Core Workout</Text>

                                        </View>

                                    </Pressable> */}

                                    {getAllHealthVideo?.map((data, index) => {
                                        let videoId = "";
                                        let isYouTube = data.youtubelink.includes("youtu.be") || data.youtubelink.includes("watch?v=");
                                        let isDrive = data.youtubelink.includes("drive.google.com");

                                        if (isYouTube) {
                                            if (data.youtubelink.includes("youtu.be")) {
                                                videoId = data.youtubelink.split("youtu.be/")[1]?.split("?")[0];
                                            } else if (data.youtubelink.includes("watch?v=")) {
                                                videoId = data.youtubelink.split("v=")[1]?.split("&")[0];
                                            }
                                        } else if (isDrive) {
                                            let match = data.youtubelink.match(/\/d\/(.+?)\//);
                                            videoId = match ? match[1] : "";
                                        }

                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                activeOpacity={4}
                                                style={[styles.newAdds, { marginLeft: 8, width: ExerciseVideoCardWidth, borderRadius: 5 }]}

                                                onPress={() => openModal(data)}
                                            >
                                                <View style={{ width: "100%", height: 125, paddingHorizontal: 6, paddingTop: 6 }}>
                                                    {isYouTube && videoId ? (
                                                        <Image
                                                            source={{ uri: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }}
                                                            style={styles.thumbnail}
                                                            resizeMode='cover'
                                                        />
                                                    ) : isDrive && videoId ? (
                                                        <Image
                                                            source={{ uri: `https://drive.google.com/thumbnail?id=${videoId}` }}
                                                            style={styles.thumbnail}
                                                            resizeMode='cover'
                                                        />
                                                    ) : (
                                                        <Text style={{ textAlign: "center", marginTop: 50 }}>Thumbnail not available</Text>
                                                    )}

                                                </View>
                                                <View style={{ width: "100%", paddingHorizontal: 4, paddingBottom: 12 }}>
                                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "left", marginTop: 6, paddingHorizontal: 8 }}>
                                                        {/* {data.healthtips_name} */}
                                                        {data.healthtips_name
                                                            ? data.healthtips_name.length > 22
                                                                ? data.healthtips_name.slice(0, 22) + "..."
                                                                : data.healthtips_name
                                                            : ""}

                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </ScrollView>

                            </View>


                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', top: 5 }}  >

                                <Text style={{ fontSize: 12, color: colors.black, left: 12, width: '50%', fontFamily: 'Poppins_400Regular', letterSpacing: .4, color: colors.dblue }}>Recipe Videos</Text>
                                <Pressable style={{ right: 20, width: '50%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.ash, textDecorationLine: 'underline' }} onPress={() => navigation.navigate("RecipeVideo", {})}>See all</Text>

                                </Pressable>
                            </View>



                            <View style={{ width: '95%', height: 1, backgroundColor: colors.ash1, top: 9 }}></View>

                            <View style={{ width: '100%', marginTop: 25, marginBottom: 30 }}>

                                <ScrollView
                                    ref={scrollViewRefThree}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    style={{ marginRight: 10 }}
                                    pagingEnabled={true}

                                >

                                    {/* <Pressable activeOpacity={4} style={[styles.newAdds, { marginLeft: 8, width: ExerciseVideoCardWidth, borderRadius: 5 }]} onPress={() => navigation.navigate("DoctorInfo", {})}>
                                        <View style={{ width: "100%", paddingHorizontal: 4, paddingTop: 4, paddingBottom: 12 }}>
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: "100%", height: 150 }}
                                                source={require("../assets/fitback/HealthTipsImg01.png")} />

                                            <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "left", color: "white", marginTop: -26, paddingHorizontal: 8 }}>Quick Core Workout</Text>

                                        </View>

                                    </Pressable> */}

                                    {getAllRecipeVideo?.map((data, index) => {
                                        let videoId = "";
                                        let isYouTube = data.youtubelink.includes("youtu.be") || data.youtubelink.includes("watch?v=");
                                        let isDrive = data.youtubelink.includes("drive.google.com");

                                        if (isYouTube) {
                                            if (data.youtubelink.includes("youtu.be")) {
                                                videoId = data.youtubelink.split("youtu.be/")[1]?.split("?")[0];
                                            } else if (data.youtubelink.includes("watch?v=")) {
                                                videoId = data.youtubelink.split("v=")[1]?.split("&")[0];
                                            }
                                        } else if (isDrive) {
                                            let match = data.youtubelink.match(/\/d\/(.+?)\//);
                                            videoId = match ? match[1] : "";
                                        }

                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                activeOpacity={4}
                                                style={[styles.newAdds, { marginLeft: 8, width: ExerciseVideoCardWidth, borderRadius: 5 }]}

                                                onPress={() => openModal(data)}
                                            >
                                                <View style={{ width: "100%", height: 125, paddingHorizontal: 6, paddingTop: 6 }}>
                                                    {isYouTube && videoId ? (
                                                        <Image
                                                            source={{ uri: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }}
                                                            style={styles.thumbnail}
                                                            resizeMode='cover'
                                                        />
                                                    ) : isDrive && videoId ? (
                                                        <Image
                                                            source={{ uri: `https://drive.google.com/thumbnail?id=${videoId}` }}
                                                            style={styles.thumbnail}
                                                            resizeMode='cover'
                                                        />
                                                    ) : (
                                                        <Text style={{ textAlign: "center", marginTop: 50 }}>Thumbnail not available</Text>
                                                    )}

                                                </View>
                                                <View style={{ width: "100%", paddingHorizontal: 4, paddingBottom: 12 }}>
                                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "left", marginTop: 6, paddingHorizontal: 8 }}>
                                                        {/* {data.healthtips_name} */}
                                                        {data.healthtips_name
                                                            ? data.healthtips_name.length > 22
                                                                ? data.healthtips_name.slice(0, 22) + "..."
                                                                : data.healthtips_name
                                                            : ""}

                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </ScrollView>

                            </View>

                            {/* Health Tips Video end */}



                            {/* Product Categories start */}

                            {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', top: 5 }}  >

                                <Text style={{ fontSize: 13, color: colors.black, left: 12, width: '50%', fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.dblue }}>Product Categories</Text>
                                <Pressable style={{ right: 20, width: '50%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.ash, textDecorationLine: 'underline' }} onPress={() => navigation.navigate("Heathmart", {})}>See all</Text>

                                </Pressable>
                            </View>



                            <View style={{ width: '95%', height: 1, backgroundColor: colors.ash1, top: 9 }}></View> */}


                            {/* <View style={{ width: '100%', marginTop: 25, marginBottom: 30 }}>

                                <View style={{ width: '100%', flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14 }}>
                                    <Pressable style={[styles.newAddsTwo, { width: "19%", borderRadius: 5 }]} onPress={() => navigation.navigate("Heathmart", {})}>
                                        <View style={{ width: "100%", paddingHorizontal: 4, paddingTop: 4, paddingBottom: 4 }}>
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: "100%", height: 50 }}
                                                source={require("../assets/fitback/homeProductCategoryImg01.png")} />

                                            <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "left", color: "black", marginTop: 8, textAlign: "center" }}>Fitback</Text>
                                            <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "left", color: "black", textAlign: "center" }}>Reform</Text>

                                        </View>

                                    </Pressable>
                                    <Pressable style={[styles.newAddsTwo, { width: "19%", borderRadius: 5 }]} onPress={() => navigation.navigate("Heathmart", {})}>
                                        <View style={{ width: "100%", paddingHorizontal: 4, paddingTop: 4, paddingBottom: 4 }}>
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: "100%", height: 50 }}
                                                source={require("../assets/fitback/homeProductCategoryImg02.png")} />

                                            <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "left", color: "black", marginTop: 8, textAlign: "center" }}>Fitback</Text>
                                            <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "left", color: "black", textAlign: "center" }}>Keto</Text>

                                        </View>

                                    </Pressable>
                                    <Pressable style={[styles.newAddsTwo, { width: "19%", borderRadius: 5 }]} onPress={() => navigation.navigate("Heathmart", {})}>
                                        <View style={{ width: "100%", paddingHorizontal: 4, paddingTop: 4, paddingBottom: 4 }}>
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: "100%", height: 50 }}
                                                source={require("../assets/fitback/homeProductCategoryImg03.png")} />

                                            <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "left", color: "black", marginTop: 8, textAlign: "center" }}>Fitback</Text>
                                            <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "left", color: "black", textAlign: "center" }}>Regular</Text>

                                        </View>

                                    </Pressable>
                                    <Pressable style={[styles.newAddsTwo, { width: "19%", borderRadius: 5 }]} onPress={() => navigation.navigate("Heathmart", {})}>
                                        <View style={{ width: "100%", paddingHorizontal: 4, paddingTop: 4, paddingBottom: 4 }}>
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: "100%", height: 50 }}
                                                source={require("../assets/fitback/homeProductCategoryImg04.png")} />

                                            <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "left", color: "black", marginTop: 8, textAlign: "center" }}>Fitback</Text>
                                            <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "left", color: "black", textAlign: "center" }}>Reset</Text>

                                        </View>

                                    </Pressable>
                                    <Pressable style={[styles.newAddsTwo, { width: "19%", borderRadius: 5 }]} onPress={() => navigation.navigate("Heathmart", {})}>
                                        <View style={{ width: "100%", paddingHorizontal: 4, paddingTop: 4, paddingBottom: 4 }}>
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: "100%", height: 50 }}
                                                source={require("../assets/fitback/homeProductCategoryImg05.png")} />

                                            <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "left", color: "black", marginTop: 8, textAlign: "center" }}>All</Text>
                                            <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "left", color: "black", textAlign: "center" }}></Text>

                                        </View>

                                    </Pressable>
                                </View>

                            </View> */}


                            {/* Product Categories end */}


                            {/* Medicine  */}
                            {/* <View style={{ width: '100%', height: 175, marginTop: 25, marginBottom: 10 }}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    style={{ marginRight: 10 }}
                                >
                                    {getProductdata.map((item, index) => (

                                        <Pressable key={index} activeOpacity={4} style={[styles.adds, { marginLeft: 8, width: cardWidth, height: 167 }]} onPress={() => navigation.navigate("DoctorInfo", { doctorprofile: item })}>




                                            <Image resizeMode='contain' style={[styles.addsImg, { width: cardWidth - 2, height: item.name.length < 25 ? 75 : 60 }]} source={{ uri: item.profileimage == "" || item.profileimage == null ? "http://drive.google.com/uc?export=view&id=1KSibQ8cZLe5TaZ1fSR-qG3f_-zIE2-Dc" : item.profileimage }}></Image>
                                            <Image
                                                style={{ left: 4, height: 20, width: '15%', display: item.country == "Bangladesh" ? 'flex' : 'none', position: 'absolute' }}
                                                resizeMode='contain'
                                                source={require('../assets/bd_flag.jpg')}
                                            />

                                            <Image
                                                style={{ left: 4, height: 20, width: '15%', display: item.country == "Canada" ? 'flex' : 'none', position: 'absolute' }}
                                                resizeMode='contain'
                                                source={require('../assets/cdflag.jpg')}
                                            />

                                            <Text style={{ color: colors.dblue, fontSize: 9, padding: 4, paddingBottom: 0, paddingTop: 2, fontFamily: 'Poppins_500Medium' }}>{item.name.length > 42 ? item.name.split("", 42) : item.name} {item.name.length > 42 ? "..." : ""}</Text>


                                            <Text style={{ paddingLeft: 5, fontSize: 9, color: colors.ash, padding: 0, top: 0, paddingTop: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingRight: 3 }}>{item.doctordepartment == "" || item.doctordepartment == null ? item.specialization.length > 15 ? item.specialization.split("", 15) : item.specialization : item.doctordepartment.length > 15 ? item.doctordepartment.split("", 15) : item.doctordepartment}</Text>
                                            <Text style={{ paddingLeft: 5, fontSize: 9, color: colors.ash, padding: 0, top: 0, paddingTop: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingRight: 3 }}>{item.experience} Years</Text>

                                            <View style={{ flexDirection: 'row', width: '100%', paddingTop: 3, bottom: 7 }}>


                                                <View style={{ paddingLeft: 5, flexDirection: 'row', width: '100%', padding: 2, top: 0, paddingBottom: 2, alignContent: 'center' }}>


                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating) == 0.00 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/empltystarline.jpg')}
                                                    />

                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating) > 0.00 && parseFloat(item.avgrating) <= 1.00 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/1star.jpg')}
                                                    />
                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating) > 1.00 && parseFloat(item.avgrating) <= 2.00 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/2star.jpg')}
                                                    />
                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating) > 2.00 && parseFloat(item.avgrating) <= 3.00 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/3star.jpg')}
                                                    />
                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating) > 3.00 && parseFloat(item.avgrating) <= 4.99 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/4star.jpg')}
                                                    />
                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating) == 5.00 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/5star.jpg')}
                                                    />

                                                    <Text style={{ fontSize: 10, color: colors.ash, left: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>({item.avgrating == "" || item.avgrating == null || item.avgrating == "0.00" || item.avgrating == "0" ? "0.0" : item.avgrating})</Text>

                                                </View>
                                            </View>
                                            <Pressable style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                <View style={{ top: -169 }}>

                                                </View>

                                            </Pressable>



                                        </Pressable>
                                    ))}
                                </ScrollView>

                            </View> */}



                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', top: 5 }}  >

                                <Text style={{ fontSize: 12, color: colors.black, left: 12, width: '50%', fontFamily: 'Poppins_400Regular', letterSpacing: .4, color: colors.dblue }}>Featured Product</Text>
                                <Pressable style={{ right: 20, width: '50%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', letterSpacing: .4, color: colors.ash, textDecorationLine: 'underline' }} onPress={() => navigation.navigate("Heathmart", {})}>See all</Text>

                                </Pressable>
                            </View>



                            <View style={{ width: '95%', height: 1, backgroundColor: colors.ash1, top: 9 }}></View>

                            <View style={{ width: '100%', height: 180, marginTop: 25, marginBottom: 10 }}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    // pagingEnabled
                                    scrollEventThrottle={16}
                                    style={{ marginRight: 10 }}
                                >
                                    {estore.map((item, index) => (

                                        <Pressable key={index} style={[styles.adds, { marginLeft: 8, width: cardWidth, height: 167 }]} onPress={() => navigation.navigate("Heathmart", { others: true, itemdetails: item })}>

                                            <Image resizeMode='contain' style={[styles.addsImg, { width: cardWidth - 2, height: item.productname.length < 20 ? 75 : 60 }]} source={{ uri: item.image1 != "" ? item.image1 : "http://drive.google.com/uc?export=view&id=1KSibQ8cZLe5TaZ1fSR-qG3f_-zIE2-Dc" }}></Image>

                                            <Text style={{ color: colors.dblue, fontSize: 9, padding: 4, paddingBottom: 0, paddingTop: 2, fontFamily: 'Poppins_500Medium', paddingRight: 3 }}>{item.productname.length > 42 ? item.productname.split("", 42) : item.productname} {item.productname.length > 42 ? "..." : ""}</Text>


                                            {/* height:92, */}
                                            <Text style={{ paddingLeft: 5, fontSize: 9, color: colors.ash, padding: 0, top: 0, paddingTop: 0, fontFamily: 'Poppins_400Regular', paddingRight: 3 }}>{item.productbrand.length > 8 ? item.productbrand.split("", 8) : item.productbrand} {item.productbrand.length > 8 ? ".." : ""} <Text style={{ fontSize: 7, color: colors.green }}></Text></Text>
                                            {/* <Text style={{paddingLeft:5,fontSize:10,color:colors.ash,padding:0,top:0,paddingTop:0,fontFamily: 'Poppins_400Regular',letterSpacing:.9}}>204 sells</Text>                       */}
                                            <View style={{ flexDirection: 'row', width: '100%', padding: 4, top: 0, paddingBottom: 2, alignContent: 'center' }}>

                                                <Text style={{ fontSize: 10, color: colors.ash, textDecorationLine: 'line-through', fontFamily: 'Poppins_400Regular' }}>{item.mrp}</Text>

                                                <Text style={{ fontSize: 10, color: "#FF8000", left: 5, fontFamily: 'Poppins_500Medium' }}>Tk.{(parseFloat(item.mrp.replace(",", "")) - (parseFloat(item.mrp.replace(",", "")) * (parseInt(getdiscountproduct) / 100))).toFixed(2)}</Text>

                                            </View>

                                            <View style={{ flexDirection: 'row', width: '100%', paddingTop: 3, bottom: 7 }}>


                                                <View style={{ paddingLeft: 5, flexDirection: 'row', width: '100%', padding: 2, top: 0, paddingBottom: 2, alignContent: 'center' }}>

                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) == 0.00 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/empltystarline.jpg')}
                                                    />

                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) > 0.00 && parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) <= 1.00 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/1star.jpg')}
                                                    />
                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) > 1.00 && parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) <= 2.00 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/2star.jpg')}
                                                    />
                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) > 2.00 && parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) <= 3.00 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/3star.jpg')}
                                                    />
                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) > 3.00 && parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) <= 4.99 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/4star.jpg')}
                                                    />
                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) == 5.00 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/5star.jpg')}
                                                    />

                                                    <Text style={{ fontSize: 9, color: colors.ash, left: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>({item.avgrating == "" || item.avgrating == null || item.avgrating == "0.00" || item.avgrating == "0" ? "0.0" : item.avgrating})</Text>

                                                </View>
                                            </View>
                                            <Pressable style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                <View style={{ top: -169 }}>

                                                </View>

                                            </Pressable>



                                        </Pressable>
                                    ))}
                                </ScrollView>

                            </View>



                            {/* Customer's Review Video start */}

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', top: 5 }}  >

                                <Text style={{ fontSize: 12, color: colors.black, left: 12, width: '50%', fontFamily: 'Poppins_400Regular', letterSpacing: .4, color: colors.dblue }}>Customer's Review</Text>
                                <Pressable style={{ right: 20, width: '50%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', letterSpacing: .4, color: colors.ash, textDecorationLine: 'underline' }} onPress={() => navigation.navigate("CustomerReview", {})}>See all</Text>

                                </Pressable>
                            </View>



                            <View style={{ width: '95%', height: 1, backgroundColor: colors.ash1, top: 9 }}></View>

                            <View style={{ width: '100%', marginTop: 26, marginBottom: 30 }}>

                                <ScrollView
                                    ref={scrollViewRefFour}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    style={{ marginRight: 10 }}
                                    pagingEnabled={true}

                                >

                                    {getReviewImage?.map((data, index) => (
                                        <Pressable
                                            key={index}
                                            activeOpacity={4}
                                            style={[styles.newAdds, { marginLeft: 8, width: ExerciseVideoCardWidth, borderRadius: 5 }]}
                                            // onPress={() => Linking.openURL(data?.clickable_link)}
                                            onPress={() => {
                                                if (data?.clickable_link) {
                                                    Linking.openURL(data.clickable_link);
                                                } else {
                                                    alert('Link not available');
                                                }
                                            }}
                                        >
                                            <View style={{ width: "100%", alignItems: "center", paddingHorizontal: 4, paddingTop: 14, paddingBottom: 8 }}>
                                                <Image
                                                    style={{
                                                        width: '100%',
                                                        height: 150, // adjust height as needed
                                                        borderRadius: 10, // optional, for rounded corners
                                                        resizeMode: 'contain',
                                                    }}
                                                    source={
                                                        data?.review_image && data?.review_image.trim() !== ''
                                                            ? { uri: data?.review_image }
                                                            : require('../assets/fitback/profileIcon.png')
                                                    }
                                                />
                                            </View>
                                            {/* <View style={{ width: "100%", alignItems: "center", paddingHorizontal: 10, paddingTop: 2, paddingBottom: 12 }}>
                                                <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14 }}>Customer</Text>

                                                <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginTop: 4, marginBottom: 4 }}>
                                                    {Array.from({ length: 5 }, (_, i) => (
                                                        <FontAwesome
                                                            key={i}
                                                            name="star"
                                                            size={20}
                                                            color={"gold"}
                                                            style={{ marginRight: 2 }}
                                                        />
                                                    ))}
                                                </View>

                                                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, textAlign: "justify", marginTop: 4 }}>
                                                    Tap image to view review
                                                </Text>
                                            </View> */}
                                        </Pressable>
                                    ))}
                                    {/* {
                                        getAllReview?.map((data, index) => <View key={index} activeOpacity={4}
                                            style={[styles.newAdds, { marginLeft: 8, width: ExerciseVideoCardWidth, borderRadius: 5 }]}
                                        >
                                            <View style={{ width: "100%", alignItems: "center", paddingHorizontal: 4, paddingTop: 14, paddingBottom: 8 }}>
                                                <Image
                                                    style={{
                                                        borderRadius: 100,
                                                        width: 60,
                                                        height: 60,
                                                    }}
                                                    source={
                                                        data?.user_image_upload && data?.user_image_upload.trim() !== ''
                                                            ? { uri: data?.user_image_upload }
                                                            : require('../assets/fitback/profileIcon.png')
                                                    }
                                                />

                                            </View>
                                            <View style={{ width: "100%", alignItems: "center", paddingHorizontal: 10, paddingTop: 2, paddingBottom: 12 }}>
                                                <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14 }}>{data?.user_name}</Text>

                                                <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginTop: 4, marginBottom: 4 }}>
                                                    {Array.from({ length: 5 }, (_, i) => (
                                                        <FontAwesome
                                                            key={i}
                                                            name="star"
                                                            size={20}
                                                            color={i < Math.min(data?.rating || 0, 5) ? "gold" : "#c0c0c0"}
                                                            style={{ marginRight: 2 }}
                                                        />
                                                    ))}

                                                </View>

                                                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, textAlign: "justify", marginTop: 4 }}>{data?.review_text}</Text>


                                            </View>
                                        </View>
                                        )
                                    } */}


                                </ScrollView>

                            </View>

                            {/* Customer's Review end */}





                            {/* Health Mart */}

                            {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', top: 5 }}  >

                                <Text style={{ fontSize: 13, color: colors.black, left: 12, width: '50%', fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.dblue }}>Top Selling Product</Text>
                                <Pressable style={{ right: 20, width: '50%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.ash, textDecorationLine: 'underline' }} onPress={() => navigation.navigate("Heathmart", {})}>See all</Text>

                                </Pressable>
                            </View>



                            <View style={{ width: '95%', height: 1, backgroundColor: colors.ash1, top: 9 }}></View>

                            <View style={{ width: '100%', height: 180, marginTop: 25, marginBottom: 10 }}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    style={{ marginRight: 10 }}
                                >
                                    {estore.reverse().map((item, index) => (

                                        <Pressable key={index} style={[styles.adds, { marginLeft: 8, width: cardWidth, height: 167 }]} onPress={() => navigation.navigate("Heathmart", { others: true, itemdetails: item })}>

                                            <Image resizeMode='contain' style={[styles.addsImg, { width: cardWidth - 2, height: item.productname.length < 20 ? 75 : 60 }]} source={{ uri: item.imagelink != "" ? item.imagelink : "http://drive.google.com/uc?export=view&id=1KSibQ8cZLe5TaZ1fSR-qG3f_-zIE2-Dc" }}></Image>

                                            <Text style={{ color: colors.dblue, fontSize: 9, padding: 4, paddingBottom: 0, paddingTop: 2, fontFamily: 'Poppins_500Medium', paddingRight: 3 }}>{item.productname.length > 42 ? item.productname.split("", 42) : item.productname} {item.productname.length > 42 ? "..." : ""}</Text>


                                            <Text style={{ paddingLeft: 5, fontSize: 9, color: colors.ash, padding: 0, top: 0, paddingTop: 0, fontFamily: 'Poppins_400Regular', paddingRight: 3 }}>{item.productbrand.length > 8 ? item.productbrand.split("", 8) : item.productbrand} {item.productbrand.length > 8 ? ".." : ""} <Text style={{ fontSize: 7, color: colors.green }}></Text></Text>
                                           
                                            <View style={{ flexDirection: 'row', width: '100%', padding: 4, top: 0, paddingBottom: 2, alignContent: 'center' }}>

                                                <Text style={{ fontSize: 10, color: colors.ash, textDecorationLine: 'line-through', fontFamily: 'Poppins_400Regular' }}>{item.mrp}</Text>

                                                <Text style={{ fontSize: 10, color: "#FF8000", left: 5, fontFamily: 'Poppins_500Medium' }}>Tk.{(parseFloat(item.mrp.replace(",", "")) - (parseFloat(item.mrp.replace(",", "")) * (parseInt(getdiscountproduct) / 100))).toFixed(2)}</Text>

                                            </View>

                                            <View style={{ flexDirection: 'row', width: '100%', paddingTop: 3, bottom: 7 }}>


                                                <View style={{ paddingLeft: 5, flexDirection: 'row', width: '100%', padding: 2, top: 0, paddingBottom: 2, alignContent: 'center' }}>

                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) == 0.00 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/empltystarline.jpg')}
                                                    />

                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) > 0.00 && parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) <= 1.00 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/1star.jpg')}
                                                    />
                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) > 1.00 && parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) <= 2.00 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/2star.jpg')}
                                                    />
                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) > 2.00 && parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) <= 3.00 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/3star.jpg')}
                                                    />
                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) > 3.00 && parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) <= 4.99 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/4star.jpg')}
                                                    />
                                                    <Image
                                                        style={{ bottom: 1, width: '60%', height: 15, display: parseFloat(item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating) == 5.00 ? 'flex' : 'none' }}
                                                        resizeMode='contain'
                                                        source={require('../assets/5star.jpg')}
                                                    />

                                                    <Text style={{ fontSize: 9, color: colors.ash, left: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>({item.avgrating == "" || item.avgrating == null || item.avgrating == "0.00" || item.avgrating == "0" ? "0.0" : item.avgrating})</Text>

                                                </View>
                                            </View>
                                            <Pressable style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                <View style={{ top: -169 }}>

                                                </View>

                                            </Pressable>



                                        </Pressable>
                                    ))}
                                </ScrollView>

                            </View> */}



                            {/* Feature Product*/}

                            {/* <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',top:5}}  >
                                
                                <Text style={{fontSize:13,color:colors.black,left:12,width:'50%'}}>Top Doctor</Text>
                                <Pressable style={{right:20,width:'50%',flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                                    <Text style={{fontSize:12,fontFamily: 'Poppins_400Regular',letterSpacing:.9,color:colors.ash,width:50,textDecorationLine:'underline'}} onPress={() => navigation.navigate("MakeAppoinment",{getDoctordata:getProductdata})}>See all</Text>
                                  
                                </Pressable>
                            </View>

                            

                            <View style={{width:'95%',height:1,backgroundColor:colors.ash1,top:9}}></View>
                
                            <View style={{width:'100%',height:150,marginTop:25,marginBottom:10}}>
                            <ScrollView 
                                horizontal={true} 
                                showsHorizontalScrollIndicator={false}
                                // pagingEnabled
                               scrollEventThrottle={16}
                               style={{marginRight:10}}
                            >
                            {getProductdata1.map((item,index) => (

                            <Pressable key={item.id} activeOpacity={4}  style={[styles.adds,{marginLeft:8,width:cardWidth}]} onPress={()=> navigation.navigate("DoctorInfo",{doctorprofile: item})}>
                                 
                            <Image  resizeMode='cover'  style={[styles.addsImg,{width:cardWidth-2}]} source={{uri: item.imagelink != "" ? item.imagelink : "http://drive.google.com/uc?export=view&id=1KSibQ8cZLe5TaZ1fSR-qG3f_-zIE2-Dc"}}></Image> 

                            <Text style={{fontWeight:'400',color:colors.black,fontSize:10,padding:3,paddingLeft:5,}}>{item.medicinename.length > 14 ? item.medicinename.split("",14): item.medicinename} {item.medicinename.length > 14 ? "...": ""}</Text>
                                       <Text style={{paddingLeft:5,fontWeight:'400',fontSize:10,color:colors.ash,padding:2,top:0,paddingTop:0,}}>{item.genericname.length > 14 ? item.genericname.split("",14): item.genericname} {item.genericname.length > 14 ? "...": ""}</Text>
                                       <Text style={{paddingLeft:5,fontWeight:'400',fontSize:10,color:colors.ash,padding:2,top:0,paddingTop:0,}}>{item.companyname.length > 14 ? item.companyname.split("",14): item.companyname} {item.companyname.length > 14 ? "...": ""}</Text>

                                           <View style={{paddingLeft:5,flexDirection:'row',width:'100%',padding:2,top:0}}>
           
                                               <Text style={{fontWeight:'400',fontSize:10,color:colors.ash,textDecorationLine:'line-through'}}>{item.regularunitprice}</Text>
                                               
                                               <Text style={{fontWeight:'400',fontSize:10,color:colors.black,left:5}}>{(item.regularunitprice - (item.regularunitprice * (getdiscount / 100))).toFixed(2)} TK  </Text>
           
                                           </View> 
                            <Pressable style={{justifyContent:'flex-end',alignItems:'flex-end'}}>
                                <View style={{top:-169}}>
                                    
                                </View>
                                
                            </Pressable>
                            
                            
                            
                       </Pressable>
                       ))}
                        </ScrollView>

                </View> */}




                        </View>

                    </ScrollView>

                </View>

                <View style={{ top: 200, left: '12.5%', position: 'absolute', width: '75%', height: 80, borderRadius: 8, justifyContent: 'center', alignItems: 'center', display: cartmsg ? "flex" : 'none' }}>

                    <View style={{ width: '100%', height: 80, zIndex: 0, opacity: 0.7, backgroundColor: colors.ash3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 10, fontSize: 14, letterSpacing: .9, fontFamily: 'Poppins_500Medium', color: colors.white }}>Item added to the cart</Text>
                    </View>

                </View>


                <View style={{ top: 200, left: '12.5%', position: 'absolute', width: '75%', height: 80, borderRadius: 8, justifyContent: 'center', alignItems: 'center', display: savemsg ? "flex" : 'none' }}>

                    <View style={{ width: '100%', height: 80, zIndex: 0, opacity: 0.7, backgroundColor: colors.ash3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 10, fontSize: 14, letterSpacing: .9, fontFamily: 'Poppins_500Medium', color: colors.white }}>Item added to favourites</Text>
                    </View>

                </View>


                <View style={{ top: 200, left: '12.5%', position: 'absolute', width: '75%', height: 80, borderRadius: 8, justifyContent: 'center', alignItems: 'center', display: rsavemsg ? "flex" : 'none' }}>

                    <View style={{ width: '100%', height: 80, zIndex: 0, opacity: 0.7, backgroundColor: colors.ash3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 10, fontSize: 14, letterSpacing: .9, fontFamily: 'Poppins_500Medium', color: colors.white }}>Item removed from favourites</Text>
                    </View>

                </View>

                <View style={{ top: 200, left: '12.5%', position: 'absolute', width: '75%', height: 80, borderRadius: 8, justifyContent: 'center', alignItems: 'center', display: minorder ? "flex" : 'none' }}>

                    <View style={{ width: '100%', height: 80, zIndex: 0, opacity: 0.7, backgroundColor: colors.ash3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 10, fontSize: 14, letterSpacing: .9, fontFamily: 'Poppins_500Medium', color: colors.white }}>Minimum number of quantity reached.</Text>
                    </View>

                </View>

                {/* <View style={{top:200,left:'12.5%',position:'absolute',width:'75%',height:80,borderRadius:8,justifyContent:'center',alignItems:'center',display: nointernet ? "flex" : 'none'}}>
                           
                            <View style={{width:'100%',height:80,zIndex:0,opacity: 0.7,backgroundColor:colors.ash3,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{marginLeft:10,fontSize:14,letterSpacing:.9,fontFamily: 'Poppins_500Medium',color:colors.white}}>No internet connection</Text>
                            </View>

                        </View> */}

            </View >

            <View style={[styles.footerStyle]}>

                <View style={{ width: '100%', height: 69, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: colors.white }}>

                    <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: "#EE426D", borderBottomWidth: 5 }]} onPress={() => navigation.navigate("Homepage", {})}>

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

                        {/* <Image resizeMode={'cover'} style={{ width: 24, height: 24 }} source={require("../assets/fitback/chatIcon.png")} />
                        <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
                        <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>Chat</Text> */}

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
                            {/* <Image resizeMode={'cover'} style={{ width: 36, height: 36, transform: [{ scale: scaleAnim }] }} source={require("../assets/fitback/chatIcon.png")} /> */}
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
                        {/* <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>Chat</Text> */}

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

        </SafeAreaView >
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

    ImgContainer: {

        width: "100%",
        height: 209,
        // top:182

    },

    language: {
        flex: 1,

        backgroundColor: "#3C709E",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 5,
        width: 75,
        height: 30


    },
    tuchabluebutton: {
        width: "35%",
        height: 34,
        borderRadius: 2,
        //  backgroundColor:colors.black,
        justifyContent: "center",
        alignItems: 'center',
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
    label: {
        fontSize: 20,
        marginBottom: 10,
    },
    buttonStyle: {
        // backgroundColor: '#F0F0F0',
        // borderRadius: 8,
        width: 55,
        height: 55,
        // paddingTop:20,
        // marginBottom:50,
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderWidth: 1,
        // borderColor: '#ccc',
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: 50,
    },
    inputStyle: {
        fontSize: 40,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        textAlign: 'center',
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
        height: 145,

        borderColor: colors.ash1,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: colors.white,


        shadowColor: '#000',
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 6,
    },

    newAdds: {
        width: "100%",

        // borderColor: colors.ash1,
        // borderWidth: 1,
        // borderRadius: 4,
        backgroundColor: colors.white,


        shadowColor: '#000',
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 10
    },

    newAddsTwo: {
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
    },

    addsImg: {
        width: '100%',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        height: 70,
    },
    addstext: {
        width: '100%',
        height: 70,

    },
    flatdetails: {
        // paddingLeft:0,
        // width:'100%',
        // marginTop:10

        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        paddingLeft: 10,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        // height: 180,
        borderRadius: 6,
        resizeMode: "stretch",
        // backgroundColor:"#fff",
        borderWidth: 1
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: width * 0.95,
        // height: height * 0.6,
        height: height * 0.327,
        // height: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
    },
    video: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    closeButton: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        backgroundColor: '#EE416C',
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'center',
    },

});

export default Homepage;