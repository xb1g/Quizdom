import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
// import { ColorWheel } from "react-native-color-wheel";
// import { HueSaturationValuePicker } from "react-native-reanimated-color-picker";

// import Picker from "react-native-wheel-color-picker";
const wheelStyle = { width: "100%" };
const sliderStyle = { height: 50, width: "100%" };

// const colorChanged = ({ h, s, v }) => {
//   console.warn(h, s, v);
// };

export const ColorPicker = ({ onChange }) => {
  const [currentColor, setCurrentColor] = useState("#000000");
  return (
    <View style={{ height: 400 }}>
      {/* <Picker
        // ref={(r) => {
        //   this.picker = r;
        // }}
        color={currentColor}
        // onColorChange={this.onColorChange}
        // onColorChangeComplete={this.onColorChangeComplete}
        thumbSize={60}
        sliderSize={50}
        swatches={false}
        // noSnap={true}
        row={true}
      /> */}
    </View>
  );
};
