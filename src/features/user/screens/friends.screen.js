import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Searchbar } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const FriendImage = styled(Image)`
  margin: 10px;
  height: 50px;
  width: 50px;
  border-radius: 50px;
`;

const FriendContainer = styled.View`
  flex-direction: row;
  /* justify-content: flex-end; */
  align-items: center;
  border-radius: 20px;
  background-color: white;
  padding: 10px;
`;
export const FriendsScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthenticationContext);
  return (
    <View>
      <Text>Friends</Text>
      <Spacer size="extraLarge" />
      <Spacer size="extraLarge" />
      <Searchbar />
      <FlatList
        data={userInfo.friends}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AchievementScreen");
              }}
            >
              <FriendContainer>
                <FriendImage
                  source={{
                    uri: "https://reactnative.dev/img/tiny_logo.png",
                  }}
                />
                <Text>{item.username}</Text>
                <TouchableOpacity
                  style={{
                    // alignSelf: "flex-end",
                    // justifyContent: "flex-end",
                    // justifySelf: "flex-end",
                    marginLeft: "auto",
                    borderRadius: 100,
                    padding: 10,
                    backgroundColor: "red",
                  }}
                >
                  <Ionicons name="person-remove-outline" size={20} />
                </TouchableOpacity>
              </FriendContainer>
            </TouchableOpacity>
          </>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
