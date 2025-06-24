import React, { useState, useEffect, useContext } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';

import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";

import { UserContext } from '../../components/CredintailsContext';




import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

function SuccessOrder({ navigation, route }) {

    const { authtoken, setAuthtoken } = useContext(UserContext);
    const [city, setCity] = useState(null);
    const [area, setArea] = useState(null);
    const [filter, setFilter] = useState(null);

    const { testCredentials, setTestCredentials } = useContext(UserContext);
    const [lan, setLan] = useState(true);
    const [userid, setUserid] = useState(testCredentials.userid);


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
    const [getProductdata, setGetProductdata] = useState(null);

    const [allimage, setAllimage] = useState([]);

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

    const ProductInfo = async () => {
        try {
            if (getProduct) {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://qwikmedic.pythonanywhere.com/notification', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {

                        setGetProductdata(json.reverse());


                        setNointernet(false);


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
        } finally {

            setLoading(false);
            setLoading123(false);

        }

        setGetProduct(false);


    };


    const [checkdata, setCheckdata] = useState(true);

    const Getdata = () => {
        if (checkdata) {

            getProductdata.map((item, index) => {
                if (item.userid == userid) {
                    allimage.push(item);
                }
            });
        }
        setArrayloading(false);
        setCheckdata(false);

    };


    const Updatenotification = (itemid, read, move) => {

        if (read == true) {
            move == 1 ? navigation.navigate("Ordermedicine", {}) : navigation.navigate("Notification", {});
        }
        else {

            const requestOptions1 = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                body: JSON.stringify({

                    readstatus: true,

                })
            };

            fetch('https://qwikmedic.pythonanywhere.com/notification/' + itemid, requestOptions1)
                .then((response) => response.json())
                .then((json) => {

                    move == 1 ? navigation.navigate("Ordermedicine", {}) : navigation.navigate("Notification", {});


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

        fetch('https://qwikmedic.pythonanywhere.com/prescription/' + itemid, requestOptions1)
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

        // ProductInfo()


        // if(isLoading123 == false){
        //     Getdata()
        // }


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




                </View>



                <ScrollView style={{ width: '100%', height: '100%' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>

                        <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', bottom: 0 }}>

                            {/* <SuccessFull width={60} height={60} style={{marginTop:100}}/> */}
                            <SvgUri
                                width="60"
                                height="60"
                                style={{ marginTop: 100 }}
                                uri="http://drive.google.com/uc?export=view&id=1BzHhSffwzfRnWbax7q4nP06kJQBYFETx"

                            />

                            <Text style={{ color: colors.ash, fontSize: 18, marginTop: 30, fontFamily: 'Poppins_500Medium' }}>ORDER SUBMITED SUCCESSFULLY.</Text>

                            <Text style={{ color: colors.ash, fontSize: 18, marginTop: 10, fontFamily: 'Poppins_500Medium' }}>THANK YOU.</Text>

                        </View>

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



                    <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.dblue, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Services", {})}>

                        <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/services.jpg")} />
                        <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
                        <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>SERVICES</Text>

                    </Pressable>


                    <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.green, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Heathmart", {})}>

                        <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/estore.jpg")} />
                        <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>বাসা অনসন্ধান করুন</Text>
                        <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>E-STORE</Text>

                    </Pressable>


                    <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.dblue, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Promohome", {})}>

                        <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require('../assets/top_right_promo.jpg')} />
                        <Text style={{ top: 4, color: colors.black, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
                        <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>PROMO</Text>

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
        height: '93%',
        width: '100%'
    },
    footerStyle: {
        height: '7%',
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

export default SuccessOrder;