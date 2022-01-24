import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { FlatList, ScrollView, StatusBar, View } from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Row } from "../../../components/utility/row.component";
import { CommunityContext } from "../../../services/authentication/community/community.context";
import { TitleContainer, TitleText } from "../../home/components/home.styles";

export const CommunityScreen = ({ navigation }) => {
  const { postData } = useContext(CommunityContext);
  useEffect(() => {
    console.log("Post data");
    console.log(postData);
  }, []);
  return (
    <>
      <ScrollView>
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
          <FlatList
            style={{ backgroundColor: "#000000" }}
            data={postData}
            renderItem={(post) => {
              console.log("posted", post);
              return (
                <>
                  <Text style={{ color: "#ffffff" }}>
                    Title : {post.item.title}
                  </Text>
                  <Text style={{ color: "#ffffff" }}>
                    Body : {post.item.body}
                  </Text>
                  <Text style={{ color: "#ffffff" }}>
                    Author uid : {post.item.author_uid}
                  </Text>
                </>
              );
            }}
            keyExtractor={(post) => post.id}
          />
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
            onPress={
              () => navigation.navigate("AddPostScreen")
              //console.log("Add post")
            }
          >
            <Text style={{ color: "#ffffff", fontSize: 16 }}>Add Post</Text>
          </TouchableOpacity>
          <View style={{ background: "#ffaadd", paddingTop: 100 }}></View>

          <StatusBar barStyle="dark-content" />
        </View>
      </ScrollView>
    </>
  );
};
