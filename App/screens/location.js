import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Platform, StatusBar, Image, Button, TextInput, Pressable, ScrollView, Linking, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { mainArea1 } from './adressdata';

import colors from '../config/colors';



function Location({ navigation, route }) {

    const [city, setCity] = useState(mainArea1);
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
                backgroundColor="#000066"
            // barStyle={statusBarStyle}

            />
            <View style={styles.navbar}>

                <Text style={{ left: 55, top: 17, color: "white", fontSize: 14 }} >Select Location</Text>

            </View>




            <ScrollView style={{ width: '100%' }}>
                <View style={{ width: '100%', height: 85, paddingTop: 10, paddingLeft: 10, display: route.params.flaguser ? 'none' : 'flex' }}>
                    <Pressable style={[styles.dataview, { width: '97%' }]} onPress={() => navigation.navigate("Alladds", { city: null, area: null, flag: true, locationflag: true })}>
                        <Text style={{ fontSize: 14, color: "#0A3C49", paddingLeft: 20 }} >
                            বাংলাদেশ এর সকল বিজ্ঞাপন
                        </Text>
                        <Icon name='chevron-right' style={{ right: 30, color: '#656565' }}></Icon>
                    </Pressable>
                </View>

                <View style={{ width: '100%', paddingTop: 0, justifyContent: 'center', alignItems: 'center', display: route.params.flaguser ? 'none' : 'flex' }}>
                    {city.map((data, index) => (

                        <Pressable key={index} style={styles.dataview} onPress={() => navigation.navigate("Areaaddress", { city: data.name, flaguser: false })}>
                            <Text style={{ fontSize: 14, color: "#0A3C49", paddingLeft: 20 }} >
                                {data.name}
                            </Text>
                            {/* <Icon name='chevron-right' style={{right:30,color:'#656565'}}></Icon> */}
                        </Pressable>


                    ))}
                </View>
                <View style={{ width: '100%', height: 75, paddingLeft: 10, display: route.params.flaguser ? 'none' : 'flex' }}>
                    <Pressable style={[styles.dataview, { width: '97%' }]} onPress={() => navigation.navigate("Alladds", { city: "নারায়ণগঞ্জ শহর", area: null, flag: true, locationflag: true })}>
                        <Text style={{ fontSize: 14, color: "#0A3C49", paddingLeft: 20 }} >
                            নারায়ণগঞ্জ শহর
                        </Text>

                    </Pressable>
                </View>
                <View style={{ width: '100%', height: 75, paddingLeft: 10, display: route.params.flaguser ? 'none' : 'flex' }}>
                    <Pressable style={[styles.dataview, { width: '97%' }]} onPress={() => navigation.navigate("Alladds", { city: "কুমিল্লা", area: null, flag: true, locationflag: true })}>
                        <Text style={{ fontSize: 14, color: "#0A3C49", paddingLeft: 20 }} >
                            কুমিল্লা
                        </Text>

                    </Pressable>
                </View>
                <View style={{ width: '100%', height: 75, paddingLeft: 10, display: route.params.flaguser ? 'none' : 'flex' }}>
                    <Pressable style={[styles.dataview, { width: '97%' }]} onPress={() => navigation.navigate("WelcomeVaradibo", { city: "গাজীপুর", area: null, flag: true })}>
                        <Text style={{ fontSize: 14, color: "#0A3C49", paddingLeft: 20 }} >
                            গাজীপুর
                        </Text>

                    </Pressable>
                </View>










                {/* for personaluser */}

                <View style={{ width: '100%', paddingTop: 0, justifyContent: 'center', alignItems: 'center', display: route.params.flaguser ? 'flex' : 'none' }}>
                    {city.map((data) => (

                        <Pressable style={styles.dataview} onPress={() => navigation.navigate("Areaaddress", { city: data.name, flaguser: true })}>
                            <Text style={{ fontSize: 14, color: "#0A3C49", paddingLeft: 20 }} >
                                {data.name}
                            </Text>
                            {/* <Icon name='chevron-right' style={{right:30,color:'#656565'}}></Icon> */}
                        </Pressable>


                    ))}
                </View>

                <View style={{ width: '100%', height: 75, paddingLeft: 10, display: route.params.flaguser ? 'flex' : 'none' }}>
                    <Pressable style={[styles.dataview, { width: '97%' }]} onPress={() => navigation.navigate("UserProfile", { cityname: "নারায়ণগঞ্জ শহর", flag1: true, areaname: "" })}>
                        <Text style={{ fontSize: 14, color: "#0A3C49", paddingLeft: 20 }} >
                            নারায়ণগঞ্জ শহর
                        </Text>

                    </Pressable>
                </View>
                <View style={{ width: '100%', height: 75, paddingLeft: 10, display: route.params.flaguser ? 'flex' : 'none' }}>
                    <Pressable style={[styles.dataview, { width: '97%' }]} onPress={() => navigation.navigate("UserProfile", { cityname: "কুমিল্লা", flag1: true, areaname: "" })}>
                        <Text style={{ fontSize: 14, color: "#0A3C49", paddingLeft: 20 }} >
                            কুমিল্লা
                        </Text>

                    </Pressable>
                </View>
                <View style={{ width: '100%', height: 75, paddingLeft: 10, display: route.params.flaguser ? 'flex' : 'none' }}>
                    <Pressable style={[styles.dataview, { width: '97%' }]} onPress={() => navigation.navigate("UserProfile", { cityname: "গাজীপুর", flag1: true, areaname: "" })}>
                        <Text style={{ fontSize: 14, color: "#0A3C49", paddingLeft: 20 }} >
                            গাজীপুর
                        </Text>

                    </Pressable>
                </View>
            </ScrollView>


        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: colors.loginprimary,
        justifyContent: "center",
        alignItems: 'center',
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingBottom: 10

    },
    dataview: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        height: 70,
        flexDirection: 'row',
        borderWidth: 4,
        borderColor: "#E2EBEE",
        backgroundColor: "#E7F0F2",
        marginBottom: 4,
        borderRadius: 2,
    },



    navbar: {

        backgroundColor: colors.layoutheader,
        width: '100%',
        height: 50,
    },


});

export default Location;