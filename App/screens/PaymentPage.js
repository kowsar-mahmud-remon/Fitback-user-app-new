import React, { useState, useRef, useEffect, useContext } from 'react';
import { ActivityIndicator, ImageBackground, Animated, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Dimensions } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome';


import { UserContext } from '../../components/CredintailsContext';


function PaymentPage({ navigation, route }) {
    const { authtoken, setAuthtoken } = useContext(UserContext);
    const productlist = [
        { id: 1, pname: "Lorem ipsum is a dum...", qnt: 5, price: 120 },
        { id: 2, pname: "Monogass Tree", qnt: 2, price: 220 },
        { id: 3, pname: "Monogass Tree", qnt: 6, price: 120 },
        { id: 4, pname: "Product Name", qnt: 1, price: 130 },
        { id: 5, pname: "Lorem ipsum is a dum...", qnt: 3, price: 170 },
    ];
    // const [Maindata,setMaindata]=useState(storeData);
    // const[flatid,setFlatid]= useState(route.params.flatid)
    const [flatid, setFlatid] = useState(15);
    // const [getFlatdata, setRecivedData]= useState(route.params.data)
    //    console.log(flatid)
    const [getFlat, setGetFlat] = useState(true);
    const [getFlatdata, setGetFlatdata] = useState([]);

    const [getFlatall, setGetFlatall] = useState(true);
    const [getFlatdataall, setGetFlatdataall] = useState([]);

    const { testCredentials, setTestCredentials } = useContext(UserContext);


    const [lan, setLan] = useState(true);

    const [userid, setUserid] = useState(testCredentials.userid);


    const [cartbuy, setCartbuy] = useState(testCredentials.cartbuy);
    const [cartrent, setCartrent] = useState(testCredentials.cartrent);
    const [productsave, setProductsave] = useState(testCredentials.productsave);
    const [flatsave, setflatsave] = useState(testCredentials.flatsave);

    const [nointernet, setNointernet] = useState(false);
    const [isLoading1, setLoading1] = useState(false);

    const [getTree, setGetTree] = useState(true);
    const [getTreedata, setGetTreedata] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [nodata, setNodata] = useState(true);

    const [productNumber, setProductNumber] = useState(0);


    const [areName, setAreName] = useState();
    const [test, setTest] = useState(false);

    const FlatInfoall = async () => {

        try {
            if (getFlatall) {

                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://ahasanhamza.pythonanywhere.com/flat', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        setGetFlatdataall(json);
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
            setNointernet(true);
            setLoading1(false);
        } finally {
            setLoading(false);
        }

        setGetFlatall(false);

    };

    const TreeInfo = async () => {
        try {
            if (getTree) {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://ahasanhamza.pythonanywhere.com/tree/', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        setGetTreedata(json);
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
        }
        setGetTree(false);

    };

    useEffect(() => {
        // console.log(nodata)
        FlatInfoall();
        TreeInfo();
        // console.log("onChange Counter:",productNumber);


    });


    const FlatInfo = () => {

        if (getFlat) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            };

            fetch('https://ahasanhamza.pythonanywhere.com/tree/' + flatid, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    setGetFlatdata(json);
                    setNointernet(false);
                })
                .catch((error) => {
                    console.error(error);
                    setNointernet(true);
                    setLoading1(false);
                });

            setGetFlat(false);
        }
    };
    FlatInfo();
    const onPressMobileNumberClick = (number) => {

        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }

        Linking.openURL(phoneNumber);
    };
    const viewImg = (img) => {


    };
    let screenWidth = Dimensions.get('window').width - 14;
    let screenHight = Dimensions.get('window').height;

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

                            <Pressable style={{ width: 22, height: 22, right: 0, display: cartbuy == undefined ? '' : cartbuy.length > 0 ? 'none' : 'flex' }} onPress={() => navigation.navigate("Cart", {})} >
                                <Image
                                    style={{ width: 22, height: 22, left: 0, top: 2 }}
                                    resizeMode='contain'
                                    source={require('../assets/ecart.jpg')}
                                />
                            </Pressable>

                            <Pressable style={{ width: 22, height: 22, right: 0, display: cartbuy == undefined ? '' : cartbuy.length > 0 ? 'flex' : 'none' }} onPress={() => navigation.navigate("Cart", {})} >
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
                <View style={styles.navbar}>

                    <Text style={{ left: 55, top: 17, color: colors.black, fontWeight: '700', fontSize: 14, display: lan ? 'none' : 'flex' }} >  বিস্তারিত</Text>
                    <Text style={{ left: 55, top: 17, color: colors.black, fontWeight: '700', fontSize: 14, display: lan ? 'flex' : 'none' }} >  Payment</Text>

                </View>
                <ScrollView style={{ width: '100%' }}>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>


                        <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', left: 0 }}>

                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', borderWidth: 1, borderColor: colors.ash1, borderRadius: 4 }}>
                                <View style={{ width: '100%', height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.ash1 }}>
                                    <Text style={{ fontSize: 14, fontWeight: '700', color: colors.ash, }}>OrderID<Text style={{ color: colors.black }}>#069456</Text></Text>
                                </View>
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    {productlist.map((item, index) => (
                                        <View key={index} style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', width: '94%', height: 70, borderBottomWidth: 1, borderBottomColor: colors.ash1, marginBottom: 0 }}>
                                            <Text style={{ fontSize: 14, color: colors.black, width: '10%' }}>{index + 1}.</Text>
                                            <View style={{ width: '80%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                <Text style={{ fontSize: 14, color: colors.black }}>{item.pname}</Text>
                                                <Text style={{ fontSize: 12, color: colors.ash }}>Unit price:<Text style={{ fontSize: 12, color: colors.ash, fontWeight: '700' }}> {item.price}TK.</Text></Text>
                                            </View>
                                            <Text style={{ fontSize: 14, color: colors.ash, width: '10%' }}><Text style={{ fontSize: 12 }}>X</Text>{item.qnt}</Text>

                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', borderWidth: 1, borderColor: colors.ash1, marginTop: 30, borderRadius: 4 }}>
                                <View style={{ width: '95%', height: 50, justifyContent: 'flex-start', alignItems: 'flex-start', borderBottomWidth: 1, borderBottomColor: colors.ash1, marginBottom: 10 }}>
                                    <Text style={{ fontSize: 14, color: colors.black, fontWeight: '700', top: 15 }}>Summary</Text>
                                </View>
                                <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>

                                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%', height: 40 }}>

                                        <Text style={{ fontSize: 14, color: colors.black, fontWeight: '400', left: 0 }}>Quantity</Text>
                                        <Text style={{ fontSize: 14, color: colors.black, fontWeight: '400', right: 10 }}>12</Text>

                                    </View>
                                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%', height: 40 }}>

                                        <Text style={{ fontSize: 14, color: colors.black, fontWeight: '400', left: 0 }}>Total</Text>
                                        <Text style={{ fontSize: 14, color: colors.black, fontWeight: '400', right: 10 }}>7121 tk</Text>

                                    </View>

                                </View>
                            </View>

                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', borderWidth: 1, borderColor: colors.ash1, marginTop: 30, borderRadius: 4, marginBottom: 40 }}>
                                <View style={{ width: '95%', height: 50, justifyContent: 'flex-start', alignItems: 'flex-start', borderBottomWidth: 1, borderBottomColor: colors.ash1, marginBottom: 10 }}>
                                    <Text style={{ fontSize: 14, color: colors.black, fontWeight: '700', top: 15 }}>Payment</Text>
                                </View>
                                <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>

                                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%', height: 40 }}>

                                        <Text style={{ fontSize: 14, color: colors.black, fontWeight: '400', left: 0 }}>Payment methods</Text>
                                        <Text style={{ fontSize: 14, color: colors.black, fontWeight: '400', right: 10 }}>N/A</Text>

                                    </View>
                                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%', height: 40 }}>

                                        <Text style={{ fontSize: 14, color: colors.black, fontWeight: '400', left: 0 }}>Date</Text>
                                        <Text style={{ fontSize: 14, color: colors.black, fontWeight: '400', right: 10 }}>N/A</Text>

                                    </View>
                                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%', height: 40 }}>

                                        <Text style={{ fontSize: 14, color: colors.black, fontWeight: '400', left: 0 }}>Transaction ID</Text>
                                        <Text style={{ fontSize: 14, color: colors.black, fontWeight: '400', right: 10 }}>N/A</Text>

                                    </View>
                                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%', height: 40 }}>

                                        <Text style={{ fontSize: 14, color: colors.black, fontWeight: '400', left: 0 }}>Satus</Text>
                                        <View style={{ width: 75, justifyContent: 'center', alignItems: 'center', height: 22, backgroundColor: '#F6D5A3' }}>
                                            <Text style={{ fontSize: 12, fontWeight: '700', color: '#F19200' }}>Pending</Text>
                                        </View>

                                    </View>

                                </View>
                            </View>



                        </View>



                    </View>

                </ScrollView>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ borderRadius: 4, width: '90%', height: 30, alignItems: 'center', backgroundColor: '#303030', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: colors.white, fontSize: 14, fontWeight: '400', left: 10 }}>Total Amount</Text>
                        <Text style={{ color: colors.white, fontSize: 14, fontWeight: '400', right: 20 }}>TK 7121</Text>
                    </View>
                    <Pressable style={{ marginTop: 10, borderRadius: 4, width: '90%', height: 45, justifyContent: 'center', alignItems: 'center', borderColor: '#303030', borderWidth: 2 }}>
                        <Text style={{ color: colors.black, fontSize: 14, fontWeight: '700' }}>Pay Now</Text>

                    </Pressable>
                </View>


                <View style={{ width: "90%", height: 155, position: 'absolute' }}>
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: nointernet ? 'flex' : 'none' }}>
                        <Image resizeMode='contain' style={[styles.ImgContainer, { width: 100, height: 100 }]} source={require("../assets/nointernet.jpg")} />

                        <Text style={{ color: colors.blacktext, fontSize: 12, fontWeight: 'bold', display: lan ? 'flex' : 'none' }}>No Internet Connection</Text>
                        <Text style={{ color: colors.blacktext, fontSize: 12, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>ইন্টারনেট সংযোগ নেই </Text>
                        <Pressable disabled={isLoading1} style={[styles.tuchabluebutton, { backgroundColor: isLoading1 ? '#87A9B2' : '#488291', flexDirection: 'row', width: 150 }]} onPress={() => { setLoading1(true), setGetFlat(true); }}>

                            <ActivityIndicator size="small" color="#00263C" style={{ display: isLoading1 ? 'flex' : 'none', right: 10 }} />

                            <Text style={{ color: '#FFF', fontSize: 14, display: lan ? 'none' : 'flex' }}>আবার চেষ্টা করুন</Text>
                            <Text style={{ color: '#FFF', fontSize: 14, display: lan ? 'flex' : 'none' }}>Try Again</Text>
                        </Pressable>
                    </View>
                </View>

            </View>
            <View style={styles.footerStyle}>

                <View style={{ width: '100%', height: 58, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: colors.white }}>

                    <Pressable style={[styles.tuchabluebuttonf]} onPress={() => navigation.navigate("UserLandingPage")}>

                        <Home />
                        <Text style={{ top: 4, color: colors.ash, fontSize: 12, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>বাসা অনসন্ধান করুন</Text>
                        <Text style={{ top: 4, color: colors.ash, fontSize: 12, fontWeight: 'bold', display: lan ? 'flex' : 'none' }}>Home</Text>

                    </Pressable>

                    <Pressable style={[styles.tuchabluebuttonf]} onPress={() => navigation.navigate("PagkageDecoration")}>
                        <Decoration />
                        <Text style={{ top: 4, color: colors.ash, fontSize: 12, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
                        <Text style={{ top: 4, color: colors.ash, fontSize: 12, fontWeight: 'bold', display: lan ? 'flex' : 'none' }}>Decor</Text>

                    </Pressable>

                    <Pressable style={[styles.tuchabluebuttonf]} onPress={() => navigation.navigate("FlatInformationHome", { newflat: true, forrentadd: true })}>
                        <Addrent1 />
                        {/* <Text style={{position:'absolute',top:26,left:38,fontSize:17,color:colors.black}}>+</Text> */}
                    </Pressable>

                    <Pressable style={[styles.tuchabluebuttonf]} onPress={() => navigation.navigate("Cart")}>
                        <Cart style={{ display: cartbuy.length > 0 || cartrent.length > 0 || productsave.length > 0 || flatsave.length > 0 ? 'none' : 'flex' }} />
                        <GCartf style={{ display: cartbuy.length > 0 || cartrent.length > 0 || productsave.length > 0 || flatsave.length > 0 ? 'flex' : 'none' }} />

                        <Text style={{ top: 4, color: colors.ash, fontSize: 12, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>বাসা অনসন্ধান করুন</Text>
                        <Text style={{ top: 4, color: colors.ash, fontSize: 12, fontWeight: 'bold', display: lan ? 'flex' : 'none' }}>Cart</Text>

                    </Pressable>

                    <Pressable style={[styles.tuchabluebuttonf]} onPress={() => navigation.navigate("UserProfileLatest", {})}>
                        <Profile1 />
                        <Text style={{ top: 4, color: colors.black, fontSize: 12, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
                        <Text style={{ top: 4, color: colors.black, fontSize: 12, fontWeight: 'bold', display: lan ? 'flex' : 'none' }}>Profile</Text>

                    </Pressable>



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
        backgroundColor: colors.white,
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
        justifyContent: 'flex-end'
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
        height: 50,

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
        width: 156,
        // borderTopEndRadius:4,
        borderTopLeftRadius: 4,
        height: 104,
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


export default PaymentPage;



