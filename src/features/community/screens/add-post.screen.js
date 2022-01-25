import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StatusBar, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "../../../../firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  FlatList,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { styles } from "react-native-math-view/src/common";
import { Button } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { Row } from "../../../components/utility/row.component";
import {
  BackButton,
  TitleContainer,
  TitleText,
} from "../../home/components/home.styles";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { NavigationContainer } from "@react-navigation/native";
export const AddPostScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  const postRef = collection(db, "community", "Math", "posts");

  const onAddPost = () => {
    addDoc(postRef, {
      title: title,
      body: body,
      images: images,
      author_uid: user.uid,
    }).then(() => navigation.navigate("CommunityMainScreen"));
  };

  // const onAddPost = await addDoc(collection("community", "Math", "posts"), {
  //   title: title,
  //   body: body,
  //   images: images,
  // });

  useEffect(() => {
    console.log(images);
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
      const copyImages = images;
      copyImages.push(imageUrl);
      setImages(copyImages);
      // setProfileImage(imageUrl);
      // save uri to firestore
      // const docRef = doc();
      // // Set the "capital" field of the city 'DC'
      // await updateDoc(docRef, {
      //   postImage: imageUrl,
      // });
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    }
  };
  return (
    <>
      <Spacer></Spacer>
      <TextInput
        style={{
          fontSize: 25,
          backgroundColor: "#fff999",
          marginHorizontal: 30,
          marginTop: 10,
        }}
        onChangeText={setTitle}
        value={title}
        placeholder="Title"
      />
      <TextInput
        style={{
          fontSize: 18,
          backgroundColor: "#fff999",
          marginTop: 30,
          marginHorizontal: 10,
          paddingBottom: 18,
        }}
        onChangeText={setBody}
        value={body}
        placeholder="Body"
      />
      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={{
          backgroundColor: "#ffaadd",
          marginTop: 30,
          paddingTop: 20,
          marginBottom: 20,
          paddingBottom: 20,
          marginHorizontal: 10,
          borderRadius: 30,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#ffffff", fontSize: 20 }}>Add Image</Text>
      </TouchableOpacity>
      <FlatList
        style={{ backgroundColor: "#8ad4ff" }}
        numColumns={2}
        data={images}
        renderItem={(image) => {
          console.log("slumMunMun", image);
          return (
            <Image
              style={{
                width: 200,
                height: 200,
                borderRadius: 10,
              }}
              source={{ uri: image.item }}
            />
          );
        }}
        keyExtractor={(image) => image.id}
      />
      <TouchableOpacity
        onPress={() => onAddPost()}
        style={{
          backgroundColor: "#999999",
          marginTop: 10,
          paddingTop: 20,
          paddingBottom: 20,
          marginHorizontal: 10,
          borderRadius: 30,
          alignItems: "center",
        }}
      >
        <Text>Post</Text>
      </TouchableOpacity>
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
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  const fileRef = ref(storage, uuidv4());
  // console.log(fileRef);
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();
  return await getDownloadURL(fileRef);
}
