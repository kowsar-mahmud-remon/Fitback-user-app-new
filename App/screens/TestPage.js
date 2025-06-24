import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  Pressable,
  Text,
  ScrollView,
  TextInput,
  Image,
  Linking,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';
import { getData, storeData } from "../AsyncStorage/asyncStorage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";



import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';
import { UserContext } from '../../components/CredintailsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TestPage({ route }) {

  // Accessing user context
  const { testCredentials, setTestCredentials } = useContext(UserContext);
  const { authtoken } = useContext(UserContext);

  // State Variables
  const [lan, setLan] = useState(true); // Language toggle
  const [userDetails, setUserDetails] = useState('');
  const [userId, setUserId] = useState(testCredentials.userid);

  // For managing API calls and user data
  const [getAllUser, setGetAllUser] = useState(true);
  const [allUserData, setAllUserData] = useState();

  // Load data from AsyncStorage
  const loadData = async () => {
    try {
      const allData = await AsyncStorage.getItem('healthTrackingData');
      if (allData !== null) {
        setUserDetails(JSON.parse(allData));
      }
    } catch (error) {
      console.error('Failed to load data', error);
    }
  };

  // Fetch user profile data from API
  const allUserInfo = () => {
    if (getAllUser) {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: authtoken,
        },
      };

      fetch(`https://qwikit1.pythonanywhere.com/userProfile/${userId}`, requestOptions)
        .then((response) => response.json())
        .then((json) => {
          setAllUserData(json);
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
        });

      setGetAllUser(false);
    }
  };

  // Initial setup
  useEffect(() => {
    loadData();
    allUserInfo();
  }, [route.params]);






  ////////////////
  /////test //////
  ////////////////
  // const testTitle = route.params.test;
  const testTitle = "TitleOne";
  const removeTest = route.params.handleRemoveTest;
  const retryRequired = route.params.handleRetryRequired;
  const navigation = useNavigation();

  const beforeRemoveListenerRef = useRef(null);

  useEffect(() => {
    beforeRemoveListenerRef.current = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();

      Alert.alert("Are you sure?", "Do you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
    });

    return () => {
      // Cleanup the listener on unmount
      if (beforeRemoveListenerRef.current) {
        beforeRemoveListenerRef.current();
        beforeRemoveListenerRef.current = null;
      }
    };
  }, [navigation]);



  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [result, setResult] = useState(null);
  const [timer, setTimer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const resetTest = async () => {
    const storedQuestions = await getData("testData");
    if (storedQuestions) {
      const uniqueQuestions = selectUniqueRandomQuestions(storedQuestions, 20);
      setQuestions(uniqueQuestions);
    }
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers({});
    setTimeLeft(20 * 60);
    setResult(null);
    setAnsweredQuestions([]);
  };

  useFocusEffect(
    useCallback(() => {
      resetTest();
      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    }, [])
  );

  useEffect(() => {
    if (timeLeft <= 0 || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    setTimer(interval);

    return () => clearInterval(interval);
  }, [timeLeft, isPaused]);

  //////////////////////
  // Header with navigation buttons
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <StatusBar animated={true} backgroundColor="#000066" />
          <View style={[styles.navbar1]}>
            <View
              style={{
                width: '100%',
                height: 30,
                top: 8,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 20,
              }}
            >
              {/* Search Icon */}
              <Pressable
                style={{ width: 22, height: 22, right: 15 }}
                onPress={() => navigation.navigate('Pharmacy', { reminder: true })}
              >
                <Image
                  style={{ width: 22, height: 22, left: 0, top: 2 }}
                  resizeMode="contain"
                  source={require('../assets/search.jpg')}
                />
              </Pressable>

              {/* Cart Icon (Hidden when cart is empty) */}
              <Pressable
                style={{
                  width: 22,
                  height: 22,
                  right: 0,
                  display: testCredentials.cartbuy == undefined ? 'none' : testCredentials.cartbuy.length > 0 ? 'none' : 'flex',
                }}
                onPress={() => navigation.navigate('Cart', {})}
              >
                <Image
                  style={{ width: 22, height: 22, left: 0, top: 2 }}
                  resizeMode="contain"
                  source={require('../assets/ecart.jpg')}
                />
              </Pressable>

              {/* Active Cart Icon */}
              <Pressable
                style={{
                  width: 22,
                  height: 22,
                  right: 0,
                  display: testCredentials.cartbuy == undefined ? 'none' : testCredentials.cartbuy.length > 0 ? 'flex' : 'none',
                }}
                onPress={() => navigation.navigate('Cart', {})}
              >
                <Image
                  style={{ width: 22, height: 22, left: 0 }}
                  resizeMode="contain"
                  source={require('../assets/ecart.jpg')}
                />
              </Pressable>

              {/* More Options Icon */}
              <Pressable style={{ width: 20, height: 20, left: 15 }} onPress={() => navigation.toggleDrawer()}>
                <Image
                  style={{ width: 20, height: 20, left: 0, top: 3 }}
                  resizeMode="contain"
                  source={require('../assets/more.jpg')}
                />
              </Pressable>
            </View>
          </View>
        </>
      ),
    });
  }, [navigation]);
  ///////////////////////

  const selectUniqueRandomQuestions = (questions, numberOfQuestions) => {
    const selectedQuestions = [];
    const questionIds = new Set();

    while (
      selectedQuestions.length < numberOfQuestions &&
      questionIds.size < questions.length
    ) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      const selectedQuestion = questions[randomIndex];

      if (!questionIds.has(selectedQuestion.id)) {
        selectedQuestions.push(selectedQuestion);
        questionIds.add(selectedQuestion.id);
      }
    }

    return selectedQuestions;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[currentQuestionIndex].id]: answer,
    }));
    setAnsweredQuestions((prevAnswered) => [
      ...new Set([...prevAnswered, currentQuestionIndex]),
    ]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(answers[questions[nextIndex].id] || null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setSelectedAnswer(answers[questions[prevIndex].id] || null);
    }
  };

  const removeAnsweredQuestions = async (answeredQuestions) => {
    const storedQuestions = await getData("testData");
    if (storedQuestions) {
      const updatedQuestions = storedQuestions.filter(
        (q) => !answeredQuestions.some((a) => a.id === q.id)
      );
      await storeData("testData", updatedQuestions);
    }
  };

  const handleSubmit = async () => {
    const currentTime = new Date().toISOString();

    if (timer) {
      clearInterval(timer);
    }

    const finalAnswers = {
      ...answers,
      [questions[currentQuestionIndex]?.id]: selectedAnswer,
    };
    setAnswers(finalAnswers);

    const answeredQuestions = questions.map((q) => ({
      id: q.id,
      question: q.Question,
      correctAnswer: q["Correct Answer"] || q.Answer,
      selectedAnswer: finalAnswers[q.id],
    }));

    await storeData(testTitle, answeredQuestions);

    const wrongAnswers = questions
      .filter((q) => finalAnswers[q.id] !== (q["Correct Answer"] || q.Answer))
      .map((q) => ({
        id: q.id,
        question: q.Question,
        correctAnswer: q["Correct Answer"] || q.Answer,
      }));

    await storeData("wrongAnswers", wrongAnswers);

    console.log("wrongAnswers", wrongAnswers, wrongAnswers.length);

    const correctAnswersCount = questions.length - wrongAnswers.length;
    const totalQuestions = questions.length;
    const correctPercentage = (correctAnswersCount / totalQuestions) * 100;
    const passOrFail = correctPercentage >= 70 ? "Pass" : "Fail";

    let fCoin = 0;

    if (correctPercentage >= 80) {
      fCoin = 500;
    } else if (correctPercentage < 80 && correctPercentage >= 70) {
      fCoin = 400;
    } else if (correctPercentage < 70 && correctPercentage >= 60) {
      fCoin = 300;
    } else if (correctPercentage < 60 && correctPercentage >= 50) {
      fCoin = 200;
    } else {
      fCoin = 0;
    }

    await storeData("currentTitle", testTitle);
    await storeData("correctAnswersCount", correctAnswersCount);
    await storeData("totalQuestions", totalQuestions);
    await storeData("correctPercentage", correctPercentage);
    await storeData("passOrFail", passOrFail);
    await storeData("fCoin", fCoin);

    if (passOrFail === "Pass") {
      await removeAnsweredQuestions(answeredQuestions);
      // removeTest(testTitle);
    } else {
      // retryRequired(testTitle);
    }



    const updatedQuizData =
      allUserData?.quizzes
        ? [...allUserData.quizzes, {
          totalQuestions: totalQuestions,
          correctAnswers: correctAnswersCount,
          wrongAnswers: wrongAnswers.length,
          correctPercentage: correctPercentage,
          fCoin: 1000,
          timestamp: currentTime
        }]
        :
        [{
          totalQuestions: totalQuestions,
          correctAnswers: correctAnswersCount,
          wrongAnswers: wrongAnswers.length,
          correctPercentage: correctPercentage,
          fCoin: 1000,
          timestamp: currentTime
        }];

    const updatedFCoinData =
      allUserData?.fcoindata
        ? [...allUserData.fcoindata, {
          fCoin: 1000,
          details: "Quiz Reward",
          timestamp: currentTime
        }]
        :
        [{
          fCoin: 1100,
          details: "Quiz Reward",
          timestamp: currentTime
        }];

    const updatedFCoin = (Number(allUserData?.fcoins) || 0) + (Number(1000) || 0);



    const newUpdatedData = {
      quizzes: updatedQuizData,
      fcoindata: updatedFCoinData,
      fcoins: updatedFCoin
    };

    // Step 3: Send updated data
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authtoken
      },
      body: JSON.stringify(newUpdatedData)
    };

    fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userId, requestOptions)
      .then(() => {
        console.log("Successfully updated");
      })
      .catch((error) => {
        setNointernet(true);
        console.error("Update failed:", error);
      });

    // Remove the listener explicitly
    if (beforeRemoveListenerRef.current) {
      beforeRemoveListenerRef.current();
      beforeRemoveListenerRef.current = null;
    }

    // Navigate to the TestResultPage
    navigation.navigate("TestResultPage");
  };

  const handlePauseResume = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
    setSelectedAnswer(answers[questions[index].id] || null);
  };

  const allQuestionsAnswered = Object.keys(answers).length === questions.length;

  if (questions.length === 0) {
    return <Text>Loading questions...</Text>;
  }

  const currentQuestion = questions[currentQuestionIndex];




  // Render the Chat Screen
  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <View style={styles.MainContainer}>
        <StatusBar animated={true} backgroundColor="#303030" />
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

            <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Quiz </Text>

          </View>



        </View>

        {/* Scrollable Body */}
        <View style={[styles.body1, { justifyContent: 'flex-start', alignItems: 'center' }]}>
          {/* <ScrollView> */}
          <View style={{ flex: 1 }}>
            <View style={styles.timerContainer}>
              <TouchableOpacity onPress={handlePauseResume}>
                <MaterialIcons
                  name={isPaused ? "play-circle-outline" : "pause-circle-outline"}
                  size={22}
                  color="black"
                />
              </TouchableOpacity>
              <Text style={styles.timerText}>
                Time Left:{" "}
                <Text style={styles.timerTextTwo}>{formatTime(timeLeft)}</Text>
              </Text>
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.questionWidth}>
                <Text style={styles.questionText}>{currentQuestion.Question}</Text>
                {currentQuestion["Choice A"] ? (
                  <>
                    {["A", "B", "C", "D"].map((choice) => (
                      <TouchableOpacity
                        key={choice}
                        style={[
                          styles.optionButton,
                          selectedAnswer === currentQuestion[`Choice ${choice}`]
                            ? styles.selectedOption
                            : null,
                        ]}
                        onPress={() =>
                          handleAnswerSelect(currentQuestion[`Choice ${choice}`])
                        }
                      >
                        <View style={styles.radioCircle}>
                          {selectedAnswer === currentQuestion[`Choice ${choice}`] && (
                            <View style={styles.selectedRadioCircle} />
                          )}
                        </View>
                        <Text style={styles.optionText}>
                          {currentQuestion[`Choice ${choice}`]}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </>
                ) : (
                  <>
                    {["true", "false"].map((choice) => (
                      <TouchableOpacity
                        key={choice}
                        style={[
                          styles.optionButton,
                          selectedAnswer === choice ? styles.selectedOption : null,
                        ]}
                        onPress={() => handleAnswerSelect(choice)}
                      >
                        <View style={styles.radioCircle}>
                          {selectedAnswer === choice && (
                            <View style={styles.selectedRadioCircle} />
                          )}
                        </View>
                        <Text style={styles.optionText}>
                          {choice.charAt(0).toUpperCase() + choice.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </>
                )}
              </View>
              <View style={styles.buttonContainer}>
                {currentQuestionIndex > 0 && (
                  // <Button title="Previous" onPress={handlePrevious} />
                  <Feather
                    name="arrow-left-circle"
                    size={40}
                    color="#EE416C"
                    onPress={handlePrevious}
                  />
                )}
                {currentQuestionIndex < questions.length - 1 && (
                  // <Button title="Next" onPress={handleNext} />
                  <Feather
                    name="arrow-right-circle"
                    size={40}
                    color="#EE416C"
                    onPress={handleNext}
                  />
                )}
                {currentQuestionIndex === questions.length - 1 && (
                  <Button
                    title="Submit"
                    onPress={handleSubmit}
                    disabled={!allQuestionsAnswered}
                  />
                )}
              </View>
            </View>
            {/* )} */}
            <View style={styles.numberContainer}>
              {[...Array(20).keys()].map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.numberBox,
                    currentQuestionIndex === index ? styles.activeNumberBox : null,
                    answeredQuestions.includes(index) &&
                      currentQuestionIndex !== index
                      ? styles.answeredNumberBox
                      : null,
                  ]}
                  onPress={() => handleQuestionSelect(index)}
                >
                  <Text style={styles.numberText}>{index + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* </ScrollView> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: colors.body,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
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
  body1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  timerContainer: {
    padding: 16,
    flexDirection: "row",
    gap: 8,
  },

  timerText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },

  timerTextTwo: {
    fontSize: 14,
    color: "#EE416C",
    fontFamily: "Poppins_400Regular",
  },

  contentContainer: {
    flex: 1,
    padding: 16,
  },

  questionWidth: {
    height: 340,
  },

  questionText: {
    fontSize: 14,
    marginBottom: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
    backgroundColor: "#EE416C",
    color: "#fff",
    borderRadius: 8,
    lineHeight: 22,
    fontFamily: "Poppins_700Bold",
  },

  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },

  selectedOption: {
    backgroundColor: "#ddd",
  },

  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  selectedRadioCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },

  optionText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    marginTop: 20,
  },

  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  numberContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    justifyContent: "center",
    marginBottom: 10,
  },

  numberBox: {
    width: 25,
    height: 25,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
  },

  activeNumberBox: {
    borderColor: "#EE416C",
  },

  answeredNumberBox: {
    borderColor: "silver",
  },

  numberText: {
    fontSize: 14,
    // fontWeight: "bold",
    fontFamily: "Poppins_700Bold",
  },
});

export default TestPage;
