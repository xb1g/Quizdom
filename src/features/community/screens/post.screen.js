import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import styled from "styled-components/native";
import { Button } from "react-native-paper";

const ProfileImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-left: 20px;
  margin-top: 20px;
`;

export function PostScreen({ route, navigation }) {
  const [author, setAuthor] = useState("");
  const { post } = route.params;
  const onAddComment = () => {};
  useEffect(() => {
    const authorRef = doc(db, "users", post["author_uid"]);
    getDoc(authorRef)
      .then((doc) => {
        setAuthor(doc.data());
        console.log(doc.data());
      })
      .catch((err) => {
        console.log("Error weird");
      });
  }, []);
  console.log("paost");
  console.log(post);
  return (
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
      <Text>{post.title}</Text>
      <Text>{post.body}</Text>
      <Button
        style={{ backgroundColor: "#ffaadd", borderRadius: 30 }}
        onPress={() => onAddComment()}
      >
        <Text style={{ color: "#ffffff" }}>Comment</Text>
      </Button>
    </View>
  );
}
