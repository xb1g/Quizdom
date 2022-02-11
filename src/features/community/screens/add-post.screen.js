import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedbackBase,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "../../../../firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styledComponentsNative, { useTheme } from "styled-components/native";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import { styles } from "react-native-math-view/src/common";
import { Button, Switch } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { NavigationContainer } from "@react-navigation/native";

import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Text } from "../../../components/typography/text.component";
import { Row } from "../../../components/utility/row.component";
import { AuthButton } from "../../account/components/account.styles";

export const Title = styledComponentsNative(Text).attrs({
  variant: "label",
})`
    font-size: 36px;
    color: #fff;
    margin: 20px
  `;

export const SmallTitle = styledComponentsNative(Text).attrs({})`
    font-size: 18px;
    color: #fff;
  `;

export const CloseButton = styledComponentsNative(TouchableOpacity)`
    position: absolute;
    right: 0px;
    z-index: 1;
  `;

export const Input = styledComponentsNative(TextInput).attrs({
  placeholder: "Title",
  placeholderTextColor: "#c7c7c7",
})`
    border-radius: 10px;
    padding: 10px;
    background-color: #5e5e5e;
    margin: 10px;
    color: #fff;
  `;

export const BodyInput = styledComponentsNative(TextInput).attrs({
  multiline: true,
  maxLength: 500,
  numberOfLines: 10,
})`
    border-radius: 10px;
    padding: 10px;
    background-color: #5e5e5e;
    margin: 10px;
    height: 200px;
    color: #fff;
  `;

export const AddPostScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  const [isQuestion, setIsQuestion] = useState(false);

  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { user } = useContext(AuthenticationContext);

  const postRef = collection(db, "community", "Math", "posts");

  const onAddPost = () => {
    if (title.length > 0 && body.length > 0) {
      addDoc(postRef, {
        title: title,
        body: body,
        images: images,
        isQuestion: isQuestion,
        author_uid: user.uid,
      })
        .then((docRef) => {
          navigation.navigate("CommunityScreen");
          console.log("Document written with ID: ", docRef.id);
          const newPostRef = doc(db, "community", "Math", "posts", docRef.id);
          updateDoc(newPostRef, { id: docRef.id });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    // console.log(images);
  }, [images]);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    // // console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }

    try {
      // setProfileImage({ localUri: pickerResult.uri });
      const imageUrl = await uploadImageAsync(pickerResult.uri);
      // console.log(imageUrl);
      const copyImages = images;
      copyImages.push(imageUrl);
      setImages(copyImages);
    } catch (e) {
      // console.log(e);
      alert("Upload failed, sorry :(");
    }
  };

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => Keyboard.dismiss()}
        >
          <View
            style={{
              backgroundColor: theme.colors.bg.primary,
              flex: 1,
            }}
          >
            <Row>
              <Title>Add post</Title>
              <CloseButton onPress={() => navigation.goBack()}>
                <Title>{"X "}</Title>
              </CloseButton>
            </Row>
            <View
              style={{
                backgroundColor: theme.colors.bg.secondary,
                borderRadius: 20,
                margin: 10,
                padding: 10,
              }}
            >
              <Input onChangeText={(text) => setTitle(text)} value={title} />
              <BodyInput
                placeholderTextColor="#c2c2c2"
                onChangeText={setBody}
                value={body}
                placeholder="Body"
              />

              <Row style={{ padding: 10, alignItems: "center" }}>
                <SmallTitle>Tags:</SmallTitle>
                <Spacer position={"right"} />
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#5e5e5e",
                    width: 20,
                    height: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SmallTitle>+</SmallTitle>
                </TouchableOpacity>
              </Row>
              <Row style={{ padding: 10, alignItems: "center" }}>
                <SmallTitle>Question? </SmallTitle>
                <Switch
                  value={isQuestion}
                  onValueChange={(value) => setIsQuestion(value)}
                />
              </Row>
              <TouchableOpacity
                onPress={openImagePickerAsync}
                style={{
                  padding: 10,
                  margin: 10,
                  borderRadius: 30,
                  backgroundColor: "#ffffff47",
                  marginRight: "auto",
                  alignItems: "center",
                }}
              >
                <Row style={{ justifyContent: "center", alignItems: "center" }}>
                  <SmallTitle>Add Images</SmallTitle>
                  <Spacer position="right" />
                  <Ionicons name="image-outline" size={25} color="white" />
                </Row>
              </TouchableOpacity>
            </View>
            <FlatList
              data={images}
              horizontal
              renderItem={(image) => {
                console.log(image);
                return (
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      margin: 10,
                    }}
                    defaultSource={require("../../../../assets/icon.png")}
                    source={{ uri: image.item }}
                  />
                );
              }}
              keyExtractor={(image, index) => index + image.item}
            />
            <AuthButton
              onPress={onAddPost}
              size="large"
              style={{
                marginBottom: insets.bottom + 10,
              }}
            >
              <Text>Post</Text>
            </AuthButton>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
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
