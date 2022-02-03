import React from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";

export const DismissKeyboardView = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};
