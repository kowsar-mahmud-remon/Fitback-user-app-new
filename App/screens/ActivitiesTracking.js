import React, { useState, useEffect, useContext, useRef } from 'react';
import { Dimensions, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Alert, Button, Platform, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import DropDownPicker from "react-native-dropdown-picker";


import { UserContext } from '../../components/CredintailsContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

function ActivitiesTracking({ navigation, route }) {

  const [activityOpen1, setActivityOpen1] = useState(false);
  const [activityOpen2, setActivityOpen2] = useState(false);
  const [activityOpen3, setActivityOpen3] = useState(false);
  const [activityOpen4, setActivityOpen4] = useState(false);

  const [activityValue1, setActivityValue1] = useState(130);
  const [activityValue2, setActivityValue2] = useState(130);
  const [activityValue3, setActivityValue3] = useState(130);
  const [activityValue4, setActivityValue4] = useState(130);

  const [activityItems1, setActivityItems1] = useState([
    { label: "Fast", value: 130 },
    { label: "Medium", value: 100 },
    { label: "Slow", value: 70 }
  ]);
  const [activityItems2, setActivityItems2] = useState([
    { label: "Fast", value: 130 },
    { label: "Medium", value: 100 },
    { label: "Slow", value: 70 }
  ]);
  const [activityItems3, setActivityItems3] = useState([
    { label: "Fast", value: 130 },
    { label: "Medium", value: 100 },
    { label: "Slow", value: 70 }
  ]);
  const [activityItems4, setActivityItems4] = useState([
    { label: "Fast", value: 130 },
    { label: "Medium", value: 100 },
    { label: "Slow", value: 70 }
  ]);

  ///
  const [steps1, setSteps1] = useState();
  const [steps2, setSteps2] = useState();
  const [steps3, setSteps3] = useState();
  const [steps4, setSteps4] = useState();

  const [notes1, setNotes1] = useState();
  const [notes2, setNotes2] = useState();
  const [notes3, setNotes3] = useState();
  const [notes4, setNotes4] = useState();
  const [notes5, setNotes5] = useState();

  ///
  const [userData, setUserData] = useState();

  const [maintainWeight, setMaintainWeight] = useState(); // default to male
  const [mildWeightLoss, setMildWeightLoss] = useState(); // default to male
  const [weightLoss, setWeightLoss] = useState(); // default to male
  const [extremeWeightLoss, setExtremeWeightLoss] = useState(); // default to male
  const [weightGain, setWeightGain] = useState(); // default to male

  // State for the calculation result
  const [result, setResult] = useState(false);

  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);

  const [physical_activities_records, setPhysical_activities_records] = useState([]);

  const [submitFlag, setSubmitFlag] = useState(false);


  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReload = () => {
    setIsRunning(false);
    setTime(0);
  };

  const performCalculation = async () => {

    setLoading1(true);


    const requestOptions1 = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
    };

    fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions1)
      .then((response) => response.json())
      .then((json) => {

        setUserData(json);
        physical_activities_records(json.physical_activities_records);
      })
      .catch((error) => {
        setNointernet(true);
      });


    physical_activities_records.push({ Running_time: steps1, Running_type: activityItems1, Running_notes: notes1, Walking_time: steps2, Walking_type: activityItems2, Walking_notes: notes2, Cycling_time: steps3, Cycling_type: activityItems3, Cycling_notes: notes3, Swimming_time: steps4, Swimming_type: activityItems4, Swimming_notes: notes4, Others_notes: notes5 });

    // persistUser({userid:userid,lan:true,raddress: testCredentials.raddress,cartbuy: testCredentials.cartbuy ,cartrent: testCredentials.cartrent,productsave: productsave,flatsave: testCredentials.flatsave })



    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
      body: JSON.stringify({
        physical_activities_records: physical_activities_records,
      })
    };

    fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        // console.log('create expance', json);
        setNointernet(false);
        setLoading1(false);
        navigation.navigate("Homepage");
      })
      .catch((error) => {
        setLoading1(false);
        console.error(error);
        setNointernet(true);
      });

  };


  ////////////////////////
  ////////////////////////

  const { authtoken, setAuthtoken } = useContext(UserContext);

  const { testCredentials, setTestCredentials } = useContext(UserContext);
  const [lan, setLan] = useState(true);
  const [userid, setUserid] = useState(testCredentials.userid);



  //IMAGE PERMITION

  const [nointernet, setNointernet] = useState(false);
  const [isLoading1, setLoading1] = useState(false);

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

            <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} > Activities Tracking </Text>

          </View>



        </View>


        <View style={[styles.body1, { justifyContent: 'flex-start', alignItems: 'center' }]}>
          {/* <ScrollView > */}

          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>

            <FlatList
              style={styles.container}
              data={[]}
              ListEmptyComponent={
                <>
                  <View
                    style={[
                      styles.dropdownContainer,
                      {
                        // marginTop: 20,
                        paddingHorizontal: 4,
                        // paddingTop: 12,
                        paddingBottom: 20,

                        borderRadius: 10,
                        // backgroundColor: "#f1ece9",
                        // zIndex: 1000,
                      },
                    ]}
                  >
                    {/* <Text style={{ fontSize: 14 }}>House Dimension</Text> */}

                    <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', backgroundColor: '#EE416C', paddingTop: 10, paddingBottom: 20, borderRadius: 8 }}>
                      <Text style={{ width: "100%", fontSize: 16, fontFamily: 'Poppins_500Medium', marginBottom: 10, color: "white", textAlign: "left", paddingHorizontal: 10 }}>
                        Stop Watch
                      </Text>

                      <Text style={{ fontSize: 60, fontFamily: 'Poppins_400Regular', marginBottom: 6, color: "white" }}>
                        {formatTime(time)}
                      </Text>

                      <View style={{ flexDirection: 'row', justifyContent: 'center', width: '80%', alignItems: "center" }}>
                        <TouchableOpacity
                          style={{
                            marginRight: 16
                          }}
                          onPress={handleStart}
                        >
                          <AntDesign name="play" size={28} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            marginRight: 16
                          }}
                          onPress={handlePause}
                        >
                          <AntDesign name="pausecircle" size={28} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                          }}
                          onPress={handleReload}
                        >
                          <Ionicons name="reload-circle" size={34} color="white" />
                        </TouchableOpacity>
                      </View>
                    </View>


                    <Text style={[styles.inputLabel, { marginTop: 20, fontSize: 16, color: '#EE416C', fontFamily: 'Poppins_500Medium' }]}>Running</Text>
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", }}>

                      <View style={{
                        width: "56%",
                        // flexDirection: "row",
                        alignItems: "center",

                      }}>
                        <Text style={styles.inputLabel}>Time</Text>
                        <TextInput
                          style={{
                            width: "100%",
                            // flex: 1,
                            borderWidth: 1,
                            borderColor: "#D6D4D4",
                            color: "#606060",
                            paddingVertical: 10,
                            paddingHorizontal: 12,
                            borderRadius: 5,
                            backgroundColor: "#fff",
                          }}
                          placeholder='minutes'
                          keyboardType="numeric"
                          value={steps1}
                          onChangeText={setSteps1}
                        />
                      </View>

                      <View style={{
                        width: "40%",
                        // flexDirection: "row",
                        alignItems: "center",
                        zIndex: 6000
                      }}>
                        <Text style={styles.inputLabel}>Activity</Text>
                        <DropDownPicker
                          style={styles.dropdown}
                          open={activityOpen1}
                          value={activityValue1}
                          items={activityItems1}
                          setOpen={setActivityOpen1}
                          setValue={setActivityValue1}
                          setItems={setActivityItems1}
                          placeholder="Select your activity type"
                        // containerStyle={styles.dropdown}
                        // onChangeValue={handleCategorySelect}
                        />
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      {/* <Text style={styles.inputLabel}>Notes</Text> */}
                      <TextInput
                        style={styles.input}
                        placeholder='Notes..'
                        value={notes1}
                        onChangeText={setNotes1}
                      />
                    </View>



                    <Text style={[styles.inputLabel, { marginTop: 20, fontSize: 16, color: '#EE416C', fontFamily: 'Poppins_500Medium' }]}>Walking</Text>
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", }}>

                      <View style={{
                        width: "56%",
                        // flexDirection: "row",
                        alignItems: "center",

                      }}>
                        <Text style={styles.inputLabel}>Time</Text>
                        <TextInput
                          style={{
                            width: "100%",
                            // flex: 1,
                            borderWidth: 1,
                            borderColor: "#D6D4D4",
                            color: "#606060",
                            paddingVertical: 10,
                            paddingHorizontal: 12,
                            borderRadius: 5,
                            backgroundColor: "#fff",
                          }}
                          placeholder='minutes'
                          keyboardType="numeric"
                          value={steps2}
                          onChangeText={setSteps2}
                        />
                      </View>

                      <View style={{
                        width: "40%",
                        // flexDirection: "row",
                        alignItems: "center",
                        zIndex: 6000
                      }}>
                        <Text style={styles.inputLabel}>Activity</Text>
                        <DropDownPicker
                          style={styles.dropdown}
                          open={activityOpen2}
                          value={activityValue2}
                          items={activityItems2}
                          setOpen={setActivityOpen2}
                          setValue={setActivityValue2}
                          setItems={setActivityItems2}
                          placeholder="Select your activity type"
                        // containerStyle={styles.dropdown}
                        // onChangeValue={handleCategorySelect}
                        />
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      {/* <Text style={styles.inputLabel}>Notes</Text> */}
                      <TextInput
                        style={styles.input}
                        placeholder='Notes..'
                        value={notes2}
                        onChangeText={setNotes2}
                      />
                    </View>



                    <Text style={[styles.inputLabel, { marginTop: 20, fontSize: 16, color: '#EE416C', fontFamily: 'Poppins_500Medium' }]}>Cycling</Text>
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", }}>

                      <View style={{
                        width: "56%",
                        // flexDirection: "row",
                        alignItems: "center",

                      }}>
                        <Text style={styles.inputLabel}>Time</Text>
                        <TextInput
                          style={{
                            width: "100%",
                            // flex: 1,
                            borderWidth: 1,
                            borderColor: "#D6D4D4",
                            color: "#606060",
                            paddingVertical: 10,
                            paddingHorizontal: 12,
                            borderRadius: 5,
                            backgroundColor: "#fff",
                          }}
                          placeholder='minutes'
                          keyboardType="numeric"
                          value={steps3}
                          onChangeText={setSteps3}
                        />
                      </View>

                      <View style={{
                        width: "40%",
                        // flexDirection: "row",
                        alignItems: "center",
                        zIndex: 6000
                      }}>
                        <Text style={styles.inputLabel}>Activity</Text>
                        <DropDownPicker
                          style={styles.dropdown}
                          open={activityOpen3}
                          value={activityValue3}
                          items={activityItems3}
                          setOpen={setActivityOpen3}
                          setValue={setActivityValue3}
                          setItems={setActivityItems3}
                          placeholder="Select your activity type"
                        // containerStyle={styles.dropdown}
                        // onChangeValue={handleCategorySelect}
                        />
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      {/* <Text style={styles.inputLabel}>Notes</Text> */}
                      <TextInput
                        style={styles.input}
                        placeholder='Notes..'
                        value={notes3}
                        onChangeText={setNotes3}
                      />
                    </View>


                    <Text style={[styles.inputLabel, { marginTop: 20, fontSize: 16, color: '#EE416C', fontFamily: 'Poppins_500Medium' }]}>Swimming</Text>
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", }}>

                      <View style={{
                        width: "56%",
                        // flexDirection: "row",
                        alignItems: "center",

                      }}>
                        <Text style={styles.inputLabel}>Time</Text>
                        <TextInput
                          style={{
                            width: "100%",
                            // flex: 1,
                            borderWidth: 1,
                            borderColor: "#D6D4D4",
                            color: "#606060",
                            paddingVertical: 10,
                            paddingHorizontal: 12,
                            borderRadius: 5,
                            backgroundColor: "#fff",
                          }}
                          placeholder='minutes'
                          keyboardType="numeric"
                          value={steps4}
                          onChangeText={setSteps4}
                        />
                      </View>

                      <View style={{
                        width: "40%",
                        // flexDirection: "row",
                        alignItems: "center",
                        zIndex: 6000
                      }}>
                        <Text style={styles.inputLabel}>Activity</Text>
                        <DropDownPicker
                          style={styles.dropdown}
                          open={activityOpen4}
                          value={activityValue4}
                          items={activityItems4}
                          setOpen={setActivityOpen4}
                          setValue={setActivityValue4}
                          setItems={setActivityItems4}
                          placeholder="Select your activity type"
                        // containerStyle={styles.dropdown}
                        // onChangeValue={handleCategorySelect}
                        />
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      {/* <Text style={styles.inputLabel}>Notes</Text> */}
                      <TextInput
                        style={styles.input}
                        placeholder='Notes..'
                        value={notes4}
                        onChangeText={setNotes4}
                      />
                    </View>


                    <Text style={[styles.inputLabel, { marginTop: 20, fontSize: 16, color: '#EE416C', fontFamily: 'Poppins_500Medium' }]}>Others</Text>

                    <View style={[styles.inputContainer, { marginTop: 0 }]}>
                      {/* <Text style={styles.inputLabel}>Notes</Text> */}
                      <TextInput
                        style={styles.input}
                        placeholder='Notes..'
                        value={notes5}
                        onChangeText={setNotes5}
                      />
                    </View>


                  </View>


                  {
                    result && <View style={{ width: "100%", marginVertical: 20 }}>
                      <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 16, color: "#EE426D", textAlign: "center" }}>Calories Count:</Text>

                      <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>

                        <View style={{ width: "65%" }}>
                          <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14, textAlign: "center" }}>Maintain Weight</Text>
                        </View>
                        <View style={{ width: "35%", backgroundColor: "#E3EDDA", paddingHorizontal: 8, paddingVertical: 4, justifyContent: "center", alignItems: "center", borderRadius: 8 }}>

                          <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 16 }}>
                            {/* {calculateCalories("maintain").toFixed(0)} */}
                            {maintainWeight}

                          </Text>
                          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, textAlign: "center" }}>Calories/day</Text>
                        </View>
                      </View>

                      <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>


                        <View style={{ width: "60%" }}>

                          <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14, textAlign: "center" }}>Mild Weight Loss</Text>
                          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, textAlign: "center" }}>0.5 lb/week</Text>
                        </View>

                        <View style={{ width: "35%", backgroundColor: "#E3EDDA", paddingHorizontal: 8, paddingVertical: 4, justifyContent: "center", alignItems: "center", borderRadius: 8 }}>

                          <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 16 }}>
                            {/* {calculateCalories("mildWeightLoss").toFixed(0)} */}
                            {mildWeightLoss}
                          </Text>
                          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, textAlign: "center" }}>Calories/day</Text>
                        </View>
                      </View>

                      <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>


                        <View style={{ width: "60%" }}>

                          <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14, textAlign: "center" }}>Weight Loss</Text>
                          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, textAlign: "center" }}>1 lb/week</Text>
                        </View>

                        <View style={{ width: "35%", backgroundColor: "#E3EDDA", paddingHorizontal: 8, paddingVertical: 4, justifyContent: "center", alignItems: "center", borderRadius: 8 }}>

                          <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 16 }}>
                            {/* {calculateCalories("weightLoss").toFixed(0)} */}
                            {weightLoss}
                          </Text>
                          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, textAlign: "center" }}>Calories/day</Text>
                        </View>
                      </View>

                      <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>


                        <View style={{ width: "60%" }}>

                          <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14, textAlign: "center" }}>Extreme Weight Loss</Text>
                          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, textAlign: "center" }}>1 lb/week</Text>
                        </View>

                        <View style={{ width: "35%", backgroundColor: "#E3EDDA", paddingHorizontal: 8, paddingVertical: 4, justifyContent: "center", alignItems: "center", borderRadius: 8 }}>

                          <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 16 }}>
                            {/* {calculateCalories("extremeWeightLoss").toFixed(0)} */}
                            {extremeWeightLoss}
                          </Text>
                          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, textAlign: "center" }}>Calories/day</Text>
                        </View>
                      </View>

                      <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>

                        <View style={{ width: "65%" }}>
                          <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14, textAlign: "center" }}>Weight Gain</Text>
                        </View>
                        <View style={{ width: "35%", backgroundColor: "#E3EDDA", paddingHorizontal: 8, paddingVertical: 4, justifyContent: "center", alignItems: "center", borderRadius: 8 }}>

                          <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 16 }}>
                            {/* {calculateCalories("weightGain").toFixed(0)} */}
                            {weightGain}
                          </Text>
                          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, textAlign: "center" }}>Calories/day</Text>
                        </View>
                      </View>
                    </View>
                  }

                  <View style={styles.buttonContainer}>
                    {/* <TouchableOpacity style={styles.button} onPress={handleReset}>
                      <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity disabled={submitFlag ? true : false} style={[styles.tuchabluebutton, { backgroundColor: submitFlag == true ? colors.ash : '#EE426D', flexDirection: 'row' }]} onPress={() => { setLoading1(true), setSubmitFlag(true), performCalculation(); }}>
                      <ActivityIndicator size="small" color="#00263C" style={{ display: isLoading1 ? 'flex' : 'none', right: 30 }} />
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </>
              }
              keyExtractor={() => "dummy"}
            />

          </View>

          {/* </ScrollView> */}

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
    height: '100%',
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

  // input: {
  //   width: "94%",
  //   height: 40,
  //   borderColor: colors.ash1,
  //   borderWidth: 1,
  //   backgroundColor: '#FFF',
  //   alignItems: 'center',
  //   //padding:5,
  //   paddingLeft: 45,
  //   borderRadius: 3,
  //   paddingRight: 30,
  //   fontSize: 12,

  // },
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
  TopContainer: {
    // flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff7f2",
  },

  container: {
    width: "100%",
    // flex: 1,
    paddingHorizontal: 20,
    // paddingVertical: 20,
  },

  image: {
    width: "70%",
    height: 160,
    alignSelf: "center",
  },

  dropdownContainer: {},

  dropdown: {
    // marginTop: 0,
    width: "100%",
    // flex: 1,
    borderWidth: 1,
    borderColor: "#D6D4D4",
    color: "#606060",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#fff",
  },

  inputContainer: {
    width: "100%",
    // flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  inputLabel: {
    width: "100%",
    // flex: 0.5,
    fontSize: 14,
    // marginRight: 10,
    marginBottom: 10
  },

  input: {
    width: "100%",
    // flex: 1,
    borderWidth: 1,
    borderColor: "#D6D4D4",
    color: "#606060",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#fff",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 160,
  },

  button: {
    flex: 1,
    backgroundColor: "#EE416C",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 10
  },

  buttonText: {
    color: "#fff",
    fontSize: 13,
  },

  tableContainer: {
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
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 10,
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },

  tableCell: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  result: {
    fontSize: 24,
    marginTop: 20,
    textAlign: 'center',
  },
  category: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: "#ffff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4
  },
  healthyRange: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    color: '#555',
  },
  radioContainer: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10
    // alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  selectedOuterCircle: {
    borderColor: '#EE416C',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#EE416C',
  },
  radioLabel: {
    fontSize: 14,
    color: '#333',
  },
});

export default ActivitiesTracking;