import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { FlatList, Image, ScrollView, StatusBar, View } from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Row } from "../../../components/utility/row.component";
import { CommunityContext } from "../../../services/authentication/community/community.context";
import { TitleContainer, TitleText } from "../../home/components/home.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import { useTheme } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const FilterButton = () => {
  const { colors } = useTheme();
  const { user } = useContext(AuthenticationContext);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        margin: 5,
      }}
    >
      <Ionicons name="filter" color="white" size="25" />
    </TouchableOpacity>
  );
};

export const CommunityScreen = ({ navigation }) => {
  const { postData } = useContext(CommunityContext);
  const theme = useTheme();
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    console.log("Post data");
    console.log(postData);
    console.log(user.uid);
  }, []);
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.bg.primary,
          paddingTop: 90,
        }}
      >
        {/* <Spacer size="large" /> */}

        <TouchableHighlight
          style={{
            borderRadius: 30,
            backgroundColor: "#fcab40",
            marginTop: 30,
            marginHorizontal: 20,
            paddingHorizontal: 20,
            paddinTop: 20,
            paddingBottom: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          underlayColor={"#fde78e"}
        >
          <Text style={{ fontSize: 16, color: "#ffffff" }}>My Posts</Text>
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
            alignItems: "center",
            justifyContent: "center",
          }}
          underlayColor={"#fde78e"}
        >
          <Text style={{ fontSize: 16, color: "#ffffff" }}>
            Community Posts
          </Text>
        </TouchableHighlight>
        <FlatList
          // style={{ backgroundColor: "#000000" }}
          data={postData}
          renderItem={(post) => {
            console.log("posted", post);
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("PostScreen", {
                    post: post.item,
                  });
                }}
              >
                <Text style={{ color: "#ffffff", fontSize: 26 }}>
                  {post.item.title}
                </Text>
                <Text style={{ color: "#ffffff" }}>
                  Body : {post.item.body}
                </Text>
                {/* <FlatList
                  data={post.item.images}
                  horizontal
                  renderItem={(image) => {
                    console.log("Slum images"), image;
                    return (
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                        }}
                        source={{ uri: image.item }}
                      />
                    );
                  }}
                /> */}
                <View>
                  {/* <Text style={{ color: "#ffffff" }}>
                    Title : {post.item.title}
                  </Text>
                  <Text style={{ color: "#ffffff", marginTop: 10 }}>
                    Body : {post.item.body}
                  </Text> */}
                  <FlatList
                    style={{ backgroundColor: "#303030" }}
                    numColumns={2}
                    data={post.item.images}
                    renderItem={(image) => {
                      console.log("Slum images"), image;
                      return (
                        <Image
                          style={{
                            width: 150,
                            height: 150,
                            marginTop: 20,
                            marginBottom: 20,
                            marginHorizontal: 20,
                            borderRadius: 10,
                          }}
                          source={{ uri: image.item }}
                        />
                      );
                    }}
                    keyExtractor={(image) => image.id}
                  />
                  <Text style={{ color: "#ffffff" }}>
                    Author uid : {post.item.author_uid}
                  </Text>
                </View>
              </TouchableOpacity>
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

        <StatusBar barStyle="light-content" />
      </View>
    </>
  );
};
