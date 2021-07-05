import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    
} from "react-native";
import Colors from "../constants/Colors";
const CheckBox = ({checked,onChecked, ...props}) => {
    return (
        <TouchableOpacity style={styles.checkbox} onPress={onChecked} > 
                 <Text style={{color: Colors.lightGray}}>{checked ? "✓" : ""}</Text>
        </TouchableOpacity>
    )
}

export default CheckBox

const styles = StyleSheet.create({
    checkbox: {
      width: 20,
      height: 20,
      margin: 5,
      backgroundColor: "#fff0",
      color: Colors.lightGray,
      borderWidth: 1,
      borderRadius: 3,
      borderColor: Colors.lightGray,
      alignItems: "center",
      justifyContent: "center",
    },
  });