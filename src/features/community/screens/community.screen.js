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
        }}
      >
        <FilterButton />
        <FlatList
          style={{ paddingTop: 90 }}
          data={postData}
          renderItem={(post) => {
            post = post.item;
            return (
              <>
                <TouchableOpacity
                  style={{
                    borderRadius: 20,
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
                    renderItem={(image) => {
                      console.log("Slum images");
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
                <View
                  style={{
                    marginTop: -15,
                    zIndex: -1,
                    height: 10,
                    marginHorizontal: 10,
                    borderRadius: 10,
                    backgroundColor: "#ff6de7",
                    width: "100%",
                  }}
                />
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
        <StatusBar barStyle="light-content" />
      </View>
    </>
  );
};
