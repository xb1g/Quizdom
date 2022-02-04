import React, { useContext, useEffect } from "react";
import { View, Image, Button, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import { LinearGradient } from "expo-linear-gradient";

import { Text } from "../../../components/typography/text.component";
// import { Row } from "../../../components/utility/row.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { shadow } from "../../../components/shadow/shadow.styles";
import styled from "styled-components/native";
import { BackButton, BackgroundColor } from "../components/user-profile.styles";
import { db, storage } from "../../../../firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
import { FriendList } from "../components/friend/friend-list.component";
import { AchievementList } from "../components/achievements/achievement-list.component";
import { H1, H2, Row, Back } from "../components/user-profile.styles";
import { QuestionsList } from "../components/questions-list.component";

export const UserProfileScreen = ({ navigation }) => {
  const [about, setAbout] = React.useState("");
  const [color, setColor] = React.useState("");
  const [editingColor, setEditingColor] = React.useState(false);
  const [editingAbout, setEditingAbout] = React.useState(false);

  const { userInfo, user } = useContext(AuthenticationContext);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });
    // // console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }

    try {
      const imageUrl = await uploadImageAsync(pickerResult.uri);
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        profileImage: imageUrl,
      });
    } catch (e) {
      alert("Upload failed, sorry :(");
    }
  };
  console.log(userInfo);
  // // console.log(user.uid);
  return (
    <>
      <BackButton navigation={navigation} />
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Row style={{ backgroundColor: userInfo.color }}>
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)"]}
              style={{
                width: "100%",
                height: 150,
              }}
            />
            {/* {!editingColor && (
              <IconButton
                icon="pencil"
                color="white"
                size={20}
                style={{
                  position: "absolute",
                  top: 40,
                  right: 20,
                  zIndex: 10,
                  width: 35,
                  height: 35,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: 50,
                  ...shadow.shadow2,
                }}
                onPress={() => {
                  // navigation.navigate("PickColor");
                }}
              />
            )} */}
            <TouchableOpacity
              onPress={openImagePickerAsync}
              style={{
                position: "absolute",
                top: 120,
                left: 20,
                zIndex: 10,
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            >
              <Image
                style={{
                  position: "absolute",
                  top: -10,
                  left: 0,
                  zIndex: 10,
                  // marginBottom: -60,
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
                source={
                  userInfo.profileImage
                    ? {
                        uri: userInfo.profileImage,
                      }
                    : require("../../../../assets/no_user_picture.png")
                }
              />
              <IconButton
                icon="camera"
                color="white"
                size={20}
                style={{
                  position: "absolute",
                  top: -12,
                  left: 70,
                  zIndex: 10,
                  width: 35,
                  height: 35,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: 50,
                  ...shadow.shadow2,
                }}
              />
            </TouchableOpacity>
            <H1
              variant="label"
              style={{
                position: "absolute",
                top: 162,
                left: 130,
                color: "#fff",
              }}
            >
              {userInfo.username + " "}
            </H1>
          </Row>
          <Spacer size="extraLarge" />
          <Spacer size="extraLarge" />
          <View
            style={{
              flex: 1,
              padding: 10,
              zIndex: -10,
            }}
          >
            <Row>
              <H1 variant="label">About </H1>
              {!editingAbout ? (
                <IconButton
                  icon="pencil"
                  size={20}
                  color="white"
                  onPress={() => {
                    setEditingAbout(true);
                  }}
                />
              ) : (
                <IconButton
                  icon="check"
                  size={20}
                  color="white"
                  onPress={() => {
                    setEditingAbout(false);
                    const docRef = doc(db, "users", user.uid);
                    updateDoc(docRef, {
                      about: about,
                    });
                  }}
                />
              )}
            </Row>
            <Back>
              {editingAbout ? (
                <TextInput
                  value={about}
                  multiline={true}
                  onChangeText={setAbout}
                  maxLength={200}
                />
              ) : (
                <H2>{userInfo.about}</H2>
              )}
            </Back>
            <Row>
              <H1 variant="label">Friends - </H1>
              {/* <H2>{userInfo.friends}</H2> */}
            </Row>
            <FriendList friends={userInfo.friends} navigation={navigation} />
            <H1 variant="label">Achievements</H1>
            <AchievementList achievements={userInfo.achievements} />
            <H1 variant="label">Questions</H1>
            <QuestionsList questions={userInfo.questions} />
          </View>
        </View>
      </ScrollView>
    </>
    // </SafeAreaView>
  );
};

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      // console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  const fileRef = ref(storage, uuidv4());
  // // console.log(fileRef);
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}
