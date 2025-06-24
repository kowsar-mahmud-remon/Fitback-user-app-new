import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, ImageBackground, SafeAreaView, Platform, StatusBar, Image, Button, TextInput, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';




//asyn-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credential context
import { CredentialsContext } from '../../components/CredintailsContext';
import { UserContext } from '../../components/CredintailsContext';
import colors from '../config/colors';



function Repassword({ navigation, route }) {

    const [newPass, setNewPass] = useState(null);
    const { authtoken, setAuthtoken } = useContext(UserContext);
    //const [userid,setUserid] = useState()
    const [userid, setUserid] = useState(route.params.userid);

    const [phonenumber, setPhonenumber] = useState(null);

    const [newPasswordcheck, setNewPasswordcheck] = useState(true);

    const [lan, setLan] = useState(true);
    // const[lan,setLan] = useState(true)

    const [nointernet, setNointernet] = useState(false);
    const [isLoading1, setLoading1] = useState(false);


    const [postflag, setPostflag] = useState(route.params.postflag);
    //message error

    const [message, setMessage] = useState();
    // const [messageType, setMessageType] = useState()


    //context
    const { storeCredentials, setStoreCredentials } = useContext(CredentialsContext);
    const { testCredentials, setTestCredentials } = useContext(UserContext);

    const UpdatePassword = () => {


        setNewPasswordcheck(true);

        if (newPass != null) {
            if (newPass.length == 4) {
                const requestOptions = {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authtoken },
                    body: JSON.stringify({
                        password: newPass,
                    })
                };

                fetch('https://qwikit1.pythonanywhere.com/userProfile/' + userid, requestOptions)
                    .then((response) => response.json())
                    .then((json) => {

                        setNointernet(false);

                        persistUser({ userid: userid, notify: testCredentials.natify, lan: true, cartbuy: testCredentials.cartbuy, cartrent: testCredentials.cartrent, productsave: testCredentials.productsave, flatsave: testCredentials.flatsave });

                        persistLogin({ userid: userid, lan: true });

                        // postflag ? navigation.navigate("UserLandingPage",{postflag:postflag}) : navigation.navigate("UserLandingPage",{})
                        postflag ? navigation.navigate("Homepage") : navigation.navigate("Homepage");


                    })
                    .catch((error) => {

                        console.error(error);
                        setNointernet(true);
                        setLoading1(false);


                    });
            }
            else {

                setNewPasswordcheck(false);
                setLoading1(false);

            }



        }
        else {

            setNewPasswordcheck(false);
            setLoading1(false);
        }

        if (nointernet) {
            setLoading1(false);
            setNointernet(true);
        }




    };

    useEffect(() => {
        // if(pass != ""){
        //     setPasswordcheck(true)
        // }

        // if(phone != ""){
        //     setSuccessNumber(true)
        // }
    });

    const handleMessage = (message) => {
        setMessage(message);
        // setMessageType(type)
    };
    const persistUser = (credentials) => {

        AsyncStorage.setItem('checkuserid', JSON.stringify(credentials))
            .then(() => {
                setNointernet(false);
                setTestCredentials(credentials);

            })
            .catch((error) => {
                setNointernet(true);
                // console.log(error)
                handleMessage('persisting login failed');
            });
    };

    const persistLogin = (credentials) => {

        AsyncStorage.setItem('qwikmedicLogin', JSON.stringify(credentials))
            .then(() => {
                setNointernet(false);
                setStoreCredentials(credentials);

            })
            .catch((error) => {
                setNointernet(true);
                // console.log(error)
                handleMessage('persisting login failed');
            });
    };


    return (

        <SafeAreaView style={[styles.MainContainer]}>
            <StatusBar
                animated={true}
                backgroundColor="#303030"
            />


            <View style={{ position: 'absolute', width: '100%', justifyContent: 'flex-end' }}>


                {/* <ImageBackground source={require("../assets/backgrounimg.jpg")} 
            style={{ width: '100%', height: '100%', flex:1}}> */}
                <ImageBackground style={{ width: '100%', height: '100%', flex: 1 }}>

                    <View style={[styles.navbar]}>
                        <Text style={{ left: 55, top: 17, color: colors.black, fontSize: 14, paddingBottom: 3, display: lan ? 'none' : 'flex', fontWeight: 'bold' }} >নতুন পাসওয়ার্ড</Text>
                        <Text style={{ left: 55, top: 17, color: colors.black, fontSize: 14, paddingBottom: 3, display: lan ? 'flex' : 'none', fontWeight: 'bold' }} >New Password</Text>

                    </View>
                    {/*                
                <View style={{position:'absolute'}}>
                    <Cercle1 style={{bottom:310,left:125}}/>
                </View>
                <View style={{position:'absolute'}}>
                    <Cercle2 style={{top:310,right:120}}/>
                </View> */}


                    {/* <View style={{width:170,height:138,bottom:50}}>
                    <Mainlogo/>
                </View> */}


                    <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', top: 110 }}>
                        {/* <View style={{width:170,height:138,marginBottom:150,}}>
                    <QM width={170} height={140} />
                </View> */}


                        <View style={styles.iddiv}>
                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 8 }}>
                                <Text style={{ color: newPasswordcheck ? colors.ash : colors.ash, fontSize: 12, paddingBottom: 5, display: lan ? 'none' : 'flex', fontWeight: 'bold' }}>ফোন নম্বর</Text>
                                <Text style={{ color: newPasswordcheck ? colors.ash : colors.ash, fontSize: 12, paddingBottom: 5, display: lan ? 'flex' : 'none', fontWeight: 'bold' }}>New Pin <Text style={{ color: colors.red }}>*</Text></Text>
                            </View>
                            <TextInput
                                style={[styles.input, { borderColor: newPasswordcheck ? colors.ash1 : colors.red, borderBottomWidth: 1, marginTop: 5 }]}
                                onChangeText={newTest => setNewPass(newTest)}

                                placeholder={lan ? "Enter New Pin" : "4 সংখ্যার একটি পাসওয়ার্ড দিন"}

                                defaultValue={newPass}
                                keyboardType='numeric'
                                maxLength={4}

                                secureTextEntry={true}
                            />
                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10, display: newPasswordcheck ? 'none' : 'flex' }}>

                                <Text style={{ color: colors.red, fontWeight: '700', fontSize: 12, paddingBottom: 3, display: lan ? 'flex' : 'none' }}>Incorrect Pin<Text style={{ color: colors.red, fontWeight: '400' }}> (Pin must be 4 digit)</Text><Text style={{ color: colors.red }}></Text></Text>

                            </View>

                        </View>





                        <Pressable style={[styles.tuchabluebutton, { top: -40, backgroundColor: isLoading1 ? colors.ash : '#EE426D', flexDirection: 'row' }]} onPress={() => { UpdatePassword(); }}>
                            <ActivityIndicator size="small" color="#00263C" style={{ display: isLoading1 ? 'flex' : 'none', right: 30 }} />
                            <Text style={{ color: colors.white, fontSize: 12, display: lan ? 'none' : 'flex' }}>জমা দিন</Text>
                            <Text style={{ color: colors.white, fontSize: 12, display: lan ? 'flex' : 'none' }}>Confirm</Text>
                        </Pressable>



                        {/* <Bottom_bar width={'100%'} style={{top:110}}/> */}
                    </View>

                    {/* <View style={{marginBottom:5,width:'95%',height:38,borderColor:'#D50400',borderWidth:1,borderRadius:3,justifyContent:'flex-start',alignItems:'center',flexDirection:'row',display: nointernet ? "flex" : "none"}}>
            <Text style={{marginLeft:15,fontSize:12,fontFamily: 'Poppins_400Regular',letterSpacing:.9,color:"#D50400"}}>No Internet Connection.</Text>
        </View> */}
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: 'center',
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        //paddingTop:200
    },
    navbar: {

        // backgroundColor: colors.white,
        width: '100%',
        height: 45,

    },
    ImgContainer: {

        justifyContent: "center",
        alignItems: 'center',
        width: "100%",
        height: 230,
        bottom: 90,

    },
    varadivologo: {
        width: "100%",
        height: "100%",

    },
    varadivowritten: {
        width: 118,
        height: 45,
        bottom: 189,
        paddingRight: 150,
    },

    iddiv: {
        width: "90%",
        height: 84,
        //borderColor:'black',
        //borderWidth:1,
        justifyContent: "center",
        alignItems: 'center',
        paddingBottom: 10,
        top: -100,

    },

    input: {
        width: "95%",
        height: 45,
        // backgroundColor:colors.white1,

        padding: 10,
        borderRadius: 4,
        fontSize: 12,
        paddingLeft: 0

    },



    passdiv: {
        width: "90%",
        height: 84,
        //borderColor:'black',
        //borderWidth:1,
        justifyContent: "center",
        alignItems: 'center',
        paddingBottom: 10,
        top: -100,
    },

    tuchabluebutton: {
        bottom: 50,
        width: "85%",
        height: 45,
        borderRadius: 4,
        backgroundColor: "#488291",
        justifyContent: "center",
        alignItems: 'center',

    }

});

export default Repassword;

