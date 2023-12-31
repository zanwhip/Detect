import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { windowWidth, windowHeight } from "../constants";

export default function Header() {
  return (
    <View style={styles.loadingContainer}>
    
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    marginTop: 80,
    marginBottom: windowHeight * 0.06,
  },
  logo: {
    width: windowWidth,
    height: windowHeight * 0.1,
  },
});
