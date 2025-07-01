import React, { useState, useEffect, useContext, useRef } from 'react';
import { Dimensions, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Modal, TouchableOpacity, Alert, ImageBackground, Platform, Animated } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';

import { UserContext } from '../../components/CredintailsContext';
import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";
import Ionicons from '@expo/vector-icons/Ionicons';

import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';
// import * as Device from 'expo-device';

const { width, height } = Dimensions.get('window');

// Notification handler
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

function WaterIntakePage({ navigation, route }) {
  // for notification permission 
  // useEffect(() => {
  //   registerForPushNotificationsAsync();
  // }, []);

  // const registerForPushNotificationsAsync = async () => {
  //   if (Device.isDevice) {
  //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }
  // };



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

  const [unread, setUnread] = useState(false);
  const { authtoken, setAuthtoken } = useContext(UserContext);
  const [getnotify, setGetnotify] = useState(true);

  let screenHight = Dimensions.get('window').height;

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
  const prevRoute = routes[routes?.length - 2];

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

  // useEffect(() => {

  //   ProductInfo();
  //   DoctorInfo();
  //   // console.log(getDoctordata)
  //   // NotificationCheck()
  //   // FlatInfo()
  //   if (isLoading123 == false) {
  //     Getdata();
  //   }

  //   if (route.params.donorflag) {
  //     navigation.navigate("BloodDonation", {});
  //   }

  //   if (route.params.cancelflag) {
  //     navigation.navigate("BloodRequestCheck", {});
  //   }

  //   if (route.params.ambulance) {
  //     navigation.navigate("Services", { checkorderstatus: true });
  //   }
  //   if (route.params.newrequest) {
  //     navigation.navigate("AmbulanceRequest", {
  //       namep: namep, phonep: phonep, emailp: emailp, areap: areap, postcodep: postcodep, streetNop: streetNop, nicknamep: nicknamep,
  //       bloodgroupp: bloodgroupp, genderp: genderp, agep: agep, heightp: heightp, weightp: weightp, bloodpressurep: bloodpressurep,
  //       altphonenumberp: altphonenumberp, emgphonenumberp: emgphonenumberp, dateofbathp: dateofbathp, occupationp: occupationp,
  //       allergiesp: allergiesp, injuriesp: injuriesp, surgeriesp: surgeriesp, diabetesp: diabetesp, smokingp: smokingp, alcoholp: alcoholp, walkingp: walkingp, junkp: junkp, gymp: gymp, nofi: false
  //     });
  //   }


  //   if (route.params.bypassDoctor) {
  //     navigation.navigate("OnlineDoctor", {
  //       getDoctordata: getDoctordata == null ? [] : getDoctordata,
  //       namep: namep, phonep: phonep, emailp: emailp, areap: areap, postcodep: postcodep, streetNop: streetNop, nicknamep: nicknamep,
  //       bloodgroupp: bloodgroupp, genderp: genderp, agep: agep, heightp: heightp, weightp: weightp, bloodpressurep: bloodpressurep,
  //       altphonenumberp: altphonenumberp, emgphonenumberp: emgphonenumberp, dateofbathp: dateofbathp, occupationp: occupationp,
  //       allergiesp: allergiesp, injuriesp: injuriesp, surgeriesp: surgeriesp, diabetesp: diabetesp, smokingp: smokingp, alcoholp: alcoholp, walkingp: walkingp, junkp: junkp, gymp: gymp

  //     });
  //   }



  // });

  const AllVideoData = [
    { name: "Energizing Smoothie", youtubeLink: "https://www.youtube.com/watch?v=Y3zsz0-S1Jk" },
    { name: "Quick Quinoa Salads", youtubeLink: "https://www.youtube.com/watch?v=3CVDrAkhDmI" },
    { name: "Energizing Smoothie", youtubeLink: "https://www.youtube.com/watch?v=Xo_JASL40NU" },
    { name: "Energizing Smoothie", youtubeLink: "https://www.youtube.com/watch?v=Y3zsz0-S1Jk" },
    { name: "Quick Quinoa Salads", youtubeLink: "https://www.youtube.com/watch?v=3CVDrAkhDmI" },
    { name: "Energizing Smoothie", youtubeLink: "https://www.youtube.com/watch?v=Xo_JASL40NU" },
  ];

  const [selectedVideo, setSelectedVideo] = useState(null);

  const openModal = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const convertToEmbedUrl = (url) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };


  const [modalVisible, setModalVisible] = useState(false);
  const [dailyGoal, setDailyGoal] = useState("3000");
  const [glassSize, setGlassSize] = useState("Small");

  // date 
  const [date, setDate] = useState(new Date());
  const [dateTwo, setDateTwo] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerTwo, setShowPickerTwo] = useState(false);
  const [mode, setMode] = useState('date');
  const [modeTwo, setModeTwo] = useState('date');



  // Function to calculate total hours and generate water intake log
  // const [date, setDate] = useState(new Date(2024, 0, 1, 9, 0));
  // const [dateTwo, setDateTwo] = useState(new Date(2024, 0, 1, 22, 0));
  // const [glassSize, setGlassSize] = useState(500);
  const [waterIntakeLog, setWaterIntakeLog] = useState([]);

  // console.log("waterIntakeLog", waterIntakeLog);


  const calculateWaterIntake = async () => {
    // Validate inputs
    if (!dailyGoal || dailyGoal <= 0) {
      alert("Please enter a valid water goal in ml.");
      return;
    }

    const wakeUpMinutes = date.getHours() * 60 + date.getMinutes();
    const sleepMinutes = dateTwo.getHours() * 60 + dateTwo.getMinutes();

    let totalMinutes = sleepMinutes - wakeUpMinutes;
    if (totalMinutes <= 0) totalMinutes += 24 * 60; // Overnight case

    // Get selected glass size
    let glassSizeValue = 500;
    if (glassSize === "Small") glassSizeValue = 250;
    else if (glassSize === "Large") glassSizeValue = 1000;

    const totalGlasses = Math.ceil(dailyGoal / glassSizeValue);
    const intervalBetweenGlasses = Math.floor(totalMinutes / totalGlasses);

    const log = [];

    for (let i = 0; i < totalGlasses; i++) {
      const minutesFromWake = i * intervalBetweenGlasses;
      const glassTime = new Date(date.getTime() + minutesFromWake * 60 * 1000);

      const formattedTime = glassTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      log.push({
        id: i + 1,
        glassSize: glassSizeValue,
        time: formattedTime,
      });
    }



    setWaterIntakeLog(log); // Now log is ready
    await AsyncStorage.setItem("water_intake_log", JSON.stringify(log));

    await scheduleWaterReminders(log); // ⏰ schedule notifications


    // console.log("Water intake log saved:", log);
  };

  // Load data from AsyncStorage


  // Notification permission setup – call in top-level useEffect
  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert("Please enable notifications to receive water reminders.");
    }
  };

  // Load Water Intake Log from AsyncStorage
  // const loadWaterIntakeLog = async () => {
  //   try {
  //     const storedLog = await AsyncStorage.getItem("water_intake_log");
  //     if (storedLog) {
  //       setWaterIntakeLog(JSON.parse(storedLog));
  //     }
  //   } catch (e) {
  //     console.error("Failed to load water intake log", e);
  //   }
  // };

  const loadWaterIntakeLog = async (setWaterIntakeLog) => {
    try {
      const savedLog = await AsyncStorage.getItem("water_intake_log");
      if (savedLog !== null) {
        setWaterIntakeLog(JSON.parse(savedLog));
      }
    } catch (e) {
      console.error("Error loading water intake log", e);
    }
  };

  // Fetch Water Intake Log on Component Mount
  // useEffect(() => {
  //   loadWaterIntakeLog();
  // }, []);

  useEffect(() => {
    requestNotificationPermission();
    loadWaterIntakeLog(setWaterIntakeLog);
  }, []);

  const handleCalculatePress = () => {
    calculateWaterIntake(date, dateTwo, glassSize, setWaterIntakeLog);
  };

  const loadPreferences = async () => {
    try {
      const storedPreferences = await AsyncStorage.getItem("water_preferences");
      if (storedPreferences) {
        const { dailyGoal, wakeUpTime, sleepTime, glassSize } = JSON.parse(storedPreferences);
        setDailyGoal(dailyGoal || "");
        setDate(wakeUpTime ? new Date(wakeUpTime) : new Date());
        setDateTwo(sleepTime ? new Date(sleepTime) : new Date());
        setGlassSize(glassSize || "");
      }
    } catch (e) {
      console.error("Failed to load preferences", e);
    }
  };

  useEffect(() => {
    loadPreferences();
  }, []);

  // water intake calculatin 
  const [selectedGlasses, setSelectedGlasses] = useState([]);
  const [totalConsumed, setTotalConsumed] = useState(0);

  // Load selected glasses from AsyncStorage
  useEffect(() => {
    const loadSelectedGlasses = async () => {
      try {
        const savedGlasses = await AsyncStorage.getItem("selectedGlasses");
        const parsedGlasses = savedGlasses ? JSON.parse(savedGlasses) : [];
        setSelectedGlasses(parsedGlasses);

        // Calculate the total consumed water
        const total = parsedGlasses.reduce((sum, glass) => sum + glass.glassSize, 0);
        setTotalConsumed(total);
      } catch (error) {
        console.error("Failed to load glasses from storage", error);
      }
    };

    loadSelectedGlasses();
  }, []);

  // Handle glass selection
  const handleGlassSelect = async (glass) => {
    let updatedSelection;
    if (selectedGlasses.some((g) => g.id === glass.id)) {
      // If the glass is already selected, remove it
      updatedSelection = selectedGlasses.filter((g) => g.id !== glass.id);
    } else {
      // Add the selected glass
      updatedSelection = [...selectedGlasses, glass];
    }

    setSelectedGlasses(updatedSelection);

    // Save to AsyncStorage
    try {
      await AsyncStorage.setItem("selectedGlasses", JSON.stringify(updatedSelection));
    } catch (error) {
      console.error("Failed to save glasses to storage", error);
    }

    // Update total consumed
    const total = updatedSelection.reduce((sum, g) => sum + g.glassSize, 0);
    setTotalConsumed(total);
  };

  const handleSavePreferences = async () => {
    const preferences = {
      dailyGoal,
      wakeUpTime: date,
      sleepTime: dateTwo,
      glassSize,
    };

    try {
      await AsyncStorage.removeItem("selectedGlasses");
      await AsyncStorage.removeItem("water_intake_log");
      await AsyncStorage.removeItem("water_preferences");

      setSelectedGlasses([]);
      setTotalConsumed(0);
      setWaterIntakeLog([]);

      await AsyncStorage.setItem("water_preferences", JSON.stringify(preferences));
      console.log("Preferences saved:", preferences);
    } catch (e) {
      console.error("Failed to save preferences", e);
    }

    calculateWaterIntake();
    // calculateWaterIntake(date, dateTwo, glassSize, setWaterIntakeLog);

    setModalVisible(false); // Close the modal
  };

  const handleRestart = async () => {

    try {
      await AsyncStorage.removeItem("selectedGlasses");
      await AsyncStorage.removeItem("water_intake_log");
      await AsyncStorage.removeItem("water_preferences");

      setSelectedGlasses([]);
      setTotalConsumed(0);
      setWaterIntakeLog([]);

      // remove notification 
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log("ReStart");
    } catch (e) {
      console.error("Failed to ReStart", e);
    }

  };


  // date 

  const formatDateTime = (date) => {
    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' }; // Format: 27 June 2024
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true }; // Format: 10:10 AM
    const formattedDate = date.toLocaleDateString('en-GB', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-GB', timeOptions);
    return `${formattedTime}`;
    // ${formattedDate}, 
  };

  const onChange = (event, selectedDate) => {
    setShowPicker(false); // Hide picker after selection
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onChangeTwo = (event, selectedDate) => {
    setShowPickerTwo(false); // Hide picker after selection
    if (selectedDate) {
      setDateTwo(selectedDate);
    }
  };

  const showDatePicker = () => {
    setMode('date');
    setShowPicker(true);
  };

  const showDatePickerTwo = () => {
    setModeTwo('date');
    setShowPickerTwo(true);
  };

  const showTimePicker = () => {
    setMode('time');
    setShowPicker(true);
  };

  const showTimePickerTwo = () => {
    setModeTwo('time');
    setShowPickerTwo(true);
  };

  const [mealTime, setMealTime] = useState("Before Meal");

  const handleSelection = (time) => {
    setMealTime(time);
  };

  // local notification 
  const scheduleWaterReminders = async (waterIntakeLog) => {
    console.log("waterIntakeLog", waterIntakeLog);

    // 1. Cancel all previous notifications ONCE before the loop
    await Notifications.cancelAllScheduledNotificationsAsync();

    for (const glass of waterIntakeLog) {
      const [time, modifier] = glass.time.split(/(am|pm)/i);
      const [hourStr, minuteStr] = time.trim().split(":");
      let hours = parseInt(hourStr);
      const minutes = parseInt(minuteStr);

      if (modifier.toLowerCase() === "pm" && hours !== 12) hours += 12;
      if (modifier.toLowerCase() === "am" && hours === 12) hours = 0;

      const scheduledTime = new Date();
      scheduledTime.setHours(hours);
      scheduledTime.setMinutes(minutes);
      scheduledTime.setSeconds(0);

      const now = new Date();
      if (scheduledTime > now) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "💧 Time to drink water!",
            body: `Drink ${glass.glassSize}ml now to stay hydrated.`,
          },
          trigger: scheduledTime, // ✅ Use this instead of `{ hour, minute }`
        });
      }
    }
  };

  // const scheduleWaterReminders = async (waterIntakeLog) => {

  //   console.log("waterIntakeLogwaterIntakeLogwaterIntakeLog", waterIntakeLog);

  //   for (const glass of waterIntakeLog) {
  //     const date = new Date();

  //     const [time, modifier] = glass.time.split(/(am|pm)/i);
  //     const [hourStr, minuteStr] = time.trim().split(":");
  //     let hours = parseInt(hourStr);
  //     const minutes = parseInt(minuteStr);

  //     if (modifier.toLowerCase() === "pm" && hours !== 12) {
  //       hours += 12;
  //     }
  //     if (modifier.toLowerCase() === "am" && hours === 12) {
  //       hours = 0;
  //     }

  //     const scheduledTime = new Date();
  //     scheduledTime.setHours(hours);
  //     scheduledTime.setMinutes(minutes);
  //     scheduledTime.setSeconds(0);

  //     const now = new Date();
  //     if (scheduledTime > now) {
  //       await Notifications.scheduleNotificationAsync({
  //         content: {
  //           title: "💧 Time to drink water!",
  //           body: `Drink ${glass.glassSize}ml now to stay hydrated.`,
  //         },
  //         trigger: {
  //           hour: hours,
  //           minute: minutes,
  //           repeats: false,
  //         },
  //       });
  //     }
  //   }
  // };


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

            <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Water Intake </Text>

          </View>



        </View>


        <View style={[styles.body1, { justifyContent: 'flex-start', alignItems: 'center' }]}>
          <ScrollView style={{ width: "100%" }}>


            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20, paddingHorizontal: 16 }}>

              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                {/* Existing Water Intake Section */}
                <View style={{ width: "100%" }}>
                  <ImageBackground source={require("../assets/fitback/WaterIntakeBg.png")} style={{
                    width: '100%', height: 160, borderRadius: 16,
                    overflow: 'hidden',
                  }}>
                    <View style={{ width: "100%", paddingHorizontal: 16 }}>
                      <Text style={{ fontSize: 20, fontFamily: "Poppins_500Medium", color: "#141A1E", marginTop: 6 }}>{totalConsumed}/{dailyGoal} ml</Text>
                      <Text style={{ fontSize: 14, fontFamily: "Poppins_400Regular", color: "#90A5B4" }}>Daily Goal</Text>

                      <TouchableOpacity
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: 20,
                          alignItems: "center",
                          paddingVertical: 5,
                          marginTop: 40,
                          width: 150,
                          shadowColor: '#000',
                          shadowOffset: { width: 3, height: 3 },
                          shadowOpacity: 5,
                          shadowRadius: 5,
                          elevation: 2,
                        }}
                        onPress={() => setModalVisible(true)}
                      >
                        <Text style={{ fontSize: 10, fontFamily: "Poppins_400Regular", color: "#000000" }}>Customize Preferences</Text>
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </View>
              </View>

              <View style={{ width: "100%", marginTop: 20 }}>

                <View style={{ width: "100%", marginBottom: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular", color: "#464646", }}>Water Intake Log</Text>

                  <TouchableOpacity
                    style={{
                    }}
                    onPress={handleRestart}
                  >
                    <Ionicons style={{ marginRight: 8 }} name="reload-circle-outline" size={26} color="#EE416C" />
                  </TouchableOpacity>

                </View>

                {/* <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                <View style={{ width: "23%", backgroundColor: "#E4ECFF", justifyContent: "center", alignItems: "center", paddingVertical: 6, borderRadius: 8, marginBottom: 8 }}>
                  <Image
                    style={{ width: 22, height: 35 }}
                    resizeMode='contain'
                    source={require('../assets/fitback/glass.png')}
                  />

                  <Text style={{ fontSize: 12, fontFamily: "Poppins_500Medium", color: "#000000", marginTop: 4 }}>500 ml</Text>
                  <Text style={{ fontSize: 8, fontFamily: "Poppins_400Regular", color: "#000000" }}>10:00 AM</Text>
                </View>

              </View> */}

                <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                  {waterIntakeLog?.map((glass) => (
                    <TouchableOpacity
                      onPress={() => handleGlassSelect(glass)}
                      key={glass.id}
                      style={[{
                        width: "23%",
                        backgroundColor: "#E4ECFF",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 4,
                        borderRadius: 8,
                        marginBottom: 8,
                        // height: 84

                      }, selectedGlasses.some((g) => g.id === glass.id) && styles.selectedGlass,]}
                    >

                      {/* Radio Button */}
                      <View style={{ width: "100%", alignItems: "flex-end" }}>
                        <View
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: "#EE426D",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 6,
                            marginBottom: -6
                          }}
                        >
                          {selectedGlasses.some((g) => g.id === glass.id) && (
                            <View
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: 6,
                                backgroundColor: "#EE426D",
                              }}
                            />
                          )}
                        </View>

                      </View>


                      <Image
                        style={{ width: 22, height: 35 }}
                        resizeMode="contain"
                        source={require('../assets/fitback/glass.png')}
                      />
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_500Medium", color: "#000000", marginTop: 4 }}>
                        {glass.glassSize} ml
                      </Text>
                      <Text style={{ fontSize: 8, fontFamily: "Poppins_400Regular", color: "#000000" }}>
                        {glass.time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>


              </View>

            </View>



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

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <View style={{
            backgroundColor: "#fff",
            width: "90%",
            borderRadius: 16,
            padding: 20,
            alignItems: "center",
          }}>

            <TouchableOpacity
              style={{
                position: "absolute",
                top: 10,
                right: 12,
                backgroundColor: "#f0f0f0",
                borderRadius: 12,
                width: 24,
                height: 24,
                paddingBottom: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ fontSize: 16, color: "#333" }}>✕</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 18, fontFamily: "Poppins_500Medium", marginBottom: 16, marginTop: 10 }}>Customize Preferences</Text>

            {/* Input Fields */}

            <Text style={{
              width: "100%",
              fontSize: 14,
              marginBottom: 6,
              fontFamily: "Poppins_500Medium",
              color: "#1D1E20"
            }}>Enter your hours of sleep</Text>

            <TextInput
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                paddingVertical: 6,
                paddingHorizontal: 10,
                fontFamily: "Poppins_400Regular",
                fontSize: 12,
                marginBottom: 16,
              }}
              placeholder="Set Daily Water Goal (ml)"
              keyboardType="numeric"
              value={dailyGoal}
              onChangeText={setDailyGoal}
            />

            <Text style={{
              width: "100%",
              fontSize: 14,
              marginBottom: 6,
              fontFamily: "Poppins_500Medium",
              color: "#1D1E20"
            }}>Set Wake-Up Time</Text>

            <View style={{
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              marginBottom: 16,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              paddingVertical: 8,
              paddingHorizontal: 10,
              alignItems: "center"
            }}>
              <Text style={{
                fontSize: 12,
                fontFamily: "Poppins_400Regular"

              }}>
                {formatDateTime(date)}
              </Text>
              <View style={{ flexDirection: "row" }}>
                {/* <FontAwesome5 style={{ marginRight: 10 }} name="calendar-alt" size={22} color="#8b8b8b" onPress={showDatePicker} /> */}
                <FontAwesome name="clock-o" size={24} color="silver" onPress={showTimePicker} />
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

            <Text style={{
              width: "100%",
              fontSize: 14,
              marginBottom: 6,
              fontFamily: "Poppins_500Medium",
              color: "#1D1E20"
            }}>Set Sleep Time</Text>

            <View style={{
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              marginBottom: 16,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              paddingVertical: 8,
              paddingHorizontal: 10,
              alignItems: "center"
            }}>
              <Text style={{
                fontSize: 12,
                fontFamily: "Poppins_400Regular"

              }}>
                {formatDateTime(dateTwo)}
              </Text>
              <View style={{ flexDirection: "row" }}>
                {/* <FontAwesome5 style={{ marginRight: 10 }} name="calendar-alt" size={22} color="#8b8b8b" onPress={showDatePicker} /> */}
                <FontAwesome name="clock-o" size={24} color="silver" onPress={showTimePickerTwo} />
              </View>
              {showPickerTwo && (
                <DateTimePicker
                  value={dateTwo}
                  mode={modeTwo}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onChangeTwo}
                />
              )}
            </View>

            {/* Static Glass Size Options */}
            <Text style={{
              width: "100%",
              fontSize: 14,
              marginBottom: 6,
              fontFamily: "Poppins_500Medium",
              color: "#1D1E20"
            }}>Enter Glass Size</Text>

            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: 24,
            }}>
              {["Small", "Medium", "Large"].map((size) => (
                <TouchableOpacity
                  key={size}
                  style={{
                    flex: 1,
                    marginHorizontal: 5,
                    // paddingVertical: 10,
                    // borderWidth: 1,
                    // borderColor: glassSize === size ? "#007BFF" : "#ccc",
                    borderRadius: 8,
                    backgroundColor: glassSize === size ? "#c3d3fa" : "#E4ECFF",
                    alignItems: "center",
                  }}
                  onPress={() => setGlassSize(size)}
                >
                  {/* Radio Button */}
                  <View style={{
                    width: "100%", alignItems: "flex-end",
                    marginBottom: -20,
                    paddingTop: 4
                  }}>
                    <View
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: "#EE426D",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 6,
                      }}
                    >
                      <View
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 6,
                          backgroundColor: glassSize === size ? "#EE426D" : "#E4ECFF",

                        }}
                      />
                    </View>

                  </View>

                  <View
                    style={{
                      width: "100%",
                      // backgroundColor: glassSize === size ? "#c3d3fa" : "#E4ECFF",
                      justifyContent: "flex-end", // Align everything to the bottom
                      alignItems: "center",
                      // paddingVertical: 8, 
                      borderRadius: 8,
                      marginBottom: 8,
                      height: 75,
                    }}
                  >

                    {/* Glass Image */}
                    <Image
                      style={{
                        width: size === "Small" ? 13 : size === "Medium" ? 16 : size === "Large" ? 21 : 11,
                        height: size === "Small" ? 19 : size === "Medium" ? 25 : size === "Large" ? 34 : 15,
                        marginBottom: 4, // Add margin to ensure space between image and text
                      }}
                      resizeMode="contain"
                      source={require("../assets/fitback/glass.png")}
                    />

                    {/* Size Text */}
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Poppins_400Regular",
                        color: glassSize === size ? "#000" : "#000",
                      }}
                    >
                      {size}
                    </Text>

                    {/* Volume Text */}
                    <Text
                      style={{
                        fontSize: 8,
                        fontFamily: "Poppins_400Regular",
                        color: glassSize === size ? "#000" : "#000",
                      }}
                    >
                      {size === "Small" ? "250 ml" : size === "Medium" ? "500 ml" : size === "Large" ? "1000 ml" : ""}
                    </Text>
                  </View>


                </TouchableOpacity>
              ))}
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={{
                backgroundColor: "#EE416C",
                paddingVertical: 6,
                borderRadius: 20,
                width: "100%",
                // height: 33,
                alignItems: "center",
              }}
              onPress={handleSavePreferences}

            >
              <Text style={{
                fontFamily: "Poppins_500Medium",
                color: "#fff",
                fontSize: 14,
              }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  thumbnail: {
    width: '100%',
    height: 120,
    borderRadius: 6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: width * 0.9,
    height: height * 0.6,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  selectedGlass: {
    backgroundColor: "#c3d3fa",
  }
});

export default WaterIntakePage;