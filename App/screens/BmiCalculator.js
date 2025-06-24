import React, { useState, useEffect, useContext, useRef } from 'react';
import { Dimensions, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Alert } from 'react-native';
import colors from '../config/colors';

import { UserContext } from '../../components/CredintailsContext';

import { TouchableOpacity } from 'react-native';

function BmiCalculator({ navigation, route }) {

  // State for the input fields
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("Male");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [healthyWeightRange, setHealthyWeightRange] = useState('');
  const [unitSystem, setUnitSystem] = useState('Metric');

  // State for the calculation result
  const [result, setResult] = useState(null);

  const performCalculation = () => {
    // let ag = parseFloat(age);
    let hig = parseFloat(height);
    let wig = parseFloat(weight);

    if (!isNaN(hig) && !isNaN(wig)) {
      let bmiValue;

      if (unitSystem === 'Metric') {
        // Metric: Height in cm, Weight in kg
        const heightInMeters = hig * 0.3048; // Convert height from cm to meters
        if (heightInMeters > 0 && wig > 0) {
          bmiValue = wig / (heightInMeters * heightInMeters);
        }
      } else if (unitSystem === 'US') {
        // US: Height in inches, Weight in pounds
        if (hig > 0 && wig > 0) {
          bmiValue = (wig * 703) / (hig * hig);
        }
      }

      if (bmiValue) {
        setBmi(bmiValue.toFixed(2));
        categorizeBMI(bmiValue);
        calculateHealthyWeightRange(
          unitSystem === 'Metric' ? hig / 100 : hig * 0.0254 // Convert inches to meters for range calculation
        );
        UserInfo(bmiValue.toFixed(2));
      } else {
        setBmi(null);
        setBmiCategory('');
        setHealthyWeightRange('');
      }

      setResult({
        id: 1,
        // age: ag,
        bmi: bmiValue,
        height: hig,
        weight: wig,
      });
    } else {
      setResult(null);
    }
  };

  const calculateHealthyWeightRange = (heightInMeters) => {
    const minWeight = 18.5 * (heightInMeters ** 2);
    const maxWeight = 24.9 * (heightInMeters ** 2);
    setHealthyWeightRange(`${minWeight.toFixed(1)} kg - ${maxWeight.toFixed(1)} kg`);
  };

  const categorizeBMI = (bmiValue) => {
    if (bmiValue < 18.5) {
      setBmiCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setBmiCategory('Normal Weight');
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setBmiCategory('Overweight');
    } else if (bmiValue >= 30) {
      setBmiCategory('Obesity');
    }
  };

  const getCategoryStyle = () => {
    if (bmiCategory === 'Underweight') return { backgroundColor: '#FF4646' };
    if (bmiCategory === 'Normal Weight') return { backgroundColor: '#78B060' };
    if (bmiCategory === 'Overweight') return { backgroundColor: '#FF4646' };
    if (bmiCategory === 'Obesity') return { backgroundColor: '#FF4646' };
    return {};
  };

  ////////////////////////

  const { authtoken, setAuthtoken } = useContext(UserContext);

  const { testCredentials, setTestCredentials } = useContext(UserContext);
  const [lan, setLan] = useState(true);
  const [userid, setUserid] = useState(testCredentials.userid);

  const UserInfo = (bmiValue) => {
    const currentTime = new Date().toISOString();

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
    };

    fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
      .then((response) => response.json())
      .then((currentData) => {
        setNointernet(false);
        if (currentData.gender == "" || currentData.gender == null) {
          setGender(gender);
        } else {
          setGender(currentData.gender);
        }

        const heightValue = parseFloat(height) || 0;
        const weightValue = parseFloat(weight) || 0;


        // Convert height to inches if necessary (assuming input is in cm)
        const heightInInches = unitSystem === 'Metric' ? Math.round(heightValue * 0.393701) : Math.round(heightValue);

        // Convert weight to kilograms if necessary (assuming input is in lbs)
        const weightInKg = unitSystem === 'US' ? Math.round(weightValue * 0.453592) : Math.round(weightValue);

        const updatedHeight =
          currentData.height
            ? [...currentData.height, { value: heightInInches, timestamp: currentTime }]
            :
            [{ value: heightInInches, timestamp: currentTime }];

        const updatedWeight =
          currentData.weight
            ? [...currentData.weight, { value: weightInKg, timestamp: currentTime }]
            :
            [{ value: weightInKg, timestamp: currentTime }];

        const updatedBMI =
          currentData.bmicalculate
            ? [...currentData.bmicalculate, { value: bmiValue, timestamp: currentTime }]
            :
            [{ value: bmiValue, timestamp: currentTime }];


        const newUserData = {
          height: updatedHeight,
          weight: updatedWeight,
          bmicalculate: updatedBMI,
        };

        // Step 3: Send updated data
        const requestOptions = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authtoken
          },
          body: JSON.stringify(newUserData)
        };

        fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
          .then(() => {
            console.log("Successfully updated");
          })
          .catch((error) => {
            setNointernet(true);
            console.error("Update failed:", error);
          });
      })

      .catch((error) => {
        console.error(error);
        setNointernet(true);
        setLoading1(false);

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

            <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Bmi Calculator </Text>

          </View>



        </View>


        <View style={[styles.body1, { justifyContent: 'flex-start', alignItems: 'center' }]}>
          {/* <ScrollView > */}

          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20, paddingHorizontal: 16 }}>



            <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'center', marginBottom: 20, backgroundColor: "#EE416C", borderRadius: 8 }}>

              <TouchableOpacity
                onPress={() => setGender('Male')}
                style={{
                  width: "45%",
                  padding: 9,
                  margin: 5,
                  justifyContent: "center",
                  backgroundColor: gender === 'Male' ? 'white' : '#EE416C',
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: gender === 'Male' ? '#000000' : 'white', textAlign: "center" }}>Male</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setGender('Female')}
                style={{
                  width: "45%",
                  padding: 9,
                  margin: 5,
                  justifyContent: "center",
                  backgroundColor: gender === 'Female' ? 'white' : '#EE416C',
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: gender === 'Female' ? '#000000' : 'white', textAlign: "center" }}>Female</Text>
              </TouchableOpacity>
            </View>
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
                        // paddingHorizontal: 16,
                        // paddingTop: 12,
                        paddingBottom: 20,

                        borderRadius: 10,
                        // backgroundColor: "#f1ece9",
                        // zIndex: 1000,
                      },
                    ]}
                  >
                    {/* <Text style={{ fontSize: 14 }}>House Dimension</Text> */}

                    {/* <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Age</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='Enter your age'
                        keyboardType="numeric"
                        value={age}
                        onChangeText={setAge}
                      />
                    </View> */}

                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Height (feet)</Text>
                      <TextInput
                        style={styles.input}
                        placeholder={unitSystem === 'Metric' ? 'exp. 5.6' : 'inches'}
                        keyboardType="numeric"
                        value={height}
                        onChangeText={setHeight}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Weight (kg)</Text>
                      <TextInput
                        style={styles.input}
                        placeholder={unitSystem === 'Metric' ? 'exp. 60' : 'lbs'}
                        keyboardType="numeric"
                        value={weight}
                        onChangeText={setWeight}
                      />
                    </View>
                  </View>





                  {bmi && (
                    <View style={{
                      width: "100%", alignItems: "center", marginTop: 20, borderBottomWidth: 1,
                      borderColor: "#D6D4D4",
                      paddingBottom: 10,
                      // width: "90%",
                    }}>

                      <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 13, color: "#EE426D" }}>
                        Your BMI is:
                      </Text>
                      <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 28, color: "#EE426D" }}>
                        {bmi}
                      </Text>

                      <Text style={[styles.category, getCategoryStyle()]}>
                        {bmiCategory}
                      </Text>
                    </View>
                  )}

                  {result && (<>
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-evenly", padding: 8, marginVertical: 10 }}>
                      <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "#EE426D", fontSize: 18, fontFamily: "Poppins_500Medium" }}>{weight} {unitSystem === 'Metric' ? 'Kg' : 'lbs'}</Text>
                        <Text style={{ color: "#ACACAC", fontSize: 13, fontFamily: "Poppins_500Medium" }}>Weight</Text>
                      </View>
                      <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "#EE426D", fontSize: 18, fontFamily: "Poppins_500Medium" }}>{height} {unitSystem === 'Metric' ? 'Feet' : 'inc'}</Text>
                        <Text style={{ color: "#ACACAC", fontSize: 13, fontFamily: "Poppins_500Medium" }}>Height</Text>
                      </View>
                      {/* <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "#EE426D", fontSize: 18, fontFamily: "Poppins_500Medium" }}>{age}</Text>
                        <Text style={{ color: "#ACACAC", fontSize: 13, fontFamily: "Poppins_500Medium" }}>Age</Text>
                      </View> */}
                      <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "#EE426D", fontSize: 18, fontFamily: "Poppins_500Medium" }}>{gender}</Text>
                        <Text style={{ color: "#ACACAC", fontSize: 13, fontFamily: "Poppins_500Medium" }}>Gender</Text>
                      </View>
                    </View>

                    <View style={{ width: "100%", alignItems: "center" }}>
                      <Text style={{ fontFamily: 'Poppins_500Medium', color: "#0A1207", fontSize: 15 }}>
                        Healthy weight range for your height:
                      </Text>
                      <Text style={{ fontFamily: 'Poppins_500Medium', color: "#EE426D", fontSize: 16, marginTop: 4 }}>
                        {healthyWeightRange}
                      </Text>
                    </View>

                    <View style={styles.tableContainer}>
                      {/* <Text style={styles.tableTitle}>BMI Range</Text> */}
                      <View style={styles.table}>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableCell}>BMI Range</Text>
                          <Text style={styles.tableCell}>Category</Text>
                        </View>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableCell}>Below 18.5</Text>
                          <Text style={styles.tableCell}>Underweight</Text>
                        </View>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableCell}>18.5 - 24.9</Text>
                          <Text style={styles.tableCell}>Normal weight</Text>
                        </View>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableCell}>25.0 - 29.9</Text>
                          <Text style={styles.tableCell}>Overweight</Text>
                        </View>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableCell}>30.0 and above</Text>
                          <Text style={styles.tableCell}>Obesity</Text>
                        </View>
                      </View>
                    </View>

                  </>)}

                  <View style={styles.buttonContainer}>
                    {/* <TouchableOpacity style={styles.button} onPress={handleReset}>
                      <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity> */}
                    {
                      result ? <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Homepage", {})}>
                        <Text style={styles.buttonText}>Home</Text>
                      </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={() => { performCalculation(); }}>
                          <Text style={styles.buttonText}>Calculate</Text>
                        </TouchableOpacity>
                    }
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
    marginTop: 10,
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
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 70,
  },

  button: {
    flex: 1,
    backgroundColor: "#EE416C",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    // marginHorizontal: 5,
    marginTop: 10
  },

  buttonText: {
    color: "#fff",
    fontSize: 13,
  },

  tableContainer: {
    marginBottom: 40,
    marginTop: 40
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
    // borderBottomWidth: 1,
    // borderColor: "#ccc",
    // paddingVertical: 10,
  },

  tableCell: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    textAlign: "center",
    paddingVertical: 10,
    borderWidth: 1,

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
});

export default BmiCalculator;