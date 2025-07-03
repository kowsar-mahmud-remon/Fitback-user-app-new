import React, { useState, useEffect, useCallback } from 'react';


import { Button, View, StyleSheet, Text } from 'react-native';
import * as TaskManager from 'expo-task-manager';

import RootStack from './navigator/RootStack';

import * as Notifications from 'expo-notifications';

//Async-Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentailcontex 
import { CredentialsContext } from './components/CredintailsContext';

//WellcomeContext
import { WellcomeContext } from './components/CredintailsContext';

//UserContext
import { UserContext } from './components/CredintailsContext';

import * as SplashScreen from 'expo-splash-screen';

// import axios from 'axios';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_100Thin,
  // Poppins_100ExtraLight ,
  // Poppins_100Light,
  Poppins_500Medium,
  // Poppins_600SemiBold,
  Poppins_700Bold,
  // Poppins_800ExtraBold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';

const BACKGROUND_TASK_NAME = 'myBackgroundTask';

export default function App() {


  const [noficationtoken, setNoficationtoken] = useState("");

  const [authtoken, setAuthtoken] = useState('Token 297bd729b4bb0758c8bde98fe0c6e51720641b98');

  const [noficationid, setNoficationid] = useState("");
  const [sound, setSound] = useState("");

  const [appIsReady, setAppIsReady] = useState(false);

  const [storeCredentials, setStoreCredentials] = useState("");

  const [storeWellcome, setStoreWellcome] = useState("");

  const [testCredentials, setTestCredentials] = useState("");

  const [getProduct, setGetProduct] = useState(true);
  const [getProductdata1, setGetProductdata1] = useState([]);
  const [getdiscount, setGetdiscount] = useState("8");
  const [getdiscountproduct, setGetdiscountproduct] = useState("5");

  const [getProduct1, setGetProduct1] = useState(true);
  const [getProductdata, setGetProductdata] = useState([]);

  const [getDis, setGetDis] = useState(true);

  const [getall, setGetall] = useState([]);
  const [getallf, setGetallf] = useState([]);

  const [getpromo, setGetpromo] = useState(true);
  const [promo, setPromo] = useState([]);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Please enable notifications to get reminders!');
      }
    };

    requestPermissions();
  }, []);


  // do you task here

  TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {

    try {

      const UpdateRemainder = async (reminderid, stock) => {


        const requestOptions = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Token 297bd729b4bb0758c8bde98fe0c6e51720641b98' },
          body: JSON.stringify({

            quantityinstock: stock

          })
        };

        fetch('https://qwikmedic.pythonanywhere.com/medicineReminder/' + reminderid, requestOptions)
          .then((response) => response.json())
          .then((json) => {

          })
          .catch((error) => {

          });
      };

      const sendNotification = async () => {
        const message = {
          to: noficationtoken,
          //   sound: 'default',
          //   sound: 'object',
          //   sound: ['custom_sound.wav'], 
          title: 'Test Notification',
          body: 'This is a test notification',
          //   data: {objectId: '1', sound: 'custom_sound.mp3'},
          data: { objectId: '6', sound: 'http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
      };

      let date = new Date();
      let todayDate = String(date.getDate().toString().padStart(2, "0") + '/' + (date.getMonth() + 1).toString().padStart(2, "0") + '/' + date.getFullYear());


      let day = new Date().getDate();

      let month = new Date().getMonth() + 1;

      let tempDate = new Date();

      let hournew = tempDate.getHours() >= 10 ? tempDate.getHours() : '0' + tempDate.getHours();
      let minnew = tempDate.getMinutes() >= 10 ? tempDate.getMinutes() : '0' + tempDate.getMinutes();
      let type = 'AM';
      if (tempDate.getHours() >= 12) {
        hournew = tempDate.getHours() % 12 >= 10 ? tempDate.getHours() % 12 : '0' + tempDate.getHours() % 12;
        type = 'PM';
      }
      let fTime = hournew + ' : ' + minnew + '  ' + type;

      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Token 297bd729b4bb0758c8bde98fe0c6e51720641b98' },
      };

      await fetch('https://qwikmedic.pythonanywhere.com/medicineReminder', requestOptions)
        .then((response) => response.json())
        .then((json) => {

          // console.log("my json data is here: ",json)
          json.map((item, index) => {



            if (testCredentials.userid == item.userid) {

              if ((item.doseLengthType == 'EveryDay' &&
                (((parseInt(item.alarmStartDate.slice(0, 2)) <= parseInt(day)) && (parseInt(item.alarmStartDate.slice(3, 5)) == month)) || (parseInt(item.alarmStartDate.slice(3, 5)) < month)))
                ||
                ((item.doseLengthType == 'Customize') && // same month
                  ((parseInt(item.alarmStartDate.slice(0, 2)) <= parseInt(day)) && (parseInt(item.alarmEndDate.slice(0, 2)) >= parseInt(day)) && (parseInt(item.alarmStartDate.slice(3, 5)) == month) && (parseInt(item.alarmEndDate.slice(3, 5)) == month)))

                ||
                ((item.doseLengthType == 'Customize') && // start month
                  ((parseInt(item.alarmStartDate.slice(0, 2)) <= parseInt(day)) && (parseInt(item.alarmStartDate.slice(3, 5)) == month) && (parseInt(item.alarmEndDate.slice(3, 5)) > month)))

                ||
                ((item.doseLengthType == 'Customize') && // end month
                  ((parseInt(item.alarmEndDate.slice(0, 2)) >= parseInt(day)) && (parseInt(item.alarmStartDate.slice(3, 5)) < month) && (parseInt(item.alarmEndDate.slice(3, 5)) == month)))

                ||
                ((item.doseLengthType == 'Customize') && //middle running
                  ((parseInt(item.alarmStartDate.slice(3, 5)) < month) && (parseInt(item.alarmEndDate.slice(3, 5)) > month)))

              ) {

                if (fTime == item.dose1time || fTime == item.dose2time || fTime == item.dose3time || fTime == item.dose4time) {

                  const stock = parseInt(item.quantityinstock) >= 1 ? parseInt(item.quantityinstock) - 1 : 0;

                  UpdateRemainder(item.id, stock);
                  sendNotification();

                  // console.log(item)
                }

              }

            }
            // else if('1' == item.userid && item.doseLengthType == "Customize"){

            //   if((todayDate == item.alarmStartDate || todayDate == item.alarmEndDate) && (fTime == item.dose1time || fTime == item.dose2time || fTime == item.dose3time || fTime == item.dose4time))
            //   {
            //     sendNotification()
            //     console.log(item)
            //   }

            // }

          });


        })
        .catch((error) => {
          console.error(error);

        });

      // return BackgroundFetch.Result.NewData;


    }

    catch (error) {
      // console.log('Background task error:', error);
      // return BackgroundFetch.Result.Failed;
    }

    // }
    // console.log("ia ma hereereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee  noficationtoken",noficationtoken ,"testCredentials.userid : " ,testCredentials.userid)
    // return BackgroundFetch.Result.NewData;
  });






  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_100Thin,
    // Poppins_100ExtraLight ,
    // Poppins_100Light,
    Poppins_500Medium,
    // Poppins_600SemiBold,
    Poppins_700Bold,
    // Poppins_800ExtraBold,
    Poppins_900Black,
  });

  const Discount = async () => {
    try {
      if (getDis) {

        const requestOptions1 = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Token 297bd729b4bb0758c8bde98fe0c6e51720641b98' },
        };

        fetch('https://qwikmedic.pythonanywhere.com/companyContacts/' + 1, requestOptions1)
          .then((response) => response.json())
          .then((json) => {

            setGetdiscount(json.medicinediscount);
            setGetdiscountproduct(json.productdiscount);

          })
          .catch((error) => {

          });


      }

    }
    catch (error) {
    } finally {

    }

    setGetDis(false);


  };

  const ProductInfo = async () => {
    try {
      if (getProduct) {

        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Token 297bd729b4bb0758c8bde98fe0c6e51720641b98' },
        };

        await fetch('https://qwikmedic.pythonanywhere.com/medicineNewData', requestOptions)
          .then((response) => response.json())
          .then((json) => {


            setGetProductdata1(json);


          })
          .catch((error) => {
            console.error(error);
            setLoading1(false);
          });

        const requestOptions1 = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Token 297bd729b4bb0758c8bde98fe0c6e51720641b98' },
        };

        await fetch('https://qwikmedic.pythonanywhere.com/companyContacts/' + 1, requestOptions1)
          .then((response) => response.json())
          .then((json) => {

            setGetdiscount(json.medicinediscount);

          })
          .catch((error) => {

          });


      }

    }
    catch (error) {
    } finally {

    }

    setGetProduct(false);


  };

  const ProductInfo1 = async () => {
    try {
      if (getProduct1) {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Token 297bd729b4bb0758c8bde98fe0c6e51720641b98' },
        };

        await fetch('https://qwikit1.pythonanywhere.com/product', requestOptions)
          .then((response) => response.json())
          .then((json) => {
            // setGetProductdata(json.reverse())
            setGetProductdata(json);
            setGetall(json);
            setGetallf(json);


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
    }

    finally {


    }

    setGetProduct1(false);


  };

  const Promoimage = () => {

    if (getpromo) {

      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Token 297bd729b4bb0758c8bde98fe0c6e51720641b98' },
      };

      fetch('https://qwikmedic.pythonanywhere.com/promotionaladdImage', requestOptions)
        .then((response) => response.json())
        .then((json) => {

          setPromo(json);

        })
        .catch((error) => {

        });

      setGetpromo(false);
    }
  };


  SplashScreen.preventAutoHideAsync();

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('qwikmedicLogin').then((result) => {
      if (result !== null) {
        setStoreCredentials(JSON.parse(result));
      }
      else {
        setStoreCredentials(null);
      }
    }).catch(error => console.log(error));
  };


  const checkWelcome3page = () => {
    AsyncStorage.getItem('qwikmedicwellcome3page').then((result) => {
      if (result !== null) {
        setStoreWellcome(JSON.parse(result));
      }
      else {
        setStoreWellcome(null);
      }
    }).catch(error => console.log(error));
  };

  const checkuser = () => {
    AsyncStorage.getItem('checkuserid').then((result) => {
      if (result !== null) {
        setTestCredentials(JSON.parse(result));
      }
      else {
        setTestCredentials(null);
      }
    }).catch(error => console.log(error));
  };

  useEffect(() => {


    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources

        checkLoginCredentials();
        checkWelcome3page();
        checkuser();

        ProductInfo1();

        await SplashScreen.hideAsync();
        // Pre-load fonts, make any API calls you need to do here

      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();

  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {

      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;

  }



  if (!fontsLoaded) {
    // return <AppLoading />;
  } else {
    return (
      <WellcomeContext.Provider value={{ storeWellcome, setStoreWellcome, noficationtoken, setNoficationtoken, noficationid, setNoficationid, getProductdata1, setGetProductdata1, getdiscount, setGetdiscount, getdiscountproduct, setGetdiscountproduct, getProductdata, setGetProductdata, getall, setGetall, getallf, setGetallf, promo, setPromo, authtoken, setAuthtoken }}>
        <CredentialsContext.Provider value={{ storeCredentials, setStoreCredentials, noficationtoken, setNoficationtoken, noficationid, setNoficationid, getProductdata1, setGetProductdata1, getdiscount, setGetdiscount, getdiscountproduct, setGetdiscountproduct, getProductdata, setGetProductdata, getall, setGetall, getallf, setGetallf, promo, setPromo, authtoken, setAuthtoken }}>
          <UserContext.Provider value={{ testCredentials, setTestCredentials, noficationtoken, setNoficationtoken, noficationid, setNoficationid, getProductdata1, setGetProductdata1, getdiscount, setGetdiscount, getdiscountproduct, setGetdiscountproduct, getProductdata, setGetProductdata, getall, setGetall, getallf, setGetallf, promo, setPromo, authtoken, setAuthtoken }}>

            <RootStack />

            {/* <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
          </View> */}
            {/* <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
          </View> */}
          </UserContext.Provider>
        </CredentialsContext.Provider>
      </WellcomeContext.Provider>

    );
  }


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

