import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
// import Icon from "react-native-ionicons";
// import { Icon } from "../../../components/icon/icon.component";
import styled from "styled-components/native";

import { Ionicons } from "@expo/vector-icons";
import { Text } from "../../../components/typography/text.component";

// const floatingButton = styled(TouchableOpacity)`
//   align-items: center;
//   /* position: absolute; */
//   top: 20px;
//   left: 20px;
//   width: 60px;
//   height: 60px;
//   border-radius: 30px;
//   background-color: #fff;
//   box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
//   justify-content: center;
//   align-items: center;
// `;

export const MapScreen = ({ route, navigation }) => {
  const { map } = route.params;
  console.log(map);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TouchableOpacity
        // activeOpacity={0.5}
        onPress={() => {
          console.log("object");
          navigation.goBack();
        }}
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          left: 0,
          top: 30,
          zIndex: 2,
          padding: 10,
        }}
      >
        <View>
          <Text
            variant="label"
            style={{
              fontSize: 80,
            }}
          >
            {"< "}
          </Text>
        </View>
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          // backgroundColor: "#75ffba",
          zIndex: -1,
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#62ff62",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              console.log("COOL");
              navigation.navigate("ModuleInfoScreen", { module });
            }}
          >
            <Ionicons
              style={{
                position: "absolute",
                top: 100,
                left: 20,
              }}
              name="at-circle-outline"
              size={80}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("COOL");
              navigation.navigate("ModuleInfoScreen", { module });
            }}
          >
            <Ionicons
              style={{
                position: "absolute",
                top: 140,
                left: 90,
              }}
              name="at-circle-outline"
              size={80}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("COOL");
              navigation.navigate("ModuleInfoScreen", { module });
            }}
          >
            <Ionicons
              style={{
                position: "absolute",
                top: 300,
                left: 50,
              }}
              name="at-circle-outline"
              size={80}
              color="white"
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
