import React, { useState, useEffect, useContext, useRef } from 'react';
import { Dimensions, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Alert } from 'react-native';
import colors from '../config/colors';
import DropDownPicker from "react-native-dropdown-picker";
import { UserContext } from '../../components/CredintailsContext';
import { TouchableOpacity } from 'react-native';

function CalorieCalculator({ navigation, route }) {
  // State for the Activity dropdown
  const [activityOpen, setActivityOpen] = useState(false);
  const [activityValue, setActivityValue] = useState();
  const [activityItems, setActivityItems] = useState([
    { label: "Sedentary(little or no exercise)", value: 1.2 },
    { label: "Lightly Active(light exercise/sports 1-3 days/week)", value: 1.375 },
    { label: "Moderately Active(moderate exercise/sports 3-5 days/week)", value: 1.55 },
    { label: "Very Active(hard exercise/sports 6-7 days/week)", value: 1.725 },
    { label: "Super Active(very hard exercise/physical job)", value: 1.9 },
  ]);

  // State for the Gender dropdown

  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState("");
  const [genderItems, setGenderItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ]);

  // State for the input fields
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [maintainWeight, setMaintainWeight] = useState(); // default to male
  const [mildWeightLoss, setMildWeightLoss] = useState(); // default to male
  const [weightLoss, setWeightLoss] = useState(); // default to male
  const [extremeWeightLoss, setExtremeWeightLoss] = useState(); // default to male
  const [weightGain, setWeightGain] = useState(); // default to male

  // State for the calculation result
  const [result, setResult] = useState(false);

  const performCalculation = () => {
    let ag = parseFloat(age);
    let hig = parseFloat(height); // height in feet
    let aValue = parseFloat(activityValue);
    let gen = genderValue;
    let wig = parseFloat(weight); // weight in kg
    console.log(ag, wig, hig, gen, aValue);

    if (
      !isNaN(ag) &&
      !isNaN(hig) &&
      !isNaN(aValue) &&
      (gen === "male" || gen === "female") &&
      !isNaN(wig)
    ) {
      const heightInCm = hig * 30.48; // Convert height from feet to cm

      const bmr = gen === "male"
        ? (10 * wig) + (6.25 * heightInCm) - (5 * ag) + 5
        : (10 * wig) + (6.25 * heightInCm) - (5 * ag) - 161;

      const activityMultiplier = aValue;
      const maintenanceCalories = bmr * activityMultiplier;

      setMaintainWeight(maintenanceCalories.toFixed(2));
      setMildWeightLoss((maintenanceCalories * 0.9).toFixed(2));
      setWeightLoss((maintenanceCalories * 0.8).toFixed(2));
      setExtremeWeightLoss((maintenanceCalories * 0.7).toFixed(2)); // Usually 0.7 for extreme
      setWeightGain((maintenanceCalories * 1.1).toFixed(2));

      UserInfo(
        ag,
        hig,
        wig,
        gen,
        maintenanceCalories.toFixed(2),
        (maintenanceCalories * 0.9).toFixed(2),
        (maintenanceCalories * 0.8).toFixed(2),
        (maintenanceCalories * 0.7).toFixed(2),
        (maintenanceCalories * 1.1).toFixed(2)
      );

      setResult(true);
    } else {
      setResult(false);
    }
  };
  ////////////////////////

  const { authtoken, setAuthtoken } = useContext(UserContext);

  const { testCredentials, setTestCredentials } = useContext(UserContext);
  const [lan, setLan] = useState(true);
  const [userid, setUserid] = useState(testCredentials.userid);


  const [nointernet, setNointernet] = useState(false);
  const [isLoading1, setLoading1] = useState(false);

  const UserInfo = (age, heightt, weightt, gender, maintainWeight, mildWeightLoss, weightLoss, extremeWeightLoss, weightGain) => {
    const currentTime = new Date().toISOString();

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
    };

    fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
      .then((response) => response.json())
      .then((currentData) => {
        setNointernet(false);

        const updatedHeight =
          currentData.height
            ? [...currentData.height, { value: height, timestamp: currentTime }]
            :
            [{ value: height, timestamp: currentTime }];

        const updatedWeight =
          currentData.weight
            ? [...currentData.weight, { value: weight, timestamp: currentTime }]
            :
            [{ value: weight, timestamp: currentTime }];

        const updatedCaloridata =
          currentData.caloridata
            ? [...currentData.caloridata, {
              value: {
                maintain_Weight: maintainWeight,
                mildWeight_Loss: mildWeightLoss,
                weight_Loss: weightLoss,
                extreme_Weight_Loss: extremeWeightLoss,
                weight_Gain: weightGain

              }, timestamp: currentTime
            }]
            :
            [{ value: weight, timestamp: currentTime }];

        const updatedGender = gender;
        const updatedAge = age;

        const newUserData = {
          height: updatedHeight,
          weight: updatedWeight,
          age: updatedAge,
          gender: updatedGender,
          caloridata: updatedCaloridata
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

            <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} > Calorie Calculator </Text>

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

                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Age</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='Enter your age'
                        keyboardType="numeric"
                        value={age}
                        onChangeText={setAge}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Height (feet)</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='exp. 5.6'
                        keyboardType="numeric"
                        value={height}
                        onChangeText={setHeight}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Weight (kg)</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='exp. 60'
                        keyboardType="numeric"
                        value={weight}
                        onChangeText={setWeight}
                      />
                    </View>

                    <View style={[styles.inputContainer, { zIndex: 6000 }]}>
                      <Text style={styles.inputLabel}>Activity</Text>
                      <DropDownPicker
                        style={styles.dropdown}
                        open={activityOpen}
                        value={activityValue}
                        items={activityItems}
                        setOpen={setActivityOpen}
                        setValue={setActivityValue}
                        setItems={setActivityItems}
                        placeholder="Select your activity type"
                      // containerStyle={styles.dropdown}
                      // onChangeValue={handleCategorySelect}
                      />
                    </View>

                    <View style={[styles.inputContainer, { zIndex: 5000 }]}>
                      <Text style={styles.inputLabel}>Gender</Text>
                      <DropDownPicker
                        style={styles.dropdown}
                        open={genderOpen}
                        value={genderValue}
                        items={genderItems}
                        setOpen={setGenderOpen}
                        setValue={setGenderValue}
                        setItems={setGenderItems}
                        placeholder="Select Gender"
                      // containerStyle={styles.dropdown}
                      // onChangeValue={handleCategorySelect}
                      />
                    </View>

                  </View>







                  {
                    result && <View style={{
                      width: "100%",
                      marginVertical: 20,
                      // backgroundColor: colors.white,
                      paddingHorizontal: 10,
                      paddingVertical: 20,
                      borderRadius: 8,
                      shadowColor: '#dbdbdb',
                      shadowOffset: { width: 3, height: 3 },
                      shadowOpacity: 5,
                      shadowRadius: 5,
                      elevation: 1,
                      alignItems: "center"
                    }}>
                      <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 16, color: "#EE426D", textAlign: "center" }}>Calories Count:</Text>

                      <View style={{ width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>

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

                      <View style={{ width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>


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

                      <View style={{ width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>


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

                      <View style={{ width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>


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

                      <View style={{ width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>

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
                    <TouchableOpacity style={styles.button} onPress={() => performCalculation()}>
                      <Text style={styles.buttonText}>Calculate</Text>
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
    marginBottom: 10,
    paddingLeft: 2
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
    marginBottom: 100,
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
});

export default CalorieCalculator;