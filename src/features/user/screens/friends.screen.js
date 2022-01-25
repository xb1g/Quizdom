import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { BackButton } from "../../../components/button/back-button.component";
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
import { HeaderText } from "../../../components/utility/header-text.component";

const FriendImage = styled(Image)`
  margin: 10px;
  height: 60px;
  width: 60px;
  border-radius: 50px;
`;

const FriendContainer = styled.View`
  flex-direction: row;
  /* justify-content: flex-end; */
  align-items: center;
  border-radius: 25px;
  background-color: #313136;
  /* padding: 5px; */
`;

export const FriendsScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const { userInfo } = useContext(AuthenticationContext);
  const insets = useSafeAreaInsets();

  const getAllUser = async () => {
    const data = await getDocs(collection(db, "users"));
    console.log(data);
    const userArray = [];
    data.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const user = doc.data();
      user.uid = doc.id;
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

  const isFriend = (user) => {
    const friends = userInfo.friends;
    console.log("friends");
    console.log(friends);
    if (friends) {
      friends.forEach((friend) => {
        if (friend.uid === user.uid) {
          return true;
        }
      });
    }
    return false;
  };

  return (
    <View>
      <BackButton navigation={navigation} />
      <SafeTop />
      <HeaderText title="Friends" />
      <View style={{ marginHorizontal: 20 }}>
        <Spacer size={"extraLarge"} />
        <Spacer size={"extraLarge"} />
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
        renderItem={({ item }) => {
          const alreadyFriend = isFriend(item);
          return (
            <>
              <TouchableOpacity
                style={{
                  marginVertical: 5,
                  marginHorizontal: 10,
                }}
                onPress={() => {
                  navigation.navigate("FriendProfile", {
                    user: item,
                    alreadyFriends: alreadyFriend,
                  });
                }}
              >
                <FriendContainer style={{ ...shadow.shadow1 }}>
                  <FriendImage
                    source={
                      item.profileImage
                        ? { uri: item.profileImage }
                        : require("../../../../assets/no_user_picture.png")
                    }
                  />
                  <Text
                    style={{
                      color: "white",
                    }}
                  >
                    {item.username}
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginLeft: "auto",
                      borderRadius: 100,
                      padding: 10,
                      width: 41,
                      // height: 50,
                      backgroundColor: "#ffffff7f",
                    }}
                  >
                    <Ionicons
                      name={alreadyFriend ? "person-remove-outline" : "add"}
                      size={20}
                    />
                  </TouchableOpacity>
                </FriendContainer>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </View>
  );
};
