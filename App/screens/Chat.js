import React, { useState, useEffect, useContext } from 'react';
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
} from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';
import { UserContext } from '../../components/CredintailsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";

function Chat({ navigation, route }) {
  // Accessing user context
  const { testCredentials, setTestCredentials } = useContext(UserContext);
  const { authtoken } = useContext(UserContext);

  // State Variables
  const [lan, setLan] = useState(true); // Language toggle
  const [userDetails, setUserDetails] = useState('');
  const [userId, setUserId] = useState(testCredentials?.userid);



  console.log("ussssssssssser id", userId);

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

  // Header with navigation buttons
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
  // Navigate to User Chat if data is available
  if (allUserData) {
    // console.log('userData', allUserData);
    navigation.navigate('UserChat', {
      userName: allUserData?.name,
      user_FUId: allUserData?.user_FUId,
      image: allUserData?.image,
    });
  }

  // Render the Chat Screen
  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <View style={styles.MainContainer}>
        <StatusBar animated={true} backgroundColor="#303030" />
        <View style={[styles.navbar, { flexDirection: 'row' }]}>
          {/* Back Button */}
          <Pressable activeOpacity={4} style={{ width: '5%', height: 25, left: 15, top: 17 }}>
            <Image
              style={{ width: 17, height: 17, left: 0, top: 3 }}
              resizeMode="contain"
              source={require('../assets/back.jpg')}
            />
          </Pressable>

          {/* Title */}
          <View style={{ width: '50%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10 }}>
            <Text
              style={{
                top: 17,
                color: colors.black,
                fontSize: 14,
                display: lan ? 'flex' : 'none',
                letterSpacing: 0.9,
                fontFamily: 'Poppins_400Regular',
              }}
            >
              Chat
            </Text>
          </View>
        </View>

        {/* Scrollable Body */}
        <View style={[styles.body1, { justifyContent: 'flex-start', alignItems: 'center' }]}>
          <ScrollView></ScrollView>
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
});

export default Chat;
