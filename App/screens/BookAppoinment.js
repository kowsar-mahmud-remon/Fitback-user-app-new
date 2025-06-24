import React, { useState, useEffect, useContext, useRef } from 'react';
import { FlatList, Animated, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Switch, Pressable, Text, ScrollView, TextInput, Image, Linking, Platform } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';

import Svg, { Path, Circle, SvgUri, G, Defs, ClipPath, Rect } from "react-native-svg";
import DateTimePicker from '@react-native-community/datetimepicker';

import { UserContext } from '../../components/CredintailsContext';

import CheckBox from 'expo-checkbox';

import RadioForm from 'react-native-simple-radio-button';


import AsyncStorage from '@react-native-async-storage/async-storage';

import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

import { January, February, March, April, May, June, July, August, September, October, November, December } from './adressdata';

function BookAppoinment({ navigation, route }) {
    const [unread, setUnread] = useState(false);

    const [getnotify, setGetnotify] = useState(true);

    const [reloading, setReloading] = useState(true);

    const [rqstid, setRqstid] = useState(null);

    const [successorder, setSuccessorder] = useState(false);

    const { authtoken, setAuthtoken } = useContext(UserContext);
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

    const fadeIn2 = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {

            setSuccessorder(false);

            navigation.navigate("Services", {});


        });

    };

    // const options2 = [
    //     { label: <Bkash/>, value: 'Bkash' },
    //     { label: <Roket/>, value: 'Roket' },
    //     { label: <Islami/>, value: 'IslamiBank' },
    //   ];

    const options2 = [
        { label: 'Bkash', value: 'Bkash' },
        { label: 'Roket', value: 'Roket' },
        { label: 'Nagad', value: 'Nagad' },
    ];

    const options4 = [
        { label: 'Father', value: 'Father' },
        { label: 'Mother', value: 'Mother' },
        { label: 'Brother', value: 'Brother' },
        { label: 'Sister', value: 'Sister' },
        { label: 'Wife', value: 'Wife' },
        { label: 'Child', value: 'Child' },
        { label: 'Others', value: 'Others' }
    ];

    const [paymenttype, setpaymenttype] = useState("Digital_payment");
    const [paymentmethod, setPaymentmethod] = useState('Bkash');


    const [reationmethod, setReationmethod] = useState('Father');

    const [medicineitem, setMedicineitem] = useState(route.params.medicineitem);
    const [flag, setFlag] = useState(false);

    const [medicinename, setMedicinename] = useState(null);
    const [genericname, setGenericname] = useState(null);
    const [image1, setImage1] = useState("");


    const { testCredentials, setTestCredentials } = useContext(UserContext);
    const [lan, setLan] = useState(true);
    const [userid, setUserid] = useState(testCredentials.userid);

    const [terms, setTerms] = useState(false);
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


    const [productNumber, setProductNumber] = useState(1);
    const [productNumber1, setProductNumber1] = useState(1);
    const [productNumber2, setProductNumber2] = useState(1);

    const [getProduct, setGetProduct] = useState(true);
    const [openhistory, setOpenhistory] = useState(false);
    const [emptyHistory, setEmptyHistory] = useState(true);

    const [getProductdata, setGetProductdata] = useState(null);

    const [selectOthers, setSelectOthers] = useState(false);

    const [voutureflag, setVoutureflag] = useState(true);

    const [todaymyslotarray, setTodaymyslotarray] = useState([]);

    // var morningf = []
    // var afternoonf = []
    // var nightf = []
    // var eveningf = []

    //INPUTTEXT VALUE

    const [doctor, setDoctor] = useState(route.params.doctorprofile);

    //  const [doctoravailabletimeslot, setDoctoravailabletimeslot]= useState(route.params.doctorprofile.availabletimeslot)

    const [phonep, setPhone] = useState(route.params.phonep);
    const [namep, setName] = useState(route.params.namep);
    const [nicknamep, setNickname] = useState(route.params.nicknamep);
    const [cities, setCities] = useState("Dhaka");
    const [areap, setArea] = useState(route.params.areap);
    const [emailp, setEmail] = useState(route.params.emailp);
    const [postcodep, setPostcode] = useState(route.params.postcodep);
    const [streetNop, setStreetNo] = useState(route.params.streetNop);
    const [clusternamep, setClustername] = useState(route.params.clusternamep);
    const [emgphonenumberp, setEmgphonenumber] = useState(route.params.emgphonenumberp);

    //  const [availabletimeslot, setAvailabletimeslot= useState(route.params.emgphonenumberp)


    const [dateofbathp, setDateofbath] = useState(route.params.dateofbathp);
    const [bloodgroupp, setBloodgroup] = useState(route.params.bloodgroupp);
    const [genderp, setGender] = useState(route.params.genderp);
    const [agep, setAge] = useState(route.params.agep);
    const [heightp, setHeight] = useState(route.params.heightp);
    const [weightp, setWeight] = useState(route.params.weightp);
    const [bloodpressurep, setBloodpressure] = useState(route.params.bloodpressurep);
    const [altphonenumberp, setAltphonenumber] = useState(route.params.altphonenumberp);
    const [occupationp, setOccupation] = useState(route.params.occupationp);

    const [allergiesp, setAllergiesp] = useState(route.params.allergiesp);
    const [injuriesp, setInjuriesp] = useState(route.params.injuriesp);
    const [surgeriesp, setSurgeriesp] = useState(route.params.surgeriesp);
    const [diabetesp, setDiabetesp] = useState(route.params.diabetesp);
    const [smokingp, setSmokingp] = useState(route.params.smokingp);
    const [alcoholp, setAlcoholp] = useState(route.params.alcoholp);
    const [walkingp, setWalkingp] = useState(route.params.walkingp);
    const [junkp, setJunkp] = useState(route.params.junkp);
    const [gymp, setGymp] = useState(route.params.gymp);
    const [mypetientsp, setMypetientsp] = useState(route.params.mypetientsp);

    const [streetNo1, setStreetNo1] = useState(route.params.areap + ", " + route.params.streetNop + ", " + "Dhaka " + route.params.postcodep);

    const [patientName, setPatientName] = useState("");
    const [relation, setRelation] = useState("Father");
    const [promo, setPromo] = useState("");
    const [promostatus, setPromostatus] = useState(false);


    const [morning, setmorning] = useState([]);
    const [afternoon, setafternoon] = useState([]);
    const [night, setnight] = useState([]);
    const [evening, setevening] = useState([]);

    const [morningf, setMorningf] = useState([]);
    const [afternoonf, setAfternoonf] = useState([]);
    const [nightf, setNightf] = useState([]);
    const [eveningf, setEveningf] = useState([]);

    const [remindme, setremindme] = useState(true);
    const toggleSwitch3 = () => setremindme(previousState => !previousState);


    const [text, setText] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [isLoading123, setLoading123] = useState(true);
    const [voucherstatus, setVoucherstatus] = useState(false);
    const [submitflag, setSubmitflag] = useState(false);

    const [totalamount, setTotalamount] = useState(doctor.videofee);

    const [bookedlist, setBookedlist] = useState(doctor.bookedschedulelist);

    const [bookingarray, setBookingarray] = useState([]);

    const [getaccount, setGetaccount] = useState(true);
    const [getaccountdata, setGetaccountdata] = useState([]);

    const [nointernet, setNointernet] = useState(false);
    const [isLoading1, setLoading1] = useState(true);

    const [arrayloading, setArrayloading] = useState(true);

    const [promovalue, setPromovalue] = useState(0.00);

    const [empty, setEmpty] = useState(true);

    const [note, setNote] = useState(null);

    const [freType, setfreType] = useState("Family physicians");
    const [pick1, setPick1] = useState("Quazi Tarikul Islam");
    const [pick2, setPick2] = useState("10.00 - 10.30");

    const [pick3, setPick3] = useState("After Meal");
    const [pick4, setPick4] = useState("After Meal");

    const freType1 = ["Family physicians", "Internists", "Emergency physicians"];
    const freType2 = ["Quazi Tarikul Islam", "Lutfor Rahman", "Kamrul Islam"];
    const freType3 = ["10.00 - 10.30", "11.00 - 11.30", "12.00 - 12.30"];

    const [date, setDate] = useState(new Date());

    const [date1, setDate1] = useState(new Date());

    const [myDate, setMyDate] = useState(String(date.getDate().toString().padStart(2, "0") + '/' + (date.getMonth() + 1).toString().padStart(2, "0") + '/' + date.getFullYear()));

    const [todayDatetest, setTodayDatetest] = useState(String(date.getDate().toString().padStart(2, "0") + '/' + (date.getMonth() + 1).toString().padStart(2, "0") + '/' + date.getFullYear()));

    // const [todayDatetest, setTodayDatetest] = useState(String( date.getDate().toString().padStart(2, "0") + '/' +  (date.getMonth() + 1).toString().padStart(2, "0")  + '/' + date.getFullYear()));

    const [startDate, setStartDate] = useState(String(date.getDate().toString().padStart(2, "0") + '/' + (date.getMonth() + 1).toString().padStart(2, "0") + '/' + date.getFullYear()));

    const [endDate, setEndDate] = useState(String(date.getDate().toString().padStart(2, "0") + '/' + (date.getMonth() + 1).toString().padStart(2, "0") + '/' + date.getFullYear()));

    // console.log('date1: ',date.getDate().toString().padStart(2, "0"))
    // console.log('endDate: ',String(date).slice(0,5))

    const { noficationtoken, setNoficationtoken } = useContext(UserContext);


    const [startDay, setStartDay] = useState(parseInt(date.getDate()));
    const [startMonth, setStartMonth] = useState(parseInt((date.getMonth() + 1)));


    const [todayDate, setTodayDate] = useState(String(new Date()));

    const [tmonth, setTmonth] = useState(new Date().getMonth() + 1);
    // const [tmonth, setTmonth] = useState(3);

    const [tyear, setTyear] = useState(new Date().getFullYear());

    const [wrongstart, setWrongstart] = useState(false);
    const [wrongend, setWrongend] = useState(false);
    const [olddate, setOlddate] = useState(false);

    const [dayesdata, setDayesdata] = useState(new Date().getMonth() + 1 == 1 ? January : new Date().getMonth() + 1 == 2 ? February : new Date().getMonth() + 1 == 3 ? March : new Date().getMonth() + 1 == 4 ? April : new Date().getMonth() + 1 == 5 ? May : new Date().getMonth() + 1 == 6 ? June : new Date().getMonth() + 1 == 7 ? July : new Date().getMonth() + 1 == 8 ? August : new Date().getMonth() + 1 == 9 ? September : new Date().getMonth() + 1 == 10 ? October : new Date().getMonth() + 1 == 11 ? November : December);
    // console.log(dayesdata)
    const [tdate, setTdate] = useState(parseInt(todayDate.slice(8, 11)));
    // console.log(typeof(tdate))


    const [time, setTime] = useState(null);
    const [time1, setTime1] = useState(null);
    const [time2, setTime2] = useState(null);
    const [time3, setTime3] = useState(null);

    let hournew = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
    let minnew = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    let type = 'AM';
    if (date.getHours() >= 12) {
        hournew = date.getHours() % 12 >= 10 ? date.getHours() % 12 : '0' + date.getHours() % 12;
        type = 'PM';
    }
    let fTime = hournew + ' : ' + minnew + '  ' + type;
    // setTime(fTime)

    const [price, setPrice] = useState(600);


    const [hour1, setHour1] = useState(null);
    const [minute1, setMinute1] = useState(null);

    const [hour2, setHour2] = useState(null);
    const [minute2, setMinute2] = useState(null);

    const [hour3, setHour3] = useState(null);
    const [minute3, setMinute3] = useState(null);

    const [hour4, setHour4] = useState(null);
    const [minute4, setMinute4] = useState(null);


    const [showdate, setShowdate] = useState(false);
    const [showdate1, setShowdate1] = useState(false);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [test, setTest] = useState(false);

    const [select, setSelect] = useState(false);

    const [editId, setEditId] = useState(null);

    const [ch1, setCh1] = useState(null);
    const [ch2, setCh2] = useState(null);
    const [ch3, setCh3] = useState(null);
    const [ch4, setCh4] = useState(null);
    const [ch5, setCh5] = useState(null);
    const [ch6, setCh6] = useState(null);
    const [ch7, setCh7] = useState(null);


    const [selectOption, setSelectOption] = useState("Myself");

    const [fstcall, setFstcall] = useState(true);

    const [editapnt, setEditapnt] = useState(false);

    // const [selectDate, setSelectDate] = useState(tdate);
    const [selectDate, setSelectDate] = useState(tdate);
    const [selectMonth, setSelectMonth] = useState(tmonth);

    const [morningshow, setMorningshow] = useState(false);
    const [afternoonshow, setAfternoonshow] = useState(false);
    const [eveningshow, setEveningshow] = useState(false);
    const [nightshow, setNightshow] = useState(false);


    const [slotitem, setSlotitem] = useState([]);
    const [slottime, setSlottime] = useState("");
    const [slottimedoc, setSlottimedoc] = useState("");
    const [slotdatedoc, setSlotdatedoc] = useState("");

    const [dosetype, setDosetype] = useState('EveryDay');

    const options1 = [
        { label: 'Continue', value: 'EveryDay' },
        { label: 'Customize', value: 'Customize' }
    ];

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn4 = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
        }).start(() => { setWrongstart(false); });

    };

    const fadeIn5 = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
        }).start(() => { setWrongend(false); });

    };

    const fadeIn6 = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
        }).start(() => { setOlddate(false); });

    };


    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowdate(false);
        setDate(currentDate);
        let tempDate = new Date(currentDate);

        if (tempDate.getDate() >= tdate && (tempDate.getMonth() + 1) == tmonth && tempDate.getFullYear() == tyear) {

            let fDate = String(tempDate.getDate().toString().padStart(2, "0") + '/' + (tempDate.getMonth() + 1).toString().padStart(2, "0") + '/' + tempDate.getFullYear());

            if ((todayDatetest != endDate) && (parseInt(endDate.slice(0, 2)) < parseInt(fDate.slice(0, 2))) && (parseInt(endDate.slice(3, 5)) <= parseInt(fDate.slice(3, 5)))) {
                setWrongstart(true);
                fadeIn4();

            }
            else {
                setStartDate(fDate);
            }

        }
        else if ((tempDate.getMonth() + 1) > tmonth && tempDate.getFullYear() == tyear) {

            let fDate = String(tempDate.getDate().toString().padStart(2, "0") + '/' + (tempDate.getMonth() + 1).toString().padStart(2, "0") + '/' + tempDate.getFullYear());

            if ((todayDatetest != endDate) && (parseInt(endDate.slice(0, 2)) < parseInt(fDate.slice(0, 2))) && (parseInt(endDate.slice(3, 5)) <= parseInt(fDate.slice(3, 5)))) {
                setWrongstart(true);
                fadeIn4();

            }
            else {
                setStartDate(fDate);
            }

        }

        else if (tempDate.getFullYear() > tyear) {

            let fDate = String(tempDate.getDate().toString().padStart(2, "0") + '/' + (tempDate.getMonth() + 1).toString().padStart(2, "0") + '/' + tempDate.getFullYear());

            if ((todayDatetest != endDate) && (parseInt(endDate.slice(0, 2)) < parseInt(fDate.slice(0, 2))) && (parseInt(endDate.slice(3, 5)) <= parseInt(fDate.slice(3, 5)))) {
                setWrongstart(true);
                fadeIn4();

            }
            else {
                setStartDate(fDate);
            }

        }
        else {

            setDate(new Date());
            setOlddate(true);
            fadeIn6();

        }

    };

    const onChangeDate1 = (event, selectedDate) => {
        const currentDate = selectedDate || date1;
        setShowdate1(false);
        setDate1(currentDate);
        let tempDate = new Date(currentDate);


        if (tempDate.getDate() >= tdate && (tempDate.getMonth() + 1) == tmonth && tempDate.getFullYear() == tyear) {

            let fDate = String(tempDate.getDate().toString().padStart(2, "0") + '/' + (tempDate.getMonth() + 1).toString().padStart(2, "0") + '/' + tempDate.getFullYear());

            if ((parseInt(fDate.slice(0, 2)) < parseInt(startDate.slice(0, 2))) && (parseInt(fDate.slice(3, 5)) <= parseInt(startDate.slice(3, 5)))) {
                setWrongend(true);
                fadeIn5();

            }
            else {
                setEndDate(fDate);
            }

        }
        else if ((tempDate.getMonth() + 1) > tmonth && tempDate.getFullYear() == tyear) {


            let fDate = String(tempDate.getDate().toString().padStart(2, "0") + '/' + (tempDate.getMonth() + 1).toString().padStart(2, "0") + '/' + tempDate.getFullYear());

            if ((parseInt(fDate.slice(0, 2)) < parseInt(startDate.slice(0, 2))) && (parseInt(fDate.slice(3, 5)) <= parseInt(startDate.slice(3, 5)))) {
                setWrongend(true);
                fadeIn5();

            }
            else {
                setEndDate(fDate);
            }


        }

        else if (tempDate.getFullYear() > tyear) {

            let fDate = String(tempDate.getDate().toString().padStart(2, "0") + '/' + (tempDate.getMonth() + 1).toString().padStart(2, "0") + '/' + tempDate.getFullYear());

            if ((parseInt(fDate.slice(0, 2)) < parseInt(startDate.slice(0, 2))) && (parseInt(fDate.slice(3, 5)) <= parseInt(startDate.slice(3, 5)))) {
                setWrongend(true);
                fadeIn5();

            }
            else {
                setEndDate(fDate);
            }

        }
        else {

            setDate1(new Date());

            setOlddate(true);
            fadeIn6();

        }






    };


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let hournew = tempDate.getHours() >= 10 ? tempDate.getHours() : '0' + tempDate.getHours();
        let minnew = tempDate.getMinutes() >= 10 ? tempDate.getMinutes() : '0' + tempDate.getMinutes();
        let type = 'AM';
        if (tempDate.getHours() >= 12) {
            hournew = tempDate.getHours() % 12 >= 10 ? tempDate.getHours() % 12 : '0' + tempDate.getHours() % 12;
            type = 'PM';
        }
        let fTime = hournew + ' : ' + minnew + '  ' + type;
        setTest(fDate + '\n' + fTime);
        setTime(fTime);
        //    console.log(fTime.slice(9,12))

    };

    const onChange1 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow1(false);
        setDate(currentDate);


        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let hournew = tempDate.getHours() >= 10 ? tempDate.getHours() : '0' + tempDate.getHours();
        let minnew = tempDate.getMinutes() >= 10 ? tempDate.getMinutes() : '0' + tempDate.getMinutes();
        let type = 'AM';
        if (tempDate.getHours() >= 12) {
            hournew = tempDate.getHours() % 12 >= 10 ? tempDate.getHours() % 12 : '0' + tempDate.getHours() % 12;
            type = 'PM';
        }
        let fTime = hournew + ' : ' + minnew + '  ' + type;
        setTest(fDate + '\n' + fTime);
        setTime1(fTime);
        // console.log(fTime.slice(0,2))

    };

    const onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow2(false);

        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let hournew = tempDate.getHours() >= 10 ? tempDate.getHours() : '0' + tempDate.getHours();
        let minnew = tempDate.getMinutes() >= 10 ? tempDate.getMinutes() : '0' + tempDate.getMinutes();
        let type = 'AM';
        if (tempDate.getHours() >= 12) {
            hournew = tempDate.getHours() % 12 >= 10 ? tempDate.getHours() % 12 : '0' + tempDate.getHours() % 12;
            type = 'PM';
        }
        let fTime = hournew + ' : ' + minnew + '  ' + type;
        setTest(fDate + '\n' + fTime);
        setTime2(fTime);
        // console.log(fDate + ' (' + fTime + ')')

    };

    const onChange3 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow3(false);
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let hournew = tempDate.getHours() >= 10 ? tempDate.getHours() : '0' + tempDate.getHours();
        let minnew = tempDate.getMinutes() >= 10 ? tempDate.getMinutes() : '0' + tempDate.getMinutes();
        let type = 'AM';
        if (tempDate.getHours() >= 12) {
            hournew = tempDate.getHours() % 12 >= 10 ? tempDate.getHours() % 12 : '0' + tempDate.getHours() % 12;
            type = 'PM';
        }
        let fTime = hournew + ' : ' + minnew + '  ' + type;
        setTest(fDate + '\n' + fTime);
        setTime3(fTime);
        // console.log(fDate + ' (' + fTime + ')')

    };

    const showmode = () => {
        setShow(true);

    };

    const showmode1 = () => {
        setShow1(true);

    };

    const showmode2 = () => {
        setShow2(true);

    };

    const showmode3 = () => {
        setShow3(true);

    };

    const showmodedate = () => {
        setShowdate(true);

    };

    const showmodedate1 = () => {
        setShowdate1(true);

    };

    const setMainShowValue = () => {

        // setMorningf({})
        // setAfternoonf({})
        // setEveningf({})
        // setNightf({})

        // morningf = []
        // afternoonf = []
        // eveningf = []
        // nightf = []

        setReloading(true);



        // console.log("**************************** : ")
        morning.map((item, index) => {
            if (
                ( // same month
                    ((parseInt(item.appointmentdate.slice(0, 2)) == selectDate) && (parseInt(item.appointmentdate.slice(3, 5)) == selectMonth)))

            ) {
                // console.log(item.appointmentdate.slice(0,2),selectDate)
                morningf.push(item);
                // console.log(morningf)


            }

        });


        setReloading(false);
        setLoading1(false);


    };


    const [m1, setm1] = useState(new Date().getMonth() + 1 == 1 ? true : false);
    const [m2, setm2] = useState(new Date().getMonth() + 1 == 2 ? true : false);
    const [m3, setm3] = useState(new Date().getMonth() + 1 == 3 ? true : false);
    const [m4, setm4] = useState(new Date().getMonth() + 1 == 4 ? true : false);
    const [m5, setm5] = useState(new Date().getMonth() + 1 == 5 ? true : false);
    const [m6, setm6] = useState(new Date().getMonth() + 1 == 6 ? true : false);
    const [m7, setm7] = useState(new Date().getMonth() + 1 == 7 ? true : false);
    const [m8, setm8] = useState(new Date().getMonth() + 1 == 8 ? true : false);
    const [m9, setm9] = useState(new Date().getMonth() + 1 == 9 ? true : false);
    const [m10, setm10] = useState(new Date().getMonth() + 1 == 10 ? true : false);
    const [m11, setm11] = useState(new Date().getMonth() + 1 == 11 ? true : false);
    const [m12, setm12] = useState(new Date().getMonth() + 1 == 12 ? true : false);

    const [vid, setvid] = useState(true);
    const [cli, setcli] = useState(false);
    const [ho, setho] = useState(false);
    const [cal, setcal] = useState(false);



    const [slot1, setSlot1] = useState(true);
    const [slot2, setSlot2] = useState(true);
    const [slot3, setSlot3] = useState(true);

    const [slot4, setSlot4] = useState(true);
    const [slot5, setSlot5] = useState(true);
    const [slot6, setSlot6] = useState(true);

    const [slot7, setSlot7] = useState(true);
    const [slot8, setSlot8] = useState(true);
    const [slot9, setSlot9] = useState(true);

    const [slot10, setSlot10] = useState(true);
    const [slot11, setSlot11] = useState(true);
    const [slot12, setSlot12] = useState(true);



    const [slot1item, setSlot1item] = useState("");
    const [slot2item, setSlot2item] = useState("");
    const [slot3item, setSlot3item] = useState("");

    const [slot4item, setSlot4item] = useState("");
    const [slot5item, setSlot5item] = useState("");
    const [slot6item, setSlot6item] = useState("");

    const [slot7item, setSlot7item] = useState("");
    const [slot8item, setSlot8item] = useState("");
    const [slot9item, setSlot9item] = useState("");

    const [slot10item, setSlot10item] = useState("");
    const [slot11item, setSlot11item] = useState("");
    const [slot12item, setSlot12item] = useState("");


    const [slot13item, setSlot13item] = useState("");
    const [slot14item, setSlot14item] = useState("");
    const [slot15item, setSlot15item] = useState("");

    const [slot16item, setSlot16item] = useState("");
    const [slot17item, setSlot17item] = useState("");
    const [slot18item, setSlot18item] = useState("");

    const [slot19item, setSlot19item] = useState("");
    const [slot20item, setSlot20item] = useState("");
    const [slot21item, setSlot21item] = useState("");

    const [slot22item, setSlot22item] = useState("");
    const [slot23item, setSlot23item] = useState("");
    const [slot24item, setSlot24item] = useState("");


    const [slot1val, setSlot1val] = useState("");
    const [slot2val, setSlot2val] = useState("");
    const [slot3val, setSlot3val] = useState("");

    const [slot4val, setSlot4val] = useState("");
    const [slot5val, setSlot5val] = useState("");
    const [slot6val, setSlot6val] = useState("");

    const [slot7val, setSlot7val] = useState("");
    const [slot8val, setSlot8val] = useState("");
    const [slot9val, setSlot9val] = useState("");

    const [slot10val, setSlot10val] = useState("");
    const [slot11val, setSlot11val] = useState("");
    const [slot12val, setSlot12val] = useState("");


    const [slot13val, setSlot13val] = useState("");
    const [slot14val, setSlot14val] = useState("");
    const [slot15val, setSlot15val] = useState("");

    const [slot16val, setSlot16val] = useState("");
    const [slot17val, setSlot17val] = useState("");
    const [slot18val, setSlot18val] = useState("");

    const [slot19val, setSlot19val] = useState("");
    const [slot20val, setSlot20val] = useState("");
    const [slot21val, setSlot21val] = useState("");

    const [slot22val, setSlot22val] = useState("");
    const [slot23val, setSlot23val] = useState("");
    const [slot24val, setSlot24val] = useState("");


    const [slot1valdoc, setSlot1valdoc] = useState("");
    const [slot2valdoc, setSlot2valdoc] = useState("");
    const [slot3valdoc, setSlot3valdoc] = useState("");

    const [slot4valdoc, setSlot4valdoc] = useState("");
    const [slot5valdoc, setSlot5valdoc] = useState("");
    const [slot6valdoc, setSlot6valdoc] = useState("");

    const [slot7valdoc, setSlot7valdoc] = useState("");
    const [slot8valdoc, setSlot8valdoc] = useState("");
    const [slot9valdoc, setSlot9valdoc] = useState("");

    const [slot10valdoc, setSlot10valdoc] = useState("");
    const [slot11valdoc, setSlot11valdoc] = useState("");
    const [slot12valdoc, setSlot12valdoc] = useState("");


    const [slot13valdoc, setSlot13valdoc] = useState("");
    const [slot14valdoc, setSlot14valdoc] = useState("");
    const [slot15valdoc, setSlot15valdoc] = useState("");

    const [slot16valdoc, setSlot16valdoc] = useState("");
    const [slot17valdoc, setSlot17valdoc] = useState("");
    const [slot18valdoc, setSlot18valdoc] = useState("");

    const [slot19valdoc, setSlot19valdoc] = useState("");
    const [slot20valdoc, setSlot20valdoc] = useState("");
    const [slot21valdoc, setSlot21valdoc] = useState("");

    const [slot22valdoc, setSlot22valdoc] = useState("");
    const [slot23valdoc, setSlot23valdoc] = useState("");
    const [slot24valdoc, setSlot24valdoc] = useState("");



    const [slot1valdocdate, setSlot1valdocdate] = useState("");
    const [slot2valdocdate, setSlot2valdocdate] = useState("");
    const [slot3valdocdate, setSlot3valdocdate] = useState("");

    const [slot4valdocdate, setSlot4valdocdate] = useState("");
    const [slot5valdocdate, setSlot5valdocdate] = useState("");
    const [slot6valdocdate, setSlot6valdocdate] = useState("");

    const [slot7valdocdate, setSlot7valdocdate] = useState("");
    const [slot8valdocdate, setSlot8valdocdate] = useState("");
    const [slot9valdocdate, setSlot9valdocdate] = useState("");

    const [slot10valdocdate, setSlot10valdocdate] = useState("");
    const [slot11valdocdate, setSlot11valdocdate] = useState("");
    const [slot12valdocdate, setSlot12valdocdate] = useState("");


    const [slot13valdocdate, setSlot13valdocdate] = useState("");
    const [slot14valdocdate, setSlot14valdocdate] = useState("");
    const [slot15valdocdate, setSlot15valdocdate] = useState("");

    const [slot16valdocdate, setSlot16valdocdate] = useState("");
    const [slot17valdocdate, setSlot17valdocdate] = useState("");
    const [slot18valdocdate, setSlot18valdocdate] = useState("");

    const [slot19valdocdate, setSlot19valdocdate] = useState("");
    const [slot20valdocdate, setSlot20valdocdate] = useState("");
    const [slot21valdocdate, setSlot21valdocdate] = useState("");

    const [slot22valdocdate, setSlot22valdocdate] = useState("");
    const [slot23valdocdate, setSlot23valdocdate] = useState("");
    const [slot24valdocdate, setSlot24valdocdate] = useState("");



    const [t1, sett1] = useState(false);
    const [t2, sett2] = useState(false);
    const [t3, sett3] = useState(false);
    const [t4, sett4] = useState(false);
    const [t5, sett5] = useState(false);
    const [t6, sett6] = useState(false);
    const [t7, sett7] = useState(false);
    const [t8, sett8] = useState(false);
    const [t9, sett9] = useState(false);
    const [t10, sett10] = useState(false);
    const [t11, sett11] = useState(false);
    const [t12, sett12] = useState(false);

    const [t13, sett13] = useState(false);
    const [t14, sett14] = useState(false);
    const [t15, sett15] = useState(false);
    const [t16, sett16] = useState(false);
    const [t17, sett17] = useState(false);
    const [t18, sett18] = useState(false);
    const [t19, sett19] = useState(false);
    const [t20, sett20] = useState(false);
    const [t21, sett21] = useState(false);
    const [t22, sett22] = useState(false);
    const [t23, sett23] = useState(false);
    const [t24, sett24] = useState(false);


    const Allfalse = () => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);


        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlot1val("");
        setSlot2val("");
        setSlot3val("");

        setSlot4val("");
        setSlot5val("");
        setSlot6val("");

        setSlot7val("");
        setSlot8val("");
        setSlot9val("");

        setSlot10val("");
        setSlot11val("");
        setSlot12val("");


        setSlot13val("");
        setSlot14val("");
        setSlot15val("");

        setSlot16val("");
        setSlot17val("");
        setSlot18val("");

        setSlot19val("");
        setSlot20val("");
        setSlot21val("");

        setSlot22val("");
        setSlot23val("");
        setSlot24val("");


        setSlot1item("");
        setSlot2item("");
        setSlot3item("");

        setSlot4item("");
        setSlot5item("");
        setSlot6item("");

        setSlot7item("");
        setSlot8item("");
        setSlot9item("");

        setSlot10item("");
        setSlot11item("");
        setSlot12item("");


        setSlot13item("");
        setSlot14item("");
        setSlot15item("");

        setSlot16item("");
        setSlot17item("");
        setSlot18item("");

        setSlot19item("");
        setSlot20item("");
        setSlot21item("");

        setSlot22item("");
        setSlot23item("");
        setSlot24item("");

        setSlot1valdoc("");
        setSlot2valdoc("");
        setSlot3valdoc("");

        setSlot4valdoc("");
        setSlot5valdoc("");
        setSlot6valdoc("");

        setSlot7valdoc("");
        setSlot8valdoc("");
        setSlot9valdoc("");

        setSlot10valdoc("");
        setSlot11valdoc("");
        setSlot12valdoc("");


        setSlot13valdoc("");
        setSlot14valdoc("");
        setSlot15valdoc("");

        setSlot16valdoc("");
        setSlot17valdoc("");
        setSlot18valdoc("");

        setSlot19valdoc("");
        setSlot20valdoc("");
        setSlot21valdoc("");

        setSlot22valdoc("");
        setSlot23valdoc("");
        setSlot24valdoc("");


        setSlot1valdocdate("");
        setSlot2valdocdate("");
        setSlot3valdocdate("");

        setSlot4valdocdate("");
        setSlot5valdocdate("");
        setSlot6valdocdate("");

        setSlot7valdocdate("");
        setSlot8valdocdate("");
        setSlot9valdocdate("");

        setSlot10valdocdate("");
        setSlot11valdocdate("");
        setSlot12valdocdate("");


        setSlot13valdocdate("");
        setSlot14valdocdate("");
        setSlot15valdocdate("");

        setSlot16valdocdate("");
        setSlot17valdocdate("");
        setSlot18valdocdate("");

        setSlot19valdocdate("");
        setSlot20valdocdate("");
        setSlot21valdocdate("");

        setSlot22valdocdate("");
        setSlot23valdocdate("");
        setSlot24valdocdate("");


        setSlotitem([]);
        setSlottime("");
        setSlottimedoc("");
        setSlotdatedoc("");

    };

    const Onpresst1 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(true);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);

    };
    const Onpresst2 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(true);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);


    };
    const Onpresst3 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(true);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);


    };
    const Onpresst4 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(true);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);


        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);


    };
    const Onpresst5 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(true);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);


    };
    const Onpresst6 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(true);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);


    };
    const Onpresst7 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(true);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);

    };
    const Onpresst8 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(true);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);

    };
    const Onpresst9 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(true);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);

    };
    const Onpresst10 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(true);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);


    };
    const Onpresst11 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(true);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);


    };
    const Onpresst12 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(true);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);


    };


    const Onpresst13 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(true);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);

    };
    const Onpresst14 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(true);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);


    };
    const Onpresst15 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(true);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);


    };
    const Onpresst16 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(true);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);


    };
    const Onpresst17 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(true);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);


    };
    const Onpresst18 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(true);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);


    };
    const Onpresst19 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(true);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);

    };
    const Onpresst20 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(true);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);

    };
    const Onpresst21 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(true);
        sett22(false);
        sett23(false);
        sett24(false);


        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);

    };
    const Onpresst22 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);


        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(true);
        sett23(false);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);


    };
    const Onpresst23 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(true);
        sett24(false);

        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);


    };
    const Onpresst24 = (slotval, slotvaldoc, datevaldoc, item) => {

        sett1(false);
        sett2(false);
        sett3(false);
        sett4(false);
        sett5(false);
        sett6(false);
        sett7(false);
        sett8(false);
        sett9(false);
        sett10(false);
        sett11(false);
        sett12(false);

        sett13(false);
        sett14(false);
        sett15(false);
        sett16(false);
        sett17(false);
        sett18(false);
        sett19(false);
        sett20(false);
        sett21(false);
        sett22(false);
        sett23(false);
        sett24(true);


        setSlotitem(item);
        setSlottime(slotval);
        setSlottimedoc(slotvaldoc);
        setSlotdatedoc(datevaldoc);


    };

    const [appointmenttype, setAppointmenttype] = useState("Video Call");


    const Onpressvid = () => {


        setvid(true);
        setcli(false);
        setho(false);
        setcal(false);
        setAppointmenttype("Video Call");
        if (voucherstatus) {

            setTotalamount(parseInt(doctor.videofee) - parseInt(promovalue));

        }
        else {
            setTotalamount(doctor.videofee);

        }
    };

    const Onpresscal = () => {


        setvid(false);
        setcli(false);
        setho(false);
        setcal(true);
        setAppointmenttype("Voice Call");

        if (voucherstatus) {

            setTotalamount(parseInt(doctor.audiofee) - parseInt(promovalue));

        }
        else {
            setTotalamount(doctor.audiofee);

        }

    };

    const Onpressho = () => {


        setvid(false);
        setcli(false);
        setho(true);
        setcal(false);
        setAppointmenttype("Home");
        if (voucherstatus) {

            setTotalamount(parseInt(doctor.homefee) - parseInt(promovalue));

        }
        else {
            setTotalamount(doctor.homefee);

        }

    };

    const Onpresscli = () => {


        setvid(false);
        setcli(true);
        setho(false);
        setcal(false);

        setAppointmenttype("Clinic");
        if (voucherstatus) {

            setTotalamount(parseInt(doctor.clinicfee) - parseInt(promovalue));

        }
        else {
            setTotalamount(doctor.clinicfee);

        }

    };


    const Onpressm1 = () => {

        setm1(true);
        setDayesdata(January);
        setSelectDate(tmonth == 1 ? tdate : 1);
        setSelectMonth(1);
        setm2(false);
        setm3(false);
        setm4(false);
        setm5(false);
        setm6(false);
        setm7(false);
        setm8(false);
        setm9(false);
        setm10(false);
        setm11(false);
        setm12(false);


        OnDatepress(selectDate, 1);
        // setMainShowValue()
    };

    const Onpressm2 = () => {
        setm1(false);
        setm2(true);
        setDayesdata(February);
        setSelectDate(tmonth == 2 ? tdate : 1);
        setSelectMonth(2);
        setm3(false);
        setm4(false);
        setm5(false);
        setm6(false);
        setm7(false);
        setm8(false);
        setm9(false);
        setm10(false);
        setm11(false);
        setm12(false);


        OnDatepress(selectDate, 2);
        // setMainShowValue()
    };

    const Onpressm3 = () => {
        setm1(false);
        setm2(false);
        setm3(true);
        setDayesdata(March);
        setSelectDate(tmonth == 3 ? tdate : 1);
        setSelectMonth(3);
        setm4(false);
        setm5(false);
        setm6(false);
        setm7(false);
        setm8(false);
        setm9(false);
        setm10(false);
        setm11(false);
        setm12(false);


        OnDatepress(selectDate, 3);
        // setMainShowValue()
    };
    const Onpressm4 = () => {
        setm1(false);
        setm2(false);
        setm3(false);
        setm4(true);
        setDayesdata(April);
        setSelectDate(tmonth == 4 ? tdate : 1);
        setSelectMonth(4);
        setm5(false);
        setm6(false);
        setm7(false);
        setm8(false);
        setm9(false);
        setm10(false);
        setm11(false);
        setm12(false);


        OnDatepress(selectDate, 4);
        // setMainShowValue()
    };
    const Onpressm5 = () => {
        setm1(false);
        setm2(false);
        setm3(false);
        setm4(false);
        setm5(true);
        setDayesdata(May);
        setSelectDate(tmonth == 5 ? tdate : 1);
        setSelectMonth(5);
        setm6(false);
        setm7(false);
        setm8(false);
        setm9(false);
        setm10(false);
        setm11(false);
        setm12(false);


        OnDatepress(selectDate, 5);
        // setMainShowValue()
    };
    const Onpressm6 = () => {
        setm1(false);
        setm2(false);
        setm3(false);
        setm4(false);
        setm5(false);
        setm6(true);
        setDayesdata(June);
        setSelectDate(tmonth == 6 ? tdate : 1);
        setSelectMonth(6);
        setm7(false);
        setm8(false);
        setm9(false);
        setm10(false);
        setm11(false);
        setm12(false);


        OnDatepress(selectDate, 6);
        // setMainShowValue()
    };

    const Onpressm7 = () => {
        setm1(false);
        setm2(false);
        setm3(false);
        setm4(false);
        setm5(false);
        setm6(false);
        setm7(true);
        setDayesdata(July);
        setSelectDate(tmonth == 7 ? tdate : 1);
        setSelectMonth(7);
        setm8(false);
        setm9(false);
        setm10(false);
        setm11(false);
        setm12(false);


        OnDatepress(selectDate, 7);
        // setMainShowValue()
    };
    const Onpressm8 = () => {
        setm1(false);
        setm2(false);
        setm3(false);
        setm4(false);
        setm5(false);
        setm6(false);
        setm7(false);
        setm8(true);
        setDayesdata(August);
        setSelectDate(tmonth == 8 ? tdate : 1);
        setSelectMonth(8);
        setm9(false);
        setm10(false);
        setm11(false);
        setm12(false);


        OnDatepress(selectDate, 8);
        // setMainShowValue()
    };
    const Onpressm9 = () => {
        setm1(false);
        setm2(false);
        setm3(false);
        setm4(false);
        setm5(false);
        setm6(false);
        setm7(false);
        setm8(false);
        setm9(true);
        setDayesdata(September);
        setSelectDate(tmonth == 9 ? tdate : 1);
        setSelectMonth(9);
        setm10(false);
        setm11(false);
        setm12(false);


        OnDatepress(selectDate, 9);
        // setMainShowValue()
    };
    const Onpressm10 = () => {
        setm1(false);
        setm2(false);
        setm3(false);
        setm4(false);
        setm5(false);
        setm6(false);
        setm7(false);
        setm8(false);
        setm9(false);
        setm10(true);
        setDayesdata(October);
        setSelectDate(tmonth == 10 ? tdate : 1);
        setSelectMonth(10);
        setm11(false);
        setm12(false);


        OnDatepress(selectDate, 10);
        // setMainShowValue()
    };
    const Onpressm11 = () => {
        setm1(false);
        setm2(false);
        setm3(false);
        setm4(false);
        setm5(false);
        setm6(false);
        setm7(false);
        setm8(false);
        setm9(false);
        setm10(false);
        setm11(true);
        setDayesdata(November);
        setSelectDate(tmonth == 11 ? tdate : 1);
        setSelectMonth(11);
        setm12(false);


        OnDatepress(selectDate, 11);
        // setMainShowValue()
    };
    const Onpressm12 = () => {
        setm1(false);
        setm2(false);
        setm3(false);
        setm4(false);
        setm5(false);
        setm6(false);
        setm7(false);
        setm8(false);
        setm9(false);
        setm10(false);
        setm11(false);
        setm12(true);
        setDayesdata(December);
        setSelectDate(tmonth == 12 ? tdate : 1);
        setSelectMonth(12);


        OnDatepress(selectDate, 12);
        // setMainShowValue()
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


    let formdata = new FormData();

    const ProductInfo = async () => {
        try {
            if (getProduct) {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                };

                await fetch('https://qwikmedic.pythonanywhere.com/PatientRequest', requestOptions)
                    .then((response) => response.json())
                    .then((json) => {

                        setGetProductdata(json.reverse());
                        // setGetProductdata([])
                        // console.log(json.reverse())
                        setLoading1(false);


                        setNointernet(false);
                        // setLoading1(false)

                    })
                    .catch((error) => {
                        console.error(error);
                        setNointernet(true);
                        setLoading1(true);
                    });


            }

            // console.log("hit");
        }
        catch (error) {
            console.error(error);
            setLoading1(true);
        } finally {

            setLoading123(false);

        }

        setGetProduct(false);


    };


    const [checkdata, setCheckdata] = useState(true);



    const Getdata = () => {
        if (checkdata) {

            getProductdata.map((item, index) => {
                if (item.userid == userid && item.activestatus) {

                    morning.push(item);
                    setMorningshow(true);

                    setEmpty(false);

                }
                if (item.userid == userid && item.activestatus == false) {
                    afternoon.push(item);
                    setMorningshow(true);

                    setEmptyHistory(false);

                }
                setLoading1(false);


            });
            setMainShowValue();
            // setMainShowValue()
        }
        setArrayloading(false);
        setCheckdata(false);

    };



    const todaystart = () => {
        setDate(new Date());
        setStartDate(todayDatetest);
    };

    const todayend = () => {
        setDate1(new Date());
        setEndDate(todayDatetest);
    };


    const pickImage = async () => {



        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing :true,
            aspect: [4, 3],
            quality: 1,


        });
        // console.log("start")
        // if(!result.cancelled){


        //     setImage(result.uri)
        //     setFalgimg1(true)


        // }

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setFalgimg1(true);
        }
    };

    const resizer = async () => {
        const manipResult = await manipulateAsync(
            imageupdate1.localUri || imageupdate1.uri,
            [
                { resize: { height: 250, width: 300 } },
            ],
            { compress: 1, format: SaveFormat.PNG }
        );
        // console.log("manipResult ***************************************:",manipResult)
        // console.log("manipResult ppppppppppppppppppppppppppppppppppppppppppp :", imageupdate1)
        setImageupdate(manipResult);
        setImage(manipResult.uri);
        setNewimg(true);

    };




    const Changeedit = (item) => {

        setEditId(item.id);

        setfreType(item.doctortype);
        setPick1(item.doctorusername);
        setPrice(item.price);
        setNote(item.notes);
        setStartDate(item.appointmentdate);
        setPick2(item.appointmenttime);
        // setDate(item.apntmaindate)


        setCh1(item.doctortype);
        setCh2(item.doctorusername);
        setCh3(item.price);
        setCh4(item.notes);
        setCh5(item.appointmentdate);
        setCh6(item.appointmenttime);
        setCh7(item.apntmaindate);


        // appointmentdate: startDate,
        // appointmenttime: pick2,


        setEditapnt(true);

        setFlag(true);


    };

    const AddToRequest = () => {


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({

                userid: userid,
                email: emailp,
                patientemail: emailp,
                username: namep,
                phonenumber: phonep,
                emgphonenumber: emgphonenumberp,
                // numberofdays: dosetype == 'EveryDay' ? "0" : dosefreType == "Day" ? productNumber1 * 1 :  dosefreType == "Week" ? productNumber1 * 7 : productNumber1 * 30,
                streetaddress: streetNo1,
                doctoruserid: doctor.id,
                doctortype: doctor.doctordepartment,
                doctorusername: doctor.name,
                doctoremail: doctor.email,
                appointmenttype: appointmenttype,
                registerdate: todayDatetest,
                registertime: fTime,

                appointmentdate: myDate,
                appointmenttime: slottime,

                appointmentdatedoctor: slotdatedoc,
                appointmenttimedoctor: slottimedoc,

                finalprice: totalamount,
                doctorprice: totalamount - 100,

                promodiscount: promovalue,
                promostatus: voucherstatus ? true : false,
                paymenttype: paymentmethod,

                appointmentstatus: "Received",
                activestatus: true,

                paymentstatus: false,
                // notes:  note,
                // apntmaindate: date

            })
        };

        fetch('https://qwikmedic.pythonanywhere.com/PatientRequest/new', requestOptions)
            .then((response) => response.json())
            .then((json) => {


                setRqstid(json.id);



                const requestOptions5 = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                    body: JSON.stringify({

                        patientname: namep,
                        patientid: userid,
                        doctorid: doctor.id,
                        doctorname: doctor.name,
                        appointmetid: json.id,
                        appointmenttype: appointmenttype,
                        registerdate: todayDatetest,
                        registertime: fTime,

                        appointmentdate: myDate,
                        appointmenttime: slottime,

                        appointmentdatedoctor: slotdatedoc,
                        appointmenttimedoctor: slottimedoc,
                        usernoficationtoken: noficationtoken,
                        doctorficationtoken: doctor.noficationtoken

                    })
                };

                fetch('https://qwikmedic.pythonanywhere.com/appointmentprescriptions/new', requestOptions5)
                    .then((response) => response.json())
                    .then((json) => {


                    })
                    .catch((error) => {
                    });


                const requestOptions7 = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                    body: JSON.stringify({


                        userid: userid,
                        orderitemid: json.id,
                        name: "doctorappointment",
                        tytle: "Your Doctor's Appointment #QM-000" + String(json.id) + " has been proceed successfully.",
                        movepageid: 2,
                        avtivetime: fTime,
                        avtivedate: todayDatetest,
                        usernoficationtoken: noficationtoken,
                        doctorficationtoken: doctor.noficationtoken

                    })
                };

                fetch('https://qwikmedic.pythonanywhere.com/notification/new', requestOptions7)
                    .then((response) => response.json())
                    .then((json) => {

                        persistUser({ userid: userid, notify: true, lan: testCredentials.lan, raddress: testCredentials.raddress, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });
                        setSuccessorder(true);


                    })
                    .catch((error) => {
                        setLoading1(false);
                        console.error(error);
                        setNointernet(true);
                    });



                if (bookedlist == null || bookedlist == undefined || bookedlist == "") {
                    setBookedlist([slotitem]);
                }
                else {

                    bookedlist.push(slotitem);

                }

                const requestOptions1 = {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                    body: JSON.stringify({
                        bookedschedulelist: bookedlist,

                    })
                };

                fetch('https://qwikmedic.pythonanywhere.com/doctorProfile/' + doctor.id, requestOptions1)
                    .then((response) => response.json())
                    .then((json) => {

                        // setNointernet(false)
                        // setLoading1(true)

                        // navigation.navigate("Services",{bypassDoctor:true})

                    })
                    .catch((error) => {
                        // setNointernet(true)
                        // setLoading1(false)

                    });

                if (selectOption == "Others") {

                    if (mypetientsp == null) {
                        setMypetientsp([{ pname: patientName, prelation: relation }]);
                    }
                    else {

                        mypetientsp.push({ pname: patientName, prelation: relation });

                    }

                    const requestOptions2 = {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                        body: JSON.stringify({
                            mypetients: mypetientsp,

                        })
                    };

                    fetch('https://qwikmedic.pythonanywhere.com/userProfile/' + userid, requestOptions2)
                        .then((response) => response.json())
                        .then((json) => {

                        })
                        .catch((error) => {

                        });
                }

                fadeIn2();

                // navigation.navigate("Homepage",{})

            })
            .catch((error) => {
                setLoading1(true);
                console.error(error);
                setNointernet(true);
            });











        if (nointernet == true) {
            setLoading1(true);
            setNointernet(true);


        }
    };


    const AddToEditRequest = () => {

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({
                userid: userid,
                email: email,
                username: Name,
                phonenumber: phone,
                emgphonenumber: emgphonenumber,
                // numberofdays: dosetype == 'EveryDay' ? "0" : dosefreType == "Day" ? productNumber1 * 1 :  dosefreType == "Week" ? productNumber1 * 7 : productNumber1 * 30,
                streetaddress: streetNo1,
                dosesperday: productNumber,
                doctoruserid: userid,
                doctortype: freType,
                doctorusername: pick1,
                price: price,

                appointmentstatus: "Submited",
                activestatus: true,

                registerdate: todayDatetest,
                registertime: fTime,
                appointmentdate: startDate,
                appointmenttime: pick2,
                notes: note,
                apntmaindate: startDate == ch5 ? ch7 : date
            })
        };

        fetch('https://qwikmedic.pythonanywhere.com/PatientRequest/' + editId, requestOptions)
            .then((response) => response.json())
            .then((json) => {

                // setNointernet(false)
                // setLoading1(true)

                navigation.navigate("Services", { bypassDoctor: true });

            })
            .catch((error) => {
                // setNointernet(true)
                // setLoading1(false)

            });


        if (nointernet == true) {
            setLoading1(true);
            setNointernet(true);


        }
    };

    const Accountdetail = () => {

        if (getaccount) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            };

            fetch('https://qwikmedic.pythonanywhere.com/phoneNumbers/', requestOptions)
                .then((response) => response.json())
                .then((json) => {

                    setGetaccountdata(json);



                })
                .catch((error) => {

                });

            setGetaccount(false);
        }


    };





    const Setupslot = (myDate) => {


        todaymyslotarray.length = 0;

        // todaymyslotarray.length = 0
        if (route.params.doctorprofile.availabletimeslot != "" && route.params.doctorprofile.availabletimeslot != null) {
            route.params.doctorprofile.availabletimeslot.map((item, index) => {

                if (myDate == item.dateuser) {

                    // console.log(myDate)
                    todaymyslotarray.push(item);

                    if (doctor.bookedschedulelist != "" && doctor.bookedschedulelist != null) {
                        doctor.bookedschedulelist.map((item, index) => {

                            if (myDate == item.dateuser) {

                                todaymyslotarray.splice(index, 1);
                            }
                        });
                    }

                }

            });
        }
        // console.log(todaymyslotarray)

        todaymyslotarray.map((item, index) => {


            if (index == 0) {

                setSlot1val(item.slotuser.slice(0, 8));

                setSlot1valdoc(item.slot.slice(0, 8));

                setSlot1valdocdate(item.date);

                setSlot1item(item);

            }

            if (index == 1) {

                setSlot2val(item.slotuser.slice(0, 8));

                setSlot2valdoc(item.slot.slice(0, 8));

                setSlot2valdocdate(item.date);

                setSlot2item(item);

            }

            if (index == 2) {

                setSlot3val(item.slotuser.slice(0, 8));

                setSlot3valdoc(item.slot.slice(0, 8));

                setSlot3valdocdate(item.date);

                setSlot3item(item);

            }

            if (index == 3) {

                setSlot4val(item.slotuser.slice(0, 8));

                setSlot4valdoc(item.slot.slice(0, 8));

                setSlot4valdocdate(item.date);

                setSlot4item(item);

            }


            if (index == 4) {

                setSlot5val(item.slotuser.slice(0, 8));

                setSlot5valdoc(item.slot.slice(0, 8));

                setSlot5valdocdate(item.date);

                setSlot5item(item);

            }

            if (index == 5) {

                setSlot6val(item.slotuser.slice(0, 8));

                setSlot6valdoc(item.slot.slice(0, 8));

                setSlot6valdocdate(item.date);

                setSlot6item(item);

            }

            if (index == 6) {

                setSlot7val(item.slotuser.slice(0, 8));

                setSlot7valdoc(item.slot.slice(0, 8));

                setSlot7valdocdate(item.date);

                setSlot7item(item);

            }

            if (index == 7) {

                setSlot8val(item.slotuser.slice(0, 8));

                setSlot8valdoc(item.slot.slice(0, 8));

                setSlot8valdocdate(item.date);

                setSlot8item(item);

            }
            if (index == 8) {

                setSlot9val(item.slotuse.slice(0, 8));

                setSlot9valdoc(item.slo.slice(0, 8));

                setSlot9valdocdate(item.date);

                setSlot9item(item);

            }
            if (index == 9) {

                setSlot10val(item.slotuser.slice(0, 8));

                setSlot10valdoc(item.slot.slice(0, 8));

                setSlot10valdocdate(item.date);

                setSlot10item(item);

            }
            if (index == 10) {

                setSlot11val(item.slotuser.slice(0, 8));

                setSlot11valdoc(item.slot.slice(0, 8));

                setSlot11valdocdate(item.date);

                setSlot11item(item);

            }
            if (index == 11) {

                setSlot12val(item.slotuser.slice(0, 8));

                setSlot12valdoc(item.slot.slice(0, 8));

                setSlot12valdocdate(item.date);

                setSlot12item(item);

            }
            if (index == 12) {

                setSlot13val(item.slotuser.slice(0, 8));

                setSlot13valdoc(item.slot.slice(0, 8));

                setSlot13valdocdate(item.date);

                setSlot13item(item);

            }
            if (index == 13) {

                setSlot14val(item.slotuser.slice(0, 8));

                setSlot14valdoc(item.slot.slice(0, 8));

                setSlot14valdocdate(item.date);

                setSlot14item(item);

            }
            if (index == 14) {

                setSlot15val(item.slotuser.slice(0, 8));

                setSlot15valdoc(item.slot.slice(0, 8));

                setSlot15valdocdate(item.date);

                setSlot15item(item);

            }
            if (index == 15) {

                setSlot16val(item.slotuser.slice(0, 8));

                setSlot16valdoc(item.slot.slice(0, 8));

                setSlot16valdocdate(item.date);

                setSlot16item(item);

            }
            if (index == 16) {

                setSlot17val(item.slotuser.slice(0, 8));

                setSlot17valdoc(item.slot.slice(0, 8));

                setSlot17valdocdate(item.date);

                setSlot17item(item);

            }
            if (index == 17) {

                setSlot18val(item.slotuser.slice(0, 8));

                setSlot18valdoc(item.slot.slice(0, 8));

                setSlot18valdocdate(item.date);

                setSlot18item(item);

            }
            if (index == 18) {

                setSlot19val(item.slotuser.slice(0, 8));

                setSlot19valdoc(item.slot.slice(0, 8));

                setSlot19valdocdate(item.date);

                setSlot19item(item);

            }
            if (index == 19) {

                setSlot20val(item.slotuser.slice(0, 8));

                setSlot20valdoc(item.slot.slice(0, 8));

                setSlot20valdocdate(item.date);

                setSlot20item(item);

            }
            if (index == 20) {

                setSlot21val(item.slotuser.slice(0, 8));

                setSlot21valdoc(item.slot.slice(0, 8));

                setSlot21valdocdate(item.date);

                setSlot21item(item);

            }
            if (index == 21) {

                setSlot22val(item.slotuser.slice(0, 8));

                setSlot22valdoc(item.slot.slice(0, 8));

                setSlot22valdocdate(item.date);

                setSlot22item(item);

            }
            if (index == 22) {

                setSlot23val(item.slotuser.slice(0, 8));

                setSlot23valdoc(item.slot.slice(0, 8));

                setSlot23valdocdate(item.date);

                setSlot23item(item);

            }
            if (index == 23) {

                setSlot24val(item.slotuser.slice(0, 8));

                setSlot24valdoc(item.slot.slice(0, 8));

                setSlot24valdocdate(item.date);

                setSlot24item(item);

            }


            if (index == 24) {

                setSlot1val(item.slotuser[4].slice(0, 8));

                setSlot1valdoc(item.slot[4].slice(0, 8));

                setSlot1valdocdate(item.date[4]);

                setSlot4item(item);

            }



        });



    };


    const Checkpromo = () => {



        getaccountdata.map((item, index) => {

            if (item.codename == promo) {

                setVoucherstatus(true);
                setPromovalue(parseInt(item.codemoney));
                setTotalamount(parseInt(totalamount) - parseInt(item.codemoney));

                setVoutureflag(true);

            }
            else {
                setVoutureflag(false);
            }

        });

    };

    const AddToCancelRequest = (id) => {


        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
            body: JSON.stringify({
                appointmentstatus: "Canceled",
                activestatus: false
            })
        };

        fetch('https://qwikmedic.pythonanywhere.com/PatientRequest/' + id, requestOptions)
            .then((response) => response.json())
            .then((json) => {

                // setNointernet(false)
                // setLoading1(true)

                navigation.navigate("Services", { bypassDoctor: true });


            })
            .catch((error) => {
                // setNointernet(true)
                // setLoading1(false)

            });


        if (nointernet == true) {
            setLoading1(true);
            setNointernet(true);


        }
    };






    const deleteimg = (itemid) => {


        const requestOptions1 = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
        };

        fetch('https://qwikmedic.pythonanywhere.com/medicineReminder/' + itemid, requestOptions1)
            .then(response => response.ok)
            .then((json) => {
                setNointernet(false);
                navigation.navigate("Homepage", { bypassreminder: true });
            })
            .catch((error) => {
                setNointernet(true);

            });

    };


    const OnDatepress = (date1, month1) => {
        Allfalse();
        // bookingarray.length = 0
        // setSlot1(true)
        // setSlot2(true)
        // setSlot3(true)
        // setSlot4(true)
        // setSlot5(true)
        // setSlot6(true)
        // setSlot7(true)
        // setSlot8(true)
        // setSlot9(true)
        // setSlot10(true)
        // setSlot11(true)
        // setSlot12(true)

        setSelectDate(date1);
        setSelectMonth(month1);
        setSelect(true);



        setMyDate(String(date1.toString().padStart(2, "0") + '/' + month1.toString().padStart(2, "0") + '/' + date.getFullYear()));

        todaymyslotarray.length = 0;

        Setupslot(String(date1.toString().padStart(2, "0") + '/' + month1.toString().padStart(2, "0") + '/' + date.getFullYear()));


        // String( date.getDate().toString().padStart(2, "0") + '/' +  (date.getMonth() + 1).toString().padStart(2, "0")  + '/' + date.getFullYear())
        // if(bookedlist != null)
        // {
        //     bookedlist.map((item, index)=>{
        //         console.log(item.bmonth,month1)
        //         console.log(item.bday,date1)
        //         console.log(item.btime,doctor.availabletimeslot[0].slot1)

        //         if(item.bmonth ==  month1 && item.bday == date1)
        //         {
        //             // bookingarray.push(item.btime)
        //             if(item.btime == doctor.availabletimeslot[0].slot1)
        //             {
        //                 console.log("000000000000")
        //                 setSlot1(false)
        //             }
        //             else if(item.btime == doctor.availabletimeslot[0].slot2)
        //             {
        //                 setSlot2(false)
        //             }
        //             else if(item.btime == doctor.availabletimeslot[0].slot3)
        //             {
        //                 setSlot3(false)
        //             }
        //             else if(item.btime == doctor.availabletimeslot[0].slot3)
        //             {
        //                 setSlot4(false)
        //             }
        //             else if(item.btime == doctor.availabletimeslot[0].slot3)
        //             {
        //                 setSlot5(false)
        //             }
        //             else if(item.btime == doctor.availabletimeslot[0].slot3)
        //             {
        //                 setSlot6(false)
        //             }
        //             else if(item.btime == doctor.availabletimeslot[0].slot3)
        //             {
        //                 setSlot7(false)
        //             }
        //             else if(item.btime == doctor.availabletimeslot[0].slot3)
        //             {
        //                 setSlot8(false)
        //             }
        //             else if(item.btime == doctor.availabletimeslot[0].slot3)
        //             {
        //                 setSlot9(false)
        //             }
        //             else if(item.btime == doctor.availabletimeslot[0].slot3)
        //             {
        //                 setSlot10(false)
        //             }
        //             else if(item.btime == doctor.availabletimeslot[0].slot3)
        //             {
        //                 setSlot11(false)
        //             }
        //             else if(item.btime == doctor.availabletimeslot[0].slot3)
        //             {
        //                 setSlot12(false)
        //             }



        //         }
        //     })
        // }


        // bookingarray.map((item,index)=>{  
        //     item.btime == doctor.availabletimeslot[0].slot1 ? setSlot1(true) : setSlot1(false)
        //     }) 

    };





    useEffect(() => {
        // NotificationCheck()
        ProductInfo();
        // console.log(doctor.availabledates[0].date4)

        // console.log("todaymyslotarray.length",todaymyslotarray.length)

        Accountdetail();
        if (promo.length > 2) {
            setPromostatus(true);
        }
        else {

            setPromostatus(false);

        }

        if (selectDate != "" && slottime != "" && (selectOption == "Others" ? patientName != "" && relation != "" : slottime != "")) {
            setSubmitflag(true);
        }
        else {

            setSubmitflag(false);

        }

        // console.log(mypetientsp)

        // console.log(startDate.slice())
        // if(route.params.medicineitem)
        // {
        //     setFlag(true)
        //     setMedicineitem(route.params.medicineitem)
        //     setMedicinename(route.params.medicineitem.medicinename);
        //     setGenericname(route.params.medicineitem.genericname);
        //     setImage1(route.params.medicineitem.image1)
        // }

        // FlatInfo()
        if (isLoading123 == false) {
            Getdata();
            // setMainShowValue()
        }
        if (fstcall == true) {
            // Setupslot(myDate)

            Setupslot(String(new Date().getDate().toString().padStart(2, "0") + '/' + (new Date().getMonth() + 1).toString().padStart(2, "0") + '/' + new Date().getFullYear()));

            setFstcall(false);
        }

        // console.log(route.params.doctorprofile.availabletimeslot)
        // console.log(morning)
        // console.log(getProductdata)


    });
    // console.log(searchFlag)

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

                        <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  Appointment </Text>

                    </View>



                </View>



                <ScrollView style={{ width: '100%', height: '100%' }}>



                    {/* show list of reminder */}

                    <View style={[styles.body1, { justifyContent: 'flex-start', alignItems: 'center', width: '100%', top: 10, marginBottom: 40, display: successorder ? "none" : 'flex' }]}>

                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: '100%' }}>

                            <View style={{ width: '100%', height: 33, justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    contentOffset={{ x: tmonth > 7 ? 400 : 0, y: 0 }}
                                    scrollEventThrottle={0}
                                >

                                    <Pressable disabled={tmonth > 1 ? true : false} style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 60, height: 33, backgroundColor: m1 ? "#375672" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => (Onpressm1())}>

                                        <Text style={{ fontSize: 10, color: m1 ? colors.white : tmonth > 1 ? colors.ash : colors.ash, left: 0, fontFamily: 'Poppins_500Medium', letterSpacing: .9 }}>January</Text>

                                    </Pressable>

                                    <Pressable disabled={tmonth > 2 ? true : false} style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 65, height: 33, backgroundColor: m2 ? "#375672" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => (Onpressm2())}>

                                        <Text style={{ fontSize: 10, color: m2 ? colors.white : tmonth > 2 ? colors.ash : colors.ash, left: 0, fontFamily: 'Poppins_500Medium', letterSpacing: .9 }}>February</Text>

                                    </Pressable>

                                    <Pressable disabled={tmonth > 3 ? true : false} style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 50, height: 33, backgroundColor: m3 ? "#375672" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => (Onpressm3())}>

                                        <Text style={{ fontSize: 10, color: m3 ? colors.white : tmonth > 3 ? colors.ash : colors.ash, left: 0, fontFamily: 'Poppins_500Medium', letterSpacing: .9 }}>March</Text>

                                    </Pressable>

                                    <Pressable disabled={tmonth > 4 ? true : false} style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 50, height: 33, backgroundColor: m4 ? "#375672" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => { Onpressm4(); }}>

                                        <Text style={{ fontSize: 10, color: m4 ? colors.white : tmonth > 4 ? colors.ash : colors.ash, left: 0, fontFamily: 'Poppins_500Medium', letterSpacing: .9 }}>April</Text>

                                    </Pressable>

                                    <Pressable disabled={tmonth > 5 ? true : false} style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 50, height: 33, backgroundColor: m5 ? "#375672" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => (Onpressm5())}>

                                        <Text style={{ fontSize: 10, color: m5 ? colors.white : tmonth > 5 ? colors.ash : colors.ash, left: 0, fontFamily: 'Poppins_500Medium', letterSpacing: .9 }}>May</Text>

                                    </Pressable>

                                    <Pressable disabled={tmonth > 6 ? true : false} style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 50, height: 33, backgroundColor: m6 ? "#375672" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => (Onpressm6())}>

                                        <Text style={{ fontSize: 10, color: m6 ? colors.white : tmonth > 6 ? colors.ash : colors.ash, left: 0, fontFamily: 'Poppins_500Medium', letterSpacing: .9 }}>June</Text>

                                    </Pressable>

                                    <Pressable disabled={tmonth > 7 ? true : false} style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 50, height: 33, backgroundColor: m7 ? "#375672" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => (Onpressm7())}>

                                        <Text style={{ fontSize: 10, color: m7 ? colors.white : tmonth > 7 ? colors.ash : colors.ash, left: 0, fontFamily: 'Poppins_500Medium', letterSpacing: .9 }}>July</Text>

                                    </Pressable>

                                    <Pressable disabled={tmonth > 8 ? true : false} style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 55, height: 33, backgroundColor: m8 ? "#375672" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => (Onpressm8())}>

                                        <Text style={{ fontSize: 10, color: m8 ? colors.white : tmonth > 8 ? colors.ash : colors.ash, left: 0, fontFamily: 'Poppins_500Medium', letterSpacing: .9 }}>August</Text>

                                    </Pressable>

                                    <Pressable disabled={tmonth > 9 ? true : false} style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 75, height: 33, backgroundColor: m9 ? "#375672" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => (Onpressm9())}>

                                        <Text style={{ fontSize: 10, color: m9 ? colors.white : tmonth > 9 ? colors.ash : colors.ash, left: 0, fontFamily: 'Poppins_500Medium', letterSpacing: .9 }}>September</Text>

                                    </Pressable>

                                    <Pressable disabled={tmonth > 10 ? true : false} style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 55, height: 33, backgroundColor: m10 ? "#375672" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => (Onpressm10())}>

                                        <Text style={{ fontSize: 10, color: m10 ? colors.white : tmonth > 10 ? colors.ash : colors.ash, left: 0, fontFamily: 'Poppins_500Medium', letterSpacing: .9 }}>October</Text>

                                    </Pressable>

                                    <Pressable disabled={tmonth > 11 ? true : false} style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 75, height: 33, backgroundColor: m11 ? "#375672" : colors.white, justifyContent: 'center', alignItems: 'center' }} onPress={() => (Onpressm11())}>

                                        <Text style={{ fontSize: 10, color: m11 ? colors.white : tmonth > 11 ? colors.ash : colors.ash, left: 0, fontFamily: 'Poppins_500Medium', letterSpacing: .9 }}>November</Text>

                                    </Pressable>

                                    <Pressable disabled={tmonth > 12 ? true : false} style={{ marginLeft: 10, flexDirection: 'row', borderRadius: 4, width: 75, height: 33, backgroundColor: m12 ? "#375672" : colors.white, justifyContent: 'center', alignItems: 'center', marginRight: 10 }} onPress={() => (Onpressm12())}>

                                        <Text style={{ fontSize: 10, color: m12 ? colors.white : tmonth > 12 ? colors.ash : colors.ash, left: 0, fontFamily: 'Poppins_500Medium', letterSpacing: .9 }}>December</Text>

                                    </Pressable>




                                </ScrollView>
                            </View>
                            <View style={{ width: '100%', height: 85, justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>

                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    contentOffset={{ x: tdate <= 5 ? 0 : (tdate > 5 && tdate <= 10) ? 400 : (tdate > 10 && tdate <= 15) ? 800 : (tdate > 15 && tdate <= 20) ? 1200 : (tdate > 20 && tdate <= 25) ? 1350 : 1600, y: 0 }}
                                    scrollEventThrottle={0}
                                >
                                    {dayesdata.map((item, index) => (

                                        // <Pressable 
                                        // disabled={(( ((item.mn == tmonth) && (item.id == tdate || item.id > tdate)) || ( item.mn > tmonth) ) && (doctor.availabledates[0].date1 == item.name || doctor.availabledates[0].date2 == item.name || doctor.availabledates[0].date3 == item.name || doctor.availabledates[0].date4 == item.name || doctor.availabledates[0].date5 == item.name || doctor.availabledates[0].date6 == item.name || doctor.availabledates[0].date7 == item.name)) ? false : true} 
                                        // style={{marginLeft:10,borderRadius:4,width:60,height:70,backgroundColor: (parseInt(selectDate) == parseInt(item.id) && parseInt(item.mn) == parseInt(selectMonth)) ? "#375672" : "#F9FEFF",justifyContent:'center',alignItems:'center',marginTop: (parseInt(selectDate) == parseInt(item.id) && parseInt(item.mn) == parseInt(selectMonth)) ? 7 : 0 }}  onPress={() => (OnDatepress(item.id,item.mn))}>
                                        <Pressable key={index}
                                            disabled={((item.mn == tmonth) && (item.id == tdate || item.id > tdate)) || (item.mn > tmonth) ? false : true}
                                            style={{ marginLeft: 10, borderRadius: 4, width: 60, height: 70, backgroundColor: (parseInt(selectDate) == parseInt(item.id) && parseInt(item.mn) == parseInt(selectMonth)) ? "#375672" : "#F9FEFF", justifyContent: 'center', alignItems: 'center', marginTop: (parseInt(selectDate) == parseInt(item.id) && parseInt(item.mn) == parseInt(selectMonth)) ? 7 : 0 }} onPress={() => (OnDatepress(item.id, item.mn))}>


                                            {/* <Text style={{fontSize:12,left:0,fontFamily: 'Poppins_400Regular',letterSpacing:.9,color: (parseInt(selectDate) == parseInt(item.id) && parseInt(item.mn) == parseInt(selectMonth)) ? colors.white : (( ((item.mn == tmonth) && (item.id == tdate || item.id > tdate)) || ( item.mn > tmonth) ) && (doctor.availabledates[0].date1 == item.name || doctor.availabledates[0].date2 == item.name || doctor.availabledates[0].date3 == item.name || doctor.availabledates[0].date4 == item.name || doctor.availabledates[0].date5 == item.name || doctor.availabledates[0].date6 == item.name || doctor.availabledates[0].date7 == item.name)) ? colors.text : colors.ash1 }}>{item.id}</Text>
                                        <Text style={{fontSize:12,left:0,fontFamily: 'Poppins_400Regular',letterSpacing:.9,color: (parseInt(selectDate) == parseInt(item.id) && parseInt(item.mn) == parseInt(selectMonth)) ? colors.white : (( ((item.mn == tmonth) && (item.id == tdate || item.id > tdate)) || ( item.mn > tmonth) ) && (doctor.availabledates[0].date1 == item.name || doctor.availabledates[0].date2 == item.name || doctor.availabledates[0].date3 == item.name || doctor.availabledates[0].date4 == item.name || doctor.availabledates[0].date5 == item.name || doctor.availabledates[0].date6 == item.name || doctor.availabledates[0].date7 == item.name)) ? colors.text : colors.ash1}}>{item.name}</Text> */}

                                            <Text style={{ fontSize: 12, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: (parseInt(selectDate) == parseInt(item.id) && parseInt(item.mn) == parseInt(selectMonth)) ? colors.white : (((item.mn == tmonth) && (item.id == tdate || item.id > tdate)) || (item.mn > tmonth)) ? colors.text : colors.ash1 }}>{item.id}</Text>
                                            <Text style={{ fontSize: 12, left: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: (parseInt(selectDate) == parseInt(item.id) && parseInt(item.mn) == parseInt(selectMonth)) ? colors.white : (((item.mn == tmonth) && (item.id == tdate || item.id > tdate)) || (item.mn > tmonth)) ? colors.text : colors.ash1 }}>{item.name}</Text>

                                        </Pressable>

                                    ))}


                                </ScrollView>
                            </View>




                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', display: selectDate == "" ? 'none' : 'flex' }}>

                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 5 }}>

                                    <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: "#375672", fontSize: 13, padding: 4, marginTop: 5, left: 5, marginTop: 20 }}>Select Appointment Time</Text>
                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', left: 5, top: 15 }}>

                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.ash, fontSize: 12, padding: 4, marginTop: 5, left: 10, marginTop: 5, display: todaymyslotarray.length == 0 ? 'flex' : 'none' }}>No Available Slot</Text>

                                    </View>
                                </View>


                                <View style={{ left: 10, width: '95%', justifyContent: "flex-start", alignItems: 'center', height: 50, flexDirection: 'row', display: slot1val == "" || slot1val == null ? 'none' : 'flex' }}>



                                    <Pressable

                                        style={{ width: '30%', justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t1 ? "#375672" : colors.white, borderRadius: 4, display: slot1val == "" || slot1val == null ? 'none' : 'flex' }} onPress={() => Onpresst1(slot1val, slot1valdoc, slot1valdocdate, slot1item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t1 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot1val}</Text>
                                    </Pressable>

                                    <Pressable
                                        style={{ width: '30%', left: 20, justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t2 ? "#375672" : colors.white, borderRadius: 4, display: slot2val == "" || slot2val == null ? 'none' : 'flex' }} onPress={() => Onpresst2(slot2val, slot2valdoc, slot2valdocdate, slot2item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t2 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot2val}</Text>
                                    </Pressable>

                                    <Pressable
                                        style={{ width: '30%', left: 40, justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t3 ? "#375672" : colors.white, borderRadius: 4, display: slot3val == "" || slot3val == null ? 'none' : 'flex' }} onPress={() => Onpresst3(slot3val, slot3valdoc, slot3valdocdate, slot3item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t3 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot3val}</Text>
                                    </Pressable>

                                </View>
                                <View style={{ left: 10, width: '95%', justifyContent: 'flex-start', alignItems: 'center', height: 50, flexDirection: 'row', display: slot4val == "" || slot4val == null ? 'none' : 'flex' }}>

                                    <Pressable
                                        style={{ width: '30%', justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t4 ? "#375672" : colors.white, borderRadius: 4, display: slot4val == "" || slot4val == null ? 'none' : 'flex' }} onPress={() => Onpresst4(slot4val, slot4valdoc, slot4valdocdate, slot4item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t4 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot4val}</Text>
                                    </Pressable>

                                    <Pressable
                                        style={{ width: '30%', left: 20, justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t5 ? "#375672" : colors.white, borderRadius: 4, display: slot5val == "" || slot5val == null ? 'none' : 'flex' }} onPress={() => Onpresst5(slot5val, slot5valdoc, slot5valdocdate, slot5item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t5 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot5val}</Text>
                                    </Pressable>

                                    <Pressable
                                        style={{ width: '30%', left: 40, justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t6 ? "#375672" : colors.white, borderRadius: 4, display: slot6val == "" || slot6val == null ? 'none' : 'flex' }} onPress={() => Onpresst6(slot6val, slot6valdoc, slot6valdocdate, slot6item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t6 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot6val}</Text>
                                    </Pressable>

                                </View>

                                <View style={{ left: 10, width: '95%', justifyContent: 'flex-start', alignItems: 'center', height: 50, flexDirection: 'row', display: slot7val == "" || slot7val == null ? 'none' : 'flex' }}>

                                    <Pressable
                                        style={{ width: '30%', justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t7 ? "#375672" : colors.white, borderRadius: 4, display: slot7val == "" || slot7val == null ? 'none' : 'flex' }} onPress={() => Onpresst7(slot7val, slot7valdoc, slot7valdocdate, slot7item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t7 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot7val}</Text>
                                    </Pressable>

                                    <Pressable
                                        style={{ width: '30%', left: 20, justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t8 ? "#375672" : colors.white, borderRadius: 4, display: slot8val == "" || slot8val == null ? 'none' : 'flex' }} onPress={() => Onpresst8(slot8val, slot8valdoc, slot8valdocdate, slot8item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t8 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot8val}</Text>
                                    </Pressable>

                                    <Pressable
                                        style={{ width: '30%', left: 40, justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t9 ? "#375672" : colors.white, borderRadius: 4, display: slot9val == "" || slot9val == null ? 'none' : 'flex' }} onPress={() => Onpresst9(slot9val, slot9valdoc, slot9valdocdate, slot9item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t9 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot9val}</Text>
                                    </Pressable>

                                </View>

                                <View style={{ left: 10, width: '95%', justifyContent: 'flex-start', alignItems: 'center', height: 50, flexDirection: 'row', display: slot10val == "" || slot10val == null ? 'none' : 'flex' }}>

                                    <Pressable
                                        style={{ width: '30%', justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t10 ? "#375672" : colors.white, borderRadius: 4, display: slot10val == "" || slot10val == null ? 'none' : 'flex' }} onPress={() => Onpresst10(slot10val, slot10valdoc, slot10valdocdate, slot10item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t10 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot10val}</Text>
                                    </Pressable>

                                    <Pressable
                                        style={{ width: '30%', left: 20, justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t11 ? "#375672" : colors.white, borderRadius: 4, display: slot11val == "" || slot11val == null ? 'none' : 'flex' }} onPress={() => Onpresst11(slot11val, slot11valdoc, slot11valdocdate, slot11item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t11 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot11val}</Text>
                                    </Pressable>

                                    <Pressable
                                        style={{ width: '30%', left: 40, justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t12 ? "#375672" : colors.white, borderRadius: 4, display: slot12val == "" || slot12val == null ? 'none' : 'flex' }} onPress={() => Onpresst12(slot12val, slot12valdoc, slot12valdocdate, slot12item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t12 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot12val}</Text>
                                    </Pressable>

                                </View>


                                {/* new 12 */}

                                <View style={{ left: 10, width: '95%', justifyContent: 'flex-start', alignItems: 'center', height: 50, flexDirection: 'row', display: slot13val == "" || slot13val == null ? 'none' : 'flex' }}>

                                    <Pressable

                                        style={{ width: '30%', justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t13 ? "#375672" : colors.white, borderRadius: 4, display: slot13val == "" || slot13val == null ? 'none' : 'flex' }} onPress={() => Onpresst13(slot13val, slot13valdoc, slot13valdocdate, slot13item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t13 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot13val}</Text>
                                    </Pressable>

                                    <Pressable
                                        style={{ width: '30%', left: 20, justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t14 ? "#375672" : colors.white, borderRadius: 4, display: slot14val == "" || slot14val == null ? 'none' : 'flex' }} onPress={() => Onpresst14(slot14val, slot14valdoc, slot14valdocdate, slot14item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t14 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot14val}</Text>
                                    </Pressable>

                                    <Pressable
                                        style={{ width: '30%', left: 40, justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t15 ? "#375672" : colors.white, borderRadius: 4, display: slot15val == "" || slot15val == null ? 'none' : 'flex' }} onPress={() => Onpresst15(slot15val, slot15valdoc, slot15valdocdate, slot15item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t15 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot15val}</Text>
                                    </Pressable>

                                </View>
                                <View style={{ left: 10, width: '95%', justifyContent: 'flex-start', alignItems: 'center', height: 50, flexDirection: 'row', display: slot16val == "" || slot16val == null ? 'none' : 'flex' }}>

                                    <Pressable
                                        style={{ width: '30%', justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t16 ? "#375672" : colors.white, borderRadius: 4, display: slot16val == "" || slot16val == null ? 'none' : 'flex' }} onPress={() => Onpresst16(slot16val, slot16valdoc, slot6valdocdate, slot16item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t16 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot16val}</Text>
                                    </Pressable>

                                    <Pressable
                                        style={{ width: '30%', left: 20, justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t17 ? "#375672" : colors.white, borderRadius: 4, display: slot17val == "" || slot17val == null ? 'none' : 'flex' }} onPress={() => Onpresst17(slot17val, slot17valdoc, slot17valdocdate, slot17item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t17 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot17val}</Text>
                                    </Pressable>

                                    <Pressable
                                        style={{ width: '30%', left: 40, justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t18 ? "#375672" : colors.white, borderRadius: 4, display: slot18val == "" || slot18val == null ? 'none' : 'flex' }} onPress={() => Onpresst18(slot18val, slot18valdoc, slot18valdocdate, slot18item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t18 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot18val}</Text>
                                    </Pressable>

                                </View>

                                <View style={{ left: 10, width: '95%', justifyContent: 'flex-start', alignItems: 'center', height: 50, flexDirection: 'row', display: slot19val == "" || slot19val == null ? 'none' : 'flex' }}>

                                    <Pressable
                                        style={{ width: '30%', justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t19 ? "#375672" : colors.white, borderRadius: 4, display: slot19val == "" || slot19val == null ? 'none' : 'flex' }} onPress={() => Onpresst19(slot19val, slot19valdoc, slot19valdocdate, slot19item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t19 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot19val}</Text>
                                    </Pressable>

                                    <Pressable
                                        style={{ width: '30%', left: 20, justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t20 ? "#375672" : colors.white, borderRadius: 4, display: slot20val == "" || slot20val == null ? 'none' : 'flex' }} onPress={() => Onpresst20(slot20val, slot20valdoc, slot20valdocdate, slot20item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t20 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot20val}</Text>
                                    </Pressable>

                                    <Pressable
                                        style={{ width: '30%', left: 40, justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t21 ? "#375672" : colors.white, borderRadius: 4, display: slot21val == "" || slot21val == null ? 'none' : 'flex' }} onPress={() => Onpresst21(slot21val, slot21valdoc, slot21valdocdate, slot21item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t21 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot21val}</Text>
                                    </Pressable>

                                </View>

                                <View style={{ left: 10, width: '95%', justifyContent: 'flex-start', alignItems: 'center', height: 50, flexDirection: 'row', display: slot22val == "" || slot22val == null ? 'none' : 'flex' }}>

                                    <Pressable
                                        style={{ width: '30%', justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t22 ? "#375672" : colors.white, borderRadius: 4, display: slot22val == "" || slot22val == null ? 'none' : 'flex' }} onPress={() => Onpresst22(slot22val, slot22valdoc, slot22valdocdate, slot22item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t22 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot22val}</Text>
                                    </Pressable>

                                    <Pressable
                                        style={{ width: '30%', left: 20, justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t23 ? "#375672" : colors.white, borderRadius: 4, display: slot23val == "" || slot23val == null ? 'none' : 'flex' }} onPress={() => Onpresst23(slot23val, slot23valdoc, slot23valdocdate, slot23item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t23 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot23val}</Text>
                                    </Pressable>

                                    <Pressable
                                        style={{ width: '30%', left: 40, justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: t24 ? "#375672" : colors.white, borderRadius: 4, display: slot24val == "" || slot24val == null ? 'none' : 'flex' }} onPress={() => Onpresst24(slot24val, slot24valdoc, slot24valdocdate, slot24item)}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: t24 ? colors.white : colors.ash, fontSize: 12, padding: 4, marginTop: 5 }}>{slot24val}</Text>
                                    </Pressable>

                                </View>


                            </View>



                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 5, marginTop: 20 }}>

                                <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: "#375672", fontSize: 13, padding: 4, marginTop: 5, left: 5, marginTop: 20 }}>Select Patient</Text>

                            </View>

                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>
                                <Pressable style={{ width: '25%', height: 150, backgroundColor: "#DCDAFF", justifyContent: 'center', alignItems: 'center', left: 10, borderWidth: selectOption == "Others" ? 4 : 0, borderColor: colors.dblue }} onPress={() => { setSelectOption("Others"), setPatientName(""), setRelation(""); }}>

                                    <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: "#494DDA", fontSize: 20, padding: 4, top: 5 }}>+</Text>
                                    <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: "#494DDA", fontSize: 13, padding: 4, top: -5 }}>Add</Text>

                                </Pressable>

                                <Pressable style={{ width: '25%', height: 150, backgroundColor: "#C5D3E0", justifyContent: 'center', alignItems: 'center', left: 20, borderWidth: selectOption == "Myself" ? 4 : 0, borderColor: colors.dblue }} onPress={() => { setSelectOption("Myself"), setPatientName(namep), setRelation("Myself"); }}>

                                    <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.ash, fontSize: 12, padding: 4, top: 95 }}>My Self</Text>

                                </Pressable>


                                {
                                    mypetientsp != null ?

                                        mypetientsp.map((item, index) => {


                                            <Pressable key={index} style={{ width: '25%', height: 150, backgroundColor: "#C5D3E0", justifyContent: 'center', alignItems: 'center', left: 30 }} onPress={() => { setSelectOption(item.prelation), setPatientName(item.pname), setRelation(item.prelation); }}>

                                                <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.ash, fontSize: 12, padding: 4, top: 95 }}>{item.prelation}</Text>

                                            </Pressable>;

                                        }) : <></>

                                }




                            </View>


                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 60, display: selectOption == "Others" ? 'flex' : 'none' }}>

                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 5 }}>

                                    <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: "#375672", fontSize: 13, padding: 4, marginTop: 5, left: 5, marginTop: 20 }}>Appointment for</Text>

                                </View>
                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', color: colors.text, left: 10, borderWidth: 0, marginTop: 20, fontFamily: 'Poppins_400Regular', letterSpacing: .9 }}>
                                    <TextInput
                                        style={[styles.idinput, { borderColor: colors.ash1, paddingLeft: 20, borderWidth: 1, fontSize: 12 }]}
                                        placeholder={lan ? "Patient Name" : "আপনার ফোন নাম্বার দিন"}
                                        onChangeText={newText => { setPatientName(newText); }}
                                        defaultValue={patientName}
                                        maxLength={100}
                                    />

                                    {/* <TextInput 
                                        style={[styles.idinput,{borderColor: colors.ash1,paddingLeft:20,borderWidth:1,color:colors.text,marginTop:20,fontFamily: 'Poppins_400Regular',letterSpacing:.9}]} 
                                        placeholder= {lan ? "Relationship" : "আপনার ফোন নাম্বার দিন"} 
                                        onChangeText={newText => { setRelation(newText); }}
                                        defaultValue={relation}
                                        
                                        maxLength={100}
                                    /> */}
                                    <View style={{ width: '95%', justifyContent: 'center', backgroundColor: '#E6F1F7', marginTop: 10 }}>

                                        <RadioForm
                                            radio_props={options4}
                                            formHorizontal={true}
                                            labelHorizontal={false}
                                            buttonColor={'#747474'}
                                            selectedButtonColor='#303030'
                                            labelStyle={{ fontSize: 12, color: '#303030', fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12 }}
                                            buttonSize={8}
                                            buttonOuterSize={20}
                                            animation={false}
                                            buttonStyle={{ color: "#303030", paddingLeft: 10 }}
                                            onPress={(value) => setRelation(value)}
                                            style={{ right: 0, marginTop: 30, justifyContent: 'space-evenly', marginBottom: 30 }}
                                        />
                                    </View>
                                </View>

                            </View>

                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 5, marginTop: 20 }}>

                                <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: "#375672", fontSize: 13, padding: 4, marginTop: 5, left: 5, marginTop: 20 }}>Select Appointment Options</Text>

                            </View>

                            <View style={{ width: '95%', justifyContent: 'space-between', alignItems: 'center', height: 50, flexDirection: 'row' }}>

                                <Pressable disabled={doctor.clinicstatus ? false : true} style={{ width: '21%', justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: cli ? "#375672" : colors.white, borderRadius: 4 }} onPress={() => Onpresscli()} >
                                    <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: doctor.clinicstatus == false ? colors.ash1 : cli ? colors.white : colors.ash, fontSize: 11, padding: 4, marginTop: 5 }}>Clinic</Text>
                                </Pressable>

                                <Pressable disabled={doctor.homestatus ? false : true} style={{ width: '21%', justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: ho ? "#375672" : colors.white, borderRadius: 4 }} onPress={() => Onpressho()}>
                                    <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: doctor.homestatus == false ? colors.ash1 : ho ? colors.white : colors.ash, fontSize: 11, padding: 4, marginTop: 5 }}>Home</Text>
                                </Pressable>

                                <Pressable disabled={doctor.audiostatus ? false : true} style={{ width: '18%', justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: cal ? "#375672" : colors.white, borderRadius: 4 }} onPress={() => Onpresscal()}>
                                    <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: doctor.audiostatus == false ? colors.ash1 : cal ? colors.white : colors.ash, fontSize: 11, padding: 4, marginTop: 5 }}>Call</Text>
                                </Pressable>

                                <Pressable disabled={doctor.videostatus ? false : true} style={{ width: '25%', justifyContent: 'flex-start', alignItems: 'center', height: 40, backgroundColor: vid ? "#375672" : colors.white, borderRadius: 4 }} onPress={() => Onpressvid()}>
                                    <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: doctor.videostatus == false ? colors.ash1 : vid ? colors.white : colors.ash, fontSize: 11, padding: 4, marginTop: 5 }}>Video Call</Text>
                                </Pressable>

                            </View>

                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 5, marginTop: 30 }}>

                                <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: "#375672", fontSize: 13, padding: 4, marginTop: 5, left: 5, marginTop: 20 }}>Fees</Text>

                            </View>

                            <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'center', height: voucherstatus ? 170 : 200, backgroundColor: colors.white }}>
                                <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', top: 10 }}>
                                    <View style={{ width: '60%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.ash, fontSize: 12, padding: 4, }}>{appointmenttype} Session Fees</Text>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.ash, fontSize: 12, padding: 0, bottom: 7 }}>( 30 minutes )</Text>

                                    </View>
                                    <View style={{ width: '40%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.text, fontSize: 13, padding: 4, }}>{appointmenttype == "Video Call" ? doctor.videofee : appointmenttype == "Voice Call" ? doctor.audiofee : appointmenttype == "Clinic" ? doctor.clinicfee : doctor.homefee}</Text>

                                    </View>

                                </View>
                                <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', top: 10, display: voucherstatus ? 'flex' : 'none' }}>
                                    <View style={{ width: '60%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.ash, fontSize: 12, padding: 4, }}>Voucher</Text>

                                    </View>
                                    <View style={{ width: '40%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                        <Text style={{ fontFamily: 'Poppins_500Medium', letterSpacing: .9, color: colors.red, fontSize: 13, padding: 4, }}>-{promovalue}</Text>

                                    </View>

                                </View>
                                <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', top: voucherstatus ? 20 : 10, }}>
                                    <View style={{ width: '60%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <Text style={{ fontFamily: 'Poppins_500Medium', letterSpacing: .9, color: colors.ash, fontSize: 13, padding: 4, top: 4 }}>Total Payable</Text>

                                    </View>
                                    <View style={{ width: '40%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                        <Text style={{ fontFamily: 'Poppins_500Medium', letterSpacing: .9, color: colors.oranget, fontSize: 13, padding: 4 }}>Tk. {totalamount}</Text>

                                    </View>

                                </View>

                                <View style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 50, display: voucherstatus ? 'none' : 'flex' }}>

                                    <TextInput
                                        style={[styles.idinput, { left: 10, bottom: 20, width: '60%', height: 40, borderColor: voutureflag ? colors.ash1 : colors.red, paddingLeft: 10, color: colors.text, borderWidth: 1, marginTop: 0, fontFamily: 'Poppins_400Regular', letterSpacing: .9, fontSize: 12 }]}
                                        placeholder={lan ? "Use Promo Code" : "আপনার ফোন নাম্বার দিন"}
                                        onChangeText={newText => { setPromo(newText); }}
                                        defaultValue={promo}

                                        maxLength={20}
                                    />

                                    <Pressable disabled={promostatus ? false : true} style={[{ right: 10, backgroundColor: isLoading1 ? colors.ash : '#065540', width: '30%', marginBottom: 40, height: 40, backgroundColor: promostatus ? "#1A9490" : colors.ash, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }]} onPress={() => Checkpromo()}>

                                        <Text style={{ color: colors.white, fontSize: 12, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>Apply</Text>
                                    </Pressable>

                                </View>


                            </View>

                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 5, marginTop: 30 }}>

                                <Text style={{ fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: "#375672", fontSize: 13, padding: 4, marginTop: 5, left: 5, marginTop: 20 }}>Payment Options</Text>

                            </View>

                            <View style={{ width: '95%', justifyContent: 'center', backgroundColor: colors.white, marginTop: 10 }}>

                                <RadioForm
                                    radio_props={options2}
                                    formHorizontal={true}
                                    labelHorizontal={true}
                                    buttonColor={'#747474'}
                                    selectedButtonColor={colors.oranget}
                                    labelStyle={{ fontSize: 12, color: colors.ash, fontFamily: 'Poppins_400Regular', letterSpacing: .5 }}
                                    buttonSize={6}
                                    buttonOuterSize={18}
                                    animation={false}
                                    buttonStyle={{ color: "#303030", paddingLeft: 10 }}
                                    onPress={(value) => setPaymentmethod(value)}
                                    style={{ right: 0, marginTop: 30, justifyContent: 'space-evenly', marginBottom: 30 }}
                                />
                            </View>

                            {/* <View style={{width:'95%',justifyContent:'center',alignItems:'flex-start',backgroundColor:colors.white,height:40,marginTop:10}}>
                                
                                <Text style={{fontFamily: 'Poppins_400Regular',letterSpacing:.9,color:colors.text,fontSize:12,padding:4,left:10}}>bKash</Text>

                            </View>

                            <View style={{width:'95%',justifyContent:'center',alignItems:'flex-start',backgroundColor:colors.white,height:40,marginTop:20}}>
                                
                                <Text style={{fontFamily: 'Poppins_400Regular',letterSpacing:.9,color:colors.text,fontSize:12,padding:4,left:10}}>Credit Card</Text>

                            </View> */}

                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
                                {/* <Pressable style={[{backgroundColor: isLoading1 ? colors.ash : '#065540',width:'55%' ,marginBottom:40,height:40, backgroundColor: submitflag ? "#1A9490" : colors.ash ,borderRadius:4,justifyContent:'center',alignItems:'center',marginTop:50,disabled: submitflag ? false : true}]} onPress={()=> AddToRequest()}> */}
                                <Pressable style={[{ width: '55%', marginBottom: 40, height: 40, backgroundColor: submitflag ? "#1A9490" : colors.ash, borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginTop: 50 }]} disabled={submitflag ? false : true} onPress={() => AddToRequest()}>

                                    <Text style={{ color: colors.white, fontSize: 12, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>CONFIRM</Text>
                                </Pressable>
                            </View>

                        </View>




                    </View>
                </ScrollView>


                <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', bottom: 250, display: successorder ? "flex" : 'none' }}>

                    {/* <SuccessFull width={80} height={80}/> */}
                    <SvgUri
                        width="80"
                        height="80"
                        // style={{marginTop:80}} 
                        uri="http://drive.google.com/uc?export=view&id=1BzHhSffwzfRnWbax7q4nP06kJQBYFETx"

                    />

                    <Text style={{ color: colors.ash, fontSize: 14, marginTop: 30, fontFamily: 'Poppins_400Regular' }}>Thank you for your request.</Text>

                    <Text style={{ marginTop: 40, color: colors.ash, fontSize: 14, fontFamily: 'Poppins_400Regular' }}>We received your request and will</Text>
                    <Text style={{ color: colors.ash, fontSize: 14, marginTop: 0, fontFamily: 'Poppins_400Regular' }}>get back to you soon</Text>

                    <Text style={{ top: 60, color: colors.blue, fontSize: 14, marginTop: 10, fontFamily: 'Poppins_400Regular' }}>Your Request ID is #00695{rqstid}</Text>

                </View>



                {/* no internet  */}

                <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', marginBottom: 350, display: nointernet ? 'flex' : 'none' }}>
                    {/* <Nointernet/> */}
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.black, marginTop: 10 }}>No Internet Connection</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', letterSpacing: .9, color: colors.ash, marginTop: 10 }}>Please check you internet connection <Text style={{ fontSize: 12, fontWeight: '400', textDecorationLine: 'underline', color: colors.ash }} onPress={() => { setLoading123(true), setLoading1(true), setGetProduct(true), setCheckdata(true); }}>try again</Text> </Text>
                </View>


            </View>

            <View style={{ left: 10, marginBottom: 100, width: '95%', height: 38, borderColor: '#067A1F', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: wrongstart ? "flex" : 'none' }}>
                {/* <Gtick style={{marginLeft:10}}/> */}
                <Text style={{ marginLeft: 10, fontSize: 14, fontWeight: '700', color: colors.red }}>Start date can not bigger then end date.</Text>
            </View>
            <View style={{ left: 10, marginBottom: 100, width: '95%', height: 38, borderColor: '#067A1F', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: wrongend ? "flex" : 'none' }}>
                {/* <Gtick style={{marginLeft:10}}/> */}
                <Text style={{ marginLeft: 10, fontSize: 14, fontWeight: '700', color: colors.red }}>End date can not smaller then Start date.</Text>
            </View>

            <View style={{ left: 10, marginBottom: 100, width: '95%', height: 38, borderColor: '#067A1F', borderWidth: 1, borderRadius: 3, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', display: olddate ? "flex" : 'none' }}>
                {/* <Gtick style={{marginLeft:10}}/> */}
                <Text style={{ marginLeft: 10, fontSize: 14, fontWeight: '700', color: colors.red }}>Can not choose old date.</Text>
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



                    <Pressable style={[styles.tuchabluebuttonf, { borderBottomColor: colors.dblue, borderBottomWidth: 4 }]} onPress={() => navigation.navigate("Services", {})}>

                        <Image resizeMode={'cover'} style={{ width: 22, height: 22 }} source={require("../assets/services.jpg")} />
                        <Text style={{ top: 4, color: colors.ash, fontSize: 10, fontWeight: 'bold', display: lan ? 'none' : 'flex' }}>লগ ইন করুন </Text>
                        <Text style={{ top: 7.8, color: colors.dblue, fontSize: 10, display: lan ? 'flex' : 'none', fontFamily: 'Poppins_400Regular', letterSpacing: 0.9 }}>SERVICES</Text>

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
    idinput: {
        width: "95%",
        height: 50,
        padding: 10,
        borderRadius: 4,
        fontSize: 12,
        paddingLeft: 5,
        backgroundColor: '#E6F1F7'


    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
    datePickerStyle: {
        width: 120,
        marginTop: 20,
    },
    checkbox: {
        color: 'white',
        marginTop: 24,
    },
    addsImg: {
        width: 35,
        borderTopLeftRadius: 0,
        height: 45,
    },
    addstext: {
        width: '90%',
        height: 140,

    },
    textstyle: {
        color: "#273B40",
        fontSize: 14,
        paddingTop: 10,
    },
    inputdiv: {
        width: "98%",
        height: 60,
        // justifyContent: "center",
        // alignItems:'center',  
        paddingBottom: 10,
        //top:-100

    },
    tuchabluebuttonf: {
        width: "20%",
        height: '100%',
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: 'center',
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
        paddingLeft: 20,
        borderRadius: 3,
        paddingRight: 0,
        fontSize: 12,

    },
    adds: {
        width: "100%",
        height: 190,

        borderColor: colors.ash1,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: colors.white,

    },

    adds1: {
        width: 156,
        height: 187,

        borderColor: colors.ash1,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: colors.white,

    },
    addstext1: {
        width: 149,
        height: 83,

    },
    flatdetails: {
        paddingLeft: 0,
        width: '100%',
        marginTop: 10
    }
});

export default BookAppoinment;