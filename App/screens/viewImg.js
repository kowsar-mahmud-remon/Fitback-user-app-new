import React, { useState } from 'react';
import { SafeAreaView,ImageBackground,StatusBar,StyleSheet,Image,Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';


function ViewImg({navigation,route}) {
    const [imgPicker,setImgPicker]=useState(route.params.img)
    //let screenWidth= Dimensions.get('window').width;
     //let screenHight= Dimensions.get('window').height;
    return (
        <SafeAreaView style={[styles.MainContainer]}>
            <StatusBar
                animated={true}
                backgroundColor="#303030"
                // barStyle={statusBarStyle}
                
                />
            <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={Dimensions.get('window').width}
                       imageHeight={"100%"}>
                <ImageBackground resizeMode='contain' source={{uri:imgPicker}} style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'flex-end',}}>
                    {/* <Image resizeMode='contain' style={{width:100,marginTop:140,marginRight:20}} source={require('../assets/watermark.jpg')}/> */}
                </ImageBackground>
            </ImageZoom>
        </SafeAreaView>
        
    );
}
const styles = StyleSheet.create({
    MainContainer:{
        flex:1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems:'center',
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,  
        paddingBottom:15,
        
    },
})
export default ViewImg;