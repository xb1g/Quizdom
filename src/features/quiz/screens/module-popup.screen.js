import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const ModulePopup = () => {
  const route = useRoute();
  const navigation = useNavigation();
  console.log(route);
  return (
    <View
      style={
        {
          // height: 300,
          // width: 300,
          // backgroundColor: "red",
        }
      }
    >
      {/* <Text>{route.params.caption}</Text> */}
      <Text>sdfsdf</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Resource")}>
        <Text>Resource</Text>
      </TouchableOpacity>
    </View>
  );
};
