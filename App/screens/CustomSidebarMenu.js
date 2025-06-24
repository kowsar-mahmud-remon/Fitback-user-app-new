// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Share,
  Pressable,
  Switch,
  Alert
} from 'react-native';

import colors from '../config/colors';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";
import FontAwesome from '@expo/vector-icons/FontAwesome';

//asyn-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
//credential context
import { CredentialsContext } from '../../components/CredintailsContext';
import { UserContext } from '../../components/CredintailsContext';
import Fontisto from '@expo/vector-icons/Fontisto';

// const CustomSidebarMenu = ({navigate,props,route}) => {

function CustomSidebarMenu({ navigation, props, route }) {
  const [unread, setUnread] = useState(false);

  const [getnotify, setGetnotify] = useState(true);
  const { authtoken, setAuthtoken } = useContext(UserContext);

  const NotificationCheck = async () => {
    try {
      if (getnotify) {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
        };

        await fetch('https://qwikit1.pythonanywhere.com/notification', requestOptions)
          .then((response) => response.json())
          .then((json) => {

            // setGetProductdata(json.reverse())
            json.map((item, index) => {
              if ((item.userid == userid || item.userid == '0') && item.readstatus == false) {
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

      // unread ?  persistUser({userid: testCredentials.userid,notify:true,lan:testCredentials.lan,raddress: testCredentials.raddress,cartbuy: testCredentials.cartbuy,cartrent:testCredentials.cartrent,productsave: testCredentials.productsave,flatsave: testCredentials.flatsave}) : persistUser({userid: testCredentials.userid,notify:false,lan:testCredentials.lan,raddress: testCredentials.raddress,cartbuy: testCredentials.cartbuy,cartrent:testCredentials.cartrent,productsave: testCredentials.productsave,flatsave: testCredentials.flatsave})


    }

    setGetnotify(false);

  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'https://play.google.com/store/apps/details?id=com.qitca.qwikmedic',

      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };



  //const [x,setX] = useState(null);
  let x = "";



  //context
  const { storeCredentials, setStoreCredentials } = useContext(CredentialsContext);
  const { testCredentials, setTestCredentials } = useContext(UserContext);

  const [notify, setNotify] = useState(testCredentials.notify);
  const [cartbuy, setCartbuy] = useState(testCredentials.cartbuy);
  const [cartrent, setCartrent] = useState(testCredentials.cartrent);
  const [productsave, setProductsave] = useState(testCredentials.productsave);
  const [flatsave, setflatsave] = useState(testCredentials.flatsave);
  const [lan, setLan] = useState(testCredentials.lan);

  // const {userid, lan} = storeCredentials

  const [isLoading, setLoading] = useState(true);
  const [nointernet, setNointernet] = useState(false);
  const [isLoading1, setLoading1] = useState(false);

  const [nodata, setNodata] = useState(true);

  const [duerentstatus, setDuerentstatus] = useState(false);
  const [dueorderstatus, setDueorderstatus] = useState(false);
  const [incompleteprofilestatus, setInompleteprofilestatus] = useState(false);




  const [userid, setUserid] = useState(testCredentials.userid);
  const [notallow, setNotallow] = useState(userid == 0 ? true : false);

  const [Name, setName] = useState(null);
  const [phone, setphone] = useState(null);
  const [userimage, setUserimage] = useState("");


  const [clusternamep, setClusternamep] = useState(null);
  const [namep, setNamep] = useState(null);
  const [imagep, setImagep] = useState(null);

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

  const [myreferralcode, setMyreferralcode] = useState(null);
  const [qmoney, setQmoney] = useState(null);
  const [qcoins, setQcoins] = useState(null);



  const [userAllData, setUserAllData] = useState();

  // console.log(userAllData?.image);


  const persistUser = (credentials) => {

    AsyncStorage.setItem('checkuserid', JSON.stringify(credentials))
      .then(() => {
        // handleMessage(message)
        setTestCredentials(credentials);

      })
      .catch((error) => {
        // console.log(error)
        handleMessage('persisting login failed');
      });
  };


  const persistLogout = () => {

    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Calculation canceled"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => confirmLogout() // Call another function to handle the actual calculation
        }
      ]
    );


    const confirmLogout = () => {
      AsyncStorage.removeItem('qwikmedicLogin')
        .then(() => {

          setStoreCredentials("");
          // console.log("hit inside")

          persistUser({ userid: 0, notify: false, lan: true, raddress: "", cartbuy: [], productsave: [], cartrent: [], flatsave: [] });

        })
        .catch((error) => {
          // console.log(error)
        });
    };

  };

  const [getUser, setgetUser] = useState(true);

  const UserInfo = () => {

    if (getUser) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
      };

      fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
        .then((response) => response.json())
        .then((json) => {
          setUserAllData(json);
          setNointernet(false);
          setPhonep(json.phonenumber),
            setImagep(json.image),
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

          setMyreferralcode(json.myreferralcode);
          setQcoins(json.qcoins);
          setQmoney(json.qmoney);


        })
        .catch((error) => {
          console.error(error);
          setNointernet(true);
          setLoading1(false);

        });

      setgetUser(false);
    }
  };

  //    const pressEnglish = () => {
  //     English ?  setEnglish(true) : setEnglish(true) &  setBangla(false)
  //     // console.log(English)
  //     // setLan(true)
  //     console.log('presse english',lan)
  //     // persistLogin({userid:userid,lan:true})
  //     setLan(true)
  //     persistUser({userid:userid,notify:testCredentials.natify,lan:true,cartbuy: testCredentials.cartbuy,cartrent:testCredentials.cartrent,productsave: testCredentials.productsave,flatsave: testCredentials.flatsave})



  // }
  // const pressBangla = () => {
  //     Bangla ?  setBangla(true) : setEnglish(false) &  setBangla(true)
  //     // console.log(Bangla)
  //     // setLan(false)
  //     console.log('presse bangla',lan)
  //     // persistLogin({userid:userid,lan:false})
  //     setLan(false)
  //     persistUser({userid:userid,notify:testCredentials.natify,lan:false,cartbuy: testCredentials.cartbuy,cartrent:testCredentials.cartrent,productsave: testCredentials.productsave,flatsave: testCredentials.flatsave})

  // }



  const [language, setLanguage] = useState(testCredentials.lan);

  const [languageold, setLanguageold] = useState(testCredentials.lan);

  const toggleSwitch = () => {

    setLanguage(previousState => !previousState);

    persistUser({ userid: userid, notify: testCredentials.natify, lan: language ? false : true, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });

    // console.log("language : ",testCredentials.lan)
  };


  useEffect(() => {

    UserInfo();
    // NotificationCheck()
    // console.log(namep)

    // if(language != languageold)
    // {

    //   persistUser({userid:userid,notify:testCredentials.natify,lan:false,cartbuy: testCredentials.cartbuy,cartrent:testCredentials.cartrent,productsave: testCredentials.productsave,flatsave: testCredentials.flatsave})

    // }


  });

  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}
      {/* <Image
        source={{ uri: BASE_PATH + proileImage }}
        style={styles.sideMenuProfileIcon}
      /> */}
      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        {/* <DrawerItem
          label="Visit Us"
          style={{marginTop:0}}
          onPress={() => Linking.openURL('https://aboutreact.com/')}
        /> */}
        {/* 
        <DrawerItem
          label="Prescribtions"
          style={{marginTop:0}}
          onPress={() => navigation.navigate("Prescribtions",{})}
        /> */}

        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 20 }}>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Pressable style={{ width: 22, height: 22 }} onPress={() => navigation.toggleDrawer()} >
              <Image
                style={{ width: 22, height: 22, left: 15, bottom: 5 }}
                resizeMode='contain'
                source={require('../assets/more.jpg')}
              // source={{uri: "http://drive.google.com/uc?export=view&id=1ZD4WKkvRKKn4YNHTIsWAFkqoA1eYDg13"}}
              // onPress={()=> navigation.navigate("SideBar",{})}

              />
            </Pressable>

            {/* <Svg xmlns="http://www.w3.org/2000/svg" style={{ right: 16, display: testCredentials.notify == undefined ? 'flex' : testCredentials.notify == true ? 'none' : 'flex' }} onPress={() => navigation.navigate("Notification", {})} width="22" height="22" viewBox="0 0 58.44 70">
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


            <Svg xmlns="http://www.w3.org/2000/svg" style={{ right: 16, display: testCredentials.notify == undefined ? 'none' : testCredentials.notify == true ? 'flex' : 'none' }} onPress={() => navigation.navigate("Notification", {})} width="22" height="22" viewBox="0 0 58.44 70">
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
                <Circle id="Ellipse_5" data-name="Ellipse 5" cx="12" cy="12" r="12" transform="translate(1221 95)" fill="#db3636" />
              </G>
            </Svg>

          </View>
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Pressable onPress={() => navigation.navigate("UserProfile", {
              flag1: false,
              namep: namep, phonep: phonep, emailp: emailp, areap: areap, postcodep: postcodep, streetNop: streetNop, nicknamep: nicknamep, imagep: imagep,
              bloodgroupp: bloodgroupp, genderp: genderp, agep: agep, heightp: heightp, weightp: weightp, bloodpressurep: bloodpressurep,
              altphonenumberp: altphonenumberp, emgphonenumberp: emgphonenumberp, dateofbathp: dateofbathp, occupationp: occupationp,
              allergiesp: allergiesp, injuriesp: injuriesp, surgeriesp: surgeriesp, diabetesp: diabetesp, smokingp: smokingp, alcoholp: alcoholp, walkingp: walkingp, junkp: junkp, gymp: gymp
            })}>
              <Image
                // source={{ uri: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg" }}source={require("../assets/emptyimgprofile.jpg")}
                // source={{ uri: imagep != null ? imagep : "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png" }}
                source={
                  userAllData?.image
                    ? { uri: userAllData?.image }
                    : require('../assets/fitback/profileIcon.png')
                }
                style={styles.sideMenuProfileIcon}
              />
            </Pressable>
            <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, marginTop: 10 }}>{namep}</Text>
            <Text style={{ color: colors.text, fontFamily: 'Poppins_400Regular', letterSpacing: .9, marginTop: 4, fontSize: 12, color: "#6C7072" }}>{userAllData?.usertype ? userAllData?.usertype + " User" : "Normal User"}</Text>
          </View>



          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 25, borderRadius: 6, marginBottom: 20, borderWidth: 1, borderStyle: 'dashed', borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderColor: "#E2E4E5" }}>




            {/* <View style={{width:'85%',justifyContent:'space-evenly',alignItems:'center',flexDirection:'row',borderBottomColor:colors.ash1,height:55}} onPress={() => navigation.navigate("Settings",{oldno:phonep})}>
              <View style={{width:'50%',justifyContent:'flex-start',alignItems:'flex-end',flexDirection:'row',left:0}}>
                <Image
                  style={{ width: 22, height: 22,bottom:5}}
                  resizeMode='contain'
                  source={require('../assets/translatoricon.jpg')}
                />
                <Text style={{left:20,fontSize:12,color: colors.text,letterSpacing:.5,fontFamily: 'Poppins_400Regular',bottom:3,display:testCredentials.lan ? 'flex' : 'none'}}>Language</Text>
                <Text style={{left:20,fontSize:12,color: colors.text,letterSpacing:.5,fontFamily: 'Poppins_400Regular',bottom:3,display:testCredentials.lan ? 'none' : 'flex'}}>ভাষা</Text>
              
              </View>

              <View style={{width:'50%',justifyContent:'flex-end',alignItems:'center',bottom:2,left:10}}>

                <View style={{width:'100%',justifyContent:'flex-end',alignItems:'center',flexDirection:'row'}}>
                  <Text style={{fontSize:12,color: colors.ash,letterSpacing:.9,fontFamily: 'Poppins_400Regular',right:3}}>বাংলা</Text>

                  <Switch

                    trackColor={{ false: "#767577", true: "#00E8AA" }}
                    thumbColor={language ? "#065540" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={language}
                    style={{right:4,bottom:2}}

                  />
                  <Text style={{fontSize:12,bottom:1,color: colors.ash,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>eng</Text>

                </View>
              </View>
             
            </View> */}




            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55, marginTop: 10 }} onPress={() => navigation.navigate("UserProfile", { oldno: phonep })}>
              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image
                  style={{
                    width: "48%",
                    height: "48%",
                  }}
                  resizeMode='contain'
                  source={require('../assets/fitback/profileIcon.png')}

                />
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>সেটিংস</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>Profile</Text>

              </View>
            </Pressable>
            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => navigation.navigate("Settings", { oldno: phonep })}>
              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'flex-end' }}>

                <Svg xmlns="http://www.w3.org/2000/svg" style={{ right: 16, bottom: 5 }} width="22" height="22" viewBox="0 0 75.18 70">
                  <Defs>
                    <ClipPath id="clip-path">
                      <Rect id="Rectangle_239" data-name="Rectangle 239" width="75.18" height="70" fill="none" />
                    </ClipPath>
                  </Defs>
                  <G id="Group_1616" data-name="Group 1616" transform="translate(0 0)">
                    <G id="Group_1615" data-name="Group 1615" transform="translate(0 0)" clip-path="url(#clip-path)">
                      <Path id="Path_1896" data-name="Path 1896" d="M74.876,30.3a5.894,5.894,0,0,0-2.812-4.321,5.805,5.805,0,0,0-5.088-.455,3.329,3.329,0,0,1-4.149-1.844,27.553,27.553,0,0,0-2.783-4.829,3.28,3.28,0,0,1,.474-4.5,5.762,5.762,0,0,0,2.122-4.6,5.886,5.886,0,0,0-2.356-4.6,37.493,37.493,0,0,0-8.1-4.668,5.938,5.938,0,0,0-5.195.265,5.767,5.767,0,0,0-2.921,4.123,3.273,3.273,0,0,1-3.7,2.657,27.212,27.212,0,0,0-5.544,0,3.3,3.3,0,0,1-3.7-2.658A5.77,5.77,0,0,0,28.2.739,5.939,5.939,0,0,0,23,.474a37.485,37.485,0,0,0-8.1,4.668,5.891,5.891,0,0,0-2.356,4.6,5.778,5.778,0,0,0,2.125,4.606,3.275,3.275,0,0,1,.469,4.5,27.616,27.616,0,0,0-2.782,4.828A3.333,3.333,0,0,1,8.17,25.51a5.792,5.792,0,0,0-5.052.468A5.893,5.893,0,0,0,.3,30.3a36.6,36.6,0,0,0,0,9.4,5.871,5.871,0,0,0,7.9,4.775,3.324,3.324,0,0,1,4.148,1.845,27.511,27.511,0,0,0,2.782,4.825,3.282,3.282,0,0,1-.47,4.506,5.765,5.765,0,0,0-2.124,4.6A5.9,5.9,0,0,0,14.9,64.86,37.624,37.624,0,0,0,23,69.523a5.947,5.947,0,0,0,5.2-.263,5.774,5.774,0,0,0,2.922-4.127,3.292,3.292,0,0,1,3.7-2.656,26.729,26.729,0,0,0,5.544,0,3.317,3.317,0,0,1,3.7,2.656,5.767,5.767,0,0,0,2.921,4.127,5.923,5.923,0,0,0,2.86.739,6.022,6.022,0,0,0,2.334-.476,37.554,37.554,0,0,0,8.1-4.665,5.89,5.89,0,0,0,2.356-4.606,5.767,5.767,0,0,0-2.124-4.6,3.284,3.284,0,0,1-.471-4.506,27.439,27.439,0,0,0,2.783-4.825,3.326,3.326,0,0,1,4.149-1.845l.035.013a5.815,5.815,0,0,0,5.053-.465A5.9,5.9,0,0,0,74.876,39.7a36.468,36.468,0,0,0,0-9.4M37.59,49.257A14.258,14.258,0,1,1,51.848,35,14.274,14.274,0,0,1,37.59,49.257" transform="translate(0 0)" fill="#248ed0" />
                    </G>
                  </G>
                </Svg>

              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>সেটিংস</Text>
                <Text style={{ fontSize: 12, bottom: 5, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>Settings</Text>

              </View>
            </Pressable>


            {/* 4 */}
            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => navigation.navigate("Favourites", {})}>
              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'flex-end' }}>

                <Svg xmlns="http://www.w3.org/2000/svg" style={{ right: 16, bottom: 5 }} width="22" height="22" viewBox="0 0 44.341 38.998">
                  <Path id="Icon" d="M39.445,3.306a11.221,11.221,0,0,0-15.908,0L21.37,5.481,19.2,3.306A11.267,11.267,0,0,0,3.295,19.265l2.167,2.174L21.37,37.4,37.278,21.439l2.167-2.174a11.307,11.307,0,0,0,0-15.959Z" transform="translate(0.8 0.8)" fill="#e90101" stroke="#e90101" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.6" />
                </Svg>

              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', bottom: 5, display: testCredentials.lan ? 'flex' : 'none' }}>Favourite</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>ফেভারিট</Text>
              </View>
            </Pressable>

            {/* ////// */}
            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => navigation.navigate("FoodWiseCalories", { oldno: phonep })}>
              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image
                  style={{
                    width: "55%",
                    height: "55%",
                  }}
                  resizeMode='contain'
                  source={require('../assets/fitback/caloriesImg.png')}

                />
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>Food Wise Calories</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>শর্তাবলী</Text>
              </View>
            </Pressable>

            {/* 3 */}
            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => navigation.navigate("OrdermedicineHome", {})}>
              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'center' }}>
                {/* <Text>Oneeeeeeee</Text> */}

                <Image
                  style={{
                    width: "52%",
                    height: "52%",
                  }}
                  resizeMode='contain'
                  source={require('../assets/fitback/orderHistory.png')}

                />

              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>Order History</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>অর্ডারস</Text>
              </View>
            </Pressable>

            {/* 3 */}
            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => navigation.navigate("OrdermedicineHome", {})}>

              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image
                  style={{
                    width: "60%",
                    height: "60%",
                  }}
                  resizeMode='contain'
                  source={require('../assets/fitback/orderTrackingIcon.png')}

                />
              </View>

              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>Order Tracking</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>অর্ডারস</Text>
              </View>
            </Pressable>

            {/* 3 */}
            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => navigation.navigate("MyReport", {})}>

              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'center' }}>
                {/* <Image
                  style={{
                    width: "52%",
                    height: "52%",
                  }}
                  resizeMode='contain'
                  source={require('../assets/fitback/myFeedbackIcon.png')}
                /> */}
                <Fontisto name="prescription" size={22} color="#EE411C" />
              </View>

              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>My Report</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>অর্ডারস</Text>
              </View>
            </Pressable>

            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => navigation.navigate("AddReview", {})}>

              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'center' }}>
                {/* <Image
                  style={{
                    width: "52%",
                    height: "52%",
                  }}
                  resizeMode='contain'
                  source={require('../assets/fitback/myFeedbackIcon.png')}
                /> */}
                <Fontisto name="prescription" size={22} color="#EE411C" />
              </View>

              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>Add Review</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>অর্ডারস</Text>
              </View>
            </Pressable>

            {/* 3 */}
            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => navigation.navigate("OrdermedicineHome", {})}>

              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image
                  style={{
                    width: "52%",
                    height: "52%",
                  }}
                  resizeMode='contain'
                  source={require('../assets/fitback/myFeedbackIcon.png')}

                />
              </View>

              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>My Fitback Package</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>অর্ডারস</Text>
              </View>
            </Pressable>

            {/* 3 */}
            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => navigation.navigate("OrdermedicineHome", {})}>
              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image
                  style={{
                    width: "52%",
                    height: "52%",
                  }}
                  resizeMode='contain'
                  source={require('../assets/fitback/resetIcon.png')}

                />
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>My Reset Package</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>অর্ডারস</Text>
              </View>
            </Pressable>

            {/* 3 */}
            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => navigation.navigate("CustomerReview", {})}>
              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image
                  style={{
                    width: "48%",
                    height: "48%",
                  }}
                  resizeMode='contain'
                  source={require('../assets/fitback/feedbackIcon.png')}

                />
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>Client Feedback</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>অর্ডারস</Text>
              </View>
            </Pressable>

            {/* 7 */}
            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => onShare()}>
              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image
                  style={{
                    width: "55%",
                    height: "55%",
                  }}
                  resizeMode='contain'
                  source={require('../assets/fitback/shareIcon.png')}

                />
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>Share App</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>শেয়ার করুন</Text>
              </View>
            </Pressable>

            {/* 6 */}
            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => navigation.navigate("MyQcoins", { myreferralcode: myreferralcode, qcoins: qcoins, qmoney: qmoney })}>
              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image
                  style={{
                    width: "55%",
                    height: "55%",
                  }}
                  resizeMode='contain'
                  source={require('../assets/fitback/fitCoinIcon.png')}

                />
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>Fit Coin</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>Q-কয়েন</Text>
              </View>
            </Pressable>

            {/* 8 */}
            {/* <Pressable style={{right:10,width:'85%',justifyContent:'flex-start',alignItems:'center',flexDirection:'row',borderBottomColor:colors.ash1,height:55}}  onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.qitca.qwikmedic")}> */}
            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => Linking.openURL("market://details?id=com.qitca.qwikmedic")}>
              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image
                  style={{
                    width: "52%",
                    height: "52%",
                  }}
                  resizeMode='contain'
                  source={require('../assets/fitback/rateIcon.png')}

                />
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>Rate App</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>রেটিং করুন</Text>
              </View>
            </Pressable>


            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => navigation.navigate("MedRequest", { Name: namep, phone: phonep })}>
              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image
                  style={{
                    width: "52%",
                    height: "52%",
                  }}
                  resizeMode='contain'
                  source={require('../assets/fitback/supportIcon.png')}

                />
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>Help & Support</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>যোগাযোগ করুন</Text>
              </View>
            </Pressable>

            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => navigation.navigate("HelpFQ", {})}>
              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image
                  style={{
                    width: "48%",
                    height: "48%",
                  }}
                  resizeMode='contain'
                  source={require('../assets/fitback/faqIcon.png')}

                />
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>FAQ</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>হেল্প/প্রশ্ন</Text>
              </View>
            </Pressable>

            {/* 12 */}
            <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => navigation.navigate("TermsConditions", { oldno: phonep })}>
              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image
                  style={{
                    width: "52%",
                    height: "52%",
                  }}
                  resizeMode='contain'
                  source={require('../assets/fitback/termsIcon.png')}

                />
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>Terms & Conditions</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>শর্তাবলী</Text>
              </View>
            </Pressable>






            {/* 2 */}
            {/* <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => navigation.navigate("Prescribtions", {})}>
              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Svg xmlns="http://www.w3.org/2000/svg" style={{ right: 16, bottom: 5 }} width="22" height="22" viewBox="0 0 54.758 70">
                  <Defs>
                    <ClipPath id="clip-path">
                      <Rect id="Rectangle_247" data-name="Rectangle 247" width="54.758" height="70" fill="none" />
                    </ClipPath>
                  </Defs>
                  <G id="Group_1626" data-name="Group 1626" transform="translate(0 0)">
                    <G id="Group_1625" data-name="Group 1625" transform="translate(0 0)" clip-path="url(#clip-path)">
                      <Path id="Path_1909" data-name="Path 1909" d="M43.336,49.583l9.817-10.459a6.1,6.1,0,0,0,0-8.249,5.24,5.24,0,0,0-7.743,0L35.592,41.335,26.28,31.414C38.932,21.218,32.045,0,16.427,0H5.476A5.661,5.661,0,0,0,0,5.833V52.5a5.661,5.661,0,0,0,5.476,5.833A5.661,5.661,0,0,0,10.951,52.5V35H14.16L27.849,49.583,18.031,60.043a6.1,6.1,0,0,0,0,8.249,5.241,5.241,0,0,0,7.744,0l9.817-10.459L45.41,68.291a5.24,5.24,0,0,0,7.743,0,6.1,6.1,0,0,0,0-8.249ZM21.9,17.5a5.669,5.669,0,0,1-5.476,5.834H10.951V11.666h5.476A5.669,5.669,0,0,1,21.9,17.5" transform="translate(0 0)" fill="#74b42e" />
                    </G>
                  </G>
                </Svg>

              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>Prescriptions</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>প্রেসক্রিপশনস</Text>
              </View>
            </Pressable> */}







            {/* 5 */}
            {/* <Pressable style={{ right: 10, width: '85%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: colors.ash1, height: 55 }} onPress={() => navigation.navigate("ReferEarn", { myreferralcode: myreferralcode, qcoins: qcoins, qmoney: qmoney })}>
              <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'flex-end' }}>

                <Svg xmlns="http://www.w3.org/2000/svg" style={{ right: 16, bottom: 5 }} width="22" height="22" viewBox="0 0 66.029 70">
                  <Defs>
                    <ClipPath id="clip-path">
                      <Rect id="Rectangle_217" data-name="Rectangle 217" width="66.029" height="70" fill="none" />
                    </ClipPath>
                  </Defs>
                  <G id="Group_1577" data-name="Group 1577" transform="translate(0 0)">
                    <G id="Group_1576" data-name="Group 1576" transform="translate(0 0)" clip-path="url(#clip-path)">
                      <Path id="Path_1870" data-name="Path 1870" d="M62.641,16.431H51.321A9.3,9.3,0,0,0,45.335,0C38.314,0,34.582,8.624,33,13.691,31.408,8.624,27.682,0,20.657,0a9.3,9.3,0,0,0-5.985,16.431H3.383A3.389,3.389,0,0,0,0,19.816V29.4a3.39,3.39,0,0,0,3.383,3.389H4.515V65.484A4.519,4.519,0,0,0,9.027,70H57a4.522,4.522,0,0,0,4.516-4.516V32.791h1.128A3.392,3.392,0,0,0,66.029,29.4V19.816a3.392,3.392,0,0,0-3.389-3.385M45.335,2.259a7.052,7.052,0,1,1,0,14.1v.069H34.572c.954-3.7,4.233-14.172,10.764-14.172M13.6,9.312a7.063,7.063,0,0,1,7.053-7.053c6.531,0,9.808,10.47,10.767,14.172H20.657v-.069A7.061,7.061,0,0,1,13.6,9.312M26.241,67.744H9.027a2.26,2.26,0,0,1-2.256-2.261V32.791H26.241Zm11.286,0H28.5V32.791h9.027Zm21.73-2.261A2.265,2.265,0,0,1,57,67.744H39.783V32.791H59.257ZM63.768,29.4a1.126,1.126,0,0,1-1.128,1.128H3.383A1.128,1.128,0,0,1,2.256,29.4V19.816a1.13,1.13,0,0,1,1.128-1.128H62.641a1.128,1.128,0,0,1,1.128,1.128Z" transform="translate(0 -0.001)" fill="#1a1718" />
                      <Path id="Path_1871" data-name="Path 1871" d="M58.284,24.725V57.419a2.264,2.264,0,0,1-2.261,2.259H38.809V24.725Zm-52.485,0V57.419a2.26,2.26,0,0,0,2.256,2.259H25.267V24.725Zm55.869-14.1H2.41A1.131,1.131,0,0,0,1.282,11.75v9.587a1.13,1.13,0,0,0,1.128,1.13H61.667a1.127,1.127,0,0,0,1.128-1.13V11.75a1.128,1.128,0,0,0-1.128-1.128" transform="translate(0.974 8.065)" fill="#ea4750" />
                    </G>
                  </G>
                </Svg>

              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'flex' : 'none' }}>Refer & Earn</Text>
                <Text style={{ fontSize: 12, color: colors.text, letterSpacing: .9, fontFamily: 'Poppins_400Regular', display: testCredentials.lan ? 'none' : 'flex' }}>রেফার এবং অর্জন</Text>
              </View>
            </Pressable> */}





            {/* 6.1 */}
            {/* <Pressable style={{width:'85%',justifyContent:'flex-start',alignItems:'center',flexDirection:'row',borderBottomColor:colors.ash1,height:55}} onPress={() => navigation.navigate("Emergency",{})}>
              <View style={{width:50,justifyContent:'flex-end',alignItems:'flex-end'}}>
              <Svg id="Group_1574" data-name="Group 1574" xmlns="http://www.w3.org/2000/svg"  style={{right:16,bottom:5}} width="22" height="22" viewBox="0 0 74.74 70">
                <Defs>
                  <ClipPath id="clip-path">
                    <Rect id="Rectangle_216" data-name="Rectangle 216" width="74.74" height="70" fill="none"/>
                  </ClipPath>
                </Defs>
                <G id="Group_1573" data-name="Group 1573" clip-path="url(#clip-path)">
                  <Path id="Path_1868" data-name="Path 1868" d="M31.557,55.781c-.866,0-4.139.068-5.121.133,0,0-11.643,9.1-12.187,9.1a2.3,2.3,0,0,1-2.308-2.309V47.766c-6.1-3.52-9.235-10.15-9.235-18.518,0-14.661,12.92-26.541,28.851-26.541S60.407,14.588,60.407,29.248,47.486,55.781,31.557,55.781" transform="translate(-1.674 -1.675)" fill="#96daf9"/>
                  <Path id="Path_1869" data-name="Path 1869" d="M28.729,29.92a3.5,3.5,0,1,1,3.5-3.5,3.5,3.5,0,0,1-3.5,3.5m11.506,0a3.5,3.5,0,1,1,3.49-3.5,3.5,3.5,0,0,1-3.49,3.5m-23.012,0a3.5,3.5,0,1,1,3.5-3.5,3.511,3.511,0,0,1-3.5,3.5M55.663,13.655A30.433,30.433,0,0,0,29.883,0C13.406,0,0,12.369,0,27.574c0,8.644,3.273,15.4,9.235,19.1V61.033a3.345,3.345,0,0,0,3.341,3.341c.418,0,.894,0,12.567-9.122,1.186-.056,3.928-.114,4.741-.114H29.9l-.016.019A27.792,27.792,0,0,0,48.1,61.8c.713,0,3.1.05,4.165.1C62.629,70,63.035,70,63.462,70a3.085,3.085,0,0,0,3.081-3.082V54.24c5.292-3.316,8.2-9.333,8.2-17.02,0-10.918-7.809-20.491-19.077-23.565M24.694,53.21l-.318.021-.25.2c-4.945,3.866-10.558,8.143-11.75,8.868A1.279,1.279,0,0,1,11.3,61.033V45.5l-.516-.3c-5.622-3.244-8.718-9.5-8.718-17.624,0-14.066,12.479-25.509,27.818-25.509S57.7,13.508,57.7,27.574s-12.479,25.5-27.817,25.5c-.836,0-4.167.068-5.189.136m40.3-.448-.516.3V66.918a1.019,1.019,0,0,1-.816,1c-1.123-.7-6.048-4.454-10.381-7.841l-.251-.2-.317-.021c-.908-.06-3.871-.121-4.614-.121A25.923,25.923,0,0,1,33,54.987C48.02,53.544,59.765,41.8,59.765,27.574a25.621,25.621,0,0,0-2.631-11.291C66.406,19.641,72.676,27.9,72.676,37.22c0,7.165-2.728,12.685-7.681,15.543" fill="#00142c"/>
                </G>
              </Svg>
              </View>
              <View style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
                <Text style={{fontSize:12,color: colors.text,letterSpacing:.9,fontFamily: 'Poppins_400Regular',bottom:3}}>Start A Chat</Text>
              </View>
            </Pressable> */}


            {/* 6.2 */}
            {/* <Pressable style={{width:'85%',justifyContent:'flex-start',alignItems:'center',flexDirection:'row',borderBottomColor:colors.ash1,height:55}} onPress={() => navigation.navigate("MedRequest",{Name:Name,phone:phone})}>
              <View style={{width:50,justifyContent:'flex-end',alignItems:'flex-end'}}>
              <Svg xmlns="http://www.w3.org/2000/svg" style={{right:16,bottom:5}}  width="22" height="22" viewBox="0 0 78.136 70">
                  <Defs>
                    <ClipPath id="clip-path">
                      <Rect id="Rectangle_206" data-name="Rectangle 206" width="78.136" height="70" fill="none"/>
                    </ClipPath>
                  </Defs>
                  <G id="Group_1554" data-name="Group 1554" transform="translate(0 0)">
                    <G id="Group_1553" data-name="Group 1553" transform="translate(0 0)" clip-path="url(#clip-path)">
                      <Path id="Path_1843" data-name="Path 1843" d="M0,53.72A16.28,16.28,0,0,0,16.278,70h1.628A16.28,16.28,0,0,0,34.183,53.72V35.814H0ZM3.254,39.068H30.929V53.72A13.024,13.024,0,0,1,17.906,66.744H16.278A13.024,13.024,0,0,1,3.254,53.72Zm57.792-4.882A16.83,16.83,0,0,0,44.489,51.279a17.621,17.621,0,0,0,.622,4.589L75.726,43.4a16.488,16.488,0,0,0-14.68-9.212m15.932,12.5L46.363,59.16a16.494,16.494,0,0,0,14.683,9.212A16.831,16.831,0,0,0,77.6,51.279a17.654,17.654,0,0,0-.622-4.591M17.906,0H16.278A16.278,16.278,0,0,0,0,16.278V34.186H34.183V16.278A16.278,16.278,0,0,0,17.906,0" transform="translate(0 0.001)" fill="#5d6add"/>
                    </G>
                  </G>
                </Svg>
              </View>
              <View style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
                <Text style={{fontSize:12,color: colors.text,letterSpacing:.9,fontFamily: 'Poppins_400Regular',bottom:3}}>Request A Med</Text>
              </View>
            </Pressable> */}











            {/* 9 */}



            {/* 10 */}



            {/* 11 */}
            {/* <Pressable style={{width:'85%',justifyContent:'flex-start',alignItems:'center',flexDirection:'row',borderBottomColor:colors.ash1,height:55}} onPress={() => navigation.navigate("AboutUs",{})}>
              <View style={{width:50,justifyContent:'flex-end',alignItems:'flex-end'}}>
              <Svg id="Group_1568" data-name="Group 1568" xmlns="http://www.w3.org/2000/svg" style={{right:16,bottom:5}} width="22" height="22" viewBox="0 0 70.002 70">
                <Defs>
                  <ClipPath id="clip-path">
                    <Rect id="Rectangle_213" data-name="Rectangle 213" width="70.002" height="70" fill="none"/>
                  </ClipPath>
                </Defs>
                <G id="Group_1567" data-name="Group 1567" transform="translate(0 0)" clip-path="url(#clip-path)">
                  <Path id="Path_1857" data-name="Path 1857" d="M23.705,14.408a7.4,7.4,0,0,0-7.147-6.755H9.111a7.4,7.4,0,0,0-7.147,6.755L.031,31.149a4.589,4.589,0,0,0,1.112,3.583A4.036,4.036,0,0,0,4.183,36.12L5.837,57.906A1.166,1.166,0,0,0,7,58.987H18.668a1.168,1.168,0,0,0,1.164-1.081L21.459,36.12h.024a4.032,4.032,0,0,0,3.039-1.388,4.581,4.581,0,0,0,1.115-3.583Z" transform="translate(0 11.015)" fill="#74b42e"/>
                  <Path id="Path_1858" data-name="Path 1858" d="M9.392,14a7,7,0,1,0-7-7,7.009,7.009,0,0,0,7,7" transform="translate(3.442 0)" fill="#3f64ad"/>
                  <Path id="Path_1859" data-name="Path 1859" d="M33.457.957h-7a3.5,3.5,0,0,0-3.5,3.5v7a3.5,3.5,0,0,0,3.5,3.5h7a3.5,3.5,0,0,0,3.5-3.5v-7a3.505,3.505,0,0,0-3.5-3.5" transform="translate(33.045 1.377)" fill="#e01019"/>
                  <Path id="Path_1860" data-name="Path 1860" d="M33.457,22.957h-7a3.5,3.5,0,0,0-3.5,3.5v7a3.5,3.5,0,0,0,3.5,3.5h7a3.5,3.5,0,0,0,3.5-3.5v-7a3.505,3.505,0,0,0-3.5-3.5" transform="translate(33.045 33.043)" fill="#0C1A30"/>
                  <Path id="Path_1861" data-name="Path 1861" d="M33.457,11.478h-7a3.5,3.5,0,0,0-3.5,3.5v7a3.5,3.5,0,0,0,3.5,3.5h7a3.5,3.5,0,0,0,3.5-3.5v-7a3.505,3.505,0,0,0-3.5-3.5" transform="translate(33.045 16.521)" fill="#d35819"/>
                  <Path id="Path_1862" data-name="Path 1862" d="M27.813,6.16h5.833a1.167,1.167,0,1,0,0-2.334H27.813a6.946,6.946,0,0,0-7,6.872v18.8H12.647a1.167,1.167,0,1,0,0,2.334h8.165v18.8a6.946,6.946,0,0,0,7,6.872h5.833a1.167,1.167,0,1,0,0-2.334H27.813a4.608,4.608,0,0,1-4.667-4.537v-18.8h10.5a1.167,1.167,0,1,0,0-2.334h-10.5V10.7A4.608,4.608,0,0,1,27.813,6.16" transform="translate(16.522 5.507)" fill="#050605"/>
                </G>
              </Svg>

              </View>
              <View style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
                <Text style={{fontSize:12,color: colors.text,letterSpacing:.9,fontFamily: 'Poppins_400Regular',bottom:3}}>About Us</Text>
              </View>
            </Pressable> */}







            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 60, marginBottom: 20 }}>
              <Pressable style={{ width: '60%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 45, borderRadius: 20, backgroundColor: colors.white1 }} onPress={() => persistLogout()}>
                <View style={{ width: 50, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  <Svg xmlns="http://www.w3.org/2000/svg" style={{ right: 20 }} width="20" height="20" viewBox="0 0 66.5 70">
                    <G id="Icon_Log_Out" data-name="Icon Log Out" transform="translate(-274 -2547)">
                      <Path id="Icon_Log_Out_2" data-name="Icon Log Out_2" d="M277.5,2617a3.514,3.514,0,0,1-3.5-3.5v-63a3.514,3.514,0,0,1,3.5-3.5h49a3.514,3.514,0,0,1,3.5,3.5V2561h-7v-7H281v56h42v-7h7v10.5a3.514,3.514,0,0,1-3.5,3.5Zm45.5-21v-10.5H298.5v-7H323V2568l17.5,14Z" fill="#EE426D" />
                    </G>
                  </Svg>

                </View>
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                  <Text style={{ fontSize: 13, color: colors.ash, letterSpacing: .9, fontFamily: 'Poppins_500Medium', right: 10, display: testCredentials.lan ? 'flex' : 'none' }}>Logout</Text>
                  <Text style={{ fontSize: 12, color: colors.ash, letterSpacing: .9, fontFamily: 'Poppins_500Medium', right: 10, display: testCredentials.lan ? 'none' : 'flex' }}>লগ আউট</Text>
                </View>
              </Pressable>
            </View>



          </View>

          {/* <View style={[styles.customItem]}>
            <Text
              onPress={() => {
                Linking.openURL('https://aboutreact.com/');
              }}>
              Rate Us
            </Text>
            <Image
              source={{ uri: BASE_PATH + 'star_filled.png' }}
              style={styles.iconStyle}
            />
          </View> */}
        </View>

      </DrawerContentScrollView>
      {/* <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
        qwikmedic
      </Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;