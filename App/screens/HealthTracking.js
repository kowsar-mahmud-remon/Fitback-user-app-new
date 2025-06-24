import React, { useState, useEffect, useContext, useRef } from 'react';
import { Dimensions, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Alert, Button, Platform, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { UserContext } from '../../components/CredintailsContext';

function HealthTracking({ navigation, route }) {

  const [userData, setUserData] = useState();
  const [sleep, setSleep] = useState();
  const [caloriesConsumed, setCaloriesConsumed] = useState();
  const [heartRate, setHeartRate] = useState();
  // const [bloodPressure, setBloodPressure] = useState();
  const [systolic, setSystolic] = useState();
  const [diastolic, setDiastolic] = useState();
  const [waterIntake, setWaterIntake] = useState();


  const [date1, setDate1] = useState(new Date());
  const [mode1, setMode1] = useState('date');
  const [showPicker1, setShowPicker1] = useState(false);
  const [mealTime1, setMealTime1] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');

  const formatDateTime1 = (date) => {
    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' }; // Format: 27 June 2024
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true }; // Format: 10:10 AM
    const formattedDate = date.toLocaleDateString('en-GB', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-GB', timeOptions);
    return `${formattedDate}, ${formattedTime}`; // Example: 27 June 2024, 10:10 AM
  };

  const showDatePicker1 = () => {
    setMode1('date');
    setShowPicker1(true);
  };

  const showTimePicker1 = () => {
    setMode1('time');
    setShowPicker1(true);
  };

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setShowPicker1(Platform.OS === 'ios');
    setDate1(currentDate);
  };

  const handleSelection1 = (value) => {
    setMealTime1(value);
  };

  const [nointernet, setNointernet] = useState(false);
  const [isLoading1, setLoading1] = useState(false);


  const [date, setDate] = useState(new Date()); // Default is now
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date'); // 'date' or 'time'

  const formatDateTime = (date) => {
    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' }; // Format: 27 June 2024
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true }; // Format: 10:10 AM
    const formattedDate = date.toLocaleDateString('en-GB', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-GB', timeOptions);
    return `${formattedDate}, ${formattedTime}`; // Example: 27 June 2024, 10:10 AM
  };

  const onChange = (event, selectedDate) => {
    setShowPicker(false); // Hide picker after selection
    if (selectedDate) {
      setDate(selectedDate); // Update state with the selected date/time
    }
  };

  const showDatePicker = () => {
    setMode('date');
    setShowPicker(true);
  };

  const showTimePicker = () => {
    setMode('time');
    setShowPicker(true);
  };

  const [mealTime, setMealTime] = useState("Before Meal");

  const handleSelection = (time) => {
    setMealTime(time);
  };

  const { authtoken, setAuthtoken } = useContext(UserContext);

  const { testCredentials, setTestCredentials } = useContext(UserContext);
  const [lan, setLan] = useState(true);
  const [userid, setUserid] = useState(testCredentials.userid);

  // const [getUser, setgetUser] = useState(true);
  const [heath_tracking_records, setHeath_tracking_records] = useState([]);

  const [submitFlag, setSubmitFlag] = useState(false);

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
        setHeath_tracking_records(json.heath_tracking_records);
      })
      .catch((error) => {
        setNointernet(true);
      });


    heath_tracking_records.push({ sleep: sleep, calories: caloriesConsumed, bpm: heartRate, blood_pressure_date: date, blood_pressure_meal_time: mealTime, systolic: systolic, diastolic: diastolic, water_intake: waterIntake, blood_suger_date: date1, blood_suger_meal_time: mealTime1, blood_suger_rate: bloodSugar });

    // persistUser({userid:userid,lan:true,raddress: testCredentials.raddress,cartbuy: testCredentials.cartbuy ,cartrent: testCredentials.cartrent,productsave: productsave,flatsave: testCredentials.flatsave })



    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
      body: JSON.stringify({
        heath_tracking_records: heath_tracking_records,
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

            <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Health Tracking </Text>

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




                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Enter your hours of sleep</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='hour'
                        keyboardType="numeric"
                        value={sleep}
                        onChangeText={setSleep}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Enter calories consumed</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='cal'
                        keyboardType="numeric"
                        value={caloriesConsumed}
                        onChangeText={setCaloriesConsumed}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Enter your heart rate (bpm)</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='bpm'
                        keyboardType="numeric"
                        value={heartRate}
                        onChangeText={setHeartRate}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Enter your blood pressure</Text>

                      <View style={{
                        width: "100%", justifyContent: "space-between", flexDirection: "row", marginBottom: 10,
                        marginTop: 12
                      }}>
                        <Text style={{
                          // width: "100%",
                          // flex: 0.5,
                          fontSize: 13,
                          // marginRight: 10,

                        }}>
                          {formatDateTime(date)}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                          <FontAwesome5 style={{ marginRight: 10 }} name="calendar-alt" size={22} color="#8b8b8b" onPress={showDatePicker} />
                          <FontAwesome name="clock-o" size={24} color="#8b8b8b" onPress={showTimePicker} />
                        </View>
                        {showPicker && (
                          <DateTimePicker
                            value={date}
                            mode={mode}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onChange}
                          />
                        )}
                      </View>

                      <View style={styles.radioContainer}>
                        {/* Before Meal Radio Button */}
                        <TouchableOpacity
                          style={styles.radioButton}
                          onPress={() => handleSelection('Before Meal')}
                        >
                          <View
                            style={[
                              styles.outerCircle,
                              mealTime === 'Before Meal' && styles.selectedOuterCircle,
                            ]}
                          >
                            {mealTime === 'Before Meal' && <View style={styles.innerCircle} />}
                          </View>
                          <Text style={styles.radioLabel}>Before Meal</Text>
                        </TouchableOpacity>

                        {/* After Meal Radio Button */}
                        <TouchableOpacity
                          style={styles.radioButton}
                          onPress={() => handleSelection('After Meal')}
                        >
                          <View
                            style={[
                              styles.outerCircle,
                              mealTime === 'After Meal' && styles.selectedOuterCircle,
                            ]}
                          >
                            {mealTime === 'After Meal' && <View style={styles.innerCircle} />}
                          </View>
                          <Text style={styles.radioLabel}>After Meal</Text>
                        </TouchableOpacity>
                      </View>


                      <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ width: "45%" }}>
                          <Text style={styles.inputLabel}>Systolic</Text>
                          <TextInput
                            style={{
                              width: "100%",
                              // flex: 1,
                              borderWidth: 1,
                              borderColor: "#D6D4D4",
                              color: "#606060",
                              paddingVertical: 7,
                              paddingHorizontal: 12,
                              borderRadius: 5,
                              backgroundColor: "#fff",
                            }}
                            placeholder='bpm'
                            keyboardType="numeric"
                            value={systolic}
                            onChangeText={setSystolic}
                          />
                        </View>
                        <View style={{ width: "45%" }}>
                          <Text style={styles.inputLabel}>Diastolic</Text>
                          <TextInput
                            style={{
                              width: "100%",
                              // flex: 1,
                              borderWidth: 1,
                              borderColor: "#D6D4D4",
                              color: "#606060",
                              paddingVertical: 7,
                              paddingHorizontal: 12,
                              borderRadius: 5,
                              backgroundColor: "#fff",
                            }}
                            placeholder='bpm'
                            keyboardType="numeric"
                            value={diastolic}
                            onChangeText={setDiastolic}
                          />
                        </View>
                      </View>
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Water Intake</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='litter'
                        keyboardType="numeric"
                        value={waterIntake}
                        onChangeText={setWaterIntake}
                      />
                    </View>


                    <View style={styles.inputContainer}>

                      {/* Blood Sugar Input */}
                      <View style={{ width: "100%", marginTop: 10 }}>
                        <Text style={styles.inputLabel}>Blood Sugar (mg/dL)</Text>
                        <TextInput
                          style={{
                            width: "100%",
                            borderWidth: 1,
                            borderColor: "#D6D4D4",
                            color: "#606060",
                            paddingVertical: 7,
                            paddingHorizontal: 12,
                            borderRadius: 5,
                            backgroundColor: "#fff",
                          }}
                          placeholder='e.g., 110'
                          keyboardType="numeric"
                          value={bloodSugar}
                          onChangeText={setBloodSugar}
                        />
                      </View>

                      {/* Date & Time Picker */}
                      <View style={{
                        width: "100%", justifyContent: "space-between", flexDirection: "row", marginBottom: 10,
                        marginTop: 12
                      }}>
                        <Text style={{ fontSize: 13 }}>
                          {formatDateTime1(date1)}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                          <FontAwesome5 style={{ marginRight: 10 }} name="calendar-alt" size={22} color="#8b8b8b" onPress={showDatePicker1} />
                          <FontAwesome name="clock-o" size={24} color="#8b8b8b" onPress={showTimePicker1} />
                        </View>
                        {showPicker1 && (
                          <DateTimePicker
                            value={date1}
                            mode={mode1}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onChange1}
                          />
                        )}
                      </View>



                      {/* Meal Time Radio Buttons */}
                      <View style={styles.radioContainer}>
                        <TouchableOpacity
                          style={styles.radioButton}
                          onPress={() => handleSelection1('Before Meal')}
                        >
                          <View
                            style={[
                              styles.outerCircle,
                              mealTime1 === 'Before Meal' && styles.selectedOuterCircle,
                            ]}
                          >
                            {mealTime1 === 'Before Meal' && <View style={styles.innerCircle} />}
                          </View>
                          <Text style={styles.radioLabel}>Before Meal</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.radioButton}
                          onPress={() => handleSelection1('After Meal')}
                        >
                          <View
                            style={[
                              styles.outerCircle,
                              mealTime1 === 'After Meal' && styles.selectedOuterCircle,
                            ]}
                          >
                            {mealTime1 === 'After Meal' && <View style={styles.innerCircle} />}
                          </View>
                          <Text style={styles.radioLabel}>After Meal</Text>
                        </TouchableOpacity>
                      </View>


                    </View>

                    <View style={styles.buttonContainer}>

                      <TouchableOpacity disabled={submitFlag ? true : false} style={[styles.tuchabluebutton, { backgroundColor: submitFlag == true ? colors.ash : '#EE426D', flexDirection: 'row' }]} onPress={() => { setLoading1(true), setSubmitFlag(true), performCalculation(); }}>
                        <ActivityIndicator size="small" color="#00263C" style={{ display: isLoading1 ? 'flex' : 'none', right: 30 }} />
                        <Text style={styles.buttonText}>Submit</Text>
                      </TouchableOpacity>
                    </View>



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
    // flexDirection: "row",
    justifyContent: 'flex-start',
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

export default HealthTracking;