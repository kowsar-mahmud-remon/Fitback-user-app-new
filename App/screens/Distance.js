// // Calculate Distance Between Two Locations in React Native App
// // https://aboutreact.com/react-native-calculate-distance-between-two-locations/

// // import React in our code
// import React from 'react';

// // import all the components we are going to use
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   TouchableHighlight,
// } from 'react-native';

// /*
//  * 1. getDistance, Calculates the distance between 
//  *    two geo coordinates.
//  * 2. getPreciseDistance, Calculates the distance between
//  *    two geo coordinates. This method is more accurate then
//  *    getDistance, especially for long distances but it is
//  *    also slower. It is using the Vincenty inverse formula
//  *    for ellipsoids.
//  */
// import {getDistance, getPreciseDistance} from 'geolib';

// const Distance = () => {
//   const calculateDistance = () => {
//     var dis = getDistance(
//       {latitude: 23.7786546, longitude: 90.4272221},
//       {latitude: 23.745708348463033, longitude: 90.41236013174057},
//     );
//     alert(
//       `Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`
//     );
//   };

//   const calculatePreciseDistance = () => {
//     var pdis = getPreciseDistance(
//       {latitude: 23.7786546, longitude: 90.4272221},
//       {latitude: 23.745708348463033, longitude: 90.41236013174057},
//     );
//     alert(
//       `Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`
//     );
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={styles.container}>
//         <View style={styles.container}>
//           <Text style={styles.header}>
//             Example to Calculate Distance Between Two Locations
//           </Text>
//           <Text style={styles.textStyle}>
//             Distance between
//             {'\n'}
//             India(20.0504188, 64.4139099) 
//             and 
//             UK (51.528308, -0.3817765)
//           </Text>
//           <TouchableHighlight
//             style={styles.buttonStyle}
//             onPress={calculateDistance}>
//             <Text>Get Distance</Text>
//           </TouchableHighlight>
//           <Text style={styles.textStyle}>
//             Precise Distance between
//             {'\n'}
//             India(20.0504188, 64.4139099) 
//             and 
//             UK (51.528308, -0.3817765)
//           </Text>
//           <TouchableHighlight
//             style={styles.buttonStyle}
//             onPress={calculatePreciseDistance}>
//             <Text>
//               Get Precise Distance
//             </Text>
//           </TouchableHighlight>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 10,
//     justifyContent: 'center',
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: 'black',
//     textAlign: 'center',
//     paddingVertical: 20,
//   },
//   textStyle: {
//     marginTop: 30,
//     fontSize: 16,
//     textAlign: 'center',
//     color: 'black',
//     paddingVertical: 20,
//   },
//   buttonStyle: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 50,
//     backgroundColor: '#dddddd',
//     margin: 10,
//   },
// });

// export default Distance;












import React, { useState,useEffect } from 'react';
import { View, StyleSheet,Button,Text ,Pressable} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import colors from '../config/colors';
import {getDistance, getPreciseDistance} from 'geolib';

