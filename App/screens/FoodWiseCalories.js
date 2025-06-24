import React, { useState, useEffect, useContext, useRef } from 'react';
import { Dimensions, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Alert, Animated } from 'react-native';
import colors from '../config/colors';

import { UserContext } from '../../components/CredintailsContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

function FoodWiseCalories({ navigation, route }) {
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

  const [getUser, setgetUser] = useState(true);

  const [getProductdata, setGetProductdata] = useState([]);

  const [getDoctordata, setGetDoctordata] = useState([]);

  const [allimage, setAllimage] = useState([]);

  const [isLoading123, setLoading123] = useState(true);

  const [nointernet, setNointernet] = useState(false);
  const [isLoading1, setLoading1] = useState(false);

  const [arrayloading, setArrayloading] = useState(true);


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


  const [personal, setPersonal] = useState(true);
  const [medical, setMedical] = useState(false);


  const pressPersonal = () => {

    setPersonal(true);
    setMedical(false);
  };
  const pressMedical = () => {

    setPersonal(false);
    setMedical(true);
  };

  const [mypetientsp, setMypetientsp] = useState(null);

  // setGetDoctor

  const [userData, setUserData] = useState();

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
          setUserData(json);

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



  useEffect(() => {

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

            <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Food Wise Calories </Text>

          </View>



        </View>


        <View style={[styles.body1, { justifyContent: 'flex-start', alignItems: 'center' }]}>
          {/* <ScrollView > */}


          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 40, paddingHorizontal: 16 }}>

            <View style={{ marginBottom: 5, bottom: 15, width: '100%', height: 38, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', left: 0 }}>

              <Pressable style={{ marginLeft: 0, flexDirection: 'row', borderRadius: 20, width: '48%', height: 36, backgroundColor: personal ? "#EE416C" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { pressPersonal(); }}>



                <Text style={{ fontSize: 14, color: personal ? colors.white : "#EE416C", left: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>All Food</Text>

              </Pressable>
              <Pressable style={{ marginLeft: 0, flexDirection: 'row', borderRadius: 20, width: '48%', height: 36, backgroundColor: medical ? "#EE416C" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { pressMedical(); }}>



                <Text style={{ fontSize: 14, color: medical ? colors.white : "#EE416C", left: 5, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>Bengali Food</Text>

              </Pressable>




            </View>

            <View style={{
              width: "100%",
              justifyContent: "center",
              alignItems: 'center',
            }}>

              <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', display: personal ? 'flex' : 'none' }}>
                <View style={styles.foodContainer}>
                  <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", flexDirection: "row" }}>
                    <View style={{ width: "20%" }}>
                      <Image
                        style={{
                          borderRadius: 100,
                          width: 50,
                          height: 50,
                          marginRight: 20
                        }}
                        source={
                          // data?.user_image_upload && data?.user_image_upload.trim() !== ''
                          //   ? { uri: data?.user_image_upload }
                          //   : 
                          require('../assets/fitback/profileIcon.png')
                        }
                      // resizeMode='contain'
                      />

                    </View>
                    <View style={{ width: "80%", }}>
                      <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14 }}>Salad with eggs</Text>

                      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                        <MaterialIcons style={{ marginBottom: 3 }} name="local-fire-department" size={18} color="#FFA500" />
                        <Text style={{ fontFamily: 'Poppins_400Regular', color: "#9A9999", fontSize: 12, marginLeft: 4 }}>294 kcal -100g</Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ width: "100%", marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ width: "31%", flexDirection: "row", alignItems: "center" }}>
                      <Image
                        style={{
                          width: 15,
                          height: 15,
                          marginBottom: 3,
                          marginRight: 4

                        }}
                        source={
                          require('../assets/fitback/proteinIcon.png')
                        }
                      // resizeMode='contain'
                      />
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "#6b6b6b", fontSize: 14, marginRight: 4 }}>Protein</Text>
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "orange", fontSize: 12 }}>Low</Text>

                    </View>
                    <View style={{ width: "31%", flexDirection: "row", alignItems: "center" }}>
                      <Image
                        style={{
                          width: 16,
                          height: 16,
                          marginBottom: 3,
                          marginRight: 4

                        }}
                        source={
                          require('../assets/fitback/fatIcon.png')
                        }
                      // resizeMode='contain'
                      />
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "#6b6b6b", fontSize: 14, marginRight: 4 }}>Fats</Text>
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "green", fontSize: 12 }}>Normal</Text>

                    </View>
                    <View style={{ width: "31%", flexDirection: "row", alignItems: "center" }}>
                      <Image
                        style={{
                          width: 16,
                          height: 16,
                          marginBottom: 3,
                          marginRight: 4

                        }}
                        source={
                          require('../assets/fitback/carbIcon.png')
                        }
                      // resizeMode='contain'
                      />
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "#6b6b6b", fontSize: 14, marginRight: 4 }}>Carbs</Text>
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "red", fontSize: 12 }}>High</Text>

                    </View>
                  </View>

                </View>
                <View style={styles.foodContainer}>
                  <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", flexDirection: "row" }}>
                    <View style={{ width: "20%" }}>
                      <Image
                        style={{
                          borderRadius: 100,
                          width: 50,
                          height: 50,
                          marginRight: 20
                        }}
                        source={
                          // data?.user_image_upload && data?.user_image_upload.trim() !== ''
                          //   ? { uri: data?.user_image_upload }
                          //   : 
                          require('../assets/fitback/profileIcon.png')
                        }
                      // resizeMode='contain'
                      />

                    </View>
                    <View style={{ width: "80%", }}>
                      <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14 }}>Salad with eggs</Text>

                      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                        <MaterialIcons style={{ marginBottom: 3 }} name="local-fire-department" size={18} color="#FFA500" />
                        <Text style={{ fontFamily: 'Poppins_400Regular', color: "#9A9999", fontSize: 12, marginLeft: 4 }}>294 kcal -100g</Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ width: "100%", marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ width: "31%", flexDirection: "row", alignItems: "center" }}>
                      <Image
                        style={{
                          width: 15,
                          height: 15,
                          marginBottom: 3,
                          marginRight: 4

                        }}
                        source={
                          require('../assets/fitback/proteinIcon.png')
                        }
                      // resizeMode='contain'
                      />
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "#6b6b6b", fontSize: 14, marginRight: 4 }}>Protein</Text>
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "orange", fontSize: 12 }}>Low</Text>

                    </View>
                    <View style={{ width: "31%", flexDirection: "row", alignItems: "center" }}>
                      <Image
                        style={{
                          width: 16,
                          height: 16,
                          marginBottom: 3,
                          marginRight: 4

                        }}
                        source={
                          require('../assets/fitback/fatIcon.png')
                        }
                      // resizeMode='contain'
                      />
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "#6b6b6b", fontSize: 14, marginRight: 4 }}>Fats</Text>
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "green", fontSize: 12 }}>Normal</Text>

                    </View>
                    <View style={{ width: "31%", flexDirection: "row", alignItems: "center" }}>
                      <Image
                        style={{
                          width: 16,
                          height: 16,
                          marginBottom: 3,
                          marginRight: 4

                        }}
                        source={
                          require('../assets/fitback/carbIcon.png')
                        }
                      // resizeMode='contain'
                      />
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "#6b6b6b", fontSize: 14, marginRight: 4 }}>Carbs</Text>
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "red", fontSize: 12 }}>High</Text>

                    </View>
                  </View>

                </View>
                <View style={styles.foodContainer}>
                  <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", flexDirection: "row" }}>
                    <View style={{ width: "20%" }}>
                      <Image
                        style={{
                          borderRadius: 100,
                          width: 50,
                          height: 50,
                          marginRight: 20
                        }}
                        source={
                          // data?.user_image_upload && data?.user_image_upload.trim() !== ''
                          //   ? { uri: data?.user_image_upload }
                          //   : 
                          require('../assets/fitback/profileIcon.png')
                        }
                      // resizeMode='contain'
                      />

                    </View>
                    <View style={{ width: "80%", }}>
                      <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14 }}>Salad with eggs</Text>

                      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                        <MaterialIcons style={{ marginBottom: 3 }} name="local-fire-department" size={18} color="#FFA500" />
                        <Text style={{ fontFamily: 'Poppins_400Regular', color: "#9A9999", fontSize: 12, marginLeft: 4 }}>294 kcal -100g</Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ width: "100%", marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ width: "31%", flexDirection: "row", alignItems: "center" }}>
                      <Image
                        style={{
                          width: 15,
                          height: 15,
                          marginBottom: 3,
                          marginRight: 4

                        }}
                        source={
                          require('../assets/fitback/proteinIcon.png')
                        }
                      // resizeMode='contain'
                      />
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "#6b6b6b", fontSize: 14, marginRight: 4 }}>Protein</Text>
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "orange", fontSize: 12 }}>Low</Text>

                    </View>
                    <View style={{ width: "31%", flexDirection: "row", alignItems: "center" }}>
                      <Image
                        style={{
                          width: 16,
                          height: 16,
                          marginBottom: 3,
                          marginRight: 4

                        }}
                        source={
                          require('../assets/fitback/fatIcon.png')
                        }
                      // resizeMode='contain'
                      />
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "#6b6b6b", fontSize: 14, marginRight: 4 }}>Fats</Text>
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "green", fontSize: 12 }}>Normal</Text>

                    </View>
                    <View style={{ width: "31%", flexDirection: "row", alignItems: "center" }}>
                      <Image
                        style={{
                          width: 16,
                          height: 16,
                          marginBottom: 3,
                          marginRight: 4

                        }}
                        source={
                          require('../assets/fitback/carbIcon.png')
                        }
                      // resizeMode='contain'
                      />
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "#6b6b6b", fontSize: 14, marginRight: 4 }}>Carbs</Text>
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "red", fontSize: 12 }}>High</Text>

                    </View>
                  </View>

                </View>
              </View>

              <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', display: medical ? 'flex' : 'none' }}>
                <View style={styles.foodContainer}>
                  <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", flexDirection: "row" }}>
                    <View style={{ width: "20%" }}>
                      <Image
                        style={{
                          borderRadius: 100,
                          width: 50,
                          height: 50,
                          marginRight: 20
                        }}
                        source={
                          // data?.user_image_upload && data?.user_image_upload.trim() !== ''
                          //   ? { uri: data?.user_image_upload }
                          //   : 
                          require('../assets/fitback/profileIcon.png')
                        }
                      // resizeMode='contain'
                      />

                    </View>
                    <View style={{ width: "80%", }}>
                      <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14 }}>Salad with eggs</Text>

                      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                        <MaterialIcons style={{ marginBottom: 3 }} name="local-fire-department" size={18} color="#FFA500" />
                        <Text style={{ fontFamily: 'Poppins_400Regular', color: "#9A9999", fontSize: 12, marginLeft: 4 }}>294 kcal -100g</Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ width: "100%", marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ width: "31%", flexDirection: "row", alignItems: "center" }}>
                      <Image
                        style={{
                          width: 15,
                          height: 15,
                          marginBottom: 3,
                          marginRight: 4

                        }}
                        source={
                          require('../assets/fitback/proteinIcon.png')
                        }
                      // resizeMode='contain'
                      />
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "#6b6b6b", fontSize: 14, marginRight: 4 }}>Protein</Text>
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "orange", fontSize: 12 }}>Low</Text>

                    </View>
                    <View style={{ width: "31%", flexDirection: "row", alignItems: "center" }}>
                      <Image
                        style={{
                          width: 16,
                          height: 16,
                          marginBottom: 3,
                          marginRight: 4

                        }}
                        source={
                          require('../assets/fitback/fatIcon.png')
                        }
                      // resizeMode='contain'
                      />
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "#6b6b6b", fontSize: 14, marginRight: 4 }}>Fats</Text>
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "green", fontSize: 12 }}>Normal</Text>

                    </View>
                    <View style={{ width: "31%", flexDirection: "row", alignItems: "center" }}>
                      <Image
                        style={{
                          width: 16,
                          height: 16,
                          marginBottom: 3,
                          marginRight: 4

                        }}
                        source={
                          require('../assets/fitback/carbIcon.png')
                        }
                      // resizeMode='contain'
                      />
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "#6b6b6b", fontSize: 14, marginRight: 4 }}>Carbs</Text>
                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "red", fontSize: 12 }}>High</Text>

                    </View>
                  </View>

                </View>
              </View>
            </View>

          </View>

          {/* </ScrollView> */}

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
  foodContainer: {
    width: "100%",
    // height: 145,

    // borderColor: colors.ash1,
    // borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.white,


    shadowColor: '#000',
    // shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 2,

    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 16,

  },

});

export default FoodWiseCalories;