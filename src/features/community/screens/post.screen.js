import { View, Image } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { Row } from "../../../components/utility/row.component";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { db, storage } from "../../../../firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { Button } from "react-native-paper";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Text } from "../../../components/typography/text.component";
import styled from "styled-components";

const ProfileImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-left: 20px;
  margin-top: 20px;
`;

export function PostScreen({ route, navigation }) {
  const { user } = useContext(AuthenticationContext);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const { post } = route.params;

  const onAddComment = () => {
    const commentRef = collection(
      db,
      "community",
      "Math",
      "posts",
      post.id,
      "comment"
    );
    addDoc(commentRef, {
      comment: comment,
      images: images,
      author_uid: user.uid,
    })
      .then(() => navigation.navigate("CommunityScreen"))
      .catch((e) => {
        // console.log("Can't post comment");
        // console.log(e);
      });
  };

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
      // setProfileImage({ localUri: pickerResult.uri });
      const imageUrl = await uploadImageAsync(pickerResult.uri);
      // console.log(imageUrl);
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
      // console.log(e);
      alert("Upload failed, sorry :(");
    }
  };

  useEffect(() => {
    const authorRef = doc(db, "users", post["author_uid"]);
    getDoc(authorRef)
      .then((doc) => {
        setAuthor(doc.data());
        // console.log(doc.data());
      })
      .catch((err) => {
        // console.log("Error weird");
      });
  }, []);

  // // console.log("paost");
  // // console.log(post);

  return (
    <>
      <ScrollView>
        <View>
          <ProfileImage
            source={
              author.ProfileImage
                ? {
                    uri: author.ProfileImage,
                  }
                : require("../../../../assets/no_user_picture.png")
            }
          />
          <Text style={{ marginTop: 10 }}>{post.title}</Text>
          <Text style={{ marginTop: 10 }}>{post.body}</Text>
          <View
            style={{ marginHorizontal: 20, marginBottom: 20, marginTop: 10 }}
          >
            <FlatList
              style={{ backgroundColor: "#8ad4ff" }}
              numColumns={2}
              data={post.images}
              renderItem={(posted) => {
                // console.log("slumMunMun", posted);
                return (
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 10,
                      marginHorizontal: 20,
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                    source={{ uri: posted.item }}
                  />
                );
              }}
              keyExtractor={(posted) => posted.id}
            />
          </View>
          <View style={{ marginHorzontal: 20 }}>
            <FlatList
              style={{ backgroundColor: "#303030" }}
              numColumns={2}
              data={images}
              renderItem={(image) => {
                // console.log("slumMIU", image);
                return (
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 10,
                      marginHorizontal: 20,
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                    source={{ uri: image.item }}
                  />
                );
              }}
              keyExtractor={(image) => image.id}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <Row>
              <TouchableOpacity
                style={{
                  backgroundColor: "#77b800",
                  borderRadius: 30,
                  marginHorizontal: 15,
                  alignItems: "center",
                  paddingHorizontal: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
                onPress={openImagePickerAsync}
              >
                <Text style={{ color: "#ffffff", fontSize: 16 }}>
                  Add image
                </Text>
              </TouchableOpacity>

              <TextInput
                style={{
                  fontSize: 16,
                  backgroundColor: "#fff999",
                  marginHorizontal: 10,
                  paddingHorizontal: 75,
                  borderRadius: 30,
                }}
                onChangeText={setComment}
                value={comment}
                placeholder="Your comment here"
              />
            </Row>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#ffaadd",
              borderRadius: 30,
              marginTop: 30,
              marginHorizontal: 30,
              paddingTop: 20,
              paddingBottom: 20,
              alignItems: "center",
            }}
            onPress={console.log("Suffer")}
          >
            <Text style={{ color: "#ffffff", fontSize: 20 }}>Post Comment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

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
