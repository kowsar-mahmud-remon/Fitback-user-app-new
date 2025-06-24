import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, ImageBackground, SafeAreaView, Platform, StatusBar, Image, Button, TextInput, Pressable, ScrollView, Switch, TurboModuleRegistry } from 'react-native';
import colors from '../config/colors';
import { Asset } from 'expo-asset';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../../components/CredintailsContext';
function AutouploadMed({ navigation, route }) {

    const [image, setImage] = useState('D:/QwikMedic/final image of medicines/images/Afun VT_1.jpg');

    const [medname, setMedname] = useState('test1Med');

    const { authtoken, setAuthtoken } = useContext(UserContext);
    let formdata = new FormData();

    const pickImage = async () => {



        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,

        });
        // console.log("start")


        if (!result.canceled) {
            setImage(result.assets[0].uri);
            // console.log(result.assets[0].uri)

            // setFalgimg1(true)
        }
    };

    const UpdateUser = () => {






        let filename = image ? image.split('/').pop() : null;
        let match = /\.(\w+)$/.exec(filename);

        let type = match ? `image/${match[1]}` : `image`;

        formdata.append('image', { uri: image, name: filename, type });

        formdata.append('userid', 4);

        fetch('https://qwikmedic.pythonanywhere.com/prescription/new', {
            method: 'POST',
            body: formdata,
            headers: {
                'content-type': 'multipart/form-data', 'Authorization': authtoken
            },
        })
            .then((response) => response.json())
            .then((json) => {
                // console.log("success")
                setNointernet(false);
                setLoading1(false);
                //   navigation.navigate("CustomSidebarMenu",{uploadprescription:true})

            })
            .catch((error) => {
                // console.log("error")

            });


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

                            <Pressable style={{ width: 22, height: 22, right: 15 }} onPress={() => navigation.navigate("Pharmacy", { reminder: true })} >
                                <Image
                                    style={{ width: 22, height: 22, left: 0, top: 2 }}
                                    resizeMode='contain'
                                    source={require('../assets/search.jpg')}
                                />
                            </Pressable>

                            <Pressable style={{ width: 22, height: 22, right: 0, display: cartbuy == undefined ? '' : cartbuy.length > 0 ? 'none' : 'flex' }} onPress={() => navigation.navigate("Cart", {})} >
                                <Image
                                    style={{ width: 22, height: 22, left: 0, top: 2 }}
                                    resizeMode='contain'
                                    source={require('../assets/ecart.jpg')}
                                />
                            </Pressable>

                            <Pressable style={{ width: 22, height: 22, right: 0, display: cartbuy == undefined ? '' : cartbuy.length > 0 ? 'flex' : 'none' }} onPress={() => navigation.navigate("Cart", {})} >
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


                <Pressable style={[styles.tuchabluebutton, { width: '35%', flexDirection: 'row', marginBottom: 40, height: 40, borderRadius: 4 }]} onPress={() => { UpdateUser(); }}>


                    <Text style={{ color: colors.white, fontSize: 14 }}>জমা দিন</Text>
                    <Text style={{ color: colors.white, fontSize: 12, letterSpacing: .9, fontFamily: 'Poppins_500Medium' }}>UPDATE</Text>
                </Pressable>

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
                    <Pressable style={{ marginTop: 10, borderRadius: 4, width: '95%', height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.blue }} onPress={() => pickImage()}>

                        <Text style={{ color: colors.white, fontSize: 12, fontFamily: 'Poppins_500Medium', letterSpacing: .9 }}>Add Prescription +</Text>

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
        paddingTop: 50,
    },
    imgview: {
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        width: 110,
        height: 110,
    },


    inputdiv: {
        width: "98%",
        height: 60,
        // justifyContent: "center",
        // alignItems:'center',  
        paddingBottom: 10,
        //top:-100

    },

    input: {
        width: "60%",
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
    sendform: {

        width: "100%",
        justifyContent: "center",
        alignItems: 'center',
        paddingTop: 50,
    },

    tuchabluebutton: {
        // paddingTop:20,
        width: "92%",
        height: 35,
        borderRadius: 4,
        backgroundColor: "#303030",
        justifyContent: "center",
        alignItems: 'center',
        top: 20

    },


});

export default AutouploadMed;