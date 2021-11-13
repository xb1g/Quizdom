import React from "react";
import { Image, View } from "react-native";
import {
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native-gesture-handler";
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
        // flex: 1,
        // backgroundColor: "#fff",
        justifyContent: "center",
        flex: 1,
        margin: 10,
      }}
    >
      {/* <View style>
        <TouchableHighlight
          style={
            {
              // borderWidth: 1,
              // borderColor: "rgba(0,0,0,0.2)",
              // alignItems: "center",
              // justifyContent: "center",
              // // position: "absolute",
              // borderRadius: 100,
              // zIndex: 100,
            }
          }
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text
            variant="label"
            style={{
              fontSize: 70,
            }}
          >
            {"< "}
          </Text>
          {/* </View> 
        </TouchableHighlight>
      </View> 
    
    */}
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#4ff",
        }}
      >
        <Ionicons name="at-circle-outline" size={80} color="white" />
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => null}
        style={{
          position: "absolute",
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          left: 30,
          top: 30,
        }}
      >
        <Image
          source={{
            uri: "https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png",
          }}
          style={{
            resizeMode: "contain",
            width: 50,
            height: 50,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
