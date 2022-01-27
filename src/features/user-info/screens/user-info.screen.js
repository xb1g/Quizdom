import React, { useState, useEffect, useContext } from "react";
// import { View, Text } from "react-native";
import { Text as CoolText } from "../../../components/typography/text.component";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spacer } from "../../../components/spacer/spacer.component";

import Button from "react-native-really-awesome-button/src/themes/cartman";
// import { Row } from "../../../components/utility/row.component";
import { View } from "react-native";
// import { UserInfoContext } from "../../../services/user-info/user-info.context";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { collection, onSnapshot, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import styled from "styled-components/native";

const Text = styled(CoolText)`
  color: #fff;
`;
export const EditUserInfoScreen = () => {
  const { user } = useContext(AuthenticationContext);
  // const { userInfo } = useContext(UserInfoContext);
  const [userInfo, setUserInfo] = useState({
    name: "no name bruh",
    lastname: "no email bruh",
    email: "no phone bruh",
    age: "no address bruh",
  });

  useEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (u) => {
        // console.log("u u u");
        // console.log(u.data());
        u.data() && setUserInfo(u.data());
        // console.log(userInfo);
      }),
    []
  );
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [favoriteSubjects, setFavoriteSubjects] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      <View
        style={{
          flex: 1,
          padding: 20,
          flexDirection: "column",
        }}
      >
        <Text
          variant="label"
          style={{
            fontSize: 40,
            color: "#fff",
          }}
        >
          edit
        </Text>
        <Spacer size="large" />

        <Text>Username: {userInfo.username}</Text>
        <View
          style={{
            margin: 10,
            flexDirection: "row",
          }}
        >
          <TextInput
            style={{
              flex: 1,
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              margin: 10,
              padding: 10,
            }}
            value={username}
            onChangeText={setUsername}
          />
          <Button
            type="primary"
            onPress={() => {
              // console.log("object");
              // console.log(userInfo);
              const docRef = doc(db, "users", user.uid);
              setDoc(docRef, {
                ...userInfo,
                username,
                email: user.email,
              });
              // .then(// console.log("success"))
              // .catch(// console.log("error"));
            }}
          >
            aha
          </Button>
        </View>

        <Spacer />
        <Text>Name: {userInfo.name}</Text>
        <View
          style={{
            margin: 10,
            flexDirection: "row",
          }}
        >
          <TextInput
            style={{
              flex: 1,
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              margin: 10,
              padding: 10,
            }}
            value={name}
            onChangeText={setName}
          />

          <Button
            type="primary"
            onPress={() => {
              // console.log("object");
              // console.log(userInfo);
              const docRef = doc(db, "users", user.uid);
              setDoc(docRef, {
                ...userInfo,
                name,
                email: user.email,
              });
              // .then(// console.log("success"))
              // .catch(// console.log("error"));
            }}
          >
            aha
          </Button>
        </View>

        <Spacer />
        <Text>Lastname: {userInfo.lastname}</Text>
        <View
          style={{
            margin: 10,
            flexDirection: "row",
          }}
        >
          <TextInput
            style={{
              flex: 1,
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              margin: 10,
              padding: 10,
            }}
            value={lastname}
            onChangeText={setLastname}
          />
          <Button
            type="primary"
            onPress={() => {
              // console.log("object");
              // console.log(userInfo);
              const docRef = doc(db, "users", user.uid);
              setDoc(docRef, {
                ...userInfo,
                lastname,
                email: user.email,
              });
              // .then(// console.log("success"))
              // .catch(// console.log("error"));
            }}
          >
            aha
          </Button>
        </View>
        <Spacer />
      </View>
    </SafeAreaView>
  );
};
