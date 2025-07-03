import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ImageBackground, Switch, SafeAreaView, Platform, StatusBar, Image, Button, TextInput, Pressable, ScrollView, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome5';

//asyn-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credential context
import { CredentialsContext } from '../../components/CredintailsContext';
import { UserContext } from '../../components/CredintailsContext';

import * as Notifications from 'expo-notifications';
import { requestPermissionsAsync, scheduleNotification } from '../../NotificationService';


import colors from '../config/colors';



function ChangePinPage({ navigation, route }) {

  const [unread, setUnread] = useState(false);
  const { authtoken, setAuthtoken } = useContext(UserContext);
  const [getnotify, setGetnotify] = useState(true);


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
  const [userPass, setUserPass] = useState("00");

  const [Pass, setPass] = useState("00");

  const [oldPass, setOldPass] = useState("00");
  const [newPass, setNewPass] = useState("00");
  const [confirmPass, setConfirmPass] = useState("00");

  const [oldno, setOldno] = useState(route.params.oldno);
  const [phonenumber1, setPhonenumber1] = useState("");
  const [password, setPassword] = useState("00");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [postcode, setPostcode] = useState("");
  const [streetaddress, setStreetaddress] = useState("");
  const [nid, setNid] = useState("");


  const { testCredentials, setTestCredentials } = useContext(UserContext);
  const [lan, setLan] = useState(testCredentials.lan);
  const [userid, setUserid] = useState(testCredentials.userid);

  const [notify, setNotify] = useState(testCredentials.notify);
  const [cartbuy, setCartbuy] = useState(testCredentials.cartbuy);
  const [cartrent, setCartrent] = useState(testCredentials.cartrent);
  const [productsave, setProductsave] = useState(testCredentials.productsave);
  const [flatsave, setflatsave] = useState(testCredentials.flatsave);
  //context
  const { storeCredentials, setStoreCredentials } = useContext(CredentialsContext);

  // const {userid, lan} = storeCredentials

  const [isEnabled, setIsEnabled] = useState(false);
  const [English, setEnglish] = useState(lan ? true : false);
  const [Bangla, setBangla] = useState(lan ? false : true);


  // const [userid,setUserid] = useState(route.params.userid)

  const [getUser, setGetUser] = useState(true);
  const [getUser1, setGetUser1] = useState(true);

  const [phonenumber, setPhonenumber] = useState("00");
  const [allUsername, setAllUsername] = useState([]);
  const [myUsername, setMyUsername] = useState([]);

  const [successNumber, setSuccessNumber] = useState(true);
  const [passwordcheck, setPasswordcheck] = useState(true);

  const [oldpasswordcheck, setOldPasswordcheck] = useState(true);
  const [newPasswordcheck, setNewPasswordcheck] = useState(true);
  const [corfpasswordcheck, setCorfPasswordcheck] = useState(true);

  const [nointernet, setNointernet] = useState(false);
  const [isLoading1, setLoading1] = useState(false);
  const [isLoading2, setLoading2] = useState(false);
  const [isLoading3, setLoading3] = useState(false);

  const [submit1, setSubmit1] = useState(false);
  const [submit2, setSubmit2] = useState(false);


  const GetMyalluser = () => {
    if (getUser) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
      };

      fetch('https://qwikit1.pythonanywhere.com/userProfile/', requestOptions)
        .then((response) => response.json())
        .then((json) => {
          setAllUsername(json);
          setNointernet(false);
          setPhonenumber1(json.phonenumber);
          setPassword(json.password);
          setName(json.name);
          setEmail(json.email);
          setCity(json.city);
          setArea(json.area);
          setPostcode(json.postcode);
          setStreetaddress(json.streetaddress);
          setNid(json.nid);
          //console.log('Fetch API Response', json);
        })
        .catch((error) => {
          console.error(error);
          setNointernet(true);
          setLoading1(false);
        });
      setGetUser(false);
    }

  };

  GetMyalluser();

  const GetMyalluser1 = () => {
    if (getUser1) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
      };

      fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
        .then((response) => response.json())
        .then((json) => {
          setNointernet(false);
          setUserPass(json.password);
        })
        .catch((error) => {
          console.error(error);
          setNointernet(true);
          setLoading1(false);
        });
      setGetUser1(false);
    }

  };

  GetMyalluser1();




  const UpdateNumber = (phonenumber, password) => {

    if (nointernet) {
      setLoading1(false);
      setNointernet(true);
    }
    else {

      setSuccessNumber(true);
      setPasswordcheck(true);

      setGetUser(true);
      if (phonenumber != null && password != null) {
        if (phonenumber.match("(?:\\+88|88)?(01[3-9]\\d{8})") && password == userPass) {

          let x = "zero";
          allUsername.map((value) => {



            if (value.number == phonenumber) {
              setLoading1(false);
              x = "booked";
              if (lan == true) {
                Alert.alert(
                  "Number Already Registered",
                  "\n please try again with another phone number",

                  [
                    { text: "Ok" }
                  ], { cancelable: true, });
              }
              else {
                Alert.alert(
                  "নম্বর ইতিমধ্যে নিবন্ধিত আছে",
                  "\n অন্য ফোন নম্বর দিয়ে আবার চেষ্টা করুন",

                  [
                    { text: "ঠিক আছে" }
                  ], { cancelable: true, });
              }

              return setSuccessNumber(false);

            }
            else {

            }
          });

          if (x == "zero") {
            setLoading1(false);
            navigation.navigate("OtpinputChangeNumber", { number: phonenumber, password: password, changenumber: true, userid: userid, otpflag: true });

          }

        }
        else if (password.length != 4) {
          setLoading1(false);
          setPasswordcheck(false);
          // console.log('password must be in 4 digit')


        }
        else if (password != userPass) {
          setLoading1(false);
          setPasswordcheck(false);


        }
        else {
          setLoading1(false);
          setSuccessNumber(false);
          // console.log('number invalid')

        }

      }
      else if (phonenumber == null) {
        setLoading1(false);
        setSuccessNumber(false);

      }
      else {
        setLoading1(false);
        setPasswordcheck(false);
      }
    }




  };
  const UpdatePassword = (oldpass, newpass, confpass) => {
    if (nointernet) {
      setLoading2(false);
      setNointernet(true);
    }
    else {
      setOldPasswordcheck(true);
      setNewPasswordcheck(true);
      setCorfPasswordcheck(true);

      setGetUser(true);
      if (oldPass != null && newpass != null && confpass != null) {
        if (oldpass == userPass && newpass == confpass && oldpass.length == 4 && newpass.length == 4 && oldPass.length == 4) {

          const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({
              password: newpass,
            })
          };

          fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
            .then((response) => response.json())
            .then((json) => {
              // console.log('create user', json);
              setNointernet(false);


              setGetUser1(true);
              setLoading2(false);


              // navigation.navigate("UserProfileLatest",{})
              navigation.navigate("Homepage");

            })
            .catch((error) => {
              setNointernet(true);
              setLoading2(false);

            });

        }
        else if (oldpass.length != 4 || oldpass != userPass) {
          setLoading2(false);
          setOldPasswordcheck(false);

        }
        else if (newpass.length != 4) {
          setLoading2(false);
          setNewPasswordcheck(false);

        }
        else if (oldPass.length != 4 || newpass != confpass) {
          setLoading2(false);
          setCorfPasswordcheck(false);
          // console.log('password must be in 4 digit')

        }
      }
      else if (oldpass == null || oldpass.length != 4) {
        setLoading2(false);
        setOldPasswordcheck(false);

      }
      else if (newpass == null || newpass.length != 4) {
        setLoading2(false);
        setNewPasswordcheck(false);
      }
      else if (confpass == null || confpass.length != 4) {
        setLoading2(false);
        setCorfPasswordcheck(false);
      }

    }



  };
  const deleteuser = () => {
    if (nointernet) {
      setNointernet(true);
    }
    else {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
        body: JSON.stringify({
          xuserid: userid,
          number: phonenumber1,
          password: password,
          name: name,

          email: email,
          city: city,
          area: area,
          postcode: postcode,
          streetaddress: streetaddress,
          nid: nid,

        })
      };

      fetch('https://qwikit1.pythonanywhere.com/userHistry/new', requestOptions)
        .then((response) => response.json())
        .then((json) => {
          // console.log('create userHistry', json);

        })
        .catch((error) => {
          setLoading1(false);

          console.error(error);

          setNointernet(true);

        });

      const requestOptions1 = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
      };

      fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions1)
        .then(response => response.ok)
        .then((json) => {
          setNointernet(false);
          setLoading3(false);
          persistLogout();
        })
        .catch((error) => {
          setNointernet(true);
        });

    }


  };

  const Deletealert1 = () => {
    if (lan == true) {
      Alert.alert(
        "Are you sure?",
        "All your information will be deleted through account delete.",
        [
          {
            text: "No", onPress: () => setLoading3(false),
            style: 'destructive'

          },
          { text: "Yes", onPress: () => deleteuser() }
        ], { cancelable: true });
    }
    else {
      Alert.alert(
        "আপনি কি নিশ্চিত?",
        "অ্যাকাউন্ট ডিলিট এর মাধ্যমে আপনার সকল তথ্য মুছে যাবে।",
        [
          {
            text: "না", onPress: () => setLoading3(false),
            style: 'destructive'

          },
          { text: "হ্যাঁ", onPress: () => deleteuser() }
        ], { cancelable: true, });
    }

  };



  const Deletealert = () => {

    if (lan == true) {
      Alert.alert(
        "Deleting your account",
        "Do you want to delete your account?",
        [
          {
            text: "No", onPress: () => setLoading3(false),
            style: 'destructive'

          },
          { text: "Yes", onPress: () => Deletealert1() }
        ], { cancelable: true, });
    }
    else {
      Alert.alert(
        "আপনার অ্যাকাউন্টটি মুছে ফেলা হচ্ছে",
        "আপনি আপনার অ্যাকাউন্ট মুছতে চান?",
        [
          {
            text: "না", onPress: () => setLoading3(false),
            style: 'destructive'

          },
          { text: "হ্যাঁ", onPress: () => Deletealert1() }
        ], { cancelable: true, });
    }



  };



  const pressEnglish = () => {
    English ? setEnglish(true) : setEnglish(true) & setBangla(false);
    // console.log(English)
    // setLan(true)
    // console.log('presse english',lan)
    // persistLogin({userid:userid,lan:true})
    setLan(true);
    persistUser({ userid: userid, notify: testCredentials.natify, lan: true, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });



  };
  const pressBangla = () => {
    Bangla ? setBangla(true) : setEnglish(false) & setBangla(true);
    // console.log(Bangla)
    // setLan(false)
    // console.log('presse bangla',lan)
    // persistLogin({userid:userid,lan:false})
    setLan(false);
    persistUser({ userid: userid, notify: testCredentials.natify, lan: false, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });

  };

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


  const persistLogin = (credentials) => {

    AsyncStorage.setItem('qwikmedicLogin', JSON.stringify(credentials))
      .then(() => {
        // handleMessage(message)
        setStoreCredentials(credentials);
      })
      .catch((error) => {
        // console.log(error)
        handleMessage('persisting login failed');
      });
  };

  const persistLogout = () => {

    AsyncStorage.removeItem('qwikmedicLogin')
      .then(() => {

        persistUser({ userid: 0, notify: testCredentials.natify, lan: true, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });

        setStoreCredentials("");
        // navigation.navigate("UserLandingPage")
        navigation.navigate("Homepage");
        // console.log("hit inside")
      })
      .catch((error) => {
        // console.log(error)
      });
  };

  useEffect(() => {
    // NotificationCheck()
    if (oldPass.length == 4 && newPass.length == 4 && confirmPass.length == 4) {
      setSubmit1(true);
    }
    else {
      setSubmit1(false);

    }

    if (phonenumber.length == 11 && Pass.length == 4) {
      setSubmit2(true);
    }
    else {
      setSubmit2(false);

    }
  });

  const back = (() => {

    const { goBack } = navigation;
    goBack();

  });


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

              <Pressable style={{ width: 22, height: 22, right: 15 }} onPress={() => navigation.navigate("Pharmacy", { reminder: true })} >
                <Image
                  style={{ width: 22, height: 22, left: 0, top: 2 }}
                  resizeMode='contain'
                  source={require('../assets/search.jpg')}
                />
              </Pressable>

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

    <SafeAreaView style={styles.MainContainer}>
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

          <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Change Pin </Text>

        </View>



      </View>

      <ScrollView style={{ width: '100%' }}>






        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 60 }}>


          <View style={[styles.body2, { borderWidth: 0, width: '95%', borderColor: colors.ash1, borderRadius: 6, marginTop: 20, marginBottom: 10 }]}>
            <View style={{ width: '95%', left: 10, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 50, borderWidth: 0 }}>

              <Text style={{ color: colors.text, fontSize: 12, display: lan ? 'none' : 'flex', letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>পিন পরিবর্তন</Text>
              <Text style={{ color: colors.text, fontSize: 12, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>CHANGE PIN:</Text>
            </View>
            <View style={{ width: '100%', justifyContent: 'space-between', alignItems: "center", paddingTop: 10, borderWidth: 0 }}>


              <View style={[styles.sendform, { width: '95%', paddingTop: 10, left: 10 }]}>


                <View style={styles.inputdiv} >


                  <TextInput
                    style={[styles.input, { borderColor: oldpasswordcheck ? "#C7C8D2" : colors.red, color: colors.ash }]}
                    placeholder={lan ? "Enter Your Current Pin" : "আপনার ফোন নাম্বার দিন"}
                    onChangeText={newTest => setOldPass(newTest)}
                    defaultValue={oldPass == "00" ? "" : oldPass}
                    keyboardType='numeric'
                    maxLength={4}
                    // textAlign={'center'}
                    secureTextEntry={true}
                  />
                  <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, display: oldpasswordcheck ? 'none' : 'flex' }}>

                    <Text style={{ color: colors.red, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Incorrect Pin<Text style={{ color: colors.red, fontWeight: '400' }}> (Pin must be 4 digit)</Text></Text>

                  </View>
                </View>
                <View style={styles.inputdiv}>

                  <TextInput
                    style={[styles.input, { borderColor: newPasswordcheck ? "#C7C8D2" : colors.red }]}
                    placeholder={lan ? "Enter A New 4-Digit Pin" : "আপনার ফোন নাম্বার দিন"}
                    onChangeText={newTest => setNewPass(newTest)}
                    defaultValue={newPass == "00" ? "" : newPass}
                    keyboardType='numeric'
                    maxLength={4}
                    // textAlign={'center'}
                    secureTextEntry={true}
                  />

                  <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, display: newPasswordcheck ? 'none' : 'flex' }}>

                    <Text style={{ color: colors.red, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Incorrect Pin<Text style={{ color: colors.red, fontWeight: '400' }}> (Pin must be 4 digit)</Text></Text>

                  </View>
                </View>
                <View style={styles.inputdiv}>

                  <TextInput
                    style={[styles.input, { borderColor: corfpasswordcheck ? "#C7C8D2" : colors.red }]}
                    placeholder={lan ? "Confirm Your New Pin" : "আপনার ফোন নাম্বার দিন"}
                    onChangeText={newTest => setConfirmPass(newTest)}
                    defaultValue={confirmPass == "00" ? "" : confirmPass}
                    keyboardType='numeric'
                    maxLength={4}
                    // textAlign={'center'}
                    secureTextEntry={true}

                  />
                  <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, display: corfpasswordcheck ? 'none' : 'flex' }}>

                    <Text style={{ color: colors.red, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Incorrect Pin<Text style={{ color: colors.red, fontWeight: '400' }}> (Pin must be 4 digit)</Text></Text>

                  </View>
                </View>

                {/*                                                 
                                            <Pressable style={[styles.tuchabluebutton,{top:20,backgroundColor: isLoading2 ? colors.ash  : '#065540' ,flexDirection:'row'}]} onPress={() => {setLoading2(true),UpdatePassword(oldPass,newPass,confirmPass)}}>
                                                <ActivityIndicator size="small" color="#00263C" style={{display: isLoading2  ? 'flex' : 'none',right:30}}/>
                                                <Text style={{color:colors.white,fontSize:14,display : lan ? 'none' : 'flex'}}>আপডেট</Text> 
                                                <Text style={{color:colors.white,fontSize:14,display : lan ? 'flex' : 'none'}}>Update</Text> 
                                            </Pressable> */}


              </View>
              <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }}>
                <Pressable disabled={submit1 ? false : true} style={{ width: '90%', height: '40%', justifyContent: 'center', alignItems: 'center', backgroundColor: submit1 ? "#EE416C" : colors.ash1 }} onPress={() => { setLoading2(true), UpdatePassword(oldPass, newPass, confirmPass); }}>

                  <Text style={{ color: colors.white, fontSize: 12, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_500Medium' }} >CHANGE PIN</Text>

                </Pressable>
              </View>
            </View>

          </View>



          {/* 
                            <View style={[styles.body1,{borderWidth:0,width:'95%',borderColor:colors.ash1,borderRadius:6,marginTop:20,marginBottom:10}]}>
                                <View style={{width:'95%',justifyContent:'flex-start',alignItems:'flex-start',marginTop:10,borderWidth:0}}>

                                    <Text style={{color:colors.text,fontSize:12,display : lan ? 'none' : 'flex',letterSpacing:.9,fontFamily: 'Poppins_500Medium'}}>পিন পরিবর্তন</Text>
                                    <Text style={{color:colors.text,fontSize:12,display : lan ? 'flex' : 'none',letterSpacing:.9,fontFamily: 'Poppins_500Medium'}}>CHANGE PHONE NUMBER:</Text>
                                    <Text style={{color:colors.ash,fontSize:10,display : lan ? 'flex' : 'none',letterSpacing:.6,fontFamily: 'Poppins_400Regular'}}>(This Will Be Your New UserName)</Text>
                                </View>
                                    <View style={{width:'100%',justifyContent:'space-between',paddingTop:10,flexDirection:'row',borderWidth:0,height:190}}>

                                        
                                        <View style={[styles.sendform,{width:'60%',paddingTop:10,left:10}]}>
                                            
                                            
                                            <View style={styles.inputdiv} >
                                                
                                                
                                            <TextInput 
                                            style={[styles.input,{borderColor: "#C7C8D2" }]}  
                                            placeholder= {lan ? "Current No.: "+ oldno : "আপনার ফোন নাম্বার দিন"}   
                                            keyboardType="numeric"
                                            maxLength={11}
                                            editable={false}

                                            />
                                            <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',left:10,display: successNumber ? 'none' : 'flex'}}>
                                    
                                                <Text style={{color: colors.red,fontWeight:'700',fontSize:12,paddingBottom:3,display : lan ? 'flex' : 'none'}}>Invalid number<Text style={{color:colors.red}}></Text></Text>
                                            
                                            </View>
                                            </View> 
                                            <View style={styles.inputdiv}>
                                            
                                                <TextInput 
                                                style={[styles.input,{borderColor: successNumber ? "#C7C8D2" : colors.red,}]}  
                                                placeholder= {lan ? "Enter The New Phone No." : "আপনার ফোন নাম্বার দিন"}   
                                                                              
                                                onChangeText={newTest => setPhonenumber(newTest)}
                                                defaultValue={phonenumber == "00" ? "" : phonenumber}
                                                keyboardType="numeric"
                                                maxLength={11}

                                                />
                                                <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',left:10,display: successNumber ? 'none' : 'flex'}}>
                                        
                                                    <Text style={{color: colors.red,fontWeight:'700',fontSize:12,paddingBottom:3,display : lan ? 'flex' : 'none'}}>Invalid number<Text style={{color:colors.red}}></Text></Text>
                                                
                                                </View>
                                            </View>
                                            <View style={styles.inputdiv}>
                                                
                                                <TextInput 
                                                style={[styles.input,{borderColor: passwordcheck ? "#C7C8D2" : colors.red}]} 
                                                placeholder= {lan ? "Verify With Your Pin" : "আপনার ফোন নাম্বার দিন"}                                                
                                                onChangeText={newTest => setPass(newTest)}
                                                defaultValue={Pass == "00" ? "" : Pass}
                                                keyboardType='numeric'
                                                maxLength={4}
                                                secureTextEntry={true} 
                                                /> 
                                                <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',left:10,display: passwordcheck ? 'none' : 'flex'}}>
                                    
                                                    <Text style={{color: colors.red,fontWeight:'700',fontSize:12,paddingBottom:3,display : lan ? 'flex' : 'none'}}>Incorrect Pin<Text style={{color: colors.red,fontWeight:'400'}}> (password must be 4 digit)</Text></Text>
                                                
                                                </View>
                                            </View>                                            
                                        
                                        </View>
                                        <View style={{width:'40%' ,justifyContent:'center',alignItems:'center'}}>
                                            <Pressable disabled={submit2 ? false : true} style={{width:'90%',height:'40%',justifyContent:'center',alignItems:'center',backgroundColor: submit2 ? "#559B5D" : colors.ash1}} onPress={() => {setLoading1(true),UpdateNumber(phonenumber,Pass)}}>
                                                
                                                <Text style={{color:colors.white,fontSize:12,display : lan ? 'flex' : 'none',letterSpacing:.9,fontFamily: 'Poppins_500Medium'}} >CHANGE PHONE</Text>                 
                                                
                                            </Pressable>
                                        </View>

                                    
                                    </View>
                                
                                    

                              
                            </View> */}


          {/* <View style={[styles.body1,{borderWidth:1,width:'95%',borderColor:colors.ash1,borderRadius:6,marginTop:10}]}>

                            <View style={{width:'95%',justifyContent:'flex-start',alignItems:'flex-start',marginTop:10,borderBottomWidth:1,borderBottomColor:colors.white1,height:30}}>

                                <Text style={{color:'#00646B',fontSize:12,left:10,display : lan ? 'none' : 'flex',fontWeight:'700'}}>নাম্বার পরিবর্তন</Text>
                                <Text style={{color:'#00646B',fontSize:12,left:10,display : lan ? 'flex' : 'none',fontWeight:'700'}}>Change PhoneNumber</Text>
                            </View>

                                <View style={styles.sendform}>

                                    <View style={{width:'100%',height:10}}/>
                                    <View style={styles.inputdiv}>
                                        
                                        <TextInput 
                                            style={[styles.input,{borderColor: successNumber ? "#C7C8D2" : colors.red,}]}  
                                            onChangeText={newTest => setPhonenumber(newTest)}
                                            defaultValue={phonenumber}
                                            keyboardType="numeric"
                                            maxLength={11}
                                            textAlign={'center'}

                                        />
                                        <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',left:10,display: successNumber ? 'none' : 'flex'}}>
                                
                                            <Text style={{color: colors.red,fontWeight:'700',fontSize:12,paddingBottom:3,display : lan ? 'flex' : 'none'}}>Invalid number<Text style={{color:colors.red}}></Text></Text>
                                        
                                        </View>
                                    </View>
                                    
                                    <View style={{width:'100%',height:10}}/>
                                    <View style={styles.inputdiv}>
                                        
                                        <TextInput 
                                            style={[styles.input,{borderColor: successNumber ? "#C7C8D2" : colors.red,}]}  
                                            onChangeText={newTest => setPhonenumber(newTest)}
                                            defaultValue={phonenumber}
                                            keyboardType="numeric"
                                            maxLength={11}
                                            textAlign={'center'}

                                        />
                                        <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',left:10,display: successNumber ? 'none' : 'flex'}}>
                                
                                            <Text style={{color: colors.red,fontWeight:'700',fontSize:12,paddingBottom:3,display : lan ? 'flex' : 'none'}}>Invalid number<Text style={{color:colors.red}}></Text></Text>
                                        
                                        </View>
                                    </View>
                                    <View style={{width:'100%',height:10}}/>    
                                    <View style={styles.inputdiv} >
                                          
                                            <TextInput 
                                            style={[styles.input,{borderColor: passwordcheck ? "#C7C8D2" : colors.red}]} 
                                            onChangeText={newTest => setPass(newTest)}
                                            defaultValue={Pass}
                                            keyboardType='numeric'
                                            maxLength={4}
                                            textAlign={'center'}
                                            secureTextEntry={true} 
                                            /> 
                                            <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',left:10,display: passwordcheck ? 'none' : 'flex'}}>
                                
                                                <Text style={{color: colors.red,fontWeight:'700',fontSize:12,paddingBottom:3,display : lan ? 'flex' : 'none'}}>Incorrect Pin<Text style={{color: colors.red,fontWeight:'400'}}> (password must be 4 digit)</Text></Text>
                                            
                                            </View>
                                    </View> 
                                    

                                          
                                    <Pressable style={[styles.tuchabluebutton,{backgroundColor: isLoading1 ? colors.ash  : '#065540' ,flexDirection:'row'}]} onPress={() => {setLoading1(true),UpdateNumber(phonenumber,Pass)}}>
                                        <ActivityIndicator size="small" color="#00263C" style={{display: isLoading1  ? 'flex' : 'none',right:30}}/>
                                        <Text style={{color:'#FFF',fontSize:14,display : lan ? 'none' : 'flex'}}>আপডেট</Text> 
                                        <Text style={{color:'#FFF',fontSize:14,display : lan ? 'flex' : 'none'}}>Update</Text> 
                                    </Pressable>

                                    
                                
                                </View>
                            </View> */}

          {/* <View style={{width:"95%",height:5 ,backgroundColor:colors.white1,marginTop:20}}/>  */}


          {/* <Pressable style={[styles.tuchabluebutton,{top:20,backgroundColor: isLoading3 ? '#F7D8D8' : '#FFEBEB',flexDirection:'row'}]} onPress={() => {setLoading3(true),Deletealert()}}>
                                    <ActivityIndicator size="small" color="#00263C" style={{display: isLoading3  ? 'flex' : 'none',right:30}}/>
                                    <Icon name='delete' color="#9B3232" size={24} />
                                    <Text style={{color:"#D50400",fontSize:14,display : lan ? 'none' : 'flex'}}>অ্যাকাউন্ট ডিলিট করুন</Text> 
                                    <Text style={{color:"#D50400",fontSize:14,display : lan ? 'flex' : 'none'}}> Delete account</Text> 
                            </Pressable> */}
          {/* <View style={{width:'100%',justifyContent:'space-between',flexDirection:'row'}}>

                        
                            <View style={{width:'40%',justifyContent:'center',alignItems:'center',left:0}}>
                        
                                <Text style={{color:colors.text,fontSize:12,top:5,display : lan ? 'none' : 'flex',letterSpacing:.9,fontFamily: 'Poppins_500Medium'}}>ভাষা</Text>
                                <Text style={{color:colors.text,fontSize:12,top:5,display : lan ? 'flex' : 'none',letterSpacing:.9,fontFamily: 'Poppins_500Medium',right:10}}>LANGUAGE:</Text>
                           
                            </View>
                            <View style={[styles.language,{width:'60%',marginBottom:70}]}>
                                <Pressable style={[styles.languagetuchabluebutton,{left:5,backgroundColor:English ? "#559B5D" : colors.white}]} onPress={pressEnglish}>
                                    <Text style={{fontSize:12,color:English ? colors.white : colors.text,display : lan ? 'none' : 'flex',fontFamily: 'Poppins_400Regular',letterSpacing:.9 }}>ইংরেজি</Text> 
                                    <Text style={{fontSize:12,color:English ? colors.white : colors.text,display : lan ? 'flex' : 'none',fontFamily: 'Poppins_400Regular',letterSpacing:.9 }}>English</Text> 
                                </Pressable>
                                <Pressable style={[styles.languagetuchabluebutton,{left:20,backgroundColor:Bangla ? "#559B5D" : colors.white}]} onPress={pressBangla}>
                                    <Text style={{fontSize:12 ,color:Bangla ? colors.white : colors.text,display : lan ? 'none' : 'flex',fontFamily: 'Poppins_400Regular',letterSpacing:.9}}>বাংলা</Text> 
                                    <Text style={{fontSize:12 ,color:Bangla ? colors.white : colors.text,display : lan ? 'flex' : 'none',fontFamily: 'Poppins_400Regular',letterSpacing:.9}}>Bangla</Text> 
                                </Pressable>
                            </View>
                        </View> */}

        </View>



      </ScrollView>
      <View style={{ marginBottom: 5, width: '95%', height: 38, borderColor: '#D50400', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: nointernet ? "flex" : "none" }}>
        <Text style={{ marginLeft: 15, fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: "#D50400" }}>No Internet Connection.</Text>
      </View>
      <View style={styles.footerStyle}>

        <View style={{ width: '100%', height: 65, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: colors.white }}>

          <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.red, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Homepage", {})}>

            <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/1_med.jpg")} />

            <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>বাসা অনসন্ধান করুন</Text>
            <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>HOME</Text>

          </Pressable>

          <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.dblue, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Reminder", {})}>
            <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/2_reminder.jpg")} />
            <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
            <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>REMINDER</Text>

          </Pressable>



          <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.dblue, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Services", {})}>

            <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/services.jpg")} />
            <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
            <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>SERVICES</Text>

          </Pressable>


          <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.green, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Heathmart", {})}>

            <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/estore.jpg")} />
            <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>বাসা অনসন্ধান করুন</Text>
            <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>E-STORE</Text>

          </Pressable>


          <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.dblue, borderBottomWidth: 0 }]} onPress={() => navigation.navigate("Promohome", {})}>

            <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require('../assets/top_right_promo.jpg')} />
            <Text style={{ top: 4, color: colors.black, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
            <Text style={{ top: 7.8, color: colors.ash, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>PROMO</Text>

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
  body1: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  body2: {
    flex: 1,
    // paddingBottom:30,
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  navbar1: {

    backgroundColor: colors.white,
    width: '60%',
    height: 40,
    left: 50,

  },


  inputdiv: {
    // width:"95%",
    // height:84,
    // justifyContent: "center",
    // alignItems:'center',  
    // paddingBottom:10,
    // //top:-100

    width: "98%",
    height: 60,
    // justifyContent: "center",
    // alignItems:'center',  
    paddingBottom: 10,
    //top:-100

  },

  input: {
    // width:"98%",
    // height:55,
    // borderColor:'#C7C8D2',
    // borderWidth:1,
    // alignItems:'center', 
    // padding:10,
    // borderRadius:4,
    // fontSize:14,
    width: "85%",
    height: 40,
    borderColor: '#C7C8D2',
    borderBottomWidth: 1,
    alignItems: 'center',
    padding: 5,
    paddingBottom: 0,
    borderRadius: 4,
    fontSize: 12,
    justifyContent: 'space-between'
  },


  navbar: {

    // backgroundColor: colors.white,
    // width:'100%',
    // height:50,
    backgroundColor: colors.white,
    width: '100%',
    height: 55,

    shadowColor: '#000',
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 6,
  },
  sendform: {

    width: "100%",
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 10
    // marginBottom: 40
  },

  tuchabluebutton: {
    // paddingTop:20,
    width: "93%",
    height: 35,
    borderRadius: 4,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: 'center',
    top: 20

  },
  languagetuchabluebutton: {
    width: "35%",
    height: 28,
    borderRadius: 0,
    borderColor: colors.ash1,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  language: {
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row',
    top: 40,
  },
  notifiactions: {
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row',
    top: 40,
  },

});

export default ChangePinPage;





