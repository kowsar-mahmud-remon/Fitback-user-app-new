import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { Animated, FlatList, Dimensions, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Alert } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { UserContext } from '../../components/CredintailsContext';

import InputSpinner from "react-native-input-spinner";

//asyn-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

function Heathmart({ navigation, route }) {
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

    // const [unread, setUnread] = useState(false);

    // const [getnotify, setGetnotify] = useState(true);
    const { authtoken, setAuthtoken } = useContext(UserContext);

    // const [city, setCity] = useState(null);
    // const [area, setArea] = useState(null);
    // const [filter, setFilter] = useState(null);
    const [minorder, setMinorder] = useState(false);
    const [savelist, setSavelist] = useState([]);
    const { testCredentials, setTestCredentials } = useContext(UserContext);
    const [lan, setLan] = useState(true);

    const [canreview, setCanreview] = useState(false);
    const [seeReview, setSeeReview] = useState(false);
    const [reviewlist, setReviewlist] = useState([]);


    const [userid, setUserid] = useState(testCredentials.userid);

    const [discountprice, setDiscountprice] = useState(0.00);
    const [discountprice1, setDiscountprice1] = useState(0.00);
    const [regularPrice, setRegularPrice] = useState(0.00);

    // const [notallow, setNotallow] = useState(testCredentials.userid == 0 ? true : false);

    const [productNumber, setProductNumber] = useState(1);

    // const [getdiscount, setGetdiscount] = useState(null);


    const [location, setLocation] = useState(true);
    const [Name, setName] = useState(null);
    const [phonenumber, setPhonenumber] = useState(null);

    const [cartmsg, setCartmsg] = useState(false);
    const [savemsg, setSavemsg] = useState(false);
    const [rsavemsg, setRsavemsg] = useState(false);

    // const [notify, setNotify] = useState(testCredentials.notify);
    const [cartbuy, setCartbuy] = useState(testCredentials.cartbuy);
    // const [cartrent, setCartrent] = useState(testCredentials.cartrent);
    // const [productsave, setProductsave] = useState(testCredentials.productsave);
    // const [flatsave, setflatsave] = useState(testCredentials.flatsave);

    //const [x,setX] = useState(null);
    let x = "";
    // const [filterview, setFilterview] = useState(route.params.filter);

    const fadeAnim = useRef(new Animated.Value(0)).current;


    // let screenWidth = Dimensions.get('window').width / 2 - 30;
    // let screenHight = Dimensions.get('window').height;

    const fadeIn1 = () => {


        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start(() => { setSavemsg(false); });

    };

    // const testr = () => {
    //     setRsavemsg(false);
    // };

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



    const [minvalue, setMinvalue] = useState(route.params.minvalue);
    const [maxvalue, setMaxvalue] = useState(route.params.maxvalue);
    // const [offer, setOffer] = useState(route.params.offer);


    // const [locationflag, setLocationflag] = useState(false);
    const [showdetails, setShowdetails] = useState(false);

    // const [getFlTreesetGetTree] = useState(true);

    const [getProduct, setGetProduct] = useState(true);
    // const [getProductdata,setGetProductdata] =useState([]);
    const { getProductdata, setGetProductdata } = useContext(UserContext);
    const { getdiscountproduct, setGetdiscountproduct } = useContext(UserContext);


    // const [FilterID, setFilterID] = useState(null);
    const [details, setDetails] = useState([]);

    const [search, setSearch] = useState("");
    const [searchFlag, setSearchFlag] = useState(false);

    // const [animate, setAnimate] = useState(true);


    // const [text, setText] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [isLoading123, setLoading123] = useState(true);

    const [nointernet, setNointernet] = useState(false);
    const [isLoading1, setLoading1] = useState(false);
    // const [showsearch, setShowsearch] = useState(false);

    const [getFlat, setGetFlat] = useState(true);
    // const [getFlatdata, setGetFlatdata] = useState([]);

    // const [nodata, setNodata] = useState(true);


    const [newReviewlist, setNewReviewlist] = useState([]);
    const [newRattinglist, setNewRattinglist] = useState([]);
    const [newjsonuserid, setNewjsonuserid] = useState([]);

    const [newAvgRatting, setNewAvgRatting] = useState('0.0');

    const [myrating, setMyrating] = useState("");



    const [pressstar1, setPressstar1] = useState(false);
    const [pressstar2, setPressstar2] = useState(false);
    const [pressstar3, setPressstar3] = useState(false);
    const [pressstar4, setPressstar4] = useState(false);
    const [pressstar5, setPressstar5] = useState(false);

    const [tempstore, setTempstore] = useState([]);

    // const [babysub, seBabysub] = useState(false);

    // const [getelecteic, setGetElecteic] = useState([]);
    const [getplants, setGetplants] = useState([]);
    const [getplantsfilter, setGetplantsfilter] = useState([]);

    // const [submit, setSubmit] = useState(false);

    const [getindoorfilter, setGetindoorfilter] = useState([]);
    const [getoutdoorfilter, setGetoutdoorfilter] = useState([]);
    const [getshowpisfilter, setGetshowpisfilter] = useState([]);
    const [getrentablefilter, setGetrentablefilter] = useState([]);
    const [gettobfilter, setGettobfilter] = useState([]);

    // const [getpackage, setGetpackage] = useState([]);
    const [arrayloading, setArrayloading] = useState(true);
    // const [getall,setGetall] =useState(testCredentials.flatsave);

    const { getall, setGetall } = useContext(UserContext);

    const [personal, setPersonal] = useState([]);
    const [device, setDevice] = useState([]);
    const [women, setWomen] = useState([]);
    const [baby, setBaby] = useState([]);
    const [sexual, setSexual] = useState([]);
    const [herbal, setHerbal] = useState([]);
    const [supplements, setSupplements] = useState([]);
    const [diabetic, setDiabetic] = useState([]);
    const [orthopedic, setOrthopedic] = useState([]);

    const [babycare, setBabycare] = useState([]);
    const [babyfood, setBabyfood] = useState([]);
    const [daiper, setDaiper] = useState([]);

    const [adaiper, setAdaiper] = useState([]);


    // const [getallf,setGetallf] =useState(testCredentials.flatsave);
    const { getallf, setGetallf } = useContext(UserContext);

    const [personalf, setPersonalf] = useState([]);
    const [devicef, setDevicef] = useState([]);
    const [womenf, setWomenf] = useState([]);
    const [babyf, setBabyf] = useState([]);
    const [sexualf, setSexualf] = useState([]);
    const [herbalf, setHerbalf] = useState([]);
    const [supplementsf, setSupplementsf] = useState([]);
    const [diabeticf, setDiabeticf] = useState([]);
    const [orthopedicf, setOrthopedicf] = useState([]);

    const [babycaref, setBabycaref] = useState([]);
    const [babyfoodf, setBabyfoodf] = useState([]);
    const [daiperf, setDaiperf] = useState([]);

    const [adaiperf, setAdaiperf] = useState([]);


    const [beautyf, setBeautyf] = useState([]);
    const [beauty, setBeauty] = useState([]);


    const [groceriesf, setGroceriesf] = useState([]);
    const [groceries, setGroceries] = useState([]);


    const [householdf, setHouseholdf] = useState([]);
    const [household, setHousehold] = useState([]);

    const [wipesf, setWipesf] = useState([]);
    const [wipes, setWipes] = useState([]);

    const [cerealf, setCerealf] = useState([]);
    const [cereal, setCereal] = useState([]);


    const [freshnerf, setFreshnerf] = useState([]);
    const [freshner, setFreshner] = useState([]);

    const [cleaningf, setCleaningf] = useState([]);
    const [cleaning, setCleaning] = useState([]);


    const [olivef, setOlivef] = useState([]);
    const [olive, setOlive] = useState([]);


    const [honeyf, setHoneyf] = useState([]);
    const [honey, setHoney] = useState([]);


    const [skinf, setSkinf] = useState([]);
    const [skin, setSkin] = useState([]);

    const [nailsf, setNailsf] = useState([]);
    const [nails, setNails] = useState([]);


    const [hairf, setHairf] = useState([]);
    const [hair, setHair] = useState([]);


    const [insecticidessf, setInsecticidessf] = useState([]);
    const [insecticidess, setInsecticidess] = useState([]);

    const [pregnancyf, setPregnancyf] = useState([]);
    const [pregnancy, setPregnancy] = useState([]);

    const [hygienef, setHygienef] = useState([]);
    const [hygiene, setHygiene] = useState([]);

    const [opt, setOp] = useState(true);
    const [opt1, setOp1] = useState(false);
    const [opt2, setOp2] = useState(false);
    const [opt3, setOp3] = useState(false);
    const [opt4, setOp4] = useState(false);
    const [opt5, setOp5] = useState(false);
    const [opt6, setOp6] = useState(false);
    const [opt7, setOp7] = useState(false);
    const [opt8, setOp8] = useState(false);
    const [opt9, setOp9] = useState(false);
    const [opt10, setOp10] = useState(false);


    const [optbaby, setOpbaby] = useState(true);
    const [opt1baby, setOp1baby] = useState(false);
    const [opt2baby, setOp2baby] = useState(false);
    const [opt3baby, setOp3baby] = useState(false);
    const [opt4baby, setOp4baby] = useState(false);
    const [opt5baby, setOp5baby] = useState(false);

    const [opt1feminine, setOp1feminine] = useState(false);
    const [opt2feminine, setOp2feminine] = useState(false);

    const [opt1house, setOp1house] = useState(false);
    const [opt2house, setOp2house] = useState(false);
    const [opt3house, setOp3house] = useState(false);

    const [opt1griceries, setOp1griceries] = useState(false);
    const [opt2griceries, setOp2griceries] = useState(false);

    const [opt1beauty, setOp1beauty] = useState(false);
    const [opt2beauty, setOp2beauty] = useState(false);
    const [opt3beauty, setOp3beauty] = useState(false);

    const [beautyflag, setBeautyflag] = useState(false);
    const [griceriesflag, setGriceriesflag] = useState(false);
    const [houseflag, setHouseflag] = useState(false);
    const [feminineflag, setFeminineflag] = useState(false);
    const [babyflag, setBabyflag] = useState(false);

    const [checkSave, setCheckSave] = useState(true);

    const Allcancell = () => {

        setBeautyflag(false);
        setGriceriesflag(false);
        setHouseflag(false);
        setFeminineflag(false);
        setBabyflag(false);

        setOp(false);
        setOp1(false);
        setOp2(false);
        setOp3(false);
        setOp4(false);
        setOp5(false);
        setOp6(false);
        setOp7(false);
        setOp8(false);
        setOp9(false);
        setOp10(false);

        setOpbaby(false);
        setOp1baby(false);
        setOp2baby(false);
        setOp3baby(false);
        setOp4baby(false);
        setOp5baby(false);

        setOp1feminine(false);
        setOp2feminine(false);

        setOp1house(false);
        setOp2house(false);
        setOp3house(false);

        setOp1griceries(false);
        setOp2griceries(false);

        setOp1beauty(false);
        setOp2beauty(false);
        setOp3beauty(false);

    };



    const addbuytocart = (tytle, regularPrice, discountPrice, image) => {

        // console.log(tytle, regularPrice, discountPrice, image);

        cartbuy.map((item, index) => {

            if ((item.productid == details.id) && (item.type == "healthmart")) {

                cartbuy.splice(index, 1);

            }

        });

        cartbuy.push({ productid: details.id, image: image, tytle: tytle, regularPrice: regularPrice, discountPrice: discountPrice, quantity: productNumber, totalprice: parseFloat(discountPrice) * parseFloat(productNumber), totalregularPrice: parseFloat(regularPrice) * parseFloat(productNumber), type: "healthmart", ptype: "none", power: "none" });

        persistUser({ userid: userid, notify: testCredentials.natify, lan: true, raddress: testCredentials.raddress, cartbuy: cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });

        setCartmsg(true);

        fadeIn3();

    };

    const ProductInfo = async () => {
        try {
            if (getProduct) {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://qwikit1.pythonanywhere.com/product', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        // setGetProductdata(json.reverse())
                        setGetProductdata(json);
                        setNointernet(false);
                        setGetall(json);
                        setGetallf(json);


                    })
                    .catch((error) => {
                        console.error(error);
                        setNointernet(true);
                        setLoading1(false);
                    });


            }

            // console.log("hit");
        }
        catch (error) {
            console.error(error);
            setLoading1(false);
        }

        finally {

            setLoading123(false);

        }

        setGetProduct(false);


    };

    const setDetailsdata = (item) => {

        UserInfo();

        setCanreview(false);
        setNewAvgRatting(parseFloat(item.avgrating).toFixed(1));
        if (tempstore == []) {

            item.jsonuserid != null ? item.jsonuserid.map((item, index) => {
                if (item.userid == userid) {
                    setCanreview(true);
                    // console.log("true")
                }
            }) : "";
        }

        else {
            let x = 0;
            tempstore.map((data) => {

                // console.log("i am here",item.id,data.productid)
                if (data.productid == item.id) {

                    x = 1;
                }
                else {

                }
            });

            if (x == 0) {
                item.jsonuserid != null ? item.jsonuserid.map((item, index) => {
                    if (item.userid == userid) {
                        setCanreview(true);
                        // console.log("true")
                    }
                }) : "";
            }
            else {

                setCanreview(false);
            }
        }

        setReviewlist(item.jsonreview != null ? item.jsonreview.reverse() : []);


        setNewReviewlist(item.jsonreview != null ? item.jsonreview.reverse() : []);
        setNewRattinglist(item.jsonrating != null ? item.jsonrating : []);
        setNewjsonuserid(item.jsonuserid != null ? item.jsonuserid : []);

        setDetails(item);
        setDiscountprice(((parseFloat(item.mrp) - parseFloat(item?.discount || 0))).toFixed(2));

        setDiscountprice1(((parseFloat(item.mrp) - parseFloat(item?.discount || 0))).toFixed(2));

        setRegularPrice(item.mrp);

        checkSaveproduct(item);

        setShowdetails(true);
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

    const addproducttosave = (avgrating, productbrand, productid, image, tytle, regularPrice, discountPrice) => {

        let x = 0;

        savelist.map((item, index) => {

            if ((item.productid == details.id) && (item.type == "healthmart")) {

                x = 1;
            }
        });

        if (x == 0) {
            savelist.push({ productid: productid, image: image, tytle: tytle, productbrand: productbrand, avgrating: avgrating, regularPrice: regularPrice, discountPrice: discountPrice, type: "healthmart" });

            // persistUser({userid:userid,lan:true,raddress: testCredentials.raddress,cartbuy: testCredentials.cartbuy ,cartrent: testCredentials.cartrent,productsave: productsave,flatsave: testCredentials.flatsave })

            setSavelist(savelist);

            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                body: JSON.stringify({
                    savelist: savelist,
                })
            };

            fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
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


        fadeIn2();

        setCheckSave(true);

    };



    const SubmitReview = () => {

        tempstore.push({ productid: details.id });



        if (additional != "") {
            newReviewlist.push({ review: additional, userid: userid });
        }

        newRattinglist.push({ rating: myrating, review: additional, userid: userid });

        newjsonuserid.map((item, index) => {

            if ((item.userid == userid)) {
                newjsonuserid.splice(index, 1);
            }
        });

        let newavgratting = 0;
        let totalreview = 0;
        let totalnumber = 0;

        newRattinglist.map((item, index) => {

            totalreview = parseFloat(item.rating) + totalreview;
            totalnumber = totalnumber + 1;
        });

        newavgratting = parseFloat(totalreview / totalnumber).toFixed(1);

        setNewAvgRatting(newavgratting);



        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({
                avgrating: newavgratting,
                jsonuserid: newjsonuserid,
                jsonreview: newReviewlist,
                jsonrating: newRattinglist
            })
        };

        fetch('https://qwikit1.pythonanywhere.com/product/' + details.id, requestOptions)
            .then((response) => response.json())
            .then((json) => {

                setCanreview(false);

            })
            .catch((error) => {
                setLoading1(false);
                console.error(error);
                setNointernet(true);
            });

    };


    const checkSaveproduct = (data) => {

        if (savelist === undefined) {

        }
        else {
            savelist.map((item, index) => {

                if ((item.productid == data.id) && (item.type == "healthmart")) {
                    setCheckSave(false);
                }

            });
        }


    };

    const [userData, setUserData] = useState();

    const UserInfo = () => {

        if (getFlat) {

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
                    setPhonenumber(json.phonenumber);
                    setLocation(json.area ? json.streetaddress + ", " + json.area + ", " + json.city + " " + json.postcode : null);
                    setSavelist(json.savelist == null ? [] : json.savelist);
                })
                .catch((error) => {
                    setNointernet(true);
                });
        }
        setLoading(false);
        setGetFlat(false);
    };


    const [checkdata, setCheckdata] = useState(true);

    const Getdata = () => {
        if (checkdata) {

            if (route.params.filter == true) {

                {
                    getProductdata.map((item, index) => {

                        if (item.catagory == 2) {
                            if (parseInt(item.discountPrice) >= parseInt(minvalue) && parseInt(item.discountPrice) <= parseInt(maxvalue)) {

                                getplants.push(item);
                                getplantsfilter.push(item);


                                if (item.subcatagory == 1) {
                                    getindoor.push(item);
                                    getindoorfilter.push(item);
                                }

                                if (item.subcatagory == 2) {
                                    getoutdoor.push(item);
                                    getoutdoorfilter.push(item);
                                }

                                if (item.subcatagory == 3) {
                                    getshowpis.push(item);
                                    getshowpisfilter.push(item);
                                }

                                if (item.subcatagory == 4) {
                                    gettob.push(item);
                                    gettobfilter.push(item);
                                }

                                if (item.rentstatus) {
                                    getrentable.push(item);
                                    getrentablefilter.push(item);
                                }

                            }

                        }

                    });
                }

            }
            else {

                {
                    getProductdata.map((item, index) => {
                        ///
                        getall.push(item);
                        getallf.push(item);
                        ///

                        if (item.category == "Adult") {
                            personal.push(item);
                            personalf.push(item);

                            // adaiper
                            // adaiperf


                            if (item.subcategory == "Diaper") {
                                adaiper.push(item);
                                adaiperf.push(item);
                            }

                        }

                        if (item.category == "Orthopedic") {

                            orthopedic.push(item);
                            orthopedicf.push(item);

                        }

                        if (item.category == "Feminine") {
                            women.push(item);
                            womenf.push(item);

                            if (item.subcategory == "Hygiene") {
                                hygiene.push(item);
                                hygienef.push(item);
                            }

                            if (item.subcategory == "Pregnancy") {
                                pregnancy.push(item);
                                pregnancyf.push(item);
                            }

                        }

                        if (item.category == "Baby") {
                            baby.push(item);
                            babyf.push(item);

                            if (item.subcategory == "Baby Care") {
                                babycare.push(item);
                                babycaref.push(item);
                            }
                            if (item.subcategory == "Wipes") {
                                wipes.push(item);
                                wipesf.push(item);
                            }

                            if (item.subcategory == "Milk / Formula") {
                                babyfood.push(item);
                                babyfoodf.push(item);
                            }
                            if (item.subcategory == "Cereal") {
                                cereal.push(item);
                                cerealf.push(item);
                            }

                            if (item.subcategory == "Diaper") {
                                daiper.push(item);
                                daiperf.push(item);
                            }

                        }

                        // unknown
                        if (item.category == 6) {
                            sexual.push(item);
                            sexualf.push(item);

                        }


                        if (item.category == "Herbal") {
                            herbal.push(item);
                            herbalf.push(item);

                        }

                        if (item.category == "Nutrition") {
                            supplements.push(item);
                            supplementsf.push(item);

                        }

                        if (item.category == "Diabetes") {
                            diabetic.push(item);
                            diabeticf.push(item);

                        }


                        if (item.category == "Household") {
                            household.push(item);
                            householdf.push(item);

                            if (item.subcategory == "Air Freshner") {
                                freshner.push(item);
                                freshnerf.push(item);
                            }
                            if (item.subcategory == "Insecticidess") {
                                insecticidess.push(item);
                                insecticidessf.push(item);
                            }
                            if (item.subcategory == "Cleaning") {
                                cleaning.push(item);
                                cleaningf.push(item);
                            }

                        }


                        if (item.category == "Groceries") {
                            groceries.push(item);
                            groceriesf.push(item);

                            if (item.subcategory == "Olive Oil") {
                                olive.push(item);
                                olivef.push(item);
                            }
                            if (item.subcategory == "Honey") {
                                honey.push(item);
                                honeyf.push(item);
                            }

                        }


                        if (item.category == "Beauty") {
                            beauty.push(item);
                            beautyf.push(item);

                            if (item.subcategory == "Skin") {
                                skin.push(item);
                                skinf.push(item);
                            }
                            if (item.subcategory == "Hair") {
                                hair.push(item);
                                hairf.push(item);
                            }
                            if (item.subcategory == "Nails") {
                                nails.push(item);
                                nailsf.push(item);
                            }

                        }


                        if (item.category == 9) {

                            device.push(item);
                            devicef.push(item);

                        }

                    });
                }
            }



        }
        setArrayloading(false);
        setCheckdata(false);

    };

    const searchFilter = (text) => {


        if (text) {
            const newData = getall.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setGetallf(newData);

            setSearch(text);
        }
        else {

            setGetallf(getall);
            setSearch(text);
        }




        if (text) {
            const newData = personal.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase() || item.genericname ? item.genericname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setPersonalf(newData);

            setSearch(text);
        }
        else {

            setPersonalf(personal);
            setSearch(text);
        }




        if (text) {
            const newData = device.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setDevicef(newData);

            setSearch(text);
        }
        else {

            setDevicef(device);
            setSearch(text);
        }




        if (text) {
            const newData = women.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setWomenf(newData);

            setSearch(text);
        }
        else {

            setWomenf(women);
            setSearch(text);
        }




        if (text) {
            const newData = baby.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setBabyf(newData);

            setSearch(text);
        }
        else {

            setBabyf(baby);
            setSearch(text);
        }






        if (text) {
            const newData = sexual.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setSexualf(newData);

            setSearch(text);
        }
        else {

            setSexualf(sexual);
            setSearch(text);
        }


        if (text) {
            const newData = herbal.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setHerbalf(newData);

            setSearch(text);
        }
        else {

            setHerbalf(herbal);
            setSearch(text);
        }



        if (text) {
            const newData = supplements.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setSupplementsf(newData);

            setSearch(text);
        }
        else {

            setSupplementsf(supplements);
            setSearch(text);
        }

        if (text) {
            const newData = diabetic.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setDiabeticf(newData);

            setSearch(text);
        }
        else {

            setDiabeticf(diabetic);
            setSearch(text);
        }

        if (text) {
            const newData = orthopedic.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setOrthopedicf(newData);

            setSearch(text);
        }
        else {

            setOrthopedicf(orthopedic);
            setSearch(text);
        }

        // sub baby

        if (text) {
            const newData = babycare.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setBabycaref(newData);

            setSearch(text);
        }
        else {

            setBabycaref(babycare);
            setSearch(text);
        }

        if (text) {
            const newData = babyfood.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setBabyfoodf(newData);

            setSearch(text);
        }
        else {

            setBabyfoodf(babyfood);
            setSearch(text);
        }

        if (text) {
            const newData = daiper.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setDaiperf(newData);

            setSearch(text);
        }
        else {

            setDaiperf(daiper);
            setSearch(text);
        }



        if (text) {
            const newData = adaiper.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setAdaiperf(newData);

            setSearch(text);
        }
        else {

            setAdaiperf(adaiper);
            setSearch(text);
        }


        if (text) {
            const newData = hygiene.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setHygienef(newData);

            setSearch(text);
        }
        else {

            setHygienef(hygiene);
            setSearch(text);
        }


        if (text) {
            const newData = pregnancy.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setPregnancyf(newData);

            setSearch(text);
        }
        else {

            setPregnancyf(pregnancy);
            setSearch(text);
        }


        if (text) {
            const newData = wipes.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setWipesf(newData);

            setSearch(text);
        }
        else {

            setWipesf(wipes);
            setSearch(text);
        }


        if (text) {
            const newData = cereal.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setCerealf(newData);

            setSearch(text);
        }
        else {

            setCerealf(cereal);
            setSearch(text);
        }


        if (text) {
            const newData = freshner.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setFreshnerf(newData);

            setSearch(text);
        }
        else {

            setFreshnerf(freshner);
            setSearch(text);
        }


        if (text) {
            const newData = insecticidess.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setInsecticidessf(newData);

            setSearch(text);
        }
        else {

            setInsecticidessf(insecticidess);
            setSearch(text);
        }


        if (text) {
            const newData = cleaning.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setCleaningf(newData);

            setSearch(text);
        }
        else {

            setCleaningf(cleaning);
            setSearch(text);
        }


        if (text) {
            const newData = olive.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setOlivef(newData);

            setSearch(text);
        }
        else {

            setOlivef(olive);
            setSearch(text);
        }


        if (text) {
            const newData = honey.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setHoneyf(newData);

            setSearch(text);
        }
        else {

            setHoneyf(honey);
            setSearch(text);
        }


        if (text) {
            const newData = skin.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setSkinf(newData);

            setSearch(text);
        }
        else {

            setSkinf(skin);
            setSearch(text);
        }


        if (text) {
            const newData = nails.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setNailsf(newData);

            setSearch(text);
        }
        else {

            setNailsf(nails);
            setSearch(text);
        }


        if (text) {
            const newData = hair.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setHairf(newData);

            setSearch(text);
        }
        else {

            setHairf(hair);
            setSearch(text);
        }

        if (text) {
            const newData = beauty.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setBeautyf(newData);

            setSearch(text);
        }
        else {

            setBeautyf(beauty);
            setSearch(text);
        }



        if (text) {
            const newData = groceries.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setGroceriesf(newData);

            setSearch(text);
        }
        else {

            setGroceriesf(groceries);
            setSearch(text);
        }



        if (text) {
            const newData = household.filter((item) => {
                const itemData = item.productname ? item.productname.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setHouseholdf(newData);

            setSearch(text);
        }
        else {

            setHouseholdf(household);
            setSearch(text);
        }







    };

    const [getpromo, setGetpromo] = useState(true);

    const OutsideDetails = () => {

        if (getpromo) {

            // console.log("heoolo")


            // console.log(route.params.itemdetails)

            setDetailsdata(route.params.itemdetails);

            setGetpromo(false);
        }

    };

    const [sgetplants, setsGetplants] = useState([]);

    const [additional, setAdditional] = useState("");

    const renderItem = useCallback(({ item, index }) => (

        <View style={{ width: "48%" }} key={index} >
            <View key={index} style={{ justifyContent: 'flex-start', alignItems: 'center', width: "100%" }}>


                <View style={{ paddingLeft: 2, paddingRight: 2, width: "100%" }}>



                    <Pressable disabled={item.mrp == "" || item.mrp == null || item.mrp == "0" || item.mrp == "0.0" || item.mrp == "0.00" ? true : false} activeOpacity={4} style={[styles.adds, { shadowColor: showdetails ? colors.white : colors.white, shadowOffset: { width: 1.5, height: 1.5 }, shadowOpacity: 0.8, elevation: 6, }]} onPress={() => (showdetails ? setShowdetails(false) : setDetailsdata(item))} >

                        <Image resizeMode='contain' style={[styles.addsImg, { height: item.productname.length < 25 ? 113 : 100 }]} source={{ uri: item.image1 != "" ? item.image1 : "http://drive.google.com/uc?export=view&id=1KSibQ8cZLe5TaZ1fSR-qG3f_-zIE2-Dc" }}></Image>

                        <Text style={{ color: colors.dblue, fontSize: 9, padding: 4, paddingBottom: 0, paddingTop: 2, fontFamily: 'Poppins_500Medium', paddingRight: 3 }}>{item.productname.length > 42 ? item.productname.split("", 42) : item.productname} {item.productname.length > 42 ? "..." : ""}</Text>

                        <Text style={{ paddingLeft: 5, fontSize: 9, color: colors.ash, padding: 0, top: 0, paddingTop: 0, fontFamily: 'Poppins_400Regular', paddingRight: 3 }}>{item.productbrand.length > 8 ? item.productbrand.split("", 8) : item.productbrand} {item.productbrand.length > 8 ? ".." : ""} <Text style={{ fontSize: 7, color: colors.green }}></Text></Text>
                        <View style={{ flexDirection: 'row', width: '100%', padding: 4, top: 0, paddingBottom: 2, alignContent: 'center' }}>

                            <Text style={{ fontSize: 10, color: colors.ash, textDecorationLine: 'line-through', fontFamily: 'Poppins_400Regular' }}>{parseFloat(item.mrp.replace(",", ""))}</Text>

                            {/* <Text style={{ fontSize: 10, color: "#FF8000", left: 5, fontFamily: 'Poppins_500Medium' }}>Tk.{(parseFloat(item.mrp.replace(",", "")) - (parseFloat(item.mrp.replace(",", "")) * (parseInt(getdiscountproduct) / 100))).toFixed(2)}</Text> */}

                            <Text style={{ fontSize: 10, color: "#FF8000", left: 5, fontFamily: 'Poppins_500Medium' }}>Tk.{(
                                parseFloat(item.mrp.replace(",", "")) -
                                // parseFloat((item.discount).replace(",", ""))
                                parseFloat(String(details?.discount || 0).replace(",", ""))
                            ).toFixed(2)}</Text>

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
                            <View style={{ top: -183 }}>

                            </View>

                        </Pressable>



                    </Pressable>
                    <View style={{ width: '100%', height: 8, }}></View>
                </View>

            </View>
        </View>
    ), []);

    useEffect(() => {

        ProductInfo();
        // NotificationCheck()
        UserInfo();
        // FlatInfo()
        // console.log("personalf: ",orthopedicf)
        // console.log("isLoading123",isLoading123,getProductdata.length)
        // if(isLoading123 == false){
        //     Getdata()
        // }
        if (getProductdata.length > 0) {
            Getdata();
            // console.log(getallf)
        }

        if (route.params.others) {

            // if(route.params.itemdetails.length == 1){
            OutsideDetails();
            // }

            // setDetailsdata(route.params.item)
        }
        // console.log("newjsonuserid",newjsonuserid)
        // console.log("newRattinglist",newRattinglist)
        // console.log("newReviewlist",newReviewlist)

        // console.log(opt3baby)
        // if(additional.length > 2){
        //     setSubmit(true)
        // }
        // else{
        //     setSubmit(false)
        // }
        // console.log(tempstore)
    });


    const handleScroll = (event) => {
        const positionX = event.nativeEvent.contentOffset.x;
        const positionY = event.nativeEvent.contentOffset.y;
    };
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

                        <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Product </Text>

                    </View>



                </View>

                <View style={{ width: '100%', marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Pressable disabled={showdetails ? false : true} style={[styles.searchview, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]} onPress={() => setShowdetails(false)}>

                        <TextInput
                            style={styles.input}
                            placeholder='Search product'
                            // onChangeText={newTest => setSearch(newTest)}
                            onChangeText={(text) => searchFilter(text)}
                            defaultValue={search}
                            value={search}
                            editable={showdetails ? false : true}
                            underlineColorAndroid="transparent"

                        />
                        <Pressable style={{ width: '8%', height: '65%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start', left: 10 }} onPress={() => setSearchFlag(true)}>
                            <Icon name="search" size={20} color='#065540' />
                        </Pressable>

                        {/* <Pressable style={{width:60,justifyContent:'center',alignItems:'center'}} onPress={() => navigation.navigate("ComonFilter",{plantspage : true,minvalue:minvalue,maxvalue:maxvalue,offer:offer}) }>
                        <Filter  style={{display: maxvalue ? 'none' : 'flex'}}/>
                        <Filter1  style={{display: maxvalue ? 'flex' : 'none'}} />
                    </Pressable> */}
                    </Pressable>

                </View>


                <View style={[styles.body1, { justifyContent: 'flex-start', alignItems: 'center', top: 10 }]}>




                    {isLoading1 ? <ActivityIndicator size="large" color="#2D6A8D" style={{ left: 100, top: 100 }} /> :
                        <View style={{ width: '100%', flexDirection: 'row' }}>



                            {/* for All */}
                            <View style={{ width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 0, opacity: showdetails ? 0.25 : 1 }}>

                                <Pressable disabled={showdetails ? false : true} style={{ width: '100%', height: 33, justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 8, display: opt || opt6 || opt10 || opt8 || opt7 || opt9 ? 'none' : 'flex' }} onPress={() => setShowdetails(false)}>


                                    <ScrollView
                                        horizontal={true}
                                        style={{ display: babyflag ? 'flex' : 'none' }}
                                        showsHorizontalScrollIndicator={false}

                                        scrollEventThrottle={0}
                                    >

                                        {/* baby sub section */}

                                        <Pressable style={{ marginLeft: 15, flexDirection: 'row', borderRadius: 4, width: 85, height: 33, backgroundColor: opt1baby ? "#FFEDE8" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { Allcancell(), setOp1baby(true), setBabyflag(true); }}>


                                            <Text style={{ fontSize: 10, color: colors.text, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Baby Care</Text>

                                        </Pressable>
                                        <Pressable style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 100, height: 33, backgroundColor: opt2baby ? "#FFEDE8" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { Allcancell(), setOp2baby(true), setBabyflag(true); }}>


                                            <Text style={{ fontSize: 10, color: colors.text, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Milk/Formula</Text>

                                        </Pressable>
                                        <Pressable style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 80, height: 33, backgroundColor: opt3baby ? "#FFEDE8" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { Allcancell(), setOp3baby(true), setBabyflag(true); }}>


                                            <Text style={{ fontSize: 10, color: colors.text, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Diaper</Text>

                                        </Pressable>
                                        <Pressable style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 80, height: 33, backgroundColor: opt4baby ? "#FFEDE8" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { Allcancell(), setOp4baby(true), setBabyflag(true); }}>


                                            <Text style={{ fontSize: 10, color: colors.text, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Wipes</Text>

                                        </Pressable>
                                        <Pressable style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 80, height: 33, backgroundColor: opt5baby ? "#FFEDE8" : colors.white, justifyContent: 'center', alignItems: 'center', marginRight: 13 }} onPress={() => { Allcancell(), setOp5baby(true), setBabyflag(true); }}>


                                            <Text style={{ fontSize: 10, color: colors.text, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Cereal</Text>

                                        </Pressable>


                                    </ScrollView>

                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        style={{ display: feminineflag ? 'flex' : 'none' }}

                                        scrollEventThrottle={0}
                                    >

                                        {/* feminine sub section */}

                                        <Pressable style={{ marginLeft: 15, flexDirection: 'row', borderRadius: 4, width: 85, height: 33, backgroundColor: opt1feminine ? "#FFEDE8" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { Allcancell(), setOp1feminine(true), setFeminineflag(true); }}>


                                            <Text style={{ fontSize: 10, color: colors.text, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Hygiene</Text>

                                        </Pressable>
                                        <Pressable style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 100, height: 33, backgroundColor: opt2feminine ? "#FFEDE8" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { Allcancell(), setOp2feminine(true), setFeminineflag(true); }}>


                                            <Text style={{ fontSize: 10, color: colors.text, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Pregnancy</Text>

                                        </Pressable>


                                    </ScrollView>

                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        style={{ display: houseflag ? 'flex' : 'none' }}

                                        scrollEventThrottle={0}
                                    >

                                        {/* HouseHolds sub section */}

                                        <Pressable style={{ marginLeft: 15, flexDirection: 'row', borderRadius: 4, width: 100, height: 33, backgroundColor: opt1house ? "#FFEDE8" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { Allcancell(), setOp1house(true), setHouseflag(true); }}>


                                            <Text style={{ fontSize: 10, color: colors.text, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Air Freshner</Text>

                                        </Pressable>
                                        <Pressable style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 110, height: 33, backgroundColor: opt2house ? "#FFEDE8" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { Allcancell(), setOp2house(true), setHouseflag(true); }}>


                                            <Text style={{ fontSize: 10, color: colors.text, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Insecticides</Text>

                                        </Pressable>
                                        <Pressable style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 80, height: 33, backgroundColor: opt3house ? "#FFEDE8" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { Allcancell(), setOp3house(true), setHouseflag(true); }}>


                                            <Text style={{ fontSize: 10, color: colors.text, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Cleaning</Text>

                                        </Pressable>


                                    </ScrollView>

                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        style={{ display: griceriesflag ? 'flex' : 'none' }}

                                        scrollEventThrottle={0}
                                    >

                                        {/* Griceries sub section */}

                                        <Pressable style={{ marginLeft: 15, flexDirection: 'row', borderRadius: 4, width: 85, height: 33, backgroundColor: opt1griceries ? "#FFEDE8" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { Allcancell(), setOp1griceries(true), setGriceriesflag(true); }}>


                                            <Text style={{ fontSize: 10, color: colors.text, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Olive Oil</Text>

                                        </Pressable>
                                        <Pressable style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 85, height: 33, backgroundColor: opt2griceries ? "#FFEDE8" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { Allcancell(), setOp2griceries(true), setGriceriesflag(true); }}>


                                            <Text style={{ fontSize: 10, color: colors.text, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Honey</Text>

                                        </Pressable>
                                    </ScrollView>

                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        style={{ display: beautyflag ? 'flex' : 'none' }}

                                        scrollEventThrottle={0}
                                    >


                                        {/* Beauty sub section */}

                                        <Pressable style={{ marginLeft: 15, flexDirection: 'row', borderRadius: 4, width: 85, height: 33, backgroundColor: opt1beauty ? "#FFEDE8" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { Allcancell(), setOp1beauty(true), setBeautyflag(true); }}>


                                            <Text style={{ fontSize: 10, color: colors.text, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Skin</Text>

                                        </Pressable>
                                        <Pressable style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 85, height: 33, backgroundColor: opt2beauty ? "#FFEDE8" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { Allcancell(), setOp2beauty(true), setBeautyflag(true); }}>


                                            <Text style={{ fontSize: 10, color: colors.text, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Nails</Text>

                                        </Pressable>
                                        <Pressable style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 80, height: 33, backgroundColor: opt3beauty ? "#FFEDE8" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { Allcancell(), setOp3beauty(true), setBeautyflag(true); }}>


                                            <Text style={{ fontSize: 10, color: colors.text, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Hair</Text>

                                        </Pressable>



                                    </ScrollView>
                                </Pressable>

                                {/* <View 
                              style={{width:'100%'}}

                           > */}



                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>


                                    <FlatList
                                        columnWrapperStyle={{ justifyContent: 'space-around' }}
                                        data={getallf}
                                        // data={opt ? getallf : opt1 ? beautyf : opt2 ? householdf : opt3 ? womenf : opt4 ? babyf : opt5 ? groceriesf : opt6 ? herbalf : opt7 ? supplementsf : opt8 ? diabeticf : opt9 ? personalf : opt10 ? orthopedicf :
                                        //     opt1baby ? babycaref : opt2baby ? babyfoodf : opt3baby ? daiperf : opt4baby ? wipesf : opt5baby ? cerealf :
                                        //         opt1feminine ? hygienef : opt2feminine ? pregnancyf :
                                        //             opt1house ? freshnerf : opt2house ? insecticidessf : opt3house ? cleaningf :
                                        //                 opt1griceries ? olivef : opt2griceries ? honeyf :
                                        //                     opt1beauty ? skinf : opt2beauty ? nailsf : hairf}

                                        style={{ width: '98%', top: 0 }}
                                        keyExtractor={(item, index) => index}
                                        initialNumToRender={7}
                                        // keyExtractor={ (item, index) => index.toString }
                                        numColumns={2}

                                        //    refreshing={loading}
                                        renderItem={renderItem}

                                    />

                                    {/* </View> */}
                                </View>
                            </View>














                            {/* sub baby */}














                            {/* for empty Crat list */}
                            {arrayloading ? <ActivityIndicator size="large" color="#2D6A8D" style={{ paddingTop: 100 }} /> :

                                <ScrollView style={{ width: '100%', height: '100%', marginTop: 10, display: getplants.length == 0 && nointernet == false ? 'flex' : 'none' }}>
                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>


                                        {/* <View style={{width:'100%',marginTop:40,justifyContent:'center',alignItems:'center'}}>
                            <NosearchFound/>
                            <Text style={{fontSize:14,fontWeight:'700',color:colors.black}}>No Search Found</Text>
                            <Text style={{fontSize:12,fontWeight:'400',color:colors.ash,marginTop:10}}>Let’s check our trendy <Text style={{fontSize:12,fontWeight:'400',textDecorationLine:'underline',color:colors.ash}} onPress={()=>navigation.navigate("PagkageDecoration",{})}>decoration items</Text> </Text>
                        </View> */}



                                    </View>
                                </ScrollView>

                            }

                        </View>




                    }

                </View>


                {/* no internet  */}

                <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', marginBottom: 350, display: nointernet ? 'flex' : 'none' }}>
                    {/* <Nointernet/> */}
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.black, marginTop: 10 }}>No Internet Connection</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.ash, marginTop: 10 }}>Please check you internet connection <Text style={{ fontSize: 12, fontWeight: '400', textDecorationLine: 'underline', color: colors.ash }} onPress={() => { setLoading123(true), setLoading1(true), setGetProduct(true), setCheckdata(true); }}>try again</Text> </Text>
                </View>

                {/* show details */}
                {/* <ScrollView style={{width:'100%'}}> */}
                <View style={{ backgroundColor: colors.body, width: '100%', justifyContent: 'flex-start', alignItems: 'center', display: showdetails ? 'flex' : 'none', marginBottom: 0, flex: 4 }}>


                    <View activeOpacity={4} style={[{ width: '95%', alignItems: 'center', justifyContent: 'flex-start', borderWidth: 1, backgroundColor: colors.white, borderColor: colors.green, borderRadius: 4 }]}>



                        <ScrollView style={{ width: '100%' }}>
                            <View style={{ justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>


                                <Image resizeMode='contain' style={[styles.addsImg, { borderWidth: 1, marginTop: 8, height: 180, width: '80%' }]} source={{ uri: details.image1 != "" ? details.image1 : "http://drive.google.com/uc?export=view&id=1KSibQ8cZLe5TaZ1fSR-qG3f_-zIE2-Dc" }}></Image>

                                {/* <Pressable  style={{top:4,left:4,height: 22 ,width:22,position:'absolute'}} onPress={()=> {setCheckSave(true),setShowdetails(false),setProductNumber(1)}}>
                                        
                                        <Image resizeMode={'cover'} style={{width:22 ,height:22}}  source={require("../assets/cross.jpg")} />

                                    </Pressable> */}

                                <View style={{ position: 'absolute', width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                                    <Pressable style={{ top: 4, right: 6, height: 22, width: 22 }} onPress={() => { setCheckSave(true), setShowdetails(false), setProductNumber(1); }}>

                                        <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/cross.jpg")} />

                                    </Pressable>

                                </View>

                                <View style={[styles.addstext, { width: '94%', marginBottom: 100 }]} >


                                    <Text style={{ fontFamily: 'Poppins_500Medium', letterSpacing: .9, color: colors.dblue, fontSize: 14, padding: 8, paddingBottom: 0 }}>{details.productname}</Text>

                                    <Text style={{ paddingLeft: 10, fontFamily: 'Poppins_500Medium', letterSpacing: .9, fontSize: 12, color: colors.ash, padding: 4, top: 0, marginTop: 0, }}>Brand Name: {details.productbrand}       Unit: {details.quantity}</Text>

                                    <Text style={{ paddingLeft: 10, fontWeight: '400', fontSize: 12, color: colors.ash, padding: 4, top: 0, marginTop: 0, }}></Text>

                                    <View style={{ paddingLeft: 10, flexDirection: 'row', width: '100%', padding: 4, top: 0, paddingBottom: 0 }}>

                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 14, color: colors.ash, textDecorationLine: 'line-through', bottom: 20 }}>{parseFloat(String(details.mrp))} TK</Text>

                                        {/* <Text style={{ fontFamily: 'Poppins_500Medium', letterSpacing: .9, fontSize: 14, color: colors.oranget, left: 10, bottom: 20 }}>{(parseFloat(String(details.mrp).replace(",", "")) - (parseFloat(String(details.mrp).replace(",", "")) * (parseInt(getdiscountproduct) / 100))).toFixed(2)} TK</Text> */}

                                        <Text style={{ fontFamily: 'Poppins_500Medium', letterSpacing: .9, fontSize: 14, color: colors.oranget, left: 10, bottom: 20 }}> {(
                                            parseFloat(String(details.mrp).replace(",", "")) -
                                            parseFloat(String(details?.discount || 0).replace(",", ""))
                                        ).toFixed(2)} TK</Text>

                                    </View>

                                </View>



                                <View style={{ marginTop: 45, right: 0, flexDirection: 'row', justifyContent: 'flex-start', width: '90%', bottom: 80 }}>

                                    <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, color: colors.black, top: 4, color: colors.dblue, paddingTop: 10 }}>Qty:</Text>

                                    <View style={{ left: 10, paddingBottom: 40 }}>



                                        <InputSpinner
                                            max={500}
                                            min={1}
                                            step={1}
                                            colorMax="#EE416C"
                                            colorMin="#EE416C"
                                            value={productNumber}
                                            onChange={value => { setProductNumber(value), setDiscountprice((value * parseFloat(discountprice1)).toFixed(2)), setRegularPrice((value * parseFloat(parseFloat(String(details.mrp).replace(",", "")))).toFixed(2)); }}

                                            onMax={(isMax, msg) => {
                                                console.log(isMax, msg);
                                                setMinorder(true);
                                                fadeIn7();
                                            }}

                                            buttonStyle={styles.buttonStyle}
                                        // buttonTextStyle={styles.buttonText}
                                        // buttonFontSize={20} 
                                        />
                                    </View>

                                    {/* <View style={{paddingLeft:10,flexDirection:'row',width:'100%',padding:4,top:20,paddingBottom:0,left:20}}>
                    
                                        <Text style={{fontWeight:'400',fontSize:14,color:colors.ash,textDecorationLine:'line-through',bottom:20}}>{regularPrice}</Text>
                                                        
                                        <Text style={{fontWeight:'400',fontSize:14,color:colors.black,left:10,bottom:20}}>{discountprice} Tk</Text>
                    
                                    </View> */}





                                </View>


                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', bottom: 70, left: 20 }}>
                                    <Pressable style={{ backgroundColor: "#EE416C", borderRadius: 16, width: 120, height: 35, justifyContent: 'center', alignItems: 'center' }} onPress={() => addbuytocart(details.productname, parseFloat(String(details.mrp).replace(",", "")), discountprice1, details.image1, 1, true)}>
                                        <Text style={{ color: colors.white, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12 }}>Add to Cart</Text>
                                    </Pressable>

                                    <Pressable style={{ flexDirection: 'row', left: 30, backgroundColor: "#EE416C", borderRadius: 16, width: 120, height: 35, justifyContent: 'center', alignItems: 'center', display: checkSave ? "none" : 'flex' }} onPress={() => removeproducttosave()}>
                                        <Image
                                            style={{ width: 20, height: 20, right: 5 }}
                                            resizeMode='contain'
                                            source={require('../assets/favourite_selected.jpg')}
                                        />
                                        <Text style={{ color: colors.white, fontFamily: 'Poppins_400Regular', letterSpacing: .9, top: 2, fontSize: 12 }}>Favourite</Text>
                                    </Pressable>


                                    <Pressable style={{ flexDirection: 'row', left: 30, backgroundColor: colors.white1, borderRadius: 6, width: 120, height: 35, justifyContent: 'center', alignItems: 'center', display: checkSave ? "flex" : 'none' }} onPress={() => { addproducttosave(details.avgrating, details.productbrand, details.id, details.image1, details.productname, parseFloat(String(details.mrp).replace(",", "")), parseFloat(String(details.mrp).replace(",", "")), '1'); }}>
                                        <Image
                                            style={{ width: 20, height: 20, right: 5 }}
                                            resizeMode='contain'
                                            source={require('../assets/favourite_unselected.jpg')}
                                        />
                                        <Text style={{ color: "#EE416C", fontFamily: 'Poppins_400Regular', letterSpacing: .9, top: 2, fontSize: 12 }}>Favourite</Text>
                                    </Pressable>




                                </View>

                                {/* canreview */}
                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', bottom: 80, marginTop: 20, marginBottom: 20, display: canreview ? 'flex' : 'none' }}>
                                    <View style={{ left: 20 }}>

                                        <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 12 }]}>Give your review</Text>

                                    </View>
                                    <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                                        <Pressable style={{ width: 20, height: 20 }} onPress={() => { setMyrating(1.00), setPressstar1(true), setPressstar2(false), setPressstar3(false), setPressstar4(false), setPressstar5(false); }}>
                                            <Image
                                                style={{ width: 20, height: 20, display: pressstar1 ? 'none' : 'flex' }}
                                                resizeMode='contain'
                                                source={require('../assets/emtstar.jpg')}
                                            />
                                            <Image
                                                style={{ width: 20, height: 20, display: pressstar1 ? 'flex' : 'none' }}
                                                resizeMode='contain'
                                                source={require('../assets/fullstar.jpg')}
                                            />
                                        </Pressable>
                                        <Pressable style={{ width: 20, height: 20 }} onPress={() => { setMyrating(2.00), setPressstar1(true), setPressstar2(true), setPressstar3(false), setPressstar4(false), setPressstar5(false); }}>
                                            <Image
                                                style={{ width: 20, height: 20, display: pressstar2 ? 'none' : 'flex' }}
                                                resizeMode='contain'
                                                source={require('../assets/emtstar.jpg')}
                                            />
                                            <Image
                                                style={{ width: 20, height: 20, display: pressstar2 ? 'flex' : 'none' }}
                                                resizeMode='contain'
                                                source={require('../assets/fullstar.jpg')}
                                            />
                                        </Pressable>
                                        <Pressable style={{ width: 20, height: 20 }} onPress={() => { setMyrating(3.00), setPressstar1(true), setPressstar2(true), setPressstar3(true), setPressstar4(false), setPressstar5(false); }}>
                                            <Image
                                                style={{ width: 20, height: 20, display: pressstar3 ? 'none' : 'flex' }}
                                                resizeMode='contain'
                                                source={require('../assets/emtstar.jpg')}
                                            />
                                            <Image
                                                style={{ width: 20, height: 20, display: pressstar3 ? 'flex' : 'none' }}
                                                resizeMode='contain'
                                                source={require('../assets/fullstar.jpg')}
                                            />
                                        </Pressable>
                                        <Pressable style={{ width: 20, height: 20 }} onPress={() => { setMyrating(4.00), setPressstar1(true), setPressstar2(true), setPressstar3(true), setPressstar4(true), setPressstar5(false); }}>
                                            <Image
                                                style={{ width: 20, height: 20, display: pressstar4 ? 'none' : 'flex' }}
                                                resizeMode='contain'
                                                source={require('../assets/emtstar.jpg')}
                                            />
                                            <Image
                                                style={{ width: 20, height: 20, display: pressstar4 ? 'flex' : 'none' }}
                                                resizeMode='contain'
                                                source={require('../assets/fullstar.jpg')}
                                            />
                                        </Pressable>
                                        <Pressable style={{ width: 20, height: 20 }} onPress={() => { setMyrating(5.00), setPressstar1(true), setPressstar2(true), setPressstar3(true), setPressstar4(true), setPressstar5(true); }}>
                                            <Image
                                                style={{ width: 20, height: 20, display: pressstar5 ? 'none' : 'flex' }}
                                                resizeMode='contain'
                                                source={require('../assets/emtstar.jpg')}
                                            />
                                            <Image
                                                style={{ width: 20, height: 20, display: pressstar5 ? 'flex' : 'none' }}
                                                resizeMode='contain'
                                                source={require('../assets/fullstar.jpg')}
                                            />
                                        </Pressable>
                                    </View>

                                    <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', display: pressstar1 || pressstar2 || pressstar3 || pressstar4 || pressstar5 ? 'flex' : 'none' }}>
                                        <View style={[styles.inputdiv, { height: 60, marginTop: 35 }]}>

                                            <TextInput
                                                style={[styles.input, { borderColor: "#C7C8D2", height: 60, borderWidth: 1, paddingLeft: 10 }]}
                                                onChangeText={newTest => setAdditional(newTest)}
                                                placeholder="type your comments"
                                                multiline={true}
                                            />

                                            <Pressable style={{ width: '30%', justifyContent: 'center', alignItems: 'center', height: 20, marginTop: 10, backgroundColor: colors.dblue }} onPress={() => SubmitReview()}>
                                                <Text style={{ color: colors.white, fontFamily: 'Poppins_500Medium', letterSpacing: .9, top: 1, fontSize: 12 }}>SUBMIT</Text>
                                            </Pressable>

                                        </View>
                                    </View>


                                </View>


                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', bottom: 90, marginTop: 30, marginBottom: 10, display: canreview ? 'none' : 'flex' }}>
                                    {/* <View style={{left:20}}>

                                            <Text style={[{color:colors.text,fontFamily: 'Poppins_400Regular',letterSpacing:.9,display : lan ? 'flex' : 'none'}]}>Rating ({ newAvgRatting == "" || newAvgRatting == null ? 0.00 : newAvgRatting})</Text>

                                        </View> */}
                                    <View style={{ width: '100%', marginTop: 5, justifyContent: 'flex-start', alignItems: 'center', left: 20, flexDirection: 'row' }}>
                                        <Image
                                            style={{ width: 130, height: 40, display: parseFloat(newAvgRatting == "" || newAvgRatting == null ? 0.00 : newAvgRatting) == 0.00 ? 'flex' : 'none' }}
                                            resizeMode='contain'
                                            source={require('../assets/empltystarline.jpg')}
                                        />

                                        <Image
                                            style={{ width: 130, height: 40, display: parseFloat(newAvgRatting == "" || newAvgRatting == null ? 0.00 : newAvgRatting) > 0.00 && parseFloat(newAvgRatting == "" || newAvgRatting == null ? 0.00 : newAvgRatting) <= 1.00 ? 'flex' : 'none' }}
                                            resizeMode='contain'
                                            source={require('../assets/1star.jpg')}
                                        />
                                        <Image
                                            style={{ width: 130, height: 40, display: parseFloat(newAvgRatting == "" || newAvgRatting == null ? 0.00 : newAvgRatting) > 1.00 && parseFloat(newAvgRatting == "" || newAvgRatting == null ? 0.00 : newAvgRatting) <= 2.00 ? 'flex' : 'none' }}
                                            resizeMode='contain'
                                            source={require('../assets/2star.jpg')}
                                        />
                                        <Image
                                            style={{ width: 130, height: 40, display: parseFloat(newAvgRatting == "" || newAvgRatting == null ? 0.00 : newAvgRatting) > 2.00 && parseFloat(newAvgRatting == "" || newAvgRatting == null ? 0.00 : newAvgRatting) <= 3.00 ? 'flex' : 'none' }}
                                            resizeMode='contain'
                                            source={require('../assets/3star.jpg')}
                                        />
                                        <Image
                                            style={{ width: 130, height: 40, display: parseFloat(newAvgRatting == "" || newAvgRatting == null ? 0.00 : newAvgRatting) > 3.00 && parseFloat(newAvgRatting == "" || newAvgRatting == null ? 0.00 : newAvgRatting) <= 4.99 ? 'flex' : 'none' }}
                                            resizeMode='contain'
                                            source={require('../assets/4star.jpg')}
                                        />
                                        <Image
                                            style={{ width: 130, height: 40, display: parseFloat(newAvgRatting == "" || newAvgRatting == null ? 0.00 : newAvgRatting) == 5.00 ? 'flex' : 'none' }}
                                            resizeMode='contain'
                                            source={require('../assets/5star.jpg')}
                                        />


                                        {/* <Text style={[{top:3,color:colors.green,fontFamily: 'Poppins_400Regular',letterSpacing:.9,display : lan ? 'flex' : 'none',left:20,fontSize:12}]}> ({ newAvgRatting == "" || newAvgRatting == null ? 0.00 : newAvgRatting})  240 sells</Text> */}


                                    </View>

                                    <View style={{ left: 20, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10 }}>

                                        <Text style={[{ color: colors.blue, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 12, textDecorationLine: 'underline' }]} onPress={() => seeReview ? setSeeReview(false) : setSeeReview(true)} >See all {details.jsonreview != null ? details.jsonreview.length > 1 ? details.jsonreview.length + " reviews" : details.jsonreview.length + " review" : '0 review'} </Text>

                                        <View style={{ width: '90%', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, borderWidth: 1, borderColor: colors.white1, display: seeReview && reviewlist.length != 0 ? 'flex' : 'none' }}>


                                            {
                                                reviewlist.map((item, index) => (

                                                    <View key={index} style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 5, marginBottom: 8, marginLeft: 8 }}>

                                                        <Text style={[{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', fontSize: 12 }]}>{index + 1}. {item.review}</Text>

                                                    </View>


                                                ))}
                                        </View>

                                    </View>


                                </View>

                                <View style={{ paddingLeft: 10, width: '100%', padding: 4, top: 20, left: 0, paddingRight: 10 }}>

                                    <Text style={{ fontSize: 13, color: colors.dblue, left: 10, bottom: 100, fontFamily: 'Poppins_500Medium', letterSpacing: .9 }}>Details</Text>
                                    <Text style={{ marginTop: 15, fontSize: 12, color: colors.ash, left: 10, bottom: 100, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>{details.details}</Text>

                                </View>

                                {/* <Pressable style={{marginTop:10,borderRadius:4,width:'55%',height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#065540',bottom:20}} onPress={()=> addbuytocart(details.productname,parseInt(details.mrp.replace(",", "")), details.app,details.imagelink,1,true)}>
                                        
                                        <Text style={{color:colors.white,fontSize:14,fontWeight:'700'}}>Add to Cart</Text>            
                                    
                                    </Pressable> */}

                            </View>
                        </ScrollView>
                    </View>


                </View>


                <View style={{ position: 'absolute', width: '75%', height: 80, borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', display: cartmsg ? "flex" : 'none' }}>

                    <View style={{ width: '100%', height: 80, zIndex: 0, opacity: 0.7, backgroundColor: colors.ash3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 10, fontSize: 14, letterSpacing: .9, fontFamily: 'Poppins_500Medium', color: colors.white }}>Item added to the cart</Text>
                    </View>

                </View>


                <View style={{ position: 'absolute', width: '75%', height: 80, borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', display: savemsg ? "flex" : 'none' }}>

                    <View style={{ width: '100%', height: 80, zIndex: 0, opacity: 0.7, backgroundColor: colors.ash3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 10, fontSize: 14, letterSpacing: .9, fontFamily: 'Poppins_500Medium', color: colors.white }}>Item added to favourites</Text>
                    </View>

                </View>


                <View style={{ position: 'absolute', width: '75%', height: 80, borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', display: rsavemsg ? "flex" : 'none' }}>

                    <View style={{ width: '100%', height: 80, zIndex: 0, opacity: 0.7, backgroundColor: colors.ash3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 10, fontSize: 14, letterSpacing: .9, fontFamily: 'Poppins_500Medium', color: colors.white }}>Item removed from favourites</Text>
                    </View>

                </View>

                <View style={{ position: 'absolute', width: '75%', height: 80, borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', display: minorder ? "flex" : 'none' }}>

                    <View style={{ width: '100%', height: 80, zIndex: 0, opacity: 0.7, backgroundColor: colors.ash3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 10, fontSize: 14, letterSpacing: .9, fontFamily: 'Poppins_500Medium', color: colors.white }}>Minimum number of quantity reached.</Text>
                    </View>

                </View>

                <View style={{ position: 'absolute', width: '75%', height: 80, borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', display: nointernet ? "flex" : 'none' }}>

                    <View style={{ width: '100%', height: 80, zIndex: 0, opacity: 0.7, backgroundColor: colors.ash3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 10, fontSize: 14, letterSpacing: .9, fontFamily: 'Poppins_500Medium', color: colors.white }}>No internet connection</Text>
                    </View>

                </View>


            </View>


            <View style={styles.footerStyle}>

                <View style={{ width: '100%', height: 69, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: colors.white }}>

                    <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.red, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Homepage", {})}>

                        <Image resizeMode={'cover'} style={{ width: 24, height: 24 }} source={require("../assets/fitback/homeIcon.png")} />

                        <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>বাসা অনসন্ধান করুন</Text>
                        <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>HOME</Text>

                    </Pressable>

                    <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: "#EE426D", borderBottomWidth: 5 }]} onPress={() => navigation.navigate("Heathmart", {})}>

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


    tuchabluebuttonf: {
        width: "20%",
        height: '100%',
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: 'center',
    },
    inputdiv: {
        width: "98%",
        height: 40,
        justifyContent: "center",
        alignItems: 'center',
        paddingBottom: 10,

    },
    navbar: {

        // backgroundColor: colors.white,
        // width:'100%',
        // height:40,

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

        width: '94%',
        height: 40,
        top: 3,
        borderColor: colors.ash1,
        borderWidth: 1,
        backgroundColor: '#FFF',
        paddingLeft: 45,
        borderRadius: 3,
        paddingRight: 30,

    },

    input: {
        width: "94%",
        alignItems: 'center',
        //padding:5,
        fontSize: 12,

    },
    adds: {
        width: "100%",
        height: 200,

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
    addsImg: {
        width: '100%',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        // height:70,
    },
    addstext: {
        width: '100%',
        height: 92,

    },
    flatdetails: {
        paddingLeft: 0,
        width: '100%',
        marginTop: 10
    }
});

export default Heathmart;