import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { BackButton } from "../components/user-profile.styles";
import { Text } from "../../../components/typography/text.component";
import { FlatList } from "react-native-gesture-handler";
import { Searchbar } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { shadow } from "../../../components/shadow/shadow.styles";
import { db } from "../../../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { SafeTop } from "../../../components/utility/safe-area.component";

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
  const [allUser, setAllUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const { userInfo } = useContext(AuthenticationContext);

  const getAllUser = async () => {
    const data = await getDocs(collection(db, "users"));
    console.log(data);
    const userArray = [];
    data.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const user = doc.data();
      user.id = doc.id;
      userArray.push(user);
    });
    console.log(userArray);
    setAllUser(userArray);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const searchUsers = (text) => {
    console.log("searching");
    // console.log(allUser);
    const users = allUser.filter((user) => {
      const username = user.username;
      return (
        username &&
        username.toLowerCase &&
        username.toLowerCase().includes(text.toLocaleLowerCase())
      );
    });
    setFilteredUser(users);
    // console.log(allUser);
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text.length > 0) {
      searchUsers(text);
    }
  };

  return (
    <View>
      <SafeTop />
      <View
        style={{
          marginBottom: 10,
          marginLeft: "auto",
          //   paddingRight: 20,
        }}
      >
        <Text variant="label" style={{ color: "white", fontSize: 60 }}>
          {"Friends" + " "}
        </Text>
      </View>
      <BackButton navigation={navigation} />
      {/* <Spacer size="extraLarge" /> */}
      <View style={{ marginHorizontal: 20 }}>
        <Searchbar
          style={{
            backgroundColor: "#222222",
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
          onChangeText={handleSearch}
          value={search}
        />
      </View>

      <FlatList
        contentContainerStyle={{}}
        keyExtractor={(item) => item.id}
        style={{
          height: "100%",
        }}
        data={search === "" ? userInfo.friends : filteredUser}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              style={{
                marginVertical: 5,
                marginHorizontal: 10,
              }}
              onPress={() => {
                navigation.navigate("AchievementScreen");
              }}
            >
              <FriendContainer>
                <FriendImage
                  source={{
                    uri: item.profileImage,
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
