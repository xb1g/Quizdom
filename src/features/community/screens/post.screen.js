import { View, Image, KeyboardAvoidingView, Keyboard } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import {
  doc,
  docs,
  getDoc,
  getDocs,
  addDoc,
  collection,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
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

const CommentFromPeople = ({ showComments, headerComponent }) => {
  const { colors } = useTheme();
  return (
    <View>
      <FlatList
        // style={{ backgroundColor: "red" }}
        data={showComments}
        ListHeaderComponent={headerComponent}
        renderItem={(showComment) => {
          console.log("PERTH", showComment.item);
          return (
            <View
              style={{
                padding: 10,
                marginHorizontal: 20,
                borderRadius: 20,
                marginBottom: 10,
                backgroundColor: colors.bg.secondary,
              }}
            >
              <Row>
                <ProfileImage
                  source={
                    showComment.item.profileImage
                      ? {
                          uri: showComment.item.profileImage,
                        }
                      : require("../../../../assets/no_user_picture.png")
                  }
                  key={showComment.item.commentId}
                />
                <Text
                  variant="titleInverse"
                  style={{ fontSize: 18, marginLeft: 10 }}
                >
                  {showComment.item.username}
                </Text>
              </Row>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 16,
                  marginHorizontal: 20,
                }}
              >
                {showComment.item.comment}
              </Text>
              <FlatList
                horizontal
                style={{ backgroundColor: "#303030" }}
                data={showComment.item.images}
                renderItem={(imaged) => {
                  console.log("Slum");
                  console.log(imaged.item);
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 10,
                      marginHorizontal: 20,
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                    source={{ uri: imaged.item }}
                    key={imaged.item}
                  />;
                }}
              />
            </View>
          );
        }}
        keyExtractor={(item) => {
          console.log("item");
          console.log(item);
          return "comment" + item.commentId;
        }}
      />
    </View>
  );
};

const CommentInput = ({ insets, theme, onAddComment, keyboardStatus }) => {
  const [commentImages, setCommentImages] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    console.log("commentImages");
    console.log(commentImages);
  }, [commentImages]);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
    });
    // // console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }

    try {
      // setProfileImage({ localUri: pickerResult.uri });
      const imageUrl = await uploadImageAsync(pickerResult.uri);
      console.log("imageUrl");
      console.log(imageUrl);
      setCommentImages([...commentImages, imageUrl]);
    } catch (e) {
      alert("Upload failed, sorry :(");
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior="position"
        style={{
          position: "absolute",
          width: "100%",
          paddingBottom: insets.bottom,
          bottom: 0,
          backgroundColor: theme.colors.bg.secondary,
          // backgroundColor: "blue",
        }}
      >
        <DismissKeyboardView>
          <View
            style={{
              flex: 1,
              width: "100%",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              // paddingBottom: keyboardStatus ? 20 : 0,
              marginBottom: keyboardStatus ? -40 : 0,
              padding: 10,
              backgroundColor: theme.colors.bg.secondary,
              // backgroundColor: "#ff0000",
            }}
          >
            {commentImages.length > 0 && (
              <FlatList
                horizontal
                style={{
                  marginBottom: 10,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  padding: 10,
                  // backgroundColor: theme.colors.bg.tertiary,
                }}
                data={commentImages}
                renderItem={(image) => {
                  return (
                    <TouchableOpacity>
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 10,
                          marginHorizontal: 10,
                        }}
                        source={{ uri: image.item }}
                        key={image.item}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            )}
            <Row
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "space-between",
                // backgroundColor: "green",
              }}
            >
              <Ionicons
                name="image"
                size={30}
                color={"#ffffff"}
                onPress={openImagePickerAsync}
              />
              <TextInput
                placeholder="Add a comment"
                placeholderTextColor={theme.colors.text.inverse}
                style={{
                  borderRadius: 10,
                  padding: 10,
                  width: "80%",
                  height: 40,
                  backgroundColor: theme.colors.bg.tertiary,
                  color: theme.colors.text.inverse,
                }}
                value={comment}
                onChangeText={setComment}
              />
              <Ionicons
                name="send"
                size={30}
                color={"#ffffff"}
                onPress={() => {
                  if (comment) {
                    onAddComment(comment, commentImages);
                    setComment("");
                    setCommentImages([]);
                  }
                }}
              />
            </Row>
          </View>
        </DismissKeyboardView>
      </KeyboardAvoidingView>
      <View
        style={{
          position: "absolute",
          height: insets.bottom + 20,
          bottom: 0,
          zIndex: -1,
          width: "100%",
          backgroundColor: theme.colors.bg.secondary,
        }}
      />
    </>
  );
};

export function PostScreen({ route, navigation }) {
  const { userInfo, user } = useContext(AuthenticationContext);
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [author, setAuthor] = useState("");
  const [showComments, setShowComments] = useState([]);

  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const { post } = route.params;

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const onAddComment = (comment, images) => {
    const commentRef = collection(
      db,
      "community",
      "Math",
      "posts",
      post.id,
      "comments"
    );

    console.log("user");
    console.log(user);

    addDoc(commentRef, {
      comment: comment,
      images: images,
      author_uid: user.uid,
      username: userInfo.username,
      profileImage: userInfo.profileImage,
    })
      .then((docRef) => {
        console.log(docRef.id);
        const newCommentRef = doc(
          db,
          "community",
          "Math",
          "posts",
          post.id,
          "comments",
          docRef.id
        );
        updateDoc(newCommentRef, {
          commentId: docRef.id,
        });
      })
      .catch((e) => {
        console.log(e);
      });
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

    const commentInRef = collection(
      db,
      "community",
      "Math",
      "posts",
      post.id,
      "comments"
    );

    onSnapshot(commentInRef, (docs) => {
      const data = [];
      docs.forEach((doc) => {
        data.push(doc.data());
      });
      setShowComments(data);
    });
  }, []);

  return (
    <DismissKeyboardView>
      <>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.bg.primary,
            marginTop: -40,
          }}
        >
          <Spacer size={"extraLarge"} />
          <Spacer size={"extraLarge"} />
          <Spacer size={"extraLarge"} />
          <Spacer size={"extraLarge"} />
          <CommentFromPeople
            showComments={showComments}
            headerComponent={() => (
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
          />
          <CommentInput
            insets={insets}
            theme={theme}
            onAddComment={onAddComment}
            keyboardStatus={keyboardStatus}
          />
        </View>
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
