import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Credentials-Context
import { CredentialsContext } from '../components/CredintailsContext';

//Credentials-Context
import { WellcomeContext } from '../components/CredintailsContext';

//screens
import Firstslider from '../App/screens/firstslide';
import Secondslide from '../App/screens/secondslide';
import Thirdslide from '../App/screens/thirdslide';
import Homepage from '../App/screens/homepage';


import colors from '../App/config/colors';

import Login from '../App/screens/Login';
import Signup from '../App/screens/signup';
import Contuctus from '../App/screens/contuctus';
import Settings from '../App/screens/settings';

import UserProfile from '../App/screens/userProfile';

import ViewImg from '../App/screens/viewImg';
import Otpinput from '../App/screens/otpinput';
import Repassword from '../App/screens/repassword';

import OtpinputChangeNumber from '../App/screens/otpinputChangeNumber';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View, ImageBackground, SafeAreaView, Platform, StatusBar, Image, Button, TextInput, TouchableOpacity } from 'react-native';

import Cart from '../App/screens/Cart';

import PlaceOrder from '../App/screens/PlaceOrder';

import Heathmart from '../App/screens/Heathmart';
import Notification from '../App/screens/Notification';

import Favourites from '../App/screens/Favourites';

import OrdermedicineHome from '../App/screens/OrdermedicineHome';
import OrdermedicineDetails from '../App/screens/OrdermedicineDetails';


// need to check again 
// import Services from '../App/screens/Services';
// import SuccessOrder from '../App/screens/SuccessOrder';
// import AboutUs from '../App/screens/AboutUs';
// import MakeAppoinment from '../App/screens/MakeAppoinment';
// import BookAppoinment from '../App/screens/BookAppoinment';
// import Promohome from '../App/screens/Promohome';




import HelpFQ from '../App/screens/HelpFQ';
import TermsConditions from '../App/screens/TermsConditions';
import MedRequest from '../App/screens/MedRequest';
import MyQcoins from '../App/screens/MyQcoins';

import CustomSidebarMenu from '../App/screens/CustomSidebarMenu';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Health from '../App/screens/Health';
import BmiCalculator from '../App/screens/BmiCalculator';
import CalorieCalculator from '../App/screens/CalorieCalculator';
import HealthTracking from '../App/screens/HealthTracking';
import HealthTrackingDetails from '../App/screens/HealthTrackingDetails';
import Chat from '../App/screens/Chat';
import UserChat from '../App/screens/UserChat';
import WeightTracker from '../App/screens/WeightTracker';
import BmiTracker from '../App/screens/BmiTracker';
import BpTracker from '../App/screens/BpTracker';
import BellySizeTracker from '../App/screens/BellySizeTracker';
import SslcommerzPayment from '../App/screens/SslcommerzPayment';
import SuccessScreen from '../App/screens/SuccessScreen';
import DietitianProfile from '../App/screens/DietitianProfile';
import TestPage from '../App/screens/TestPage';
import TestResultPage from '../App/screens/TestResultPage';
import IncorrectAnswerPage from '../App/screens/IncorrectAnswerPage';
import FullSolutionsPage from '../App/screens/FullSolutionsPage';
import CustomerReview from '../App/screens/CustomerReview';
import MyFitBackPackage from '../App/screens/MyFitbackPackage';
import MyResetPackage from '../App/screens/MyResetPackage';
import FoodWiseCalories from '../App/screens/FoodWiseCalories';
import RecipeVideo from '../App/screens/RecipeVideo';
import ExerciseVideo from '../App/screens/ExerciseVideo';
import HealthTipsVideo from '../App/screens/HealthTipsVideo';
import ChangePinPage from '../App/screens/ChangePinPage';
import CheckWellness from '../App/screens/CheckWellness';
import WaterIntakePage from '../App/screens/WaterIntakePage';
import MyReport from '../App/screens/MyReport';
import ActivitiesTracking from '../App/screens/ActivitiesTracking';
import AddReview from '../App/screens/AddReview';
import NotificationTestScreen from '../App/screens/NotificationTestScreen';


