import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Row } from "../../../components/utility/row.component";
import { CommunityContext } from "../../../services/authentication/community/community.context";
import { TitleContainer, TitleText } from "../../home/components/home.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import styled, { useTheme } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { shadow } from "../../../components/shadow/shadow.styles";
import { doc, getDoc } from "firebase/firestore";
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
      <Ionicons name="filter" color="white" size={25} />
    </TouchableOpacity>
  );
};

export const CommunityScreen = ({ navigation }) => {
  const { postData } = useContext(CommunityContext);
  const theme = useTheme();
  const { user } = useContext(AuthenticationContext);
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.bg.primary,
        }}
      >
        <FilterButton />
        <FlatList
          style={{ paddingTop: 50 }}
          data={postData}
          keyExtractor={(post) => {
            // console.log(post);
            return (
              post.title.slice(-5) +
              post.isQuestion +
              post.author_uid.slice(0, 5)
            ).toString();
          }}
          renderItem={(post) => {
            post = post.item;
            return (
              <>
                <TouchableOpacity
                  style={{
                    borderRadius: 20,
                    borderBottomColor: post.answered ? "#7fffff" : "#ebd1e5",
                    borderBottomWidth: 8,
                    margin: 10,
                    padding: 10,
                    backgroundColor: theme.colors.bg.secondary,
                  }}
                  onPress={() => {
                    navigation.navigate("PostScreen", {
                      post: post,
                    });
                  }}
                >
                  <Text style={{ color: "#ffffff", fontSize: 26 }}>
                    {post.title}
                  </Text>
                  <Text style={{ color: "#ffffff" }}>{post.body}</Text>
                  <FlatList
                    data={post.images}
                    horizontal
                    style={{
                      marginTop: 10,
                    }}
                    keyExtractor={(image) => {
                      // console.log(image);
                      return image.slice(-10);
                    }}
                    renderItem={(image) => {
                      return (
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                            marginRight: 10,
                            borderRadius: 10,
                          }}
                          source={{ uri: image.item }}
                        />
                      );
                    }}
                  />
                </TouchableOpacity>
              </>
            );
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("AddPostScreen")}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              width: 50,
              height: 50,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.colors.accent.secondary,
              ...shadow.shadow2,
            }}
          >
            <Ionicons
              name="ios-add"
              size={30}
              color="white"
              style={{ alignSelf: "center" }}
            />
          </View>
        </TouchableOpacity>
        <StatusBar barStyle="light-content" />
      </View>
    </>
  );
};
