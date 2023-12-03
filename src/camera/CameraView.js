import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableWithoutFeedback, StyleSheet , Image} from "react-native";
import { Camera } from "expo-camera";
import { windowHeight, windowWidth, red, green, blue } from "../constants";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function CameraView({ setImage, setCameraOpen }) {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const snap = async () => {
    if (cameraRef) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log("THE PHOTOS ARE HERE, MILDRED", photo);
      setImage(photo);
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef}>
        <View style={styles.cameraView}>
          <Image
              source={require("../../assets/scan.png")} 
              style={{ transform: [{ scale: 0.6  }] , top : 0 ,marginLeft : 15}}
            />

        </View>
      </Camera>
      <TouchableWithoutFeedback onPress={snap}>
        <MaterialCommunityIcons
          name="circle-slice-8"
          size={windowWidth * 0.28}
          color={green}
          style={styles.iconBtn}
        />
      </TouchableWithoutFeedback>

      <View style={styles.backBtn}>
        <TouchableWithoutFeedback onPress={setCameraOpen}>
         <Image
              source={require("../../assets/album.jpg")} // Replace with your placeholder image
              style={{ width:80, height: 80,  borderRadius : 20, marginBottom : 10}}
            />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: windowHeight,
  },
  camera: {
    flex: 1,
  },
  cameraView: {
    justifyContent : 'center',
    alignItems :'center'
  },
  icon: {
    opacity: 1,
    
  },
  iconBtn: {
    position: "absolute",
    bottom: windowHeight * 0.05,
    left: windowWidth * 0.356,
    zIndex: 10,
  },
  backBtn: {
    position: "absolute",
    bottom: windowHeight * 0.055,
    right: windowWidth * 0.09,
  },
});
