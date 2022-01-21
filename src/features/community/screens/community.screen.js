import React, { useContext } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Row } from "../../../components/utility/row.component";
import { TitleContainer, TitleText } from "../../home/components/home.styles";

export const CommunityScreen = () => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#3a3a3a" }}>
        <TitleContainer
          style={{
            marginTop: 30,
            paddingLeft: 30,
            marginRight: 100,
            backgroundColor: "#7ed957",
          }}
        >
          <TitleText>{"Community"}</TitleText>
        </TitleContainer>
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
        <TouchableOpacity
          style={{
            backgroundColor: "#cb6ce6",
            borderRadius: 30,
            paddingHorizontal: 30,
            paddingTop: 10,
            paddingBottom: 10,
            marginHorizontal: 30,
            marginTop: 30,
            alignItems: "center",
          }}
          onPress={console.log("Add post")}
        >
          <Text style={{ color: "#ffffff", fontSize: 16 }}>Add Post</Text>
        </TouchableOpacity>
        <View style={{ background: "#ffaadd", paddingTop: 100 }}></View>
        <ScrollView></ScrollView>
        <StatusBar barStyle="dark-content" />
      </View>
    </>
  );
};
