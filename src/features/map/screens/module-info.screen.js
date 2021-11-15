import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import styled from "styled-components/native";

import { Ionicons } from "@expo/vector-icons";
import { Text } from "../../../components/typography/text.component";

export const ModuleInfoScreen = ({ route, navigation }) => {
  const { module } = route.params;
  console.log(module);
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
          // backgroundColor: "#3f9",
          zIndex: -1,
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            // zIndex: 190,
            backgroundColor: "#4ff",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              console.log("COOL");
              // navigation.navigate("MapDetail", { map })
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
        </ScrollView>
      </View>
    </View>
  );
};
