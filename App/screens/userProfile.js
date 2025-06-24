import React, { useEffect, useState, useContext, useRef } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, ImageBackground, SafeAreaView, Platform, StatusBar, Image, Button, TextInput, Pressable, ScrollView, Switch, TurboModuleRegistry, Animated } from 'react-native';
import { mainArea, dhakacity, chottogramcity, sylhetcity, khulnatcity, barishalcity, rajshahicity, rangpurcity, mymensingcity, none } from './adressdata';
import colors from '../config/colors';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { UserContext } from '../../components/CredintailsContext';

import SelectDropdown from 'react-native-select-dropdown';



function UserProfile({ navigation, route }) {
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
    const currentTime = new Date().toISOString();


    // const [getnotify, setGetnotify] = useState(true);
    const { authtoken, setAuthtoken } = useContext(UserContext);



    const [openmap, setOpenmap] = useState(false);
    // const [newAddress, setNewAddress] = useState("");

    const [markerPosition, setMarkerPosition] = useState({
        latitude: 23.811056,
        longitude: 90.407608,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });



    const gender1 = ["Male", "Female", "Others"];
    const blood = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const occu = ["Doctor", "Student", "Soldier", "Professor", "Builder", "Engineer", "Businessman", "Pilot"];

    //context
    // const { storeCredentials, setStoreCredentials } = useContext(CredentialsContext);

    const { testCredentials, setTestCredentials } = useContext(UserContext);
    const [lan, setLan] = useState(true);
    const [userid, setUserid] = useState(testCredentials.userid);



    //IMAGE PERMITION
    // const [hasGallaryPermission, setHasGallaryPermission] = useState(null);
    const [image, setImage] = useState(null);

    // const [imagee, setImagee] = useState(null);

    const [ready, setReady] = useState(false);
    const [imageupdate, setImageupdate] = useState(null);
    const [imageupdate1, setImageupdate1] = useState(null);



    const [falgimg1, setFalgimg1] = useState(false);

    const [newimg, setNewimg] = useState(false);

    const [allergies, setAllergies] = useState(false);
    // const [allergiese, setAllergiese] = useState(false);
    const toggleSwitch1 = () => setAllergies(previousState => !previousState);

    const [injuries, setInjuries] = useState(false);
    // const [injuriese, setInjuriese] = useState(false);
    const toggleSwitch2 = () => setInjuries(previousState => !previousState);

    const [surgeries, setSurgeries] = useState(false);
    // const [surgeriese, setSurgeriese] = useState(false);
    const toggleSwitch3 = () => setSurgeries(previousState => !previousState);

    const [diabetes, setDiabetes] = useState(false);
    // const [diabetese, setDiabetese] = useState(false);
    const toggleSwitch4 = () => setDiabetes(previousState => !previousState);


    const [asthma, setAsthma] = useState(false);
    // const [asthmae, setAsthmae] = useState(false);
    const toggleSwitch10 = () => setAsthma(previousState => !previousState);

    const [ardiac_disease, setArdiac_disease] = useState(false);
    // const [ardiac_diseasee, setArdiac_diseasee] = useState(false);
    const toggleSwitch11 = () => setArdiac_disease(previousState => !previousState);

    const [hypertension, setHypertension] = useState(false);
    // const [hypertensione, setHypertensione] = useState(false);
    const toggleSwitch12 = () => setHypertension(previousState => !previousState);

    const [thyroid, setThyroid] = useState(false);
    // const [thyroide, setThyroide] = useState(false);
    const toggleSwitch13 = () => setThyroid(previousState => !previousState);

    const [pcos_pcod, setPcos_pcod] = useState(false);
    // const [pcos_pcode, setPcos_pcode] = useState(false);
    const toggleSwitch14 = () => setPcos_pcod(previousState => !previousState);

    const [cancer, setCancer] = useState(false);
    // const [cancere, setCancere] = useState(false);
    const toggleSwitch15 = () => setCancer(previousState => !previousState);



    const [smoking, setSmoking] = useState(false);
    // const [smokinge, setSmokinge] = useState(false);
    const toggleSwitch5 = () => setSmoking(previousState => !previousState);

    const [alcohol, setAlcohol] = useState(false);
    // const [alcohole, setAlcohole] = useState(false);
    const toggleSwitch6 = () => setAlcohol(previousState => !previousState);

    const [walking, setWalking] = useState(false);
    // const [walkinge, setWalkinge] = useState(false);
    const toggleSwitch7 = () => setWalking(previousState => !previousState);

    const [junk, setJunk] = useState(false);
    // const [junke, setJunke] = useState(false);
    const toggleSwitch8 = () => setJunk(previousState => !previousState);

    const [gym, setGym] = useState(false);
    // const [gyme, setGyme] = useState(false);
    const toggleSwitch9 = () => setGym(previousState => !previousState);

    // const [test, setTest] = useState(false);

    const [isLoading1, setLoading1] = useState(false);

    const [submitflag, setSubmitflag] = useState(true);


    const [todayDate, setTodayDate] = useState(String(new Date()));




    const [namestatus, setnamestatus] = useState(true);

    const [areastatus, setareastatus] = useState(true);
    const [postcodestatus, setpostcodestatus] = useState(true);
    const [streetNostatus, setstreetNostatus] = useState(true);

    const [altnumberstatus, setaltnumberstatus] = useState(true);
    const [emrnumberstatus, setemrnumberstatus] = useState(true);
    const [emailstatus, setemailstatus] = useState(true);

    const [getUser, setgetUser] = useState(true);


    const [personal, setPersonal] = useState(true);
    const [medical, setMedical] = useState(false);
    const [lifestyle, setLifestyle] = useState(false);



    const [phone, setPhone] = useState("");
    const [Name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [cities, setCities] = useState("");
    const [area, setArea] = useState("");
    const [email, setEmail] = useState("");
    const [postcode, setPostcode] = useState("");
    const [streetNo, setStreetNo] = useState("");
    const [clustername, setClustername] = useState("");
    const [emgphonenumber, setEmgphonenumber] = useState("");

    const [dateofbath, setDateofbath] = useState("");
    const [bloodgroup, setBloodgroup] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [newHeight, setNewHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [newWeight, setNewWeight] = useState("");
    const [bellySize, setBellySize] = useState("");
    const [newBellySize, setNewBellySize] = useState("");
    const [bloodpressure, setBloodpressure] = useState("");
    const [newBloodpressure, setNewBloodpressure] = useState("");


    const [address, setAddress] = useState("");
    const [bmi, setBmi] = useState("");



    const [altphonenumber, setAltphonenumber] = useState("");
    const [healthconditions, setHealthconditions] = useState("");

    const [occupation, setOccupation] = useState("");


    const [longitude, setLongitude] = useState(0.0);
    const [latitude, setLatitude] = useState(0.0);

    const [insideDhaka, setInsideDhaka] = useState(true);

    const [ename, setEname] = useState(false);
    const [enick, setENick] = useState(false);
    const [ealt, setEAlt] = useState(false);
    const [eemail, setEemail] = useState(false);
    const [edate, setEDate] = useState(false);
    const [egender, setEGender] = useState(false);
    const [eage, setEAge] = useState(false);
    const [ehight, setEhight] = useState(false);

    const [eweight, setEweight] = useState(false);
    const [eaddress, setEaddress] = useState(false);
    const [eBellySize, setEBellySize] = useState(false);
    const [eemr, setEemr] = useState(false);
    const [earea, setEarea] = useState(false);
    const [epost, setEpost] = useState(false);
    const [eadd, setEadd] = useState(false);
    const [eprasure, setEprasure] = useState(false);
    const [eblood, setEblood] = useState(false);
    const [eoccu, setEoccu] = useState(false);


    const [userAllData, setUserAllData] = useState();

    const pressPersonal = () => {

        setPersonal(true);
        setMedical(false);
        setLifestyle(false);
    };
    const pressMedical = () => {

        setPersonal(false);
        setMedical(true);
        setLifestyle(false);

    };

    const pressLifestyle = () => {

        setPersonal(false);
        setMedical(false);
        setLifestyle(true);

    };



    const [nointernet, setNointernet] = useState(false);


    let formdata = new FormData();

    // console.log("formdata", formdata);

    const UserInfo = () => {

        if (getUser) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            };

            fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    setNointernet(false);
                    // console.log(json)

                    setUserAllData(json);

                    setImage(json.image);
                    setInsideDhaka(json.insidedhaka);

                    setLatitude(parseFloat(json.latitude));

                    setLongitude(parseFloat(json.longitude));

                    setMarkerPosition({
                        latitude: json.latitude == "0.0" ? 23.811056 : parseFloat(json.latitude),
                        longitude: json.longitude == "0.0" ? 90.407608 : parseFloat(json.longitude),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });



                    setPhone(json.phonenumber),
                        setName(json.name),

                        setEmail(json.email),

                        setStreetNo(json.streetaddress);
                    setNickname(json.nickname);

                    setBloodgroup(json.bloodgroup);
                    setGender(json.gender);
                    setAge(json.age);
                    setWeight(json.weight?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
                    // setHeight(json.height);
                    setHeight(json.height?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));

                    setBellySize(json.bellySize?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));

                    setBloodpressure(json.bloodpressure?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));


                    setBmi(json.bmicalculate?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));

                    setNewHeight(json.height);
                    // setWeight(json.weight);

                    setNewWeight(json.weight);
                    setNewBloodpressure(json.bloodpressure);

                    // setBellySize(json.bellySize);
                    setNewBellySize(json.bellySize);


                    // setBmi(json.bmicalculate);

                    setAddress(json.address);
                    // setBloodpressure(json.bloodpressure);


                    setAltphonenumber(json.altphonenumber);
                    setEmgphonenumber(json.emgphonenumber);
                    setDateofbath(json.dateofbath);
                    setOccupation(json.occupation);

                    setAllergies(json.allergies);
                    setInjuries(json.injuries);

                    setSurgeries(json.surgeries);
                    setDiabetes(json.diabetes);
                    setAsthma(json.asthma);
                    setArdiac_disease(json.ardiac_disease);
                    setHealthconditions(json.hypertension);
                    setThyroid(json.thyroid);
                    setPcos_pcod(json.pcos_pcod);
                    setCancer(json.cancer);

                    setHealthconditions(json.healthconditions);

                    setSmoking(json.smoking);
                    setAlcohol(json.alcohol);
                    setWalking(json.walking);
                    setJunk(json.junk);
                    setGym(json.gym);



                })
                .catch((error) => {
                    console.error(error);
                    setNointernet(true);
                    setLoading1(false);

                });



            setgetUser(false);



        }


        // getData()

    };


    UserInfo();




    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setFalgimg1(true);
        }
    };

    const resizer = async () => {
        const manipResult = await manipulateAsync(
            // imageupdate1.localUri || imageupdate1.uri,
            image,
            [
                { resize: { height: 250, width: 300 } },
            ],
            { compress: 1, format: SaveFormat.PNG }
        );
        setImageupdate(manipResult);
        setImage(manipResult.uri);
        setNewimg(true);
    };

    const [showdate, setShowdate] = useState(false);


    const deleteimg = () => {

        setImage(null);
        setFalgimg1(false);
        setNewimg(true);

    };



    const UpdateUser = () => {
        if (nointernet) {
            setLoading1(false);

        }
        else {

            setnamestatus(true);
            setareastatus(true);
            setstreetNostatus(true);
            setpostcodestatus(true);

            setaltnumberstatus(true);
            setemailstatus(true);
            setemrnumberstatus(true);

            let x = 0;
            let y = 0;
            let z = 0;
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            // altphonenumber != "" ? altphonenumber.match("(?:\\+88|88)?(01[3-9]\\d{8})") ? x = 0 : x = 1 : x = 0
            // emgphonenumber != "" ? emgphonenumber.match("(?:\\+88|88)?(01[3-9]\\d{8})") ? y = 0 : y = 1 : y = 0
            // email != "" ? reg.test(email) ? z = 0 : z = 1 : z = 0

            if (x == 0 & y == 0 & z == 0) {

                if (newimg == true) {
                    let filename = image ? image.split('/').pop() : null;
                    let match = /\.(\w+)$/.exec(filename);

                    let type = match ? `image/${match[1]}` : `image`;

                    image ? formdata.append('image', { uri: image, name: filename, type }) : formdata.append('image', "");

                }

                formdata.append('name', Name);
                formdata.append('city', cities);
                formdata.append('area', area);
                formdata.append('postcode', postcode);
                // formdata.append('streetaddress', streetNo);

                formdata.append('email', email);
                formdata.append('bloodgroup', bloodgroup);
                formdata.append('gender', gender);
                formdata.append('age', age);
                // formdata.append('height', height);
                // formdata.append('weight', weight);
                formdata.append('height', JSON.stringify(height));
                formdata.append('weight', JSON.stringify(weight));
                formdata.append('bellySize', JSON.stringify(bellySize));
                formdata.append('address', address);
                // formdata.append('bloodpressure', bloodpressure);
                formdata.append('bloodpressure', JSON.stringify(bloodpressure));


                formdata.append('altphonenumber', altphonenumber);
                formdata.append('emgphonenumber', emgphonenumber);
                // formdata.append('dateofbath', dateofbath);
                formdata.append('occupation', occupation);
                console.log('occupation', occupation);

                formdata.append('allergies', allergies);
                formdata.append('injuries', injuries);

                formdata.append('surgeries', surgeries);
                formdata.append('diabetes', diabetes);
                formdata.append('asthma', asthma);
                formdata.append('ardiac_disease', ardiac_disease);
                formdata.append('hypertension', hypertension);
                formdata.append('thyroid', thyroid);
                formdata.append('pcos_pcod', pcos_pcod);
                formdata.append('cancer', cancer);
                formdata.append('healthconditions', healthconditions);


                formdata.append('smoking', smoking);
                formdata.append('alcohol', alcohol);
                formdata.append('walking', walking);
                formdata.append('junk', junk);
                formdata.append('gym', gym);
                formdata.append('nickname', nickname);
                // formdata.append('clustername', clustername);

                // formdata.append('insidedhaka', insideDhaka);
                // formdata.append('longitude', markerPosition.longitude);

                // formdata.append('latitude', markerPosition.latitude);

                if (streetNo) formdata.append('streetaddress', streetNo);
                if (dateofbath) formdata.append('dateofbath', dateofbath);
                if (clustername) formdata.append('clustername', clustername);
                if (insideDhaka !== undefined) formdata.append('insidedhaka', insideDhaka);
                if (!isNaN(markerPosition.longitude)) formdata.append('longitude', markerPosition.longitude);
                if (!isNaN(markerPosition.latitude)) formdata.append('latitude', markerPosition.latitude);


                // console.log("FormData: ", formdata);

                // formdata.append('houseno',houseNo)

                fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, {
                    method: 'PATCH',
                    body: formdata,
                    headers: {
                        'content-type': 'multipart/form-data', 'Authorization': authtoken
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {

                        // console.log("API Response:", json);

                        setNointernet(false);
                        setLoading1(false);
                        // navigation.navigate("Homepage",{updateprofile:true})

                        setEname(false);
                        setENick(false);
                        setEAlt(false);
                        setEemail(false);
                        setEDate(false);
                        setEGender(false);
                        setEAge(false);
                        setEhight(false);

                        setEweight(false);
                        setEaddress(false);
                        setEBellySize(false);
                        setEemr(false);
                        setEarea(false);
                        setEpost(false);
                        setEadd(false);
                        setEprasure(false);
                        setEblood(false);
                        setEoccu(false);

                        setgetUser(true);
                        console.log("All Okay: ", json);
                        UserInfo();
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoading1(false);
                        setNointernet(false);
                    });


            }


            else if (x == 1) {
                setLoading1(false);
                setaltnumberstatus(false);

            }
            else if (y == 1) {
                setLoading1(false);
                setemrnumberstatus(false);

            }
            else if (z == 1) {
                setLoading1(false);

                setemailstatus(false);

            }



        }

        setSubmitflag(true);
    };



    useEffect(() => {

        if (falgimg1 == true & imageupdate == null) {
            (async () => {


                setImageupdate1(image);

                resizer();
            })();
        }


        if (route.params.flag1) {
            // setCities(route.params.cityname);
            setArea(route.params.areaname);
            setClustername(route.params.clustername);

        }

        //    console.log("area name", area)
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

                        <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Profile </Text>

                    </View>



                </View>


                <ScrollView style={{ width: '100%' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ marginBottom: 0, borderColor: colors.ash1, borderWidth: 0, borderRadius: 6, width: '95%', justifyContent: 'center', alignItems: 'center' }}>

                            {/* <View style={{width:'95%',justifyContent:'flex-start',alignItems:'flex-start',marginTop:10,borderBottomWidth:1,borderBottomColor:colors.white1,height:30}}>
                    
                    <Text style={{color:colors.layoutheader,fontSize:12,left:20,top:20,display : lan ? 'none' : 'flex'}}>ব্যাক্তিগত তথ্য</Text>
                    <Text style={{color:colors.black,fontSize:12,left:10,display : lan ? 'flex' : 'none',fontWeight:'700'}}>General Settengs</Text>
                </View> */}


                            <View style={[styles.body1]}>
                                <View style={{
                                    height: 60, width: '100%', borderWidth: 0, alignItems: 'center', bottom: 10, borderRadius: 8, borderColor: colors.white1,
                                    flexDirection: "row"
                                    // backgroundColor: "#559B5D" 

                                }}>
                                    <Pressable style={{
                                        width: 70, height: 70,
                                        // borderWidth: 4,
                                        left: 6,
                                        borderRadius: 100,
                                        // borderColor: '#EE416C'
                                    }} onPress={() => image == null & falgimg1 == false ? pickImage() : navigation.navigate("ViewImg", { img: image })}>

                                        <Image resizeMode='contain' style={{ borderRadius: 100, width: "100%", height: '100%', display: image != null ? 'none' : 'flex' }} source={
                                            image && image.trim() !== ''
                                                ? { uri: image }
                                                : require('../assets/fitback/profileIcon.png')
                                        } />
                                        {image && <ImageBackground resizeMode='cover' style={{ borderRadius: 100, width: "100%", height: "100%", display: image != null ? 'flex' : 'none' }}>
                                            {/* <Image source={{uri: image}} style={{borderRadius:1,width:110,height:"100%",}}/> */}
                                            <Image source={image != null || image != '' ? { uri: image } : { uri: "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png" }} style={{ borderRadius: 80, width: 80, height: 80, }} resizeMode="stretch" />
                                            <Pressable style={{ alignItems: 'center', bottom: 20, left: 0 }} onPress={() => deleteimg()} >
                                                {/* <Icon name='cancel' color="#E5E8E8" size={24} onPress={()=> deleteimg()}/> */}
                                                <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/cross.jpg")} />

                                            </Pressable>
                                        </ImageBackground>}

                                        {/* <Image resizeMode='contain' style={{width:'100%',height:'100%',borderRadius:100,display: falgimg1 ? 'none':'flex'}} source={require("../assets/121212.jpg")}/> */}

                                    </Pressable>

                                    <View style={{ marginLeft: 30, bottom: 15, borderWidth: 0, width: 200, justifyContent: 'center' }}>
                                        <Text style={{ color: "#1D1617", fontSize: 14, fontFamily: 'Poppins_500Medium', letterSpacing: .9, display: lan ? 'flex' : 'none', top: 20 }}>{Name}</Text>
                                        <Text style={{ marginTop: 4, color: "#7B6F72", fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: lan ? 'flex' : 'none', top: 20 }}>{userAllData?.usertype ? userAllData?.usertype + " User" : "Normal User"}</Text>

                                    </View>

                                </View>



                                <View style={{
                                    marginTop: 30, width: '100%', borderWidth: 0, alignItems: 'center', borderRadius: 8, borderColor: colors.white1,
                                    flexDirection: "row",
                                    // alignItems: "center",
                                    justifyContent: "center"
                                    // backgroundColor: "#559B5D" 

                                }}>

                                    <View style={{
                                        shadowColor: "#000",
                                        // shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 5,
                                        elevation: 2, // for Android shadow
                                        backgroundColor: "white", // necessary for shadow to show
                                        // padding: 10, // optional: adds some padding around text
                                        borderRadius: 10, // optional: rounds the corners
                                        width: "23%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingVertical: 10,
                                        marginRight: 10

                                    }}>
                                        {weight?.length ? <Text style={{ color: "#EE416C", fontSize: 14, fontFamily: 'Poppins_500Medium' }}>{weight[0]?.value}kg</Text>
                                            :
                                            <Text style={{ color: "#EE416C", fontSize: 14, fontFamily: 'Poppins_500Medium' }}>N/A</Text>
                                        }
                                        <Text style={{ color: "#7B6F72", marginTop: 4, fontSize: 12, fontFamily: 'Poppins_400Regular' }}>Weight</Text>

                                        <Pressable style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#EE416C", marginTop: 4, borderRadius: 4, paddingLeft: 3, paddingVertical: 3, justifyContent: "center" }} onPress={() => navigation.navigate("WeightTracker", {})}>
                                            <Text style={{ fontSize: 10, fontFamily: 'Poppins_400Regular', color: "white" }}>View Details</Text>
                                            <MaterialIcons name="keyboard-arrow-right" size={14} color="white" />
                                        </Pressable>
                                    </View>
                                    <View style={{
                                        shadowColor: "#000",
                                        // shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 5,
                                        elevation: 2, // for Android shadow
                                        backgroundColor: "white", // necessary for shadow to show
                                        // padding: 10, // optional: adds some padding around text
                                        borderRadius: 10, // optional: rounds the corners
                                        width: "23%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingVertical: 10,
                                        marginRight: 10

                                    }}>

                                        {bmi?.length ? <Text style={{ color: "#EE416C", fontSize: 14, fontFamily: 'Poppins_500Medium' }}>{bmi[0]?.value}kg</Text>
                                            :
                                            <Text style={{ color: "#EE416C", fontSize: 14, fontFamily: 'Poppins_500Medium' }}>N/A</Text>
                                        }

                                        <Text style={{ color: "#7B6F72", marginTop: 4, fontSize: 12, fontFamily: 'Poppins_400Regular' }}>BMI</Text>
                                        <Pressable style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#EE416C", marginTop: 4, borderRadius: 4, paddingLeft: 3, paddingVertical: 3, justifyContent: "center" }} onPress={() => navigation.navigate("BmiTracker", {})}>
                                            <Text style={{ fontSize: 10, fontFamily: 'Poppins_400Regular', color: "white" }}>View Details</Text>
                                            <MaterialIcons name="keyboard-arrow-right" size={14} color="white" />
                                        </Pressable>
                                    </View>
                                    <View style={{
                                        shadowColor: "#000",
                                        // shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 5,
                                        elevation: 2, // for Android shadow
                                        backgroundColor: "white", // necessary for shadow to show
                                        // padding: 10, // optional: adds some padding around text
                                        borderRadius: 10, // optional: rounds the corners
                                        width: "23%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingVertical: 10,
                                        marginRight: 10

                                    }}>
                                        {bloodpressure?.length ? <Text style={{ color: "#EE416C", fontSize: 14, fontFamily: 'Poppins_500Medium' }}>{bloodpressure[0]?.value}kg</Text>
                                            :
                                            <Text style={{ color: "#EE416C", fontSize: 14, fontFamily: 'Poppins_500Medium' }}>N/A</Text>
                                        }

                                        <Text style={{ color: "#7B6F72", marginTop: 4, fontSize: 12, fontFamily: 'Poppins_400Regular' }}>BP</Text>
                                        <Pressable style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#EE416C", marginTop: 4, borderRadius: 4, paddingLeft: 3, paddingVertical: 3, justifyContent: "center" }} onPress={() => navigation.navigate("BpTracker", {})}>
                                            <Text style={{ fontSize: 10, fontFamily: 'Poppins_400Regular', color: "white" }}>View Details</Text>
                                            <MaterialIcons name="keyboard-arrow-right" size={14} color="white" />
                                        </Pressable>
                                    </View>
                                    <View style={{
                                        shadowColor: "#000",
                                        // shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 5,
                                        elevation: 2, // for Android shadow
                                        backgroundColor: "white", // necessary for shadow to show
                                        // padding: 10, // optional: adds some padding around text
                                        borderRadius: 10, // optional: rounds the corners
                                        width: "23%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingVertical: 10

                                    }}>

                                        {bellySize?.length ?
                                            <Text style={{ color: "#EE416C", fontSize: 14, fontFamily: 'Poppins_500Medium' }}>{bellySize[0]?.value}kg</Text>
                                            :
                                            <Text style={{ color: "#EE416C", fontSize: 14, fontFamily: 'Poppins_500Medium' }}>N/A</Text>
                                        }

                                        <Text style={{ color: "#7B6F72", marginTop: 4, fontSize: 12, fontFamily: 'Poppins_400Regular' }}>Belly Size</Text>
                                        <Pressable style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#EE416C", marginTop: 4, borderRadius: 4, paddingLeft: 3, paddingVertical: 3, justifyContent: "center" }} onPress={() => navigation.navigate("BellySizeTracker", {})}>
                                            <Text style={{ fontSize: 10, fontFamily: 'Poppins_400Regular', color: "white" }}>View Details</Text>
                                            <MaterialIcons name="keyboard-arrow-right" size={14} color="white" />
                                        </Pressable>

                                    </View>
                                </View>

                                {/* <Pressable style={[styles.tuchabluebutton,{width:"25%"}]} >
                            <Text style={{color:'#FFF',fontSize:12}}>Add</Text> 
                        </Pressable> */}

                                <View style={{ marginBottom: 5, bottom: 15, width: '100%', height: 38, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', left: 0, marginTop: 50 }}>

                                    <Pressable style={{ marginLeft: 0, flexDirection: 'row', borderRadius: 4, width: '28%', height: 28, backgroundColor: personal ? "#EE416C" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { pressPersonal(); }}>



                                        <Text style={{ fontSize: 12, color: personal ? colors.white : "#EE416C", left: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>PERSONAL</Text>

                                    </Pressable>
                                    <Pressable style={{ marginLeft: 0, flexDirection: 'row', borderRadius: 4, width: '32%', height: 28, backgroundColor: medical ? "#EE416C" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { pressMedical(); }}>



                                        <Text style={{ fontSize: 12, color: medical ? colors.white : "#EE416C", left: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>MEDICAL</Text>

                                    </Pressable>
                                    <Pressable style={{ marginLeft: 0, flexDirection: 'row', borderRadius: 4, width: '28%', height: 28, backgroundColor: lifestyle ? "#EE416C" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { pressLifestyle(); }}>


                                        <Text style={{ fontSize: 12, color: lifestyle ? colors.white : "#EE416C", left: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>LIFESTYLE</Text>

                                    </Pressable>



                                </View>

                                <View style={[styles.sendform, { bottom: 45 }]}>
                                    <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', display: personal ? 'flex' : 'none' }}>
                                        <View style={[styles.inputdiv, { flexDirection: 'row' }]} >

                                            <View style={{ width: '40%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, top: 20 }}>

                                                <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, paddingBottom: 3, display: lan ? 'none' : 'flex' }}>নাম</Text>
                                                <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Full Name: </Text>
                                            </View>
                                            <TextInput
                                                style={[styles.input, { borderColor: '#C7C8D2', top: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: ename ? 'flex' : 'none', color: colors.text }]}
                                                onChangeText={newTest => setName(newTest)}
                                                defaultValue={Name}
                                                placeholder="Mr. Your Name"
                                                placeholderTextColor={colors.ash}
                                            // textAlign={'center'}
                                            />
                                            <Pressable activeOpacity={4} style={[styles.input, { borderColor: colors.body, borderWidth: 1, right: 10, top: 10, width: '60%', display: ename ? 'none' : 'flex', justifyContent: 'center', backgroundColor: colors.body, alignItems: 'flex-end', paddingRight: 10 }]} onPress={() => setEname(true)}>

                                                <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', letterSpacing: .9, left: 0, letterSpacing: .9 }}>{Name}</Text>

                                            </Pressable>
                                        </View>

                                        {/* Nick Name */}
                                        {/* <View style={[styles.inputdiv, { flexDirection: 'row' }]} >

                                            <View style={{ width: '40%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, top: 20 }}>

                                                <Text style={{ color: colors.ash, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'none' : 'flex' }}>নাম</Text>
                                                <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Nick Name: </Text>
                                            </View>
                                            <TextInput
                                                style={[styles.input, { borderColor: '#C7C8D2', top: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: enick ? 'flex' : 'none', color: colors.text }]}
                                                onChangeText={newTest => setNickname(newTest)}
                                                defaultValue={nickname}
                                                placeholder="Nick Name"
                                                placeholderTextColor={colors.ash}
                                            // textAlign={'center'}
                                            />
                                            <Pressable activeOpacity={4} style={[styles.input, { borderColor: colors.body, borderWidth: 1, right: 10, top: 10, width: '60%', display: enick ? 'none' : 'flex', justifyContent: 'center', backgroundColor: colors.body, alignItems: 'flex-end', paddingRight: 10 }]} onPress={() => setENick(true)}>

                                                <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', letterSpacing: .9, left: 0, letterSpacing: .9 }}>{nickname == "" || nickname == null || nickname == 'null' ? '-' : nickname}</Text>

                                            </Pressable>

                                        </View> */}

                                        {/* Alternative Mobile No */}
                                        <View style={{ width: '100%', height: 5 }} />
                                        <View style={[styles.inputdiv, { flexDirection: 'row' }]} >

                                            <View style={{ width: '40%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, top: 20 }}>

                                                <Text style={{ color: colors.ash, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'none' : 'flex' }}>নাম</Text>
                                                <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Mobile Number: </Text>
                                            </View>
                                            <TextInput
                                                style={[styles.input, { width: '60%', borderColor: altnumberstatus ? '#C7C8D2' : colors.red, top: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: ealt ? 'flex' : 'none', color: colors.text }]}
                                                onChangeText={newTest => setAltphonenumber(newTest)}
                                                defaultValue={phone}
                                                placeholder="EX. 017XXXXXXXX"
                                                maxLength={11}
                                                keyboardType="numeric"
                                                placeholderTextColor={colors.ash}
                                                editable={false}
                                            // textAlign={'center'}
                                            />
                                            <Pressable activeOpacity={4} style={[styles.input, { borderColor: colors.body, borderWidth: 1, right: 10, top: 10, width: '60%', display: ealt ? 'none' : 'flex', justifyContent: 'center', backgroundColor: colors.body, alignItems: 'flex-end', paddingRight: 10 }]} onPress={() => setEAlt(true)}>

                                                <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', letterSpacing: .9, left: 0, letterSpacing: .9 }}>{phone}</Text>

                                            </Pressable>
                                            {/* <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',right:235,top:40,display: altnumberstatus ? 'none' : 'flex'}}>
                                    
                                        <Text style={{color: colors.red,fontWeight:'700',fontSize:12,paddingBottom:3,display : lan ? 'flex' : 'none',fontFamily: 'Poppins_400Regular',letterSpacing:.9}}>Incorrect Phone Number<Text style={{color:colors.red}}></Text></Text>
                                    
                                    </View> */}
                                        </View>


                                        {/* email */}


                                        <View style={{ width: '100%', height: 5 }} />
                                        <View style={[styles.inputdiv, { flexDirection: 'row' }]} >

                                            <View style={{ width: '40%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, top: 20 }}>

                                                <Text style={{ color: colors.ash, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'none' : 'flex' }}>নাম</Text>
                                                <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Email Address: </Text>
                                            </View>
                                            <TextInput
                                                style={[styles.input, { borderColor: emailstatus ? '#C7C8D2' : colors.red, top: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: eemail ? 'flex' : 'none', color: colors.text }]}
                                                onChangeText={newTest => setEmail(newTest)}
                                                defaultValue={email}

                                                placeholder="example@gmail.com"
                                                placeholderTextColor={colors.ash}
                                            // textAlign={'center'}
                                            />
                                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', right: 235, top: 40, display: emailstatus ? 'none' : 'flex' }}>

                                                <Text style={{ color: colors.red, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Incorrect Email Address<Text style={{ color: colors.red }}></Text></Text>

                                            </View>
                                            <Pressable activeOpacity={4} style={[styles.input, { borderColor: colors.body, borderWidth: 1, right: 10, top: 10, width: '60%', display: eemail ? 'none' : 'flex', justifyContent: 'center', backgroundColor: colors.body, alignItems: 'flex-end', paddingRight: 10 }]} onPress={() => setEemail(true)}>

                                                <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', letterSpacing: .9, left: 0, letterSpacing: .9 }}>{email == "" || email == null || email == "null" ? '-' : email}</Text>

                                            </Pressable>
                                        </View>



                                        {/* address */}

                                        <View style={{ width: '100%', height: 5 }} />
                                        <View style={[styles.inputdiv, { flexDirection: 'row' }]} >

                                            <View style={{ width: '40%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, top: 20 }}>

                                                <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'none' : 'flex' }}>নাম</Text>
                                                <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', left: 5 }}>Address </Text>
                                            </View>
                                            <TextInput

                                                style={[styles.input, { borderColor: colors.white1, marginTop: 5, width: '60%', left: 15, height: 60, fontSize: 12, color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: eaddress ? 'flex' : 'none', color: colors.text }]}
                                                onChangeText={newTest => setAddress(newTest)}
                                                defaultValue={address}
                                                placeholder="129/4, Block-A, Road-5,Vatara......."
                                                placeholderTextColor={colors.text}
                                                multiline={true}
                                            // textAlign={'center'}
                                            />
                                            <Pressable activeOpacity={4} style={[styles.input, { borderColor: colors.body, borderWidth: 1, right: 10, top: 10, width: '60%', height: 60, display: eaddress ? 'none' : 'flex', justifyContent: 'center', backgroundColor: colors.body, alignItems: 'flex-end', paddingRight: 10 }]} onPress={() => setEaddress(true)}>

                                                <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', letterSpacing: .9, left: 0, letterSpacing: .9 }}>{address == null || address == "" || address == "null" ? '-' : address}</Text>

                                            </Pressable>

                                        </View>


                                        {/* Date of Birth */}


                                        {/* <View style={{width:'100%',height:5}}/>
                                <View style={[styles.inputdiv,{flexDirection:'row'}]} >
                                    
                                    <View style={{width:'40%',justifyContent:'flex-start',alignItems:'flex-start',left:10,top:20}}>
                                    
                                        <Text style={{color: colors.ash ,fontWeight:'700',fontSize:12,paddingBottom:3,display : lan ? 'none' : 'flex'}}>নাম</Text>
                                        <Text style={{color: colors.ash ,fontFamily: 'Poppins_400Regular',letterSpacing:.9,fontSize:12,paddingBottom:3,display : lan ? 'flex' : 'none'}}>Date of Birth: </Text>
                                    </View>
                                    <View style={{width:'60%',flexDirection:'row',display: edate ? 'flex' : 'none'}}>
                                        <TextInput 
                                            style={[styles.input,{borderColor: '#C7C8D2',right:0,top:0,width:'80%',color:colors.text,fontFamily: 'Poppins_400Regular',letterSpacing:.9,color:colors.text}]}  
                                            onChangeText={newTest => setDateofbath(newTest)}
                                            defaultValue={dateofbath}

                                            placeholder="DD/MM/YYYY"
                                            maxLength={15}
                                            keyboardType="numeric"
                                            placeholderTextColor={colors.ash}
                                            editable={false}
                                            // textAlign={'center'}
                                        />
                                        <Pressable  activeOpacity={4}  style={{justifyContent:'center',alignItems:'center',width:30,height:30,width:'20%',right:10,top:5}} onPress={()=> showmodedate()}>
                                            <Image  resizeMode='contain' style={{width:30,height:30}} source={require("../assets/calander.jpg")}></Image> 
                                        </Pressable>
                                        {showdate && (
                                        <DateTimePicker
                                        testID='dateTimePicker'
                                        value={date1}
                                        mode={'date'}
                                        display='default'
                                        onChange={onChangeDate}
                                        />
                                        )}
                                    </View>
                                    <Pressable activeOpacity={4} style={[styles.input,{borderColor:colors.body,borderWidth:1,right:10,top:10,width:'60%',display: edate ? 'none' : 'flex',justifyContent:'center',backgroundColor:colors.body,alignItems:'flex-end',paddingRight:10}]} onPress={()=> setEDate(true)}>

                                    <Text style={{color: colors.text ,fontFamily: 'Poppins_400Regular',fontSize:12,paddingBottom:3,display : lan ? 'flex' : 'none',letterSpacing:.9,left:0,letterSpacing:.9}}>{dateofbath == "" || dateofbath == null || dateofbath == "null" ? '-' : dateofbath }</Text>

                                    </Pressable>
                                    
                                </View> */}

                                        {/* Gender*/}

                                        <View style={{ width: '92%', left: 10, height: 50, justifyContent: 'center', flexDirection: 'row' }}>


                                            <Text style={{ width: '30%', right: 20, marginTop: 30, color: colors.ash, fontSize: 12, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: .9, bottom: 5 }} > Gender:</Text>

                                            <View style={[styles.input, { width: '60%', height: '100%', borderBottomWidth: 0, bottom: 5, left: 35, display: egender ? 'flex' : 'none' }]}>

                                                <SelectDropdown
                                                    data={gender1}
                                                    onSelect={(selectedItem, index) => {
                                                        //console.log(selectedItem, index)
                                                        setGender(selectedItem);
                                                    }}
                                                    //    defaultButtonText={month ? month : "Choose Gender" }
                                                    defaultButtonText={gender ? gender : "Select"}
                                                    buttonStyle={{ width: '100%', height: 40, backgroundColor: colors.white, borderColor: colors.ash1, borderBottomWidth: 1, top: 5 }}
                                                    buttonTextStyle={{ fontSize: 12, left: 0, color: colors.text, left: 65, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}
                                                //dropdownStyle={{height:'53%'}}
                                                />

                                                {/* <Arrowdown style={{top:-43,left:85}}/> */}

                                            </View>
                                            <Pressable activeOpacity={4} style={[styles.input, { borderColor: colors.body, borderWidth: 1, right: 0, top: 10, width: '60%', display: egender ? 'none' : 'flex', justifyContent: 'center', backgroundColor: colors.body, alignItems: 'flex-end', paddingRight: 10 }]} onPress={() => setEGender(true)}>

                                                <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', letterSpacing: .9, left: 20, letterSpacing: .9, top: 10 }}>{gender == "" || gender == null || gender == "null" ? '-' : gender}</Text>

                                            </Pressable>

                                        </View>





                                        {/* age */}



                                        <View style={{ width: '100%', height: 10 }} />
                                        <View style={[styles.inputdiv, { flexDirection: 'row' }]} >

                                            <View style={{ width: '40%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, top: 20 }}>

                                                <Text style={{ color: colors.ash, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'none' : 'flex' }}>নাম</Text>
                                                <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', left: 5 }}>Age: </Text>
                                            </View>
                                            <TextInput
                                                style={[styles.input, { borderColor: '#C7C8D2', top: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: eage ? 'flex' : 'none', color: colors.text }]}
                                                onChangeText={newTest => setAge(newTest)}
                                                defaultValue={age}
                                                keyboardType="numeric"
                                                placeholder="45"
                                                maxLength={3}
                                                placeholderTextColor={colors.ash}
                                            />
                                            <Pressable activeOpacity={4} style={[styles.input, { borderColor: colors.body, borderWidth: 1, right: 10, top: 10, width: '60%', display: eage ? 'none' : 'flex', justifyContent: 'center', backgroundColor: colors.body, alignItems: 'flex-end', paddingRight: 10 }]} onPress={() => setEAge(true)}>

                                                <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', letterSpacing: .9, left: 0, letterSpacing: .9 }}>{age == "" || age == null || age == "null" ? '-' : age}</Text>

                                            </Pressable>
                                            {/* <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',left:10,display: namestatus ? 'none' : 'flex'}}>
                                    
                                        <Text style={{color: colors.red,fontWeight:'700',fontSize:12,paddingBottom:3,display : lan ? 'flex' : 'none'}}>name can't be empty<Text style={{color:colors.red}}></Text></Text>
                                    
                                    </View> */}
                                        </View>

                                        {/* height */}


                                        <View style={{ width: '100%', height: 5 }} />
                                        <View style={[styles.inputdiv, { flexDirection: 'row' }]} >

                                            <View style={{ width: '40%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, top: 20 }}>

                                                <Text style={{ color: colors.ash, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'none' : 'flex' }}>নাম</Text>
                                                <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', left: 5 }}>Height (ft): </Text>
                                            </View>
                                            <TextInput
                                                style={[styles.input, { borderColor: '#C7C8D2', top: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: ehight ? 'flex' : 'none', color: colors.text }]}
                                                onChangeText={(newTest) => {
                                                    const updatedHeight = newHeight
                                                        ? [...newHeight, { value: newTest, timestamp: currentTime }]
                                                        : [{ value: newTest, timestamp: currentTime }];

                                                    setHeight(updatedHeight);
                                                }}
                                                defaultValue={height ? height[0]?.value : ""}
                                                keyboardType="numeric"
                                                placeholder="5.3"
                                                placeholderTextColor={colors.ash}
                                                maxLength={6}

                                            />

                                            <Pressable activeOpacity={4} style={[styles.input, { borderColor: colors.body, borderWidth: 1, right: 10, top: 10, width: '60%', display: ehight ? 'none' : 'flex', justifyContent: 'center', backgroundColor: colors.body, alignItems: 'flex-end', paddingRight: 10 }]} onPress={() => setEhight(true)}>

                                                <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', letterSpacing: .9, left: 0, letterSpacing: .9 }}>{height == "" || height == null || height == "null" ? '-' : height[0]?.value}</Text>

                                            </Pressable>
                                            {/* <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',left:10,display: namestatus ? 'none' : 'flex'}}>
                                    
                                        <Text style={{color: colors.red,fontWeight:'700',fontSize:12,paddingBottom:3,display : lan ? 'flex' : 'none'}}>name can't be empty<Text style={{color:colors.red}}></Text></Text>
                                    
                                    </View> */}
                                        </View>

                                        {/* weight */}



                                        <View style={{ width: '100%', height: 5 }} />
                                        <View style={[styles.inputdiv, { flexDirection: 'row' }]} >

                                            <View style={{ width: '40%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, top: 20 }}>

                                                <Text style={{ color: colors.ash, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'none' : 'flex' }}>নাম</Text>
                                                <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', left: 5 }}>Weight (kg): </Text>
                                            </View>
                                            <TextInput
                                                style={[styles.input, { borderColor: '#C7C8D2', top: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: eweight ? 'flex' : 'none', color: colors.text }]}
                                                onChangeText={(newTest) => {
                                                    const updatedWeight = newWeight
                                                        ? [...newWeight, { value: newTest, timestamp: currentTime }]
                                                        : [{ value: newTest, timestamp: currentTime }];

                                                    setWeight(updatedWeight);
                                                }}
                                                defaultValue={weight ? weight[0]?.value : ""}
                                                keyboardType="numeric"
                                                placeholder="1212"
                                                placeholderTextColor={colors.ash}
                                                maxLength={6}
                                            />
                                            <Pressable activeOpacity={4} style={[styles.input, { borderColor: colors.body, borderWidth: 1, right: 10, top: 10, width: '60%', display: eweight ? 'none' : 'flex', justifyContent: 'center', backgroundColor: colors.body, alignItems: 'flex-end', paddingRight: 10 }]} onPress={() => setEweight(true)}>

                                                <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', letterSpacing: .9, left: 0, letterSpacing: .9 }}>{weight == "" || weight == null || weight == "null" ? '-' : weight[0]?.value}</Text>

                                            </Pressable>
                                            {/* <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',left:10,display: namestatus ? 'none' : 'flex'}}>
                                    
                                        <Text style={{color: colors.red,fontWeight:'700',fontSize:12,paddingBottom:3,display : lan ? 'flex' : 'none'}}>name can't be empty<Text style={{color:colors.red}}></Text></Text>
                                    
                                    </View> */}
                                        </View>

                                        {/* Belly Size*/}

                                        <View style={{ width: '100%', height: 10 }} />
                                        <View style={[styles.inputdiv, { flexDirection: 'row' }]} >

                                            <View style={{ width: '40%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, top: 20 }}>

                                                <Text style={{ color: colors.ash, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'none' : 'flex' }}>নাম</Text>
                                                <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', left: 5 }}>Belly Size: </Text>
                                            </View>
                                            <TextInput
                                                style={[styles.input, { borderColor: '#C7C8D2', top: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: eBellySize ? 'flex' : 'none', color: colors.text }]}

                                                onChangeText={(newTest) => {
                                                    const updatedBellySize = newBellySize?.length
                                                        ? [...newBellySize, { value: newTest, timestamp: currentTime }]
                                                        : [{ value: newTest, timestamp: currentTime }];

                                                    setBellySize(updatedBellySize);
                                                }}


                                                // onChangeText={(newTest) => {
                                                // const updatedBellySize = bellySize?.length
                                                //     ? [...bellySize, { value: newTest, timestamp: currentTime }]
                                                //     : [{ value: newTest, timestamp: currentTime }];

                                                //     setBellySize(newTest);
                                                // }}

                                                // onChangeText={newTest => setBellySize(newTest)}

                                                defaultValue={bellySize?.length && bellySize[0]?.value}
                                                keyboardType="numeric"
                                                placeholder="45"
                                                maxLength={3}
                                                placeholderTextColor={colors.ash}
                                            />
                                            <Pressable activeOpacity={4} style={[styles.input, { borderColor: colors.body, borderWidth: 1, right: 10, top: 10, width: '60%', display: eBellySize ? 'none' : 'flex', justifyContent: 'center', backgroundColor: colors.body, alignItems: 'flex-end', paddingRight: 10 }]} onPress={() => setEBellySize(true)}>

                                                <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', letterSpacing: .9, left: 0, letterSpacing: .9 }}>{bellySize == "" || bellySize == null || bellySize == "null" ? '-' : bellySize[0]?.value}</Text>

                                            </Pressable>
                                            {/* <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',left:10,display: namestatus ? 'none' : 'flex'}}>
                                    
                                        <Text style={{color: colors.red,fontWeight:'700',fontSize:12,paddingBottom:3,display : lan ? 'flex' : 'none'}}>name can't be empty<Text style={{color:colors.red}}></Text></Text>
                                    
                                    </View> */}
                                        </View>




                                        {/* <View style={[styles.inputdiv,{flexDirection:'row',height:50}]} >
                                    
                                    <View style={{width:'40%',justifyContent:'flex-start',alignItems:'flex-start',left:10,top:20,height:50}}>
                                    
                                        <Text style={{color: colors.ash ,fontWeight:'700',fontSize:12,paddingBottom:3,display : lan ? 'none' : 'flex'}}>নাম</Text>
                                        <Text style={{color: colors.ash ,fontFamily: 'Poppins_400Regular',letterSpacing:.9,fontSize:12,paddingBottom:3,display : lan ? 'flex' : 'none',left:5}}>Address : </Text>
                                    </View>
                                    <Pressable style={{flexDirection:'row',right:10,bottom:0,width:'60%',justifyContent:'flex-end',alignItems:'flex-end',borderBottomColor:colors.ash2,borderBottomWidth: streetNo == " " ? 1 : 0,height:50}} onPress={ ()=> setOpenmap(true)}>
                                        <Image
                                            style={{ width: 20, height: 20,right:5,bottom:2}}
                                            resizeMode='contain'
                                            source={require('../assets/Google_Maps.jpg')}
                                        />
                                        <Text style={{fontSize:12,color:colors.text,fontFamily: 'Poppins_400Regular',letterSpacing:.9,bottom:0}}>{streetNo == null || streetNo == "" ? "Select Location" : streetNo}</Text>
                                    </Pressable>
                             
                                   
                                </View> */}
                                    </View>










                                    <View style={{ left: 15, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', display: medical ? 'flex' : 'none' }}>

                                        {/* Allergies/Sinus */}

                                        <View style={{ width: '92%', left: 0, height: 53, justifyContent: 'center' }}>


                                            <Text style={{ top: 20, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingBottom: 3, display: lan ? 'flex' : 'none' }} > Allergies/Sinus:</Text>

                                            <Switch
                                                trackColor={{ false: "#767577", true: "#00E8AA" }}
                                                thumbColor={allergies ? "#065540" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch1}
                                                value={medical ? allergies : 'none'}
                                                style={{ right: 20, bottom: 15 }}
                                            />

                                        </View>



                                        {/* Injuries*/}


                                        <View style={{ width: '92%', left: 0, height: 53, justifyContent: 'center', borderTopWidth: 0, borderColor: colors.ash1 }}>


                                            <Text style={{ top: 20, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingBottom: 3, display: lan ? 'flex' : 'none' }} > Injuries:</Text>

                                            <Switch
                                                trackColor={{ false: "#767577", true: "#00E8AA" }}
                                                thumbColor={injuries ? "#065540" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch2}
                                                value={medical ? injuries : 'none'}
                                                style={{ right: 20, bottom: 15 }}
                                            />

                                        </View>


                                        {/* Surgeries*/}


                                        <View style={{ width: '92%', left: 0, height: 53, justifyContent: 'center', borderTopWidth: 0, borderColor: colors.ash1 }}>


                                            <Text style={{ top: 20, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingBottom: 3, display: lan ? 'flex' : 'none' }} > Surgeries:</Text>

                                            <Switch
                                                trackColor={{ false: "#767577", true: "#00E8AA" }}
                                                thumbColor={surgeries ? "#065540" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch3}
                                                value={medical ? surgeries : 'none'}
                                                style={{ right: 20, bottom: 15 }}
                                            />

                                        </View>

                                        {/* Diabetes*/}


                                        <View style={{ width: '92%', left: 0, height: 53, justifyContent: 'center', borderTopWidth: 0, borderBottomWidth: 0, borderColor: colors.ash1 }}>


                                            <Text style={{ top: 20, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingBottom: 3, display: lan ? 'flex' : 'none' }} > Diabetes:</Text>

                                            <Switch
                                                trackColor={{ false: "#767577", true: "#00E8AA" }}
                                                thumbColor={diabetes ? "#065540" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch4}
                                                value={medical ? diabetes : 'none'}
                                                style={{ right: 20, bottom: 15 }}
                                            />

                                        </View>

                                        {/* asthma*/}
                                        <View style={{ width: '100%', height: 10, }} />

                                        <View style={{ width: '92%', left: 0, height: 53, justifyContent: 'center', borderTopWidth: 0, borderBottomWidth: 0, borderColor: colors.ash1 }}>


                                            <Text style={{ top: 20, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingBottom: 3, display: lan ? 'flex' : 'none' }} > Asthma:</Text>

                                            <Switch
                                                trackColor={{ false: "#767577", true: "#00E8AA" }}
                                                thumbColor={asthma ? "#065540" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch10}
                                                value={medical ? asthma : 'none'}
                                                style={{ right: 20, bottom: 15 }}
                                            />

                                        </View>
                                        {/* ardiac_disease*/}
                                        <View style={{ width: '100%', height: 10, }} />

                                        <View style={{ width: '92%', left: 0, height: 53, justifyContent: 'center', borderTopWidth: 0, borderBottomWidth: 0, borderColor: colors.ash1 }}>


                                            <Text style={{ top: 20, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingBottom: 3, display: lan ? 'flex' : 'none' }} > Ardiac Disease:</Text>

                                            <Switch
                                                trackColor={{ false: "#767577", true: "#00E8AA" }}
                                                thumbColor={ardiac_disease ? "#065540" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch11}
                                                value={medical ? ardiac_disease : 'none'}
                                                style={{ right: 20, bottom: 15 }}
                                            />

                                        </View>
                                        {/* hypertension*/}
                                        <View style={{ width: '100%', height: 10, }} />

                                        <View style={{ width: '92%', left: 0, height: 53, justifyContent: 'center', borderTopWidth: 0, borderBottomWidth: 0, borderColor: colors.ash1 }}>


                                            <Text style={{ top: 20, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingBottom: 3, display: lan ? 'flex' : 'none' }} > Hypertension:</Text>

                                            <Switch
                                                trackColor={{ false: "#767577", true: "#00E8AA" }}
                                                thumbColor={hypertension ? "#065540" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch12}
                                                value={medical ? hypertension : 'none'}
                                                style={{ right: 20, bottom: 15 }}
                                            />

                                        </View>
                                        {/*thyroid*/}
                                        <View style={{ width: '100%', height: 10, }} />

                                        <View style={{ width: '92%', left: 0, height: 53, justifyContent: 'center', borderTopWidth: 0, borderBottomWidth: 0, borderColor: colors.ash1 }}>


                                            <Text style={{ top: 20, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingBottom: 3, display: lan ? 'flex' : 'none' }} > Thyroid:</Text>

                                            <Switch
                                                trackColor={{ false: "#767577", true: "#00E8AA" }}
                                                thumbColor={thyroid ? "#065540" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch13}
                                                value={medical ? thyroid : 'none'}
                                                style={{ right: 20, bottom: 15 }}
                                            />

                                        </View>
                                        {/* pcos_pcod*/}
                                        <View style={{ width: '100%', height: 10, }} />

                                        <View style={{ width: '92%', left: 0, height: 53, justifyContent: 'center', borderTopWidth: 0, borderBottomWidth: 0, borderColor: colors.ash1 }}>


                                            <Text style={{ top: 20, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingBottom: 3, display: lan ? 'flex' : 'none' }} > PCOS/PCOD:</Text>

                                            <Switch
                                                trackColor={{ false: "#767577", true: "#00E8AA" }}
                                                thumbColor={pcos_pcod ? "#065540" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch14}
                                                value={medical ? pcos_pcod : 'none'}
                                                style={{ right: 20, bottom: 15 }}
                                            />

                                        </View>

                                        {/* cancer*/}
                                        <View style={{ width: '100%', height: 10, }} />

                                        <View style={{ width: '92%', left: 0, height: 53, justifyContent: 'center', borderTopWidth: 0, borderBottomWidth: 0, borderColor: colors.ash1 }}>


                                            <Text style={{ top: 20, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingBottom: 3, display: lan ? 'flex' : 'none' }} > Cancer:</Text>

                                            <Switch
                                                trackColor={{ false: "#767577", true: "#00E8AA" }}
                                                thumbColor={cancer ? "#065540" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch15}
                                                value={medical ? cancer : 'none'}
                                                style={{ right: 20, bottom: 15 }}
                                            />

                                        </View>


                                        {/* Blood prasure*/}
                                        <View style={{ width: '100%', height: 10, }} />





                                        <View style={[styles.inputdiv, { flexDirection: 'row', right: 10 }]} >

                                            <View style={{ width: '60%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, top: 5 }}>

                                                <Text style={{ color: colors.ash, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'none' : 'flex' }}>নাম</Text>
                                                <Text style={{ color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', left: 5 }}>Blood Pressure: </Text>
                                            </View>
                                            <TextInput
                                                style={[styles.input, { width: '30%', borderColor: '#C7C8D2', left: 20, top: -5, fontFamily: 'Poppins_400Regular', letterSpacing: .9, display: eprasure ? 'flex' : 'none', color: colors.text }]}

                                                onChangeText={(newTest) => {
                                                    const updatedBloodpressure = newBloodpressure
                                                        ? [...newBloodpressure, { value: newTest, timestamp: currentTime }]
                                                        : [{ value: newTest, timestamp: currentTime }];

                                                    setBloodpressure(updatedBloodpressure);
                                                }}
                                                defaultValue={bloodpressure ? bloodpressure[0]?.value : ""}


                                                keyboardType="numeric"
                                                placeholder="90-120"
                                                maxLength={12}
                                                placeholderTextColor={colors.ash}
                                            />
                                            <Pressable activeOpacity={4} style={[styles.input, { borderColor: colors.body, borderWidth: 1, left: 5, top: 0, width: '30%', display: eprasure ? 'none' : 'flex', justifyContent: 'center', backgroundColor: colors.body, alignItems: 'flex-end', paddingRight: 10 }]} onPress={() => setEprasure(true)}>

                                                <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', letterSpacing: .9, left: 0, letterSpacing: .9 }}>{bloodpressure == "" || bloodpressure == null || bloodpressure == "null" ? '-' : bloodpressure[0]?.value}</Text>

                                            </Pressable>
                                            {/* <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',left:10,display: namestatus ? 'none' : 'flex'}}>
                                    
                                        <Text style={{color: colors.red,fontWeight:'700',fontSize:12,paddingBottom:3,display : lan ? 'flex' : 'none'}}>name can't be empty<Text style={{color:colors.red}}></Text></Text>
                                    
                                    </View> */}
                                        </View>

                                        {/* bloodgroup */}

                                        <View style={{ width: '92%', height: 80, justifyContent: 'center', flexDirection: 'row' }}>


                                            <Text style={{ width: '40%', right: 0, marginTop: 20, color: colors.ash, fontSize: 12, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: .9, bottom: 5 }} > Blood Group:</Text>

                                            <View style={[styles.input, { width: '60%', height: 53, left: 0, borderBottomWidth: 0, bottom: 5, justifyContent: 'flex-end', alignItems: 'flex-end', display: eblood ? 'flex' : 'none' }]}>

                                                <SelectDropdown
                                                    data={blood}
                                                    onSelect={(selectedItem, index) => {
                                                        //console.log(selectedItem, index)
                                                        setBloodgroup(selectedItem);
                                                    }}
                                                    //    defaultButtonText={month ? month : "Choose Gender" }
                                                    defaultButtonText={bloodgroup != "" ? bloodgroup : "Select Group"}
                                                    buttonStyle={{ width: '52%', height: 40, backgroundColor: colors.white, borderColor: colors.ash1, borderBottomWidth: 1, top: 5 }}
                                                    buttonTextStyle={{ fontSize: 12, left: 0, color: colors.text, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}
                                                //dropdownStyle={{height:'53%'}}
                                                />

                                                {/* <Arrowdown style={{top:-10,right:10}}/> */}

                                            </View>
                                            <Pressable activeOpacity={4} style={[styles.input, { borderColor: colors.body, borderWidth: 1, right: 35, top: 10, width: '60%', display: eblood ? 'none' : 'flex', justifyContent: 'center', backgroundColor: colors.body, alignItems: 'flex-end', paddingRight: 10 }]} onPress={() => setEblood(true)}>

                                                <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', letterSpacing: .9, left: 15, letterSpacing: .9, top: 0 }}>{bloodgroup == "" || bloodgroup == null || bloodgroup == "null" ? '-' : bloodgroup}</Text>

                                            </Pressable>

                                        </View>

                                        <View style={styles.inputContainer1}>
                                            <Text style={[styles.inputLabel1, { color: colors.ash, letterSpacing: .9, }]}>Over All Health Conditions</Text>
                                            <TextInput
                                                style={styles.input1}
                                                placeholder='  Notes..'
                                                value={healthconditions}
                                                onChangeText={setHealthconditions}
                                            />
                                        </View>


                                    </View>






                                    <View style={{ left: 15, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', display: lifestyle ? 'flex' : 'none' }}>

                                        {/* Smoking Habit */}

                                        <View style={{ width: '92%', left: 0, height: 53, justifyContent: 'center' }}>


                                            <Text style={{ top: 20, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingBottom: 3, display: lan ? 'flex' : 'none' }} > Smoking Habit:</Text>

                                            <Switch
                                                trackColor={{ false: "#767577", true: "#00E8AA" }}
                                                thumbColor={smoking ? "#065540" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch5}
                                                value={lifestyle ? smoking : 'none'}
                                                style={{ right: 20, bottom: 15 }}
                                            />

                                        </View>



                                        {/* Alcohol Consumption*/}


                                        <View style={{ width: '92%', left: 0, height: 53, justifyContent: 'center', borderTopWidth: 0, borderColor: colors.ash1 }}>


                                            <Text style={{ top: 20, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingBottom: 3, display: lan ? 'flex' : 'none' }} > Alcohol Consumption:</Text>



                                            <Switch
                                                trackColor={{ false: "#767577", true: "#00E8AA" }}
                                                thumbColor={alcohol ? "#065540" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch6}
                                                value={lifestyle ? alcohol : 'none'}
                                                style={{ right: 20, bottom: 15 }}
                                            />
                                        </View>


                                        {/* Walking Daily*/}


                                        <View style={{ width: '92%', left: 0, height: 53, justifyContent: 'center', borderTopWidth: 0, borderColor: colors.ash1 }}>


                                            <Text style={{ top: 20, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingBottom: 3, display: lan ? 'flex' : 'none' }} > Walking Daily:</Text>

                                            <Switch
                                                trackColor={{ false: "#767577", true: "#00E8AA" }}
                                                thumbColor={walking ? "#065540" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch7}
                                                value={lifestyle ? walking : 'none'}
                                                style={{ right: 20, bottom: 15 }}
                                            />

                                        </View>

                                        {/* Junk Food Consumption*/}


                                        <View style={{ width: '92%', left: 0, height: 53, justifyContent: 'center', borderTopWidth: 0, borderColor: colors.ash1 }}>


                                            <Text style={{ top: 20, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingBottom: 3, display: lan ? 'flex' : 'none' }} > Junk Food Consumption:</Text>

                                            <Switch
                                                trackColor={{ false: "#767577", true: "#00E8AA" }}
                                                thumbColor={junk ? "#065540" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch8}
                                                value={lifestyle ? junk : 'none'}
                                                style={{ right: 20, bottom: 15 }}
                                            />

                                        </View>




                                        {/* Gym*/}


                                        <View style={{ width: '92%', left: 0, height: 53, justifyContent: 'center', borderTopWidth: 0, borderColor: colors.ash1 }}>


                                            <Text style={{ top: 20, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, paddingBottom: 3, display: lan ? 'flex' : 'none' }} > Gym:</Text>

                                            <Switch
                                                trackColor={{ false: "#767577", true: "#00E8AA" }}
                                                thumbColor={gym ? "#065540" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch9}
                                                value={lifestyle ? gym : 'none'}
                                                style={{ right: 20, bottom: 15 }}
                                            />

                                        </View>

                                        {/* Occupation*/}

                                        <View style={{ width: '92%', left: 0, height: 53, justifyContent: 'center', borderTopWidth: 0, borderColor: colors.ash1, flexDirection: 'row' }}>


                                            <Text style={{ right: 22, marginTop: 10, color: colors.ash, fontSize: 12, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: .9, bottom: 0 }} > Occupation:</Text>

                                            <View style={[styles.input, { borderColor: colors.ash1, width: '60%', height: '100%', borderBottomWidth: 0, left: 35, display: eoccu ? 'flex' : 'none' }]}>

                                                <SelectDropdown
                                                    data={occu}
                                                    onSelect={(selectedItem, index) => {
                                                        //console.log(selectedItem, index)
                                                        setOccupation(selectedItem);
                                                    }}
                                                    //    defaultButtonText={month ? month : "Choose Gender" }
                                                    defaultButtonText={occupation != "" ? occupation : "Select"}

                                                    buttonStyle={{ width: '100%', height: 40, backgroundColor: colors.white, borderColor: colors.ash1, borderBottomWidth: 1, top: 0 }}
                                                    buttonTextStyle={{ fontSize: 12, left: 0, color: colors.text, left: 45, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}
                                                //dropdownStyle={{height:'53%'}}
                                                />

                                                {/* <Arrowdown style={{top:-25,left:85}}/> */}

                                            </View>
                                            <Pressable activeOpacity={4} style={[styles.input, { borderColor: colors.body, borderWidth: 1, right: 10, top: 0, width: '60%', display: eoccu ? 'none' : 'flex', justifyContent: 'center', backgroundColor: colors.body, alignItems: 'flex-end', paddingRight: 10 }]} onPress={() => setEoccu(true)}>

                                                <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none', letterSpacing: .9, left: 15, letterSpacing: .9, top: 5 }}>{occupation == "" || occupation == null || occupation == "null" ? '-' : occupation}</Text>

                                            </Pressable>

                                        </View>


                                    </View>


                                    <Pressable disabled={submitflag ? false : true} style={[styles.tuchabluebutton, { backgroundColor: isLoading1 ? colors.ash : '#065540', width: '55%', flexDirection: 'row', marginBottom: 40, height: 40, backgroundColor: submitflag ? "#EE416C" : colors.ash1, borderRadius: 4 }]} onPress={() => { setSubmitflag(false), setLoading1(true), UpdateUser(); }}>
                                        <ActivityIndicator size="small" color="#00263C" style={{ display: isLoading1 ? 'flex' : 'none', right: 30 }} />

                                        <Text style={{ color: colors.white, fontSize: 14, display: lan ? 'none' : 'flex' }}>জমা দিন</Text>
                                        <Text style={{ color: colors.white, fontSize: 12, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>UPDATE</Text>
                                    </Pressable>

                                    {/* <Pressable disabled={submitflag ? false : true} style={{justifyContent:'center',alignItems:'center', width:'35%' ,height:40, backgroundColor: submitflag ? colors.green : colors.ash1,borderRadius:4}}>
                                
                                <Text style={{color: colors.white, fontSize:12,letterSpacing:.9,fontFamily: 'Poppins_500Medium'}}  onPress={()=> Adddonor()}>EDIT</Text>

                            </Pressable> */}

                                </View>
                            </View>




                        </View>

                    </View>


                </ScrollView>

            </View>

            <View style={{ marginBottom: 5, width: '95%', height: 38, borderColor: '#D50400', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: nointernet ? "flex" : "none" }}>
                <Text style={{ marginLeft: 15, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: "#D50400" }}>No Internet Connection.</Text>
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

                    <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.dblue, borderBottomWidth: 0 }]}

                        onPress={() => {
                            if (userAllData?.chat_status) {
                                navigation.navigate("UserChat", {
                                    userName: userAllData?.name,
                                    user_FUId: userAllData?.user_FUId,
                                    image: userAllData?.image,
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
    body1: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingTop: 50,
    },
    imgview: {
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        width: 110,
        height: 110,
    },


    inputdiv: {
        width: "98%",
        height: 50,
        // justifyContent: "center",
        // alignItems:'center',  
        paddingBottom: 10,
        //top:-100

    },

    input: {
        width: "60%",
        height: 40,
        borderColor: '#C7C8D2',
        borderBottomWidth: 1,
        alignItems: 'center',
        padding: 5,
        paddingBottom: 0,
        borderRadius: 4,
        fontSize: 12,
        justifyContent: 'space-between'

    },
    inputContainer1: {
        width: "95%",
        // flexDirection: "row",
        alignItems: "center",
        marginTop: 0,
    },

    inputLabel1: {
        width: "100%",
        // flex: 0.5,
        fontSize: 12,
        // marginRight: 10,
        marginBottom: 10
    },

    input1: {
        width: "100%",
        // flex: 1,
        height: 100,
        borderWidth: 1,
        borderColor: "#D6D4D4",
        color: "#606060",
        paddingLeft: 10,
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 5,
        backgroundColor: "#fff",
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
    sendform: {

        width: "100%",
        justifyContent: "center",
        alignItems: 'center',
        paddingTop: 50,
    },

    tuchabluebutton: {
        // paddingTop:20,
        width: "92%",
        height: 35,
        borderRadius: 4,
        backgroundColor: "#303030",
        justifyContent: "center",
        alignItems: 'center',
        top: 20

    },


});

export default UserProfile;