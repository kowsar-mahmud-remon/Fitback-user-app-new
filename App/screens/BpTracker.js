import React, { useState, useEffect, useContext, useRef } from 'react';
import { Dimensions, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';

import { UserContext } from '../../components/CredintailsContext';


import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

function BpTracker({ navigation, route }) {

  const [unread, setUnread] = useState(false);
  const { authtoken, setAuthtoken } = useContext(UserContext);
  const [getnotify, setGetnotify] = useState(true);

  let screenHight = Dimensions.get('window').height;

  // const [monthWiseData, setMonthWiseData] = useState();


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
  const [area, setArea] = useState(null);
  const [filter, setFilter] = useState(null);

  const { testCredentials, setTestCredentials } = useContext(UserContext);
  const [lan, setLan] = useState(true);
  const [userid, setUserid] = useState(testCredentials.userid);

  const [getUser, setgetUser] = useState(true);

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
  const [getProductdata, setGetProductdata] = useState([]);

  const [getDoctor, setGetDoctor] = useState(true);
  const [getDoctordata, setGetDoctordata] = useState([]);

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

  const [donerChackflag, setDonerChackflag] = useState(false);
  const [donerflag, setDonerflag] = useState(false);

  const [donerregflag, setDonerregflag] = useState(false);


  const [clusternamep, setClusternamep] = useState(null);
  const [namep, setNamep] = useState(null);
  const [phonep, setPhonep] = useState(null);
  const [emailp, setEmailp] = useState(null);
  const [areap, setAreap] = useState(null);
  const [postcodep, setPostcodep] = useState(null);
  const [streetNop, setStreetNop] = useState(null);
  const [nicknamep, setNicknamep] = useState(null);

  const [bloodgroupp, setBloodgroupp] = useState("00");
  const [genderp, setGenderp] = useState(null);
  const [agep, setAgep] = useState(null);
  const [heightp, setHeightp] = useState(null);
  const [weightp, setWeightp] = useState(null);
  const [weightData, setWeightData] = useState();
  const [bloodpressurep, setBloodpressurep] = useState(null);
  const [altphonenumberp, setAltphonenumberp] = useState(null);
  const [emgphonenumberp, setEmgphonenumberp] = useState(null);
  const [dateofbathp, setDateofbathp] = useState(null);
  const [occupationp, setOccupationp] = useState(null);

  const [allergiesp, setAllergiesp] = useState(null);
  const [injuriesp, setInjuriesp] = useState(null);
  const [surgeriesp, setSurgeriesp] = useState(null);
  const [diabetesp, setDiabetesp] = useState(null);
  const [smokingp, setSmokingp] = useState(null);
  const [alcoholp, setAlcoholp] = useState(null);
  const [walkingp, setWalkingp] = useState(null);
  const [junkp, setJunkp] = useState(null);
  const [gymp, setGymp] = useState(null);

  const [mypetientsp, setMypetientsp] = useState(null);

  // setGetDoctor

  let formdata = new FormData();

  const ProductInfo = async () => {
    try {
      if (getProduct) {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
        };

        await fetch('https://qwikmedic.pythonanywhere.com/bloodDonar', requestOptions)
          .then((response) => response.json())
          .then((json) => {

            setGetProductdata(json);


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

      setLoading123(false);

    }

    setGetProduct(false);


  };

  const DoctorInfo = async () => {
    try {
      if (getDoctor) {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
        };

        await fetch('https://qwikmedic.pythonanywhere.com/doctorProfile', requestOptions)
          .then((response) => response.json())
          .then((json) => {

            setGetDoctordata(json);


            setNointernet(false);
            setLoading(false);

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
          setWeightData(json.weight);

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

          setMypetientsp(json.mypetients);


        })
        .catch((error) => {
          console.error(error);
          setNointernet(true);
          setLoading1(false);

        });

      setgetUser(false);
    }
  };



  UserInfo();


  const [checkdata, setCheckdata] = useState(true);

  const Getdata = () => {
    if (checkdata) {

      getProductdata.map((item, index) => {
        if (item.userid == userid) {
          allimage.push(item);
          setDonerregflag(true);
        }
      });

      allimage.map((item, index) => {
        setDonerChackflag(item.validationstatus);
        setDonerflag(item.eligibilitystatus);
      });
    }
    setArrayloading(false);
    setCheckdata(false);

  };



  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];

  //  console.log(prevRoute)



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

  const back = (() => {

    // const {params} =  navigation.state;
    const { goBack } = navigation;
    goBack();

  });

  useEffect(() => {

    ProductInfo();
    DoctorInfo();
    // console.log(getDoctordata)
    // NotificationCheck()
    // FlatInfo()
    if (isLoading123 == false) {
      Getdata();
    }

    if (route.params.donorflag) {
      navigation.navigate("BloodDonation", {});
    }

    if (route.params.cancelflag) {
      navigation.navigate("BloodRequestCheck", {});
    }

    if (route.params.ambulance) {
      navigation.navigate("Services", { checkorderstatus: true });
    }
    if (route.params.newrequest) {
      navigation.navigate("AmbulanceRequest", {
        namep: namep, phonep: phonep, emailp: emailp, areap: areap, postcodep: postcodep, streetNop: streetNop, nicknamep: nicknamep,
        bloodgroupp: bloodgroupp, genderp: genderp, agep: agep, heightp: heightp, weightp: weightp, bloodpressurep: bloodpressurep,
        altphonenumberp: altphonenumberp, emgphonenumberp: emgphonenumberp, dateofbathp: dateofbathp, occupationp: occupationp,
        allergiesp: allergiesp, injuriesp: injuriesp, surgeriesp: surgeriesp, diabetesp: diabetesp, smokingp: smokingp, alcoholp: alcoholp, walkingp: walkingp, junkp: junkp, gymp: gymp, nofi: false
      });
    }


    if (route.params.bypassDoctor) {
      navigation.navigate("OnlineDoctor", {
        getDoctordata: getDoctordata == null ? [] : getDoctordata,
        namep: namep, phonep: phonep, emailp: emailp, areap: areap, postcodep: postcodep, streetNop: streetNop, nicknamep: nicknamep,
        bloodgroupp: bloodgroupp, genderp: genderp, agep: agep, heightp: heightp, weightp: weightp, bloodpressurep: bloodpressurep,
        altphonenumberp: altphonenumberp, emgphonenumberp: emgphonenumberp, dateofbathp: dateofbathp, occupationp: occupationp,
        allergiesp: allergiesp, injuriesp: injuriesp, surgeriesp: surgeriesp, diabetesp: diabetesp, smokingp: smokingp, alcoholp: alcoholp, walkingp: walkingp, junkp: junkp, gymp: gymp

      });
    }



  });

  const processBloodPressurepData = (data) => {
    if (!data || data.length === 0) {
      return {}; // Return an empty object if data is null or empty
    }

    const monthWiseData = {};

    data.forEach((entry) => {
      const date = new Date(entry.timestamp);
      const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      const dateStr = date.toLocaleDateString();

      if (!monthWiseData[month]) {
        monthWiseData[month] = [];
      }

      monthWiseData[month].push({ date: dateStr, weight: entry.value });
    });

    // setMonthWiseData(monthWiseData);

    return monthWiseData;
  };

  const monthWiseData = processBloodPressurepData(bloodpressurep);



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

            <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  BP Tracker </Text>

          </View>



        </View>


        <View style={[styles.body1]}>
          <ScrollView style={{ width: "100%" }} >



            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 40, paddingHorizontal: 10 }}>


              <View style={styles.tableContainer}>
                <Text style={styles.tableTitle}>Your Blood Pressure History</Text>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableHeading}>Month</Text>
                    <Text style={styles.tableHeading}>Date</Text>
                    <Text style={styles.tableHeading}>Your BP</Text>
                  </View>
                  {Object.keys(monthWiseData).map((month) => (
                    monthWiseData[month].map((entry, index) => (
                      <View key={`${month}-${index}`} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{index === 0 ? month : ''}</Text>
                        <Text style={styles.tableCell}>{entry.date}</Text>
                        <Text style={styles.tableCell}>{entry.weight}</Text>
                      </View>
                    ))
                  ))}
                </View>
              </View>
            </View>


            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 40, paddingHorizontal: 10 }}>


              <View style={styles.tableContainer}>
                <Text style={styles.tableTitle}>Recommended Blood Pressure Levels</Text>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableHeading}>Category</Text>
                    <Text style={styles.tableHeading}>Systolic (mm Hg)</Text>
                    <Text style={styles.tableHeading}>Diastolic (mm Hg)</Text>
                    <Text style={styles.tableHeading}>Interpretation</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Normal</Text>
                    <Text style={styles.tableCell}>{"<"} 120</Text>
                    <Text style={styles.tableCell}>{"<"} 80</Text>
                    <Text style={styles.tableCell}>Healthy</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Elevated</Text>
                    <Text style={styles.tableCell}>120-129</Text>
                    <Text style={styles.tableCell}>{"<"} 80</Text>
                    <Text style={styles.tableCell}>Monitor</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Hypertension Stage 1</Text>
                    <Text style={styles.tableCell}>130-139</Text>
                    <Text style={styles.tableCell}>80-89</Text>
                    <Text style={styles.tableCell}>Seek advice</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Hypertension Stage 2</Text>
                    <Text style={styles.tableCell}>{"≥"} 140</Text>
                    <Text style={styles.tableCell}>{"≥"} 90</Text>
                    <Text style={styles.tableCell}>Risk of health issues</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Hypertensive Crisis</Text>
                    <Text style={styles.tableCell}>{">"} 180</Text>
                    <Text style={styles.tableCell}>{">"} 120</Text>
                    <Text style={styles.tableCell}>Seek emergency care</Text>
                  </View>

                </View>
              </View>
            </View>

          </ScrollView>

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



          <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.dblue, borderBottomWidth: 4 }]} onPress={() => navigation.navigate("Health", {})}>

            <Image resizeMode={'cover'} style={{ width: 24, height: 24 }} source={require("../assets/fitback/healthIcon.png")} />
            <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
            <Text style={{ top: 7.8, color: colors.dblue, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>Health</Text>

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
  },
  tableContainer: {
    width: "100%",
    marginBottom: 40,
  },

  tableTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  table: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#7e7d7d",
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#e9e9e9"

  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderBottomWidth: 1,
    // borderColor: "#ccc",
    // paddingVertical: 10,
  },

  tableHeading: {
    flex: 1,
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    paddingHorizontal: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#adadad",
    paddingVertical: 10,
  },

  tableCell: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    paddingHorizontal: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#adadad",
    paddingVertical: 10,
  },
});

export default BpTracker;