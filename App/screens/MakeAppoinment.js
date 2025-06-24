import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Dimensions } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';


import { UserContext } from '../../components/CredintailsContext';



import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';




function MakeAppoinment({ navigation, route }) {

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

                await fetch('https://qwikmedic.pythonanywhere.com/notification', requestOptions)
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
    const [city, setCity] = useState(null);
    const [filter, setFilter] = useState(null);


    const { testCredentials, setTestCredentials } = useContext(UserContext);
    const [lan, setLan] = useState(true);
    const [userid, setUserid] = useState(testCredentials.userid);

    const [getUser, setgetUser] = useState(true);

    const [notallow, setNotallow] = useState(testCredentials.userid == 0 ? true : false);

    let cardWidth = Dimensions.get('window').width / 2 - 30;

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
    const [getProductdata, setGetProductdata] = useState(route.params.getDoctordata);

    const [allimage, setAllimage] = useState([]);

    const [cardiology, setCardiology] = useState([]);
    const [cardiologyf, setCardiologyf] = useState([]);
    const [neurology, setNeurology] = useState([]);
    const [dentist, setdentist] = useState([]);

    const [FilterID, setFilterID] = useState(null);

    const [search, setSearch] = useState("");
    const [searchFlag, setSearchFlag] = useState(false);

    const [animate, setAnimate] = useState(true);


    const [text, setText] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [isLoading123, setLoading123] = useState(false);

    const [nointernet, setNointernet] = useState(false);
    const [isLoading1, setLoading1] = useState(false);

    const [getFlat, setGetFlat] = useState(true);
    const [getFlatdata, setGetFlatdata] = useState([]);

    const [nodata, setNodata] = useState(true);

    const [getelecteic, setGetElecteic] = useState([]);
    const [getplants, setGetplants] = useState([]);

    x = 0;

    const [getpackage, setGetpackage] = useState([]);
    const [arrayloading, setArrayloading] = useState(true);

    const [getallf, setGetallf] = useState([]);

    const [donerChackflag, setDonerChackflag] = useState(false);
    const [donerflag, setDonerflag] = useState(false);

    const [donerregflag, setDonerregflag] = useState(false);

    const [openseeall, setOpenseeall] = useState(false);

    const [textvalue, setTextvalue] = useState(null);
    const [getDoctor, setGetDoctor] = useState(true);

    //INPUTTEXT VALUE
    const [phonep, setPhone] = useState(route.params.phonep);
    const [namep, setName] = useState(route.params.namep);
    const [nicknamep, setNickname] = useState(route.params.nicknamep);
    const [cities, setCities] = useState("Dhaka");
    const [areap, setArea] = useState(route.params.areap);
    const [emailp, setEmail] = useState(route.params.emailp);
    const [postcodep, setPostcode] = useState(route.params.postcodep);
    const [streetNop, setStreetNo] = useState(route.params.streetNop);
    const [clusternamep, setClustername] = useState(route.params.clusternamep);
    const [emgphonenumberp, setEmgphonenumber] = useState(route.params.emgphonenumberp);

    const [dateofbathp, setDateofbath] = useState(route.params.dateofbathp);
    const [bloodgroupp, setBloodgroup] = useState(route.params.bloodgroupp);
    const [genderp, setGender] = useState(route.params.genderp);
    const [agep, setAge] = useState(route.params.agep);
    const [heightp, setHeight] = useState(route.params.heightp);
    const [weightp, setWeight] = useState(route.params.weightp);
    const [bloodpressurep, setBloodpressure] = useState(route.params.bloodpressurep);
    const [altphonenumberp, setAltphonenumber] = useState(route.params.altphonenumberp);
    const [occupationp, setOccupation] = useState(route.params.occupationp);

    const [allergiesp, setAllergiesp] = useState(route.params.allergiesp);
    const [injuriesp, setInjuriesp] = useState(route.params.injuriesp);
    const [surgeriesp, setSurgeriesp] = useState(route.params.surgeriesp);
    const [diabetesp, setDiabetesp] = useState(route.params.diabetesp);
    const [smokingp, setSmokingp] = useState(route.params.smokingp);
    const [alcoholp, setAlcoholp] = useState(route.params.alcoholp);
    const [walkingp, setWalkingp] = useState(route.params.walkingp);
    const [junkp, setJunkp] = useState(route.params.junkp);
    const [gymp, setGymp] = useState(route.params.gymp);
    const [mypetientsp, setMypetientsp] = useState(route.params.mypetientsp);

    const [streetNo1, setStreetNo1] = useState(route.params.areap + ", " + route.params.streetNop + ", " + "Dhaka " + route.params.postcodep);

    const [xalll, setXall] = useState(null);
    const [x11, setX1] = useState(null);
    const [x22, setX2] = useState(null);
    const [x33, setX3] = useState(null);



    const [opt0, setOp0] = useState(true);
    const [opt, setOp] = useState(false);
    const [opt1, setOp1] = useState(false);
    const [opt2, setOp2] = useState(false);
    const [opt3, setOp3] = useState(false);
    const [opt4, setOp4] = useState(false);
    const [opt5, setOp5] = useState(false);
    const [opt6, setOp6] = useState(false);
    const [opt7, setOp7] = useState(false);
    const [opt8, setOp8] = useState(false);
    const [opt9, setOp9] = useState(false);


    const OnpressOpt0 = () => {
        setLoading1(true);
        cardiology.length = 0;
        cardiologyf.length = 0;

        setSearch("");

        setOp0(true);
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

        getProductdata.map((item, index) => {

            cardiology.push(item);
            cardiologyf.push(item);

        });

        // setCardiology(getProductdata)
        // setCardiologyf(getProductdata)
        setLoading1(false);
    };

    const OnpressOpt = () => {
        setLoading1(true);
        cardiology.length = 0;
        cardiologyf.length = 0;

        setSearch("");

        setOp0(false);
        setOp(true);
        setOp1(false);
        setOp2(false);
        setOp3(false);
        setOp4(false);
        setOp5(false);
        setOp6(false);
        setOp7(false);
        setOp8(false);
        setOp9(false);

        getProductdata.map((item, index) => {
            if (item.doctordepartment == "Cardiology") {
                cardiology.push(item);
                cardiologyf.push(item);

                // setDonerregflag(true)
            }
            // else if(item.doctordepartment == "Neurology"){
            //     neurology.push(item)
            //     // setDonerregflag(true)
            // }
            // else if(item.doctordepartment == "Dentist"){
            //     dentist.push(item)
            // }
        });

        setLoading1(false);
    };

    const OnpressOpt1 = () => {
        setLoading1(true);
        cardiology.length = 0;
        cardiologyf.length = 0;

        setSearch("");

        setOp0(false);
        setOp(false);
        setOp1(true);
        setOp2(false);
        setOp3(false);
        setOp4(false);
        setOp5(false);
        setOp6(false);
        setOp7(false);
        setOp8(false);
        setOp9(false);

        getProductdata.map((item, index) => {
            if (item.doctordepartment == "Neurology") {
                cardiology.push(item);
                cardiologyf.push(item);

                // setDonerregflag(true)
            }
            // else if(item.doctordepartment == "Neurology"){
            //     neurology.push(item)
            //     // setDonerregflag(true)
            // }
            // else if(item.doctordepartment == "Dentist"){
            //     dentist.push(item)
            // }
        });

        setLoading1(false);
    };

    const OnpressOpt2 = () => {
        setLoading1(true);
        cardiology.length = 0;
        cardiologyf.length = 0;

        setSearch("");

        setOp0(false);
        setOp(false);
        setOp1(false);
        setOp2(true);
        setOp3(false);
        setOp4(false);
        setOp5(false);
        setOp6(false);
        setOp7(false);
        setOp8(false);
        setOp9(false);

        getProductdata.map((item, index) => {
            if (item.doctordepartment == "Dentist") {
                cardiology.push(item);
                cardiologyf.push(item);

                // setDonerregflag(true)
            }
            // else if(item.doctordepartment == "Neurology"){
            //     neurology.push(item)
            //     // setDonerregflag(true)
            // }
            // else if(item.doctordepartment == "Dentist"){
            //     dentist.push(item)
            // }
        });

        setLoading1(false);
    };

    const OnpressOpt3 = () => {

        setOp0(false);
        setOp(false);
        setOp1(false);
        setOp2(false);
        setOp3(true);
        setOp4(false);
        setOp5(false);
        setOp6(false);
        setOp7(false);
        setOp8(false);
        setOp9(false);


    };

    const OnpressOpt4 = () => {

        setOp(false);
        setOp1(false);
        setOp2(false);
        setOp3(false);
        setOp4(true);
        setOp5(false);
        setOp6(false);
        setOp7(false);
        setOp8(false);
        setOp9(false);

    };

    const OnpressOpt5 = () => {
        setOp(false);
        setOp1(false);
        setOp2(false);
        setOp3(false);
        setOp4(false);
        setOp5(true);
        setOp6(false);
        setOp7(false);
        setOp8(false);
        setOp9(false);

    };

    const OnpressOpt6 = () => {
        setOp(false);
        setOp1(false);
        setOp2(false);
        setOp3(false);
        setOp4(false);
        setOp5(false);
        setOp6(true);
        setOp7(false);
        setOp8(false);
        setOp9(false);

    };

    const OnpressOpt7 = () => {
        setOp(false);
        setOp1(false);
        setOp2(false);
        setOp3(false);
        setOp4(false);
        setOp5(false);
        setOp6(false);
        setOp7(true);
        setOp8(false);
        setOp9(false);


    };

    const OnpressOpt8 = () => {
        setOp(false);
        setOp1(false);
        setOp2(false);
        setOp3(false);
        setOp4(false);
        setOp5(false);
        setOp6(false);
        setOp7(false);
        setOp8(true);
        setOp9(false);



    };

    const OnpressOpt9 = () => {
        setOp(false);
        setOp1(false);
        setOp2(false);
        setOp3(false);
        setOp4(false);
        setOp5(false);
        setOp6(false);
        setOp7(false);
        setOp8(false);
        setOp9(true);




    };
    let formdata = new FormData();


    const DoctorInfo1 = async () => {
        try {



            if (getDoctor) {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://qwikmedic.pythonanywhere.com/doctorProfile', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {

                        setGetProductdata(json);
                        setNointernet(false);
                        // setLoading(false)

                    })
                    .catch((error) => {
                        console.error(error);
                        setNointernet(true);
                        // setLoading1(false)
                    });


            }

            // console.log("hit");

        }
        catch (error) {
            console.error(error);
            setLoading1(false);
        } finally {

            setLoading123(false);
            setGetProduct(false);



        }

        setGetDoctor(false);


    };


    const ProductInfo = async () => {
        try {
            if (getProduct) {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://qwikmedic.pythonanywhere.com/doctorProfile', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {

                        setGetProductdata(json);


                        setNointernet(false);
                        // setLoading(false)

                    })
                    .catch((error) => {
                        console.error(error);
                        setNointernet(true);
                        // setLoading1(false)
                    });


            }

            // console.log("hit");
        }
        catch (error) {
            console.error(error);
            setLoading1(false);
        } finally {

            setLoading123(false);
            setGetProduct(false);

        }

        setGetProduct(false);


    };




    const UserInfo = () => {

        if (getUser) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            };

            fetch('https://qwikmedic.pythonanywhere.com/userProfile/' + userid, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    setNointernet(false);

                    setPhonep(json.phonenumber),
                        setNamep(json.name),
                        setEmailp(json.email),
                        setClusternamep(json.clustername);

                    setAreap(json.area),
                        setPostcodep(json.postcode),
                        setStreetNop(json.streetaddress);
                    setNicknamep(json.nickname);
                    setBloodgroupp(json.bloodgroup);

                    setGenderp(json.gender);
                    setAgep(json.age);
                    setHeightp(json.height);
                    setWeightp(json.weight);
                    setBloodpressurep(json.bloodpressure);

                    setAltphonenumberp(json.altphonenumber);
                    setEmgphonenumberp(json.emgphonenumber);
                    setDateofbathp(json.dateofbath);
                    setOccupationp(json.occupation);

                    setAllergiesp(json.allergies);
                    setInjuriesp(json.injuries);

                    setSurgeriesp(json.surgeries);
                    setDiabetesp(json.diabetes);
                    setSmokingp(json.smoking);
                    setAlcoholp(json.alcohol);
                    setWalkingp(json.walking);
                    setJunkp(json.junk);
                    setGymp(json.gym);


                })
                .catch((error) => {
                    console.error(error);
                    setNointernet(true);
                    setLoading1(false);

                });

            setgetUser(false);
        }
    };



    //  UserInfo()


    const [checkdata, setCheckdata] = useState(true);

    const Getdata = () => {
        if (checkdata) {

            // getProductdata.map((item,index)=>{
            //     if(item.doctordepartment == "Cardiology")
            //     {
            //         cardiology.push(item)
            //         cardiologyf.push(item)
            //         // setDonerregflag(true)
            //     }

            // })

            xall = 0;
            x1 = 0;
            x2 = 0;
            x3 = 0;

            getProductdata.map((item, index) => {

                cardiology.push(item);
                cardiologyf.push(item);
                xall = xall + 1;
                if (item.doctordepartment == "Cardiology") {
                    x1 = x1 + 1;
                }
                if (item.doctordepartment == "Neurology") {
                    x2 = x2 + 1;
                }
                if (item.doctordepartment == "Dentist") {
                    x3 = x3 + 1;
                }



            });
            setXall(xall);
            setX1(x1);
            setX2(x2);
            setX3(x3);

            // setCardiology(getProductdata)
            // setCardiologyf(getProductdata)
            setLoading(false);
            setLoading1(false);
        }
        setArrayloading(false);
        setCheckdata(false);

    };


    const searchFilter = (text) => {

        // setSeeallmed(false)

        if (text) {
            const newData = getProductdata.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setCardiologyf(newData);

            setSearch(text);
        }
        else {
            // console.log("000000000000000")
            setCardiologyf(cardiologyf);
            setSearch(text);
        }

        // const itemData = item.medicinename ?  item.medicinename.toUpperCase() : ''.toUpperCase()
        // const itemData1 = item.genericname ? item.genericname.toUpperCase() : ''.toUpperCase()

        // const textData = text.toUpperCase()
        // return (
        //     itemData.indexOf(textData) > -1,
        //     itemData1.indexOf(textData) > -1

        // )

    };


    const renderItem = useCallback(({ item, index }) => (

        <View key={index}>
            <View style={{ justifyContent: 'flex-start', alignItems: 'center', width: "100%" }}>


                <View style={{ paddingLeft: 2, paddingRight: 2, width: "55%" }}>
                    <Pressable activeOpacity={4} style={[styles.adds22, { height: 170 }]} onPress={() => navigation.navigate("DoctorInfo", {
                        doctorprofile: item,
                        namep: namep, phonep: phonep, emailp: emailp, areap: areap, postcodep: postcodep, streetNop: streetNop, nicknamep: nicknamep,
                        bloodgroupp: bloodgroupp, genderp: genderp, agep: agep, heightp: heightp, weightp: weightp, bloodpressurep: bloodpressurep,
                        altphonenumberp: altphonenumberp, emgphonenumberp: emgphonenumberp, dateofbathp: dateofbathp, occupationp: occupationp,
                        allergiesp: allergiesp, injuriesp: injuriesp, surgeriesp: surgeriesp, diabetesp: diabetesp, smokingp: smokingp, alcoholp: alcoholp, walkingp: walkingp, junkp: junkp, gymp: gymp, mypetientsp: mypetientsp
                    })}
                    >
                        {/* <Pressable  activeOpacity={4}  style={[styles.adds22,{height:170}]} onPress={()=> console.log("hello5")}  >*/}


                        {/* <View  style={{width:'100%',flexDirection:'row',height:100}}>
                    <Image  resizeMode='contain' style={[styles.addsImg22,{bottom:1,width:'100%'}]} source={{uri:item.profileimage}}></Image> 
                </View> */}

                        <Image resizeMode='contain' style={[styles.addsImg22, { height: item.name.length < 25 ? 75 : 70 }]} source={{ uri: item.profileimage == "" || item.profileimage == null ? "http://drive.google.com/uc?export=view&id=1KSibQ8cZLe5TaZ1fSR-qG3f_-zIE2-Dc" : item.profileimage }}></Image>
                        <Image
                            style={{ left: 4, height: 20, width: '15%', display: item.country == "Bangladesh" ? 'flex' : 'none', position: 'absolute' }}
                            resizeMode='contain'
                            source={require('../assets/bd_flag.jpg')}
                        // source={{uri: "http://drive.google.com/uc?export=view&id=1VAI8qWUWor-sjw6qDPlVOvVNmdRlfieN"}}
                        />

                        <Image
                            style={{ left: 4, height: 20, width: '15%', display: item.country == "Canada" ? 'flex' : 'none', position: 'absolute' }}
                            resizeMode='contain'
                            source={require('../assets/cdflag.jpg')}
                        // source={{uri: "http://drive.google.com/uc?export=view&id=1VAI8qWUWor-sjw6qDPlVOvVNmdRlfieN"}}
                        />
                        <View style={{ width: "100%", justifyContent: 'flex-start', alignItems: 'flex-start', left: 2 }}>
                            <Text style={{ paddingLeft: 3, fontSize: 9, color: colors.ash, padding: 0, top: 0, paddingTop: 0, fontFamily: 'Poppins_500Medium', letterSpacing: .9, paddingRight: 3 }}>{item.name.length > 42 ? item.name.split("", 42) : item.name} {item.name.length > 42 ? "..." : ""}</Text>

                            {/* <Text style={{paddingLeft:3,fontSize:9,color:colors.ash,padding:0,top:0,paddingTop:0,fontFamily: 'Poppins_400Regular',letterSpacing:.2,paddingRight:3}}>{item.doctordepartment == "" || item.doctordepartment == null ? item.specialization.length > 25 ? item.specialization.split("",25): item.specialization : item.doctordepartment.length > 25 ? item.doctordepartment.split("",25): item.doctordepartment}</Text>                       */}
                            <Text style={{ paddingLeft: 3, fontSize: 9, color: colors.ash, padding: 0, top: 0, paddingTop: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .2, paddingRight: 3 }}>{item.doctordepartment == "" || item.doctordepartment == null ? item.specialization.length > 100 ? item.specialization.split("", 100) : item.specialization : item.doctordepartment.length > 100 ? item.doctordepartment.split("", 100) : item.doctordepartment}</Text>


                            <Text style={{ paddingLeft: 3, fontSize: 9, color: colors.ash, padding: 0, top: 0, paddingTop: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingRight: 3 }}>{item.experience == "" || item.experience == null ? '0 Years' : item.experience + " Years"} </Text>
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
        </View>

    ), []);
    useEffect(() => {

        // ProductInfo()
        // NotificationCheck()
        // FlatInfo()
        if (getProductdata.length == 0) {
            setLoading(true);
            DoctorInfo1();
        }
        else {
            setLoading(false);

        }

        if (getProductdata.length != 0) {
            if (isLoading123 == false) {
                Getdata();
            }
        }

        // console.log(mypetientsp)

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

                    <View style={{ width: '50%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10 }}>

                        <Text style={{ top: 17, color: colors.black, fontSize: 14, display: lan ? 'none' : 'flex' }} >  বিস্তারিত</Text>

                        <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Appoinment </Text>

                    </View>



                </View>


                <View style={[styles.body1, { justifyContent: 'flex-start', alignItems: 'center', marginTop: 10 }]}>
                    <View style={{ width: '100%', display: openseeall ? 'none' : 'flex' }}>





                        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>



                            {/* for Doctor */}

                            {isLoading ? <ActivityIndicator size="large" color="#2D6A8D" style={{ paddingTop: 100 }} /> :


                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 0, marginBottom: 30, bottom: 0, marginTop: 5 }}>
                                    <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5 }}>
                                        <Text style={{ left: 15, fontSize: 11, color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .5, textDecorationLine: 'underline' }}>{cardiologyf.length} Doctors Found</Text>
                                    </View>

                                    <FlatList
                                        columnWrapperStyle={{ justifyContent: 'space-around' }}
                                        data={cardiologyf}
                                        style={{ width: '100%', top: 5, marginBottom: 50 }}
                                        keyExtractor={(item, index) => item.id}
                                        initialNumToRender={7}
                                        // keyExtractor={ (item, index) => index.toString }
                                        numColumns={3}

                                        //    refreshing={loading}
                                        renderItem={renderItem}

                                    />


                                </View>

                            }
                        </View>

                    </View>




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



                    <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.dblue, borderBottomWidth: 4 }]} onPress={() => navigation.navigate("Services", {})}>

                        <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/services.jpg")} />
                        <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
                        <Text style={{ top: 7.8, color: colors.dblue, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>SERVICES</Text>

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
    searchview: {
        width: '100%',
        height: 60,
        top: 3,
        justifyContent: "center",
        alignItems: 'center',

    },

    input: {
        width: "94%",
        height: 45,
        borderColor: colors.ash1,
        // borderWidth:1,
        backgroundColor: colors.white,
        alignItems: 'center',
        //padding:5,
        paddingLeft: 45,
        borderRadius: 3,
        paddingRight: 30,
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        letterSpacing: .9

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
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: colors.white1,
        borderWidth: 1,
        backgroundColor: colors.white,
        marginLeft: 15,
    },
    addsImg: {
        // width:'100%',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        height: '100%',
    },
    addstext: {
        // width:'100%',
        // height:115,

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

export default MakeAppoinment;