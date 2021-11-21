import React, { useContext, useEffect } from "react";
import { View, Image, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import { LinearGradient } from "expo-linear-gradient";

import { Text } from "../../../components/typography/text.component";
// import { Row } from "../../../components/utility/row.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import styled from "styled-components/native";
import { BackButton } from "../components/user-profile.styles";
import { db, storage } from "../../../../firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const H1 = styled(Text)`
  color: #fff;
  font-size: 25px;
`;

const H2 = styled(Text)`
  color: #fff;
  font-size: 15px;
`;

const Row = styled.View`
  margin-top: 70px;
  flex-direction: row;
`;
export const UserProfileScreen = ({ navigation }) => {
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
    // console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }

    try {
      // setProfileImage({ localUri: pickerResult.uri });
      const imageUrl = await uploadImageAsync(pickerResult.uri);
      console.log(imageUrl);
      // setProfileImage(imageUrl);
      // save uri to firestore
      const docRef = doc(db, "users", user.uid);
      // Set the "capital" field of the city 'DC'
      await updateDoc(docRef, {
        profileImage: imageUrl,
      });
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    }
  };
  // console.log(userInfo);
  // console.log(user.uid);
  return (
    // <SafeAreaView>
    <View>
      <BackButton navigation={navigation} />
      <Row>
        <TouchableOpacity onPress={openImagePickerAsync}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              marginLeft: 20,
              marginRight: 10,
              marginTop: 20,
              marginBottom: 20,
            }}
            source={{
              uri: userInfo.profileImage
                ? userInfo.profileImage
                : "https://lh3.googleusercontent.com/proxy/vKUZkXJMxkpQKS7CtuvjgOz-QfbIK71pNCDwOp0qbQT2geOhElt1ffrAoitKHCA_PfEpP6f3Z6tgXM6wlHbY3yPPlfja9oBgUHBC",
            }}
          />
        </TouchableOpacity>
        <H1
          variant="label"
          style={{
            marginTop: 20,
            color: "#000",
          }}
        >
          {userInfo.username + " "}
        </H1>
      </Row>
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={{
          width: "100%",
          position: "absolute",
          zIndex: 130,
          borderRadius: 30,
        }}
      />
      <H2
        variant="label"
        style={{
          // marginTop: 20,
          position: "absolute",
          top: 120,
          left: 140,
          color: "#000",
        }}
      >
        About
      </H2>

      <Image
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          width: "100%",
          height: 150,
        }}
        source={{
          uri: "https://media.discordapp.net/attachments/888677982535839744/911146458256916540/unknown.png",
        }}
      />
      <Button
        title="edit"
        onPress={() => navigation.navigate("EditUserInfoScreen")}
      />
      {/* <Image source={require("../../../assets/images/user.png")} /> */}
      <Text>USERPROFILE</Text>
    </View>
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
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  const fileRef = ref(storage, uuidv4());
  console.log(fileRef);
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}
