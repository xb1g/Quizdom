import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Text } from "../../../components/typography/text.component";
import { Row } from "../../../components/utility/row.component";

export const CommunityScreen = () => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#3a3a3a" }}>
        <Text
          style={{
            color: "#ffffff",
            fontSize: 36,
            marginTop: 30,
            paddingLeft: 30,
            marginRight: 100,
            backgroundColor: "#7ed957",
          }}
        >
          Community
        </Text>
        <Row>
          <TouchableOpacity
            style={{
              backgroundcolor: "#ffaadd",
              marginHorizontal: 30,
              borderRadius: 50,
              width: 100,
              height: 100,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundcolor: "#ffaadd",
              marginHorizontal: 30,
              borderRadius: 50,
              width: 100,
              height: 100,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>Math</Text>
          </TouchableOpacity>
        </Row>
        <Row>
          <TouchableHighlight
            style={{
              borderRadius: 30,
              backgroundColor: "#fcab40",
              marginTop: 30,
              marginHorizontal: 20,
              paddingHorizontal: 20,
              paddinTop: 20,
              paddingBottom: 10,
            }}
            underlayColor={"#fde78e"}
          >
            <Text style={{ fontSize: 16, color: "#ffffff" }}>My Questions</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              borderRadius: 30,
              backgroundColor: "#fcab40",
              marginTop: 30,
              marginHorizontal: 20,
              paddingHorizontal: 20,
              paddinTop: 20,
              paddingBottom: 10,
            }}
            underlayColor={"#fde78e"}
          >
            <Text style={{ fontSize: 16, color: "#ffffff" }}>
              Community Questions
            </Text>
          </TouchableHighlight>
        </Row>
        <View style={{ background: "#ffaadd", paddingTop: 100 }}></View>
        <ScrollView></ScrollView>
        <StatusBar barStyle="dark-content" />
      </View>
    </>
  );
};
