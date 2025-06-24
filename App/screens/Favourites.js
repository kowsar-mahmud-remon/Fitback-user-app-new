import React, { useState, useEffect, useContext, useRef } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, ImageBackground, Alert, Animated } from 'react-native';
import colors from '../config/colors';

import { UserContext } from '../../components/CredintailsContext';

function Favourites({ navigation, route }) {
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


    const { authtoken, setAuthtoken } = useContext(UserContext);


    const { testCredentials, setTestCredentials } = useContext(UserContext);
    const [lan, setLan] = useState(true);
    const [userid, setUserid] = useState(testCredentials.userid);


    const [getProduct, setGetProduct] = useState(true);
    const [getProductdata, setGetProductdata] = useState([]);

    const [allimage, setAllimage] = useState([]);
    const [allimage1, setAllimage1] = useState([]);
    const [allimage2, setAllimage2] = useState([]);
    const [isLoading123, setLoading123] = useState(true);

    const [nointernet, setNointernet] = useState(false);
    const [isLoading1, setLoading1] = useState(false);


    const [nodata, setNodata] = useState(true);

    const [arrayloading, setArrayloading] = useState(true);
    const [fatchloading, setFatchloading] = useState(true);

    const [userData, setUserData] = useState();

    const ProductInfo = async () => {
        try {
            if (getProduct) {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
                    .then((response) => response.json())
                    .then((json) => {

                        setGetProductdata(json.savelist == null ? [] : json.savelist);
                        // console.log(json.savelist)
                        setUserData(json);
                        setNointernet(false);

                        setFatchloading(false);
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

            setLoading123(false);

        }

        setGetProduct(false);


    };


    const [checkdata, setCheckdata] = useState(true);

    const Getdata = () => {
        if (checkdata) {

            getProductdata.map((item, index) => {
                if (item.type == 'medicine') {
                    allimage.push(item);
                }
                else if (item.type == 'healthmart') {
                    allimage1.push(item);
                }
                else if (item.type == 'doctor') {
                    allimage2.push(item);
                }
            });
        }
        setArrayloading(false);
        setLoading1(false);
        setCheckdata(false);

    };

    const [personal, setPersonal] = useState(false);
    const [medical, setMedical] = useState(true);
    const [medical1, setMedical1] = useState(false);


    const removeproducttosave = (productid, type) => {



        getProductdata.map((data, index) => {

            if ((data.productid == productid) && (type == 'medicine')) {
                getProductdata.splice(index, 1);
            }

            if ((data.productid == productid) && (type == 'healthmart')) {
                getProductdata.splice(index, 1);
            }

            if ((data.id == productid) && (type == 'doctor')) {
                getProductdata.splice(index, 1);
            }
        });

        // persistUser({userid:userid,lan:true,raddress: testCredentials.raddress,cartbuy: testCredentials.cartbuy ,cartrent: testCredentials.cartrent,productsave: productsave,flatsave: testCredentials.flatsave })



        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({
                savelist: getProductdata,
            })
        };

        fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
            .then((response) => response.json())
            .then((json) => {

                // console.log('create expance', json);

                navigation.navigate("Homepage", { refFav: true });

                setLoading123(false);


                setNointernet(false);

            })
            .catch((error) => {
                setLoading1(false);
                console.error(error);
                setNointernet(true);
            });

    };


    useEffect(() => {

        ProductInfo();
        // NotificationCheck()
        // FlatInfo()
        if (isLoading123 == false) {
            Getdata();
        }

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

                        <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Favourites </Text>

                    </View>



                </View>




                <View style={[styles.body1, { justifyContent: 'flex-start', alignItems: 'center', top: 10 }]}>


                    {fatchloading ? <ActivityIndicator size="large" color="#2D6A8D" style={{ paddingTop: 100, display: 'none' }} /> : <View style={{ position: 'absolute' }}>
                        <View style={{ display: 'none' }}>
                            <View style={{ display: nodata ? 'flex' : 'none' }}>
                                <Text style={{ display: lan ? 'none' : 'flex', fontSize: 17, fontWeight: 'bold', color: '#982525' }} > কোন ফ্ল্যাট পাওয়া যায়নি!</Text>
                                <Text style={{ display: lan ? 'flex' : 'none', fontSize: 17, fontWeight: 'bold', color: '#982525' }}> No Prescription found!</Text>
                            </View>
                        </View>
                    </View>}

                    {arrayloading ? <ActivityIndicator size="large" color="#2D6A8D" style={{ paddingTop: 100 }} /> :
                        <>



                            {/* medicine */}

                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 0, paddingLeft: 0, display: personal ? 'flex' : 'none', marginBottom: 10 }}>
                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 0 }}>

                                    <FlatList
                                        columnWrapperStyle={{ justifyContent: 'space-around' }}
                                        data={allimage}
                                        style={{ width: '98%', top: 5 }}
                                        keyExtractor={(item, index) => index}
                                        showsVerticalScrollIndicator={false}
                                        // keyExtractor={ (item, index) => index.toString }
                                        numColumns={3}
                                        renderItem={
                                            ({ item, index }) => (

                                                <View key={index} style={{ width: "100%", justifyContent: 'flex-start', alignItems: 'center' }}>



                                                    <View style={{ width: "32%", paddingLeft: 2, paddingRight: 2 }}>
                                                        <Pressable activeOpacity={4} style={[styles.adds, { height: 163 }]}  >

                                                            <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>


                                                                <Pressable style={{ width: 20, height: 20, right: 3, marginTop: 5 }} onPress={() => removeproducttosave(item.productid, item.type)} >
                                                                    <Image
                                                                        style={{ width: 20, height: 20, right: 2, top: 0 }}
                                                                        resizeMode='contain'
                                                                        source={require('../assets/favourite_selected.jpg')}
                                                                    />
                                                                </Pressable>

                                                            </View>

                                                            <Image resizeMode='contain' style={[styles.addsImg, { height: item.tytle.length < 25 ? 50 : 40 }]} source={{ uri: item.image != "" ? item.image : "http://drive.google.com/uc?export=view&id=1KSibQ8cZLe5TaZ1fSR-qG3f_-zIE2-Dc" }}></Image>

                                                            {/* <View style={[styles.addstext,{height}]} > */}

                                                            <Text style={{ color: colors.dblue, fontSize: 9, padding: 4, paddingBottom: 0, paddingTop: 2, paddingLeft: 5, fontFamily: 'Poppins_500Medium', paddingRight: 3 }}>{item.tytle.length > 42 ? item.tytle.split("", 42) : item.tytle} {item.tytle.length > 42 ? "..." : ""}</Text>

                                                            {/* <Text style={{fontFamily: 'Poppins_400Regular',letterSpacing:.2,color:colors.black,fontSize:10,padding:3,paddingLeft:5,}}>{item.medicinename.length > 14 ? item.medicinename.split("",14): item.medicinename} {item.medicinename.length > 14 ? "...": ""}</Text> */}
                                                            <Text style={{ paddingLeft: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .2, fontSize: 9, color: colors.ash, padding: 1, top: 0, paddingTop: 0, paddingRight: 3 }}>{item.genericname.length > 14 ? item.genericname.split("", 14) : item.genericname} {item.genericname.length > 14 ? "..." : ""}</Text>
                                                            <Text style={{ paddingLeft: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .2, fontSize: 9, color: colors.ash, padding: 1, top: 0, paddingTop: 0, paddingRight: 3 }}>{item.companyname.length > 14 ? item.companyname.split("", 14) : item.companyname} {item.companyname.length > 14 ? "..." : ""}</Text>

                                                            <View style={{ paddingLeft: 5, flexDirection: 'row', width: '100%', padding: 0, top: 0 }}>

                                                                <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .2, fontSize: 10, color: colors.ash, textDecorationLine: 'line-through' }}>{item.regularPrice}</Text>

                                                                <Text style={{ letterSpacing: .2, fontSize: 10, color: colors.black, left: 5, color: "#FF8000", fontFamily: 'Poppins_500Medium' }}>Tk. {item.discountPrice}</Text>

                                                            </View>

                                                            {/* </View> */}

                                                            <Pressable style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                                <View style={{ top: -183 }}>

                                                                </View>

                                                            </Pressable>



                                                        </Pressable>
                                                        <View style={{ width: '100%', height: 12, }}></View>
                                                    </View>

                                                </View>

                                            )
                                        }
                                    />
                                    <View style={{ width: '100%', marginTop: 80, justifyContent: 'center', alignItems: 'center', display: allimage.length == 0 && nointernet == false && isLoading123 == false ? 'flex' : 'none' }}>

                                        <Text style={{ fontSize: 14, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.black, marginTop: 10 }}>NO MEDICINE IS SAVED</Text>
                                    </View>
                                </View>
                            </View>


                            {/* for All  E-store*/}
                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 0, display: medical ? 'flex' : 'none', marginBottom: 10 }}>
                                <FlatList
                                    columnWrapperStyle={{ justifyContent: 'space-around' }}
                                    data={allimage1}

                                    style={{ width: '98%', top: 5 }}
                                    keyExtractor={(item, index) => index}
                                    showsVerticalScrollIndicator={false}
                                    numColumns={3}
                                    renderItem={
                                        ({ item, index }) => (

                                            <View key={index} style={{ width: "100%", justifyContent: 'flex-start', alignItems: 'center' }}>


                                                <View style={{ width: "32%", paddingLeft: 2, paddingRight: 2 }}>
                                                    <Pressable activeOpacity={4} style={[styles.adds1, { shadowColor: '#000', shadowOffset: { width: 1.5, height: 1.5 }, shadowOpacity: 0.8, elevation: 6, }]}  >

                                                        <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>

                                                            <Pressable style={{ width: 20, height: 20, right: 3, marginTop: 5 }} onPress={() => removeproducttosave(item.productid, item.type)}>
                                                                <Image
                                                                    style={{ width: 15, height: 15 }}
                                                                    resizeMode='contain'
                                                                    source={require('../assets/favourite_selected.jpg')}
                                                                />
                                                            </Pressable>

                                                        </View>

                                                        <Image resizeMode='contain' style={[styles.addsImg1, { height: item.tytle.length < 25 ? 55 : 40 }]} source={{ uri: item.image != "" ? item.image : "http://drive.google.com/uc?export=view&id=1KSibQ8cZLe5TaZ1fSR-qG3f_-zIE2-Dc" }}></Image>

                                                        <Text style={{ color: colors.dblue, fontSize: 9, padding: 4, paddingBottom: 0, paddingTop: 2, fontFamily: 'Poppins_500Medium', paddingRight: 3 }}>{item.tytle.length > 42 ? item.tytle.split("", 42) : item.tytle} {item.tytle.length > 42 ? "..." : ""}</Text>

                                                        <Text style={{ paddingLeft: 5, fontSize: 9, color: colors.ash, padding: 0, top: 0, paddingTop: 0, fontFamily: 'Poppins_400Regular', paddingRight: 3 }}>{item.productbrand.length > 8 ? item.productbrand.split("", 8) : item.productbrand} {item.productbrand.length > 8 ? ".." : ""} <Text style={{ fontSize: 7, color: colors.green }}>204 sells</Text></Text>
                                                        <View style={{ flexDirection: 'row', width: '100%', padding: 4, top: 0, paddingBottom: 2, alignContent: 'center' }}>

                                                            <Text style={{ fontSize: 10, color: colors.ash, textDecorationLine: 'line-through', fontFamily: 'Poppins_400Regular' }}>{item.regularPrice}</Text>

                                                            <Text style={{ fontSize: 10, color: "#FF8000", left: 5, fontFamily: 'Poppins_500Medium' }}>Tk.{item.discountPrice}</Text>

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

                                                                <Text style={{ fontSize: 9, color: colors.ash, left: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>({item.avgrating == "" || item.avgrating == null ? 0.00 : item.avgrating})</Text>

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

                                        )
                                    }
                                />


                                <View style={{ width: '100%', marginTop: 80, justifyContent: 'center', alignItems: 'center', display: allimage1.length == 0 && nointernet == false && isLoading123 == false ? 'flex' : 'none' }}>

                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.black, marginTop: 10 }}>NO PRODUCT IS SAVED</Text>
                                </View>
                            </View>


                            {/* for All Doctor*/}
                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 0, display: medical1 ? 'flex' : 'none', marginBottom: 10 }}>


                                <FlatList
                                    columnWrapperStyle={{ justifyContent: 'space-around' }}
                                    data={allimage2}
                                    style={{ width: '98%', top: 5 }}
                                    keyExtractor={(item, index) => index}
                                    showsVerticalScrollIndicator={false}
                                    numColumns={3}
                                    renderItem={
                                        ({ item, index }) => (

                                            <View key={index} style={{ width: "100%", justifyContent: 'flex-start', alignItems: 'center' }}>


                                                <View style={{ width: "32%", paddingLeft: 2, paddingRight: 2 }}>
                                                    <Pressable activeOpacity={4} style={[styles.adds22, { width: "100%", height: 163 }]} onPress={() => navigation.navigate("DoctorInfo", { doctorprofile: item })}>

                                                        <ImageBackground resizeMode='contain' style={[styles.addsImg22, { width: "100%", height: item.name.length < 25 ? 75 : 70 }]} source={{ uri: item.profileimage == "" || item.profileimage == null ? "http://drive.google.com/uc?export=view&id=1KSibQ8cZLe5TaZ1fSR-qG3f_-zIE2-Dc" : item.profileimage }}>
                                                            <View style={{ width: "100%", justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                                <Pressable style={{ width: 20, height: 20, right: 3, marginTop: 5 }} onPress={() => removeproducttosave(item.id, item.type)} >
                                                                    <Image
                                                                        style={{ width: 15, height: 15 }}
                                                                        resizeMode='contain'
                                                                        source={require('../assets/favourite_selected.jpg')}
                                                                    />
                                                                </Pressable>
                                                            </View>

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
                                                        </ImageBackground>
                                                        <View style={{ width: "100%", justifyContent: 'flex-start', alignItems: 'flex-start', left: 2 }}>
                                                            <Text style={{ paddingLeft: 3, fontSize: 9, color: colors.ash, padding: 0, top: 0, paddingTop: 0, fontFamily: 'Poppins_500Medium', letterSpacing: .9, paddingRight: 3 }}>{item.name.length > 42 ? item.name.split("", 42) : item.name} {item.name.length > 42 ? "..." : ""}</Text>

                                                            <Text style={{ paddingLeft: 3, fontSize: 9, color: colors.ash, padding: 0, top: 0, paddingTop: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .2, paddingRight: 3 }}>{item.doctordepartment}</Text>


                                                            <Text style={{ paddingLeft: 3, fontSize: 9, color: colors.ash, padding: 0, top: 0, paddingTop: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>{item.experience} Years</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', width: '100%', paddingTop: 3, bottom: 7 }}>


                                                            <View style={{ paddingLeft: 3, flexDirection: 'row', width: '100%', padding: 2, top: 0, paddingBottom: 2, alignContent: 'center' }}>

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

                                                                <Text style={{ fontSize: 10, color: colors.ash, left: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>({item.avgrating})</Text>

                                                            </View>
                                                        </View>




                                                    </Pressable>

                                                    <View style={{ width: '100%', height: 16, }}></View>
                                                </View>

                                            </View>

                                        )
                                    }

                                />

                                <View style={{ width: '100%', marginTop: 80, justifyContent: 'center', alignItems: 'center', display: allimage2.length == 0 && nointernet == false && isLoading123 == false ? 'flex' : 'none' }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.black, marginTop: 10 }}>NO DOCTOR IS SAVED</Text>
                                </View>
                            </View>
                        </>

                    }

                </View>






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

    adds22: {
        width: "100%",
        height: 167,

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
    addsImg22: {
        width: '100%',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        // height:70,
    },
    addstext22: {
        width: '100%',
        height: 92,


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
    },
    adds1: {
        width: "100%",
        height: 167,

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
    addsImg1: {
        width: '100%',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        // height:70,
    },
    addstext1: {
        width: '100%',
        height: 92,

    },
});

export default Favourites;