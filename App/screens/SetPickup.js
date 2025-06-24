import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import colors from '../config/colors';
import { getDistance, getPreciseDistance } from 'geolib';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// AIzaSyBOJL7v2I5r7mWJKIVD2csZobOeqKTGAZ0
const MyMapView = () => {

  const [openpickup, setOpenpickup] = useState(false);
  const [pickupdone, setPickupdone] = useState(false);

  const [opendropout, setOpendropout] = useState(false);
  const [dropoutdone, setDropoutdone] = useState(false);


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

  const [region, setRegion] = useState({
    latitude: 23.811056,
    longitude: 90.407608,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });




  const [newAddress, setNewAddress] = useState("");

  const [newAddress1, setNewAddress1] = useState("");

  const [distance1, setDistance1] = useState("");

  const [distance2, setDistance2] = useState("");



  const getData = (() => {
    Geocoder.init("AIzaSyCXSQN60rmVblqkNYQkWFI291xwYvmLjvc");

    // Search by geo-location (reverse geo-code)
    Geocoder.from(markerPosition.latitude, markerPosition.longitude)
      .then(json => {
        var addressComponent = json.results[2].formatted_address;
        // console.log(addressComponent);
        setNewAddress(addressComponent);
        // alert(addressComponent)
      })
      .catch(error => console.warn(error));

  });

  const getData1 = (() => {
    Geocoder.init("AIzaSyCXSQN60rmVblqkNYQkWFI291xwYvmLjvc");

    // Search by geo-location (reverse geo-code)
    Geocoder.from(markerPosition1.latitude, markerPosition1.longitude)
      .then(json => {
        var addressComponent = json.results[2].formatted_address;
        // console.log(addressComponent);
        setNewAddress1(addressComponent);
        // alert(addressComponent)
      })
      .catch(error => console.warn(error));

  });


  const getData3 = (() => {
    Geocoder.init("AIzaSyCXSQN60rmVblqkNYQkWFI291xwYvmLjvc");

    // Search by geo-location (reverse geo-code)
    Geocoder.from(region.latitude, region.longitude)
      .then(json => {
        var addressComponent = json.results[2].formatted_address;
        // console.log("addressComponent** :",addressComponent);
        // setNewAddress1(addressComponent)
        // alert(addressComponent)
      })
      .catch(error => console.warn(error));

  });


  const handleMapPress = event => {
    setMarkerPosition(event.nativeEvent.coordinate);
  };

  const handleMapPress1 = event => {
    setMarkerPosition1(event.nativeEvent.coordinate);
  };


  const [getMylocation, setGetMylocation] = useState(true);



  const calculateDistance = () => {
    var dis = getDistance(
      { latitude: markerPosition.latitude, longitude: markerPosition.longitude },
      { latitude: markerPosition1.latitude, longitude: markerPosition1.longitude },
    );
    // alert(
    //   `Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`
    // );
    setDistance1(`${dis / 1000} KM`);
  };

  const calculatePreciseDistance = () => {
    var pdis = getPreciseDistance(
      { latitude: markerPosition.latitude, longitude: markerPosition.longitude },
      { latitude: markerPosition1.latitude, longitude: markerPosition1.longitude },
    );
    // alert(
    //   `Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`
    // );
    setDistance2(`${pdis / 1000} KM`);
  };


  useEffect(() => {
    setNewAddress(newAddress);
    getData();
    getData1();
    if (dropoutdone) {
      calculateDistance();
      calculatePreciseDistance();
      // console.log(distance1 , distance2)
    }

    // console.log("latitude : ",markerPosition.latitude,"longitude : ",markerPosition.longitude)
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
    <View style={styles.container}>

      {/* <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',display: openpickup || opendropout ? 'none' : 'flex'}}>
        
        <Pressable style={{width:200,height:60,backgroundColor:colors.blue,justifyContent:'center',alignItems:'center'}} onPress={()=> setOpenpickup(true)}>
          <Text style={{fontSize:18,color:colors.white,fontFamily: 'Poppins_400Regular',letterSpacing:0.9}}>PickUP Location</Text>
        </Pressable>
        
        <Pressable disabled={ pickupdone ? false : true} style={{width:200,height:60,backgroundColor: pickupdone ? colors.green : colors.ash1,marginTop:50,justifyContent:'center',alignItems:'center'}}  onPress={()=> setOpendropout(true)}>
          <Text style={{fontSize:18,color:colors.white,fontFamily: 'Poppins_400Regular',letterSpacing:0.9}}>Dorpout Location</Text>
        </Pressable>


        <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',display: pickupdone || dropoutdone ? 'flex' : 'none',left:20,marginTop:30}}>
          <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',display: pickupdone ? 'flex' : 'none'}}>
            
            <Text style={{fontSize:14,color:colors.blue,fontFamily: 'Poppins_400Regular',letterSpacing:0.9}}>PickUP Location: </Text>
            <Text style={{fontSize:12,color:colors.text,fontFamily: 'Poppins_400Regular',letterSpacing:0.9}}>{newAddress}</Text>
       
          </View>

          <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start' ,display: dropoutdone ? 'flex' : 'none',marginTop:20}}>
            
            <Text style={{fontSize:14,color:colors.green,fontFamily: 'Poppins_400Regular',letterSpacing:0.9}}>Dropout Location: </Text>
            <Text style={{fontSize:12,color:colors.text,fontFamily: 'Poppins_400Regular',letterSpacing:0.9}}>{newAddress1}</Text>
       
          </View>


          <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start' ,display: dropoutdone ? 'flex' : 'none',marginTop:20}}>
            
            <Text style={{fontSize:14,color:colors.ash,fontFamily: 'Poppins_400Regular',letterSpacing:0.9}}>Distance: </Text>
            <Text style={{fontSize:14,color:colors.green,fontFamily: 'Poppins_400Regular',letterSpacing:0.9,marginTop:10}}>Fastest Distance : {distance1}</Text>
            <Text style={{fontSize:14,color:colors.blue,fontFamily: 'Poppins_400Regular',letterSpacing:0.9,marginTop:10}}>Shortest Distance : {distance2}</Text>
          </View>


          
        </View>

      </View> */}

      {/* pickup */}
      <View style={{ flex: 1, width: '100%', marginTop: 50 }} >
        <GooglePlacesAutocomplete
          // placeholder='Search'

          // styles={{
          //  container : {flex:0,position:'absolute',width:'100%',zIndex:1},
          //  listView:{backgroundColor:"white"}
          // }}
          placeholder='Enter Location'
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          GooglePlacesDetailsQuery={{
            rankby: "distance"
          }}

          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log(data, details);
            setRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
            getData3();
          }}
          query={{
            key: 'AIzaSyCXSQN60rmVblqkNYQkWFI291xwYvmLjvc',
            language: 'en',
            components: "country:bd",
            types: "establishment",

            radius: 30000,
            location: `${region.latitude}, ${region.longitude}`
          }}


          styles={{
            textInputContainer: {
              backgroundColor: 'grey',
            },
            textInput: {
              height: 38,
              color: '#5d5d5d',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />
        <MapView
          style={[styles.map, { display: 'flex' }]}
          onPress={handleMapPress}
          initialRegion={markerPosition}
        >
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          <Marker
            coordinate={markerPosition}
            title="Pick Up"
            description="Set Pick Up Location"
            draggable={true}
            pinColor={'black'}
            key={'random'}
            onDragStart={(e) => {
              // console.log("Dragstart",e.nativeEvent.coordinate)
            }}
            onDragEnd={(e) => {
              // handleMapPress()
              setMarkerPosition(e.nativeEvent.coordinate);
            }}

          />

        </MapView>
        <View style={{ width: '100%', height: 30, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <Text>{newAddress}</Text>
        </View>

        <Button title='Done Pickup' onPress={() => { setPickupdone(true), setOpenpickup(false); }} />
      </View>

      {/* dropout */}
      {/* <View style={{width:'100%',height:'100%',marginTop:0,display: opendropout ? 'flex' : 'none'}}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyCXSQN60rmVblqkNYQkWFI291xwYvmLjvc',
            language: 'en',
          }}
        />
        <MapView
          style={[styles.map,{display:'flex'}]}
          onPress={handleMapPress1}
          initialRegion={markerPosition1}
        >
          <Marker
            coordinate={markerPosition}
            title="Pick Up"
            description={newAddress}
            pinColor={'gray'}
            key = {'random1'}
          />
          <Marker
            coordinate={markerPosition1}
            title="Dorp Out"
            description="Set Dorp Out Location"
            draggable = {true}
            pinColor={'black'}
            key = {'random2'}
            onDragStart={(e) =>{
              // console.log("Dragstart",e.nativeEvent.coordinate)
            }}
            onDragEnd={(e)=>{
              // handleMapPress()
              setMarkerPosition1(e.nativeEvent.coordinate);
            }}
          />
        
        </MapView>
        <View style={{width:'100%',height:30,justifyContent:'flex-start',alignItems:'flex-start'}}> 
          <Text>{newAddress1}</Text>
        </View>
        
        <Button title='Done Dropout' onPress={()=> {setDropoutdone(true),setOpendropout(false)}}/>
      </View> */}

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

