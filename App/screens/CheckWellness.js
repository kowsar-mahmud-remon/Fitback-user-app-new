import React, { useState, useEffect, useContext, useRef } from 'react';
import { Dimensions, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, TouchableOpacity, Modal, Button, Alert, Animated } from 'react-native';
import colors from '../config/colors';

import { UserContext } from '../../components/CredintailsContext';

function CheckWellness({ navigation, route }) {
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

  // setGetDoctor
  const [userData, setUserData] = useState();


  ///////////
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [selectedOption4, setSelectedOption4] = useState(null);
  const [selectedOption5, setSelectedOption5] = useState(null);
  const [selectedOption6, setSelectedOption6] = useState(null);

  const [healthStatus, setHealthStatus] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const calculateHealthStatus = () => {
    let score = 0;

    if (selectedOption1 === '7h') score += 1;
    if (selectedOption2 === '3') score += 1;
    if (selectedOption3 === 'yes') score += 1;
    if (selectedOption4 === '45') score += 1;
    if (selectedOption5 === '1') score += 1;
    if (selectedOption6 === 'yes') score += 1;

    // Determine health status
    if (score == 6) {
      return 'Excellent';
    } else if (score == 5) {
      return 'Good';
    } else {
      return 'Needs Improvement';
    }
  };

  const handleShowHealthStatus = () => {
    const result = calculateHealthStatus();
    setHealthStatus(result); // Store the result in the state variable
    setModalVisible(true);   // Open the modal
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

            <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Check Wellness </Text>

          </View>



        </View>


        <View style={[styles.body1, { justifyContent: 'flex-start', alignItems: 'center' }]}>
          <ScrollView style={{ width: "100%" }}>



            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20, paddingHorizontal: 16, paddingBottom: 20 }}>

              <View style={{ width: "100%", backgroundColor: "#EE426D", paddingVertical: 16, borderRadius: 10 }}>
                <Text style={{ color: colors.ash, fontSize: 16, fontFamily: 'Poppins_500Medium', letterSpacing: 0.9, color: "white", textAlign: "center", marginTop: 8 }}>Check Your Wellness Condition</Text>

                <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginTop: 14 }}>

                  <View style={{ backgroundColor: "white", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                    {/* <Text style={{ fontSize: 12, fontFamily: 'Poppins_500Medium', letterSpacing: 0.9, color: "black", textAlign: "center", marginRight: 6 }}>{healthStatus ? healthStatus : "None"}</Text> */}
                    <Image
                      style={{ width: 16, height: 16, marginBottom: 4 }}
                      resizeMode="stretch"
                      source={require('../assets/fitback/likeIcon.png')}
                    />

                  </View>


                </View>

                {/* <Text style={{ color: "white", fontSize: 8, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "center", marginTop: 10 }}>Last Updated : 02 December 2024</Text> */}
              </View>


              <View style={{ width: "100%" }}>
                {/* <Text style={{ fontSize: 14, fontFamily: 'Poppins_500Medium', letterSpacing: 0.9, color: "#000000", marginTop: 16 }}>Share Your Wellness Update</Text> */}


                <View
                  style={{
                    // flex: 1,
                    width: "100%",
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    // padding: 20,
                    // backgroundColor: '#f8f9fa',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#403E3E",
                      fontFamily: "Poppins_500Medium",
                      marginTop: 14,
                      marginBottom: 6,
                      letterSpacing: 0.5
                    }}
                  >
                    1) How many hours did you sleep today?
                  </Text>

                  <View style={{ width: "100%", flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingRight: 20, marginTop: 4 }}>

                    {/* Option 1 */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: "32%"
                      }}
                      onPress={() => setSelectedOption1('5h')}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderWidth: 1,
                          borderColor: '#555555',
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 7,
                        }}
                      >
                        {selectedOption1 === '5h' && (
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                              backgroundColor: '#EE416C',
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: '#555555', marginTop: 2 }}>5 hours</Text>
                    </TouchableOpacity>

                    {/* Option 2 */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: "32%"
                      }}
                      onPress={() => setSelectedOption1('6h')}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderWidth: 1,
                          borderColor: '#555555',
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 7,
                        }}
                      >
                        {selectedOption1 === '6h' && (
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                              backgroundColor: '#EE416C',
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: '#555555', marginTop: 2 }}>6 hours</Text>
                    </TouchableOpacity>

                    {/* Option 3 */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: "32%",
                      }}
                      onPress={() => setSelectedOption1('7h')}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderWidth: 1,
                          borderColor: '#555555',
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 7,
                        }}
                      >
                        {selectedOption1 === '7h' && (
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                              backgroundColor: '#EE416C',
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: '#555555', marginTop: 2 }}>7 hours</Text>
                    </TouchableOpacity>
                  </View>

                  {
                    selectedOption1 ? <Text
                      style={{
                        fontSize: 10,
                        color: "#6B6B6B",
                        fontFamily: "Poppins_400Regular",
                        marginTop: 2,
                        marginBottom: 8,
                        textAlign: "justify",
                        letterSpacing: 0.5
                      }}
                    >
                      N.B: We recommend that adults get 7 or more hours of sleep per night. Because it will keep you healthy and lower the risk for any kind of serious health problems.
                    </Text>
                      :
                      ""
                  }
                </View>

                <View
                  style={{
                    // flex: 1,
                    width: "100%",
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    // padding: 20,
                    // backgroundColor: '#f8f9fa',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#403E3E",
                      fontFamily: "Poppins_500Medium",
                      marginTop: 14,
                      marginBottom: 6,
                      letterSpacing: 0.5
                    }}
                  >
                    2) How much water did you drink today?
                  </Text>

                  <View style={{ width: "100%", flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingRight: 20, marginTop: 4 }}>

                    {/* Option 1 */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: "32%",
                      }}
                      onPress={() => setSelectedOption2('1')}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderWidth: 1,
                          borderColor: '#555555',
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 7,
                        }}
                      >
                        {selectedOption2 === '1' && (
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                              backgroundColor: '#EE416C',
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: '#555555', marginTop: 2 }}>1 liter</Text>
                    </TouchableOpacity>

                    {/* Option 2 */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: "32%",
                      }}
                      onPress={() => setSelectedOption2('2')}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderWidth: 1,
                          borderColor: '#555555',
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 7,
                        }}
                      >
                        {selectedOption2 === '2' && (
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                              backgroundColor: '#EE416C',
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: '#555555', marginTop: 2 }}>2 liter</Text>
                    </TouchableOpacity>

                    {/* Option 3 */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: "32%",
                      }}
                      onPress={() => setSelectedOption2('3')}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderWidth: 1,
                          borderColor: '#555555',
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 7,
                        }}
                      >
                        {selectedOption2 === '3' && (
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                              backgroundColor: '#EE416C',
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: '#555555', marginTop: 2 }}>3 liter</Text>
                    </TouchableOpacity>
                  </View>

                  {
                    selectedOption2 ? <Text
                      style={{
                        fontSize: 10,
                        color: "#6B6B6B",
                        fontFamily: "Poppins_400Regular",
                        marginTop: 2,
                        marginBottom: 8,
                        textAlign: "justify",
                        letterSpacing: 0.5
                      }}
                    >
                      N.B: We recommend that adults get 7 or more hours of sleep per night. Because it will keep you healthy and lower the risk for any kind of serious health problems.
                    </Text>
                      :
                      ""
                  }
                </View>

                <View
                  style={{
                    // flex: 1,
                    width: "100%",
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    // padding: 20,
                    // backgroundColor: '#f8f9fa',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#403E3E",
                      fontFamily: "Poppins_500Medium",
                      marginTop: 14,
                      marginBottom: 6,
                      letterSpacing: 0.5
                    }}
                  >
                    3) Does your bowel movements regularly?
                  </Text>

                  <View style={{ width: "100%", flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingRight: 20, marginTop: 4 }}>

                    {/* Option 1 */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: "32%",
                      }}
                      onPress={() => setSelectedOption3('yes')}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderWidth: 1,
                          borderColor: '#555555',
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 7,
                        }}
                      >
                        {selectedOption3 === 'yes' && (
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                              backgroundColor: '#EE416C',
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: '#555555', marginTop: 2 }}>Yes</Text>
                    </TouchableOpacity>

                    {/* Option 2 */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: "32%",
                      }}
                      onPress={() => setSelectedOption3('no')}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderWidth: 1,
                          borderColor: '#555555',
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 7,
                        }}
                      >
                        {selectedOption3 === 'no' && (
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                              backgroundColor: '#EE416C',
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: '#555555', marginTop: 2 }}>No</Text>
                    </TouchableOpacity>
                  </View>

                  {
                    selectedOption3 ? <Text
                      style={{
                        fontSize: 10,
                        color: "#6B6B6B",
                        fontFamily: "Poppins_400Regular",
                        marginTop: 2,
                        marginBottom: 8,
                        textAlign: "justify",
                        letterSpacing: 0.5
                      }}
                    >
                      N.B: Regular bowel movements help in the efficient removal of waste and toxins from the body, preventing the assemblage of harmful substances that can compromise overall health.
                    </Text>
                      :
                      ""
                  }
                </View>

                <View
                  style={{
                    // flex: 1,
                    width: "100%",
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    // padding: 20,
                    // backgroundColor: '#f8f9fa',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#403E3E",
                      fontFamily: "Poppins_500Medium",
                      marginTop: 14,
                      marginBottom: 6,
                      letterSpacing: 0.5
                    }}
                  >
                    4) How long did you walk today?
                  </Text>

                  <View style={{ width: "100%", flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingRight: 20, marginTop: 4 }}>

                    {/* Option 1 */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: "32%",
                      }}
                      onPress={() => setSelectedOption4('15')}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderWidth: 1,
                          borderColor: '#555555',
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 7,
                        }}
                      >
                        {selectedOption4 === '15' && (
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                              backgroundColor: '#EE416C',
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: '#555555', marginTop: 2 }}>15 minutes</Text>
                    </TouchableOpacity>

                    {/* Option 2 */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: "32%",
                      }}
                      onPress={() => setSelectedOption4('25')}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderWidth: 1,
                          borderColor: '#555555',
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 7,
                        }}
                      >
                        {selectedOption4 === '25' && (
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                              backgroundColor: '#EE416C',
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: '#555555', marginTop: 2 }}>25 minutes</Text>
                    </TouchableOpacity>

                    {/* Option 3 */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: "32%",
                      }}
                      onPress={() => setSelectedOption4('45')}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderWidth: 1,
                          borderColor: '#555555',
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 7,
                        }}
                      >
                        {selectedOption4 === '45' && (
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                              backgroundColor: '#EE416C',
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: '#555555', marginTop: 2 }}>45 minutes</Text>
                    </TouchableOpacity>
                  </View>

                  {
                    selectedOption4 ? <Text
                      style={{
                        fontSize: 10,
                        color: "#6B6B6B",
                        fontFamily: "Poppins_400Regular",
                        marginTop: 2,
                        marginBottom: 8,
                        textAlign: "justify",
                        letterSpacing: 0.5
                      }}
                    >
                      N.B: Regular walk can reduce the risk of heart disease and stroke and it will improve your metabolic rate.
                    </Text>
                      :
                      ""
                  }
                </View>

                <View
                  style={{
                    // flex: 1,
                    width: "100%",
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    // padding: 20,
                    // backgroundColor: '#f8f9fa',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#403E3E",
                      fontFamily: "Poppins_500Medium",
                      marginTop: 14,
                      marginBottom: 6,
                      letterSpacing: 0.5
                    }}
                  >
                    5) How many days in two weeks do you eat out?
                  </Text>

                  <View style={{ width: "100%", flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingRight: 20, marginTop: 4 }}>

                    {/* Option 1 */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: "32%",
                      }}
                      onPress={() => setSelectedOption5('1')}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderWidth: 1,
                          borderColor: '#555555',
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 7,
                        }}
                      >
                        {selectedOption5 === '1' && (
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                              backgroundColor: '#EE416C',
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: '#555555', marginTop: 2 }}>1 Day</Text>
                    </TouchableOpacity>

                    {/* Option 2 */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: "32%",
                      }}
                      onPress={() => setSelectedOption5('2')}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderWidth: 1,
                          borderColor: '#555555',
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 7,
                        }}
                      >
                        {selectedOption5 === '2' && (
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                              backgroundColor: '#EE416C',
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: '#555555', marginTop: 2 }}>2 Days</Text>
                    </TouchableOpacity>

                    {/* Option 3 */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: "32%",
                      }}
                      onPress={() => setSelectedOption5('3')}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderWidth: 1,
                          borderColor: '#555555',
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 7,
                        }}
                      >
                        {selectedOption5 === '3' && (
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                              backgroundColor: '#EE416C',
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: '#555555', marginTop: 2 }}>3 Days</Text>
                    </TouchableOpacity>
                  </View>

                  {
                    selectedOption5 ? <Text
                      style={{
                        fontSize: 10,
                        color: "#6B6B6B",
                        fontFamily: "Poppins_400Regular",
                        marginTop: 2,
                        marginBottom: 8,
                        textAlign: "justify",
                        letterSpacing: 0.5
                      }}
                    >
                      N.B: It will slow your metabolic rate and be directly connected to the weight gain process.
                    </Text>
                      :
                      ""
                  }
                </View>

                <View
                  style={{
                    // flex: 1,
                    width: "100%",
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    // padding: 20,
                    // backgroundColor: '#f8f9fa',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#403E3E",
                      fontFamily: "Poppins_500Medium",
                      marginTop: 14,
                      marginBottom: 6,
                      letterSpacing: 0.5
                    }}
                  >
                    6) Is your period regular?
                  </Text>

                  <View style={{ width: "100%", flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingRight: 20, marginTop: 4 }}>

                    {/* Option 1 */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: "32%",
                      }}
                      onPress={() => setSelectedOption6('yes')}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderWidth: 1,
                          borderColor: '#555555',
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 7,
                        }}
                      >
                        {selectedOption6 === 'yes' && (
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                              backgroundColor: '#EE416C',
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: '#555555', marginTop: 2 }}>Yes</Text>
                    </TouchableOpacity>

                    {/* Option 2 */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: "32%",
                      }}
                      onPress={() => setSelectedOption6('no')}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderWidth: 1,
                          borderColor: '#555555',
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 7,
                        }}
                      >
                        {selectedOption6 === 'no' && (
                          <View
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                              backgroundColor: '#EE416C',
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: '#555555', marginTop: 2 }}>No</Text>
                    </TouchableOpacity>
                  </View>

                  {
                    selectedOption6 ? <Text
                      style={{
                        fontSize: 10,
                        color: "#6B6B6B",
                        fontFamily: "Poppins_400Regular",
                        marginTop: 2,
                        marginBottom: 8,
                        textAlign: "justify",
                        letterSpacing: 0.5
                      }}
                    >
                      N.B: If you're facing an irregular period you should consult a gynecologist.
                    </Text>
                      :
                      ""
                  }
                </View>


                <View style={styles.buttonContainer}>
                  {/* <TouchableOpacity style={styles.button} onPress={handleReset}>
                      <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity> */}
                  {/* {
                      result ? <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Homepage", {})}>
                        <Text style={styles.buttonText}>Home</Text>
                      </TouchableOpacity>
                        : */}
                  <TouchableOpacity style={styles.button} onPress={() => { setModalVisible(true), handleShowHealthStatus(); }}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                  {/* } */}
                </View>

              </View>


            </View>

          </ScrollView>

          {/* Modal */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            >


              <View style={{
                width: "85%", backgroundColor: "#EE426D", paddingVertical: 16, borderRadius: 10, position: 'relative',
              }}>

                {/* Close Icon */}
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                  }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16, color: "white", paddingHorizontal: 10 }}>x</Text>
                </TouchableOpacity>

                <Text style={{ color: colors.ash, fontSize: 16, fontFamily: 'Poppins_500Medium', letterSpacing: 0.5, color: "white", textAlign: "center", marginTop: 26 }}>Your Today’s Health Insights</Text>

                <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginTop: 20 }}>

                  <View style={{ backgroundColor: "white", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6, flexDirection: "row", justifyContent: "center", alignItems: "center", bottom: 10 }}>

                    <Text style={{ fontSize: 12, fontFamily: 'Poppins_500Medium', letterSpacing: 0.9, color: "black", textAlign: "center", marginRight: 6 }}>{healthStatus}</Text>
                    <Image
                      style={{ width: 16, height: 16, marginBottom: 6 }}
                      resizeMode="stretch"
                      source={require('../assets/fitback/likeIcon.png')}
                    />

                  </View>


                </View>

                {/* <Text style={{ color: "white", fontSize: 8, fontFamily: 'Poppins_400Regular', letterSpacing: 0.9, textAlign: "center", marginTop: 16, marginBottom: 20 }}>You're on the right track—keep up the great work!</Text> */}
              </View>

            </View>
          </Modal>


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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
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
});

export default CheckWellness;