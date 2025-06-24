import React, { useState, useEffect, useContext, useRef } from 'react';
import { Dimensions, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Alert, Animated } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';

import { UserContext } from '../../components/CredintailsContext';
import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";


import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HealthTrackingDetails({ navigation, route }) {
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

  const { testCredentials, setTestCredentials } = useContext(UserContext);
  const [lan, setLan] = useState(true);
  const [userDetails, setUserDetails] = useState("");
  const [userid, setUserid] = useState(testCredentials.userid);

  // setGetDoctor

  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];

  //  console.log(prevRoute)

  const [getUserTwo, setgetUserTwo] = useState(true);
  const [userData, setUserData] = useState();

  const UserInfoTwo = () => {

    if (getUserTwo) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
      };

      fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
        .then((response) => response.json())
        .then((json) => {
          setUserData(json);


        })
        .catch((error) => {
          console.error(error);
          setNointernet(true);
          setLoading1(false);

        });

      setgetUserTwo(false);
    }
  };

  UserInfoTwo();



  const loadData = async () => {
    try {
      const allData = await AsyncStorage.getItem("healthTrackingData");

      if (allData !== null) {
        setUserDetails(JSON.parse(allData));
      }
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [route.params]);




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

            <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Health Tracking </Text>

          </View>



        </View>


        <View style={[styles.body1, { justifyContent: 'flex-start', alignItems: 'center' }]}>
          <ScrollView >



            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20, paddingHorizontal: 13 }}>

              <View style={{ width: '100%', height: 250, borderRadius: 16, backgroundColor: "#f6a5b9", flexDirection: "row" }} >

                <View style={{ width: '70%' }}>
                  <Text style={{ marginTop: 10, left: 12, color: colors.ash, fontSize: 24, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white", textAlign: "center" }}>Steps Count</Text>

                  <Text style={{ width: '100%', marginTop: 20, left: 12, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, color: "white", textAlign: "center" }}>Goal Achieved</Text>
                  <Text style={{ marginTop: 0, left: 12, color: colors.ash, fontSize: 24, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white", textAlign: "center" }}>{userDetails?.totalStepPercentile} %</Text>
                  <Text style={{ width: '100%', marginTop: 20, left: 12, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, color: "white", textAlign: "center" }}>You should aim to reach everyday</Text>

                  <Text style={{ marginTop: 0, left: 12, color: colors.ash, fontSize: 24, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white", textAlign: "center" }}>10,000 <Text style={{ fontSize: 12, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>steps</Text></Text>

                </View>
                <View style={{ width: '30%', justifyContent: 'center', right: 12, alignItems: "center", paddingTop: 20 }}>
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    resizeMode='contain'
                    source={require('../assets/fitback/steps.png')}
                  />
                </View>


              </View>



            </View>

            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>

              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={{ width: '45%', height: 170, borderRadius: 16, backgroundColor: "#f6a5b9" }}>

                  <View style={{ width: '100%' }}>

                    {userDetails?.remainingSleep > 0 ? (<>
                      <Text style={{ marginTop: 10, marginLeft: 12, color: colors.ash, fontSize: 24, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>
                        {userDetails?.remainingHours}h {userDetails?.remainingMinutes}m
                      </Text>

                      <Text style={{ width: '100%', marginTop: 7, paddingHorizontal: 12, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, color: "white" }}>More of sleep for better health</Text>
                    </>

                    ) : (
                      <>
                        <Text style={{ marginTop: 10, marginLeft: 12, color: colors.ash, fontSize: 24, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>
                          {userDetails?.sleep}h
                        </Text>

                        <Text style={{ width: '100%', marginTop: 7, paddingHorizontal: 12, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, color: "white" }}>Well done! Your sleep is good.</Text></>
                    )}

                  </View>
                  <View style={{ width: '100%', alignItems: 'flex-end', marginTop: -10 }}>
                    <Image
                      style={{ width: 150, height: 80 }}
                      resizeMode='contain'
                      source={require('../assets/fitback/sleep.png')}
                    />
                  </View>


                </View>

                <View style={{ width: '45%', height: 170, borderRadius: 16, backgroundColor: "#f6a5b9", flexDirection: "row" }}>

                  <View style={{ width: '60%', zIndex: 100 }}>

                    {
                      userDetails?.calorieDeficit == 0 ? <>
                        <Text style={{ width: '100%', marginTop: 10, marginLeft: 12, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, color: "white" }}>You should increasing your intake</Text>

                        <Text style={{ marginTop: 30, left: 12, color: colors.ash, fontSize: 24, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>{userDetails?.calorieSurplus} <Text style={{ fontSize: 12, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>kcal</Text></Text>
                      </>
                        :
                        <>
                          <Text style={{ width: '100%', marginTop: 10, marginLeft: 12, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, color: "white" }}>You should reduce your intake</Text>

                          <Text style={{ marginTop: 30, left: 12, color: colors.ash, fontSize: 24, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>{userDetails?.calorieDeficit} <Text style={{ fontSize: 12, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>kcal</Text></Text>
                        </>
                    }

                  </View>

                  <View style={{ width: '40%', alignItems: "center", justifyContent: "center" }}>
                    <Image
                      style={{ width: 95, height: "100%", marginLeft: -20, marginTop: 30 }}
                      resizeMode='contain'
                      source={require('../assets/fitback/calories.png')}
                    />
                  </View>


                </View>


              </View>

            </View>

            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>

              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>


                <View style={{ width: '45%', height: 170, borderRadius: 16, backgroundColor: "#f6a5b9", flexDirection: "row" }}>

                  <View style={{ width: '60%', zIndex: 100 }}>

                    <Text style={{ marginTop: 15, left: 12, color: colors.ash, fontSize: 24, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>{userDetails?.hRate} <Text style={{ fontSize: 12, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>bpm</Text></Text>

                    <Text style={{ width: '100%', marginTop: 20, marginLeft: 12, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, color: "white" }}>Your heart rate is {userDetails?.heartRateStatus}</Text>

                  </View>
                  <View style={{ width: '40%', alignItems: "center", justifyContent: "center", paddingRight: 4 }}>
                    <Image
                      style={{ width: "100%", height: "100%", marginTop: 10 }}
                      resizeMode='contain'
                      source={require('../assets/fitback/heartRate.png')}
                    />
                  </View>


                </View>

                <View style={{ width: '45%', height: 170, borderRadius: 16, backgroundColor: "#f6a5b9", flexDirection: "row" }}>

                  <View style={{ width: '50%', zIndex: 100 }}>


                    {/* <Text style={{ width: '100%', marginTop: 10, marginLeft: 12, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, color: "white" }}>Your blood pressure is {userDetails?.bloodPressureStatus}</Text>

                    <Text style={{ marginTop: 30, left: 12, color: colors.ash, fontSize: 22, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>{userDetails?.systo}/{userDetails?.diasto} <Text style={{ fontSize: 12, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>bpm</Text></Text> */}

                    <Text style={{ width: '100%', marginTop: 10, marginLeft: 12, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, color: "white" }}>{userDetails?.moreWater == 0 ? "Your drinking water level is good" : "More water you should drink"}</Text>

                    <Text style={{ marginTop: 30, left: 12, color: colors.ash, fontSize: 22, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>{userDetails?.moreWater == 0 ? 2 : userDetails?.moreWater} <Text style={{ fontSize: 12, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>litter</Text></Text>

                  </View>
                  <View style={{ width: '50%', alignItems: "center", justifyContent: "center", paddingRight: 4 }}>
                    <Image
                      style={{ width: "100%", height: "100%", marginTop: 10 }}
                      resizeMode='contain'
                      source={require('../assets/fitback/bloodPressure.png')}
                    />
                  </View>


                </View>


              </View>

            </View>

            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>

              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>


                <View style={{ width: '45%', height: 170, borderRadius: 16, backgroundColor: "#f6a5b9", flexDirection: "row" }}>

                  <View style={{ width: '60%', zIndex: 100 }}>

                    <Text style={{ marginTop: 15, left: 12, color: colors.ash, fontSize: 24, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>{userDetails?.systo} <Text style={{ fontSize: 12, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>systolic</Text></Text>

                    <Text style={{ width: '100%', marginTop: 20, marginLeft: 12, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, color: "white" }}>
                      Your blood pressure is {userDetails?.bloodPressureStatus}
                    </Text>

                  </View>
                  <View style={{ width: '40%', alignItems: "center", justifyContent: "center", paddingRight: 4 }}>
                    <Image
                      style={{ width: "100%", height: "100%", marginTop: 10 }}
                      resizeMode='contain'
                      source={require('../assets/fitback/water.png')}
                    />
                  </View>


                </View>

                <View style={{ width: '45%', height: 170, borderRadius: 16, backgroundColor: "#f6a5b9", flexDirection: "row" }}>

                  <View style={{ width: '60%', zIndex: 100 }}>

                    <Text style={{ marginTop: 15, left: 12, color: colors.ash, fontSize: 24, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>{userDetails?.diasto} <Text style={{ fontSize: 12, fontFamily: 'Poppins_700Bold', letterSpacing: 0.9, color: "white" }}>diastolic</Text></Text>

                    <Text style={{ width: '100%', marginTop: 20, marginLeft: 12, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, color: "white" }}>
                      Your blood pressure is {userDetails?.bloodPressureStatus}
                    </Text>

                  </View>
                  <View style={{ width: '40%', alignItems: "center", justifyContent: "center", marginLeft: 5 }}>
                    <Image
                      style={{ width: "90%", height: "100%", marginTop: 10 }}
                      resizeMode='contain'
                      source={require('../assets/fitback/diastolicImg.png')}
                    />
                  </View>


                </View>




              </View>

            </View>



            {/* <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',marginTop:40}}> */}







            {/* <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20, paddingBottom: 35 }}>
            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 50, left: 20 }}>

              <Text style={{ fontSize: 12, color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>Medical Records / Database</Text>


            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
              <Pressable style={{ width: '27%', height: 150, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate("Pharmacy", { reminder: true })}>
                <View style={{ width: '100%', height: 120, backgroundColor: colors.white, borderColor: colors.ash1, borderRadius: 30, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 1 }}>
                  <Image
                    style={{ width: 65, height: 70 }}
                    resizeMode='contain'
                    source={require('../assets/services_med_database.jpg')}
                  />
                </View>
                <Text style={{ top: 7, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>Medicine List</Text>

              </Pressable>


              <Pressable style={{ width: '27%', height: 150, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate("Myappointment", {})}>
                <View style={{ width: '100%', height: 120, backgroundColor: colors.white, borderColor: colors.ash1, borderRadius: 30, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 1 }}>

                  <Image
                    style={{ width: 45, height: 70 }}
                    resizeMode='contain'
                    source={require('../assets/services_medical_record.jpg')}
                  />
                </View>
                <Text style={{ width: '110%', top: 7, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>Medical Record</Text>

              </Pressable>

              <Pressable style={{ width: '27%', height: 150, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate("Prescribtions", { service: true })}>

                <View style={{ width: '100%', height: 120, backgroundColor: colors.white, borderColor: colors.ash1, borderRadius: 30, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}  >

                  <Image
                    style={{ width: 40, height: 70 }}
                    resizeMode='contain'
                    source={require('../assets/4_prescription_upload.jpg')}
                  />
                </View>
                <Text style={{ top: 7, color: colors.ash, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>Prescription</Text>

              </Pressable>


            </View>

          </View> */}


          </ScrollView>

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
  }
});

export default HealthTrackingDetails;