// AIzaSyBOJL7v2I5r7mWJKIVD2csZobOeqKTGAZ0
const MyMapView = () => {

  const [openpickup,setOpenpickup] =useState(false);
  const [pickupdone,setPickupdone] =useState(false);

  const [opendropout,setOpendropout] =useState(false);
  const [dropoutdone,setDropoutdone] =useState(false);


  const [markerPosition, setMarkerPosition] = useState({
    latitude: 23.811056,
    longitude: 90.407608,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerPosition1, setMarkerPosition1] = useState({
    latitude: 23.811056,
    longitude: 90.407608,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });




  const [newAddress, setNewAddress] = useState("")

  const [newAddress1, setNewAddress1] = useState("")

  const [distance1, setDistance1] = useState("")

  const [distance2, setDistance2] = useState("")
  

  
  const getData=(()=>{
    Geocoder.init("AIzaSyCXSQN60rmVblqkNYQkWFI291xwYvmLjvc");

    // Search by geo-location (reverse geo-code)
    Geocoder.from(markerPosition.latitude , markerPosition.longitude)
    .then(json => {
        var addressComponent = json.results[2].formatted_address;
        // console.log(addressComponent);
        setNewAddress(addressComponent)
        // alert(addressComponent)
    })
    .catch(error => console.warn(error));

  }) 

  const getData1=(()=>{
    Geocoder.init("AIzaSyCXSQN60rmVblqkNYQkWFI291xwYvmLjvc");

    // Search by geo-location (reverse geo-code)
    Geocoder.from(markerPosition1.latitude , markerPosition1.longitude)
    .then(json => {
        var addressComponent = json.results[2].formatted_address;
        // console.log(addressComponent);
        setNewAddress1(addressComponent)
        // alert(addressComponent)
    })
    .catch(error => console.warn(error));

  }) 



  const handleMapPress = event => {
    setMarkerPosition(event.nativeEvent.coordinate);
  };

  const handleMapPress1 = event => {
    setMarkerPosition1(event.nativeEvent.coordinate);
  };


  const [getMylocation,setGetMylocation] =useState(true);



  const calculateDistance = () => {
    var dis = getDistance(
      {latitude: markerPosition.latitude, longitude: markerPosition.longitude},
      {latitude: markerPosition1.latitude, longitude: markerPosition1.longitude},
    );
    alert(
      `Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`
    );
    // setDistance1(`Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`)
  };

  const calculatePreciseDistance = () => {
    var pdis = getPreciseDistance(
      {latitude: markerPosition.latitude, longitude: markerPosition.longitude},
      {latitude: markerPosition1.latitude, longitude: markerPosition1.longitude},
    );
    alert(
      `Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`
    );
    // setDistance2(`Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`)
  };


  useEffect(()=> {
    setNewAddress(newAddress)
    
    getData();
    getData1();
    // if(dropoutdone)
    // {
    //   calculateDistance()
    //   calculatePreciseDistance()
    //   console.log(distance1 , distance2)
    // }
    
    // console.log("latitude : ",markerPosition.latitude,"longitude : ",markerPosition.longitude)
  });

  return (
    <View style={styles.container}>

      <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',display: openpickup || opendropout ? 'none' : 'flex'}}>
        
        <Pressable style={{width:200,height:60,backgroundColor:colors.blue,justifyContent:'center',alignItems:'center'}} onPress={()=> setOpenpickup(true)}>
          <Text style={{fontSize:18,color:colors.white,fontFamily: 'Poppins_400Regular',letterSpacing:0.9}}>PickUP Location</Text>
        </Pressable>
        
        <Pressable disabled={ pickupdone ? false : true} style={{width:200,height:60,backgroundColor: pickupdone ? colors.green : colors.ash1,marginTop:50,justifyContent:'center',alignItems:'center'}}  onPress={()=> setOpendropout(true)}>
          <Text style={{fontSize:18,color:colors.white,fontFamily: 'Poppins_400Regular',letterSpacing:0.9}}>Dorpout Location</Text>
        </Pressable>


        <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',display: pickupdone || dropoutdone ? 'flex' : 'none',left:20,marginTop:30}}>
          <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',display: pickupdone ? 'flex' : 'none'}}>
            
            <Text style={{fontSize:16,color:colors.blue,fontFamily: 'Poppins_400Regular',letterSpacing:0.9}}>PickUP Location: </Text>
            <Text style={{fontSize:12,color:colors.text,fontFamily: 'Poppins_400Regular',letterSpacing:0.9}}>{newAddress}</Text>
       
          </View>

          <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start' ,display: dropoutdone ? 'flex' : 'none',marginTop:20}}>
            
            <Text style={{fontSize:16,color:colors.green,fontFamily: 'Poppins_400Regular',letterSpacing:0.9}}>Dropout Location: </Text>
            <Text style={{fontSize:12,color:colors.text,fontFamily: 'Poppins_400Regular',letterSpacing:0.9}}>{newAddress1}</Text>
       
          </View>


          <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start' ,display: 'none'}}>
            
            <Text style={{fontSize:16,color:colors.text,fontFamily: 'Poppins_400Regular',letterSpacing:0.9}}>Distance: </Text>
            <Text style={{fontSize:12,color:colors.text,fontFamily: 'Poppins_400Regular',letterSpacing:0.9}}></Text>
       
          </View>


          
        </View>

      </View>

      {/* pickup */}
      <View style={{width:'100%',height:'100%',display: openpickup ? 'flex' : 'none'}} >
        <MapView
          style={[styles.map]}
          onPress={handleMapPress}
          initialRegion={markerPosition}
        >
          <Marker
            coordinate={markerPosition}
            title="Pick Up"
            description="Set Pick Up Location"
          />

        </MapView>
        <View style={{width:'100%',height:30,justifyContent:'flex-start',alignItems:'flex-start'}}> 
          <Text>{newAddress}</Text>
        </View>
        
        <Button title='Done Pickup' onPress={()=> {setPickupdone(true),setOpenpickup(false)}}/>
      </View>

      {/* dropout */}
      <View style={{width:'100%',height:'100%',display: opendropout ? 'flex' : 'none'}}>
        <MapView
          style={[styles.map]}
          onPress={handleMapPress1}
          initialRegion={markerPosition1}
        >
          <Marker
            coordinate={markerPosition}
            title="Pick Up"
            description={newAddress}
          />
          <Marker
            coordinate={markerPosition1}
            title="Dorp Out"
            description="Set Dorp Out Location"
          />
        
        </MapView>
        <View style={{width:'100%',height:30,justifyContent:'flex-start',alignItems:'flex-start'}}> 
          <Text>{newAddress1}</Text>
        </View>
        
        <Button title='Done Dropout' onPress={()=> {setDropoutdone(true),setOpendropout(false)}}/>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MyMapView;






// MY FIXED LOCARTION

// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Button } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

// const MyMapView = () => {
//   const [mapRegion, setmapRegion] = useState({
//     latitude: 23.811056,
//     longitude: 90.407608,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   }); 
//   const userLocation = async () =>{
//     let {status} = await Location.requestForegroundPermissionsAsync();
//     if(status !== 'granted'){
//         setErrorMsg('Permission to access location was denied')

//     }

//     let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
//     setmapRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       }); 
//       console.log(location.coords.latitude, location.coords.longitude)
//   }
//   useEffect(()=> {
//     userLocation();
//   },[]);

//    return (
    
//     <View style={styles.container}>
//       <MapView
//         style={{ alignSelf: 'stretch', height: '95%' }}
//         region={mapRegion}
//       >
//         <Marker coordinate={mapRegion} title='Marker' />
//       </MapView>
//       <Button title='Get Location' onPress={userLocation}/>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });


// export default MyMapView;





// Dinamic Location

// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

// const MyMapView = () => {
//   const [markerPosition, setMarkerPosition] = useState({
//     latitude: 37.78825,
//     longitude: -122.4324,
//   });

//   const handleMapPress = event => {
//     setMarkerPosition(event.nativeEvent.coordinate);
//   };

//   return (
    // <View style={styles.container}>
    //   <MapView
    //     style={styles.map}
    //     onPress={handleMapPress}
    //     initialRegion={{
    //       latitude: 37.78825,
    //       longitude: -122.4324,
    //       latitudeDelta: 0.0922,
    //       longitudeDelta: 0.0421,
    //     }}
    //   >
    //     <Marker
    //       coordinate={markerPosition}
    //       title="Marker Title"
    //       description="Marker Description"
    //     />
    //   </MapView>
    // </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default MyMapView;
