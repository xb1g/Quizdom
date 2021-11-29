import React, { useContext, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { BackButton } from "../components/user-profile.styles";
import { Text } from "../../../components/typography/text.component";
import { FlatList } from "react-native-gesture-handler";
import { Searchbar } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { shadow } from "../../../components/shadow/shadow.styles";

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
  const [search, setSearch] = useState("");
  const { userInfo } = useContext(AuthenticationContext);
  return (
    <View>
      <View
        style={{
          marginTop: 50,
          marginLeft: "auto",
          paddingRight: 20,
        }}
      >
        <Text variant="label" style={{ color: "white", fontSize: 40 }}>
          {"Friends" + " "}
        </Text>
      </View>
      <BackButton navigation={navigation} />
      <Spacer size="extraLarge" />
      <View style={{ marginHorizontal: 20 }}>
        <Searchbar
          style={{
            backgroundColor: "#343c42",
            borderRadius: 20,
            padding: 10,
            ...shadow.shadow2,
            color: "#fff",
          }}
          inputStyle={{
            color: "white",
          }}
          iconColor="white"
          placeholderTextColor="#b9b9b9"
          placeholder="Search a username"
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
      </View>

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
                    uri: item.image,
                  }}
                />
                <Text>{item.username}</Text>
                <TouchableOpacity
                  style={{
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