const Stack = createNativeStackNavigator();


const Drawer = createDrawerNavigator();

const linking = {
    prefixes: ['paymentapp://'],  // Your custom URL scheme
    config: {
        screens: {
            Success: 'success',  // Maps "paymentapp://success" to Success screen
        },
    },
};

const StackNavigator = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                // headerStyle:{
                //     backgroundColor: "transparent"
                // },
                headerTintColor: "#FFFFFF",
                headerTitle: "",
                headerTransparent: true,
                headerLeftContainerStyle: {
                    paddingLeft: 20
                },
            }}
            initialRouteName="Homepage"
        >


            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen name="CustomSidebarMenu" component={CustomSidebarMenu} />
            <Stack.Screen name="Contuctus" component={Contuctus} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="ChangePinPage" component={ChangePinPage} />
            <Stack.Screen name="OtpinputChangeNumber" component={OtpinputChangeNumber} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="WeightTracker" component={WeightTracker} />
            <Stack.Screen name="MyReport" component={MyReport} />
            <Stack.Screen name="AddReview" component={AddReview} />
            <Stack.Screen name="BmiTracker" component={BmiTracker} />
            <Stack.Screen name="SslcommerzPayment" component={SslcommerzPayment} />
            <Stack.Screen name="Success" component={SuccessScreen} />
            <Stack.Screen name="BpTracker" component={BpTracker} />
            <Stack.Screen name="BellySizeTracker" component={BellySizeTracker} />
            <Stack.Screen name="BmiCalculator" component={BmiCalculator} />
            <Stack.Screen name="WaterIntakePage" component={WaterIntakePage} />
            <Stack.Screen name="UserChat" component={UserChat} />
            <Stack.Screen name="TestPage" component={TestPage} />
            <Stack.Screen name="TestResultPage" component={TestResultPage} />
            <Stack.Screen name="IncorrectAnswerPage" component={IncorrectAnswerPage} />
            <Stack.Screen name="MyFitBackPackage" component={MyFitBackPackage} />
            <Stack.Screen name="MyResetPackage" component={MyResetPackage} />
            <Stack.Screen name="NotificationTestScreen" component={NotificationTestScreen} />
            <Stack.Screen name="FullSolutionsPage" component={FullSolutionsPage} />
            <Stack.Screen name="CustomerReview" component={CustomerReview} />
            <Stack.Screen name="DietitianProfile" component={DietitianProfile} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="CalorieCalculator" component={CalorieCalculator} />
            <Stack.Screen name="HealthTracking" component={HealthTracking} />
            <Stack.Screen name="HealthTrackingDetails" component={HealthTrackingDetails} />
            <Stack.Screen name="CheckWellness" component={CheckWellness} />
            <Stack.Screen name="RecipeVideo" component={RecipeVideo} />
            <Stack.Screen name="ExerciseVideo" component={ExerciseVideo} />
            <Stack.Screen name="HealthTipsVideo" component={HealthTipsVideo} />
            <Stack.Screen name="FoodWiseCalories" component={FoodWiseCalories} />
            <Stack.Screen name="ActivitiesTracking" component={ActivitiesTracking} />

            <Stack.Screen name="OrdermedicineDetails" component={OrdermedicineDetails} />
            <Stack.Screen name="ViewImg" component={ViewImg} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
            <Stack.Screen name="Heathmart" component={Heathmart} />
            <Stack.Screen name="Notification" component={Notification} />
            {/* <Stack.Screen name="Promohome" component={Promohome} /> */}
            {/* <Stack.Screen name="Services" component={Services} /> */}
            <Stack.Screen name="Health" component={Health} />
            <Stack.Screen name="Favourites" component={Favourites} />
            <Stack.Screen name="OrdermedicineHome" component={OrdermedicineHome} />
            {/* <Stack.Screen name="SuccessOrder" component={SuccessOrder} /> */}

            <Stack.Screen name="HelpFQ" component={HelpFQ} />
            {/* <Stack.Screen name="AboutUs" component={AboutUs} /> */}
            <Stack.Screen name="TermsConditions" component={TermsConditions} />


            <Stack.Screen name="MedRequest" component={MedRequest} />
            <Stack.Screen name="MyQcoins" component={MyQcoins} />
            {/* <Stack.Screen name="MakeAppoinment" component={MakeAppoinment} /> */}
            {/* <Stack.Screen name="BookAppoinment" component={BookAppoinment} /> */}

            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Firstslider" component={Firstslider} />
            <Stack.Screen name="Secondslide" component={Secondslide} />
            <Stack.Screen name="Thirdslide" component={Thirdslide} />


            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Otpinput" component={Otpinput} />
            <Stack.Screen name="Repassword" component={Repassword} />

        </Stack.Navigator>
    );
};

