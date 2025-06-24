import React, { useState, useEffect, useContext, useRef } from 'react';
import { Dimensions, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking, Modal, TouchableOpacity, Alert, Animated } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';

import { UserContext } from '../../components/CredintailsContext';
import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";


import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

import { WebView } from 'react-native-webview';
const { width, height } = Dimensions.get('window');


function RecipeVideo({ navigation, route }) {
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

  const [getExerciseVideo, setGetExerciseVideo] = useState(true);
  const [getAllExerciseVideo, setGetAllExerciseVideo] = useState();

  const AllVideoData = () => {
    if (getExerciseVideo) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },

      };

      fetch('https://qwikit1.pythonanywhere.com/recipeVideos/', requestOptions)
        .then((response) => response.json())
        .then((json) => {
          // setLoading1(false)
          setGetAllExerciseVideo(json);
          setNointernet(false);
          // console.log(json);
        })
        .catch((error) => {
          console.error(error);
          setNointernet(true);
          // setLoading1(false)
          // console.log("Network Error");
        });

      setGetExerciseVideo(false);
    }

  };

  useEffect(() => {
    AllVideoData();
  }, [route.params]);


  const [selectedVideo, setSelectedVideo] = useState(null);

  const openModal = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const convertToEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("youtu.be")) {
      let videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("watch?v=")) {
      let videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("drive.google.com")) {
      let match = url.match(/\/d\/(.+?)\//);
      let videoId = match ? match[1] : "";
      return `https://drive.google.com/file/d/${videoId}/preview`;
    }

    return url; // If it's not YouTube or Drive, return as is
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

            <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Recipe Video </Text>

          </View>



        </View>


        <View style={[styles.body1, { justifyContent: 'flex-start', alignItems: 'center' }]}>
          <ScrollView >



            <View style={{ width: '100%', justifyContent: "space-between", alignItems: 'center', marginTop: 20, flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 14 }}>

              {/* <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              
            </View> */}

              {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}> */}
              {getAllExerciseVideo?.map((data, index) => {
                let videoId = "";
                let isYouTube = data.youtubelink.includes("youtu.be") || data.youtubelink.includes("watch?v=");
                let isDrive = data.youtubelink.includes("drive.google.com");

                if (isYouTube) {
                  if (data.youtubelink.includes("youtu.be")) {
                    videoId = data.youtubelink.split("youtu.be/")[1]?.split("?")[0];
                  } else if (data.youtubelink.includes("watch?v=")) {
                    videoId = data.youtubelink.split("v=")[1]?.split("&")[0];
                  }
                } else if (isDrive) {
                  let match = data.youtubelink.match(/\/d\/(.+?)\//);
                  videoId = match ? match[1] : "";
                }

                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: "48%",
                      // height: 200,
                      marginBottom: 20,
                      backgroundColor: colors.white,
                      padding: 6,
                      borderRadius: 6,
                      shadowColor: '#000',
                      shadowOffset: { width: 3, height: 3 },
                      shadowOpacity: 0.5,
                      shadowRadius: 5,
                      elevation: 6,
                    }}
                    onPress={() => openModal(data)}
                  >
                    <View style={{ width: '100%', height: 95, paddingHorizontal: 6, paddingTop: 6, backgroundColor: "#fff" }}>
                      {isYouTube && videoId ? (
                        <Image
                          source={{ uri: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }}
                          style={styles.thumbnail}
                          resizeMode='cover'
                        />
                      ) : isDrive && videoId ? (
                        <Image
                          source={{ uri: `https://drive.google.com/thumbnail?id=${videoId}` }}
                          style={styles.thumbnail}
                          resizeMode='cover'
                        />
                      ) : (
                        <Text style={{ textAlign: "center", marginTop: 50 }}>Thumbnail not available</Text>
                      )}


                    </View>

                  </TouchableOpacity>
                );
              })}

              {/* Modal for playing video */}
              <Modal
                visible={!!selectedVideo}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    {selectedVideo && (
                      <WebView
                        source={{ uri: convertToEmbedUrl(selectedVideo.youtubelink) }}
                        style={styles.video}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        allowsFullscreenVideo={true}
                        mediaPlaybackRequiresUserAction={false}
                      />
                    )}
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                      <Text style={{ color: colors.white, fontSize: 12, fontFamily: "Poppins_400Regular" }}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              {/* </View> */}

              {/* {
getAllReview?.map((data, index) =>  */}

              {/* <View style={{
                width: "48%",
                justifyContent: "space-between",
                marginBottom: 20,
                backgroundColor: colors.white,
                padding: 6,
                borderRadius: 6,
                shadowColor: '#000',
                shadowOffset: { width: 3, height: 3 },
                shadowOpacity: 5,
                shadowRadius: 5,
                elevation: 6,
              }}>
                <View style={{ width: "100%" }}>
                  <Image
                    style={{
                      borderRadius: 6,
                      width: "100%",
                      height: 150,
                    }}
                    source={
                      // data?.user_image_upload && data?.user_image_upload.trim() !== ''
                      //   ? { uri: data?.user_image_upload }
                      //   : 
                      require('../assets/fitback/ExerciseVideo01.png')
                    }
                    resizeMode="stretch"
                  />

                </View>
                <View style={{ width: "100%", }}>
                  <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 12, marginTop: 6 }}>Balanced Diet for you</Text>

                </View>
              </View>
              <View style={{
                width: "48%",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginBottom: 20,
                backgroundColor: colors.white,
                padding: 6,
                borderRadius: 6,
                shadowColor: '#000',
                shadowOffset: { width: 3, height: 3 },
                shadowOpacity: 5,
                shadowRadius: 5,
                elevation: 6,
              }}>
                <View style={{ width: "100%" }}>
                  <Image
                    style={{
                      borderRadius: 6,
                      width: "100%",
                      height: 150,
                    }}
                    source={
                      // data?.user_image_upload && data?.user_image_upload.trim() !== ''
                      //   ? { uri: data?.user_image_upload }
                      //   : 
                      require('../assets/fitback/ExerciseVideo02.png')
                    }
                    resizeMode="stretch"
                  />

                </View>
                <View style={{ width: "100%", }}>
                  <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 12, marginTop: 6 }}>Balanced Diet for you</Text>

                </View>
              </View>
              <View style={{
                width: "48%",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginBottom: 20,
                backgroundColor: colors.white,
                padding: 6,
                borderRadius: 6,
                shadowColor: '#000',
                shadowOffset: { width: 3, height: 3 },
                shadowOpacity: 5,
                shadowRadius: 5,
                elevation: 6,
              }}>
                <View style={{ width: "100%" }}>
                  <Image
                    style={{
                      borderRadius: 6,
                      width: "100%",
                      height: 150,
                    }}
                    source={
                      // data?.user_image_upload && data?.user_image_upload.trim() !== ''
                      //   ? { uri: data?.user_image_upload }
                      //   : 
                      require('../assets/fitback/ExerciseVideo03.png')
                    }
                    resizeMode="stretch"
                  />

                </View>
                <View style={{ width: "100%", }}>
                  <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 12, marginTop: 6 }}>Balanced Diet for you</Text>

                </View>
              </View> */}

              {/* // )} */}

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
  thumbnail: {
    width: '100%',
    height: '100%',
    // height: 180,
    borderRadius: 6,
    resizeMode: "stretch",
    // backgroundColor:"#fff",
    borderWidth: 1
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    // width: width * 0.9,
    width: width * 0.95,
    // height: height * 0.6,
    height: height * 0.327,
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
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: '#EE416C',
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },

});

export default RecipeVideo;