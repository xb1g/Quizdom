import { View, Image, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { Row } from "../../../components/utility/row.component";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { db, storage } from "../../../../firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Text } from "../../../components/typography/text.component";
import styled, { useTheme } from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SmallTitle } from "./add-post.screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DismissKeyboardView } from "../../../components/utility/dismiss-keyboard-view.component";
import { CommunityContext } from "../../../services/authentication/community/community.context";

const ProfileImage = styled(Image)`
  width: 30px;
  height: 30px;
  border-radius: 50px;
`;

const CommentView = ({ comment }) => {
  const { user } = useContext(AuthenticationContext);
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: colors.background,
      }}
    >
      <ProfileImage source={{ uri: user.photoURL }} />
      <View
        style={{
          marginLeft: 10,
          flex: 1,
        }}
      >
        <Text
          style={{
            color: colors.text,
          }}
        >
          {comment.text}
        </Text>
      </View>
    </View>
  );
};

const CommentInput = ({
  insets,
  theme,
  openImagePickerAsync,
  images,
  onAddComment,
  setComment,
}) => {
  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{
        //position: "absolute",
        flex: 1,
        backgroundColor: theme.colors.bg.primary,
      }}
    >
      <ScrollView>
        <View
          style={{
            //position: "absolute",
            //flex: 1,
            width: "100%",
            bottom: 0,
            padding: 15,
            borderRadius: 20,
            marginTop: 350,
            paddingBottom: 15 + insets.bottom,
            backgroundColor: theme.colors.bg.secondary,
          }}
        >
          <FlatList
            horizontal
            style={{ backgroundColor: "#303030" }}
            data={images}
            renderItem={(image) => {
              console.log(image.item);
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
                  key={image.item.substring(image.item.length - 5)}
                  source={{ uri: image.item }}
                />
              );
            }}
          />
          <Row
            style={{
              //flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Ionicons
              name="image"
              size={30}
              color={"#b8b8b8"}
              onPress={openImagePickerAsync}
            />
            <TextInput
              placeholder="Add a comment"
              placeholderTextColor={theme.colors.text.inverse}
              style={{
                borderRadius: 10,
                padding: 10,
                width: "80%",
                backgroundColor: "#5e5e5e",
              }}
              onChangeText={setComment}
            />
            <Ionicons
              name="send"
              size={30}
              color={"#b8b8b8"}
              onPress={onAddComment}
            />
          </Row>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export function PostScreen({ route, navigation }) {
  const { user } = useContext(AuthenticationContext);
  const theme = useTheme();
  const insets = useSafeAreaInsets();
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
      "comments"
    );
    addDoc(commentRef, {
      comment: comment,
      images: images,
      author_uid: user.uid,
      id: commentRef.id,
    })
      .then(
        () => console.log("Success"),
        navigation.navigate("CommunityScreen")
      )
      .catch((e) => {
        console.log(e);
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
        console.log(err);
      });
  }, []);

  return (
    <DismissKeyboardView>
      <>
        <View style={{ flex: 1, backgroundColor: theme.colors.bg.primary }}>
          <Spacer size="extraLarge" />
          <Spacer size="extraLarge" />
          <Spacer size="extraLarge" />

          <View>
            <View style={{ marginHorzontal: 20 }}>
              <FlatList
                style={{ backgroundColor: "#303030" }}
                data={images}
                ListHeaderComponent={() => (
                  <View
                    style={{
                      margin: 20,
                      padding: 20,
                      borderRadius: 20,
                      backgroundColor: theme.colors.bg.secondary,
                    }}
                  >
                    <Row>
                      <ProfileImage
                        source={
                          author.profileImage
                            ? {
                                uri: author.profileImage,
                              }
                            : require("../../../../assets/no_user_picture.png")
                        }
                      />
                      <Text
                        style={{
                          marginLeft: 10,
                          color: theme.colors.bg.inverse,
                        }}
                      >
                        {author.username}
                      </Text>
                    </Row>
                    <Text variant="titleInverse" style={{ marginTop: 10 }}>
                      {post.title}
                    </Text>
                    <Text variant="bodyInverse" style={{ marginTop: 10 }}>
                      {post.body}
                    </Text>

                    <FlatList
                      horizontal
                      data={post.images}
                      renderItem={(posted) => {
                        // console.log("slumMunMun", posted);
                        return (
                          <TouchableOpacity>
                            <Image
                              style={{
                                width: 150,
                                height: 150,
                                borderRadius: 10,
                              }}
                              source={{ uri: posted.item }}
                            />
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={(posted) => posted.id}
                    />
                  </View>
                )}
                renderItem={(image) => {
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
          </View>
        </View>
        <CommentInput
          insets={insets}
          theme={theme}
          openImagePickerAsync={openImagePickerAsync}
          images={images}
          onAddComment={onAddComment}
          setComment={setComment}
        />
      </>
    </DismissKeyboardView>
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