const RootStack = ({ navigation }) => {
    return (
        <WellcomeContext.Consumer>
            {({ storeWellcome }) => (
                <>
                    {storeWellcome ? (

                        <CredentialsContext.Consumer>
                            {({ storeCredentials }) => (
                                <NavigationContainer
                                    linking={linking}

                                // backBehavior='initialRoute'
                                // initialRouteName='Root'

                                >

                                    {storeCredentials ? (
                                        <>


                                            <Drawer.Navigator
                                                options={{ unmountOnBlur: true, lazy: true, drawerIcon: { focused: true, color: 'black', size: 41 } }}

                                                drawerIcon={null}
                                                style={{ display: "none" }}

                                                screenOptions={{ drawerPosition: "right", swipeEnabled: false, unmountOnBlur: true, lazy: true }}

                                                drawerContent={(props) => <CustomSidebarMenu {...props} />}

                                            >


                                                {/* <Drawer.Screen key='stackNavigator' name="StackNavigator" component={StackNavigator} /> */}

                                                <Drawer.Screen key='stackNavigator' name='StackNavigator' component={StackNavigator} style={{ marginTop: 100 }}
                                                    options={{
                                                        headerShown: false,
                                                        drawerLabel: () => null,
                                                        title: null,
                                                        drawerIcon: () => null
                                                    }}

                                                />
                                                {/* <Drawer.Screen key='customSidebarMenu' name='CustomSidebarMenu' component={CustomSidebarMenu} style={{marginTop:100}}
                                                        options={{
                                                            drawerLabel: () => null,
                                                            title: null,
                                                            drawerIcon: () => null,
                                                            
                                                        }}
                                                    /> */}
                                            </Drawer.Navigator>

                                        </>
                                    ) : (
                                        <>
                                            <Stack.Navigator
                                                screenOptions={{
                                                    headerStyle: {
                                                        backgroundColor: "transparent"
                                                    },
                                                    headerTintColor: "#F0F0EE",
                                                    headerTitle: "",
                                                    headerTransparent: true,
                                                    headerLeftContainerStyle: {
                                                        paddingLeft: 20
                                                    }
                                                }}
                                                initialRouteName="Firstslider"

                                            >

                                                <Stack.Screen name="Login" component={Login} />
                                                <Stack.Screen name="Signup" component={Signup} />
                                                <Stack.Screen name="Otpinput" component={Otpinput} />
                                                <Stack.Screen name="Repassword" component={Repassword} />
                                                <Stack.Screen name="Homepage" component={Homepage} />

                                                <Stack.Screen name="CustomSidebarMenu" component={CustomSidebarMenu} />
                                                <Stack.Screen name="Contuctus" component={Contuctus} />
                                                <Stack.Screen name="Settings" component={Settings} />
                                                <Stack.Screen name="ChangePinPage" component={ChangePinPage} />
                                                <Stack.Screen name="OtpinputChangeNumber" component={OtpinputChangeNumber} />
                                                <Stack.Screen name="UserProfile" component={UserProfile} />
                                                <Stack.Screen name="WeightTracker" component={WeightTracker} />
                                                <Stack.Screen name="MyReport" component={MyReport} />
                                                <Stack.Screen name="AddReview" component={AddReview} />
                                                <Stack.Screen name="BmiTracker" component={BmiTracker} />
                                                <Stack.Screen name="SslcommerzPayment" component={SslcommerzPayment} />
                                                <Stack.Screen name="Success" component={SuccessScreen} />
                                                <Stack.Screen name="BpTracker" component={BpTracker} />
                                                <Stack.Screen name="BellySizeTracker" component={BellySizeTracker} />
                                                <Stack.Screen name="BmiCalculator" component={BmiCalculator} />
                                                <Stack.Screen name="WaterIntakePage" component={WaterIntakePage} />
                                                <Stack.Screen name="Chat" component={Chat} />
                                                <Stack.Screen name="UserChat" component={UserChat} />
                                                <Stack.Screen name="TestPage" component={TestPage} />
                                                <Stack.Screen name="TestResultPage" component={TestResultPage} />
                                                <Stack.Screen name="IncorrectAnswerPage" component={IncorrectAnswerPage} />
                                                <Stack.Screen name="MyFitBackPackage" component={MyFitBackPackage} />
                                                <Stack.Screen name="MyResetPackage" component={MyResetPackage} />
                                                <Stack.Screen name="NotificationTestScreen" component={NotificationTestScreen} />
                                                <Stack.Screen name="FullSolutionsPage" component={FullSolutionsPage} />
                                                <Stack.Screen name="CustomerReview" component={CustomerReview} />
                                                <Stack.Screen name="DietitianProfile" component={DietitianProfile} />
                                                <Stack.Screen name="CalorieCalculator" component={CalorieCalculator} />
                                                <Stack.Screen name="HealthTracking" component={HealthTracking} />
                                                <Stack.Screen name="HealthTrackingDetails" component={HealthTrackingDetails} />
                                                <Stack.Screen name="CheckWellness" component={CheckWellness} />
                                                <Stack.Screen name="RecipeVideo" component={RecipeVideo} />
                                                <Stack.Screen name="ExerciseVideo" component={ExerciseVideo} />
                                                <Stack.Screen name="HealthTipsVideo" component={HealthTipsVideo} />
                                                <Stack.Screen name="FoodWiseCalories" component={FoodWiseCalories} />
                                                <Stack.Screen name="ActivitiesTracking" component={ActivitiesTracking} />
                                                <Stack.Screen name="OrdermedicineDetails" component={OrdermedicineDetails} />
                                                <Stack.Screen name="ViewImg" component={ViewImg} />
                                                <Stack.Screen name="Cart" component={Cart} />
                                                <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
                                                <Stack.Screen name="Heathmart" component={Heathmart} />
                                                <Stack.Screen name="Notification" component={Notification} />
                                                {/* <Stack.Screen name="Promohome" component={Promohome} /> */}
                                                {/* <Stack.Screen name="Services" component={Services} /> */}
                                                <Stack.Screen name="Health" component={Health} />
                                                <Stack.Screen name="Favourites" component={Favourites} />
                                                <Stack.Screen name="OrdermedicineHome" component={OrdermedicineHome} />
                                                {/* <Stack.Screen name="SuccessOrder" component={SuccessOrder} /> */}

                                                <Stack.Screen name="HelpFQ" component={HelpFQ} />
                                                {/* <Stack.Screen name="AboutUs" component={AboutUs} /> */}
                                                <Stack.Screen name="TermsConditions" component={TermsConditions} />


                                                <Stack.Screen name="MedRequest" component={MedRequest} />
                                                <Stack.Screen name="MyQcoins" component={MyQcoins} />
                                                {/* <Stack.Screen name="MakeAppoinment" component={MakeAppoinment} /> */}
                                                {/* <Stack.Screen name="BookAppoinment" component={BookAppoinment} /> */}
                                            </Stack.Navigator>


                                        </>
                                    )
                                    }




                                </NavigationContainer>
                            )}
                        </CredentialsContext.Consumer>

                    ) : (

                        <CredentialsContext.Consumer>
                            {({ storeCredentials }) => (
                                <NavigationContainer linking={linking}>
                                    <Stack.Navigator
                                        screenOptions={{
                                            headerStyle: {
                                                backgroundColor: "transparent"
                                            },
                                            headerTintColor: "#F0F0EE",
                                            headerTitle: "",
                                            headerTransparent: true,
                                            headerLeftContainerStyle: {
                                                paddingLeft: 20
                                            }
                                        }}
                                        initialRouteName="Firstslider"

                                    >
                                        {storeCredentials ? (
                                            <>

                                                <Stack.Screen name="Firstslider" component={Firstslider} />
                                                <Stack.Screen name="Secondslide" component={Secondslide} />
                                                <Stack.Screen name="Thirdslide" component={Thirdslide} />

                                                <Stack.Screen name="Login" component={Login} />
                                                <Stack.Screen name="Signup" component={Signup} />
                                                <Stack.Screen name="Otpinput" component={Otpinput} />
                                                <Stack.Screen name="Repassword" component={Repassword} />

                                                <Stack.Screen name="Homepage" component={Homepage} />


                                                <Stack.Screen name="CustomSidebarMenu" component={CustomSidebarMenu} />
                                                <Stack.Screen name="Contuctus" component={Contuctus} />
                                                <Stack.Screen name="Settings" component={Settings} />
                                                <Stack.Screen name="ChangePinPage" component={ChangePinPage} />
                                                <Stack.Screen name="OtpinputChangeNumber" component={OtpinputChangeNumber} />
                                                <Stack.Screen name="UserProfile" component={UserProfile} />
                                                <Stack.Screen name="WeightTracker" component={WeightTracker} />
                                                <Stack.Screen name="MyReport" component={MyReport} />
                                                <Stack.Screen name="AddReview" component={AddReview} />
                                                <Stack.Screen name="BmiTracker" component={BmiTracker} />
                                                <Stack.Screen name="SslcommerzPayment" component={SslcommerzPayment} />
                                                <Stack.Screen name="Success" component={SuccessScreen} />
                                                <Stack.Screen name="BpTracker" component={BpTracker} />
                                                <Stack.Screen name="BellySizeTracker" component={BellySizeTracker} />
                                                <Stack.Screen name="BmiCalculator" component={BmiCalculator} />
                                                <Stack.Screen name="WaterIntakePage" component={WaterIntakePage} />
                                                <Stack.Screen name="Chat" component={Chat} />
                                                <Stack.Screen name="UserChat" component={UserChat} />
                                                <Stack.Screen name="TestPage" component={TestPage} />
                                                <Stack.Screen name="TestResultPage" component={TestResultPage} />
                                                <Stack.Screen name="IncorrectAnswerPage" component={IncorrectAnswerPage} />
                                                <Stack.Screen name="MyFitBackPackage" component={MyFitBackPackage} />
                                                <Stack.Screen name="MyResetPackage" component={MyResetPackage} />
                                                <Stack.Screen name="NotificationTestScreen" component={NotificationTestScreen} />
                                                <Stack.Screen name="FullSolutionsPage" component={FullSolutionsPage} />
                                                <Stack.Screen name="CustomerReview" component={CustomerReview} />
                                                <Stack.Screen name="DietitianProfile" component={DietitianProfile} />
                                                <Stack.Screen name="CalorieCalculator" component={CalorieCalculator} />
                                                <Stack.Screen name="HealthTracking" component={HealthTracking} />
                                                <Stack.Screen name="HealthTrackingDetails" component={HealthTrackingDetails} />
                                                <Stack.Screen name="CheckWellness" component={CheckWellness} />
                                                <Stack.Screen name="RecipeVideo" component={RecipeVideo} />
                                                <Stack.Screen name="ExerciseVideo" component={ExerciseVideo} />
                                                <Stack.Screen name="HealthTipsVideo" component={HealthTipsVideo} />
                                                <Stack.Screen name="FoodWiseCalories" component={FoodWiseCalories} />
                                                <Stack.Screen name="ActivitiesTracking" component={ActivitiesTracking} />

                                                <Stack.Screen name="OrdermedicineDetails" component={OrdermedicineDetails} />
                                                <Stack.Screen name="ViewImg" component={ViewImg} />
                                                <Stack.Screen name="Cart" component={Cart} />
                                                <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
                                                <Stack.Screen name="Heathmart" component={Heathmart} />
                                                <Stack.Screen name="Notification" component={Notification} />
                                                {/* <Stack.Screen name="Promohome" component={Promohome} /> */}
                                                {/* <Stack.Screen name="Services" component={Services} /> */}
                                                <Stack.Screen name="Health" component={Health} />
                                                <Stack.Screen name="Favourites" component={Favourites} />
                                                <Stack.Screen name="OrdermedicineHome" component={OrdermedicineHome} />
                                                {/* <Stack.Screen name="SuccessOrder" component={SuccessOrder} /> */}
                                                <Stack.Screen name="HelpFQ" component={HelpFQ} />
                                                {/* <Stack.Screen name="AboutUs" component={AboutUs} /> */}
                                                <Stack.Screen name="TermsConditions" component={TermsConditions} />


                                                <Stack.Screen name="MedRequest" component={MedRequest} />
                                                <Stack.Screen name="MyQcoins" component={MyQcoins} />
                                                {/* <Stack.Screen name="MakeAppoinment" component={MakeAppoinment} /> */}
                                                {/* <Stack.Screen name="BookAppoinment" component={BookAppoinment} /> */}

                                            </>
                                        ) : (
                                            <>


                                                <Stack.Screen name="Login" component={Login} />
                                                <Stack.Screen name="Firstslider" component={Firstslider} />
                                                <Stack.Screen name="Secondslide" component={Secondslide} />
                                                <Stack.Screen name="Thirdslide" component={Thirdslide} />


                                                <Stack.Screen name="Signup" component={Signup} />
                                                <Stack.Screen name="Otpinput" component={Otpinput} />
                                                <Stack.Screen name="Repassword" component={Repassword} />
                                                <Stack.Screen name="Homepage" component={Homepage} />

                                                <Stack.Screen name="CustomSidebarMenu" component={CustomSidebarMenu} />
                                                <Stack.Screen name="Contuctus" component={Contuctus} />
                                                <Stack.Screen name="Settings" component={Settings} />
                                                <Stack.Screen name="ChangePinPage" component={ChangePinPage} />
                                                <Stack.Screen name="OtpinputChangeNumber" component={OtpinputChangeNumber} />
                                                <Stack.Screen name="UserProfile" component={UserProfile} />
                                                <Stack.Screen name="WeightTracker" component={WeightTracker} />
                                                <Stack.Screen name="MyReport" component={MyReport} />
                                                <Stack.Screen name="AddReview" component={AddReview} />
                                                <Stack.Screen name="BmiTracker" component={BmiTracker} />
                                                <Stack.Screen name="SslcommerzPayment" component={SslcommerzPayment} />
                                                <Stack.Screen name="Success" component={SuccessScreen} />
                                                <Stack.Screen name="BpTracker" component={BpTracker} />
                                                <Stack.Screen name="BellySizeTracker" component={BellySizeTracker} />
                                                <Stack.Screen name="BmiCalculator" component={BmiCalculator} />
                                                <Stack.Screen name="WaterIntakePage" component={WaterIntakePage} />
                                                <Stack.Screen name="Chat" component={Chat} />
                                                <Stack.Screen name="UserChat" component={UserChat} />
                                                <Stack.Screen name="TestPage" component={TestPage} />
                                                <Stack.Screen name="TestResultPage" component={TestResultPage} />
                                                <Stack.Screen name="IncorrectAnswerPage" component={IncorrectAnswerPage} />
                                                <Stack.Screen name="MyFitBackPackage" component={MyFitBackPackage} />
                                                <Stack.Screen name="MyResetPackage" component={MyResetPackage} />
                                                <Stack.Screen name="NotificationTestScreen" component={NotificationTestScreen} />
                                                <Stack.Screen name="FullSolutionsPage" component={FullSolutionsPage} />
                                                <Stack.Screen name="CustomerReview" component={CustomerReview} />
                                                <Stack.Screen name="DietitianProfile" component={DietitianProfile} />
                                                <Stack.Screen name="CalorieCalculator" component={CalorieCalculator} />
                                                <Stack.Screen name="HealthTracking" component={HealthTracking} />
                                                <Stack.Screen name="HealthTrackingDetails" component={HealthTrackingDetails} />
                                                <Stack.Screen name="CheckWellness" component={CheckWellness} />
                                                <Stack.Screen name="RecipeVideo" component={RecipeVideo} />
                                                <Stack.Screen name="ExerciseVideo" component={ExerciseVideo} />
                                                <Stack.Screen name="HealthTipsVideo" component={HealthTipsVideo} />
                                                <Stack.Screen name="FoodWiseCalories" component={FoodWiseCalories} />
                                                <Stack.Screen name="ActivitiesTracking" component={ActivitiesTracking} />
                                                <Stack.Screen name="OrdermedicineDetails" component={OrdermedicineDetails} />
                                                <Stack.Screen name="ViewImg" component={ViewImg} />
                                                <Stack.Screen name="Cart" component={Cart} />
                                                <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
                                                <Stack.Screen name="Heathmart" component={Heathmart} />
                                                <Stack.Screen name="Notification" component={Notification} />
                                                {/* <Stack.Screen name="Promohome" component={Promohome} /> */}
                                                {/* <Stack.Screen name="Services" component={Services} /> */}
                                                <Stack.Screen name="Health" component={Health} />
                                                <Stack.Screen name="Favourites" component={Favourites} />
                                                <Stack.Screen name="OrdermedicineHome" component={OrdermedicineHome} />
                                                {/* <Stack.Screen name="SuccessOrder" component={SuccessOrder} /> */}
                                                <Stack.Screen name="HelpFQ" component={HelpFQ} />
                                                {/* <Stack.Screen name="AboutUs" component={AboutUs} /> */}
                                                <Stack.Screen name="TermsConditions" component={TermsConditions} />


                                                <Stack.Screen name="MedRequest" component={MedRequest} />
                                                <Stack.Screen name="MyQcoins" component={MyQcoins} />
                                                {/* <Stack.Screen name="MakeAppoinment" component={MakeAppoinment} /> */}
                                                {/* <Stack.Screen name="BookAppoinment" component={BookAppoinment} /> */}

                                            </>
                                        )
                                        }



                                    </Stack.Navigator>
                                </NavigationContainer>
                            )}
                        </CredentialsContext.Consumer>
                    )}
                </>
            )}


        </WellcomeContext.Consumer>

    );
};

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: colors.body,
        justifyContent: "center",
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },

    ImgContainer: {

        width: "100%",
        height: 209,
        // top:182

    },

    language: {
        flex: 1,

        backgroundColor: "#3C709E",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 5,
        width: 75,
        height: 30


    },
    tuchabluebutton: {
        width: "35%",
        height: 34,
        borderRadius: 2,
        //  backgroundColor:colors.black,
        justifyContent: "center",
        alignItems: 'center',
    },
    footerStyle: {
        height: '7%',
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

});
export default RootStack;